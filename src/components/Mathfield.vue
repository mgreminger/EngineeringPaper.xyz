<template>
  <div :id="id" class="mathfield">
    <slot />
  </div>
</template>

<script>
import MathLive from "mathlive";


export default {
    name: 'mathlive-mathfield',
    // template: '<div class="mathfield" :id="id"><slot></slot></div>',
    props: {
        id: {
            type: String,
            default: '',
        },
        value: {
            type: String,
            default: '',
        },
        config: {
            type: Object,
            default: () => ({}),
        },
        onKeystroke: {
            type: Function,
            default: function (_keystroke, _ev) {
                return true;
            },
        },
        onMoveOutOf: {
            type: Function,
            default: function (_direction) {
                return true;
            },
        },
        onTabOutOf: {
            type: Function,
            default: function (_direction) {
                return true;
            },
        },
    },
    watch: {
        value: function (newValue, oldValue) {
            // When the `value` prop (from the model) is modified
            // update the mathfield to stay in sync, but don't send back content
            // change notifications, to avoid infinite loops.
            if (newValue !== oldValue) {
                this.$el.mathfield.$latex(newValue, {
                    suppressChangeNotifications: true,
                });
            }
        },
        config: {
            deep: true,
            handler: function (config) {
                this.$el.mathfield.$setConfig(config);
            },
        },
    },
    mounted: function () {
        // A new instance is being created
        // Wait until the DOM has been constructed...
        this.$nextTick(() => {
            // ... then make the Mathfield
            MathLive.makeMathField(this.$el, {
                ...this.config,
                // To support the 'model' directive, this handler will connect
                // the content of the mathfield to the ViewModel
                onContentDidChange: (_) => {
                    // When the mathfield is updated, notify the model.
                    // The initial input value is generated from the <slot>
                    // content, so it may need to be updated.
                    this.$emit('input', this.$el.mathfield.$text());
                },
                // Those asynchronous notification handlers are translated to events
                onFocus: (_) => {
                    this.$emit('focus');
                },
                onBlur: (_) => {
                    this.$emit('blur');
                },
                onContentWillChange: (_) => {
                    this.$emit('content-will-change');
                },
                onSelectionWillChange: (_) => {
                    this.$emit('selection-will-change');
                },
                onUndoStateWillChange: (_, command) => {
                    this.$emit('undo-state-will-change', command);
                },
                onUndoStateDidChange: (_, command) => {
                    this.$emit('undo-state-did-change', command);
                },
                onVirtualKeyboardToggle: (_, visible, keyboardElement) => {
                    this.$emit(
                        'virtual-keyboard-toggle',
                        visible,
                        keyboardElement
                    );
                },
                onReadAloudStatus: (_, status) => {
                    this.$emit('read-aloud-status', status);
                },

                // Those notification handlers expect an answer back, so translate
                // them to callbacks via props
                onKeystroke: (_, keystroke, ev) => {
                    return this.onKeystroke(keystroke, ev);
                },
                onMoveOutOf: (_, direction) => {
                    return this.onMoveOutOf(direction);
                },
                onTabOutOf: (_, direction) => {
                    return this.onTabOutOf(direction);
                },
            });
        });
    },
    methods: {
        /*
         *
         * @param {string} selector
         */
        perform: function (selector) {
            this.$el.mathfield.$perform(selector);
        },
        /*
         * @return {boolean}
         */
        hasFocus: function () {
            return this.$el.mathfield.$hasFocus();
        },
        focus: function () {
            this.$el.mathfield.$focus();
        },
        blur: function () {
            this.$el.mathfield.$blur();
        },
        text: function (format) {
            return this.$el.mathfield.$text(format);
        },
        selectedText: function (format) {
            return this.$el.mathfield.$selectedText(format);
        },
        insert: function (text, options) {
            this.$el.mathfield.$insert(text, options);
        },
        keystroke: function (keys, evt) {
            return this.$el.mathfield.$keystroke(keys, evt);
        },
        typedText: function (text) {
            this.$el.mathfield.$keystroke(text);
        },
        selectionIsCollapsed: function () {
            return this.$el.mathfield.$selectionIsCollapsed();
        },
        selectionDepth: function () {
            return this.$el.mathfield.$selectionDepth();
        },
        selectionAtStart: function () {
            return this.$el.mathfield.$selectionAtStart();
        },
        selectionAtEnd: function () {
            return this.$el.mathfield.$selectionAtEnd();
        },
        select: function () {
            this.$el.mathfield.$select();
        },
        clearSelection: function () {
            this.$el.mathfield.$clearSelection();
        },
    },
};
</script>

<style scoped>
h1 {
  padding: 0 .25em;
}
.mathfield {
    display: inline-block;
    min-width: 100px;
    border:1px solid black;
}
</style>
