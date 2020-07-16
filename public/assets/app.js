
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function () {
  'use strict';

  /*!
   * Vue.js v2.6.11
   * (c) 2014-2019 Evan You
   * Released under the MIT License.
   */
  /*  */

  var emptyObject = Object.freeze({});

  // These helpers produce better VM code in JS engines due to their
  // explicitness and function inlining.
  function isUndef (v) {
    return v === undefined || v === null
  }

  function isDef (v) {
    return v !== undefined && v !== null
  }

  function isTrue (v) {
    return v === true
  }

  function isFalse (v) {
    return v === false
  }

  /**
   * Check if value is primitive.
   */
  function isPrimitive (value) {
    return (
      typeof value === 'string' ||
      typeof value === 'number' ||
      // $flow-disable-line
      typeof value === 'symbol' ||
      typeof value === 'boolean'
    )
  }

  /**
   * Quick object check - this is primarily used to tell
   * Objects from primitive values when we know the value
   * is a JSON-compliant type.
   */
  function isObject (obj) {
    return obj !== null && typeof obj === 'object'
  }

  /**
   * Get the raw type string of a value, e.g., [object Object].
   */
  var _toString = Object.prototype.toString;

  function toRawType (value) {
    return _toString.call(value).slice(8, -1)
  }

  /**
   * Strict object type check. Only returns true
   * for plain JavaScript objects.
   */
  function isPlainObject (obj) {
    return _toString.call(obj) === '[object Object]'
  }

  function isRegExp (v) {
    return _toString.call(v) === '[object RegExp]'
  }

  /**
   * Check if val is a valid array index.
   */
  function isValidArrayIndex (val) {
    var n = parseFloat(String(val));
    return n >= 0 && Math.floor(n) === n && isFinite(val)
  }

  function isPromise (val) {
    return (
      isDef(val) &&
      typeof val.then === 'function' &&
      typeof val.catch === 'function'
    )
  }

  /**
   * Convert a value to a string that is actually rendered.
   */
  function toString (val) {
    return val == null
      ? ''
      : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
        ? JSON.stringify(val, null, 2)
        : String(val)
  }

  /**
   * Convert an input value to a number for persistence.
   * If the conversion fails, return original string.
   */
  function toNumber (val) {
    var n = parseFloat(val);
    return isNaN(n) ? val : n
  }

  /**
   * Make a map and return a function for checking if a key
   * is in that map.
   */
  function makeMap (
    str,
    expectsLowerCase
  ) {
    var map = Object.create(null);
    var list = str.split(',');
    for (var i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }
    return expectsLowerCase
      ? function (val) { return map[val.toLowerCase()]; }
      : function (val) { return map[val]; }
  }

  /**
   * Check if a tag is a built-in tag.
   */
  var isBuiltInTag = makeMap('slot,component', true);

  /**
   * Check if an attribute is a reserved attribute.
   */
  var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

  /**
   * Remove an item from an array.
   */
  function remove (arr, item) {
    if (arr.length) {
      var index = arr.indexOf(item);
      if (index > -1) {
        return arr.splice(index, 1)
      }
    }
  }

  /**
   * Check whether an object has the property.
   */
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn (obj, key) {
    return hasOwnProperty.call(obj, key)
  }

  /**
   * Create a cached version of a pure function.
   */
  function cached (fn) {
    var cache = Object.create(null);
    return (function cachedFn (str) {
      var hit = cache[str];
      return hit || (cache[str] = fn(str))
    })
  }

  /**
   * Camelize a hyphen-delimited string.
   */
  var camelizeRE = /-(\w)/g;
  var camelize = cached(function (str) {
    return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
  });

  /**
   * Capitalize a string.
   */
  var capitalize = cached(function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  });

  /**
   * Hyphenate a camelCase string.
   */
  var hyphenateRE = /\B([A-Z])/g;
  var hyphenate = cached(function (str) {
    return str.replace(hyphenateRE, '-$1').toLowerCase()
  });

  /**
   * Simple bind polyfill for environments that do not support it,
   * e.g., PhantomJS 1.x. Technically, we don't need this anymore
   * since native bind is now performant enough in most browsers.
   * But removing it would mean breaking code that was able to run in
   * PhantomJS 1.x, so this must be kept for backward compatibility.
   */

  /* istanbul ignore next */
  function polyfillBind (fn, ctx) {
    function boundFn (a) {
      var l = arguments.length;
      return l
        ? l > 1
          ? fn.apply(ctx, arguments)
          : fn.call(ctx, a)
        : fn.call(ctx)
    }

    boundFn._length = fn.length;
    return boundFn
  }

  function nativeBind (fn, ctx) {
    return fn.bind(ctx)
  }

  var bind = Function.prototype.bind
    ? nativeBind
    : polyfillBind;

  /**
   * Convert an Array-like object to a real Array.
   */
  function toArray (list, start) {
    start = start || 0;
    var i = list.length - start;
    var ret = new Array(i);
    while (i--) {
      ret[i] = list[i + start];
    }
    return ret
  }

  /**
   * Mix properties into target object.
   */
  function extend (to, _from) {
    for (var key in _from) {
      to[key] = _from[key];
    }
    return to
  }

  /**
   * Merge an Array of Objects into a single Object.
   */
  function toObject (arr) {
    var res = {};
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]) {
        extend(res, arr[i]);
      }
    }
    return res
  }

  /* eslint-disable no-unused-vars */

  /**
   * Perform no operation.
   * Stubbing args to make Flow happy without leaving useless transpiled code
   * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
   */
  function noop (a, b, c) {}

  /**
   * Always return false.
   */
  var no = function (a, b, c) { return false; };

  /* eslint-enable no-unused-vars */

  /**
   * Return the same value.
   */
  var identity = function (_) { return _; };

  /**
   * Check if two values are loosely equal - that is,
   * if they are plain objects, do they have the same shape?
   */
  function looseEqual (a, b) {
    if (a === b) { return true }
    var isObjectA = isObject(a);
    var isObjectB = isObject(b);
    if (isObjectA && isObjectB) {
      try {
        var isArrayA = Array.isArray(a);
        var isArrayB = Array.isArray(b);
        if (isArrayA && isArrayB) {
          return a.length === b.length && a.every(function (e, i) {
            return looseEqual(e, b[i])
          })
        } else if (a instanceof Date && b instanceof Date) {
          return a.getTime() === b.getTime()
        } else if (!isArrayA && !isArrayB) {
          var keysA = Object.keys(a);
          var keysB = Object.keys(b);
          return keysA.length === keysB.length && keysA.every(function (key) {
            return looseEqual(a[key], b[key])
          })
        } else {
          /* istanbul ignore next */
          return false
        }
      } catch (e) {
        /* istanbul ignore next */
        return false
      }
    } else if (!isObjectA && !isObjectB) {
      return String(a) === String(b)
    } else {
      return false
    }
  }

  /**
   * Return the first index at which a loosely equal value can be
   * found in the array (if value is a plain object, the array must
   * contain an object of the same shape), or -1 if it is not present.
   */
  function looseIndexOf (arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (looseEqual(arr[i], val)) { return i }
    }
    return -1
  }

  /**
   * Ensure a function is called only once.
   */
  function once (fn) {
    var called = false;
    return function () {
      if (!called) {
        called = true;
        fn.apply(this, arguments);
      }
    }
  }

  var SSR_ATTR = 'data-server-rendered';

  var ASSET_TYPES = [
    'component',
    'directive',
    'filter'
  ];

  var LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated',
    'errorCaptured',
    'serverPrefetch'
  ];

  /*  */



  var config = ({
    /**
     * Option merge strategies (used in core/util/options)
     */
    // $flow-disable-line
    optionMergeStrategies: Object.create(null),

    /**
     * Whether to suppress warnings.
     */
    silent: false,

    /**
     * Show production mode tip message on boot?
     */
    productionTip: "production" !== 'production',

    /**
     * Whether to enable devtools
     */
    devtools: "production" !== 'production',

    /**
     * Whether to record perf
     */
    performance: false,

    /**
     * Error handler for watcher errors
     */
    errorHandler: null,

    /**
     * Warn handler for watcher warns
     */
    warnHandler: null,

    /**
     * Ignore certain custom elements
     */
    ignoredElements: [],

    /**
     * Custom user key aliases for v-on
     */
    // $flow-disable-line
    keyCodes: Object.create(null),

    /**
     * Check if a tag is reserved so that it cannot be registered as a
     * component. This is platform-dependent and may be overwritten.
     */
    isReservedTag: no,

    /**
     * Check if an attribute is reserved so that it cannot be used as a component
     * prop. This is platform-dependent and may be overwritten.
     */
    isReservedAttr: no,

    /**
     * Check if a tag is an unknown element.
     * Platform-dependent.
     */
    isUnknownElement: no,

    /**
     * Get the namespace of an element
     */
    getTagNamespace: noop,

    /**
     * Parse the real tag name for the specific platform.
     */
    parsePlatformTagName: identity,

    /**
     * Check if an attribute must be bound using property, e.g. value
     * Platform-dependent.
     */
    mustUseProp: no,

    /**
     * Perform updates asynchronously. Intended to be used by Vue Test Utils
     * This will significantly reduce performance if set to false.
     */
    async: true,

    /**
     * Exposed for legacy reasons
     */
    _lifecycleHooks: LIFECYCLE_HOOKS
  });

  /*  */

  /**
   * unicode letters used for parsing html tags, component names and property paths.
   * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
   * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
   */
  var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

  /**
   * Check if a string starts with $ or _
   */
  function isReserved (str) {
    var c = (str + '').charCodeAt(0);
    return c === 0x24 || c === 0x5F
  }

  /**
   * Define a property.
   */
  function def (obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
      value: val,
      enumerable: !!enumerable,
      writable: true,
      configurable: true
    });
  }

  /**
   * Parse simple path.
   */
  var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
  function parsePath (path) {
    if (bailRE.test(path)) {
      return
    }
    var segments = path.split('.');
    return function (obj) {
      for (var i = 0; i < segments.length; i++) {
        if (!obj) { return }
        obj = obj[segments[i]];
      }
      return obj
    }
  }

  /*  */

  // can we use __proto__?
  var hasProto = '__proto__' in {};

  // Browser environment sniffing
  var inBrowser = typeof window !== 'undefined';
  var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
  var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
  var UA = inBrowser && window.navigator.userAgent.toLowerCase();
  var isIE = UA && /msie|trident/.test(UA);
  var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
  var isEdge = UA && UA.indexOf('edge/') > 0;
  var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
  var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
  var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
  var isPhantomJS = UA && /phantomjs/.test(UA);
  var isFF = UA && UA.match(/firefox\/(\d+)/);

  // Firefox has a "watch" function on Object.prototype...
  var nativeWatch = ({}).watch;

  var supportsPassive = false;
  if (inBrowser) {
    try {
      var opts = {};
      Object.defineProperty(opts, 'passive', ({
        get: function get () {
          /* istanbul ignore next */
          supportsPassive = true;
        }
      })); // https://github.com/facebook/flow/issues/285
      window.addEventListener('test-passive', null, opts);
    } catch (e) {}
  }

  // this needs to be lazy-evaled because vue may be required before
  // vue-server-renderer can set VUE_ENV
  var _isServer;
  var isServerRendering = function () {
    if (_isServer === undefined) {
      /* istanbul ignore if */
      if (!inBrowser && !inWeex && typeof global !== 'undefined') {
        // detect presence of vue-server-renderer and avoid
        // Webpack shimming the process
        _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
      } else {
        _isServer = false;
      }
    }
    return _isServer
  };

  // detect devtools
  var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

  /* istanbul ignore next */
  function isNative (Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
  }

  var hasSymbol =
    typeof Symbol !== 'undefined' && isNative(Symbol) &&
    typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

  var _Set;
  /* istanbul ignore if */ // $flow-disable-line
  if (typeof Set !== 'undefined' && isNative(Set)) {
    // use native Set when available.
    _Set = Set;
  } else {
    // a non-standard Set polyfill that only works with primitive keys.
    _Set = /*@__PURE__*/(function () {
      function Set () {
        this.set = Object.create(null);
      }
      Set.prototype.has = function has (key) {
        return this.set[key] === true
      };
      Set.prototype.add = function add (key) {
        this.set[key] = true;
      };
      Set.prototype.clear = function clear () {
        this.set = Object.create(null);
      };

      return Set;
    }());
  }

  /*  */

  var warn = noop;

  /*  */

  var uid = 0;

  /**
   * A dep is an observable that can have multiple
   * directives subscribing to it.
   */
  var Dep = function Dep () {
    this.id = uid++;
    this.subs = [];
  };

  Dep.prototype.addSub = function addSub (sub) {
    this.subs.push(sub);
  };

  Dep.prototype.removeSub = function removeSub (sub) {
    remove(this.subs, sub);
  };

  Dep.prototype.depend = function depend () {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  };

  Dep.prototype.notify = function notify () {
    // stabilize the subscriber list first
    var subs = this.subs.slice();
    for (var i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  };

  // The current target watcher being evaluated.
  // This is globally unique because only one watcher
  // can be evaluated at a time.
  Dep.target = null;
  var targetStack = [];

  function pushTarget (target) {
    targetStack.push(target);
    Dep.target = target;
  }

  function popTarget () {
    targetStack.pop();
    Dep.target = targetStack[targetStack.length - 1];
  }

  /*  */

  var VNode = function VNode (
    tag,
    data,
    children,
    text,
    elm,
    context,
    componentOptions,
    asyncFactory
  ) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.elm = elm;
    this.ns = undefined;
    this.context = context;
    this.fnContext = undefined;
    this.fnOptions = undefined;
    this.fnScopeId = undefined;
    this.key = data && data.key;
    this.componentOptions = componentOptions;
    this.componentInstance = undefined;
    this.parent = undefined;
    this.raw = false;
    this.isStatic = false;
    this.isRootInsert = true;
    this.isComment = false;
    this.isCloned = false;
    this.isOnce = false;
    this.asyncFactory = asyncFactory;
    this.asyncMeta = undefined;
    this.isAsyncPlaceholder = false;
  };

  var prototypeAccessors = { child: { configurable: true } };

  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next */
  prototypeAccessors.child.get = function () {
    return this.componentInstance
  };

  Object.defineProperties( VNode.prototype, prototypeAccessors );

  var createEmptyVNode = function (text) {
    if ( text === void 0 ) text = '';

    var node = new VNode();
    node.text = text;
    node.isComment = true;
    return node
  };

  function createTextVNode (val) {
    return new VNode(undefined, undefined, undefined, String(val))
  }

  // optimized shallow clone
  // used for static nodes and slot nodes because they may be reused across
  // multiple renders, cloning them avoids errors when DOM manipulations rely
  // on their elm reference.
  function cloneVNode (vnode) {
    var cloned = new VNode(
      vnode.tag,
      vnode.data,
      // #7975
      // clone children array to avoid mutating original in case of cloning
      // a child.
      vnode.children && vnode.children.slice(),
      vnode.text,
      vnode.elm,
      vnode.context,
      vnode.componentOptions,
      vnode.asyncFactory
    );
    cloned.ns = vnode.ns;
    cloned.isStatic = vnode.isStatic;
    cloned.key = vnode.key;
    cloned.isComment = vnode.isComment;
    cloned.fnContext = vnode.fnContext;
    cloned.fnOptions = vnode.fnOptions;
    cloned.fnScopeId = vnode.fnScopeId;
    cloned.asyncMeta = vnode.asyncMeta;
    cloned.isCloned = true;
    return cloned
  }

  /*
   * not type checking this file because flow doesn't play well with
   * dynamically accessing methods on Array prototype
   */

  var arrayProto = Array.prototype;
  var arrayMethods = Object.create(arrayProto);

  var methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
  ];

  /**
   * Intercept mutating methods and emit events
   */
  methodsToPatch.forEach(function (method) {
    // cache original method
    var original = arrayProto[method];
    def(arrayMethods, method, function mutator () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var result = original.apply(this, args);
      var ob = this.__ob__;
      var inserted;
      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break
        case 'splice':
          inserted = args.slice(2);
          break
      }
      if (inserted) { ob.observeArray(inserted); }
      // notify change
      ob.dep.notify();
      return result
    });
  });

  /*  */

  var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

  /**
   * In some cases we may want to disable observation inside a component's
   * update computation.
   */
  var shouldObserve = true;

  function toggleObserving (value) {
    shouldObserve = value;
  }

  /**
   * Observer class that is attached to each observed
   * object. Once attached, the observer converts the target
   * object's property keys into getter/setters that
   * collect dependencies and dispatch updates.
   */
  var Observer = function Observer (value) {
    this.value = value;
    this.dep = new Dep();
    this.vmCount = 0;
    def(value, '__ob__', this);
    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods);
      } else {
        copyAugment(value, arrayMethods, arrayKeys);
      }
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  };

  /**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  Observer.prototype.walk = function walk (obj) {
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
      defineReactive$$1(obj, keys[i]);
    }
  };

  /**
   * Observe a list of Array items.
   */
  Observer.prototype.observeArray = function observeArray (items) {
    for (var i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  };

  // helpers

  /**
   * Augment a target Object or Array by intercepting
   * the prototype chain using __proto__
   */
  function protoAugment (target, src) {
    /* eslint-disable no-proto */
    target.__proto__ = src;
    /* eslint-enable no-proto */
  }

  /**
   * Augment a target Object or Array by defining
   * hidden properties.
   */
  /* istanbul ignore next */
  function copyAugment (target, src, keys) {
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i];
      def(target, key, src[key]);
    }
  }

  /**
   * Attempt to create an observer instance for a value,
   * returns the new observer if successfully observed,
   * or the existing observer if the value already has one.
   */
  function observe (value, asRootData) {
    if (!isObject(value) || value instanceof VNode) {
      return
    }
    var ob;
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
      ob = value.__ob__;
    } else if (
      shouldObserve &&
      !isServerRendering() &&
      (Array.isArray(value) || isPlainObject(value)) &&
      Object.isExtensible(value) &&
      !value._isVue
    ) {
      ob = new Observer(value);
    }
    if (asRootData && ob) {
      ob.vmCount++;
    }
    return ob
  }

  /**
   * Define a reactive property on an Object.
   */
  function defineReactive$$1 (
    obj,
    key,
    val,
    customSetter,
    shallow
  ) {
    var dep = new Dep();

    var property = Object.getOwnPropertyDescriptor(obj, key);
    if (property && property.configurable === false) {
      return
    }

    // cater for pre-defined getter/setters
    var getter = property && property.get;
    var setter = property && property.set;
    if ((!getter || setter) && arguments.length === 2) {
      val = obj[key];
    }

    var childOb = !shallow && observe(val);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter () {
        var value = getter ? getter.call(obj) : val;
        if (Dep.target) {
          dep.depend();
          if (childOb) {
            childOb.dep.depend();
            if (Array.isArray(value)) {
              dependArray(value);
            }
          }
        }
        return value
      },
      set: function reactiveSetter (newVal) {
        var value = getter ? getter.call(obj) : val;
        /* eslint-disable no-self-compare */
        if (newVal === value || (newVal !== newVal && value !== value)) {
          return
        }
        // #7981: for accessor properties without setter
        if (getter && !setter) { return }
        if (setter) {
          setter.call(obj, newVal);
        } else {
          val = newVal;
        }
        childOb = !shallow && observe(newVal);
        dep.notify();
      }
    });
  }

  /**
   * Set a property on an object. Adds the new property and
   * triggers change notification if the property doesn't
   * already exist.
   */
  function set (target, key, val) {
    if (Array.isArray(target) && isValidArrayIndex(key)) {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val
    }
    if (key in target && !(key in Object.prototype)) {
      target[key] = val;
      return val
    }
    var ob = (target).__ob__;
    if (target._isVue || (ob && ob.vmCount)) {
      return val
    }
    if (!ob) {
      target[key] = val;
      return val
    }
    defineReactive$$1(ob.value, key, val);
    ob.dep.notify();
    return val
  }

  /**
   * Delete a property and trigger change if necessary.
   */
  function del (target, key) {
    if (Array.isArray(target) && isValidArrayIndex(key)) {
      target.splice(key, 1);
      return
    }
    var ob = (target).__ob__;
    if (target._isVue || (ob && ob.vmCount)) {
      return
    }
    if (!hasOwn(target, key)) {
      return
    }
    delete target[key];
    if (!ob) {
      return
    }
    ob.dep.notify();
  }

  /**
   * Collect dependencies on array elements when the array is touched, since
   * we cannot intercept array element access like property getters.
   */
  function dependArray (value) {
    for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
      e = value[i];
      e && e.__ob__ && e.__ob__.dep.depend();
      if (Array.isArray(e)) {
        dependArray(e);
      }
    }
  }

  /*  */

  /**
   * Option overwriting strategies are functions that handle
   * how to merge a parent option value and a child option
   * value into the final value.
   */
  var strats = config.optionMergeStrategies;

  /**
   * Helper that recursively merges two data objects together.
   */
  function mergeData (to, from) {
    if (!from) { return to }
    var key, toVal, fromVal;

    var keys = hasSymbol
      ? Reflect.ownKeys(from)
      : Object.keys(from);

    for (var i = 0; i < keys.length; i++) {
      key = keys[i];
      // in case the object is already observed...
      if (key === '__ob__') { continue }
      toVal = to[key];
      fromVal = from[key];
      if (!hasOwn(to, key)) {
        set(to, key, fromVal);
      } else if (
        toVal !== fromVal &&
        isPlainObject(toVal) &&
        isPlainObject(fromVal)
      ) {
        mergeData(toVal, fromVal);
      }
    }
    return to
  }

  /**
   * Data
   */
  function mergeDataOrFn (
    parentVal,
    childVal,
    vm
  ) {
    if (!vm) {
      // in a Vue.extend merge, both should be functions
      if (!childVal) {
        return parentVal
      }
      if (!parentVal) {
        return childVal
      }
      // when parentVal & childVal are both present,
      // we need to return a function that returns the
      // merged result of both functions... no need to
      // check if parentVal is a function here because
      // it has to be a function to pass previous merges.
      return function mergedDataFn () {
        return mergeData(
          typeof childVal === 'function' ? childVal.call(this, this) : childVal,
          typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
        )
      }
    } else {
      return function mergedInstanceDataFn () {
        // instance merge
        var instanceData = typeof childVal === 'function'
          ? childVal.call(vm, vm)
          : childVal;
        var defaultData = typeof parentVal === 'function'
          ? parentVal.call(vm, vm)
          : parentVal;
        if (instanceData) {
          return mergeData(instanceData, defaultData)
        } else {
          return defaultData
        }
      }
    }
  }

  strats.data = function (
    parentVal,
    childVal,
    vm
  ) {
    if (!vm) {
      if (childVal && typeof childVal !== 'function') {

        return parentVal
      }
      return mergeDataOrFn(parentVal, childVal)
    }

    return mergeDataOrFn(parentVal, childVal, vm)
  };

  /**
   * Hooks and props are merged as arrays.
   */
  function mergeHook (
    parentVal,
    childVal
  ) {
    var res = childVal
      ? parentVal
        ? parentVal.concat(childVal)
        : Array.isArray(childVal)
          ? childVal
          : [childVal]
      : parentVal;
    return res
      ? dedupeHooks(res)
      : res
  }

  function dedupeHooks (hooks) {
    var res = [];
    for (var i = 0; i < hooks.length; i++) {
      if (res.indexOf(hooks[i]) === -1) {
        res.push(hooks[i]);
      }
    }
    return res
  }

  LIFECYCLE_HOOKS.forEach(function (hook) {
    strats[hook] = mergeHook;
  });

  /**
   * Assets
   *
   * When a vm is present (instance creation), we need to do
   * a three-way merge between constructor options, instance
   * options and parent options.
   */
  function mergeAssets (
    parentVal,
    childVal,
    vm,
    key
  ) {
    var res = Object.create(parentVal || null);
    if (childVal) {
      return extend(res, childVal)
    } else {
      return res
    }
  }

  ASSET_TYPES.forEach(function (type) {
    strats[type + 's'] = mergeAssets;
  });

  /**
   * Watchers.
   *
   * Watchers hashes should not overwrite one
   * another, so we merge them as arrays.
   */
  strats.watch = function (
    parentVal,
    childVal,
    vm,
    key
  ) {
    // work around Firefox's Object.prototype.watch...
    if (parentVal === nativeWatch) { parentVal = undefined; }
    if (childVal === nativeWatch) { childVal = undefined; }
    /* istanbul ignore if */
    if (!childVal) { return Object.create(parentVal || null) }
    if (!parentVal) { return childVal }
    var ret = {};
    extend(ret, parentVal);
    for (var key$1 in childVal) {
      var parent = ret[key$1];
      var child = childVal[key$1];
      if (parent && !Array.isArray(parent)) {
        parent = [parent];
      }
      ret[key$1] = parent
        ? parent.concat(child)
        : Array.isArray(child) ? child : [child];
    }
    return ret
  };

  /**
   * Other object hashes.
   */
  strats.props =
  strats.methods =
  strats.inject =
  strats.computed = function (
    parentVal,
    childVal,
    vm,
    key
  ) {
    if (childVal && "production" !== 'production') {
      assertObjectType(key, childVal);
    }
    if (!parentVal) { return childVal }
    var ret = Object.create(null);
    extend(ret, parentVal);
    if (childVal) { extend(ret, childVal); }
    return ret
  };
  strats.provide = mergeDataOrFn;

  /**
   * Default strategy.
   */
  var defaultStrat = function (parentVal, childVal) {
    return childVal === undefined
      ? parentVal
      : childVal
  };

  /**
   * Ensure all props option syntax are normalized into the
   * Object-based format.
   */
  function normalizeProps (options, vm) {
    var props = options.props;
    if (!props) { return }
    var res = {};
    var i, val, name;
    if (Array.isArray(props)) {
      i = props.length;
      while (i--) {
        val = props[i];
        if (typeof val === 'string') {
          name = camelize(val);
          res[name] = { type: null };
        }
      }
    } else if (isPlainObject(props)) {
      for (var key in props) {
        val = props[key];
        name = camelize(key);
        res[name] = isPlainObject(val)
          ? val
          : { type: val };
      }
    }
    options.props = res;
  }

  /**
   * Normalize all injections into Object-based format
   */
  function normalizeInject (options, vm) {
    var inject = options.inject;
    if (!inject) { return }
    var normalized = options.inject = {};
    if (Array.isArray(inject)) {
      for (var i = 0; i < inject.length; i++) {
        normalized[inject[i]] = { from: inject[i] };
      }
    } else if (isPlainObject(inject)) {
      for (var key in inject) {
        var val = inject[key];
        normalized[key] = isPlainObject(val)
          ? extend({ from: key }, val)
          : { from: val };
      }
    }
  }

  /**
   * Normalize raw function directives into object format.
   */
  function normalizeDirectives (options) {
    var dirs = options.directives;
    if (dirs) {
      for (var key in dirs) {
        var def$$1 = dirs[key];
        if (typeof def$$1 === 'function') {
          dirs[key] = { bind: def$$1, update: def$$1 };
        }
      }
    }
  }

  function assertObjectType (name, value, vm) {
    if (!isPlainObject(value)) {
      warn(
        "Invalid value for option \"" + name + "\": expected an Object, " +
        "but got " + (toRawType(value)) + ".");
    }
  }

  /**
   * Merge two option objects into a new one.
   * Core utility used in both instantiation and inheritance.
   */
  function mergeOptions (
    parent,
    child,
    vm
  ) {

    if (typeof child === 'function') {
      child = child.options;
    }

    normalizeProps(child);
    normalizeInject(child);
    normalizeDirectives(child);

    // Apply extends and mixins on the child options,
    // but only if it is a raw options object that isn't
    // the result of another mergeOptions call.
    // Only merged options has the _base property.
    if (!child._base) {
      if (child.extends) {
        parent = mergeOptions(parent, child.extends, vm);
      }
      if (child.mixins) {
        for (var i = 0, l = child.mixins.length; i < l; i++) {
          parent = mergeOptions(parent, child.mixins[i], vm);
        }
      }
    }

    var options = {};
    var key;
    for (key in parent) {
      mergeField(key);
    }
    for (key in child) {
      if (!hasOwn(parent, key)) {
        mergeField(key);
      }
    }
    function mergeField (key) {
      var strat = strats[key] || defaultStrat;
      options[key] = strat(parent[key], child[key], vm, key);
    }
    return options
  }

  /**
   * Resolve an asset.
   * This function is used because child instances need access
   * to assets defined in its ancestor chain.
   */
  function resolveAsset (
    options,
    type,
    id,
    warnMissing
  ) {
    /* istanbul ignore if */
    if (typeof id !== 'string') {
      return
    }
    var assets = options[type];
    // check local registration variations first
    if (hasOwn(assets, id)) { return assets[id] }
    var camelizedId = camelize(id);
    if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
    var PascalCaseId = capitalize(camelizedId);
    if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
    // fallback to prototype chain
    var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
    return res
  }

  /*  */



  function validateProp (
    key,
    propOptions,
    propsData,
    vm
  ) {
    var prop = propOptions[key];
    var absent = !hasOwn(propsData, key);
    var value = propsData[key];
    // boolean casting
    var booleanIndex = getTypeIndex(Boolean, prop.type);
    if (booleanIndex > -1) {
      if (absent && !hasOwn(prop, 'default')) {
        value = false;
      } else if (value === '' || value === hyphenate(key)) {
        // only cast empty string / same name to boolean if
        // boolean has higher priority
        var stringIndex = getTypeIndex(String, prop.type);
        if (stringIndex < 0 || booleanIndex < stringIndex) {
          value = true;
        }
      }
    }
    // check default value
    if (value === undefined) {
      value = getPropDefaultValue(vm, prop, key);
      // since the default value is a fresh copy,
      // make sure to observe it.
      var prevShouldObserve = shouldObserve;
      toggleObserving(true);
      observe(value);
      toggleObserving(prevShouldObserve);
    }
    return value
  }

  /**
   * Get the default value of a prop.
   */
  function getPropDefaultValue (vm, prop, key) {
    // no default, return undefined
    if (!hasOwn(prop, 'default')) {
      return undefined
    }
    var def = prop.default;
    // the raw prop value was also undefined from previous render,
    // return previous default value to avoid unnecessary watcher trigger
    if (vm && vm.$options.propsData &&
      vm.$options.propsData[key] === undefined &&
      vm._props[key] !== undefined
    ) {
      return vm._props[key]
    }
    // call factory function for non-Function types
    // a value is Function if its prototype is function even across different execution context
    return typeof def === 'function' && getType(prop.type) !== 'Function'
      ? def.call(vm)
      : def
  }

  /**
   * Use function string name to check built-in types,
   * because a simple equality check will fail when running
   * across different vms / iframes.
   */
  function getType (fn) {
    var match = fn && fn.toString().match(/^\s*function (\w+)/);
    return match ? match[1] : ''
  }

  function isSameType (a, b) {
    return getType(a) === getType(b)
  }

  function getTypeIndex (type, expectedTypes) {
    if (!Array.isArray(expectedTypes)) {
      return isSameType(expectedTypes, type) ? 0 : -1
    }
    for (var i = 0, len = expectedTypes.length; i < len; i++) {
      if (isSameType(expectedTypes[i], type)) {
        return i
      }
    }
    return -1
  }

  /*  */

  function handleError (err, vm, info) {
    // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
    // See: https://github.com/vuejs/vuex/issues/1505
    pushTarget();
    try {
      if (vm) {
        var cur = vm;
        while ((cur = cur.$parent)) {
          var hooks = cur.$options.errorCaptured;
          if (hooks) {
            for (var i = 0; i < hooks.length; i++) {
              try {
                var capture = hooks[i].call(cur, err, vm, info) === false;
                if (capture) { return }
              } catch (e) {
                globalHandleError(e, cur, 'errorCaptured hook');
              }
            }
          }
        }
      }
      globalHandleError(err, vm, info);
    } finally {
      popTarget();
    }
  }

  function invokeWithErrorHandling (
    handler,
    context,
    args,
    vm,
    info
  ) {
    var res;
    try {
      res = args ? handler.apply(context, args) : handler.call(context);
      if (res && !res._isVue && isPromise(res) && !res._handled) {
        res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
        // issue #9511
        // avoid catch triggering multiple times when nested calls
        res._handled = true;
      }
    } catch (e) {
      handleError(e, vm, info);
    }
    return res
  }

  function globalHandleError (err, vm, info) {
    if (config.errorHandler) {
      try {
        return config.errorHandler.call(null, err, vm, info)
      } catch (e) {
        // if the user intentionally throws the original error in the handler,
        // do not log it twice
        if (e !== err) {
          logError(e);
        }
      }
    }
    logError(err);
  }

  function logError (err, vm, info) {
    /* istanbul ignore else */
    if ((inBrowser || inWeex) && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }

  /*  */

  var isUsingMicroTask = false;

  var callbacks = [];
  var pending = false;

  function flushCallbacks () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // Here we have async deferring wrappers using microtasks.
  // In 2.5 we used (macro) tasks (in combination with microtasks).
  // However, it has subtle problems when state is changed right before repaint
  // (e.g. #6813, out-in transitions).
  // Also, using (macro) tasks in event handler would cause some weird behaviors
  // that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
  // So we now use microtasks everywhere, again.
  // A major drawback of this tradeoff is that there are some scenarios
  // where microtasks have too high a priority and fire in between supposedly
  // sequential events (e.g. #4521, #6690, which have workarounds)
  // or even between bubbling of the same event (#6566).
  var timerFunc;

  // The nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore next, $flow-disable-line */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    timerFunc = function () {
      p.then(flushCallbacks);
      // In problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
    isUsingMicroTask = true;
  } else if (!isIE && typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // Use MutationObserver where native Promise is not available,
    // e.g. PhantomJS, iOS7, Android 4.4
    // (#6466 MutationObserver is unreliable in IE11)
    var counter = 1;
    var observer = new MutationObserver(flushCallbacks);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
    isUsingMicroTask = true;
  } else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
    // Fallback to setImmediate.
    // Technically it leverages the (macro) task queue,
    // but it is still a better choice than setTimeout.
    timerFunc = function () {
      setImmediate(flushCallbacks);
    };
  } else {
    // Fallback to setTimeout.
    timerFunc = function () {
      setTimeout(flushCallbacks, 0);
    };
  }

  function nextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve) {
        _resolve = resolve;
      })
    }
  }

  /*  */

  var seenObjects = new _Set();

  /**
   * Recursively traverse an object to evoke all converted
   * getters, so that every nested property inside the object
   * is collected as a "deep" dependency.
   */
  function traverse (val) {
    _traverse(val, seenObjects);
    seenObjects.clear();
  }

  function _traverse (val, seen) {
    var i, keys;
    var isA = Array.isArray(val);
    if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
      return
    }
    if (val.__ob__) {
      var depId = val.__ob__.dep.id;
      if (seen.has(depId)) {
        return
      }
      seen.add(depId);
    }
    if (isA) {
      i = val.length;
      while (i--) { _traverse(val[i], seen); }
    } else {
      keys = Object.keys(val);
      i = keys.length;
      while (i--) { _traverse(val[keys[i]], seen); }
    }
  }

  /*  */

  var normalizeEvent = cached(function (name) {
    var passive = name.charAt(0) === '&';
    name = passive ? name.slice(1) : name;
    var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
    name = once$$1 ? name.slice(1) : name;
    var capture = name.charAt(0) === '!';
    name = capture ? name.slice(1) : name;
    return {
      name: name,
      once: once$$1,
      capture: capture,
      passive: passive
    }
  });

  function createFnInvoker (fns, vm) {
    function invoker () {
      var arguments$1 = arguments;

      var fns = invoker.fns;
      if (Array.isArray(fns)) {
        var cloned = fns.slice();
        for (var i = 0; i < cloned.length; i++) {
          invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
        }
      } else {
        // return handler return value for single handlers
        return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
      }
    }
    invoker.fns = fns;
    return invoker
  }

  function updateListeners (
    on,
    oldOn,
    add,
    remove$$1,
    createOnceHandler,
    vm
  ) {
    var name, def$$1, cur, old, event;
    for (name in on) {
      def$$1 = cur = on[name];
      old = oldOn[name];
      event = normalizeEvent(name);
      if (isUndef(cur)) ; else if (isUndef(old)) {
        if (isUndef(cur.fns)) {
          cur = on[name] = createFnInvoker(cur, vm);
        }
        if (isTrue(event.once)) {
          cur = on[name] = createOnceHandler(event.name, cur, event.capture);
        }
        add(event.name, cur, event.capture, event.passive, event.params);
      } else if (cur !== old) {
        old.fns = cur;
        on[name] = old;
      }
    }
    for (name in oldOn) {
      if (isUndef(on[name])) {
        event = normalizeEvent(name);
        remove$$1(event.name, oldOn[name], event.capture);
      }
    }
  }

  /*  */

  function mergeVNodeHook (def, hookKey, hook) {
    if (def instanceof VNode) {
      def = def.data.hook || (def.data.hook = {});
    }
    var invoker;
    var oldHook = def[hookKey];

    function wrappedHook () {
      hook.apply(this, arguments);
      // important: remove merged hook to ensure it's called only once
      // and prevent memory leak
      remove(invoker.fns, wrappedHook);
    }

    if (isUndef(oldHook)) {
      // no existing hook
      invoker = createFnInvoker([wrappedHook]);
    } else {
      /* istanbul ignore if */
      if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
        // already a merged invoker
        invoker = oldHook;
        invoker.fns.push(wrappedHook);
      } else {
        // existing plain hook
        invoker = createFnInvoker([oldHook, wrappedHook]);
      }
    }

    invoker.merged = true;
    def[hookKey] = invoker;
  }

  /*  */

  function extractPropsFromVNodeData (
    data,
    Ctor,
    tag
  ) {
    // we are only extracting raw values here.
    // validation and default values are handled in the child
    // component itself.
    var propOptions = Ctor.options.props;
    if (isUndef(propOptions)) {
      return
    }
    var res = {};
    var attrs = data.attrs;
    var props = data.props;
    if (isDef(attrs) || isDef(props)) {
      for (var key in propOptions) {
        var altKey = hyphenate(key);
        checkProp(res, props, key, altKey, true) ||
        checkProp(res, attrs, key, altKey, false);
      }
    }
    return res
  }

  function checkProp (
    res,
    hash,
    key,
    altKey,
    preserve
  ) {
    if (isDef(hash)) {
      if (hasOwn(hash, key)) {
        res[key] = hash[key];
        if (!preserve) {
          delete hash[key];
        }
        return true
      } else if (hasOwn(hash, altKey)) {
        res[key] = hash[altKey];
        if (!preserve) {
          delete hash[altKey];
        }
        return true
      }
    }
    return false
  }

  /*  */

  // The template compiler attempts to minimize the need for normalization by
  // statically analyzing the template at compile time.
  //
  // For plain HTML markup, normalization can be completely skipped because the
  // generated render function is guaranteed to return Array<VNode>. There are
  // two cases where extra normalization is needed:

  // 1. When the children contains components - because a functional component
  // may return an Array instead of a single root. In this case, just a simple
  // normalization is needed - if any child is an Array, we flatten the whole
  // thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
  // because functional components already normalize their own children.
  function simpleNormalizeChildren (children) {
    for (var i = 0; i < children.length; i++) {
      if (Array.isArray(children[i])) {
        return Array.prototype.concat.apply([], children)
      }
    }
    return children
  }

  // 2. When the children contains constructs that always generated nested Arrays,
  // e.g. <template>, <slot>, v-for, or when the children is provided by user
  // with hand-written render functions / JSX. In such cases a full normalization
  // is needed to cater to all possible types of children values.
  function normalizeChildren (children) {
    return isPrimitive(children)
      ? [createTextVNode(children)]
      : Array.isArray(children)
        ? normalizeArrayChildren(children)
        : undefined
  }

  function isTextNode (node) {
    return isDef(node) && isDef(node.text) && isFalse(node.isComment)
  }

  function normalizeArrayChildren (children, nestedIndex) {
    var res = [];
    var i, c, lastIndex, last;
    for (i = 0; i < children.length; i++) {
      c = children[i];
      if (isUndef(c) || typeof c === 'boolean') { continue }
      lastIndex = res.length - 1;
      last = res[lastIndex];
      //  nested
      if (Array.isArray(c)) {
        if (c.length > 0) {
          c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
          // merge adjacent text nodes
          if (isTextNode(c[0]) && isTextNode(last)) {
            res[lastIndex] = createTextVNode(last.text + (c[0]).text);
            c.shift();
          }
          res.push.apply(res, c);
        }
      } else if (isPrimitive(c)) {
        if (isTextNode(last)) {
          // merge adjacent text nodes
          // this is necessary for SSR hydration because text nodes are
          // essentially merged when rendered to HTML strings
          res[lastIndex] = createTextVNode(last.text + c);
        } else if (c !== '') {
          // convert primitive to vnode
          res.push(createTextVNode(c));
        }
      } else {
        if (isTextNode(c) && isTextNode(last)) {
          // merge adjacent text nodes
          res[lastIndex] = createTextVNode(last.text + c.text);
        } else {
          // default key for nested array children (likely generated by v-for)
          if (isTrue(children._isVList) &&
            isDef(c.tag) &&
            isUndef(c.key) &&
            isDef(nestedIndex)) {
            c.key = "__vlist" + nestedIndex + "_" + i + "__";
          }
          res.push(c);
        }
      }
    }
    return res
  }

  /*  */

  function initProvide (vm) {
    var provide = vm.$options.provide;
    if (provide) {
      vm._provided = typeof provide === 'function'
        ? provide.call(vm)
        : provide;
    }
  }

  function initInjections (vm) {
    var result = resolveInject(vm.$options.inject, vm);
    if (result) {
      toggleObserving(false);
      Object.keys(result).forEach(function (key) {
        /* istanbul ignore else */
        {
          defineReactive$$1(vm, key, result[key]);
        }
      });
      toggleObserving(true);
    }
  }

  function resolveInject (inject, vm) {
    if (inject) {
      // inject is :any because flow is not smart enough to figure out cached
      var result = Object.create(null);
      var keys = hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        // #6574 in case the inject object is observed...
        if (key === '__ob__') { continue }
        var provideKey = inject[key].from;
        var source = vm;
        while (source) {
          if (source._provided && hasOwn(source._provided, provideKey)) {
            result[key] = source._provided[provideKey];
            break
          }
          source = source.$parent;
        }
        if (!source) {
          if ('default' in inject[key]) {
            var provideDefault = inject[key].default;
            result[key] = typeof provideDefault === 'function'
              ? provideDefault.call(vm)
              : provideDefault;
          }
        }
      }
      return result
    }
  }

  /*  */



  /**
   * Runtime helper for resolving raw children VNodes into a slot object.
   */
  function resolveSlots (
    children,
    context
  ) {
    if (!children || !children.length) {
      return {}
    }
    var slots = {};
    for (var i = 0, l = children.length; i < l; i++) {
      var child = children[i];
      var data = child.data;
      // remove slot attribute if the node is resolved as a Vue slot node
      if (data && data.attrs && data.attrs.slot) {
        delete data.attrs.slot;
      }
      // named slots should only be respected if the vnode was rendered in the
      // same context.
      if ((child.context === context || child.fnContext === context) &&
        data && data.slot != null
      ) {
        var name = data.slot;
        var slot = (slots[name] || (slots[name] = []));
        if (child.tag === 'template') {
          slot.push.apply(slot, child.children || []);
        } else {
          slot.push(child);
        }
      } else {
        (slots.default || (slots.default = [])).push(child);
      }
    }
    // ignore slots that contains only whitespace
    for (var name$1 in slots) {
      if (slots[name$1].every(isWhitespace)) {
        delete slots[name$1];
      }
    }
    return slots
  }

  function isWhitespace (node) {
    return (node.isComment && !node.asyncFactory) || node.text === ' '
  }

  /*  */

  function normalizeScopedSlots (
    slots,
    normalSlots,
    prevSlots
  ) {
    var res;
    var hasNormalSlots = Object.keys(normalSlots).length > 0;
    var isStable = slots ? !!slots.$stable : !hasNormalSlots;
    var key = slots && slots.$key;
    if (!slots) {
      res = {};
    } else if (slots._normalized) {
      // fast path 1: child component re-render only, parent did not change
      return slots._normalized
    } else if (
      isStable &&
      prevSlots &&
      prevSlots !== emptyObject &&
      key === prevSlots.$key &&
      !hasNormalSlots &&
      !prevSlots.$hasNormal
    ) {
      // fast path 2: stable scoped slots w/ no normal slots to proxy,
      // only need to normalize once
      return prevSlots
    } else {
      res = {};
      for (var key$1 in slots) {
        if (slots[key$1] && key$1[0] !== '$') {
          res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
        }
      }
    }
    // expose normal slots on scopedSlots
    for (var key$2 in normalSlots) {
      if (!(key$2 in res)) {
        res[key$2] = proxyNormalSlot(normalSlots, key$2);
      }
    }
    // avoriaz seems to mock a non-extensible $scopedSlots object
    // and when that is passed down this would cause an error
    if (slots && Object.isExtensible(slots)) {
      (slots)._normalized = res;
    }
    def(res, '$stable', isStable);
    def(res, '$key', key);
    def(res, '$hasNormal', hasNormalSlots);
    return res
  }

  function normalizeScopedSlot(normalSlots, key, fn) {
    var normalized = function () {
      var res = arguments.length ? fn.apply(null, arguments) : fn({});
      res = res && typeof res === 'object' && !Array.isArray(res)
        ? [res] // single vnode
        : normalizeChildren(res);
      return res && (
        res.length === 0 ||
        (res.length === 1 && res[0].isComment) // #9658
      ) ? undefined
        : res
    };
    // this is a slot using the new v-slot syntax without scope. although it is
    // compiled as a scoped slot, render fn users would expect it to be present
    // on this.$slots because the usage is semantically a normal slot.
    if (fn.proxy) {
      Object.defineProperty(normalSlots, key, {
        get: normalized,
        enumerable: true,
        configurable: true
      });
    }
    return normalized
  }

  function proxyNormalSlot(slots, key) {
    return function () { return slots[key]; }
  }

  /*  */

  /**
   * Runtime helper for rendering v-for lists.
   */
  function renderList (
    val,
    render
  ) {
    var ret, i, l, keys, key;
    if (Array.isArray(val) || typeof val === 'string') {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = render(val[i], i);
      }
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0; i < val; i++) {
        ret[i] = render(i + 1, i);
      }
    } else if (isObject(val)) {
      if (hasSymbol && val[Symbol.iterator]) {
        ret = [];
        var iterator = val[Symbol.iterator]();
        var result = iterator.next();
        while (!result.done) {
          ret.push(render(result.value, ret.length));
          result = iterator.next();
        }
      } else {
        keys = Object.keys(val);
        ret = new Array(keys.length);
        for (i = 0, l = keys.length; i < l; i++) {
          key = keys[i];
          ret[i] = render(val[key], key, i);
        }
      }
    }
    if (!isDef(ret)) {
      ret = [];
    }
    (ret)._isVList = true;
    return ret
  }

  /*  */

  /**
   * Runtime helper for rendering <slot>
   */
  function renderSlot (
    name,
    fallback,
    props,
    bindObject
  ) {
    var scopedSlotFn = this.$scopedSlots[name];
    var nodes;
    if (scopedSlotFn) { // scoped slot
      props = props || {};
      if (bindObject) {
        props = extend(extend({}, bindObject), props);
      }
      nodes = scopedSlotFn(props) || fallback;
    } else {
      nodes = this.$slots[name] || fallback;
    }

    var target = props && props.slot;
    if (target) {
      return this.$createElement('template', { slot: target }, nodes)
    } else {
      return nodes
    }
  }

  /*  */

  /**
   * Runtime helper for resolving filters
   */
  function resolveFilter (id) {
    return resolveAsset(this.$options, 'filters', id) || identity
  }

  /*  */

  function isKeyNotMatch (expect, actual) {
    if (Array.isArray(expect)) {
      return expect.indexOf(actual) === -1
    } else {
      return expect !== actual
    }
  }

  /**
   * Runtime helper for checking keyCodes from config.
   * exposed as Vue.prototype._k
   * passing in eventKeyName as last argument separately for backwards compat
   */
  function checkKeyCodes (
    eventKeyCode,
    key,
    builtInKeyCode,
    eventKeyName,
    builtInKeyName
  ) {
    var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
    if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
      return isKeyNotMatch(builtInKeyName, eventKeyName)
    } else if (mappedKeyCode) {
      return isKeyNotMatch(mappedKeyCode, eventKeyCode)
    } else if (eventKeyName) {
      return hyphenate(eventKeyName) !== key
    }
  }

  /*  */

  /**
   * Runtime helper for merging v-bind="object" into a VNode's data.
   */
  function bindObjectProps (
    data,
    tag,
    value,
    asProp,
    isSync
  ) {
    if (value) {
      if (!isObject(value)) ; else {
        if (Array.isArray(value)) {
          value = toObject(value);
        }
        var hash;
        var loop = function ( key ) {
          if (
            key === 'class' ||
            key === 'style' ||
            isReservedAttribute(key)
          ) {
            hash = data;
          } else {
            var type = data.attrs && data.attrs.type;
            hash = asProp || config.mustUseProp(tag, type, key)
              ? data.domProps || (data.domProps = {})
              : data.attrs || (data.attrs = {});
          }
          var camelizedKey = camelize(key);
          var hyphenatedKey = hyphenate(key);
          if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
            hash[key] = value[key];

            if (isSync) {
              var on = data.on || (data.on = {});
              on[("update:" + key)] = function ($event) {
                value[key] = $event;
              };
            }
          }
        };

        for (var key in value) loop( key );
      }
    }
    return data
  }

  /*  */

  /**
   * Runtime helper for rendering static trees.
   */
  function renderStatic (
    index,
    isInFor
  ) {
    var cached = this._staticTrees || (this._staticTrees = []);
    var tree = cached[index];
    // if has already-rendered static tree and not inside v-for,
    // we can reuse the same tree.
    if (tree && !isInFor) {
      return tree
    }
    // otherwise, render a fresh tree.
    tree = cached[index] = this.$options.staticRenderFns[index].call(
      this._renderProxy,
      null,
      this // for render fns generated for functional component templates
    );
    markStatic(tree, ("__static__" + index), false);
    return tree
  }

  /**
   * Runtime helper for v-once.
   * Effectively it means marking the node as static with a unique key.
   */
  function markOnce (
    tree,
    index,
    key
  ) {
    markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
    return tree
  }

  function markStatic (
    tree,
    key,
    isOnce
  ) {
    if (Array.isArray(tree)) {
      for (var i = 0; i < tree.length; i++) {
        if (tree[i] && typeof tree[i] !== 'string') {
          markStaticNode(tree[i], (key + "_" + i), isOnce);
        }
      }
    } else {
      markStaticNode(tree, key, isOnce);
    }
  }

  function markStaticNode (node, key, isOnce) {
    node.isStatic = true;
    node.key = key;
    node.isOnce = isOnce;
  }

  /*  */

  function bindObjectListeners (data, value) {
    if (value) {
      if (!isPlainObject(value)) ; else {
        var on = data.on = data.on ? extend({}, data.on) : {};
        for (var key in value) {
          var existing = on[key];
          var ours = value[key];
          on[key] = existing ? [].concat(existing, ours) : ours;
        }
      }
    }
    return data
  }

  /*  */

  function resolveScopedSlots (
    fns, // see flow/vnode
    res,
    // the following are added in 2.6
    hasDynamicKeys,
    contentHashKey
  ) {
    res = res || { $stable: !hasDynamicKeys };
    for (var i = 0; i < fns.length; i++) {
      var slot = fns[i];
      if (Array.isArray(slot)) {
        resolveScopedSlots(slot, res, hasDynamicKeys);
      } else if (slot) {
        // marker for reverse proxying v-slot without scope on this.$slots
        if (slot.proxy) {
          slot.fn.proxy = true;
        }
        res[slot.key] = slot.fn;
      }
    }
    if (contentHashKey) {
      (res).$key = contentHashKey;
    }
    return res
  }

  /*  */

  function bindDynamicKeys (baseObj, values) {
    for (var i = 0; i < values.length; i += 2) {
      var key = values[i];
      if (typeof key === 'string' && key) {
        baseObj[values[i]] = values[i + 1];
      }
    }
    return baseObj
  }

  // helper to dynamically append modifier runtime markers to event names.
  // ensure only append when value is already string, otherwise it will be cast
  // to string and cause the type check to miss.
  function prependModifier (value, symbol) {
    return typeof value === 'string' ? symbol + value : value
  }

  /*  */

  function installRenderHelpers (target) {
    target._o = markOnce;
    target._n = toNumber;
    target._s = toString;
    target._l = renderList;
    target._t = renderSlot;
    target._q = looseEqual;
    target._i = looseIndexOf;
    target._m = renderStatic;
    target._f = resolveFilter;
    target._k = checkKeyCodes;
    target._b = bindObjectProps;
    target._v = createTextVNode;
    target._e = createEmptyVNode;
    target._u = resolveScopedSlots;
    target._g = bindObjectListeners;
    target._d = bindDynamicKeys;
    target._p = prependModifier;
  }

  /*  */

  function FunctionalRenderContext (
    data,
    props,
    children,
    parent,
    Ctor
  ) {
    var this$1 = this;

    var options = Ctor.options;
    // ensure the createElement function in functional components
    // gets a unique context - this is necessary for correct named slot check
    var contextVm;
    if (hasOwn(parent, '_uid')) {
      contextVm = Object.create(parent);
      // $flow-disable-line
      contextVm._original = parent;
    } else {
      // the context vm passed in is a functional context as well.
      // in this case we want to make sure we are able to get a hold to the
      // real context instance.
      contextVm = parent;
      // $flow-disable-line
      parent = parent._original;
    }
    var isCompiled = isTrue(options._compiled);
    var needNormalization = !isCompiled;

    this.data = data;
    this.props = props;
    this.children = children;
    this.parent = parent;
    this.listeners = data.on || emptyObject;
    this.injections = resolveInject(options.inject, parent);
    this.slots = function () {
      if (!this$1.$slots) {
        normalizeScopedSlots(
          data.scopedSlots,
          this$1.$slots = resolveSlots(children, parent)
        );
      }
      return this$1.$slots
    };

    Object.defineProperty(this, 'scopedSlots', ({
      enumerable: true,
      get: function get () {
        return normalizeScopedSlots(data.scopedSlots, this.slots())
      }
    }));

    // support for compiled functional template
    if (isCompiled) {
      // exposing $options for renderStatic()
      this.$options = options;
      // pre-resolve slots for renderSlot()
      this.$slots = this.slots();
      this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
    }

    if (options._scopeId) {
      this._c = function (a, b, c, d) {
        var vnode = createElement(contextVm, a, b, c, d, needNormalization);
        if (vnode && !Array.isArray(vnode)) {
          vnode.fnScopeId = options._scopeId;
          vnode.fnContext = parent;
        }
        return vnode
      };
    } else {
      this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
    }
  }

  installRenderHelpers(FunctionalRenderContext.prototype);

  function createFunctionalComponent (
    Ctor,
    propsData,
    data,
    contextVm,
    children
  ) {
    var options = Ctor.options;
    var props = {};
    var propOptions = options.props;
    if (isDef(propOptions)) {
      for (var key in propOptions) {
        props[key] = validateProp(key, propOptions, propsData || emptyObject);
      }
    } else {
      if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
      if (isDef(data.props)) { mergeProps(props, data.props); }
    }

    var renderContext = new FunctionalRenderContext(
      data,
      props,
      children,
      contextVm,
      Ctor
    );

    var vnode = options.render.call(null, renderContext._c, renderContext);

    if (vnode instanceof VNode) {
      return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options)
    } else if (Array.isArray(vnode)) {
      var vnodes = normalizeChildren(vnode) || [];
      var res = new Array(vnodes.length);
      for (var i = 0; i < vnodes.length; i++) {
        res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options);
      }
      return res
    }
  }

  function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
    // #7817 clone node before setting fnContext, otherwise if the node is reused
    // (e.g. it was from a cached normal slot) the fnContext causes named slots
    // that should not be matched to match.
    var clone = cloneVNode(vnode);
    clone.fnContext = contextVm;
    clone.fnOptions = options;
    if (data.slot) {
      (clone.data || (clone.data = {})).slot = data.slot;
    }
    return clone
  }

  function mergeProps (to, from) {
    for (var key in from) {
      to[camelize(key)] = from[key];
    }
  }

  /*  */

  /*  */

  /*  */

  /*  */

  // inline hooks to be invoked on component VNodes during patch
  var componentVNodeHooks = {
    init: function init (vnode, hydrating) {
      if (
        vnode.componentInstance &&
        !vnode.componentInstance._isDestroyed &&
        vnode.data.keepAlive
      ) {
        // kept-alive components, treat as a patch
        var mountedNode = vnode; // work around flow
        componentVNodeHooks.prepatch(mountedNode, mountedNode);
      } else {
        var child = vnode.componentInstance = createComponentInstanceForVnode(
          vnode,
          activeInstance
        );
        child.$mount(hydrating ? vnode.elm : undefined, hydrating);
      }
    },

    prepatch: function prepatch (oldVnode, vnode) {
      var options = vnode.componentOptions;
      var child = vnode.componentInstance = oldVnode.componentInstance;
      updateChildComponent(
        child,
        options.propsData, // updated props
        options.listeners, // updated listeners
        vnode, // new parent vnode
        options.children // new children
      );
    },

    insert: function insert (vnode) {
      var context = vnode.context;
      var componentInstance = vnode.componentInstance;
      if (!componentInstance._isMounted) {
        componentInstance._isMounted = true;
        callHook(componentInstance, 'mounted');
      }
      if (vnode.data.keepAlive) {
        if (context._isMounted) {
          // vue-router#1212
          // During updates, a kept-alive component's child components may
          // change, so directly walking the tree here may call activated hooks
          // on incorrect children. Instead we push them into a queue which will
          // be processed after the whole patch process ended.
          queueActivatedComponent(componentInstance);
        } else {
          activateChildComponent(componentInstance, true /* direct */);
        }
      }
    },

    destroy: function destroy (vnode) {
      var componentInstance = vnode.componentInstance;
      if (!componentInstance._isDestroyed) {
        if (!vnode.data.keepAlive) {
          componentInstance.$destroy();
        } else {
          deactivateChildComponent(componentInstance, true /* direct */);
        }
      }
    }
  };

  var hooksToMerge = Object.keys(componentVNodeHooks);

  function createComponent (
    Ctor,
    data,
    context,
    children,
    tag
  ) {
    if (isUndef(Ctor)) {
      return
    }

    var baseCtor = context.$options._base;

    // plain options object: turn it into a constructor
    if (isObject(Ctor)) {
      Ctor = baseCtor.extend(Ctor);
    }

    // if at this stage it's not a constructor or an async component factory,
    // reject.
    if (typeof Ctor !== 'function') {
      return
    }

    // async component
    var asyncFactory;
    if (isUndef(Ctor.cid)) {
      asyncFactory = Ctor;
      Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
      if (Ctor === undefined) {
        // return a placeholder node for async component, which is rendered
        // as a comment node but preserves all the raw information for the node.
        // the information will be used for async server-rendering and hydration.
        return createAsyncPlaceholder(
          asyncFactory,
          data,
          context,
          children,
          tag
        )
      }
    }

    data = data || {};

    // resolve constructor options in case global mixins are applied after
    // component constructor creation
    resolveConstructorOptions(Ctor);

    // transform component v-model data into props & events
    if (isDef(data.model)) {
      transformModel(Ctor.options, data);
    }

    // extract props
    var propsData = extractPropsFromVNodeData(data, Ctor);

    // functional component
    if (isTrue(Ctor.options.functional)) {
      return createFunctionalComponent(Ctor, propsData, data, context, children)
    }

    // extract listeners, since these needs to be treated as
    // child component listeners instead of DOM listeners
    var listeners = data.on;
    // replace with listeners with .native modifier
    // so it gets processed during parent component patch.
    data.on = data.nativeOn;

    if (isTrue(Ctor.options.abstract)) {
      // abstract components do not keep anything
      // other than props & listeners & slot

      // work around flow
      var slot = data.slot;
      data = {};
      if (slot) {
        data.slot = slot;
      }
    }

    // install component management hooks onto the placeholder node
    installComponentHooks(data);

    // return a placeholder vnode
    var name = Ctor.options.name || tag;
    var vnode = new VNode(
      ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
      data, undefined, undefined, undefined, context,
      { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
      asyncFactory
    );

    return vnode
  }

  function createComponentInstanceForVnode (
    vnode, // we know it's MountedComponentVNode but flow doesn't
    parent // activeInstance in lifecycle state
  ) {
    var options = {
      _isComponent: true,
      _parentVnode: vnode,
      parent: parent
    };
    // check inline-template render functions
    var inlineTemplate = vnode.data.inlineTemplate;
    if (isDef(inlineTemplate)) {
      options.render = inlineTemplate.render;
      options.staticRenderFns = inlineTemplate.staticRenderFns;
    }
    return new vnode.componentOptions.Ctor(options)
  }

  function installComponentHooks (data) {
    var hooks = data.hook || (data.hook = {});
    for (var i = 0; i < hooksToMerge.length; i++) {
      var key = hooksToMerge[i];
      var existing = hooks[key];
      var toMerge = componentVNodeHooks[key];
      if (existing !== toMerge && !(existing && existing._merged)) {
        hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
      }
    }
  }

  function mergeHook$1 (f1, f2) {
    var merged = function (a, b) {
      // flow complains about extra args which is why we use any
      f1(a, b);
      f2(a, b);
    };
    merged._merged = true;
    return merged
  }

  // transform component v-model info (value and callback) into
  // prop and event handler respectively.
  function transformModel (options, data) {
    var prop = (options.model && options.model.prop) || 'value';
    var event = (options.model && options.model.event) || 'input'
    ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
    var on = data.on || (data.on = {});
    var existing = on[event];
    var callback = data.model.callback;
    if (isDef(existing)) {
      if (
        Array.isArray(existing)
          ? existing.indexOf(callback) === -1
          : existing !== callback
      ) {
        on[event] = [callback].concat(existing);
      }
    } else {
      on[event] = callback;
    }
  }

  /*  */

  var SIMPLE_NORMALIZE = 1;
  var ALWAYS_NORMALIZE = 2;

  // wrapper function for providing a more flexible interface
  // without getting yelled at by flow
  function createElement (
    context,
    tag,
    data,
    children,
    normalizationType,
    alwaysNormalize
  ) {
    if (Array.isArray(data) || isPrimitive(data)) {
      normalizationType = children;
      children = data;
      data = undefined;
    }
    if (isTrue(alwaysNormalize)) {
      normalizationType = ALWAYS_NORMALIZE;
    }
    return _createElement(context, tag, data, children, normalizationType)
  }

  function _createElement (
    context,
    tag,
    data,
    children,
    normalizationType
  ) {
    if (isDef(data) && isDef((data).__ob__)) {
      return createEmptyVNode()
    }
    // object syntax in v-bind
    if (isDef(data) && isDef(data.is)) {
      tag = data.is;
    }
    if (!tag) {
      // in case of component :is set to falsy value
      return createEmptyVNode()
    }
    // support single function children as default scoped slot
    if (Array.isArray(children) &&
      typeof children[0] === 'function'
    ) {
      data = data || {};
      data.scopedSlots = { default: children[0] };
      children.length = 0;
    }
    if (normalizationType === ALWAYS_NORMALIZE) {
      children = normalizeChildren(children);
    } else if (normalizationType === SIMPLE_NORMALIZE) {
      children = simpleNormalizeChildren(children);
    }
    var vnode, ns;
    if (typeof tag === 'string') {
      var Ctor;
      ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
      if (config.isReservedTag(tag)) {
        vnode = new VNode(
          config.parsePlatformTagName(tag), data, children,
          undefined, undefined, context
        );
      } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
        // component
        vnode = createComponent(Ctor, data, context, children, tag);
      } else {
        // unknown or unlisted namespaced elements
        // check at runtime because it may get assigned a namespace when its
        // parent normalizes children
        vnode = new VNode(
          tag, data, children,
          undefined, undefined, context
        );
      }
    } else {
      // direct component options / constructor
      vnode = createComponent(tag, data, context, children);
    }
    if (Array.isArray(vnode)) {
      return vnode
    } else if (isDef(vnode)) {
      if (isDef(ns)) { applyNS(vnode, ns); }
      if (isDef(data)) { registerDeepBindings(data); }
      return vnode
    } else {
      return createEmptyVNode()
    }
  }

  function applyNS (vnode, ns, force) {
    vnode.ns = ns;
    if (vnode.tag === 'foreignObject') {
      // use default namespace inside foreignObject
      ns = undefined;
      force = true;
    }
    if (isDef(vnode.children)) {
      for (var i = 0, l = vnode.children.length; i < l; i++) {
        var child = vnode.children[i];
        if (isDef(child.tag) && (
          isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
          applyNS(child, ns, force);
        }
      }
    }
  }

  // ref #5318
  // necessary to ensure parent re-render when deep bindings like :style and
  // :class are used on slot nodes
  function registerDeepBindings (data) {
    if (isObject(data.style)) {
      traverse(data.style);
    }
    if (isObject(data.class)) {
      traverse(data.class);
    }
  }

  /*  */

  function initRender (vm) {
    vm._vnode = null; // the root of the child tree
    vm._staticTrees = null; // v-once cached trees
    var options = vm.$options;
    var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
    var renderContext = parentVnode && parentVnode.context;
    vm.$slots = resolveSlots(options._renderChildren, renderContext);
    vm.$scopedSlots = emptyObject;
    // bind the createElement fn to this instance
    // so that we get proper render context inside it.
    // args order: tag, data, children, normalizationType, alwaysNormalize
    // internal version is used by render functions compiled from templates
    vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
    // normalization is always applied for the public version, used in
    // user-written render functions.
    vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

    // $attrs & $listeners are exposed for easier HOC creation.
    // they need to be reactive so that HOCs using them are always updated
    var parentData = parentVnode && parentVnode.data;

    /* istanbul ignore else */
    {
      defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
      defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, null, true);
    }
  }

  var currentRenderingInstance = null;

  function renderMixin (Vue) {
    // install runtime convenience helpers
    installRenderHelpers(Vue.prototype);

    Vue.prototype.$nextTick = function (fn) {
      return nextTick(fn, this)
    };

    Vue.prototype._render = function () {
      var vm = this;
      var ref = vm.$options;
      var render = ref.render;
      var _parentVnode = ref._parentVnode;

      if (_parentVnode) {
        vm.$scopedSlots = normalizeScopedSlots(
          _parentVnode.data.scopedSlots,
          vm.$slots,
          vm.$scopedSlots
        );
      }

      // set parent vnode. this allows render functions to have access
      // to the data on the placeholder node.
      vm.$vnode = _parentVnode;
      // render self
      var vnode;
      try {
        // There's no need to maintain a stack because all render fns are called
        // separately from one another. Nested component's render fns are called
        // when parent component is patched.
        currentRenderingInstance = vm;
        vnode = render.call(vm._renderProxy, vm.$createElement);
      } catch (e) {
        handleError(e, vm, "render");
        // return error render result,
        // or previous vnode to prevent render error causing blank component
        /* istanbul ignore else */
        {
          vnode = vm._vnode;
        }
      } finally {
        currentRenderingInstance = null;
      }
      // if the returned array contains only a single node, allow it
      if (Array.isArray(vnode) && vnode.length === 1) {
        vnode = vnode[0];
      }
      // return empty vnode in case the render function errored out
      if (!(vnode instanceof VNode)) {
        vnode = createEmptyVNode();
      }
      // set parent
      vnode.parent = _parentVnode;
      return vnode
    };
  }

  /*  */

  function ensureCtor (comp, base) {
    if (
      comp.__esModule ||
      (hasSymbol && comp[Symbol.toStringTag] === 'Module')
    ) {
      comp = comp.default;
    }
    return isObject(comp)
      ? base.extend(comp)
      : comp
  }

  function createAsyncPlaceholder (
    factory,
    data,
    context,
    children,
    tag
  ) {
    var node = createEmptyVNode();
    node.asyncFactory = factory;
    node.asyncMeta = { data: data, context: context, children: children, tag: tag };
    return node
  }

  function resolveAsyncComponent (
    factory,
    baseCtor
  ) {
    if (isTrue(factory.error) && isDef(factory.errorComp)) {
      return factory.errorComp
    }

    if (isDef(factory.resolved)) {
      return factory.resolved
    }

    var owner = currentRenderingInstance;
    if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
      // already pending
      factory.owners.push(owner);
    }

    if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
      return factory.loadingComp
    }

    if (owner && !isDef(factory.owners)) {
      var owners = factory.owners = [owner];
      var sync = true;
      var timerLoading = null;
      var timerTimeout = null

      ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

      var forceRender = function (renderCompleted) {
        for (var i = 0, l = owners.length; i < l; i++) {
          (owners[i]).$forceUpdate();
        }

        if (renderCompleted) {
          owners.length = 0;
          if (timerLoading !== null) {
            clearTimeout(timerLoading);
            timerLoading = null;
          }
          if (timerTimeout !== null) {
            clearTimeout(timerTimeout);
            timerTimeout = null;
          }
        }
      };

      var resolve = once(function (res) {
        // cache resolved
        factory.resolved = ensureCtor(res, baseCtor);
        // invoke callbacks only if this is not a synchronous resolve
        // (async resolves are shimmed as synchronous during SSR)
        if (!sync) {
          forceRender(true);
        } else {
          owners.length = 0;
        }
      });

      var reject = once(function (reason) {
        if (isDef(factory.errorComp)) {
          factory.error = true;
          forceRender(true);
        }
      });

      var res = factory(resolve, reject);

      if (isObject(res)) {
        if (isPromise(res)) {
          // () => Promise
          if (isUndef(factory.resolved)) {
            res.then(resolve, reject);
          }
        } else if (isPromise(res.component)) {
          res.component.then(resolve, reject);

          if (isDef(res.error)) {
            factory.errorComp = ensureCtor(res.error, baseCtor);
          }

          if (isDef(res.loading)) {
            factory.loadingComp = ensureCtor(res.loading, baseCtor);
            if (res.delay === 0) {
              factory.loading = true;
            } else {
              timerLoading = setTimeout(function () {
                timerLoading = null;
                if (isUndef(factory.resolved) && isUndef(factory.error)) {
                  factory.loading = true;
                  forceRender(false);
                }
              }, res.delay || 200);
            }
          }

          if (isDef(res.timeout)) {
            timerTimeout = setTimeout(function () {
              timerTimeout = null;
              if (isUndef(factory.resolved)) {
                reject(
                   null
                );
              }
            }, res.timeout);
          }
        }
      }

      sync = false;
      // return in case resolved synchronously
      return factory.loading
        ? factory.loadingComp
        : factory.resolved
    }
  }

  /*  */

  function isAsyncPlaceholder (node) {
    return node.isComment && node.asyncFactory
  }

  /*  */

  function getFirstComponentChild (children) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; i++) {
        var c = children[i];
        if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
          return c
        }
      }
    }
  }

  /*  */

  /*  */

  function initEvents (vm) {
    vm._events = Object.create(null);
    vm._hasHookEvent = false;
    // init parent attached events
    var listeners = vm.$options._parentListeners;
    if (listeners) {
      updateComponentListeners(vm, listeners);
    }
  }

  var target;

  function add (event, fn) {
    target.$on(event, fn);
  }

  function remove$1 (event, fn) {
    target.$off(event, fn);
  }

  function createOnceHandler (event, fn) {
    var _target = target;
    return function onceHandler () {
      var res = fn.apply(null, arguments);
      if (res !== null) {
        _target.$off(event, onceHandler);
      }
    }
  }

  function updateComponentListeners (
    vm,
    listeners,
    oldListeners
  ) {
    target = vm;
    updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
    target = undefined;
  }

  function eventsMixin (Vue) {
    var hookRE = /^hook:/;
    Vue.prototype.$on = function (event, fn) {
      var vm = this;
      if (Array.isArray(event)) {
        for (var i = 0, l = event.length; i < l; i++) {
          vm.$on(event[i], fn);
        }
      } else {
        (vm._events[event] || (vm._events[event] = [])).push(fn);
        // optimize hook:event cost by using a boolean flag marked at registration
        // instead of a hash lookup
        if (hookRE.test(event)) {
          vm._hasHookEvent = true;
        }
      }
      return vm
    };

    Vue.prototype.$once = function (event, fn) {
      var vm = this;
      function on () {
        vm.$off(event, on);
        fn.apply(vm, arguments);
      }
      on.fn = fn;
      vm.$on(event, on);
      return vm
    };

    Vue.prototype.$off = function (event, fn) {
      var vm = this;
      // all
      if (!arguments.length) {
        vm._events = Object.create(null);
        return vm
      }
      // array of events
      if (Array.isArray(event)) {
        for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
          vm.$off(event[i$1], fn);
        }
        return vm
      }
      // specific event
      var cbs = vm._events[event];
      if (!cbs) {
        return vm
      }
      if (!fn) {
        vm._events[event] = null;
        return vm
      }
      // specific handler
      var cb;
      var i = cbs.length;
      while (i--) {
        cb = cbs[i];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i, 1);
          break
        }
      }
      return vm
    };

    Vue.prototype.$emit = function (event) {
      var vm = this;
      var cbs = vm._events[event];
      if (cbs) {
        cbs = cbs.length > 1 ? toArray(cbs) : cbs;
        var args = toArray(arguments, 1);
        var info = "event handler for \"" + event + "\"";
        for (var i = 0, l = cbs.length; i < l; i++) {
          invokeWithErrorHandling(cbs[i], vm, args, vm, info);
        }
      }
      return vm
    };
  }

  /*  */

  var activeInstance = null;

  function setActiveInstance(vm) {
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    return function () {
      activeInstance = prevActiveInstance;
    }
  }

  function initLifecycle (vm) {
    var options = vm.$options;

    // locate first non-abstract parent
    var parent = options.parent;
    if (parent && !options.abstract) {
      while (parent.$options.abstract && parent.$parent) {
        parent = parent.$parent;
      }
      parent.$children.push(vm);
    }

    vm.$parent = parent;
    vm.$root = parent ? parent.$root : vm;

    vm.$children = [];
    vm.$refs = {};

    vm._watcher = null;
    vm._inactive = null;
    vm._directInactive = false;
    vm._isMounted = false;
    vm._isDestroyed = false;
    vm._isBeingDestroyed = false;
  }

  function lifecycleMixin (Vue) {
    Vue.prototype._update = function (vnode, hydrating) {
      var vm = this;
      var prevEl = vm.$el;
      var prevVnode = vm._vnode;
      var restoreActiveInstance = setActiveInstance(vm);
      vm._vnode = vnode;
      // Vue.prototype.__patch__ is injected in entry points
      // based on the rendering backend used.
      if (!prevVnode) {
        // initial render
        vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
      } else {
        // updates
        vm.$el = vm.__patch__(prevVnode, vnode);
      }
      restoreActiveInstance();
      // update __vue__ reference
      if (prevEl) {
        prevEl.__vue__ = null;
      }
      if (vm.$el) {
        vm.$el.__vue__ = vm;
      }
      // if parent is an HOC, update its $el as well
      if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
        vm.$parent.$el = vm.$el;
      }
      // updated hook is called by the scheduler to ensure that children are
      // updated in a parent's updated hook.
    };

    Vue.prototype.$forceUpdate = function () {
      var vm = this;
      if (vm._watcher) {
        vm._watcher.update();
      }
    };

    Vue.prototype.$destroy = function () {
      var vm = this;
      if (vm._isBeingDestroyed) {
        return
      }
      callHook(vm, 'beforeDestroy');
      vm._isBeingDestroyed = true;
      // remove self from parent
      var parent = vm.$parent;
      if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
        remove(parent.$children, vm);
      }
      // teardown watchers
      if (vm._watcher) {
        vm._watcher.teardown();
      }
      var i = vm._watchers.length;
      while (i--) {
        vm._watchers[i].teardown();
      }
      // remove reference from data ob
      // frozen object may not have observer.
      if (vm._data.__ob__) {
        vm._data.__ob__.vmCount--;
      }
      // call the last hook...
      vm._isDestroyed = true;
      // invoke destroy hooks on current rendered tree
      vm.__patch__(vm._vnode, null);
      // fire destroyed hook
      callHook(vm, 'destroyed');
      // turn off all instance listeners.
      vm.$off();
      // remove __vue__ reference
      if (vm.$el) {
        vm.$el.__vue__ = null;
      }
      // release circular reference (#6759)
      if (vm.$vnode) {
        vm.$vnode.parent = null;
      }
    };
  }

  function mountComponent (
    vm,
    el,
    hydrating
  ) {
    vm.$el = el;
    if (!vm.$options.render) {
      vm.$options.render = createEmptyVNode;
    }
    callHook(vm, 'beforeMount');

    var updateComponent;
    /* istanbul ignore if */
    {
      updateComponent = function () {
        vm._update(vm._render(), hydrating);
      };
    }

    // we set this to vm._watcher inside the watcher's constructor
    // since the watcher's initial patch may call $forceUpdate (e.g. inside child
    // component's mounted hook), which relies on vm._watcher being already defined
    new Watcher(vm, updateComponent, noop, {
      before: function before () {
        if (vm._isMounted && !vm._isDestroyed) {
          callHook(vm, 'beforeUpdate');
        }
      }
    }, true /* isRenderWatcher */);
    hydrating = false;

    // manually mounted instance, call mounted on self
    // mounted is called for render-created child components in its inserted hook
    if (vm.$vnode == null) {
      vm._isMounted = true;
      callHook(vm, 'mounted');
    }
    return vm
  }

  function updateChildComponent (
    vm,
    propsData,
    listeners,
    parentVnode,
    renderChildren
  ) {

    // determine whether component has slot children
    // we need to do this before overwriting $options._renderChildren.

    // check if there are dynamic scopedSlots (hand-written or compiled but with
    // dynamic slot names). Static scoped slots compiled from template has the
    // "$stable" marker.
    var newScopedSlots = parentVnode.data.scopedSlots;
    var oldScopedSlots = vm.$scopedSlots;
    var hasDynamicScopedSlot = !!(
      (newScopedSlots && !newScopedSlots.$stable) ||
      (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
      (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
    );

    // Any static slot children from the parent may have changed during parent's
    // update. Dynamic scoped slots may also have changed. In such cases, a forced
    // update is necessary to ensure correctness.
    var needsForceUpdate = !!(
      renderChildren ||               // has new static slots
      vm.$options._renderChildren ||  // has old static slots
      hasDynamicScopedSlot
    );

    vm.$options._parentVnode = parentVnode;
    vm.$vnode = parentVnode; // update vm's placeholder node without re-render

    if (vm._vnode) { // update child tree's parent
      vm._vnode.parent = parentVnode;
    }
    vm.$options._renderChildren = renderChildren;

    // update $attrs and $listeners hash
    // these are also reactive so they may trigger child update if the child
    // used them during render
    vm.$attrs = parentVnode.data.attrs || emptyObject;
    vm.$listeners = listeners || emptyObject;

    // update props
    if (propsData && vm.$options.props) {
      toggleObserving(false);
      var props = vm._props;
      var propKeys = vm.$options._propKeys || [];
      for (var i = 0; i < propKeys.length; i++) {
        var key = propKeys[i];
        var propOptions = vm.$options.props; // wtf flow?
        props[key] = validateProp(key, propOptions, propsData, vm);
      }
      toggleObserving(true);
      // keep a copy of raw propsData
      vm.$options.propsData = propsData;
    }

    // update listeners
    listeners = listeners || emptyObject;
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);

    // resolve slots + force update if has children
    if (needsForceUpdate) {
      vm.$slots = resolveSlots(renderChildren, parentVnode.context);
      vm.$forceUpdate();
    }
  }

  function isInInactiveTree (vm) {
    while (vm && (vm = vm.$parent)) {
      if (vm._inactive) { return true }
    }
    return false
  }

  function activateChildComponent (vm, direct) {
    if (direct) {
      vm._directInactive = false;
      if (isInInactiveTree(vm)) {
        return
      }
    } else if (vm._directInactive) {
      return
    }
    if (vm._inactive || vm._inactive === null) {
      vm._inactive = false;
      for (var i = 0; i < vm.$children.length; i++) {
        activateChildComponent(vm.$children[i]);
      }
      callHook(vm, 'activated');
    }
  }

  function deactivateChildComponent (vm, direct) {
    if (direct) {
      vm._directInactive = true;
      if (isInInactiveTree(vm)) {
        return
      }
    }
    if (!vm._inactive) {
      vm._inactive = true;
      for (var i = 0; i < vm.$children.length; i++) {
        deactivateChildComponent(vm.$children[i]);
      }
      callHook(vm, 'deactivated');
    }
  }

  function callHook (vm, hook) {
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        invokeWithErrorHandling(handlers[i], vm, null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook);
    }
    popTarget();
  }

  var queue = [];
  var activatedChildren = [];
  var has = {};
  var waiting = false;
  var flushing = false;
  var index = 0;

  /**
   * Reset the scheduler's state.
   */
  function resetSchedulerState () {
    index = queue.length = activatedChildren.length = 0;
    has = {};
    waiting = flushing = false;
  }

  // Async edge case #6566 requires saving the timestamp when event listeners are
  // attached. However, calling performance.now() has a perf overhead especially
  // if the page has thousands of event listeners. Instead, we take a timestamp
  // every time the scheduler flushes and use that for all event listeners
  // attached during that flush.
  var currentFlushTimestamp = 0;

  // Async edge case fix requires storing an event listener's attach timestamp.
  var getNow = Date.now;

  // Determine what event timestamp the browser is using. Annoyingly, the
  // timestamp can either be hi-res (relative to page load) or low-res
  // (relative to UNIX epoch), so in order to compare time we have to use the
  // same timestamp type when saving the flush timestamp.
  // All IE versions use low-res event timestamps, and have problematic clock
  // implementations (#9632)
  if (inBrowser && !isIE) {
    var performance = window.performance;
    if (
      performance &&
      typeof performance.now === 'function' &&
      getNow() > document.createEvent('Event').timeStamp
    ) {
      // if the event timestamp, although evaluated AFTER the Date.now(), is
      // smaller than it, it means the event is using a hi-res timestamp,
      // and we need to use the hi-res version for event listener timestamps as
      // well.
      getNow = function () { return performance.now(); };
    }
  }

  /**
   * Flush both queues and run the watchers.
   */
  function flushSchedulerQueue () {
    currentFlushTimestamp = getNow();
    flushing = true;
    var watcher, id;

    // Sort queue before flush.
    // This ensures that:
    // 1. Components are updated from parent to child. (because parent is always
    //    created before the child)
    // 2. A component's user watchers are run before its render watcher (because
    //    user watchers are created before the render watcher)
    // 3. If a component is destroyed during a parent component's watcher run,
    //    its watchers can be skipped.
    queue.sort(function (a, b) { return a.id - b.id; });

    // do not cache length because more watchers might be pushed
    // as we run existing watchers
    for (index = 0; index < queue.length; index++) {
      watcher = queue[index];
      if (watcher.before) {
        watcher.before();
      }
      id = watcher.id;
      has[id] = null;
      watcher.run();
    }

    // keep copies of post queues before resetting state
    var activatedQueue = activatedChildren.slice();
    var updatedQueue = queue.slice();

    resetSchedulerState();

    // call component updated and activated hooks
    callActivatedHooks(activatedQueue);
    callUpdatedHooks(updatedQueue);

    // devtool hook
    /* istanbul ignore if */
    if (devtools && config.devtools) {
      devtools.emit('flush');
    }
  }

  function callUpdatedHooks (queue) {
    var i = queue.length;
    while (i--) {
      var watcher = queue[i];
      var vm = watcher.vm;
      if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'updated');
      }
    }
  }

  /**
   * Queue a kept-alive component that was activated during patch.
   * The queue will be processed after the entire tree has been patched.
   */
  function queueActivatedComponent (vm) {
    // setting _inactive to false here so that a render function can
    // rely on checking whether it's in an inactive tree (e.g. router-view)
    vm._inactive = false;
    activatedChildren.push(vm);
  }

  function callActivatedHooks (queue) {
    for (var i = 0; i < queue.length; i++) {
      queue[i]._inactive = true;
      activateChildComponent(queue[i], true /* true */);
    }
  }

  /**
   * Push a watcher into the watcher queue.
   * Jobs with duplicate IDs will be skipped unless it's
   * pushed when the queue is being flushed.
   */
  function queueWatcher (watcher) {
    var id = watcher.id;
    if (has[id] == null) {
      has[id] = true;
      if (!flushing) {
        queue.push(watcher);
      } else {
        // if already flushing, splice the watcher based on its id
        // if already past its id, it will be run next immediately.
        var i = queue.length - 1;
        while (i > index && queue[i].id > watcher.id) {
          i--;
        }
        queue.splice(i + 1, 0, watcher);
      }
      // queue the flush
      if (!waiting) {
        waiting = true;
        nextTick(flushSchedulerQueue);
      }
    }
  }

  /*  */



  var uid$2 = 0;

  /**
   * A watcher parses an expression, collects dependencies,
   * and fires callback when the expression value changes.
   * This is used for both the $watch() api and directives.
   */
  var Watcher = function Watcher (
    vm,
    expOrFn,
    cb,
    options,
    isRenderWatcher
  ) {
    this.vm = vm;
    if (isRenderWatcher) {
      vm._watcher = this;
    }
    vm._watchers.push(this);
    // options
    if (options) {
      this.deep = !!options.deep;
      this.user = !!options.user;
      this.lazy = !!options.lazy;
      this.sync = !!options.sync;
      this.before = options.before;
    } else {
      this.deep = this.user = this.lazy = this.sync = false;
    }
    this.cb = cb;
    this.id = ++uid$2; // uid for batching
    this.active = true;
    this.dirty = this.lazy; // for lazy watchers
    this.deps = [];
    this.newDeps = [];
    this.depIds = new _Set();
    this.newDepIds = new _Set();
    this.expression =  '';
    // parse expression for getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);
      if (!this.getter) {
        this.getter = noop;
      }
    }
    this.value = this.lazy
      ? undefined
      : this.get();
  };

  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  Watcher.prototype.get = function get () {
    pushTarget(this);
    var value;
    var vm = this.vm;
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      if (this.user) {
        handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value);
      }
      popTarget();
      this.cleanupDeps();
    }
    return value
  };

  /**
   * Add a dependency to this directive.
   */
  Watcher.prototype.addDep = function addDep (dep) {
    var id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDeps.push(dep);
      if (!this.depIds.has(id)) {
        dep.addSub(this);
      }
    }
  };

  /**
   * Clean up for dependency collection.
   */
  Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var i = this.deps.length;
    while (i--) {
      var dep = this.deps[i];
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this);
      }
    }
    var tmp = this.depIds;
    this.depIds = this.newDepIds;
    this.newDepIds = tmp;
    this.newDepIds.clear();
    tmp = this.deps;
    this.deps = this.newDeps;
    this.newDeps = tmp;
    this.newDeps.length = 0;
  };

  /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   */
  Watcher.prototype.update = function update () {
    /* istanbul ignore else */
    if (this.lazy) {
      this.dirty = true;
    } else if (this.sync) {
      this.run();
    } else {
      queueWatcher(this);
    }
  };

  /**
   * Scheduler job interface.
   * Will be called by the scheduler.
   */
  Watcher.prototype.run = function run () {
    if (this.active) {
      var value = this.get();
      if (
        value !== this.value ||
        // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        isObject(value) ||
        this.deep
      ) {
        // set new value
        var oldValue = this.value;
        this.value = value;
        if (this.user) {
          try {
            this.cb.call(this.vm, value, oldValue);
          } catch (e) {
            handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
          }
        } else {
          this.cb.call(this.vm, value, oldValue);
        }
      }
    }
  };

  /**
   * Evaluate the value of the watcher.
   * This only gets called for lazy watchers.
   */
  Watcher.prototype.evaluate = function evaluate () {
    this.value = this.get();
    this.dirty = false;
  };

  /**
   * Depend on all deps collected by this watcher.
   */
  Watcher.prototype.depend = function depend () {
    var i = this.deps.length;
    while (i--) {
      this.deps[i].depend();
    }
  };

  /**
   * Remove self from all dependencies' subscriber list.
   */
  Watcher.prototype.teardown = function teardown () {
    if (this.active) {
      // remove self from vm's watcher list
      // this is a somewhat expensive operation so we skip it
      // if the vm is being destroyed.
      if (!this.vm._isBeingDestroyed) {
        remove(this.vm._watchers, this);
      }
      var i = this.deps.length;
      while (i--) {
        this.deps[i].removeSub(this);
      }
      this.active = false;
    }
  };

  /*  */

  var sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
  };

  function proxy (target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter () {
      return this[sourceKey][key]
    };
    sharedPropertyDefinition.set = function proxySetter (val) {
      this[sourceKey][key] = val;
    };
    Object.defineProperty(target, key, sharedPropertyDefinition);
  }

  function initState (vm) {
    vm._watchers = [];
    var opts = vm.$options;
    if (opts.props) { initProps(vm, opts.props); }
    if (opts.methods) { initMethods(vm, opts.methods); }
    if (opts.data) {
      initData(vm);
    } else {
      observe(vm._data = {}, true /* asRootData */);
    }
    if (opts.computed) { initComputed(vm, opts.computed); }
    if (opts.watch && opts.watch !== nativeWatch) {
      initWatch(vm, opts.watch);
    }
  }

  function initProps (vm, propsOptions) {
    var propsData = vm.$options.propsData || {};
    var props = vm._props = {};
    // cache prop keys so that future props updates can iterate using Array
    // instead of dynamic object key enumeration.
    var keys = vm.$options._propKeys = [];
    var isRoot = !vm.$parent;
    // root instance props should be converted
    if (!isRoot) {
      toggleObserving(false);
    }
    var loop = function ( key ) {
      keys.push(key);
      var value = validateProp(key, propsOptions, propsData, vm);
      /* istanbul ignore else */
      {
        defineReactive$$1(props, key, value);
      }
      // static props are already proxied on the component's prototype
      // during Vue.extend(). We only need to proxy props defined at
      // instantiation here.
      if (!(key in vm)) {
        proxy(vm, "_props", key);
      }
    };

    for (var key in propsOptions) loop( key );
    toggleObserving(true);
  }

  function initData (vm) {
    var data = vm.$options.data;
    data = vm._data = typeof data === 'function'
      ? getData(data, vm)
      : data || {};
    if (!isPlainObject(data)) {
      data = {};
    }
    // proxy data on instance
    var keys = Object.keys(data);
    var props = vm.$options.props;
    var methods = vm.$options.methods;
    var i = keys.length;
    while (i--) {
      var key = keys[i];
      if (props && hasOwn(props, key)) ; else if (!isReserved(key)) {
        proxy(vm, "_data", key);
      }
    }
    // observe data
    observe(data, true /* asRootData */);
  }

  function getData (data, vm) {
    // #7573 disable dep collection when invoking data getters
    pushTarget();
    try {
      return data.call(vm, vm)
    } catch (e) {
      handleError(e, vm, "data()");
      return {}
    } finally {
      popTarget();
    }
  }

  var computedWatcherOptions = { lazy: true };

  function initComputed (vm, computed) {
    // $flow-disable-line
    var watchers = vm._computedWatchers = Object.create(null);
    // computed properties are just getters during SSR
    var isSSR = isServerRendering();

    for (var key in computed) {
      var userDef = computed[key];
      var getter = typeof userDef === 'function' ? userDef : userDef.get;

      if (!isSSR) {
        // create internal watcher for the computed property.
        watchers[key] = new Watcher(
          vm,
          getter || noop,
          noop,
          computedWatcherOptions
        );
      }

      // component-defined computed properties are already defined on the
      // component prototype. We only need to define computed properties defined
      // at instantiation here.
      if (!(key in vm)) {
        defineComputed(vm, key, userDef);
      }
    }
  }

  function defineComputed (
    target,
    key,
    userDef
  ) {
    var shouldCache = !isServerRendering();
    if (typeof userDef === 'function') {
      sharedPropertyDefinition.get = shouldCache
        ? createComputedGetter(key)
        : createGetterInvoker(userDef);
      sharedPropertyDefinition.set = noop;
    } else {
      sharedPropertyDefinition.get = userDef.get
        ? shouldCache && userDef.cache !== false
          ? createComputedGetter(key)
          : createGetterInvoker(userDef.get)
        : noop;
      sharedPropertyDefinition.set = userDef.set || noop;
    }
    Object.defineProperty(target, key, sharedPropertyDefinition);
  }

  function createComputedGetter (key) {
    return function computedGetter () {
      var watcher = this._computedWatchers && this._computedWatchers[key];
      if (watcher) {
        if (watcher.dirty) {
          watcher.evaluate();
        }
        if (Dep.target) {
          watcher.depend();
        }
        return watcher.value
      }
    }
  }

  function createGetterInvoker(fn) {
    return function computedGetter () {
      return fn.call(this, this)
    }
  }

  function initMethods (vm, methods) {
    var props = vm.$options.props;
    for (var key in methods) {
      vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
    }
  }

  function initWatch (vm, watch) {
    for (var key in watch) {
      var handler = watch[key];
      if (Array.isArray(handler)) {
        for (var i = 0; i < handler.length; i++) {
          createWatcher(vm, key, handler[i]);
        }
      } else {
        createWatcher(vm, key, handler);
      }
    }
  }

  function createWatcher (
    vm,
    expOrFn,
    handler,
    options
  ) {
    if (isPlainObject(handler)) {
      options = handler;
      handler = handler.handler;
    }
    if (typeof handler === 'string') {
      handler = vm[handler];
    }
    return vm.$watch(expOrFn, handler, options)
  }

  function stateMixin (Vue) {
    // flow somehow has problems with directly declared definition object
    // when using Object.defineProperty, so we have to procedurally build up
    // the object here.
    var dataDef = {};
    dataDef.get = function () { return this._data };
    var propsDef = {};
    propsDef.get = function () { return this._props };
    Object.defineProperty(Vue.prototype, '$data', dataDef);
    Object.defineProperty(Vue.prototype, '$props', propsDef);

    Vue.prototype.$set = set;
    Vue.prototype.$delete = del;

    Vue.prototype.$watch = function (
      expOrFn,
      cb,
      options
    ) {
      var vm = this;
      if (isPlainObject(cb)) {
        return createWatcher(vm, expOrFn, cb, options)
      }
      options = options || {};
      options.user = true;
      var watcher = new Watcher(vm, expOrFn, cb, options);
      if (options.immediate) {
        try {
          cb.call(vm, watcher.value);
        } catch (error) {
          handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
        }
      }
      return function unwatchFn () {
        watcher.teardown();
      }
    };
  }

  /*  */

  var uid$3 = 0;

  function initMixin (Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      // a uid
      vm._uid = uid$3++;

      // a flag to avoid this being observed
      vm._isVue = true;
      // merge options
      if (options && options._isComponent) {
        // optimize internal component instantiation
        // since dynamic options merging is pretty slow, and none of the
        // internal component options needs special treatment.
        initInternalComponent(vm, options);
      } else {
        vm.$options = mergeOptions(
          resolveConstructorOptions(vm.constructor),
          options || {},
          vm
        );
      }
      /* istanbul ignore else */
      {
        vm._renderProxy = vm;
      }
      // expose real self
      vm._self = vm;
      initLifecycle(vm);
      initEvents(vm);
      initRender(vm);
      callHook(vm, 'beforeCreate');
      initInjections(vm); // resolve injections before data/props
      initState(vm);
      initProvide(vm); // resolve provide after data/props
      callHook(vm, 'created');

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };
  }

  function initInternalComponent (vm, options) {
    var opts = vm.$options = Object.create(vm.constructor.options);
    // doing this because it's faster than dynamic enumeration.
    var parentVnode = options._parentVnode;
    opts.parent = options.parent;
    opts._parentVnode = parentVnode;

    var vnodeComponentOptions = parentVnode.componentOptions;
    opts.propsData = vnodeComponentOptions.propsData;
    opts._parentListeners = vnodeComponentOptions.listeners;
    opts._renderChildren = vnodeComponentOptions.children;
    opts._componentTag = vnodeComponentOptions.tag;

    if (options.render) {
      opts.render = options.render;
      opts.staticRenderFns = options.staticRenderFns;
    }
  }

  function resolveConstructorOptions (Ctor) {
    var options = Ctor.options;
    if (Ctor.super) {
      var superOptions = resolveConstructorOptions(Ctor.super);
      var cachedSuperOptions = Ctor.superOptions;
      if (superOptions !== cachedSuperOptions) {
        // super option changed,
        // need to resolve new options.
        Ctor.superOptions = superOptions;
        // check if there are any late-modified/attached options (#4976)
        var modifiedOptions = resolveModifiedOptions(Ctor);
        // update base extend options
        if (modifiedOptions) {
          extend(Ctor.extendOptions, modifiedOptions);
        }
        options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
        if (options.name) {
          options.components[options.name] = Ctor;
        }
      }
    }
    return options
  }

  function resolveModifiedOptions (Ctor) {
    var modified;
    var latest = Ctor.options;
    var sealed = Ctor.sealedOptions;
    for (var key in latest) {
      if (latest[key] !== sealed[key]) {
        if (!modified) { modified = {}; }
        modified[key] = latest[key];
      }
    }
    return modified
  }

  function Vue (options) {
    this._init(options);
  }

  initMixin(Vue);
  stateMixin(Vue);
  eventsMixin(Vue);
  lifecycleMixin(Vue);
  renderMixin(Vue);

  /*  */

  function initUse (Vue) {
    Vue.use = function (plugin) {
      var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
      if (installedPlugins.indexOf(plugin) > -1) {
        return this
      }

      // additional parameters
      var args = toArray(arguments, 1);
      args.unshift(this);
      if (typeof plugin.install === 'function') {
        plugin.install.apply(plugin, args);
      } else if (typeof plugin === 'function') {
        plugin.apply(null, args);
      }
      installedPlugins.push(plugin);
      return this
    };
  }

  /*  */

  function initMixin$1 (Vue) {
    Vue.mixin = function (mixin) {
      this.options = mergeOptions(this.options, mixin);
      return this
    };
  }

  /*  */

  function initExtend (Vue) {
    /**
     * Each instance constructor, including Vue, has a unique
     * cid. This enables us to create wrapped "child
     * constructors" for prototypal inheritance and cache them.
     */
    Vue.cid = 0;
    var cid = 1;

    /**
     * Class inheritance
     */
    Vue.extend = function (extendOptions) {
      extendOptions = extendOptions || {};
      var Super = this;
      var SuperId = Super.cid;
      var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
      if (cachedCtors[SuperId]) {
        return cachedCtors[SuperId]
      }

      var name = extendOptions.name || Super.options.name;

      var Sub = function VueComponent (options) {
        this._init(options);
      };
      Sub.prototype = Object.create(Super.prototype);
      Sub.prototype.constructor = Sub;
      Sub.cid = cid++;
      Sub.options = mergeOptions(
        Super.options,
        extendOptions
      );
      Sub['super'] = Super;

      // For props and computed properties, we define the proxy getters on
      // the Vue instances at extension time, on the extended prototype. This
      // avoids Object.defineProperty calls for each instance created.
      if (Sub.options.props) {
        initProps$1(Sub);
      }
      if (Sub.options.computed) {
        initComputed$1(Sub);
      }

      // allow further extension/mixin/plugin usage
      Sub.extend = Super.extend;
      Sub.mixin = Super.mixin;
      Sub.use = Super.use;

      // create asset registers, so extended classes
      // can have their private assets too.
      ASSET_TYPES.forEach(function (type) {
        Sub[type] = Super[type];
      });
      // enable recursive self-lookup
      if (name) {
        Sub.options.components[name] = Sub;
      }

      // keep a reference to the super options at extension time.
      // later at instantiation we can check if Super's options have
      // been updated.
      Sub.superOptions = Super.options;
      Sub.extendOptions = extendOptions;
      Sub.sealedOptions = extend({}, Sub.options);

      // cache constructor
      cachedCtors[SuperId] = Sub;
      return Sub
    };
  }

  function initProps$1 (Comp) {
    var props = Comp.options.props;
    for (var key in props) {
      proxy(Comp.prototype, "_props", key);
    }
  }

  function initComputed$1 (Comp) {
    var computed = Comp.options.computed;
    for (var key in computed) {
      defineComputed(Comp.prototype, key, computed[key]);
    }
  }

  /*  */

  function initAssetRegisters (Vue) {
    /**
     * Create asset registration methods.
     */
    ASSET_TYPES.forEach(function (type) {
      Vue[type] = function (
        id,
        definition
      ) {
        if (!definition) {
          return this.options[type + 's'][id]
        } else {
          if (type === 'component' && isPlainObject(definition)) {
            definition.name = definition.name || id;
            definition = this.options._base.extend(definition);
          }
          if (type === 'directive' && typeof definition === 'function') {
            definition = { bind: definition, update: definition };
          }
          this.options[type + 's'][id] = definition;
          return definition
        }
      };
    });
  }

  /*  */



  function getComponentName (opts) {
    return opts && (opts.Ctor.options.name || opts.tag)
  }

  function matches (pattern, name) {
    if (Array.isArray(pattern)) {
      return pattern.indexOf(name) > -1
    } else if (typeof pattern === 'string') {
      return pattern.split(',').indexOf(name) > -1
    } else if (isRegExp(pattern)) {
      return pattern.test(name)
    }
    /* istanbul ignore next */
    return false
  }

  function pruneCache (keepAliveInstance, filter) {
    var cache = keepAliveInstance.cache;
    var keys = keepAliveInstance.keys;
    var _vnode = keepAliveInstance._vnode;
    for (var key in cache) {
      var cachedNode = cache[key];
      if (cachedNode) {
        var name = getComponentName(cachedNode.componentOptions);
        if (name && !filter(name)) {
          pruneCacheEntry(cache, key, keys, _vnode);
        }
      }
    }
  }

  function pruneCacheEntry (
    cache,
    key,
    keys,
    current
  ) {
    var cached$$1 = cache[key];
    if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
      cached$$1.componentInstance.$destroy();
    }
    cache[key] = null;
    remove(keys, key);
  }

  var patternTypes = [String, RegExp, Array];

  var KeepAlive = {
    name: 'keep-alive',
    abstract: true,

    props: {
      include: patternTypes,
      exclude: patternTypes,
      max: [String, Number]
    },

    created: function created () {
      this.cache = Object.create(null);
      this.keys = [];
    },

    destroyed: function destroyed () {
      for (var key in this.cache) {
        pruneCacheEntry(this.cache, key, this.keys);
      }
    },

    mounted: function mounted () {
      var this$1 = this;

      this.$watch('include', function (val) {
        pruneCache(this$1, function (name) { return matches(val, name); });
      });
      this.$watch('exclude', function (val) {
        pruneCache(this$1, function (name) { return !matches(val, name); });
      });
    },

    render: function render () {
      var slot = this.$slots.default;
      var vnode = getFirstComponentChild(slot);
      var componentOptions = vnode && vnode.componentOptions;
      if (componentOptions) {
        // check pattern
        var name = getComponentName(componentOptions);
        var ref = this;
        var include = ref.include;
        var exclude = ref.exclude;
        if (
          // not included
          (include && (!name || !matches(include, name))) ||
          // excluded
          (exclude && name && matches(exclude, name))
        ) {
          return vnode
        }

        var ref$1 = this;
        var cache = ref$1.cache;
        var keys = ref$1.keys;
        var key = vnode.key == null
          // same constructor may get registered as different local components
          // so cid alone is not enough (#3269)
          ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
          : vnode.key;
        if (cache[key]) {
          vnode.componentInstance = cache[key].componentInstance;
          // make current key freshest
          remove(keys, key);
          keys.push(key);
        } else {
          cache[key] = vnode;
          keys.push(key);
          // prune oldest entry
          if (this.max && keys.length > parseInt(this.max)) {
            pruneCacheEntry(cache, keys[0], keys, this._vnode);
          }
        }

        vnode.data.keepAlive = true;
      }
      return vnode || (slot && slot[0])
    }
  };

  var builtInComponents = {
    KeepAlive: KeepAlive
  };

  /*  */

  function initGlobalAPI (Vue) {
    // config
    var configDef = {};
    configDef.get = function () { return config; };
    Object.defineProperty(Vue, 'config', configDef);

    // exposed util methods.
    // NOTE: these are not considered part of the public API - avoid relying on
    // them unless you are aware of the risk.
    Vue.util = {
      warn: warn,
      extend: extend,
      mergeOptions: mergeOptions,
      defineReactive: defineReactive$$1
    };

    Vue.set = set;
    Vue.delete = del;
    Vue.nextTick = nextTick;

    // 2.6 explicit observable API
    Vue.observable = function (obj) {
      observe(obj);
      return obj
    };

    Vue.options = Object.create(null);
    ASSET_TYPES.forEach(function (type) {
      Vue.options[type + 's'] = Object.create(null);
    });

    // this is used to identify the "base" constructor to extend all plain-object
    // components with in Weex's multi-instance scenarios.
    Vue.options._base = Vue;

    extend(Vue.options.components, builtInComponents);

    initUse(Vue);
    initMixin$1(Vue);
    initExtend(Vue);
    initAssetRegisters(Vue);
  }

  initGlobalAPI(Vue);

  Object.defineProperty(Vue.prototype, '$isServer', {
    get: isServerRendering
  });

  Object.defineProperty(Vue.prototype, '$ssrContext', {
    get: function get () {
      /* istanbul ignore next */
      return this.$vnode && this.$vnode.ssrContext
    }
  });

  // expose FunctionalRenderContext for ssr runtime helper installation
  Object.defineProperty(Vue, 'FunctionalRenderContext', {
    value: FunctionalRenderContext
  });

  Vue.version = '2.6.11';

  /*  */

  // these are reserved for web because they are directly compiled away
  // during template compilation
  var isReservedAttr = makeMap('style,class');

  // attributes that should be using props for binding
  var acceptValue = makeMap('input,textarea,option,select,progress');
  var mustUseProp = function (tag, type, attr) {
    return (
      (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
      (attr === 'selected' && tag === 'option') ||
      (attr === 'checked' && tag === 'input') ||
      (attr === 'muted' && tag === 'video')
    )
  };

  var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

  var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

  var convertEnumeratedValue = function (key, value) {
    return isFalsyAttrValue(value) || value === 'false'
      ? 'false'
      // allow arbitrary string value for contenteditable
      : key === 'contenteditable' && isValidContentEditableValue(value)
        ? value
        : 'true'
  };

  var isBooleanAttr = makeMap(
    'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
    'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
    'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
    'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
    'required,reversed,scoped,seamless,selected,sortable,translate,' +
    'truespeed,typemustmatch,visible'
  );

  var xlinkNS = 'http://www.w3.org/1999/xlink';

  var isXlink = function (name) {
    return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
  };

  var getXlinkProp = function (name) {
    return isXlink(name) ? name.slice(6, name.length) : ''
  };

  var isFalsyAttrValue = function (val) {
    return val == null || val === false
  };

  /*  */

  function genClassForVnode (vnode) {
    var data = vnode.data;
    var parentNode = vnode;
    var childNode = vnode;
    while (isDef(childNode.componentInstance)) {
      childNode = childNode.componentInstance._vnode;
      if (childNode && childNode.data) {
        data = mergeClassData(childNode.data, data);
      }
    }
    while (isDef(parentNode = parentNode.parent)) {
      if (parentNode && parentNode.data) {
        data = mergeClassData(data, parentNode.data);
      }
    }
    return renderClass(data.staticClass, data.class)
  }

  function mergeClassData (child, parent) {
    return {
      staticClass: concat(child.staticClass, parent.staticClass),
      class: isDef(child.class)
        ? [child.class, parent.class]
        : parent.class
    }
  }

  function renderClass (
    staticClass,
    dynamicClass
  ) {
    if (isDef(staticClass) || isDef(dynamicClass)) {
      return concat(staticClass, stringifyClass(dynamicClass))
    }
    /* istanbul ignore next */
    return ''
  }

  function concat (a, b) {
    return a ? b ? (a + ' ' + b) : a : (b || '')
  }

  function stringifyClass (value) {
    if (Array.isArray(value)) {
      return stringifyArray(value)
    }
    if (isObject(value)) {
      return stringifyObject(value)
    }
    if (typeof value === 'string') {
      return value
    }
    /* istanbul ignore next */
    return ''
  }

  function stringifyArray (value) {
    var res = '';
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
        if (res) { res += ' '; }
        res += stringified;
      }
    }
    return res
  }

  function stringifyObject (value) {
    var res = '';
    for (var key in value) {
      if (value[key]) {
        if (res) { res += ' '; }
        res += key;
      }
    }
    return res
  }

  /*  */

  var namespaceMap = {
    svg: 'http://www.w3.org/2000/svg',
    math: 'http://www.w3.org/1998/Math/MathML'
  };

  var isHTMLTag = makeMap(
    'html,body,base,head,link,meta,style,title,' +
    'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
    'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
    'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
    's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
    'embed,object,param,source,canvas,script,noscript,del,ins,' +
    'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
    'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
    'output,progress,select,textarea,' +
    'details,dialog,menu,menuitem,summary,' +
    'content,element,shadow,template,blockquote,iframe,tfoot'
  );

  // this map is intentionally selective, only covering SVG elements that may
  // contain child elements.
  var isSVG = makeMap(
    'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
    'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
    'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
    true
  );

  var isReservedTag = function (tag) {
    return isHTMLTag(tag) || isSVG(tag)
  };

  function getTagNamespace (tag) {
    if (isSVG(tag)) {
      return 'svg'
    }
    // basic support for MathML
    // note it doesn't support other MathML elements being component roots
    if (tag === 'math') {
      return 'math'
    }
  }

  var unknownElementCache = Object.create(null);
  function isUnknownElement (tag) {
    /* istanbul ignore if */
    if (!inBrowser) {
      return true
    }
    if (isReservedTag(tag)) {
      return false
    }
    tag = tag.toLowerCase();
    /* istanbul ignore if */
    if (unknownElementCache[tag] != null) {
      return unknownElementCache[tag]
    }
    var el = document.createElement(tag);
    if (tag.indexOf('-') > -1) {
      // http://stackoverflow.com/a/28210364/1070244
      return (unknownElementCache[tag] = (
        el.constructor === window.HTMLUnknownElement ||
        el.constructor === window.HTMLElement
      ))
    } else {
      return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
    }
  }

  var isTextInputType = makeMap('text,number,password,search,email,tel,url');

  /*  */

  /**
   * Query an element selector if it's not an element already.
   */
  function query (el) {
    if (typeof el === 'string') {
      var selected = document.querySelector(el);
      if (!selected) {
        return document.createElement('div')
      }
      return selected
    } else {
      return el
    }
  }

  /*  */

  function createElement$1 (tagName, vnode) {
    var elm = document.createElement(tagName);
    if (tagName !== 'select') {
      return elm
    }
    // false or null will remove the attribute but undefined will not
    if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
      elm.setAttribute('multiple', 'multiple');
    }
    return elm
  }

  function createElementNS (namespace, tagName) {
    return document.createElementNS(namespaceMap[namespace], tagName)
  }

  function createTextNode (text) {
    return document.createTextNode(text)
  }

  function createComment (text) {
    return document.createComment(text)
  }

  function insertBefore (parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
  }

  function removeChild (node, child) {
    node.removeChild(child);
  }

  function appendChild (node, child) {
    node.appendChild(child);
  }

  function parentNode (node) {
    return node.parentNode
  }

  function nextSibling (node) {
    return node.nextSibling
  }

  function tagName (node) {
    return node.tagName
  }

  function setTextContent (node, text) {
    node.textContent = text;
  }

  function setStyleScope (node, scopeId) {
    node.setAttribute(scopeId, '');
  }

  var nodeOps = /*#__PURE__*/Object.freeze({
    createElement: createElement$1,
    createElementNS: createElementNS,
    createTextNode: createTextNode,
    createComment: createComment,
    insertBefore: insertBefore,
    removeChild: removeChild,
    appendChild: appendChild,
    parentNode: parentNode,
    nextSibling: nextSibling,
    tagName: tagName,
    setTextContent: setTextContent,
    setStyleScope: setStyleScope
  });

  /*  */

  var ref = {
    create: function create (_, vnode) {
      registerRef(vnode);
    },
    update: function update (oldVnode, vnode) {
      if (oldVnode.data.ref !== vnode.data.ref) {
        registerRef(oldVnode, true);
        registerRef(vnode);
      }
    },
    destroy: function destroy (vnode) {
      registerRef(vnode, true);
    }
  };

  function registerRef (vnode, isRemoval) {
    var key = vnode.data.ref;
    if (!isDef(key)) { return }

    var vm = vnode.context;
    var ref = vnode.componentInstance || vnode.elm;
    var refs = vm.$refs;
    if (isRemoval) {
      if (Array.isArray(refs[key])) {
        remove(refs[key], ref);
      } else if (refs[key] === ref) {
        refs[key] = undefined;
      }
    } else {
      if (vnode.data.refInFor) {
        if (!Array.isArray(refs[key])) {
          refs[key] = [ref];
        } else if (refs[key].indexOf(ref) < 0) {
          // $flow-disable-line
          refs[key].push(ref);
        }
      } else {
        refs[key] = ref;
      }
    }
  }

  /**
   * Virtual DOM patching algorithm based on Snabbdom by
   * Simon Friis Vindum (@paldepind)
   * Licensed under the MIT License
   * https://github.com/paldepind/snabbdom/blob/master/LICENSE
   *
   * modified by Evan You (@yyx990803)
   *
   * Not type-checking this because this file is perf-critical and the cost
   * of making flow understand it is not worth it.
   */

  var emptyNode = new VNode('', {}, []);

  var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

  function sameVnode (a, b) {
    return (
      a.key === b.key && (
        (
          a.tag === b.tag &&
          a.isComment === b.isComment &&
          isDef(a.data) === isDef(b.data) &&
          sameInputType(a, b)
        ) || (
          isTrue(a.isAsyncPlaceholder) &&
          a.asyncFactory === b.asyncFactory &&
          isUndef(b.asyncFactory.error)
        )
      )
    )
  }

  function sameInputType (a, b) {
    if (a.tag !== 'input') { return true }
    var i;
    var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
    var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
    return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
  }

  function createKeyToOldIdx (children, beginIdx, endIdx) {
    var i, key;
    var map = {};
    for (i = beginIdx; i <= endIdx; ++i) {
      key = children[i].key;
      if (isDef(key)) { map[key] = i; }
    }
    return map
  }

  function createPatchFunction (backend) {
    var i, j;
    var cbs = {};

    var modules = backend.modules;
    var nodeOps = backend.nodeOps;

    for (i = 0; i < hooks.length; ++i) {
      cbs[hooks[i]] = [];
      for (j = 0; j < modules.length; ++j) {
        if (isDef(modules[j][hooks[i]])) {
          cbs[hooks[i]].push(modules[j][hooks[i]]);
        }
      }
    }

    function emptyNodeAt (elm) {
      return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
    }

    function createRmCb (childElm, listeners) {
      function remove$$1 () {
        if (--remove$$1.listeners === 0) {
          removeNode(childElm);
        }
      }
      remove$$1.listeners = listeners;
      return remove$$1
    }

    function removeNode (el) {
      var parent = nodeOps.parentNode(el);
      // element may have already been removed due to v-html / v-text
      if (isDef(parent)) {
        nodeOps.removeChild(parent, el);
      }
    }

    function createElm (
      vnode,
      insertedVnodeQueue,
      parentElm,
      refElm,
      nested,
      ownerArray,
      index
    ) {
      if (isDef(vnode.elm) && isDef(ownerArray)) {
        // This vnode was used in a previous render!
        // now it's used as a new node, overwriting its elm would cause
        // potential patch errors down the road when it's used as an insertion
        // reference node. Instead, we clone the node on-demand before creating
        // associated DOM element for it.
        vnode = ownerArray[index] = cloneVNode(vnode);
      }

      vnode.isRootInsert = !nested; // for transition enter check
      if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
        return
      }

      var data = vnode.data;
      var children = vnode.children;
      var tag = vnode.tag;
      if (isDef(tag)) {

        vnode.elm = vnode.ns
          ? nodeOps.createElementNS(vnode.ns, tag)
          : nodeOps.createElement(tag, vnode);
        setScope(vnode);

        /* istanbul ignore if */
        {
          createChildren(vnode, children, insertedVnodeQueue);
          if (isDef(data)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
          }
          insert(parentElm, vnode.elm, refElm);
        }
      } else if (isTrue(vnode.isComment)) {
        vnode.elm = nodeOps.createComment(vnode.text);
        insert(parentElm, vnode.elm, refElm);
      } else {
        vnode.elm = nodeOps.createTextNode(vnode.text);
        insert(parentElm, vnode.elm, refElm);
      }
    }

    function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
      var i = vnode.data;
      if (isDef(i)) {
        var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
        if (isDef(i = i.hook) && isDef(i = i.init)) {
          i(vnode, false /* hydrating */);
        }
        // after calling the init hook, if the vnode is a child component
        // it should've created a child instance and mounted it. the child
        // component also has set the placeholder vnode's elm.
        // in that case we can just return the element and be done.
        if (isDef(vnode.componentInstance)) {
          initComponent(vnode, insertedVnodeQueue);
          insert(parentElm, vnode.elm, refElm);
          if (isTrue(isReactivated)) {
            reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
          }
          return true
        }
      }
    }

    function initComponent (vnode, insertedVnodeQueue) {
      if (isDef(vnode.data.pendingInsert)) {
        insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
        vnode.data.pendingInsert = null;
      }
      vnode.elm = vnode.componentInstance.$el;
      if (isPatchable(vnode)) {
        invokeCreateHooks(vnode, insertedVnodeQueue);
        setScope(vnode);
      } else {
        // empty component root.
        // skip all element-related modules except for ref (#3455)
        registerRef(vnode);
        // make sure to invoke the insert hook
        insertedVnodeQueue.push(vnode);
      }
    }

    function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
      var i;
      // hack for #4339: a reactivated component with inner transition
      // does not trigger because the inner node's created hooks are not called
      // again. It's not ideal to involve module-specific logic in here but
      // there doesn't seem to be a better way to do it.
      var innerNode = vnode;
      while (innerNode.componentInstance) {
        innerNode = innerNode.componentInstance._vnode;
        if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
          for (i = 0; i < cbs.activate.length; ++i) {
            cbs.activate[i](emptyNode, innerNode);
          }
          insertedVnodeQueue.push(innerNode);
          break
        }
      }
      // unlike a newly created component,
      // a reactivated keep-alive component doesn't insert itself
      insert(parentElm, vnode.elm, refElm);
    }

    function insert (parent, elm, ref$$1) {
      if (isDef(parent)) {
        if (isDef(ref$$1)) {
          if (nodeOps.parentNode(ref$$1) === parent) {
            nodeOps.insertBefore(parent, elm, ref$$1);
          }
        } else {
          nodeOps.appendChild(parent, elm);
        }
      }
    }

    function createChildren (vnode, children, insertedVnodeQueue) {
      if (Array.isArray(children)) {
        for (var i = 0; i < children.length; ++i) {
          createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
        }
      } else if (isPrimitive(vnode.text)) {
        nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
      }
    }

    function isPatchable (vnode) {
      while (vnode.componentInstance) {
        vnode = vnode.componentInstance._vnode;
      }
      return isDef(vnode.tag)
    }

    function invokeCreateHooks (vnode, insertedVnodeQueue) {
      for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
        cbs.create[i$1](emptyNode, vnode);
      }
      i = vnode.data.hook; // Reuse variable
      if (isDef(i)) {
        if (isDef(i.create)) { i.create(emptyNode, vnode); }
        if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
      }
    }

    // set scope id attribute for scoped CSS.
    // this is implemented as a special case to avoid the overhead
    // of going through the normal attribute patching process.
    function setScope (vnode) {
      var i;
      if (isDef(i = vnode.fnScopeId)) {
        nodeOps.setStyleScope(vnode.elm, i);
      } else {
        var ancestor = vnode;
        while (ancestor) {
          if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
            nodeOps.setStyleScope(vnode.elm, i);
          }
          ancestor = ancestor.parent;
        }
      }
      // for slot content they should also get the scopeId from the host instance.
      if (isDef(i = activeInstance) &&
        i !== vnode.context &&
        i !== vnode.fnContext &&
        isDef(i = i.$options._scopeId)
      ) {
        nodeOps.setStyleScope(vnode.elm, i);
      }
    }

    function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
      for (; startIdx <= endIdx; ++startIdx) {
        createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
      }
    }

    function invokeDestroyHook (vnode) {
      var i, j;
      var data = vnode.data;
      if (isDef(data)) {
        if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
        for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
      }
      if (isDef(i = vnode.children)) {
        for (j = 0; j < vnode.children.length; ++j) {
          invokeDestroyHook(vnode.children[j]);
        }
      }
    }

    function removeVnodes (vnodes, startIdx, endIdx) {
      for (; startIdx <= endIdx; ++startIdx) {
        var ch = vnodes[startIdx];
        if (isDef(ch)) {
          if (isDef(ch.tag)) {
            removeAndInvokeRemoveHook(ch);
            invokeDestroyHook(ch);
          } else { // Text node
            removeNode(ch.elm);
          }
        }
      }
    }

    function removeAndInvokeRemoveHook (vnode, rm) {
      if (isDef(rm) || isDef(vnode.data)) {
        var i;
        var listeners = cbs.remove.length + 1;
        if (isDef(rm)) {
          // we have a recursively passed down rm callback
          // increase the listeners count
          rm.listeners += listeners;
        } else {
          // directly removing
          rm = createRmCb(vnode.elm, listeners);
        }
        // recursively invoke hooks on child component root node
        if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
          removeAndInvokeRemoveHook(i, rm);
        }
        for (i = 0; i < cbs.remove.length; ++i) {
          cbs.remove[i](vnode, rm);
        }
        if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
          i(vnode, rm);
        } else {
          rm();
        }
      } else {
        removeNode(vnode.elm);
      }
    }

    function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
      var oldStartIdx = 0;
      var newStartIdx = 0;
      var oldEndIdx = oldCh.length - 1;
      var oldStartVnode = oldCh[0];
      var oldEndVnode = oldCh[oldEndIdx];
      var newEndIdx = newCh.length - 1;
      var newStartVnode = newCh[0];
      var newEndVnode = newCh[newEndIdx];
      var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

      // removeOnly is a special flag used only by <transition-group>
      // to ensure removed elements stay in correct relative positions
      // during leaving transitions
      var canMove = !removeOnly;

      while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (isUndef(oldStartVnode)) {
          oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
        } else if (isUndef(oldEndVnode)) {
          oldEndVnode = oldCh[--oldEndIdx];
        } else if (sameVnode(oldStartVnode, newStartVnode)) {
          patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
          oldStartVnode = oldCh[++oldStartIdx];
          newStartVnode = newCh[++newStartIdx];
        } else if (sameVnode(oldEndVnode, newEndVnode)) {
          patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
          oldEndVnode = oldCh[--oldEndIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
          patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
          canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
          oldStartVnode = oldCh[++oldStartIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
          patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
          canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
          oldEndVnode = oldCh[--oldEndIdx];
          newStartVnode = newCh[++newStartIdx];
        } else {
          if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
          idxInOld = isDef(newStartVnode.key)
            ? oldKeyToIdx[newStartVnode.key]
            : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
          if (isUndef(idxInOld)) { // New element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          } else {
            vnodeToMove = oldCh[idxInOld];
            if (sameVnode(vnodeToMove, newStartVnode)) {
              patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
              oldCh[idxInOld] = undefined;
              canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
            } else {
              // same key but different element. treat as new element
              createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
            }
          }
          newStartVnode = newCh[++newStartIdx];
        }
      }
      if (oldStartIdx > oldEndIdx) {
        refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
        addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
      } else if (newStartIdx > newEndIdx) {
        removeVnodes(oldCh, oldStartIdx, oldEndIdx);
      }
    }

    function findIdxInOld (node, oldCh, start, end) {
      for (var i = start; i < end; i++) {
        var c = oldCh[i];
        if (isDef(c) && sameVnode(node, c)) { return i }
      }
    }

    function patchVnode (
      oldVnode,
      vnode,
      insertedVnodeQueue,
      ownerArray,
      index,
      removeOnly
    ) {
      if (oldVnode === vnode) {
        return
      }

      if (isDef(vnode.elm) && isDef(ownerArray)) {
        // clone reused vnode
        vnode = ownerArray[index] = cloneVNode(vnode);
      }

      var elm = vnode.elm = oldVnode.elm;

      if (isTrue(oldVnode.isAsyncPlaceholder)) {
        if (isDef(vnode.asyncFactory.resolved)) {
          hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
        } else {
          vnode.isAsyncPlaceholder = true;
        }
        return
      }

      // reuse element for static trees.
      // note we only do this if the vnode is cloned -
      // if the new node is not cloned it means the render functions have been
      // reset by the hot-reload-api and we need to do a proper re-render.
      if (isTrue(vnode.isStatic) &&
        isTrue(oldVnode.isStatic) &&
        vnode.key === oldVnode.key &&
        (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
      ) {
        vnode.componentInstance = oldVnode.componentInstance;
        return
      }

      var i;
      var data = vnode.data;
      if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
        i(oldVnode, vnode);
      }

      var oldCh = oldVnode.children;
      var ch = vnode.children;
      if (isDef(data) && isPatchable(vnode)) {
        for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
        if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
      }
      if (isUndef(vnode.text)) {
        if (isDef(oldCh) && isDef(ch)) {
          if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
        } else if (isDef(ch)) {
          if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
          addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
        } else if (isDef(oldCh)) {
          removeVnodes(oldCh, 0, oldCh.length - 1);
        } else if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }
      } else if (oldVnode.text !== vnode.text) {
        nodeOps.setTextContent(elm, vnode.text);
      }
      if (isDef(data)) {
        if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
      }
    }

    function invokeInsertHook (vnode, queue, initial) {
      // delay insert hooks for component root nodes, invoke them after the
      // element is really inserted
      if (isTrue(initial) && isDef(vnode.parent)) {
        vnode.parent.data.pendingInsert = queue;
      } else {
        for (var i = 0; i < queue.length; ++i) {
          queue[i].data.hook.insert(queue[i]);
        }
      }
    }
    // list of modules that can skip create hook during hydration because they
    // are already rendered on the client or has no need for initialization
    // Note: style is excluded because it relies on initial clone for future
    // deep updates (#7063).
    var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

    // Note: this is a browser-only function so we can assume elms are DOM nodes.
    function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
      var i;
      var tag = vnode.tag;
      var data = vnode.data;
      var children = vnode.children;
      inVPre = inVPre || (data && data.pre);
      vnode.elm = elm;

      if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
        vnode.isAsyncPlaceholder = true;
        return true
      }
      if (isDef(data)) {
        if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
        if (isDef(i = vnode.componentInstance)) {
          // child component. it should have hydrated its own tree.
          initComponent(vnode, insertedVnodeQueue);
          return true
        }
      }
      if (isDef(tag)) {
        if (isDef(children)) {
          // empty element, allow client to pick up and populate children
          if (!elm.hasChildNodes()) {
            createChildren(vnode, children, insertedVnodeQueue);
          } else {
            // v-html and domProps: innerHTML
            if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
              if (i !== elm.innerHTML) {
                return false
              }
            } else {
              // iterate and compare children lists
              var childrenMatch = true;
              var childNode = elm.firstChild;
              for (var i$1 = 0; i$1 < children.length; i$1++) {
                if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                  childrenMatch = false;
                  break
                }
                childNode = childNode.nextSibling;
              }
              // if childNode is not null, it means the actual childNodes list is
              // longer than the virtual children list.
              if (!childrenMatch || childNode) {
                return false
              }
            }
          }
        }
        if (isDef(data)) {
          var fullInvoke = false;
          for (var key in data) {
            if (!isRenderedModule(key)) {
              fullInvoke = true;
              invokeCreateHooks(vnode, insertedVnodeQueue);
              break
            }
          }
          if (!fullInvoke && data['class']) {
            // ensure collecting deps for deep class bindings for future updates
            traverse(data['class']);
          }
        }
      } else if (elm.data !== vnode.text) {
        elm.data = vnode.text;
      }
      return true
    }

    return function patch (oldVnode, vnode, hydrating, removeOnly) {
      if (isUndef(vnode)) {
        if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
        return
      }

      var isInitialPatch = false;
      var insertedVnodeQueue = [];

      if (isUndef(oldVnode)) {
        // empty mount (likely as component), create new root element
        isInitialPatch = true;
        createElm(vnode, insertedVnodeQueue);
      } else {
        var isRealElement = isDef(oldVnode.nodeType);
        if (!isRealElement && sameVnode(oldVnode, vnode)) {
          // patch existing root node
          patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
        } else {
          if (isRealElement) {
            // mounting to a real element
            // check if this is server-rendered content and if we can perform
            // a successful hydration.
            if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
              oldVnode.removeAttribute(SSR_ATTR);
              hydrating = true;
            }
            if (isTrue(hydrating)) {
              if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
                invokeInsertHook(vnode, insertedVnodeQueue, true);
                return oldVnode
              }
            }
            // either not server-rendered, or hydration failed.
            // create an empty node and replace it
            oldVnode = emptyNodeAt(oldVnode);
          }

          // replacing existing element
          var oldElm = oldVnode.elm;
          var parentElm = nodeOps.parentNode(oldElm);

          // create new node
          createElm(
            vnode,
            insertedVnodeQueue,
            // extremely rare edge case: do not insert if old element is in a
            // leaving transition. Only happens when combining transition +
            // keep-alive + HOCs. (#4590)
            oldElm._leaveCb ? null : parentElm,
            nodeOps.nextSibling(oldElm)
          );

          // update parent placeholder node element, recursively
          if (isDef(vnode.parent)) {
            var ancestor = vnode.parent;
            var patchable = isPatchable(vnode);
            while (ancestor) {
              for (var i = 0; i < cbs.destroy.length; ++i) {
                cbs.destroy[i](ancestor);
              }
              ancestor.elm = vnode.elm;
              if (patchable) {
                for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                  cbs.create[i$1](emptyNode, ancestor);
                }
                // #6513
                // invoke insert hooks that may have been merged by create hooks.
                // e.g. for directives that uses the "inserted" hook.
                var insert = ancestor.data.hook.insert;
                if (insert.merged) {
                  // start at index 1 to avoid re-invoking component mounted hook
                  for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                    insert.fns[i$2]();
                  }
                }
              } else {
                registerRef(ancestor);
              }
              ancestor = ancestor.parent;
            }
          }

          // destroy old node
          if (isDef(parentElm)) {
            removeVnodes([oldVnode], 0, 0);
          } else if (isDef(oldVnode.tag)) {
            invokeDestroyHook(oldVnode);
          }
        }
      }

      invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
      return vnode.elm
    }
  }

  /*  */

  var directives = {
    create: updateDirectives,
    update: updateDirectives,
    destroy: function unbindDirectives (vnode) {
      updateDirectives(vnode, emptyNode);
    }
  };

  function updateDirectives (oldVnode, vnode) {
    if (oldVnode.data.directives || vnode.data.directives) {
      _update(oldVnode, vnode);
    }
  }

  function _update (oldVnode, vnode) {
    var isCreate = oldVnode === emptyNode;
    var isDestroy = vnode === emptyNode;
    var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
    var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

    var dirsWithInsert = [];
    var dirsWithPostpatch = [];

    var key, oldDir, dir;
    for (key in newDirs) {
      oldDir = oldDirs[key];
      dir = newDirs[key];
      if (!oldDir) {
        // new directive, bind
        callHook$1(dir, 'bind', vnode, oldVnode);
        if (dir.def && dir.def.inserted) {
          dirsWithInsert.push(dir);
        }
      } else {
        // existing directive, update
        dir.oldValue = oldDir.value;
        dir.oldArg = oldDir.arg;
        callHook$1(dir, 'update', vnode, oldVnode);
        if (dir.def && dir.def.componentUpdated) {
          dirsWithPostpatch.push(dir);
        }
      }
    }

    if (dirsWithInsert.length) {
      var callInsert = function () {
        for (var i = 0; i < dirsWithInsert.length; i++) {
          callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
        }
      };
      if (isCreate) {
        mergeVNodeHook(vnode, 'insert', callInsert);
      } else {
        callInsert();
      }
    }

    if (dirsWithPostpatch.length) {
      mergeVNodeHook(vnode, 'postpatch', function () {
        for (var i = 0; i < dirsWithPostpatch.length; i++) {
          callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
        }
      });
    }

    if (!isCreate) {
      for (key in oldDirs) {
        if (!newDirs[key]) {
          // no longer present, unbind
          callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
        }
      }
    }
  }

  var emptyModifiers = Object.create(null);

  function normalizeDirectives$1 (
    dirs,
    vm
  ) {
    var res = Object.create(null);
    if (!dirs) {
      // $flow-disable-line
      return res
    }
    var i, dir;
    for (i = 0; i < dirs.length; i++) {
      dir = dirs[i];
      if (!dir.modifiers) {
        // $flow-disable-line
        dir.modifiers = emptyModifiers;
      }
      res[getRawDirName(dir)] = dir;
      dir.def = resolveAsset(vm.$options, 'directives', dir.name);
    }
    // $flow-disable-line
    return res
  }

  function getRawDirName (dir) {
    return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
  }

  function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
    var fn = dir.def && dir.def[hook];
    if (fn) {
      try {
        fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
      } catch (e) {
        handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
      }
    }
  }

  var baseModules = [
    ref,
    directives
  ];

  /*  */

  function updateAttrs (oldVnode, vnode) {
    var opts = vnode.componentOptions;
    if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
      return
    }
    if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
      return
    }
    var key, cur, old;
    var elm = vnode.elm;
    var oldAttrs = oldVnode.data.attrs || {};
    var attrs = vnode.data.attrs || {};
    // clone observed objects, as the user probably wants to mutate it
    if (isDef(attrs.__ob__)) {
      attrs = vnode.data.attrs = extend({}, attrs);
    }

    for (key in attrs) {
      cur = attrs[key];
      old = oldAttrs[key];
      if (old !== cur) {
        setAttr(elm, key, cur);
      }
    }
    // #4391: in IE9, setting type can reset value for input[type=radio]
    // #6666: IE/Edge forces progress value down to 1 before setting a max
    /* istanbul ignore if */
    if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
      setAttr(elm, 'value', attrs.value);
    }
    for (key in oldAttrs) {
      if (isUndef(attrs[key])) {
        if (isXlink(key)) {
          elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
        } else if (!isEnumeratedAttr(key)) {
          elm.removeAttribute(key);
        }
      }
    }
  }

  function setAttr (el, key, value) {
    if (el.tagName.indexOf('-') > -1) {
      baseSetAttr(el, key, value);
    } else if (isBooleanAttr(key)) {
      // set attribute for blank value
      // e.g. <option disabled>Select one</option>
      if (isFalsyAttrValue(value)) {
        el.removeAttribute(key);
      } else {
        // technically allowfullscreen is a boolean attribute for <iframe>,
        // but Flash expects a value of "true" when used on <embed> tag
        value = key === 'allowfullscreen' && el.tagName === 'EMBED'
          ? 'true'
          : key;
        el.setAttribute(key, value);
      }
    } else if (isEnumeratedAttr(key)) {
      el.setAttribute(key, convertEnumeratedValue(key, value));
    } else if (isXlink(key)) {
      if (isFalsyAttrValue(value)) {
        el.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else {
        el.setAttributeNS(xlinkNS, key, value);
      }
    } else {
      baseSetAttr(el, key, value);
    }
  }

  function baseSetAttr (el, key, value) {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // #7138: IE10 & 11 fires input event when setting placeholder on
      // <textarea>... block the first input event and remove the blocker
      // immediately.
      /* istanbul ignore if */
      if (
        isIE && !isIE9 &&
        el.tagName === 'TEXTAREA' &&
        key === 'placeholder' && value !== '' && !el.__ieph
      ) {
        var blocker = function (e) {
          e.stopImmediatePropagation();
          el.removeEventListener('input', blocker);
        };
        el.addEventListener('input', blocker);
        // $flow-disable-line
        el.__ieph = true; /* IE placeholder patched */
      }
      el.setAttribute(key, value);
    }
  }

  var attrs = {
    create: updateAttrs,
    update: updateAttrs
  };

  /*  */

  function updateClass (oldVnode, vnode) {
    var el = vnode.elm;
    var data = vnode.data;
    var oldData = oldVnode.data;
    if (
      isUndef(data.staticClass) &&
      isUndef(data.class) && (
        isUndef(oldData) || (
          isUndef(oldData.staticClass) &&
          isUndef(oldData.class)
        )
      )
    ) {
      return
    }

    var cls = genClassForVnode(vnode);

    // handle transition classes
    var transitionClass = el._transitionClasses;
    if (isDef(transitionClass)) {
      cls = concat(cls, stringifyClass(transitionClass));
    }

    // set the class
    if (cls !== el._prevClass) {
      el.setAttribute('class', cls);
      el._prevClass = cls;
    }
  }

  var klass = {
    create: updateClass,
    update: updateClass
  };

  /*  */

  /*  */

  /*  */

  /*  */

  // in some cases, the event used has to be determined at runtime
  // so we used some reserved tokens during compile.
  var RANGE_TOKEN = '__r';
  var CHECKBOX_RADIO_TOKEN = '__c';

  /*  */

  // normalize v-model event tokens that can only be determined at runtime.
  // it's important to place the event as the first in the array because
  // the whole point is ensuring the v-model callback gets called before
  // user-attached handlers.
  function normalizeEvents (on) {
    /* istanbul ignore if */
    if (isDef(on[RANGE_TOKEN])) {
      // IE input[type=range] only supports `change` event
      var event = isIE ? 'change' : 'input';
      on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
      delete on[RANGE_TOKEN];
    }
    // This was originally intended to fix #4521 but no longer necessary
    // after 2.5. Keeping it for backwards compat with generated code from < 2.4
    /* istanbul ignore if */
    if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
      on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
      delete on[CHECKBOX_RADIO_TOKEN];
    }
  }

  var target$1;

  function createOnceHandler$1 (event, handler, capture) {
    var _target = target$1; // save current target element in closure
    return function onceHandler () {
      var res = handler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, onceHandler, capture, _target);
      }
    }
  }

  // #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
  // implementation and does not fire microtasks in between event propagation, so
  // safe to exclude.
  var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

  function add$1 (
    name,
    handler,
    capture,
    passive
  ) {
    // async edge case #6566: inner click event triggers patch, event handler
    // attached to outer element during patch, and triggered again. This
    // happens because browsers fire microtask ticks between event propagation.
    // the solution is simple: we save the timestamp when a handler is attached,
    // and the handler would only fire if the event passed to it was fired
    // AFTER it was attached.
    if (useMicrotaskFix) {
      var attachedTimestamp = currentFlushTimestamp;
      var original = handler;
      handler = original._wrapper = function (e) {
        if (
          // no bubbling, should always fire.
          // this is just a safety net in case event.timeStamp is unreliable in
          // certain weird environments...
          e.target === e.currentTarget ||
          // event is fired after handler attachment
          e.timeStamp >= attachedTimestamp ||
          // bail for environments that have buggy event.timeStamp implementations
          // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
          // #9681 QtWebEngine event.timeStamp is negative value
          e.timeStamp <= 0 ||
          // #9448 bail if event is fired in another document in a multi-page
          // electron/nw.js app, since event.timeStamp will be using a different
          // starting reference
          e.target.ownerDocument !== document
        ) {
          return original.apply(this, arguments)
        }
      };
    }
    target$1.addEventListener(
      name,
      handler,
      supportsPassive
        ? { capture: capture, passive: passive }
        : capture
    );
  }

  function remove$2 (
    name,
    handler,
    capture,
    _target
  ) {
    (_target || target$1).removeEventListener(
      name,
      handler._wrapper || handler,
      capture
    );
  }

  function updateDOMListeners (oldVnode, vnode) {
    if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
      return
    }
    var on = vnode.data.on || {};
    var oldOn = oldVnode.data.on || {};
    target$1 = vnode.elm;
    normalizeEvents(on);
    updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
    target$1 = undefined;
  }

  var events = {
    create: updateDOMListeners,
    update: updateDOMListeners
  };

  /*  */

  var svgContainer;

  function updateDOMProps (oldVnode, vnode) {
    if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
      return
    }
    var key, cur;
    var elm = vnode.elm;
    var oldProps = oldVnode.data.domProps || {};
    var props = vnode.data.domProps || {};
    // clone observed objects, as the user probably wants to mutate it
    if (isDef(props.__ob__)) {
      props = vnode.data.domProps = extend({}, props);
    }

    for (key in oldProps) {
      if (!(key in props)) {
        elm[key] = '';
      }
    }

    for (key in props) {
      cur = props[key];
      // ignore children if the node has textContent or innerHTML,
      // as these will throw away existing DOM nodes and cause removal errors
      // on subsequent patches (#3360)
      if (key === 'textContent' || key === 'innerHTML') {
        if (vnode.children) { vnode.children.length = 0; }
        if (cur === oldProps[key]) { continue }
        // #6601 work around Chrome version <= 55 bug where single textNode
        // replaced by innerHTML/textContent retains its parentNode property
        if (elm.childNodes.length === 1) {
          elm.removeChild(elm.childNodes[0]);
        }
      }

      if (key === 'value' && elm.tagName !== 'PROGRESS') {
        // store value as _value as well since
        // non-string values will be stringified
        elm._value = cur;
        // avoid resetting cursor position when value is the same
        var strCur = isUndef(cur) ? '' : String(cur);
        if (shouldUpdateValue(elm, strCur)) {
          elm.value = strCur;
        }
      } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
        // IE doesn't support innerHTML for SVG elements
        svgContainer = svgContainer || document.createElement('div');
        svgContainer.innerHTML = "<svg>" + cur + "</svg>";
        var svg = svgContainer.firstChild;
        while (elm.firstChild) {
          elm.removeChild(elm.firstChild);
        }
        while (svg.firstChild) {
          elm.appendChild(svg.firstChild);
        }
      } else if (
        // skip the update if old and new VDOM state is the same.
        // `value` is handled separately because the DOM value may be temporarily
        // out of sync with VDOM state due to focus, composition and modifiers.
        // This  #4521 by skipping the unnecesarry `checked` update.
        cur !== oldProps[key]
      ) {
        // some property updates can throw
        // e.g. `value` on <progress> w/ non-finite value
        try {
          elm[key] = cur;
        } catch (e) {}
      }
    }
  }

  // check platforms/web/util/attrs.js acceptValue


  function shouldUpdateValue (elm, checkVal) {
    return (!elm.composing && (
      elm.tagName === 'OPTION' ||
      isNotInFocusAndDirty(elm, checkVal) ||
      isDirtyWithModifiers(elm, checkVal)
    ))
  }

  function isNotInFocusAndDirty (elm, checkVal) {
    // return true when textbox (.number and .trim) loses focus and its value is
    // not equal to the updated value
    var notInFocus = true;
    // #6157
    // work around IE bug when accessing document.activeElement in an iframe
    try { notInFocus = document.activeElement !== elm; } catch (e) {}
    return notInFocus && elm.value !== checkVal
  }

  function isDirtyWithModifiers (elm, newVal) {
    var value = elm.value;
    var modifiers = elm._vModifiers; // injected by v-model runtime
    if (isDef(modifiers)) {
      if (modifiers.number) {
        return toNumber(value) !== toNumber(newVal)
      }
      if (modifiers.trim) {
        return value.trim() !== newVal.trim()
      }
    }
    return value !== newVal
  }

  var domProps = {
    create: updateDOMProps,
    update: updateDOMProps
  };

  /*  */

  var parseStyleText = cached(function (cssText) {
    var res = {};
    var listDelimiter = /;(?![^(]*\))/g;
    var propertyDelimiter = /:(.+)/;
    cssText.split(listDelimiter).forEach(function (item) {
      if (item) {
        var tmp = item.split(propertyDelimiter);
        tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return res
  });

  // merge static and dynamic style data on the same vnode
  function normalizeStyleData (data) {
    var style = normalizeStyleBinding(data.style);
    // static style is pre-processed into an object during compilation
    // and is always a fresh object, so it's safe to merge into it
    return data.staticStyle
      ? extend(data.staticStyle, style)
      : style
  }

  // normalize possible array / string values into Object
  function normalizeStyleBinding (bindingStyle) {
    if (Array.isArray(bindingStyle)) {
      return toObject(bindingStyle)
    }
    if (typeof bindingStyle === 'string') {
      return parseStyleText(bindingStyle)
    }
    return bindingStyle
  }

  /**
   * parent component style should be after child's
   * so that parent component's style could override it
   */
  function getStyle (vnode, checkChild) {
    var res = {};
    var styleData;

    if (checkChild) {
      var childNode = vnode;
      while (childNode.componentInstance) {
        childNode = childNode.componentInstance._vnode;
        if (
          childNode && childNode.data &&
          (styleData = normalizeStyleData(childNode.data))
        ) {
          extend(res, styleData);
        }
      }
    }

    if ((styleData = normalizeStyleData(vnode.data))) {
      extend(res, styleData);
    }

    var parentNode = vnode;
    while ((parentNode = parentNode.parent)) {
      if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
        extend(res, styleData);
      }
    }
    return res
  }

  /*  */

  var cssVarRE = /^--/;
  var importantRE = /\s*!important$/;
  var setProp = function (el, name, val) {
    /* istanbul ignore if */
    if (cssVarRE.test(name)) {
      el.style.setProperty(name, val);
    } else if (importantRE.test(val)) {
      el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
    } else {
      var normalizedName = normalize(name);
      if (Array.isArray(val)) {
        // Support values array created by autoprefixer, e.g.
        // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
        // Set them one by one, and the browser will only set those it can recognize
        for (var i = 0, len = val.length; i < len; i++) {
          el.style[normalizedName] = val[i];
        }
      } else {
        el.style[normalizedName] = val;
      }
    }
  };

  var vendorNames = ['Webkit', 'Moz', 'ms'];

  var emptyStyle;
  var normalize = cached(function (prop) {
    emptyStyle = emptyStyle || document.createElement('div').style;
    prop = camelize(prop);
    if (prop !== 'filter' && (prop in emptyStyle)) {
      return prop
    }
    var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
    for (var i = 0; i < vendorNames.length; i++) {
      var name = vendorNames[i] + capName;
      if (name in emptyStyle) {
        return name
      }
    }
  });

  function updateStyle (oldVnode, vnode) {
    var data = vnode.data;
    var oldData = oldVnode.data;

    if (isUndef(data.staticStyle) && isUndef(data.style) &&
      isUndef(oldData.staticStyle) && isUndef(oldData.style)
    ) {
      return
    }

    var cur, name;
    var el = vnode.elm;
    var oldStaticStyle = oldData.staticStyle;
    var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

    // if static style exists, stylebinding already merged into it when doing normalizeStyleData
    var oldStyle = oldStaticStyle || oldStyleBinding;

    var style = normalizeStyleBinding(vnode.data.style) || {};

    // store normalized style under a different key for next diff
    // make sure to clone it if it's reactive, since the user likely wants
    // to mutate it.
    vnode.data.normalizedStyle = isDef(style.__ob__)
      ? extend({}, style)
      : style;

    var newStyle = getStyle(vnode, true);

    for (name in oldStyle) {
      if (isUndef(newStyle[name])) {
        setProp(el, name, '');
      }
    }
    for (name in newStyle) {
      cur = newStyle[name];
      if (cur !== oldStyle[name]) {
        // ie9 setting to null has no effect, must use empty string
        setProp(el, name, cur == null ? '' : cur);
      }
    }
  }

  var style = {
    create: updateStyle,
    update: updateStyle
  };

  /*  */

  var whitespaceRE = /\s+/;

  /**
   * Add class with compatibility for SVG since classList is not supported on
   * SVG elements in IE
   */
  function addClass (el, cls) {
    /* istanbul ignore if */
    if (!cls || !(cls = cls.trim())) {
      return
    }

    /* istanbul ignore else */
    if (el.classList) {
      if (cls.indexOf(' ') > -1) {
        cls.split(whitespaceRE).forEach(function (c) { return el.classList.add(c); });
      } else {
        el.classList.add(cls);
      }
    } else {
      var cur = " " + (el.getAttribute('class') || '') + " ";
      if (cur.indexOf(' ' + cls + ' ') < 0) {
        el.setAttribute('class', (cur + cls).trim());
      }
    }
  }

  /**
   * Remove class with compatibility for SVG since classList is not supported on
   * SVG elements in IE
   */
  function removeClass (el, cls) {
    /* istanbul ignore if */
    if (!cls || !(cls = cls.trim())) {
      return
    }

    /* istanbul ignore else */
    if (el.classList) {
      if (cls.indexOf(' ') > -1) {
        cls.split(whitespaceRE).forEach(function (c) { return el.classList.remove(c); });
      } else {
        el.classList.remove(cls);
      }
      if (!el.classList.length) {
        el.removeAttribute('class');
      }
    } else {
      var cur = " " + (el.getAttribute('class') || '') + " ";
      var tar = ' ' + cls + ' ';
      while (cur.indexOf(tar) >= 0) {
        cur = cur.replace(tar, ' ');
      }
      cur = cur.trim();
      if (cur) {
        el.setAttribute('class', cur);
      } else {
        el.removeAttribute('class');
      }
    }
  }

  /*  */

  function resolveTransition (def$$1) {
    if (!def$$1) {
      return
    }
    /* istanbul ignore else */
    if (typeof def$$1 === 'object') {
      var res = {};
      if (def$$1.css !== false) {
        extend(res, autoCssTransition(def$$1.name || 'v'));
      }
      extend(res, def$$1);
      return res
    } else if (typeof def$$1 === 'string') {
      return autoCssTransition(def$$1)
    }
  }

  var autoCssTransition = cached(function (name) {
    return {
      enterClass: (name + "-enter"),
      enterToClass: (name + "-enter-to"),
      enterActiveClass: (name + "-enter-active"),
      leaveClass: (name + "-leave"),
      leaveToClass: (name + "-leave-to"),
      leaveActiveClass: (name + "-leave-active")
    }
  });

  var hasTransition = inBrowser && !isIE9;
  var TRANSITION = 'transition';
  var ANIMATION = 'animation';

  // Transition property/event sniffing
  var transitionProp = 'transition';
  var transitionEndEvent = 'transitionend';
  var animationProp = 'animation';
  var animationEndEvent = 'animationend';
  if (hasTransition) {
    /* istanbul ignore if */
    if (window.ontransitionend === undefined &&
      window.onwebkittransitionend !== undefined
    ) {
      transitionProp = 'WebkitTransition';
      transitionEndEvent = 'webkitTransitionEnd';
    }
    if (window.onanimationend === undefined &&
      window.onwebkitanimationend !== undefined
    ) {
      animationProp = 'WebkitAnimation';
      animationEndEvent = 'webkitAnimationEnd';
    }
  }

  // binding to window is necessary to make hot reload work in IE in strict mode
  var raf = inBrowser
    ? window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : setTimeout
    : /* istanbul ignore next */ function (fn) { return fn(); };

  function nextFrame (fn) {
    raf(function () {
      raf(fn);
    });
  }

  function addTransitionClass (el, cls) {
    var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
    if (transitionClasses.indexOf(cls) < 0) {
      transitionClasses.push(cls);
      addClass(el, cls);
    }
  }

  function removeTransitionClass (el, cls) {
    if (el._transitionClasses) {
      remove(el._transitionClasses, cls);
    }
    removeClass(el, cls);
  }

  function whenTransitionEnds (
    el,
    expectedType,
    cb
  ) {
    var ref = getTransitionInfo(el, expectedType);
    var type = ref.type;
    var timeout = ref.timeout;
    var propCount = ref.propCount;
    if (!type) { return cb() }
    var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
    var ended = 0;
    var end = function () {
      el.removeEventListener(event, onEnd);
      cb();
    };
    var onEnd = function (e) {
      if (e.target === el) {
        if (++ended >= propCount) {
          end();
        }
      }
    };
    setTimeout(function () {
      if (ended < propCount) {
        end();
      }
    }, timeout + 1);
    el.addEventListener(event, onEnd);
  }

  var transformRE = /\b(transform|all)(,|$)/;

  function getTransitionInfo (el, expectedType) {
    var styles = window.getComputedStyle(el);
    // JSDOM may return undefined for transition properties
    var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
    var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
    var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
    var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
    var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
    var animationTimeout = getTimeout(animationDelays, animationDurations);

    var type;
    var timeout = 0;
    var propCount = 0;
    /* istanbul ignore if */
    if (expectedType === TRANSITION) {
      if (transitionTimeout > 0) {
        type = TRANSITION;
        timeout = transitionTimeout;
        propCount = transitionDurations.length;
      }
    } else if (expectedType === ANIMATION) {
      if (animationTimeout > 0) {
        type = ANIMATION;
        timeout = animationTimeout;
        propCount = animationDurations.length;
      }
    } else {
      timeout = Math.max(transitionTimeout, animationTimeout);
      type = timeout > 0
        ? transitionTimeout > animationTimeout
          ? TRANSITION
          : ANIMATION
        : null;
      propCount = type
        ? type === TRANSITION
          ? transitionDurations.length
          : animationDurations.length
        : 0;
    }
    var hasTransform =
      type === TRANSITION &&
      transformRE.test(styles[transitionProp + 'Property']);
    return {
      type: type,
      timeout: timeout,
      propCount: propCount,
      hasTransform: hasTransform
    }
  }

  function getTimeout (delays, durations) {
    /* istanbul ignore next */
    while (delays.length < durations.length) {
      delays = delays.concat(delays);
    }

    return Math.max.apply(null, durations.map(function (d, i) {
      return toMs(d) + toMs(delays[i])
    }))
  }

  // Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
  // in a locale-dependent way, using a comma instead of a dot.
  // If comma is not replaced with a dot, the input will be rounded down (i.e. acting
  // as a floor function) causing unexpected behaviors
  function toMs (s) {
    return Number(s.slice(0, -1).replace(',', '.')) * 1000
  }

  /*  */

  function enter (vnode, toggleDisplay) {
    var el = vnode.elm;

    // call leave callback now
    if (isDef(el._leaveCb)) {
      el._leaveCb.cancelled = true;
      el._leaveCb();
    }

    var data = resolveTransition(vnode.data.transition);
    if (isUndef(data)) {
      return
    }

    /* istanbul ignore if */
    if (isDef(el._enterCb) || el.nodeType !== 1) {
      return
    }

    var css = data.css;
    var type = data.type;
    var enterClass = data.enterClass;
    var enterToClass = data.enterToClass;
    var enterActiveClass = data.enterActiveClass;
    var appearClass = data.appearClass;
    var appearToClass = data.appearToClass;
    var appearActiveClass = data.appearActiveClass;
    var beforeEnter = data.beforeEnter;
    var enter = data.enter;
    var afterEnter = data.afterEnter;
    var enterCancelled = data.enterCancelled;
    var beforeAppear = data.beforeAppear;
    var appear = data.appear;
    var afterAppear = data.afterAppear;
    var appearCancelled = data.appearCancelled;
    var duration = data.duration;

    // activeInstance will always be the <transition> component managing this
    // transition. One edge case to check is when the <transition> is placed
    // as the root node of a child component. In that case we need to check
    // <transition>'s parent for appear check.
    var context = activeInstance;
    var transitionNode = activeInstance.$vnode;
    while (transitionNode && transitionNode.parent) {
      context = transitionNode.context;
      transitionNode = transitionNode.parent;
    }

    var isAppear = !context._isMounted || !vnode.isRootInsert;

    if (isAppear && !appear && appear !== '') {
      return
    }

    var startClass = isAppear && appearClass
      ? appearClass
      : enterClass;
    var activeClass = isAppear && appearActiveClass
      ? appearActiveClass
      : enterActiveClass;
    var toClass = isAppear && appearToClass
      ? appearToClass
      : enterToClass;

    var beforeEnterHook = isAppear
      ? (beforeAppear || beforeEnter)
      : beforeEnter;
    var enterHook = isAppear
      ? (typeof appear === 'function' ? appear : enter)
      : enter;
    var afterEnterHook = isAppear
      ? (afterAppear || afterEnter)
      : afterEnter;
    var enterCancelledHook = isAppear
      ? (appearCancelled || enterCancelled)
      : enterCancelled;

    var explicitEnterDuration = toNumber(
      isObject(duration)
        ? duration.enter
        : duration
    );

    var expectsCSS = css !== false && !isIE9;
    var userWantsControl = getHookArgumentsLength(enterHook);

    var cb = el._enterCb = once(function () {
      if (expectsCSS) {
        removeTransitionClass(el, toClass);
        removeTransitionClass(el, activeClass);
      }
      if (cb.cancelled) {
        if (expectsCSS) {
          removeTransitionClass(el, startClass);
        }
        enterCancelledHook && enterCancelledHook(el);
      } else {
        afterEnterHook && afterEnterHook(el);
      }
      el._enterCb = null;
    });

    if (!vnode.data.show) {
      // remove pending leave element on enter by injecting an insert hook
      mergeVNodeHook(vnode, 'insert', function () {
        var parent = el.parentNode;
        var pendingNode = parent && parent._pending && parent._pending[vnode.key];
        if (pendingNode &&
          pendingNode.tag === vnode.tag &&
          pendingNode.elm._leaveCb
        ) {
          pendingNode.elm._leaveCb();
        }
        enterHook && enterHook(el, cb);
      });
    }

    // start enter transition
    beforeEnterHook && beforeEnterHook(el);
    if (expectsCSS) {
      addTransitionClass(el, startClass);
      addTransitionClass(el, activeClass);
      nextFrame(function () {
        removeTransitionClass(el, startClass);
        if (!cb.cancelled) {
          addTransitionClass(el, toClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitEnterDuration)) {
              setTimeout(cb, explicitEnterDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }

    if (vnode.data.show) {
      toggleDisplay && toggleDisplay();
      enterHook && enterHook(el, cb);
    }

    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }

  function leave (vnode, rm) {
    var el = vnode.elm;

    // call enter callback now
    if (isDef(el._enterCb)) {
      el._enterCb.cancelled = true;
      el._enterCb();
    }

    var data = resolveTransition(vnode.data.transition);
    if (isUndef(data) || el.nodeType !== 1) {
      return rm()
    }

    /* istanbul ignore if */
    if (isDef(el._leaveCb)) {
      return
    }

    var css = data.css;
    var type = data.type;
    var leaveClass = data.leaveClass;
    var leaveToClass = data.leaveToClass;
    var leaveActiveClass = data.leaveActiveClass;
    var beforeLeave = data.beforeLeave;
    var leave = data.leave;
    var afterLeave = data.afterLeave;
    var leaveCancelled = data.leaveCancelled;
    var delayLeave = data.delayLeave;
    var duration = data.duration;

    var expectsCSS = css !== false && !isIE9;
    var userWantsControl = getHookArgumentsLength(leave);

    var explicitLeaveDuration = toNumber(
      isObject(duration)
        ? duration.leave
        : duration
    );

    var cb = el._leaveCb = once(function () {
      if (el.parentNode && el.parentNode._pending) {
        el.parentNode._pending[vnode.key] = null;
      }
      if (expectsCSS) {
        removeTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveActiveClass);
      }
      if (cb.cancelled) {
        if (expectsCSS) {
          removeTransitionClass(el, leaveClass);
        }
        leaveCancelled && leaveCancelled(el);
      } else {
        rm();
        afterLeave && afterLeave(el);
      }
      el._leaveCb = null;
    });

    if (delayLeave) {
      delayLeave(performLeave);
    } else {
      performLeave();
    }

    function performLeave () {
      // the delayed leave may have already been cancelled
      if (cb.cancelled) {
        return
      }
      // record leaving element
      if (!vnode.data.show && el.parentNode) {
        (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
      }
      beforeLeave && beforeLeave(el);
      if (expectsCSS) {
        addTransitionClass(el, leaveClass);
        addTransitionClass(el, leaveActiveClass);
        nextFrame(function () {
          removeTransitionClass(el, leaveClass);
          if (!cb.cancelled) {
            addTransitionClass(el, leaveToClass);
            if (!userWantsControl) {
              if (isValidDuration(explicitLeaveDuration)) {
                setTimeout(cb, explicitLeaveDuration);
              } else {
                whenTransitionEnds(el, type, cb);
              }
            }
          }
        });
      }
      leave && leave(el, cb);
      if (!expectsCSS && !userWantsControl) {
        cb();
      }
    }
  }

  function isValidDuration (val) {
    return typeof val === 'number' && !isNaN(val)
  }

  /**
   * Normalize a transition hook's argument length. The hook may be:
   * - a merged hook (invoker) with the original in .fns
   * - a wrapped component method (check ._length)
   * - a plain function (.length)
   */
  function getHookArgumentsLength (fn) {
    if (isUndef(fn)) {
      return false
    }
    var invokerFns = fn.fns;
    if (isDef(invokerFns)) {
      // invoker
      return getHookArgumentsLength(
        Array.isArray(invokerFns)
          ? invokerFns[0]
          : invokerFns
      )
    } else {
      return (fn._length || fn.length) > 1
    }
  }

  function _enter (_, vnode) {
    if (vnode.data.show !== true) {
      enter(vnode);
    }
  }

  var transition = inBrowser ? {
    create: _enter,
    activate: _enter,
    remove: function remove$$1 (vnode, rm) {
      /* istanbul ignore else */
      if (vnode.data.show !== true) {
        leave(vnode, rm);
      } else {
        rm();
      }
    }
  } : {};

  var platformModules = [
    attrs,
    klass,
    events,
    domProps,
    style,
    transition
  ];

  /*  */

  // the directive module should be applied last, after all
  // built-in modules have been applied.
  var modules = platformModules.concat(baseModules);

  var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

  /**
   * Not type checking this file because flow doesn't like attaching
   * properties to Elements.
   */

  /* istanbul ignore if */
  if (isIE9) {
    // http://www.matts411.com/post/internet-explorer-9-oninput/
    document.addEventListener('selectionchange', function () {
      var el = document.activeElement;
      if (el && el.vmodel) {
        trigger(el, 'input');
      }
    });
  }

  var directive = {
    inserted: function inserted (el, binding, vnode, oldVnode) {
      if (vnode.tag === 'select') {
        // #6903
        if (oldVnode.elm && !oldVnode.elm._vOptions) {
          mergeVNodeHook(vnode, 'postpatch', function () {
            directive.componentUpdated(el, binding, vnode);
          });
        } else {
          setSelected(el, binding, vnode.context);
        }
        el._vOptions = [].map.call(el.options, getValue);
      } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
        el._vModifiers = binding.modifiers;
        if (!binding.modifiers.lazy) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
          // Safari < 10.2 & UIWebView doesn't fire compositionend when
          // switching focus before confirming composition choice
          // this also fixes the issue where some browsers e.g. iOS Chrome
          // fires "change" instead of "input" on autocomplete.
          el.addEventListener('change', onCompositionEnd);
          /* istanbul ignore if */
          if (isIE9) {
            el.vmodel = true;
          }
        }
      }
    },

    componentUpdated: function componentUpdated (el, binding, vnode) {
      if (vnode.tag === 'select') {
        setSelected(el, binding, vnode.context);
        // in case the options rendered by v-for have changed,
        // it's possible that the value is out-of-sync with the rendered options.
        // detect such cases and filter out values that no longer has a matching
        // option in the DOM.
        var prevOptions = el._vOptions;
        var curOptions = el._vOptions = [].map.call(el.options, getValue);
        if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
          // trigger change event if
          // no matching option found for at least one value
          var needReset = el.multiple
            ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
            : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
          if (needReset) {
            trigger(el, 'change');
          }
        }
      }
    }
  };

  function setSelected (el, binding, vm) {
    actuallySetSelected(el, binding);
    /* istanbul ignore if */
    if (isIE || isEdge) {
      setTimeout(function () {
        actuallySetSelected(el, binding);
      }, 0);
    }
  }

  function actuallySetSelected (el, binding, vm) {
    var value = binding.value;
    var isMultiple = el.multiple;
    if (isMultiple && !Array.isArray(value)) {
      return
    }
    var selected, option;
    for (var i = 0, l = el.options.length; i < l; i++) {
      option = el.options[i];
      if (isMultiple) {
        selected = looseIndexOf(value, getValue(option)) > -1;
        if (option.selected !== selected) {
          option.selected = selected;
        }
      } else {
        if (looseEqual(getValue(option), value)) {
          if (el.selectedIndex !== i) {
            el.selectedIndex = i;
          }
          return
        }
      }
    }
    if (!isMultiple) {
      el.selectedIndex = -1;
    }
  }

  function hasNoMatchingOption (value, options) {
    return options.every(function (o) { return !looseEqual(o, value); })
  }

  function getValue (option) {
    return '_value' in option
      ? option._value
      : option.value
  }

  function onCompositionStart (e) {
    e.target.composing = true;
  }

  function onCompositionEnd (e) {
    // prevent triggering an input event for no reason
    if (!e.target.composing) { return }
    e.target.composing = false;
    trigger(e.target, 'input');
  }

  function trigger (el, type) {
    var e = document.createEvent('HTMLEvents');
    e.initEvent(type, true, true);
    el.dispatchEvent(e);
  }

  /*  */

  // recursively search for possible transition defined inside the component root
  function locateNode (vnode) {
    return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
      ? locateNode(vnode.componentInstance._vnode)
      : vnode
  }

  var show = {
    bind: function bind (el, ref, vnode) {
      var value = ref.value;

      vnode = locateNode(vnode);
      var transition$$1 = vnode.data && vnode.data.transition;
      var originalDisplay = el.__vOriginalDisplay =
        el.style.display === 'none' ? '' : el.style.display;
      if (value && transition$$1) {
        vnode.data.show = true;
        enter(vnode, function () {
          el.style.display = originalDisplay;
        });
      } else {
        el.style.display = value ? originalDisplay : 'none';
      }
    },

    update: function update (el, ref, vnode) {
      var value = ref.value;
      var oldValue = ref.oldValue;

      /* istanbul ignore if */
      if (!value === !oldValue) { return }
      vnode = locateNode(vnode);
      var transition$$1 = vnode.data && vnode.data.transition;
      if (transition$$1) {
        vnode.data.show = true;
        if (value) {
          enter(vnode, function () {
            el.style.display = el.__vOriginalDisplay;
          });
        } else {
          leave(vnode, function () {
            el.style.display = 'none';
          });
        }
      } else {
        el.style.display = value ? el.__vOriginalDisplay : 'none';
      }
    },

    unbind: function unbind (
      el,
      binding,
      vnode,
      oldVnode,
      isDestroy
    ) {
      if (!isDestroy) {
        el.style.display = el.__vOriginalDisplay;
      }
    }
  };

  var platformDirectives = {
    model: directive,
    show: show
  };

  /*  */

  var transitionProps = {
    name: String,
    appear: Boolean,
    css: Boolean,
    mode: String,
    type: String,
    enterClass: String,
    leaveClass: String,
    enterToClass: String,
    leaveToClass: String,
    enterActiveClass: String,
    leaveActiveClass: String,
    appearClass: String,
    appearActiveClass: String,
    appearToClass: String,
    duration: [Number, String, Object]
  };

  // in case the child is also an abstract component, e.g. <keep-alive>
  // we want to recursively retrieve the real component to be rendered
  function getRealChild (vnode) {
    var compOptions = vnode && vnode.componentOptions;
    if (compOptions && compOptions.Ctor.options.abstract) {
      return getRealChild(getFirstComponentChild(compOptions.children))
    } else {
      return vnode
    }
  }

  function extractTransitionData (comp) {
    var data = {};
    var options = comp.$options;
    // props
    for (var key in options.propsData) {
      data[key] = comp[key];
    }
    // events.
    // extract listeners and pass them directly to the transition methods
    var listeners = options._parentListeners;
    for (var key$1 in listeners) {
      data[camelize(key$1)] = listeners[key$1];
    }
    return data
  }

  function placeholder (h, rawChild) {
    if (/\d-keep-alive$/.test(rawChild.tag)) {
      return h('keep-alive', {
        props: rawChild.componentOptions.propsData
      })
    }
  }

  function hasParentTransition (vnode) {
    while ((vnode = vnode.parent)) {
      if (vnode.data.transition) {
        return true
      }
    }
  }

  function isSameChild (child, oldChild) {
    return oldChild.key === child.key && oldChild.tag === child.tag
  }

  var isNotTextNode = function (c) { return c.tag || isAsyncPlaceholder(c); };

  var isVShowDirective = function (d) { return d.name === 'show'; };

  var Transition = {
    name: 'transition',
    props: transitionProps,
    abstract: true,

    render: function render (h) {
      var this$1 = this;

      var children = this.$slots.default;
      if (!children) {
        return
      }

      // filter out text nodes (possible whitespaces)
      children = children.filter(isNotTextNode);
      /* istanbul ignore if */
      if (!children.length) {
        return
      }

      var mode = this.mode;

      var rawChild = children[0];

      // if this is a component root node and the component's
      // parent container node also has transition, skip.
      if (hasParentTransition(this.$vnode)) {
        return rawChild
      }

      // apply transition data to child
      // use getRealChild() to ignore abstract components e.g. keep-alive
      var child = getRealChild(rawChild);
      /* istanbul ignore if */
      if (!child) {
        return rawChild
      }

      if (this._leaving) {
        return placeholder(h, rawChild)
      }

      // ensure a key that is unique to the vnode type and to this transition
      // component instance. This key will be used to remove pending leaving nodes
      // during entering.
      var id = "__transition-" + (this._uid) + "-";
      child.key = child.key == null
        ? child.isComment
          ? id + 'comment'
          : id + child.tag
        : isPrimitive(child.key)
          ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
          : child.key;

      var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
      var oldRawChild = this._vnode;
      var oldChild = getRealChild(oldRawChild);

      // mark v-show
      // so that the transition module can hand over the control to the directive
      if (child.data.directives && child.data.directives.some(isVShowDirective)) {
        child.data.show = true;
      }

      if (
        oldChild &&
        oldChild.data &&
        !isSameChild(child, oldChild) &&
        !isAsyncPlaceholder(oldChild) &&
        // #6687 component root is a comment node
        !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
      ) {
        // replace old child transition data with fresh one
        // important for dynamic transitions!
        var oldData = oldChild.data.transition = extend({}, data);
        // handle transition mode
        if (mode === 'out-in') {
          // return placeholder node and queue update when leave finishes
          this._leaving = true;
          mergeVNodeHook(oldData, 'afterLeave', function () {
            this$1._leaving = false;
            this$1.$forceUpdate();
          });
          return placeholder(h, rawChild)
        } else if (mode === 'in-out') {
          if (isAsyncPlaceholder(child)) {
            return oldRawChild
          }
          var delayedLeave;
          var performLeave = function () { delayedLeave(); };
          mergeVNodeHook(data, 'afterEnter', performLeave);
          mergeVNodeHook(data, 'enterCancelled', performLeave);
          mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
        }
      }

      return rawChild
    }
  };

  /*  */

  var props = extend({
    tag: String,
    moveClass: String
  }, transitionProps);

  delete props.mode;

  var TransitionGroup = {
    props: props,

    beforeMount: function beforeMount () {
      var this$1 = this;

      var update = this._update;
      this._update = function (vnode, hydrating) {
        var restoreActiveInstance = setActiveInstance(this$1);
        // force removing pass
        this$1.__patch__(
          this$1._vnode,
          this$1.kept,
          false, // hydrating
          true // removeOnly (!important, avoids unnecessary moves)
        );
        this$1._vnode = this$1.kept;
        restoreActiveInstance();
        update.call(this$1, vnode, hydrating);
      };
    },

    render: function render (h) {
      var tag = this.tag || this.$vnode.data.tag || 'span';
      var map = Object.create(null);
      var prevChildren = this.prevChildren = this.children;
      var rawChildren = this.$slots.default || [];
      var children = this.children = [];
      var transitionData = extractTransitionData(this);

      for (var i = 0; i < rawChildren.length; i++) {
        var c = rawChildren[i];
        if (c.tag) {
          if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
            children.push(c);
            map[c.key] = c
            ;(c.data || (c.data = {})).transition = transitionData;
          }
        }
      }

      if (prevChildren) {
        var kept = [];
        var removed = [];
        for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
          var c$1 = prevChildren[i$1];
          c$1.data.transition = transitionData;
          c$1.data.pos = c$1.elm.getBoundingClientRect();
          if (map[c$1.key]) {
            kept.push(c$1);
          } else {
            removed.push(c$1);
          }
        }
        this.kept = h(tag, null, kept);
        this.removed = removed;
      }

      return h(tag, null, children)
    },

    updated: function updated () {
      var children = this.prevChildren;
      var moveClass = this.moveClass || ((this.name || 'v') + '-move');
      if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
        return
      }

      // we divide the work into three loops to avoid mixing DOM reads and writes
      // in each iteration - which helps prevent layout thrashing.
      children.forEach(callPendingCbs);
      children.forEach(recordPosition);
      children.forEach(applyTranslation);

      // force reflow to put everything in position
      // assign to this to avoid being removed in tree-shaking
      // $flow-disable-line
      this._reflow = document.body.offsetHeight;

      children.forEach(function (c) {
        if (c.data.moved) {
          var el = c.elm;
          var s = el.style;
          addTransitionClass(el, moveClass);
          s.transform = s.WebkitTransform = s.transitionDuration = '';
          el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
            if (e && e.target !== el) {
              return
            }
            if (!e || /transform$/.test(e.propertyName)) {
              el.removeEventListener(transitionEndEvent, cb);
              el._moveCb = null;
              removeTransitionClass(el, moveClass);
            }
          });
        }
      });
    },

    methods: {
      hasMove: function hasMove (el, moveClass) {
        /* istanbul ignore if */
        if (!hasTransition) {
          return false
        }
        /* istanbul ignore if */
        if (this._hasMove) {
          return this._hasMove
        }
        // Detect whether an element with the move class applied has
        // CSS transitions. Since the element may be inside an entering
        // transition at this very moment, we make a clone of it and remove
        // all other transition classes applied to ensure only the move class
        // is applied.
        var clone = el.cloneNode();
        if (el._transitionClasses) {
          el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
        }
        addClass(clone, moveClass);
        clone.style.display = 'none';
        this.$el.appendChild(clone);
        var info = getTransitionInfo(clone);
        this.$el.removeChild(clone);
        return (this._hasMove = info.hasTransform)
      }
    }
  };

  function callPendingCbs (c) {
    /* istanbul ignore if */
    if (c.elm._moveCb) {
      c.elm._moveCb();
    }
    /* istanbul ignore if */
    if (c.elm._enterCb) {
      c.elm._enterCb();
    }
  }

  function recordPosition (c) {
    c.data.newPos = c.elm.getBoundingClientRect();
  }

  function applyTranslation (c) {
    var oldPos = c.data.pos;
    var newPos = c.data.newPos;
    var dx = oldPos.left - newPos.left;
    var dy = oldPos.top - newPos.top;
    if (dx || dy) {
      c.data.moved = true;
      var s = c.elm.style;
      s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
      s.transitionDuration = '0s';
    }
  }

  var platformComponents = {
    Transition: Transition,
    TransitionGroup: TransitionGroup
  };

  /*  */

  // install platform specific utils
  Vue.config.mustUseProp = mustUseProp;
  Vue.config.isReservedTag = isReservedTag;
  Vue.config.isReservedAttr = isReservedAttr;
  Vue.config.getTagNamespace = getTagNamespace;
  Vue.config.isUnknownElement = isUnknownElement;

  // install platform runtime directives & components
  extend(Vue.options.directives, platformDirectives);
  extend(Vue.options.components, platformComponents);

  // install platform patch function
  Vue.prototype.__patch__ = inBrowser ? patch : noop;

  // public mount method
  Vue.prototype.$mount = function (
    el,
    hydrating
  ) {
    el = el && inBrowser ? query(el) : undefined;
    return mountComponent(this, el, hydrating)
  };

  // devtools global hook
  /* istanbul ignore next */
  if (inBrowser) {
    setTimeout(function () {
      if (config.devtools) {
        if (devtools) {
          devtools.emit('init', Vue);
        }
      }
    }, 0);
  }

  /* MathLive 0.54.1  */
  function e(e){return Array.isArray(e)}var t={"AMS-Regular":{65:[0,.68889,0,0],66:[0,.68889,0,0],67:[0,.68889,0,0],68:[0,.68889,0,0],69:[0,.68889,0,0],70:[0,.68889,0,0],71:[0,.68889,0,0],72:[0,.68889,0,0],73:[0,.68889,0,0],74:[.16667,.68889,0,0],75:[0,.68889,0,0],76:[0,.68889,0,0],77:[0,.68889,0,0],78:[0,.68889,0,0],79:[.16667,.68889,0,0],80:[0,.68889,0,0],81:[.16667,.68889,0,0],82:[0,.68889,0,0],83:[0,.68889,0,0],84:[0,.68889,0,0],85:[0,.68889,0,0],86:[0,.68889,0,0],87:[0,.68889,0,0],88:[0,.68889,0,0],89:[0,.68889,0,0],90:[0,.68889,0,0],107:[0,.68889,0,0],165:[0,.675,.025,0],174:[.15559,.69224,0,0],240:[0,.68889,0,0],295:[0,.68889,0,0],710:[0,.825,0,0],732:[0,.9,0,0],770:[0,.825,0,0],771:[0,.9,0,0],989:[.08167,.58167,0,0],1008:[0,.43056,.04028,0],8245:[0,.54986,0,0],8463:[0,.68889,0,0],8487:[0,.68889,0,0],8498:[0,.68889,0,0],8502:[0,.68889,0,0],8503:[0,.68889,0,0],8504:[0,.68889,0,0],8513:[0,.68889,0,0],8592:[-.03598,.46402,0,0],8594:[-.03598,.46402,0,0],8602:[-.13313,.36687,0,0],8603:[-.13313,.36687,0,0],8606:[.01354,.52239,0,0],8608:[.01354,.52239,0,0],8610:[.01354,.52239,0,0],8611:[.01354,.52239,0,0],8619:[0,.54986,0,0],8620:[0,.54986,0,0],8621:[-.13313,.37788,0,0],8622:[-.13313,.36687,0,0],8624:[0,.69224,0,0],8625:[0,.69224,0,0],8630:[0,.43056,0,0],8631:[0,.43056,0,0],8634:[.08198,.58198,0,0],8635:[.08198,.58198,0,0],8638:[.19444,.69224,0,0],8639:[.19444,.69224,0,0],8642:[.19444,.69224,0,0],8643:[.19444,.69224,0,0],8644:[.1808,.675,0,0],8646:[.1808,.675,0,0],8647:[.1808,.675,0,0],8648:[.19444,.69224,0,0],8649:[.1808,.675,0,0],8650:[.19444,.69224,0,0],8651:[.01354,.52239,0,0],8652:[.01354,.52239,0,0],8653:[-.13313,.36687,0,0],8654:[-.13313,.36687,0,0],8655:[-.13313,.36687,0,0],8666:[.13667,.63667,0,0],8667:[.13667,.63667,0,0],8669:[-.13313,.37788,0,0],8672:[-.064,.437,0,0],8674:[-.064,.437,0,0],8705:[0,.825,0,0],8708:[0,.68889,0,0],8709:[.08167,.58167,0,0],8717:[0,.43056,0,0],8722:[-.03598,.46402,0,0],8724:[.08198,.69224,0,0],8726:[.08167,.58167,0,0],8733:[0,.69224,0,0],8736:[0,.69224,0,0],8737:[0,.69224,0,0],8738:[.03517,.52239,0,0],8739:[.08167,.58167,0,0],8740:[.25142,.74111,0,0],8741:[.08167,.58167,0,0],8742:[.25142,.74111,0,0],8756:[0,.69224,0,0],8757:[0,.69224,0,0],8764:[-.13313,.36687,0,0],8765:[-.13313,.37788,0,0],8769:[-.13313,.36687,0,0],8770:[-.03625,.46375,0,0],8774:[.30274,.79383,0,0],8776:[-.01688,.48312,0,0],8778:[.08167,.58167,0,0],8782:[.06062,.54986,0,0],8783:[.06062,.54986,0,0],8785:[.08198,.58198,0,0],8786:[.08198,.58198,0,0],8787:[.08198,.58198,0,0],8790:[0,.69224,0,0],8791:[.22958,.72958,0,0],8796:[.08198,.91667,0,0],8806:[.25583,.75583,0,0],8807:[.25583,.75583,0,0],8808:[.25142,.75726,0,0],8809:[.25142,.75726,0,0],8812:[.25583,.75583,0,0],8814:[.20576,.70576,0,0],8815:[.20576,.70576,0,0],8816:[.30274,.79383,0,0],8817:[.30274,.79383,0,0],8818:[.22958,.72958,0,0],8819:[.22958,.72958,0,0],8822:[.1808,.675,0,0],8823:[.1808,.675,0,0],8828:[.13667,.63667,0,0],8829:[.13667,.63667,0,0],8830:[.22958,.72958,0,0],8831:[.22958,.72958,0,0],8832:[.20576,.70576,0,0],8833:[.20576,.70576,0,0],8840:[.30274,.79383,0,0],8841:[.30274,.79383,0,0],8842:[.13597,.63597,0,0],8843:[.13597,.63597,0,0],8847:[.03517,.54986,0,0],8848:[.03517,.54986,0,0],8858:[.08198,.58198,0,0],8859:[.08198,.58198,0,0],8861:[.08198,.58198,0,0],8862:[0,.675,0,0],8863:[0,.675,0,0],8864:[0,.675,0,0],8865:[0,.675,0,0],8872:[0,.69224,0,0],8873:[0,.69224,0,0],8874:[0,.69224,0,0],8876:[0,.68889,0,0],8877:[0,.68889,0,0],8878:[0,.68889,0,0],8879:[0,.68889,0,0],8882:[.03517,.54986,0,0],8883:[.03517,.54986,0,0],8884:[.13667,.63667,0,0],8885:[.13667,.63667,0,0],8888:[0,.54986,0,0],8890:[.19444,.43056,0,0],8891:[.19444,.69224,0,0],8892:[.19444,.69224,0,0],8901:[0,.54986,0,0],8903:[.08167,.58167,0,0],8905:[.08167,.58167,0,0],8906:[.08167,.58167,0,0],8907:[0,.69224,0,0],8908:[0,.69224,0,0],8909:[-.03598,.46402,0,0],8910:[0,.54986,0,0],8911:[0,.54986,0,0],8912:[.03517,.54986,0,0],8913:[.03517,.54986,0,0],8914:[0,.54986,0,0],8915:[0,.54986,0,0],8916:[0,.69224,0,0],8918:[.0391,.5391,0,0],8919:[.0391,.5391,0,0],8920:[.03517,.54986,0,0],8921:[.03517,.54986,0,0],8922:[.38569,.88569,0,0],8923:[.38569,.88569,0,0],8926:[.13667,.63667,0,0],8927:[.13667,.63667,0,0],8928:[.30274,.79383,0,0],8929:[.30274,.79383,0,0],8934:[.23222,.74111,0,0],8935:[.23222,.74111,0,0],8936:[.23222,.74111,0,0],8937:[.23222,.74111,0,0],8938:[.20576,.70576,0,0],8939:[.20576,.70576,0,0],8940:[.30274,.79383,0,0],8941:[.30274,.79383,0,0],8994:[.19444,.69224,0,0],8995:[.19444,.69224,0,0],9416:[.15559,.69224,0,0],9484:[0,.69224,0,0],9488:[0,.69224,0,0],9492:[0,.37788,0,0],9496:[0,.37788,0,0],9585:[.19444,.68889,0,0],9586:[.19444,.74111,0,0],9632:[0,.675,0,0],9633:[0,.675,0,0],9650:[0,.54986,0,0],9651:[0,.54986,0,0],9654:[.03517,.54986,0,0],9660:[0,.54986,0,0],9661:[0,.54986,0,0],9664:[.03517,.54986,0,0],9674:[.11111,.69224,0,0],9733:[.19444,.69224,0,0],10003:[0,.69224,0,0],10016:[0,.69224,0,0],10731:[.11111,.69224,0,0],10846:[.19444,.75583,0,0],10877:[.13667,.63667,0,0],10878:[.13667,.63667,0,0],10885:[.25583,.75583,0,0],10886:[.25583,.75583,0,0],10887:[.13597,.63597,0,0],10888:[.13597,.63597,0,0],10889:[.26167,.75726,0,0],10890:[.26167,.75726,0,0],10891:[.48256,.98256,0,0],10892:[.48256,.98256,0,0],10901:[.13667,.63667,0,0],10902:[.13667,.63667,0,0],10933:[.25142,.75726,0,0],10934:[.25142,.75726,0,0],10935:[.26167,.75726,0,0],10936:[.26167,.75726,0,0],10937:[.26167,.75726,0,0],10938:[.26167,.75726,0,0],10949:[.25583,.75583,0,0],10950:[.25583,.75583,0,0],10955:[.28481,.79383,0,0],10956:[.28481,.79383,0,0],57350:[.08167,.58167,0,0],57351:[.08167,.58167,0,0],57352:[.08167,.58167,0,0],57353:[0,.43056,.04028,0],57356:[.25142,.75726,0,0],57357:[.25142,.75726,0,0],57358:[.41951,.91951,0,0],57359:[.30274,.79383,0,0],57360:[.30274,.79383,0,0],57361:[.41951,.91951,0,0],57366:[.25142,.75726,0,0],57367:[.25142,.75726,0,0],57368:[.25142,.75726,0,0],57369:[.25142,.75726,0,0],57370:[.13597,.63597,0,0],57371:[.13597,.63597,0,0]},"Caligraphic-Regular":{48:[0,.43056,0,0],49:[0,.43056,0,0],50:[0,.43056,0,0],51:[.19444,.43056,0,0],52:[.19444,.43056,0,0],53:[.19444,.43056,0,0],54:[0,.64444,0,0],55:[.19444,.43056,0,0],56:[0,.64444,0,0],57:[.19444,.43056,0,0],65:[0,.68333,0,.19445],66:[0,.68333,.03041,.13889],67:[0,.68333,.05834,.13889],68:[0,.68333,.02778,.08334],69:[0,.68333,.08944,.11111],70:[0,.68333,.09931,.11111],71:[.09722,.68333,.0593,.11111],72:[0,.68333,.00965,.11111],73:[0,.68333,.07382,0],74:[.09722,.68333,.18472,.16667],75:[0,.68333,.01445,.05556],76:[0,.68333,0,.13889],77:[0,.68333,0,.13889],78:[0,.68333,.14736,.08334],79:[0,.68333,.02778,.11111],80:[0,.68333,.08222,.08334],81:[.09722,.68333,0,.11111],82:[0,.68333,0,.08334],83:[0,.68333,.075,.13889],84:[0,.68333,.25417,0],85:[0,.68333,.09931,.08334],86:[0,.68333,.08222,0],87:[0,.68333,.08222,.08334],88:[0,.68333,.14643,.13889],89:[.09722,.68333,.08222,.08334],90:[0,.68333,.07944,.13889]},"Fraktur-Regular":{33:[0,.69141,0,0],34:[0,.69141,0,0],38:[0,.69141,0,0],39:[0,.69141,0,0],40:[.24982,.74947,0,0],41:[.24982,.74947,0,0],42:[0,.62119,0,0],43:[.08319,.58283,0,0],44:[0,.10803,0,0],45:[.08319,.58283,0,0],46:[0,.10803,0,0],47:[.24982,.74947,0,0],48:[0,.47534,0,0],49:[0,.47534,0,0],50:[0,.47534,0,0],51:[.18906,.47534,0,0],52:[.18906,.47534,0,0],53:[.18906,.47534,0,0],54:[0,.69141,0,0],55:[.18906,.47534,0,0],56:[0,.69141,0,0],57:[.18906,.47534,0,0],58:[0,.47534,0,0],59:[.12604,.47534,0,0],61:[-.13099,.36866,0,0],63:[0,.69141,0,0],65:[0,.69141,0,0],66:[0,.69141,0,0],67:[0,.69141,0,0],68:[0,.69141,0,0],69:[0,.69141,0,0],70:[.12604,.69141,0,0],71:[0,.69141,0,0],72:[.06302,.69141,0,0],73:[0,.69141,0,0],74:[.12604,.69141,0,0],75:[0,.69141,0,0],76:[0,.69141,0,0],77:[0,.69141,0,0],78:[0,.69141,0,0],79:[0,.69141,0,0],80:[.18906,.69141,0,0],81:[.03781,.69141,0,0],82:[0,.69141,0,0],83:[0,.69141,0,0],84:[0,.69141,0,0],85:[0,.69141,0,0],86:[0,.69141,0,0],87:[0,.69141,0,0],88:[0,.69141,0,0],89:[.18906,.69141,0,0],90:[.12604,.69141,0,0],91:[.24982,.74947,0,0],93:[.24982,.74947,0,0],94:[0,.69141,0,0],97:[0,.47534,0,0],98:[0,.69141,0,0],99:[0,.47534,0,0],100:[0,.62119,0,0],101:[0,.47534,0,0],102:[.18906,.69141,0,0],103:[.18906,.47534,0,0],104:[.18906,.69141,0,0],105:[0,.69141,0,0],106:[0,.69141,0,0],107:[0,.69141,0,0],108:[0,.69141,0,0],109:[0,.47534,0,0],110:[0,.47534,0,0],111:[0,.47534,0,0],112:[.18906,.52396,0,0],113:[.18906,.47534,0,0],114:[0,.47534,0,0],115:[0,.47534,0,0],116:[0,.62119,0,0],117:[0,.47534,0,0],118:[0,.52396,0,0],119:[0,.52396,0,0],120:[.18906,.47534,0,0],121:[.18906,.47534,0,0],122:[.18906,.47534,0,0],8216:[0,.69141,0,0],8217:[0,.69141,0,0],58112:[0,.62119,0,0],58113:[0,.62119,0,0],58114:[.18906,.69141,0,0],58115:[.18906,.69141,0,0],58116:[.18906,.47534,0,0],58117:[0,.69141,0,0],58118:[0,.62119,0,0],58119:[0,.47534,0,0]},"Main-Bold":{33:[0,.69444,0,0],34:[0,.69444,0,0],35:[.19444,.69444,0,0],36:[.05556,.75,0,0],37:[.05556,.75,0,0],38:[0,.69444,0,0],39:[0,.69444,0,0],40:[.25,.75,0,0],41:[.25,.75,0,0],42:[0,.75,0,0],43:[.13333,.63333,0,0],44:[.19444,.15556,0,0],45:[0,.44444,0,0],46:[0,.15556,0,0],47:[.25,.75,0,0],48:[0,.64444,0,0],49:[0,.64444,0,0],50:[0,.64444,0,0],51:[0,.64444,0,0],52:[0,.64444,0,0],53:[0,.64444,0,0],54:[0,.64444,0,0],55:[0,.64444,0,0],56:[0,.64444,0,0],57:[0,.64444,0,0],58:[0,.44444,0,0],59:[.19444,.44444,0,0],60:[.08556,.58556,0,0],61:[-.10889,.39111,0,0],62:[.08556,.58556,0,0],63:[0,.69444,0,0],64:[0,.69444,0,0],65:[0,.68611,0,0],66:[0,.68611,0,0],67:[0,.68611,0,0],68:[0,.68611,0,0],69:[0,.68611,0,0],70:[0,.68611,0,0],71:[0,.68611,0,0],72:[0,.68611,0,0],73:[0,.68611,0,0],74:[0,.68611,0,0],75:[0,.68611,0,0],76:[0,.68611,0,0],77:[0,.68611,0,0],78:[0,.68611,0,0],79:[0,.68611,0,0],80:[0,.68611,0,0],81:[.19444,.68611,0,0],82:[0,.68611,0,0],83:[0,.68611,0,0],84:[0,.68611,0,0],85:[0,.68611,0,0],86:[0,.68611,.01597,0],87:[0,.68611,.01597,0],88:[0,.68611,0,0],89:[0,.68611,.02875,0],90:[0,.68611,0,0],91:[.25,.75,0,0],92:[.25,.75,0,0],93:[.25,.75,0,0],94:[0,.69444,0,0],95:[.31,.13444,.03194,0],97:[0,.44444,0,0],98:[0,.69444,0,0],99:[0,.44444,0,0],100:[0,.69444,0,0],101:[0,.44444,0,0],102:[0,.69444,.10903,0],103:[.19444,.44444,.01597,0],104:[0,.69444,0,0],105:[0,.69444,0,0],106:[.19444,.69444,0,0],107:[0,.69444,0,0],108:[0,.69444,0,0],109:[0,.44444,0,0],110:[0,.44444,0,0],111:[0,.44444,0,0],112:[.19444,.44444,0,0],113:[.19444,.44444,0,0],114:[0,.44444,0,0],115:[0,.44444,0,0],116:[0,.63492,0,0],117:[0,.44444,0,0],118:[0,.44444,.01597,0],119:[0,.44444,.01597,0],120:[0,.44444,0,0],121:[.19444,.44444,.01597,0],122:[0,.44444,0,0],123:[.25,.75,0,0],124:[.25,.75,0,0],125:[.25,.75,0,0],126:[.35,.34444,0,0],168:[0,.69444,0,0],172:[0,.44444,0,0],176:[0,.69444,0,0],177:[.13333,.63333,0,0],184:[.17014,0,0,0],198:[0,.68611,0,0],215:[.13333,.63333,0,0],216:[.04861,.73472,0,0],223:[0,.69444,0,0],230:[0,.44444,0,0],247:[.13333,.63333,0,0],248:[.09722,.54167,0,0],305:[0,.44444,0,0],338:[0,.68611,0,0],339:[0,.44444,0,0],567:[.19444,.44444,0,0],710:[0,.69444,0,0],711:[0,.63194,0,0],713:[0,.59611,0,0],714:[0,.69444,0,0],715:[0,.69444,0,0],728:[0,.69444,0,0],729:[0,.69444,0,0],730:[0,.69444,0,0],732:[0,.69444,0,0],733:[0,.69444,0,0],915:[0,.68611,0,0],916:[0,.68611,0,0],920:[0,.68611,0,0],923:[0,.68611,0,0],926:[0,.68611,0,0],928:[0,.68611,0,0],931:[0,.68611,0,0],933:[0,.68611,0,0],934:[0,.68611,0,0],936:[0,.68611,0,0],937:[0,.68611,0,0],8211:[0,.44444,.03194,0],8212:[0,.44444,.03194,0],8216:[0,.69444,0,0],8217:[0,.69444,0,0],8220:[0,.69444,0,0],8221:[0,.69444,0,0],8224:[.19444,.69444,0,0],8225:[.19444,.69444,0,0],8242:[0,.55556,0,0],8407:[0,.72444,.15486,0],8463:[0,.69444,0,0],8465:[0,.69444,0,0],8467:[0,.69444,0,0],8472:[.19444,.44444,0,0],8476:[0,.69444,0,0],8501:[0,.69444,0,0],8592:[-.10889,.39111,0,0],8593:[.19444,.69444,0,0],8594:[-.10889,.39111,0,0],8595:[.19444,.69444,0,0],8596:[-.10889,.39111,0,0],8597:[.25,.75,0,0],8598:[.19444,.69444,0,0],8599:[.19444,.69444,0,0],8600:[.19444,.69444,0,0],8601:[.19444,.69444,0,0],8636:[-.10889,.39111,0,0],8637:[-.10889,.39111,0,0],8640:[-.10889,.39111,0,0],8641:[-.10889,.39111,0,0],8656:[-.10889,.39111,0,0],8657:[.19444,.69444,0,0],8658:[-.10889,.39111,0,0],8659:[.19444,.69444,0,0],8660:[-.10889,.39111,0,0],8661:[.25,.75,0,0],8704:[0,.69444,0,0],8706:[0,.69444,.06389,0],8707:[0,.69444,0,0],8709:[.05556,.75,0,0],8711:[0,.68611,0,0],8712:[.08556,.58556,0,0],8715:[.08556,.58556,0,0],8722:[.13333,.63333,0,0],8723:[.13333,.63333,0,0],8725:[.25,.75,0,0],8726:[.25,.75,0,0],8727:[-.02778,.47222,0,0],8728:[-.02639,.47361,0,0],8729:[-.02639,.47361,0,0],8730:[.18,.82,0,0],8733:[0,.44444,0,0],8734:[0,.44444,0,0],8736:[0,.69224,0,0],8739:[.25,.75,0,0],8741:[.25,.75,0,0],8743:[0,.55556,0,0],8744:[0,.55556,0,0],8745:[0,.55556,0,0],8746:[0,.55556,0,0],8747:[.19444,.69444,.12778,0],8764:[-.10889,.39111,0,0],8768:[.19444,.69444,0,0],8771:[.00222,.50222,0,0],8776:[.02444,.52444,0,0],8781:[.00222,.50222,0,0],8801:[.00222,.50222,0,0],8804:[.19667,.69667,0,0],8805:[.19667,.69667,0,0],8810:[.08556,.58556,0,0],8811:[.08556,.58556,0,0],8826:[.08556,.58556,0,0],8827:[.08556,.58556,0,0],8834:[.08556,.58556,0,0],8835:[.08556,.58556,0,0],8838:[.19667,.69667,0,0],8839:[.19667,.69667,0,0],8846:[0,.55556,0,0],8849:[.19667,.69667,0,0],8850:[.19667,.69667,0,0],8851:[0,.55556,0,0],8852:[0,.55556,0,0],8853:[.13333,.63333,0,0],8854:[.13333,.63333,0,0],8855:[.13333,.63333,0,0],8856:[.13333,.63333,0,0],8857:[.13333,.63333,0,0],8866:[0,.69444,0,0],8867:[0,.69444,0,0],8868:[0,.69444,0,0],8869:[0,.69444,0,0],8900:[-.02639,.47361,0,0],8901:[-.02639,.47361,0,0],8902:[-.02778,.47222,0,0],8968:[.25,.75,0,0],8969:[.25,.75,0,0],8970:[.25,.75,0,0],8971:[.25,.75,0,0],8994:[-.13889,.36111,0,0],8995:[-.13889,.36111,0,0],9651:[.19444,.69444,0,0],9657:[-.02778,.47222,0,0],9661:[.19444,.69444,0,0],9667:[-.02778,.47222,0,0],9711:[.19444,.69444,0,0],9824:[.12963,.69444,0,0],9825:[.12963,.69444,0,0],9826:[.12963,.69444,0,0],9827:[.12963,.69444,0,0],9837:[0,.75,0,0],9838:[.19444,.69444,0,0],9839:[.19444,.69444,0,0],10216:[.25,.75,0,0],10217:[.25,.75,0,0],10815:[0,.68611,0,0],10927:[.19667,.69667,0,0],10928:[.19667,.69667,0,0],57376:[.19444,.69444,0,0]},"Main-BoldItalic":{33:[0,.69444,.11417,0],34:[0,.69444,.07939,0],35:[.19444,.69444,.06833,0],37:[.05556,.75,.12861,0],38:[0,.69444,.08528,0],39:[0,.69444,.12945,0],40:[.25,.75,.15806,0],41:[.25,.75,.03306,0],42:[0,.75,.14333,0],43:[.10333,.60333,.03306,0],44:[.19444,.14722,0,0],45:[0,.44444,.02611,0],46:[0,.14722,0,0],47:[.25,.75,.15806,0],48:[0,.64444,.13167,0],49:[0,.64444,.13167,0],50:[0,.64444,.13167,0],51:[0,.64444,.13167,0],52:[.19444,.64444,.13167,0],53:[0,.64444,.13167,0],54:[0,.64444,.13167,0],55:[.19444,.64444,.13167,0],56:[0,.64444,.13167,0],57:[0,.64444,.13167,0],58:[0,.44444,.06695,0],59:[.19444,.44444,.06695,0],61:[-.10889,.39111,.06833,0],63:[0,.69444,.11472,0],64:[0,.69444,.09208,0],65:[0,.68611,0,0],66:[0,.68611,.0992,0],67:[0,.68611,.14208,0],68:[0,.68611,.09062,0],69:[0,.68611,.11431,0],70:[0,.68611,.12903,0],71:[0,.68611,.07347,0],72:[0,.68611,.17208,0],73:[0,.68611,.15681,0],74:[0,.68611,.145,0],75:[0,.68611,.14208,0],76:[0,.68611,0,0],77:[0,.68611,.17208,0],78:[0,.68611,.17208,0],79:[0,.68611,.09062,0],80:[0,.68611,.0992,0],81:[.19444,.68611,.09062,0],82:[0,.68611,.02559,0],83:[0,.68611,.11264,0],84:[0,.68611,.12903,0],85:[0,.68611,.17208,0],86:[0,.68611,.18625,0],87:[0,.68611,.18625,0],88:[0,.68611,.15681,0],89:[0,.68611,.19803,0],90:[0,.68611,.14208,0],91:[.25,.75,.1875,0],93:[.25,.75,.09972,0],94:[0,.69444,.06709,0],95:[.31,.13444,.09811,0],97:[0,.44444,.09426,0],98:[0,.69444,.07861,0],99:[0,.44444,.05222,0],100:[0,.69444,.10861,0],101:[0,.44444,.085,0],102:[.19444,.69444,.21778,0],103:[.19444,.44444,.105,0],104:[0,.69444,.09426,0],105:[0,.69326,.11387,0],106:[.19444,.69326,.1672,0],107:[0,.69444,.11111,0],108:[0,.69444,.10861,0],109:[0,.44444,.09426,0],110:[0,.44444,.09426,0],111:[0,.44444,.07861,0],112:[.19444,.44444,.07861,0],113:[.19444,.44444,.105,0],114:[0,.44444,.11111,0],115:[0,.44444,.08167,0],116:[0,.63492,.09639,0],117:[0,.44444,.09426,0],118:[0,.44444,.11111,0],119:[0,.44444,.11111,0],120:[0,.44444,.12583,0],121:[.19444,.44444,.105,0],122:[0,.44444,.13889,0],126:[.35,.34444,.11472,0],163:[0,.69444,0,0],168:[0,.69444,.11473,0],176:[0,.69444,0,0],184:[.17014,0,0,0],198:[0,.68611,.11431,0],216:[.04861,.73472,.09062,0],223:[.19444,.69444,.09736,0],230:[0,.44444,.085,0],248:[.09722,.54167,.09458,0],305:[0,.44444,.09426,0],338:[0,.68611,.11431,0],339:[0,.44444,.085,0],567:[.19444,.44444,.04611,0],710:[0,.69444,.06709,0],711:[0,.63194,.08271,0],713:[0,.59444,.10444,0],714:[0,.69444,.08528,0],715:[0,.69444,0,0],728:[0,.69444,.10333,0],729:[0,.69444,.12945,0],730:[0,.69444,0,0],732:[0,.69444,.11472,0],733:[0,.69444,.11472,0],915:[0,.68611,.12903,0],916:[0,.68611,0,0],920:[0,.68611,.09062,0],923:[0,.68611,0,0],926:[0,.68611,.15092,0],928:[0,.68611,.17208,0],931:[0,.68611,.11431,0],933:[0,.68611,.10778,0],934:[0,.68611,.05632,0],936:[0,.68611,.10778,0],937:[0,.68611,.0992,0],8211:[0,.44444,.09811,0],8212:[0,.44444,.09811,0],8216:[0,.69444,.12945,0],8217:[0,.69444,.12945,0],8220:[0,.69444,.16772,0],8221:[0,.69444,.07939,0]},"Main-Italic":{33:[0,.69444,.12417,0],34:[0,.69444,.06961,0],35:[.19444,.69444,.06616,0],37:[.05556,.75,.13639,0],38:[0,.69444,.09694,0],39:[0,.69444,.12417,0],40:[.25,.75,.16194,0],41:[.25,.75,.03694,0],42:[0,.75,.14917,0],43:[.05667,.56167,.03694,0],44:[.19444,.10556,0,0],45:[0,.43056,.02826,0],46:[0,.10556,0,0],47:[.25,.75,.16194,0],48:[0,.64444,.13556,0],49:[0,.64444,.13556,0],50:[0,.64444,.13556,0],51:[0,.64444,.13556,0],52:[.19444,.64444,.13556,0],53:[0,.64444,.13556,0],54:[0,.64444,.13556,0],55:[.19444,.64444,.13556,0],56:[0,.64444,.13556,0],57:[0,.64444,.13556,0],58:[0,.43056,.0582,0],59:[.19444,.43056,.0582,0],61:[-.13313,.36687,.06616,0],63:[0,.69444,.1225,0],64:[0,.69444,.09597,0],65:[0,.68333,0,0],66:[0,.68333,.10257,0],67:[0,.68333,.14528,0],68:[0,.68333,.09403,0],69:[0,.68333,.12028,0],70:[0,.68333,.13305,0],71:[0,.68333,.08722,0],72:[0,.68333,.16389,0],73:[0,.68333,.15806,0],74:[0,.68333,.14028,0],75:[0,.68333,.14528,0],76:[0,.68333,0,0],77:[0,.68333,.16389,0],78:[0,.68333,.16389,0],79:[0,.68333,.09403,0],80:[0,.68333,.10257,0],81:[.19444,.68333,.09403,0],82:[0,.68333,.03868,0],83:[0,.68333,.11972,0],84:[0,.68333,.13305,0],85:[0,.68333,.16389,0],86:[0,.68333,.18361,0],87:[0,.68333,.18361,0],88:[0,.68333,.15806,0],89:[0,.68333,.19383,0],90:[0,.68333,.14528,0],91:[.25,.75,.1875,0],93:[.25,.75,.10528,0],94:[0,.69444,.06646,0],95:[.31,.12056,.09208,0],97:[0,.43056,.07671,0],98:[0,.69444,.06312,0],99:[0,.43056,.05653,0],100:[0,.69444,.10333,0],101:[0,.43056,.07514,0],102:[.19444,.69444,.21194,0],103:[.19444,.43056,.08847,0],104:[0,.69444,.07671,0],105:[0,.65536,.1019,0],106:[.19444,.65536,.14467,0],107:[0,.69444,.10764,0],108:[0,.69444,.10333,0],109:[0,.43056,.07671,0],110:[0,.43056,.07671,0],111:[0,.43056,.06312,0],112:[.19444,.43056,.06312,0],113:[.19444,.43056,.08847,0],114:[0,.43056,.10764,0],115:[0,.43056,.08208,0],116:[0,.61508,.09486,0],117:[0,.43056,.07671,0],118:[0,.43056,.10764,0],119:[0,.43056,.10764,0],120:[0,.43056,.12042,0],121:[.19444,.43056,.08847,0],122:[0,.43056,.12292,0],126:[.35,.31786,.11585,0],163:[0,.69444,0,0],168:[0,.66786,.10474,0],176:[0,.69444,0,0],184:[.17014,0,0,0],198:[0,.68333,.12028,0],216:[.04861,.73194,.09403,0],223:[.19444,.69444,.10514,0],230:[0,.43056,.07514,0],248:[.09722,.52778,.09194,0],305:[0,.43056,0,.02778],338:[0,.68333,.12028,0],339:[0,.43056,.07514,0],567:[.19444,.43056,0,.08334],710:[0,.69444,.06646,0],711:[0,.62847,.08295,0],713:[0,.56167,.10333,0],714:[0,.69444,.09694,0],715:[0,.69444,0,0],728:[0,.69444,.10806,0],729:[0,.66786,.11752,0],730:[0,.69444,0,0],732:[0,.66786,.11585,0],733:[0,.69444,.1225,0],915:[0,.68333,.13305,0],916:[0,.68333,0,0],920:[0,.68333,.09403,0],923:[0,.68333,0,0],926:[0,.68333,.15294,0],928:[0,.68333,.16389,0],931:[0,.68333,.12028,0],933:[0,.68333,.11111,0],934:[0,.68333,.05986,0],936:[0,.68333,.11111,0],937:[0,.68333,.10257,0],8211:[0,.43056,.09208,0],8212:[0,.43056,.09208,0],8216:[0,.69444,.12417,0],8217:[0,.69444,.12417,0],8220:[0,.69444,.1685,0],8221:[0,.69444,.06961,0],8463:[0,.68889,0,0]},"Main-Regular":{32:[0,0,0,0],33:[0,.69444,0,0],34:[0,.69444,0,0],35:[.19444,.69444,0,0],36:[.05556,.75,0,0],37:[.05556,.75,0,0],38:[0,.69444,0,0],39:[0,.69444,0,0],40:[.25,.75,0,0],41:[.25,.75,0,0],42:[0,.75,0,0],43:[.08333,.58333,0,0],44:[.19444,.10556,0,0],45:[0,.43056,0,0],46:[0,.10556,0,0],47:[.25,.75,0,0],48:[0,.64444,0,0],49:[0,.64444,0,0],50:[0,.64444,0,0],51:[0,.64444,0,0],52:[0,.64444,0,0],53:[0,.64444,0,0],54:[0,.64444,0,0],55:[0,.64444,0,0],56:[0,.64444,0,0],57:[0,.64444,0,0],58:[0,.43056,0,0],59:[.19444,.43056,0,0],60:[.0391,.5391,0,0],61:[-.13313,.36687,0,0],62:[.0391,.5391,0,0],63:[0,.69444,0,0],64:[0,.69444,0,0],65:[0,.68333,0,0],66:[0,.68333,0,0],67:[0,.68333,0,0],68:[0,.68333,0,0],69:[0,.68333,0,0],70:[0,.68333,0,0],71:[0,.68333,0,0],72:[0,.68333,0,0],73:[0,.68333,0,0],74:[0,.68333,0,0],75:[0,.68333,0,0],76:[0,.68333,0,0],77:[0,.68333,0,0],78:[0,.68333,0,0],79:[0,.68333,0,0],80:[0,.68333,0,0],81:[.19444,.68333,0,0],82:[0,.68333,0,0],83:[0,.68333,0,0],84:[0,.68333,0,0],85:[0,.68333,0,0],86:[0,.68333,.01389,0],87:[0,.68333,.01389,0],88:[0,.68333,0,0],89:[0,.68333,.025,0],90:[0,.68333,0,0],91:[.25,.75,0,0],92:[.25,.75,0,0],93:[.25,.75,0,0],94:[0,.69444,0,0],95:[.31,.12056,.02778,0],97:[0,.43056,0,0],98:[0,.69444,0,0],99:[0,.43056,0,0],100:[0,.69444,0,0],101:[0,.43056,0,0],102:[0,.69444,.07778,0],103:[.19444,.43056,.01389,0],104:[0,.69444,0,0],105:[0,.66786,0,0],106:[.19444,.66786,0,0],107:[0,.69444,0,0],108:[0,.69444,0,0],109:[0,.43056,0,0],110:[0,.43056,0,0],111:[0,.43056,0,0],112:[.19444,.43056,0,0],113:[.19444,.43056,0,0],114:[0,.43056,0,0],115:[0,.43056,0,0],116:[0,.61508,0,0],117:[0,.43056,0,0],118:[0,.43056,.01389,0],119:[0,.43056,.01389,0],120:[0,.43056,0,0],121:[.19444,.43056,.01389,0],122:[0,.43056,0,0],123:[.25,.75,0,0],124:[.25,.75,0,0],125:[.25,.75,0,0],126:[.35,.31786,0,0],160:[0,0,0,0],167:[.19444,.69444,0,0],168:[0,.66786,0,0],172:[0,.43056,0,0],176:[0,.69444,0,0],177:[.08333,.58333,0,0],182:[.19444,.69444,0,0],184:[.17014,0,0,0],198:[0,.68333,0,0],215:[.08333,.58333,0,0],216:[.04861,.73194,0,0],223:[0,.69444,0,0],230:[0,.43056,0,0],247:[.08333,.58333,0,0],248:[.09722,.52778,0,0],305:[0,.43056,0,0],338:[0,.68333,0,0],339:[0,.43056,0,0],567:[.19444,.43056,0,0],710:[0,.69444,0,0],711:[0,.62847,0,0],713:[0,.56778,0,0],714:[0,.69444,0,0],715:[0,.69444,0,0],728:[0,.69444,0,0],729:[0,.66786,0,0],730:[0,.69444,0,0],732:[0,.66786,0,0],733:[0,.69444,0,0],915:[0,.68333,0,0],916:[0,.68333,0,0],920:[0,.68333,0,0],923:[0,.68333,0,0],926:[0,.68333,0,0],928:[0,.68333,0,0],931:[0,.68333,0,0],933:[0,.68333,0,0],934:[0,.68333,0,0],936:[0,.68333,0,0],937:[0,.68333,0,0],8211:[0,.43056,.02778,0],8212:[0,.43056,.02778,0],8216:[0,.69444,0,0],8217:[0,.69444,0,0],8220:[0,.69444,0,0],8221:[0,.69444,0,0],8224:[.19444,.69444,0,0],8225:[.19444,.69444,0,0],8230:[0,.12,0,0],8242:[0,.55556,0,0],8407:[0,.71444,.15382,0],8463:[0,.68889,0,0],8465:[0,.69444,0,0],8467:[0,.69444,0,.11111],8472:[.19444,.43056,0,.11111],8476:[0,.69444,0,0],8501:[0,.69444,0,0],8592:[-.13313,.36687,0,0],8593:[.19444,.69444,0,0],8594:[-.13313,.36687,0,0],8595:[.19444,.69444,0,0],8596:[-.13313,.36687,0,0],8597:[.25,.75,0,0],8598:[.19444,.69444,0,0],8599:[.19444,.69444,0,0],8600:[.19444,.69444,0,0],8601:[.19444,.69444,0,0],8614:[.011,.511,0,0],8617:[.011,.511,0,0],8618:[.011,.511,0,0],8636:[-.13313,.36687,0,0],8637:[-.13313,.36687,0,0],8640:[-.13313,.36687,0,0],8641:[-.13313,.36687,0,0],8652:[.011,.671,0,0],8656:[-.13313,.36687,0,0],8657:[.19444,.69444,0,0],8658:[-.13313,.36687,0,0],8659:[.19444,.69444,0,0],8660:[-.13313,.36687,0,0],8661:[.25,.75,0,0],8704:[0,.69444,0,0],8706:[0,.69444,.05556,.08334],8707:[0,.69444,0,0],8709:[.05556,.75,0,0],8711:[0,.68333,0,0],8712:[.0391,.5391,0,0],8715:[.0391,.5391,0,0],8722:[.08333,.58333,0,0],8723:[.08333,.58333,0,0],8725:[.25,.75,0,0],8726:[.25,.75,0,0],8727:[-.03472,.46528,0,0],8728:[-.05555,.44445,0,0],8729:[-.05555,.44445,0,0],8730:[.2,.8,0,0],8733:[0,.43056,0,0],8734:[0,.43056,0,0],8736:[0,.69224,0,0],8739:[.25,.75,0,0],8741:[.25,.75,0,0],8743:[0,.55556,0,0],8744:[0,.55556,0,0],8745:[0,.55556,0,0],8746:[0,.55556,0,0],8747:[.19444,.69444,.11111,0],8764:[-.13313,.36687,0,0],8768:[.19444,.69444,0,0],8771:[-.03625,.46375,0,0],8773:[-.022,.589,0,0],8776:[-.01688,.48312,0,0],8781:[-.03625,.46375,0,0],8784:[-.133,.67,0,0],8801:[-.03625,.46375,0,0],8804:[.13597,.63597,0,0],8805:[.13597,.63597,0,0],8810:[.0391,.5391,0,0],8811:[.0391,.5391,0,0],8826:[.0391,.5391,0,0],8827:[.0391,.5391,0,0],8834:[.0391,.5391,0,0],8835:[.0391,.5391,0,0],8838:[.13597,.63597,0,0],8839:[.13597,.63597,0,0],8846:[0,.55556,0,0],8849:[.13597,.63597,0,0],8850:[.13597,.63597,0,0],8851:[0,.55556,0,0],8852:[0,.55556,0,0],8853:[.08333,.58333,0,0],8854:[.08333,.58333,0,0],8855:[.08333,.58333,0,0],8856:[.08333,.58333,0,0],8857:[.08333,.58333,0,0],8866:[0,.69444,0,0],8867:[0,.69444,0,0],8868:[0,.69444,0,0],8869:[0,.69444,0,0],8872:[.249,.75,0,0],8900:[-.05555,.44445,0,0],8901:[-.05555,.44445,0,0],8902:[-.03472,.46528,0,0],8904:[.005,.505,0,0],8942:[.03,.9,0,0],8943:[-.19,.31,0,0],8945:[-.1,.82,0,0],8968:[.25,.75,0,0],8969:[.25,.75,0,0],8970:[.25,.75,0,0],8971:[.25,.75,0,0],8994:[-.14236,.35764,0,0],8995:[-.14236,.35764,0,0],9136:[.244,.744,0,0],9137:[.244,.744,0,0],9651:[.19444,.69444,0,0],9657:[-.03472,.46528,0,0],9661:[.19444,.69444,0,0],9667:[-.03472,.46528,0,0],9711:[.19444,.69444,0,0],9824:[.12963,.69444,0,0],9825:[.12963,.69444,0,0],9826:[.12963,.69444,0,0],9827:[.12963,.69444,0,0],9837:[0,.75,0,0],9838:[.19444,.69444,0,0],9839:[.19444,.69444,0,0],10216:[.25,.75,0,0],10217:[.25,.75,0,0],10222:[.244,.744,0,0],10223:[.244,.744,0,0],10229:[.011,.511,0,0],10230:[.011,.511,0,0],10231:[.011,.511,0,0],10232:[.024,.525,0,0],10233:[.024,.525,0,0],10234:[.024,.525,0,0],10236:[.011,.511,0,0],10815:[0,.68333,0,0],10927:[.13597,.63597,0,0],10928:[.13597,.63597,0,0],57376:[.19444,.69444,0,0]},"Math-BoldItalic":{65:[0,.68611,0,0],66:[0,.68611,.04835,0],67:[0,.68611,.06979,0],68:[0,.68611,.03194,0],69:[0,.68611,.05451,0],70:[0,.68611,.15972,0],71:[0,.68611,0,0],72:[0,.68611,.08229,0],73:[0,.68611,.07778,0],74:[0,.68611,.10069,0],75:[0,.68611,.06979,0],76:[0,.68611,0,0],77:[0,.68611,.11424,0],78:[0,.68611,.11424,0],79:[0,.68611,.03194,0],80:[0,.68611,.15972,0],81:[.19444,.68611,0,0],82:[0,.68611,.00421,0],83:[0,.68611,.05382,0],84:[0,.68611,.15972,0],85:[0,.68611,.11424,0],86:[0,.68611,.25555,0],87:[0,.68611,.15972,0],88:[0,.68611,.07778,0],89:[0,.68611,.25555,0],90:[0,.68611,.06979,0],97:[0,.44444,0,0],98:[0,.69444,0,0],99:[0,.44444,0,0],100:[0,.69444,0,0],101:[0,.44444,0,0],102:[.19444,.69444,.11042,0],103:[.19444,.44444,.03704,0],104:[0,.69444,0,0],105:[0,.69326,0,0],106:[.19444,.69326,.0622,0],107:[0,.69444,.01852,0],108:[0,.69444,.0088,0],109:[0,.44444,0,0],110:[0,.44444,0,0],111:[0,.44444,0,0],112:[.19444,.44444,0,0],113:[.19444,.44444,.03704,0],114:[0,.44444,.03194,0],115:[0,.44444,0,0],116:[0,.63492,0,0],117:[0,.44444,0,0],118:[0,.44444,.03704,0],119:[0,.44444,.02778,0],120:[0,.44444,0,0],121:[.19444,.44444,.03704,0],122:[0,.44444,.04213,0],915:[0,.68611,.15972,0],916:[0,.68611,0,0],920:[0,.68611,.03194,0],923:[0,.68611,0,0],926:[0,.68611,.07458,0],928:[0,.68611,.08229,0],931:[0,.68611,.05451,0],933:[0,.68611,.15972,0],934:[0,.68611,0,0],936:[0,.68611,.11653,0],937:[0,.68611,.04835,0],945:[0,.44444,0,0],946:[.19444,.69444,.03403,0],947:[.19444,.44444,.06389,0],948:[0,.69444,.03819,0],949:[0,.44444,0,0],950:[.19444,.69444,.06215,0],951:[.19444,.44444,.03704,0],952:[0,.69444,.03194,0],953:[0,.44444,0,0],954:[0,.44444,0,0],955:[0,.69444,0,0],956:[.19444,.44444,0,0],957:[0,.44444,.06898,0],958:[.19444,.69444,.03021,0],959:[0,.44444,0,0],960:[0,.44444,.03704,0],961:[.19444,.44444,0,0],962:[.09722,.44444,.07917,0],963:[0,.44444,.03704,0],964:[0,.44444,.13472,0],965:[0,.44444,.03704,0],966:[.19444,.44444,0,0],967:[.19444,.44444,0,0],968:[.19444,.69444,.03704,0],969:[0,.44444,.03704,0],977:[0,.69444,0,0],981:[.19444,.69444,0,0],982:[0,.44444,.03194,0],1009:[.19444,.44444,0,0],1013:[0,.44444,0,0]},"Math-Italic":{65:[0,.68333,0,.13889],66:[0,.68333,.05017,.08334],67:[0,.68333,.07153,.08334],68:[0,.68333,.02778,.05556],69:[0,.68333,.05764,.08334],70:[0,.68333,.13889,.08334],71:[0,.68333,0,.08334],72:[0,.68333,.08125,.05556],73:[0,.68333,.07847,.11111],74:[0,.68333,.09618,.16667],75:[0,.68333,.07153,.05556],76:[0,.68333,0,.02778],77:[0,.68333,.10903,.08334],78:[0,.68333,.10903,.08334],79:[0,.68333,.02778,.08334],80:[0,.68333,.13889,.08334],81:[.19444,.68333,0,.08334],82:[0,.68333,.00773,.08334],83:[0,.68333,.05764,.08334],84:[0,.68333,.13889,.08334],85:[0,.68333,.10903,.02778],86:[0,.68333,.22222,0],87:[0,.68333,.13889,0],88:[0,.68333,.07847,.08334],89:[0,.68333,.22222,0],90:[0,.68333,.07153,.08334],97:[0,.43056,0,0],98:[0,.69444,0,0],99:[0,.43056,0,.05556],100:[0,.69444,0,.16667],101:[0,.43056,0,.05556],102:[.19444,.69444,.10764,.16667],103:[.19444,.43056,.03588,.02778],104:[0,.69444,0,0],105:[0,.65952,0,0],106:[.19444,.65952,.05724,0],107:[0,.69444,.03148,0],108:[0,.69444,.01968,.08334],109:[0,.43056,0,0],110:[0,.43056,0,0],111:[0,.43056,0,.05556],112:[.19444,.43056,0,.08334],113:[.19444,.43056,.03588,.08334],114:[0,.43056,.02778,.05556],115:[0,.43056,0,.05556],116:[0,.61508,0,.08334],117:[0,.43056,0,.02778],118:[0,.43056,.03588,.02778],119:[0,.43056,.02691,.08334],120:[0,.43056,0,.02778],121:[.19444,.43056,.03588,.05556],122:[0,.43056,.04398,.05556],915:[0,.68333,.13889,.08334],916:[0,.68333,0,.16667],920:[0,.68333,.02778,.08334],923:[0,.68333,0,.16667],926:[0,.68333,.07569,.08334],928:[0,.68333,.08125,.05556],931:[0,.68333,.05764,.08334],933:[0,.68333,.13889,.05556],934:[0,.68333,0,.08334],936:[0,.68333,.11,.05556],937:[0,.68333,.05017,.08334],945:[0,.43056,.0037,.02778],946:[.19444,.69444,.05278,.08334],947:[.19444,.43056,.05556,0],948:[0,.69444,.03785,.05556],949:[0,.43056,0,.08334],950:[.19444,.69444,.07378,.08334],951:[.19444,.43056,.03588,.05556],952:[0,.69444,.02778,.08334],953:[0,.43056,0,.05556],954:[0,.43056,0,0],955:[0,.69444,0,0],956:[.19444,.43056,0,.02778],957:[0,.43056,.06366,.02778],958:[.19444,.69444,.04601,.11111],959:[0,.43056,0,.05556],960:[0,.43056,.03588,0],961:[.19444,.43056,0,.08334],962:[.09722,.43056,.07986,.08334],963:[0,.43056,.03588,0],964:[0,.43056,.1132,.02778],965:[0,.43056,.03588,.02778],966:[.19444,.43056,0,.08334],967:[.19444,.43056,0,.05556],968:[.19444,.69444,.03588,.11111],969:[0,.43056,.03588,0],977:[0,.69444,0,.08334],981:[.19444,.69444,0,.08334],982:[0,.43056,.02778,0],1009:[.19444,.43056,0,.08334],1013:[0,.43056,0,.05556]},"SansSerif-Bold":{33:[0,.69444,0,0],34:[0,.69444,0,0],35:[.19444,.69444,0,0],36:[.05556,.75,0,0],37:[.05556,.75,0,0],38:[0,.69444,0,0],39:[0,.69444,0,0],40:[.25,.75,0,0],41:[.25,.75,0,0],42:[0,.75,0,0],43:[.11667,.61667,0,0],44:[.10556,.13056,0,0],45:[0,.45833,0,0],46:[0,.13056,0,0],47:[.25,.75,0,0],48:[0,.69444,0,0],49:[0,.69444,0,0],50:[0,.69444,0,0],51:[0,.69444,0,0],52:[0,.69444,0,0],53:[0,.69444,0,0],54:[0,.69444,0,0],55:[0,.69444,0,0],56:[0,.69444,0,0],57:[0,.69444,0,0],58:[0,.45833,0,0],59:[.10556,.45833,0,0],61:[-.09375,.40625,0,0],63:[0,.69444,0,0],64:[0,.69444,0,0],65:[0,.69444,0,0],66:[0,.69444,0,0],67:[0,.69444,0,0],68:[0,.69444,0,0],69:[0,.69444,0,0],70:[0,.69444,0,0],71:[0,.69444,0,0],72:[0,.69444,0,0],73:[0,.69444,0,0],74:[0,.69444,0,0],75:[0,.69444,0,0],76:[0,.69444,0,0],77:[0,.69444,0,0],78:[0,.69444,0,0],79:[0,.69444,0,0],80:[0,.69444,0,0],81:[.10556,.69444,0,0],82:[0,.69444,0,0],83:[0,.69444,0,0],84:[0,.69444,0,0],85:[0,.69444,0,0],86:[0,.69444,.01528,0],87:[0,.69444,.01528,0],88:[0,.69444,0,0],89:[0,.69444,.0275,0],90:[0,.69444,0,0],91:[.25,.75,0,0],93:[.25,.75,0,0],94:[0,.69444,0,0],95:[.35,.10833,.03056,0],97:[0,.45833,0,0],98:[0,.69444,0,0],99:[0,.45833,0,0],100:[0,.69444,0,0],101:[0,.45833,0,0],102:[0,.69444,.07639,0],103:[.19444,.45833,.01528,0],104:[0,.69444,0,0],105:[0,.69444,0,0],106:[.19444,.69444,0,0],107:[0,.69444,0,0],108:[0,.69444,0,0],109:[0,.45833,0,0],110:[0,.45833,0,0],111:[0,.45833,0,0],112:[.19444,.45833,0,0],113:[.19444,.45833,0,0],114:[0,.45833,.01528,0],115:[0,.45833,0,0],116:[0,.58929,0,0],117:[0,.45833,0,0],118:[0,.45833,.01528,0],119:[0,.45833,.01528,0],120:[0,.45833,0,0],121:[.19444,.45833,.01528,0],122:[0,.45833,0,0],126:[.35,.34444,0,0],168:[0,.69444,0,0],176:[0,.69444,0,0],180:[0,.69444,0,0],184:[.17014,0,0,0],305:[0,.45833,0,0],567:[.19444,.45833,0,0],710:[0,.69444,0,0],711:[0,.63542,0,0],713:[0,.63778,0,0],728:[0,.69444,0,0],729:[0,.69444,0,0],730:[0,.69444,0,0],732:[0,.69444,0,0],733:[0,.69444,0,0],915:[0,.69444,0,0],916:[0,.69444,0,0],920:[0,.69444,0,0],923:[0,.69444,0,0],926:[0,.69444,0,0],928:[0,.69444,0,0],931:[0,.69444,0,0],933:[0,.69444,0,0],934:[0,.69444,0,0],936:[0,.69444,0,0],937:[0,.69444,0,0],8211:[0,.45833,.03056,0],8212:[0,.45833,.03056,0],8216:[0,.69444,0,0],8217:[0,.69444,0,0],8220:[0,.69444,0,0],8221:[0,.69444,0,0]},"SansSerif-Italic":{33:[0,.69444,.05733,0],34:[0,.69444,.00316,0],35:[.19444,.69444,.05087,0],36:[.05556,.75,.11156,0],37:[.05556,.75,.03126,0],38:[0,.69444,.03058,0],39:[0,.69444,.07816,0],40:[.25,.75,.13164,0],41:[.25,.75,.02536,0],42:[0,.75,.11775,0],43:[.08333,.58333,.02536,0],44:[.125,.08333,0,0],45:[0,.44444,.01946,0],46:[0,.08333,0,0],47:[.25,.75,.13164,0],48:[0,.65556,.11156,0],49:[0,.65556,.11156,0],50:[0,.65556,.11156,0],51:[0,.65556,.11156,0],52:[0,.65556,.11156,0],53:[0,.65556,.11156,0],54:[0,.65556,.11156,0],55:[0,.65556,.11156,0],56:[0,.65556,.11156,0],57:[0,.65556,.11156,0],58:[0,.44444,.02502,0],59:[.125,.44444,.02502,0],61:[-.13,.37,.05087,0],63:[0,.69444,.11809,0],64:[0,.69444,.07555,0],65:[0,.69444,0,0],66:[0,.69444,.08293,0],67:[0,.69444,.11983,0],68:[0,.69444,.07555,0],69:[0,.69444,.11983,0],70:[0,.69444,.13372,0],71:[0,.69444,.11983,0],72:[0,.69444,.08094,0],73:[0,.69444,.13372,0],74:[0,.69444,.08094,0],75:[0,.69444,.11983,0],76:[0,.69444,0,0],77:[0,.69444,.08094,0],78:[0,.69444,.08094,0],79:[0,.69444,.07555,0],80:[0,.69444,.08293,0],81:[.125,.69444,.07555,0],82:[0,.69444,.08293,0],83:[0,.69444,.09205,0],84:[0,.69444,.13372,0],85:[0,.69444,.08094,0],86:[0,.69444,.1615,0],87:[0,.69444,.1615,0],88:[0,.69444,.13372,0],89:[0,.69444,.17261,0],90:[0,.69444,.11983,0],91:[.25,.75,.15942,0],93:[.25,.75,.08719,0],94:[0,.69444,.0799,0],95:[.35,.09444,.08616,0],97:[0,.44444,.00981,0],98:[0,.69444,.03057,0],99:[0,.44444,.08336,0],100:[0,.69444,.09483,0],101:[0,.44444,.06778,0],102:[0,.69444,.21705,0],103:[.19444,.44444,.10836,0],104:[0,.69444,.01778,0],105:[0,.67937,.09718,0],106:[.19444,.67937,.09162,0],107:[0,.69444,.08336,0],108:[0,.69444,.09483,0],109:[0,.44444,.01778,0],110:[0,.44444,.01778,0],111:[0,.44444,.06613,0],112:[.19444,.44444,.0389,0],113:[.19444,.44444,.04169,0],114:[0,.44444,.10836,0],115:[0,.44444,.0778,0],116:[0,.57143,.07225,0],117:[0,.44444,.04169,0],118:[0,.44444,.10836,0],119:[0,.44444,.10836,0],120:[0,.44444,.09169,0],121:[.19444,.44444,.10836,0],122:[0,.44444,.08752,0],126:[.35,.32659,.08826,0],168:[0,.67937,.06385,0],176:[0,.69444,0,0],184:[.17014,0,0,0],305:[0,.44444,.04169,0],567:[.19444,.44444,.04169,0],710:[0,.69444,.0799,0],711:[0,.63194,.08432,0],713:[0,.60889,.08776,0],714:[0,.69444,.09205,0],715:[0,.69444,0,0],728:[0,.69444,.09483,0],729:[0,.67937,.07774,0],730:[0,.69444,0,0],732:[0,.67659,.08826,0],733:[0,.69444,.09205,0],915:[0,.69444,.13372,0],916:[0,.69444,0,0],920:[0,.69444,.07555,0],923:[0,.69444,0,0],926:[0,.69444,.12816,0],928:[0,.69444,.08094,0],931:[0,.69444,.11983,0],933:[0,.69444,.09031,0],934:[0,.69444,.04603,0],936:[0,.69444,.09031,0],937:[0,.69444,.08293,0],8211:[0,.44444,.08616,0],8212:[0,.44444,.08616,0],8216:[0,.69444,.07816,0],8217:[0,.69444,.07816,0],8220:[0,.69444,.14205,0],8221:[0,.69444,.00316,0]},"SansSerif-Regular":{33:[0,.69444,0,0],34:[0,.69444,0,0],35:[.19444,.69444,0,0],36:[.05556,.75,0,0],37:[.05556,.75,0,0],38:[0,.69444,0,0],39:[0,.69444,0,0],40:[.25,.75,0,0],41:[.25,.75,0,0],42:[0,.75,0,0],43:[.08333,.58333,0,0],44:[.125,.08333,0,0],45:[0,.44444,0,0],46:[0,.08333,0,0],47:[.25,.75,0,0],48:[0,.65556,0,0],49:[0,.65556,0,0],50:[0,.65556,0,0],51:[0,.65556,0,0],52:[0,.65556,0,0],53:[0,.65556,0,0],54:[0,.65556,0,0],55:[0,.65556,0,0],56:[0,.65556,0,0],57:[0,.65556,0,0],58:[0,.44444,0,0],59:[.125,.44444,0,0],61:[-.13,.37,0,0],63:[0,.69444,0,0],64:[0,.69444,0,0],65:[0,.69444,0,0],66:[0,.69444,0,0],67:[0,.69444,0,0],68:[0,.69444,0,0],69:[0,.69444,0,0],70:[0,.69444,0,0],71:[0,.69444,0,0],72:[0,.69444,0,0],73:[0,.69444,0,0],74:[0,.69444,0,0],75:[0,.69444,0,0],76:[0,.69444,0,0],77:[0,.69444,0,0],78:[0,.69444,0,0],79:[0,.69444,0,0],80:[0,.69444,0,0],81:[.125,.69444,0,0],82:[0,.69444,0,0],83:[0,.69444,0,0],84:[0,.69444,0,0],85:[0,.69444,0,0],86:[0,.69444,.01389,0],87:[0,.69444,.01389,0],88:[0,.69444,0,0],89:[0,.69444,.025,0],90:[0,.69444,0,0],91:[.25,.75,0,0],93:[.25,.75,0,0],94:[0,.69444,0,0],95:[.35,.09444,.02778,0],97:[0,.44444,0,0],98:[0,.69444,0,0],99:[0,.44444,0,0],100:[0,.69444,0,0],101:[0,.44444,0,0],102:[0,.69444,.06944,0],103:[.19444,.44444,.01389,0],104:[0,.69444,0,0],105:[0,.67937,0,0],106:[.19444,.67937,0,0],107:[0,.69444,0,0],108:[0,.69444,0,0],109:[0,.44444,0,0],110:[0,.44444,0,0],111:[0,.44444,0,0],112:[.19444,.44444,0,0],113:[.19444,.44444,0,0],114:[0,.44444,.01389,0],115:[0,.44444,0,0],116:[0,.57143,0,0],117:[0,.44444,0,0],118:[0,.44444,.01389,0],119:[0,.44444,.01389,0],120:[0,.44444,0,0],121:[.19444,.44444,.01389,0],122:[0,.44444,0,0],126:[.35,.32659,0,0],168:[0,.67937,0,0],176:[0,.69444,0,0],184:[.17014,0,0,0],305:[0,.44444,0,0],567:[.19444,.44444,0,0],710:[0,.69444,0,0],711:[0,.63194,0,0],713:[0,.60889,0,0],714:[0,.69444,0,0],715:[0,.69444,0,0],728:[0,.69444,0,0],729:[0,.67937,0,0],730:[0,.69444,0,0],732:[0,.67659,0,0],733:[0,.69444,0,0],915:[0,.69444,0,0],916:[0,.69444,0,0],920:[0,.69444,0,0],923:[0,.69444,0,0],926:[0,.69444,0,0],928:[0,.69444,0,0],931:[0,.69444,0,0],933:[0,.69444,0,0],934:[0,.69444,0,0],936:[0,.69444,0,0],937:[0,.69444,0,0],8211:[0,.44444,.02778,0],8212:[0,.44444,.02778,0],8216:[0,.69444,0,0],8217:[0,.69444,0,0],8220:[0,.69444,0,0],8221:[0,.69444,0,0]},"Script-Regular":{65:[0,.7,.22925,0],66:[0,.7,.04087,0],67:[0,.7,.1689,0],68:[0,.7,.09371,0],69:[0,.7,.18583,0],70:[0,.7,.13634,0],71:[0,.7,.17322,0],72:[0,.7,.29694,0],73:[0,.7,.19189,0],74:[.27778,.7,.19189,0],75:[0,.7,.31259,0],76:[0,.7,.19189,0],77:[0,.7,.15981,0],78:[0,.7,.3525,0],79:[0,.7,.08078,0],80:[0,.7,.08078,0],81:[0,.7,.03305,0],82:[0,.7,.06259,0],83:[0,.7,.19189,0],84:[0,.7,.29087,0],85:[0,.7,.25815,0],86:[0,.7,.27523,0],87:[0,.7,.27523,0],88:[0,.7,.26006,0],89:[0,.7,.2939,0],90:[0,.7,.24037,0]},"Size1-Regular":{40:[.35001,.85,0,0],41:[.35001,.85,0,0],47:[.35001,.85,0,0],91:[.35001,.85,0,0],92:[.35001,.85,0,0],93:[.35001,.85,0,0],123:[.35001,.85,0,0],125:[.35001,.85,0,0],710:[0,.72222,0,0],732:[0,.72222,0,0],770:[0,.72222,0,0],771:[0,.72222,0,0],8214:[-99e-5,.601,0,0],8593:[1e-5,.6,0,0],8595:[1e-5,.6,0,0],8657:[1e-5,.6,0,0],8659:[1e-5,.6,0,0],8719:[.25001,.75,0,0],8720:[.25001,.75,0,0],8721:[.25001,.75,0,0],8730:[.35001,.85,0,0],8739:[-.00599,.606,0,0],8741:[-.00599,.606,0,0],8747:[.30612,.805,.19445,0],8748:[.306,.805,.19445,0],8749:[.306,.805,.19445,0],8750:[.30612,.805,.19445,0],8896:[.25001,.75,0,0],8897:[.25001,.75,0,0],8898:[.25001,.75,0,0],8899:[.25001,.75,0,0],8968:[.35001,.85,0,0],8969:[.35001,.85,0,0],8970:[.35001,.85,0,0],8971:[.35001,.85,0,0],9168:[-99e-5,.601,0,0],10216:[.35001,.85,0,0],10217:[.35001,.85,0,0],10752:[.25001,.75,0,0],10753:[.25001,.75,0,0],10754:[.25001,.75,0,0],10756:[.25001,.75,0,0],10758:[.25001,.75,0,0]},"Size2-Regular":{40:[.65002,1.15,0,0],41:[.65002,1.15,0,0],47:[.65002,1.15,0,0],91:[.65002,1.15,0,0],92:[.65002,1.15,0,0],93:[.65002,1.15,0,0],123:[.65002,1.15,0,0],125:[.65002,1.15,0,0],710:[0,.75,0,0],732:[0,.75,0,0],770:[0,.75,0,0],771:[0,.75,0,0],8719:[.55001,1.05,0,0],8720:[.55001,1.05,0,0],8721:[.55001,1.05,0,0],8730:[.65002,1.15,0,0],8747:[.86225,1.36,.44445,0],8748:[.862,1.36,.44445,0],8749:[.862,1.36,.44445,0],8750:[.86225,1.36,.44445,0],8896:[.55001,1.05,0,0],8897:[.55001,1.05,0,0],8898:[.55001,1.05,0,0],8899:[.55001,1.05,0,0],8968:[.65002,1.15,0,0],8969:[.65002,1.15,0,0],8970:[.65002,1.15,0,0],8971:[.65002,1.15,0,0],10216:[.65002,1.15,0,0],10217:[.65002,1.15,0,0],10752:[.55001,1.05,0,0],10753:[.55001,1.05,0,0],10754:[.55001,1.05,0,0],10756:[.55001,1.05,0,0],10758:[.55001,1.05,0,0]},"Size3-Regular":{40:[.95003,1.45,0,0],41:[.95003,1.45,0,0],47:[.95003,1.45,0,0],91:[.95003,1.45,0,0],92:[.95003,1.45,0,0],93:[.95003,1.45,0,0],123:[.95003,1.45,0,0],125:[.95003,1.45,0,0],710:[0,.75,0,0],732:[0,.75,0,0],770:[0,.75,0,0],771:[0,.75,0,0],8730:[.95003,1.45,0,0],8968:[.95003,1.45,0,0],8969:[.95003,1.45,0,0],8970:[.95003,1.45,0,0],8971:[.95003,1.45,0,0],10216:[.95003,1.45,0,0],10217:[.95003,1.45,0,0]},"Size4-Regular":{40:[1.25003,1.75,0,0],41:[1.25003,1.75,0,0],47:[1.25003,1.75,0,0],91:[1.25003,1.75,0,0],92:[1.25003,1.75,0,0],93:[1.25003,1.75,0,0],123:[1.25003,1.75,0,0],125:[1.25003,1.75,0,0],710:[0,.825,0,0],732:[0,.825,0,0],770:[0,.825,0,0],771:[0,.825,0,0],8730:[1.25003,1.75,0,0],8968:[1.25003,1.75,0,0],8969:[1.25003,1.75,0,0],8970:[1.25003,1.75,0,0],8971:[1.25003,1.75,0,0],9115:[.64502,1.155,0,0],9116:[1e-5,.6,0,0],9117:[.64502,1.155,0,0],9118:[.64502,1.155,0,0],9119:[1e-5,.6,0,0],9120:[.64502,1.155,0,0],9121:[.64502,1.155,0,0],9122:[-99e-5,.601,0,0],9123:[.64502,1.155,0,0],9124:[.64502,1.155,0,0],9125:[-99e-5,.601,0,0],9126:[.64502,1.155,0,0],9127:[1e-5,.9,0,0],9128:[.65002,1.15,0,0],9129:[.90001,0,0,0],9130:[0,.3,0,0],9131:[1e-5,.9,0,0],9132:[.65002,1.15,0,0],9133:[.90001,0,0,0],9143:[.88502,.915,0,0],10216:[1.25003,1.75,0,0],10217:[1.25003,1.75,0,0],57344:[-.00499,.605,0,0],57345:[-.00499,.605,0,0],57680:[0,.12,0,0],57681:[0,.12,0,0],57682:[0,.12,0,0],57683:[0,.12,0,0]},"Typewriter-Regular":{32:[0,0,0,0],33:[0,.61111,0,0],34:[0,.61111,0,0],35:[0,.61111,0,0],36:[.08333,.69444,0,0],37:[.08333,.69444,0,0],38:[0,.61111,0,0],39:[0,.61111,0,0],40:[.08333,.69444,0,0],41:[.08333,.69444,0,0],42:[0,.52083,0,0],43:[-.08056,.53055,0,0],44:[.13889,.125,0,0],45:[-.08056,.53055,0,0],46:[0,.125,0,0],47:[.08333,.69444,0,0],48:[0,.61111,0,0],49:[0,.61111,0,0],50:[0,.61111,0,0],51:[0,.61111,0,0],52:[0,.61111,0,0],53:[0,.61111,0,0],54:[0,.61111,0,0],55:[0,.61111,0,0],56:[0,.61111,0,0],57:[0,.61111,0,0],58:[0,.43056,0,0],59:[.13889,.43056,0,0],60:[-.05556,.55556,0,0],61:[-.19549,.41562,0,0],62:[-.05556,.55556,0,0],63:[0,.61111,0,0],64:[0,.61111,0,0],65:[0,.61111,0,0],66:[0,.61111,0,0],67:[0,.61111,0,0],68:[0,.61111,0,0],69:[0,.61111,0,0],70:[0,.61111,0,0],71:[0,.61111,0,0],72:[0,.61111,0,0],73:[0,.61111,0,0],74:[0,.61111,0,0],75:[0,.61111,0,0],76:[0,.61111,0,0],77:[0,.61111,0,0],78:[0,.61111,0,0],79:[0,.61111,0,0],80:[0,.61111,0,0],81:[.13889,.61111,0,0],82:[0,.61111,0,0],83:[0,.61111,0,0],84:[0,.61111,0,0],85:[0,.61111,0,0],86:[0,.61111,0,0],87:[0,.61111,0,0],88:[0,.61111,0,0],89:[0,.61111,0,0],90:[0,.61111,0,0],91:[.08333,.69444,0,0],92:[.08333,.69444,0,0],93:[.08333,.69444,0,0],94:[0,.61111,0,0],95:[.09514,0,0,0],96:[0,.61111,0,0],97:[0,.43056,0,0],98:[0,.61111,0,0],99:[0,.43056,0,0],100:[0,.61111,0,0],101:[0,.43056,0,0],102:[0,.61111,0,0],103:[.22222,.43056,0,0],104:[0,.61111,0,0],105:[0,.61111,0,0],106:[.22222,.61111,0,0],107:[0,.61111,0,0],108:[0,.61111,0,0],109:[0,.43056,0,0],110:[0,.43056,0,0],111:[0,.43056,0,0],112:[.22222,.43056,0,0],113:[.22222,.43056,0,0],114:[0,.43056,0,0],115:[0,.43056,0,0],116:[0,.55358,0,0],117:[0,.43056,0,0],118:[0,.43056,0,0],119:[0,.43056,0,0],120:[0,.43056,0,0],121:[.22222,.43056,0,0],122:[0,.43056,0,0],123:[.08333,.69444,0,0],124:[.08333,.69444,0,0],125:[.08333,.69444,0,0],126:[0,.61111,0,0],127:[0,.61111,0,0],160:[0,0,0,0],176:[0,.61111,0,0],184:[.19445,0,0,0],305:[0,.43056,0,0],567:[.22222,.43056,0,0],711:[0,.56597,0,0],713:[0,.56555,0,0],714:[0,.61111,0,0],715:[0,.61111,0,0],728:[0,.61111,0,0],730:[0,.61111,0,0],770:[0,.61111,0,0],771:[0,.61111,0,0],776:[0,.61111,0,0],915:[0,.61111,0,0],916:[0,.61111,0,0],920:[0,.61111,0,0],923:[0,.61111,0,0],926:[0,.61111,0,0],928:[0,.61111,0,0],931:[0,.61111,0,0],933:[0,.61111,0,0],934:[0,.61111,0,0],936:[0,.61111,0,0],937:[0,.61111,0,0],8216:[0,.61111,0,0],8217:[0,.61111,0,0],8242:[0,.61111,0,0],9251:[.11111,.21944,0,0]}};const i=/[\u3040-\u309F]|[\u30A0-\u30FF]|[\u4E00-\u9FAF]|[\uAC00-\uD7AF]/,a={slant:[.25,.25,.25],space:[0,0,0],stretch:[0,0,0],shrink:[0,0,0],xHeight:[.431,.431,.431],quad:[1,1.171,1.472],extraSpace:[0,0,0],num1:[.677,.732,.925],num2:[.394,.384,.387],num3:[.444,.471,.504],denom1:[.686,.752,1.025],denom2:[.345,.344,.532],sup1:[.413,.503,.504],sup2:[.363,.431,.404],sup3:[.289,.286,.294],sub1:[.15,.143,.2],sub2:[.247,.286,.4],supDrop:[.386,.353,.494],subDrop:[.05,.071,.1],delim1:[2.39,1.7,1.98],delim2:[1.01,1.157,1.42],axisHeight:[.25,.25,.25]},r={" ":" ","​":" ","Å":"A","Ç":"C","Ð":"D","Þ":"o","å":"a","ç":"c","ð":"d","þ":"o","А":"A","Б":"B","В":"B","Г":"F","Д":"A","Е":"E","Ж":"K","З":"3","И":"N","Й":"N","К":"K","Л":"N","М":"M","Н":"H","О":"O","П":"N","Р":"P","С":"C","Т":"T","У":"y","Ф":"O","Х":"X","Ц":"U","Ч":"h","Ш":"W","Щ":"W","Ъ":"B","Ы":"X","Ь":"B","Э":"3","Ю":"X","Я":"R","а":"a","б":"b","в":"a","г":"r","д":"y","е":"e","ж":"m","з":"e","и":"n","й":"n","к":"n","л":"n","м":"m","н":"n","о":"o","п":"n","р":"p","с":"c","т":"o","у":"y","ф":"b","х":"x","ц":"n","ч":"n","ш":"w","щ":"w","ъ":"a","ы":"m","ь":"a","э":"e","ю":"m","я":"r"};function s(e,a){let s=e.charCodeAt(0);e[0]in r?s=r[e[0]].charCodeAt(0):i.test(e[0])&&(s=77);const o=t[a][s];return o?{defaultMetrics:!1,depth:o[0],height:o[1],italic:o[2],skew:o[3]}:11034===s?{defaultMetrics:!0,depth:0,height:1,italic:0,skew:0}:{defaultMetrics:!0,depth:.2,height:.7,italic:0,skew:0}}function o(e,t,i=NaN){if("string"==typeof e){const i=e.match(/([-+]?[0-9.]*)\s*([a-zA-Z]+)/);i?(e=parseFloat(i[1]),t=i[2].toLowerCase()):e=parseFloat(e);}const a={pt:1,mm:7227/2540,cm:7227/254,ex:35271/8192,px:3/4,em:10,bp:1.00375,dd:1238/1157,pc:12,in:72.27,mu:10/18}[t]||1;if(isFinite(i)){const t=Math.pow(10,i);return Math.round(e/10*a*t)/t}return e/10*a}function n(e,t){return o(e,t)*(4/3)*10}class l{constructor(e,t,i,r){this.id=e,this.size=t,this.cramped=r,this.sizeMultiplier=i,this.metrics=Object.keys(a).reduce((e,t)=>({...e,[t]:a[t][this.size]}),{}),this.metrics.emPerEx=a.xHeight[this.size]/a.quad[this.size];}sup(){return c[[4,5,4,5,6,7,6,7][this.id]]}sub(){return c[[5,5,5,5,7,7,7,7][this.id]]}fracNum(){return c[[2,3,4,5,6,7,6,7][this.id]]}fracDen(){return c[[3,3,5,5,7,7,7,7][this.id]]}cramp(){return c[[1,1,3,3,5,5,7,7][this.id]]}cls(){return ["displaystyle textstyle","textstyle","scriptstyle","scriptscriptstyle"][this.size]}adjustTo(e){let t=[["","","reset-textstyle scriptstyle","reset-textstyle scriptscriptstyle"],["reset-textstyle displaystyle textstyle","","reset-textstyle scriptstyle","reset-textstyle scriptscriptstyle"],["reset-scriptstyle textstyle displaystyle","reset-scriptstyle textstyle","","reset-scriptstyle scriptscriptstyle"],["reset-scriptscriptstyle textstyle displaystyle","reset-scriptscriptstyle textstyle","reset-scriptscriptstyle scriptstyle",""]][this.size][e.size];return t.length>0&&(t=" "+t),t}isTight(){return this.size>=2}}const c={0:new l(0,0,1,!1),1:new l(1,0,1,!0),2:new l(2,1,1,!1),3:new l(3,1,1,!0),4:new l(4,2,.7,!1),5:new l(5,2,.7,!0),6:new l(6,3,.5,!1),7:new l(7,3,.5,!0)};c.displaystyle=c[0],c.textstyle=c[2],c.scriptstyle=c[4],c.scriptscriptstyle=c[6];class d{constructor(e){var t;this.macros=null!==(t=e.macros)&&void 0!==t?t:{},this.atomIdsSettings=e.atomIdsSettings,this.mathstyle=e.mathstyle||c.displaystyle,this.letterShapeStyle=e.letterShapeStyle||"tex",this.size=e.size||"size5",this.parentMathstyle=e.parentMathstyle||this.mathstyle,this.parentSize=e.parentSize||this.size,this.opacity=e.opacity,this.smartFence=e.smartFence;}clone(e={}){const t=new d(this);return e&&(Object.assign(t,e),e.mathstyle?(t.parentMathstyle=this.mathstyle,t.parentSize=this.size,"string"==typeof e.mathstyle&&(t.mathstyle=c[e.mathstyle])):t.mathstyle=this.mathstyle),t}setMathstyle(e){e&&"auto"!==e&&(this.mathstyle=c[e]);}cramp(){return this.clone({mathstyle:this.mathstyle.cramp()})}sup(){return this.clone({mathstyle:this.mathstyle.sup()})}sub(){return this.clone({mathstyle:this.mathstyle.sub()})}}const m={overrightarrow:[["rightarrow"],.888,522,"xMaxYMin"],overleftarrow:[["leftarrow"],.888,522,"xMinYMin"],underrightarrow:[["rightarrow"],.888,522,"xMaxYMin"],underleftarrow:[["leftarrow"],.888,522,"xMinYMin"],xrightarrow:[["rightarrow"],1.469,522,"xMaxYMin"],xleftarrow:[["leftarrow"],1.469,522,"xMinYMin"],Overrightarrow:[["doublerightarrow"],.888,560,"xMaxYMin"],xRightarrow:[["doublerightarrow"],1.526,560,"xMaxYMin"],xLeftarrow:[["doubleleftarrow"],1.526,560,"xMinYMin"],overleftharpoon:[["leftharpoon"],.888,522,"xMinYMin"],xleftharpoonup:[["leftharpoon"],.888,522,"xMinYMin"],xleftharpoondown:[["leftharpoondown"],.888,522,"xMinYMin"],overrightharpoon:[["rightharpoon"],.888,522,"xMaxYMin"],xrightharpoonup:[["rightharpoon"],.888,522,"xMaxYMin"],xrightharpoondown:[["rightharpoondown"],.888,522,"xMaxYMin"],xlongequal:[["longequal"],.888,334,"xMinYMin"],xtwoheadleftarrow:[["twoheadleftarrow"],.888,334,"xMinYMin"],xtwoheadrightarrow:[["twoheadrightarrow"],.888,334,"xMaxYMin"],overleftrightarrow:[["leftarrow","rightarrow"],.888,522],overbrace:[["leftbrace","midbrace","rightbrace"],1.6,548],underbrace:[["leftbraceunder","midbraceunder","rightbraceunder"],1.6,548],underleftrightarrow:[["leftarrow","rightarrow"],.888,522],xleftrightarrow:[["leftarrow","rightarrow"],1.75,522],xLeftrightarrow:[["doubleleftarrow","doublerightarrow"],1.75,560],xrightleftharpoons:[["leftharpoondownplus","rightharpoonplus"],1.75,716],xleftrightharpoons:[["leftharpoonplus","rightharpoondownplus"],1.75,716],xhookleftarrow:[["leftarrow","righthook"],1.08,522],xhookrightarrow:[["lefthook","rightarrow"],1.08,522],overlinesegment:[["leftlinesegment","rightlinesegment"],.888,522],underlinesegment:[["leftlinesegment","rightlinesegment"],.888,522],overgroup:[["leftgroup","rightgroup"],.888,342],undergroup:[["leftgroupunder","rightgroupunder"],.888,342],xmapsto:[["leftmapsto","rightarrow"],1.5,522],xtofrom:[["leftToFrom","rightToFrom"],1.75,528],xrightleftarrows:[["baraboveleftarrow","rightarrowabovebar"],1.75,901],xrightequilibrium:[["baraboveshortleftharpoon","rightharpoonaboveshortbar"],1.75,716],xleftequilibrium:[["shortbaraboveleftharpoon","shortrightharpoonabovebar"],1.75,716]},h={widehat1:[1062,239,.24],widehat2:[2364,300,.3],widehat3:[2364,360,.36],widehat4:[2364,420,.42],widecheck1:[1062,239,.24],widecheck2:[2364,300,.3],widecheck3:[2364,360,.36],widecheck4:[2364,420,.42],widetilde1:[600,260,.26],widetilde2:[1033,286,.286],widetilde3:[2339,306,.306],widetilde4:[2340,312,.34]},p$1={doubleleftarrow:"M262 157\nl10-10c34-36 62.7-77 86-123 3.3-8 5-13.3 5-16 0-5.3-6.7-8-20-8-7.3\n 0-12.2.5-14.5 1.5-2.3 1-4.8 4.5-7.5 10.5-49.3 97.3-121.7 169.3-217 216-28\n 14-57.3 25-88 33-6.7 2-11 3.8-13 5.5-2 1.7-3 4.2-3 7.5s1 5.8 3 7.5\nc2 1.7 6.3 3.5 13 5.5 68 17.3 128.2 47.8 180.5 91.5 52.3 43.7 93.8 96.2 124.5\n 157.5 9.3 8 15.3 12.3 18 13h6c12-.7 18-4 18-10 0-2-1.7-7-5-15-23.3-46-52-87\n-86-123l-10-10h399738v-40H218c328 0 0 0 0 0l-10-8c-26.7-20-65.7-43-117-69 2.7\n-2 6-3.7 10-5 36.7-16 72.3-37.3 107-64l10-8h399782v-40z\nm8 0v40h399730v-40zm0 194v40h399730v-40z",doublerightarrow:"M399738 392l\n-10 10c-34 36-62.7 77-86 123-3.3 8-5 13.3-5 16 0 5.3 6.7 8 20 8 7.3 0 12.2-.5\n 14.5-1.5 2.3-1 4.8-4.5 7.5-10.5 49.3-97.3 121.7-169.3 217-216 28-14 57.3-25 88\n-33 6.7-2 11-3.8 13-5.5 2-1.7 3-4.2 3-7.5s-1-5.8-3-7.5c-2-1.7-6.3-3.5-13-5.5-68\n-17.3-128.2-47.8-180.5-91.5-52.3-43.7-93.8-96.2-124.5-157.5-9.3-8-15.3-12.3-18\n-13h-6c-12 .7-18 4-18 10 0 2 1.7 7 5 15 23.3 46 52 87 86 123l10 10H0v40h399782\nc-328 0 0 0 0 0l10 8c26.7 20 65.7 43 117 69-2.7 2-6 3.7-10 5-36.7 16-72.3 37.3\n-107 64l-10 8H0v40zM0 157v40h399730v-40zm0 194v40h399730v-40z",leftarrow:"M400000 241H110l3-3c68.7-52.7 113.7-120\n 135-202 4-14.7 6-23 6-25 0-7.3-7-11-21-11-8 0-13.2.8-15.5 2.5-2.3 1.7-4.2 5.8\n-5.5 12.5-1.3 4.7-2.7 10.3-4 17-12 48.7-34.8 92-68.5 130S65.3 228.3 18 247\nc-10 4-16 7.7-18 11 0 8.7 6 14.3 18 17 47.3 18.7 87.8 47 121.5 85S196 441.3 208\n 490c.7 2 1.3 5 2 9s1.2 6.7 1.5 8c.3 1.3 1 3.3 2 6s2.2 4.5 3.5 5.5c1.3 1 3.3\n 1.8 6 2.5s6 1 10 1c14 0 21-3.7 21-11 0-2-2-10.3-6-25-20-79.3-65-146.7-135-202\n l-3-3h399890zM100 241v40h399900v-40z",leftbrace:"M6 548l-6-6v-35l6-11c56-104 135.3-181.3 238-232 57.3-28.7 117\n-45 179-50h399577v120H403c-43.3 7-81 15-113 26-100.7 33-179.7 91-237 174-2.7\n 5-6 9-10 13-.7 1-7.3 1-20 1H6z",leftbraceunder:"M0 6l6-6h17c12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13\n 35.313 51.3 80.813 93.8 136.5 127.5 55.688 33.7 117.188 55.8 184.5 66.5.688\n 0 2 .3 4 1 18.688 2.7 76 4.3 172 5h399450v120H429l-6-1c-124.688-8-235-61.7\n-331-161C60.687 138.7 32.312 99.3 7 54L0 41V6z",leftgroup:"M400000 80\nH435C64 80 168.3 229.4 21 260c-5.9 1.2-18 0-18 0-2 0-3-1-3-3v-38C76 61 257 0\n 435 0h399565z",leftgroupunder:"M400000 262\nH435C64 262 168.3 112.6 21 82c-5.9-1.2-18 0-18 0-2 0-3 1-3 3v38c76 158 257 219\n 435 219h399565z",leftharpoon:"M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3\n-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5\n-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7\n-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40z",leftharpoonplus:"M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3-3.3 10.2-9.5\n 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5-18.3 3-21-1.3\n-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7-196 228-6.7 4.7\n-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40zM0 435v40h400000v-40z\nm0 0v40h400000v-40z",leftharpoondown:"M7 241c-4 4-6.333 8.667-7 14 0 5.333.667 9 2 11s5.333\n 5.333 12 10c90.667 54 156 130 196 228 3.333 10.667 6.333 16.333 9 17 2 .667 5\n 1 9 1h5c10.667 0 16.667-2 18-6 2-2.667 1-9.667-3-21-32-87.333-82.667-157.667\n-152-211l-3-3h399907v-40zM93 281 H400000 v-40L7 241z",leftharpoondownplus:"M7 435c-4 4-6.3 8.7-7 14 0 5.3.7 9 2 11s5.3 5.3 12\n 10c90.7 54 156 130 196 228 3.3 10.7 6.3 16.3 9 17 2 .7 5 1 9 1h5c10.7 0 16.7\n-2 18-6 2-2.7 1-9.7-3-21-32-87.3-82.7-157.7-152-211l-3-3h399907v-40H7zm93 0\nv40h399900v-40zM0 241v40h399900v-40zm0 0v40h399900v-40z",lefthook:"M400000 281 H103s-33-11.2-61-33.5S0 197.3 0 164s14.2-61.2 42.5\n-83.5C70.8 58.2 104 47 142 47 c16.7 0 25 6.7 25 20 0 12-8.7 18.7-26 20-40 3.3\n-68.7 15.7-86 37-10 12-15 25.3-15 40 0 22.7 9.8 40.7 29.5 54 19.7 13.3 43.5 21\n 71.5 23h399859zM103 281v-40h399897v40z",leftlinesegment:"M40 281 V428 H0 V94 H40 V241 H400000 v40z\nM40 281 V428 H0 V94 H40 V241 H400000 v40z",leftmapsto:"M40 281 V448H0V74H40V241H400000v40z\nM40 281 V448H0V74H40V241H400000v40z",leftToFrom:"M0 147h400000v40H0zm0 214c68 40 115.7 95.7 143 167h22c15.3 0 23\n-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69-70-101l-7-8h399905v-40H95l7-8\nc28.7-32 52-65.7 70-101 10.7-23.3 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 265.3\n 68 321 0 361zm0-174v-40h399900v40zm100 154v40h399900v-40z",longequal:"M0 50 h400000 v40H0z m0 194h40000v40H0z\nM0 50 h400000 v40H0z m0 194h40000v40H0z",midbrace:"M200428 334\nc-100.7-8.3-195.3-44-280-108-55.3-42-101.7-93-139-153l-9-14c-2.7 4-5.7 8.7-9 14\n-53.3 86.7-123.7 153-211 199-66.7 36-137.3 56.3-212 62H0V214h199568c178.3-11.7\n 311.7-78.3 403-201 6-8 9.7-12 11-12 .7-.7 6.7-1 18-1s17.3.3 18 1c1.3 0 5 4 11\n 12 44.7 59.3 101.3 106.3 170 141s145.3 54.3 229 60h199572v120z",midbraceunder:"M199572 214\nc100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14\n 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3\n 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0\n-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z",oiintSize1:"M512.6 71.6c272.6 0 320.3 106.8 320.3 178.2 0 70.8-47.7 177.6\n-320.3 177.6S193.1 320.6 193.1 249.8c0-71.4 46.9-178.2 319.5-178.2z\nm368.1 178.2c0-86.4-60.9-215.4-368.1-215.4-306.4 0-367.3 129-367.3 215.4 0 85.8\n60.9 214.8 367.3 214.8 307.2 0 368.1-129 368.1-214.8z",oiintSize2:"M757.8 100.1c384.7 0 451.1 137.6 451.1 230 0 91.3-66.4 228.8\n-451.1 228.8-386.3 0-452.7-137.5-452.7-228.8 0-92.4 66.4-230 452.7-230z\nm502.4 230c0-111.2-82.4-277.2-502.4-277.2s-504 166-504 277.2\nc0 110 84 276 504 276s502.4-166 502.4-276z",oiiintSize1:"M681.4 71.6c408.9 0 480.5 106.8 480.5 178.2 0 70.8-71.6 177.6\n-480.5 177.6S202.1 320.6 202.1 249.8c0-71.4 70.5-178.2 479.3-178.2z\nm525.8 178.2c0-86.4-86.8-215.4-525.7-215.4-437.9 0-524.7 129-524.7 215.4 0\n85.8 86.8 214.8 524.7 214.8 438.9 0 525.7-129 525.7-214.8z",oiiintSize2:"M1021.2 53c603.6 0 707.8 165.8 707.8 277.2 0 110-104.2 275.8\n-707.8 275.8-606 0-710.2-165.8-710.2-275.8C311 218.8 415.2 53 1021.2 53z\nm770.4 277.1c0-131.2-126.4-327.6-770.5-327.6S248.4 198.9 248.4 330.1\nc0 130 128.8 326.4 772.7 326.4s770.5-196.4 770.5-326.4z",rightarrow:"M0 241v40h399891c-47.3 35.3-84 78-110 128\n-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20\n 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7\n 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85\n-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n 151.7 139 205zm0 0v40h399900v-40z",rightbrace:"M400000 542l\n-6 6h-17c-12.7 0-19.3-.3-20-1-4-4-7.3-8.3-10-13-35.3-51.3-80.8-93.8-136.5-127.5\ns-117.2-55.8-184.5-66.5c-.7 0-2-.3-4-1-18.7-2.7-76-4.3-172-5H0V214h399571l6 1\nc124.7 8 235 61.7 331 161 31.3 33.3 59.7 72.7 85 118l7 13v35z",rightbraceunder:"M399994 0l6 6v35l-6 11c-56 104-135.3 181.3-238 232-57.3\n 28.7-117 45-179 50H-300V214h399897c43.3-7 81-15 113-26 100.7-33 179.7-91 237\n-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1h17z",rightgroup:"M0 80h399565c371 0 266.7 149.4 414 180 5.9 1.2 18 0 18 0 2 0\n 3-1 3-3v-38c-76-158-257-219-435-219H0z",rightgroupunder:"M0 262h399565c371 0 266.7-149.4 414-180 5.9-1.2 18 0 18\n 0 2 0 3 1 3 3v38c-76 158-257 219-435 219H0z",rightharpoon:"M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3\n-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2\n-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58\n 69.2 92 94.5zm0 0v40h399900v-40z",rightharpoonplus:"M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3-3.7-15.3-11\n-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2-10.7 0-16.7\n 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58 69.2 92 94.5z\nm0 0v40h399900v-40z m100 194v40h399900v-40zm0 0v40h399900v-40z",rightharpoondown:"M399747 511c0 7.3 6.7 11 20 11 8 0 13-.8 15-2.5s4.7-6.8\n 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3 8.5-5.8 9.5\n-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3-64.7 57-92 95\n-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 241v40h399900v-40z",rightharpoondownplus:"M399747 705c0 7.3 6.7 11 20 11 8 0 13-.8\n 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3\n 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3\n-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 435v40h399900v-40z\nm0-194v40h400000v-40zm0 0v40h400000v-40z",righthook:"M399859 241c-764 0 0 0 0 0 40-3.3 68.7-15.7 86-37 10-12 15-25.3\n 15-40 0-22.7-9.8-40.7-29.5-54-19.7-13.3-43.5-21-71.5-23-17.3-1.3-26-8-26-20 0\n-13.3 8.7-20 26-20 38 0 71 11.2 99 33.5 0 0 7 5.6 21 16.7 14 11.2 21 33.5 21\n 66.8s-14 61.2-42 83.5c-28 22.3-61 33.5-99 33.5L0 241z M0 281v-40h399859v40z",rightlinesegment:"M399960 241 V94 h40 V428 h-40 V281 H0 v-40z\nM399960 241 V94 h40 V428 h-40 V281 H0 v-40z",rightToFrom:"M400000 167c-70.7-42-118-97.7-142-167h-23c-15.3 0-23 .3-23\n 1 0 1.3 5.3 13.7 16 37 18 35.3 41.3 69 70 101l7 8H0v40h399905l-7 8c-28.7 32\n-52 65.7-70 101-10.7 23.3-16 35.7-16 37 0 .7 7.7 1 23 1h23c24-69.3 71.3-125 142\n-167z M100 147v40h399900v-40zM0 341v40h399900v-40z",twoheadleftarrow:"M0 167c68 40\n 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69\n-70-101l-7-8h125l9 7c50.7 39.3 85 86 103 140h46c0-4.7-6.3-18.7-19-42-18-35.3\n-40-67.3-66-96l-9-9h399716v-40H284l9-9c26-28.7 48-60.7 66-96 12.7-23.333 19\n-37.333 19-42h-46c-18 54-52.3 100.7-103 140l-9 7H95l7-8c28.7-32 52-65.7 70-101\n 10.7-23.333 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 71.3 68 127 0 167z",twoheadrightarrow:"M400000 167\nc-68-40-115.7-95.7-143-167h-22c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7 16 37 18 35.3\n 41.3 69 70 101l7 8h-125l-9-7c-50.7-39.3-85-86-103-140h-46c0 4.7 6.3 18.7 19 42\n 18 35.3 40 67.3 66 96l9 9H0v40h399716l-9 9c-26 28.7-48 60.7-66 96-12.7 23.333\n-19 37.333-19 42h46c18-54 52.3-100.7 103-140l9-7h125l-7 8c-28.7 32-52 65.7-70\n 101-10.7 23.333-16 35.7-16 37 0 .7 7.7 1 23 1h22c27.3-71.3 75-127 143-167z",widetilde1:"M200 55.538c-77 0-168 73.953-177 73.953-3 0-7\n-2.175-9-5.437L2 97c-1-2-2-4-2-6 0-4 2-7 5-9l20-12C116 12 171 0 207 0c86 0\n 114 68 191 68 78 0 168-68 177-68 4 0 7 2 9 5l12 19c1 2.175 2 4.35 2 6.525 0\n 4.35-2 7.613-5 9.788l-19 13.05c-92 63.077-116.937 75.308-183 76.128\n-68.267.847-113-73.952-191-73.952z",widetilde2:"M344 55.266c-142 0-300.638 81.316-311.5 86.418\n-8.01 3.762-22.5 10.91-23.5 5.562L1 120c-1-2-1-3-1-4 0-5 3-9 8-10l18.4-9C160.9\n 31.9 283 0 358 0c148 0 188 122 331 122s314-97 326-97c4 0 8 2 10 7l7 21.114\nc1 2.14 1 3.21 1 4.28 0 5.347-3 9.626-7 10.696l-22.3 12.622C852.6 158.372 751\n 181.476 676 181.476c-149 0-189-126.21-332-126.21z",widetilde3:"M786 59C457 59 32 175.242 13 175.242c-6 0-10-3.457\n-11-10.37L.15 138c-1-7 3-12 10-13l19.2-6.4C378.4 40.7 634.3 0 804.3 0c337 0\n 411.8 157 746.8 157 328 0 754-112 773-112 5 0 10 3 11 9l1 14.075c1 8.066-.697\n 16.595-6.697 17.492l-21.052 7.31c-367.9 98.146-609.15 122.696-778.15 122.696\n -338 0-409-156.573-744-156.573z",widetilde4:"M786 58C457 58 32 177.487 13 177.487c-6 0-10-3.345\n-11-10.035L.15 143c-1-7 3-12 10-13l22-6.7C381.2 35 637.15 0 807.15 0c337 0 409\n 177 744 177 328 0 754-127 773-127 5 0 10 3 11 9l1 14.794c1 7.805-3 13.38-9\n 14.495l-20.7 5.574c-366.85 99.79-607.3 139.372-776.3 139.372-338 0-409\n -175.236-744-175.236z",vec:"M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5\n3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11\n10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63\n-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1\n-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59\nH213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359\nc-16-25.333-24-45-24-59z",widehat1:"M529 0h5l519 115c5 1 9 5 9 10 0 1-1 2-1 3l-4 22\nc-1 5-5 9-11 9h-2L532 67 19 159h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13z",widehat2:"M1181 0h2l1171 176c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 220h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",widehat3:"M1181 0h2l1171 236c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 280h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",widehat4:"M1181 0h2l1171 296c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 340h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",widecheck1:"M529,159h5l519,-115c5,-1,9,-5,9,-10c0,-1,-1,-2,-1,-3l-4,-22c-1,\n-5,-5,-9,-11,-9h-2l-512,92l-513,-92h-2c-5,0,-9,4,-11,9l-5,22c-1,6,2,12,8,13z",widecheck2:"M1181,220h2l1171,-176c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,153l-1167,-153h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",widecheck3:"M1181,280h2l1171,-236c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,213l-1167,-213h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",widecheck4:"M1181,340h2l1171,-296c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,273l-1167,-273h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",baraboveleftarrow:"M400000 620h-399890l3 -3c68.7 -52.7 113.7 -120 135 -202\nc4 -14.7 6 -23 6 -25c0 -7.3 -7 -11 -21 -11c-8 0 -13.2 0.8 -15.5 2.5\nc-2.3 1.7 -4.2 5.8 -5.5 12.5c-1.3 4.7 -2.7 10.3 -4 17c-12 48.7 -34.8 92 -68.5 130\ns-74.2 66.3 -121.5 85c-10 4 -16 7.7 -18 11c0 8.7 6 14.3 18 17c47.3 18.7 87.8 47\n121.5 85s56.5 81.3 68.5 130c0.7 2 1.3 5 2 9s1.2 6.7 1.5 8c0.3 1.3 1 3.3 2 6\ns2.2 4.5 3.5 5.5c1.3 1 3.3 1.8 6 2.5s6 1 10 1c14 0 21 -3.7 21 -11\nc0 -2 -2 -10.3 -6 -25c-20 -79.3 -65 -146.7 -135 -202l-3 -3h399890z\nM100 620v40h399900v-40z M0 241v40h399900v-40zM0 241v40h399900v-40z",rightarrowabovebar:"M0 241v40h399891c-47.3 35.3-84 78-110 128-16.7 32\n-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20 11 8 0\n13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7 39\n-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85-40.5\n-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n151.7 139 205zm96 379h399894v40H0zm0 0h399904v40H0z",baraboveshortleftharpoon:"M507,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11\nc1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17\nc2,0.7,5,1,9,1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21\nc-32,-87.3,-82.7,-157.7,-152,-211c0,0,-3,-3,-3,-3l399351,0l0,-40\nc-398570,0,-399437,0,-399437,0z M593 435 v40 H399500 v-40z\nM0 281 v-40 H399908 v40z M0 281 v-40 H399908 v40z",rightharpoonaboveshortbar:"M0,241 l0,40c399126,0,399993,0,399993,0\nc4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,\n-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6\nc-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z\nM0 241 v40 H399908 v-40z M0 475 v-40 H399500 v40z M0 475 v-40 H399500 v40z",shortbaraboveleftharpoon:"M7,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11\nc1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17c2,0.7,5,1,9,\n1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21c-32,-87.3,-82.7,-157.7,\n-152,-211c0,0,-3,-3,-3,-3l399907,0l0,-40c-399126,0,-399993,0,-399993,0z\nM93 435 v40 H400000 v-40z M500 241 v40 H400000 v-40z M500 241 v40 H400000 v-40z",shortrightharpoonabovebar:"M53,241l0,40c398570,0,399437,0,399437,0\nc4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,\n-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6\nc-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z\nM500 241 v40 H399408 v-40z M500 435 v40 H400000 v-40z"};function u(e){let t="",i="";for(const a of e)/[a-zA-Z*]/.test(a[0])&&(i+=t),t=/\\[a-zA-Z]+\*?$/.test(a)?" ":"",i+=a;return i}function f(e){return u(e.map(e=>{var t;return null!==(t={"<space>":" ","<$$>":"$$","<$>":"$","<{>":"{","<}>":"}"}[e])&&void 0!==t?t:e}))}function g(e,t){const i=[];let a,r=[];return e.forEach(e=>{if("first"!==e.type){let s;"variant"===t?(s=e.variant,e.variantStyle&&"up"!==e.variantStyle&&(s+="-"+e.variantStyle)):s=e[t],s!==a?(r.length>0&&i.push(r),r=[e],a=s):r.push(e);}}),r.length>0&&i.push(r),i}const y={};function b(e,t){y[e]={...t};}const v=["","mord","mbin","mop","mrel","mopen","mclose","mpunct","minner","spacing","first","command","error","placeholder","textord","none"];function x(e){return v.includes(e)}const k={"mord+mop":3,"mord+mbin":4,"mord+mrel":5,"mord+minner":3,"mop+mord":3,"mop+mop":3,"mop+mbin":5,"mop+minner":3,"mbin+mord":4,"mbin+mop":4,"mbin+mopen":4,"mbin+minner":4,"mrel+mord":5,"mrel+mop":5,"mrel+mopen":5,"mrel+minner":5,"mclose+mop":3,"mclose+mbin":4,"mclose+mrel":5,"mclose+minner":3,"mpunct+mord":3,"mpunct+mop":3,"mpunct+mbin":4,"mpunct+mrel":5,"mpunct+mopen":3,"mpunct+mpunct":3,"mpunct+minner":3},_={"mord+mop":3,"mop+mord":3,"mop+mop":3,"mclose+mop":3,"minner+mop":3};function w(t){if("string"==typeof t)return t;if("number"==typeof t)return Number(Math.ceil(100*t)/100).toString();if(void 0===t)return "";if(e(t)){let e="";for(const i of t)e+=w(i);return e}return ""}class M{constructor(t,i="",a=""){this.classes=i,e(t)?this.children=[].concat(...t):"string"==typeof t?this.body=t:t&&"object"==typeof t&&(this.children=[t]),this.type=a,this.style=null,this.updateDimensions();}updateDimensions(){let e=0,t=0,i=1;this.children?this.children.forEach(a=>{a.height>e&&(e=a.height),a.depth>t&&(t=a.depth),a.maxFontSize>i&&(i=a.maxFontSize);}):"string"==typeof this.body&&(e=1.2,t=0),this.height=e,this.depth=t,this.maxFontSize=i;}selected(e){e&&!/ML__selected/.test(this.classes)&&(this.classes.length>0&&(this.classes+=" "),this.classes+="ML__selected"),!e&&/ML__selected/.test(this.classes)&&(this.classes=this.classes.replace("ML__selected","")),this.children&&this.children.forEach(t=>t.selected(e));}applyStyle(e){if(!e)return;if(e.color&&("none"!==e.color?this.setStyle("color",e.color):this.setStyle("color","")),e.backgroundColor&&("none"!==e.backgroundColor?this.setStyle("background-color",e.backgroundColor):this.setStyle("background-color","")),e.cssClass&&(this.classes+=" "+e.cssClass),!this.body)return;const t=function(e,t){var i;return (null===(i=y[t.mode])||void 0===i?void 0:i.applyStyle)?y[t.mode].applyStyle(e,t):""}(this,e);if(this.body&&t){this.maxFontSize={size1:.5,size2:.7,size3:.8,size4:.9,size5:1,size6:1.2,size7:1.44,size8:1.73,size9:2.07,size10:2.49}[e.fontSize]||1,this.height=0,this.depth=0,this.skew=0,this.italic=0;for(let e=0;e<this.body.length;e++){const i=s(this.body.charAt(e),t);i&&(this.height=Math.max(this.height,i.height),this.depth=Math.max(this.depth,i.depth),this.skew=i.skew,this.italic=i.italic);}}}setStyle(e,...t){const i=w(t);i.length>0&&(this.style||(this.style={}),this.style[e]=i);}setTop(e){e&&0!==e&&(this.style||(this.style={}),this.style.top=w(e)+"em",this.height-=e,this.depth+=e);}setLeft(e){e&&0!==e&&(this.style||(this.style={}),this.style["margin-left"]=w(e)+"em");}setRight(e){e&&0!==e&&(this.style||(this.style={}),this.style["margin-right"]=w(e)+"em");}setWidth(e){e&&0!==e&&(this.style||(this.style={}),this.style.width=w(e)+"em");}toMarkup(e=1,t=1){var i,a,r,s,o;let n="",l=this.body||"";if(this.children){let e="none";for(let r=0;r<this.children.length;r++){const s=this.children[r];let o=0;const n=z(this.children,r),c=e+"+"+n;o=s.isTight?null!==(i=_[c])&&void 0!==i?i:0:null!==(a=k[c])&&void 0!==a?a:0,l+=s.toMarkup(o,t),e=n;}}if("​"!==l&&(l||this.svgBody)||this.classes&&"ML__selected"!==this.classes||this.cssId||this.style||this.svgOverlay){n="<span",this.cssId&&(n+=' id="'+this.cssId+'" '),this.attributes&&(n+=" "+Object.keys(this.attributes).map(e=>`${e}="${this.attributes[e]}"`).join(" "));const t=this.classes.split(" ");t.push(null!==(r={command:"ML__command",placeholder:"ML__placeholder",error:"ML__error"}[this.type])&&void 0!==r?r:""),this.caret&&"command"===this.type&&t.push("ML__command-caret");let i="";if(i=t.length>1?t.filter((e,t,i)=>e.length>0&&i.indexOf(e)===t).join(" "):t[0],i.length>0&&(n+=` class="${i}"`),e&&((null===(s=this.style)||void 0===s?void 0:s["margin-left"])?this.style["margin-left"]=w(parseFloat(this.style["margin-left"])+e/18)+"em":(this.style||(this.style={}),this.style["margin-left"]=w(e/18)+"em")),this.style){let e="";const t=/ML__selected/.test(this.classes);for(const i in this.style)Object.prototype.hasOwnProperty.call(this.style,i)&&("background-color"===i&&t||(e+=i+":"+this.style[i]+";"));e.length>0&&(n+=' style="'+e+'"');}n+=">",this.svgBody?n+=function(e){if(h[e]){const t=h[e][2];return `<span style="height:${t}em;min-width:0"><span class="stretchy" style="height:${t}em"><svg width="100%" height="${t}em"viewBox="0 0 ${h[e][0]} ${h[e][1]}"preserveAspectRatio="none"><path d="${p$1[e]}"></path></svg></span></span>`}const[t,i,a,r]=m[e];let s,o;const n=a/1e3;3===t.length?(s=["slice-1-of-3","slice-2-of-3","slice-3-of-3"],o=["xMinYMin","xMidYMin","xMaxYMin"]):2===t.length?(s=["slice-1-of-2","slice-2-of-2"],o=["xMinYMin","xMaxYMin"]):(s=["slice-1-of-1"],o=[r]);const l=t.map((e,t)=>`<span class="${s[t]}" style="height:${n}em"><svg width="400em" height="${n}em"viewBox="0 0 400000 ${a}"preserveAspectRatio="${o[t]} slice"><path d="${p$1[e]}"></path></svg></span>`).join("");return `<span style="height:${n}em;min-width:${i}em;display:inline-block;">${l}</span>`}(this.svgBody):this.svgOverlay?(n+='<span style="',n+="display: inline-block;",n+="height:"+(this.height+this.depth)+"em;",n+="vertical-align:"+this.depth+"em;",n+='">',n+=l,n+="</span>",n+="<svg ",n+='style="position:absolute;',n+="overflow:overlay;",n+="height:"+(this.height+this.depth)+"em;",(null===(o=this.style)||void 0===o?void 0:o.padding)?(n+="top:"+this.style.padding+";",n+="left:"+this.style.padding+";",n+="width:calc(100% - 2 * "+this.style.padding+" );"):(n+="top:0;",n+="left:0;",n+="width:100%;"),n+="z-index:2;",n+='"',this.svgStyle&&(n+=' style="'+this.svgStyle+'"'),n+=">",n+=this.svgOverlay,n+="</svg>"):n+=l,n+="</span>";}else n="";return this.caret&&"command"!==this.type&&("text"===this.caret?n+='<span class="ML__text-caret"></span>':n+='<span class="ML__caret"></span>'),n}tryCoalesceWith(e){if(this.type!==e.type)return !1;if("error"===this.type||"placeholder"===this.type||"command"===this.type)return !1;if(this.svgBody||!this.body)return !1;if(e.svgBody||!e.body)return !1;const t=this.children&&this.children.length>0,i=e.children&&e.children.length>0;if(t||i)return !1;if((this.style?this.style.length:0)!==(e.style?e.style.length:0))return !1;const a=this.classes.trim().replace(/\s+/g," ").split(" "),r=e.classes.trim().replace(/\s+/g," ").split(" ");if(a.length!==r.length)return !1;a.sort(),r.sort();for(let e=0;e<a.length;e++){if("vertical-separator"===a[e])return !1;if(a[e]!==r[e])return !1}if(this.style&&e.style)for(const t in this.style)if(Object.prototype.hasOwnProperty.call(this.style,t)&&Object.prototype.hasOwnProperty.call(e.style,t)&&this.style[t]!==e.style[t])return !1;return this.body+=e.body,this.height=Math.max(this.height,e.height),this.depth=Math.max(this.depth,e.depth),this.maxFontSize=Math.max(this.maxFontSize,e.maxFontSize),this.italic=e.italic,!0}}function z(e,t){var i,a,r,s,o;if(t<0||t>=e.length)return "none";const n=null!==(a=null===(i=e[t-1])||void 0===i?void 0:i.type)&&void 0!==a?a:"none",l=null!==(s=null===(r=e[t+1])||void 0===r?void 0:r.type)&&void 0!==s?s:"none";let c=null!==(o=e[t].type)&&void 0!==o?o:"none";return "first"===c?"none":"textord"===c?"mord":("mbin"===c&&(/first|none|mrel|mpunct|mopen|mbin|mop/.test(n)||/none|mrel|mpunct|mclose/.test(l))&&(c="mord"),c)}function L(t){return t?e(t)?t.reduce((e,t)=>Math.max(e,t.height),0):t.height:0}function S(t){return t?e(t)?t.reduce((e,t)=>Math.max(e,t.depth),0):t.depth:0}function C(t){return t?e(t)?t[t.length-1].italic:t.italic:0}function A(t,i="",a=""){if(e(t)){const e=t.filter(e=>!!e);return 1===e.length?new M(e[0],i,a):new M(e,i,a)}return new M(t,i,a)}function $(e,t,i="",a=""){const r=new M(t,i,a),o=s(t,e);return r.height=o.height,r.depth=o.depth,r.skew=o.skew,r.italic=o.italic,r.setRight(r.italic),r}function D(t,i="",a=""){const r=A("","ML__strut");let s,o;return r.setStyle("height",L(t),"em"),0!==S(t)&&(s=A("","ML__strut--bottom"),s.setStyle("height",L(t)+S(t),"em"),s.setStyle("vertical-align",-S(t),"em")),o=e(t)?[r,s,...t]:[r,s,t],A(o,i,a)}function q(e,t,i,a,r){r=r||"";const s=T(t,(r+=" style-wrap ")+i.adjustTo(a));s.type=e;const o=a.sizeMultiplier/i.sizeMultiplier;return s.height*=o,s.depth*=o,s.maxFontSize=a.sizeMultiplier,s}function T(e,t="",i=""){const a=new M(e,t,i);let r=1;return r=e instanceof M?e.maxFontSize:e.reduce((e,t)=>Math.max(e,t.maxFontSize),r),a.height*=r,a.depth*=r,a}function K(t,i,a="shift",r=0){let s=0,o=0;a=a||"shift";for(let t=0;t<i.length;t++)e(i[t])&&(1===i[t].length?i[t]=i[t][0]:i[t]=A(i[t]));if("shift"===a)s=-i[0].depth-r;else if("bottom"===a)s=-r;else if("top"===a){let e=r;for(const t of i)t instanceof M?e-=t.height+t.depth:"number"==typeof t&&(e-=t);s=e;}else if("individualShift"===a){const e=i;i=[e[0]],s=-e[1]-e[0].depth,o=s;for(let t=2;t<e.length;t+=2){const a=-e[t+1]-o-e[t].depth;o+=a;const r=a-(e[t-2].height+e[t-2].depth);i.push(r),i.push(e[t]);}}let n=1;for(const e of i)e instanceof M&&(n=Math.max(n,e.maxFontSize));const l=function(e,t){const i=t?t/e.mathstyle.sizeMultiplier:0,a=new M("​");return a.depth=0,a.height=0,1!==i&&(a.setStyle("font-size",i,i>0?"em":""),a.attributes={"aria-hidden":"true"}),"size5"!==e.size?new M(a,"fontsize-ensurer reset-"+e.size+" size5"):0!==i?a:null}(t,n),c=[];o=s;for(const e of i)if("number"==typeof e)o+=e;else if(e instanceof M){const t=A([l,e]);t.setTop(-e.depth-o),c.push(t),o+=e.height+e.depth;}const d=A(c,"vlist");return d.depth=Math.max(s,S(d)||0),d.height=Math.max(-o,L(d)||0),d}function E(e){const t=new M(null);return t.svgBody=e,t.height=function(e){return m[e]?m[e][2]/1e3:h[e][2]}(e)/2,t.depth=t.height,t}const N={},F={"<":"<",">":">",o:"o","&":"\\&","{":"\\{","}":"\\}","[":"\\lbrack","]":"\\rbrack",":":"\\colon"," ":"~","¬":"\\neg","·":"\\cdot","¼":"\\frac{1}{4}","½":"\\frac{1}{2}","¾":"\\frac{3}{4}","⁰":"^{0}","ⁱ":"^{i}","¹":"^{1}","²":"^{2}","³":"^{3}","†":"\\dagger","‡":"\\ddagger","…":"\\ldots","⁴":"^{4}","⁵":"^{5}","⁶":"^{6}","⁷":"^{7}","⁸":"^{8}","⁹":"^{9}","⁺":"^{+}","⁻":"^{-}","⁼":"^{=}","ⁿ":"^{n}","₀":"_{0}","₁":"_{1}","₂":"_{2}","₃":"_{3}","₄":"_{4}","₅":"_{5}","₆":"_{6}","₇":"_{7}","₈":"_{8}","₉":"_{9}","₊":"_{+}","₋":"_{-}","₌":"_{=}","ₐ":"_{a}","ₑ":"_{e}","ₒ":"_{o}","ₓ":"_{x}","′":"\\prime","'":"\\prime","←":"\\gets","→":"\\to","△":"\\triangle","▽":"\\triangledown","∋":"\\owns","∗":"\\ast","∣":"\\vert","∥":"\\Vert","∧":"\\land","∨":"\\lor","⋅":"\\cdot","⋈":"\\bowtie","≠":"\\ne","≤":"\\le","≥":"\\ge","⊥":"\\bot","⟷":"\\biconditional","⟸":"\\impliedby","⟹":"\\implies","ℂ":"\\C","ℕ":"\\N","ℙ":"\\P","ℚ":"\\Q","ℝ":"\\R","ℤ":"\\Z"},B={},O={},R={iff:"\\;⟺\\;",nicefrac:"^{#1}\\!\\!/\\!_{#2}",bra:"\\mathinner{\\langle{#1}|}",ket:"\\mathinner{|{#1}\\rangle}",braket:"\\mathinner{\\langle{#1}\\rangle}",set:"\\mathinner{\\lbrace #1 \\rbrace}",Bra:"\\left\\langle #1\\right|",Ket:"\\left|#1\\right\\rangle",Braket:"\\left\\langle{#1}\\right\\rangle",Set:"\\left\\lbrace #1 \\right\\rbrace",rd:"\\mathrm{d}",rD:"\\mathrm{D}",doubleStruckCapitalN:"\\mathbb{N}",doubleStruckCapitalR:"\\mathbb{R}",doubleStruckCapitalQ:"\\mathbb{Q}",doubleStruckCapitalZ:"\\mathbb{Z}",doubleStruckCapitalP:"\\mathbb{P}",scriptCapitalE:"\\mathscr{E}",scriptCapitalH:"\\mathscr{H}",scriptCapitalL:"\\mathscr{L}",gothicCapitalC:"\\mathfrak{C}",gothicCapitalH:"\\mathfrak{H}",gothicCapitalI:"\\mathfrak{I}",gothicCapitalR:"\\mathfrak{R}",imaginaryI:"\\mathrm{i}",imaginaryJ:"\\mathrm{j}",exponentialE:"\\mathrm{e}",differentialD:"\\mathrm{d}",capitalDifferentialD:"\\mathrm{D}"},P={"(":")","{":"}","[":"]","|":"|","\\lbrace":"\\rbrace","\\{":"\\}","\\langle":"\\rangle","\\lfloor":"\\rfloor","\\lceil":"\\rceil","\\vert":"\\vert","\\lvert":"\\rvert","\\Vert":"\\Vert","\\lVert":"\\rVert","\\lbrack":"\\rbrack","\\ulcorner":"\\urcorner","\\llcorner":"\\lrcorner","\\lgroup":"\\rgroup","\\lmoustache":"\\rmoustache"},I={"\\#":"#","\\&":"&","\\$":"$","\\%":"%","\\_":"_","\\euro":"€","\\maltese":"✠","\\{":"{","\\}":"}","\\nobreakspace":" ","\\ldots":"…","\\textellipsis":"…","\\backslash":"\\","`":"‘","'":"’","``":"“","''":"”","\\degree":"°","\\textasciicircum":"^","\\textasciitilde":"~","\\textasteriskcentered":"*","\\textbackslash":"\\","\\textbraceleft":"{","\\textbraceright":"}","\\textbullet":"•","\\textdollar":"$","\\textsterling":"£","\\textdagger":"†","\\textdaggerdbl":"‡","–":"–","—":"—","‘":"‘","’":"’","“":"“","”":"”",'"':"”","\\ss":"ß","\\ae":"æ","\\oe":"œ","\\AE":"Æ","\\OE":"Œ","\\O":"Ø","\\i":"ı","\\j":"ȷ","\\aa":"å","\\AA":"Å"},H=/[a-zA-Z0-9!@*()-=+{}[\]\\';:?/.,~<>`|'$%#&^_" ]/,W="undefined"!=typeof navigator&&/firefox|edge|Trident/i.test(navigator.userAgent)?/[a-zA-ZаАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяĄąĆćĘęŁłŃńÓóŚśŹźŻżàâäôéèëêïîçùûüÿæœÀÂÄÔÉÈËÊÏÎŸÇÙÛÜÆŒäöüßÄÖÜẞàèéìíîòóùúÀÈÉÌÍÎÒÓÙÚáéíñóúüÁÉÍÑÓÚÜ]/:new RegExp("\\p{Letter}","u"),V="undefined"!=typeof navigator&&/firefox|edge|Trident/i.test(navigator.userAgent)?/[0-9a-zA-ZаАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяĄąĆćĘęŁłŃńÓóŚśŹźŻżàâäôéèëêïîçùûüÿæœÀÂÄÔÉÈËÊÏÎŸÇÙÛÜÆŒäöüßÄÖÜẞàèéìíîòóùúÀÈÉÌÍÎÒÓÙÚáéíñóúüÁÉÍÑÓÚÜ]/:new RegExp("[0-9\\p{Letter}]","u");function U(e,t,i="mord",a=""){N[e]={type:i,variant:a,value:t},F[t]||a||(F[t]=e),I[e]=t;}function j(e,t){for(let i=e;i<=t;i++){const e=String.fromCodePoint(i);U(e,e);}}function X(e,t){return "math"===e?F[t]||t:"text"===e&&Object.keys(I).find(e=>I[e]===t)||t}const Z={119893:8462,119965:8492,119968:8496,119969:8497,119971:8459,119972:8464,119975:8466,119976:8499,119981:8475,119994:8495,119996:8458,120004:8500,120070:8493,120075:8460,120076:8465,120085:8476,120093:8488,120122:8450,120127:8461,120133:8469,120135:8473,120136:8474,120137:8477,120145:8484},G=[{start:119808,len:26,offset:65,style:"bold"},{start:119834,len:26,offset:97,style:"bold"},{start:119860,len:26,offset:65,style:"italic"},{start:119886,len:26,offset:97,style:"italic"},{start:119912,len:26,offset:65,style:"bolditalic"},{start:119938,len:26,offset:97,style:"bolditalic"},{start:119964,len:26,offset:65,variant:"script"},{start:119990,len:26,offset:97,variant:"script"},{start:120016,len:26,offset:65,variant:"script",style:"bold"},{start:120042,len:26,offset:97,variant:"script",style:"bold"},{start:120068,len:26,offset:65,variant:"fraktur"},{start:120094,len:26,offset:97,variant:"fraktur"},{start:120172,len:26,offset:65,variant:"fraktur",style:"bold"},{start:120198,len:26,offset:97,variant:"fraktur",style:"bold"},{start:120120,len:26,offset:65,variant:"double-struck"},{start:120146,len:26,offset:97,variant:"double-struck"},{start:120224,len:26,offset:65,variant:"sans-serif"},{start:120250,len:26,offset:97,variant:"sans-serif"},{start:120276,len:26,offset:65,variant:"sans-serif",style:"bold"},{start:120302,len:26,offset:97,variant:"sans-serif",style:"bold"},{start:120328,len:26,offset:65,variant:"sans-serif",style:"italic"},{start:120354,len:26,offset:97,variant:"sans-serif",style:"italic"},{start:120380,len:26,offset:65,variant:"sans-serif",style:"bolditalic"},{start:120406,len:26,offset:97,variant:"sans-serif",style:"bolditalic"},{start:120432,len:26,offset:65,variant:"monospace"},{start:120458,len:26,offset:97,variant:"monospace"},{start:120488,len:25,offset:913,style:"bold"},{start:120514,len:25,offset:945,style:"bold"},{start:120546,len:25,offset:913,style:"italic"},{start:120572,len:25,offset:945,style:"italic"},{start:120604,len:25,offset:913,style:"bolditalic"},{start:120630,len:25,offset:945,style:"bolditalic"},{start:120662,len:25,offset:913,variant:"sans-serif",style:"bold"},{start:120688,len:25,offset:945,variant:"sans-serif",style:"bold"},{start:120720,len:25,offset:913,variant:"sans-serif",style:"bolditalic"},{start:120746,len:25,offset:945,variant:"sans-serif",style:"bolditalic"},{start:120782,len:10,offset:48,variant:"",style:"bold"},{start:120792,len:10,offset:48,variant:"double-struck"},{start:120803,len:10,offset:48,variant:"sans-serif"},{start:120812,len:10,offset:48,variant:"sans-serif",style:"bold"},{start:120822,len:10,offset:48,variant:"monospace"}];function Y(e,t,i){if(!/[A-Za-z0-9]/.test(e))return e;if(!t&&!i)return e;const a=e.codePointAt(0);for(let e=0;e<G.length;e++)if((!t||G[e].variant===t)&&(!i||G[e].style===i)&&a>=G[e].offset&&a<G[e].offset+G[e].len){const t=G[e].start+a-G[e].offset;return String.fromCodePoint(Z[t]||t)}return e}function J(e,t){if("text"===e)return X(e,t)||t;let i;if(i=X(e,t),i)return i;const a=function(e){var t;if((e<119808||e>120831)&&(e<8448||e>8527))return {char:String.fromCodePoint(e)};for(const i in Z)if(Object.prototype.hasOwnProperty.call(Z,i)&&Z[i]===e){e=null!==(t=i.codePointAt(0))&&void 0!==t?t:0;break}for(let t=0;t<G.length;t++)if(e>=G[t].start&&e<G[t].start+G[t].len)return {char:String.fromCodePoint(e-G[t].start+G[t].offset),variant:G[t].variant,style:G[t].style};return {char:String.fromCodePoint(e)}}(t.codePointAt(0));return a.style||a.variant?(i=a.char,a.variant&&(i="\\"+a.variant+"{"+i+"}"),"bold"===a.style?i="\\mathbf{"+i+"}":"italic"===a.style?i="\\mathit{"+i+"}":"bolditalic"===a.style&&(i="\\mathbfit{"+i+"}"),"\\mathord{"+i+"}"):""}function Q(e,t){let i="",a=!1;for(const r of t){a&&(i+="text"===e?"{}":" "),a=!1;const t=J(e,r);t?(i+=t,a=/\\[a-zA-Z0-9]+\*?$/.test(t)):i+=r;}return i}function ee(e,t){var i,a;return "math"===e?null!==(a=null===(i=N[t])||void 0===i?void 0:i.value)&&void 0!==a?a:t:I[t]?I[t]:t}function te(e,t,i,a){var r,s,o;return (null===(r=B[e])||void 0===r?void 0:r.emit)?B[e].emit(e,t,i,a):N[e]||I[e]?e:i.body&&1===(null===(o=null===(s=B[e])||void 0===s?void 0:s.params)||void 0===o?void 0:o.length)?e+"{"+a(i,i.body)+"}":e}function ie(e){var t;return null!==(t=O[e])&&void 0!==t?t:null}function ae(e,t,i){if(!e||0===e.length)return null;let a=null;if("\\"===e.charAt(0)){if(a=B[e],a)return a;if("math"===t?a=N[e]:I[e]&&(a={value:I[e]}),!a){const t=e.slice(1);if(null==i?void 0:i[t]){let e=i[t];"object"==typeof e&&(e=e.def);let r=0;for(/(^|[^\\])#1/.test(e)&&(r=1),/(^|[^\\])#2/.test(e)&&(r=2),/(^|[^\\])#3/.test(e)&&(r=3),/(^|[^\\])#4/.test(e)&&(r=4),/(^|[^\\])#5/.test(e)&&(r=5),/(^|[^\\])#6/.test(e)&&(r=6),/(^|[^\\])#7/.test(e)&&(r=7),/(^|[^\\])#8/.test(e)&&(r=8),/(^|[^\\])#9/.test(e)&&(r=9),a={type:"group",mode:"math",params:[],infix:!1};r>=1;)a.params.push({isOptional:!1,type:"math"}),r-=1;}}}else "math"===t?a=N[e]:I[e]&&(a={value:I[e]});return !a||"mord"!==a.type||"f"!==a.value&&"g"!==a.value&&"h"!==a.value||(a.isFunction=!0),a}function re(e){if(e.length<=1)return [];const t=[];for(const i in B)Object.prototype.hasOwnProperty.call(B,i)&&i.startsWith(e)&&!B[i].infix&&t.push({match:i,frequency:B[i].frequency});for(const i in N)Object.prototype.hasOwnProperty.call(N,i)&&i.startsWith(e)&&t.push({match:i,frequency:N[i].frequency});return t.sort((e,t)=>e.frequency===t.frequency?e.match.length-t.match.length:(t.frequency||0)-(e.frequency||0)),t}function se(e){let t="auto";const i=e.match(/:([^=]+)/);return i&&(t=i[1].trim()),t}function oe(e){if(!e)return [];let t=[],i=e.split("]");if("["===i[0].charAt(0)){t.push({isOptional:!0,type:se(i[0].slice(1))});for(let e=1;e<=i.length;e++)t=t.concat(oe(i[e]));}else if(i=e.split("}"),"{"===i[0].charAt(0)){t.push({isOptional:!1,type:se(i[0].slice(1))});for(let e=1;e<=i.length;e++)t=t.concat(oe(i[e]));}return t}function ne(e){let t="",i=!0;return e.forEach(e=>{"string"==typeof e.body?t+=e.body:i=!1;}),i?t:""}function le(e,t,i,a=!1){"string"==typeof e&&(e=[e]);const r={tabular:a,params:oe(t),parser:i};for(const t of e)O[t]=r;}function ce(e,t,i){le(e,t,i,!0);}function de(e,t,i,a,r){"string"==typeof e&&(e=[e]),i||(i={});const s={params:oe(t),mode:i.mode,infix:!!i.infix,parse:a,emit:r};e.forEach(e=>{B["\\"+e]=s;});}const me={acute:"ˊ",grave:"ˋ",dot:"˙",ddot:"¨",mathring:"˚",tilde:"~",bar:"ˉ",breve:"˘",check:"ˇ",hat:"^",vec:"⃗"};de(Object.keys(me),"{body:auto}",null,(function(e,t){return {type:"accent",accent:me[e.slice(1)],limits:"accent",skipBoundary:!0,body:t[0]}})),de(["widehat","widecheck","widetilde"],"{body:auto}",null,(e,t)=>{const i=ne(t[0]);return {type:"accent",svgAccent:e.slice(1)+(i.length>5?"4":["1","1","2","2","3","3"][i.length]),limits:"accent",skipBoundary:!0,body:t[0]}}),de("utilde","{body:auto}",null,(e,t)=>{const i=ne(t[0]),a="widetilde"+(i.length>5?"4":["1","1","2","2","3","3"][i.length]);return {type:"overunder",body:t[0],svgBelow:a,skipBoundary:!0}},(e,t,i,a)=>`\\utilde{${a(i,i.body)}}`),de("^","{:string}",{},(e,t)=>({type:"mord",limits:"nolimits",isSymbol:!0,isFunction:!1,body:t[0]&&{a:"â",e:"ê",i:"î",o:"ô",u:"û",A:"Â",E:"Ê",I:"Î",O:"Ô",U:"Û"}[t[0]]||"^"})),de("`","{:string}",{},(e,t)=>({type:"mord",limits:"nolimits",isSymbol:!0,isFunction:!1,body:t[0]&&{a:"à",e:"è",i:"ì",o:"ò",u:"ù",A:"À",E:"È",I:"Ì",O:"Ò",U:"Ù"}[t[0]]||"`"})),de("'","{:string}",{},(function(e,t){return {type:"mord",limits:"nolimits",isSymbol:!0,isFunction:!1,body:t[0]&&{a:"á",e:"é",i:"í",o:"ó",u:"ú",A:"Á",E:"É",I:"Í",O:"Ó",U:"Ú"}[t[0]]||"^"}})),de("~","{:string}",{},(e,t)=>({type:"mord",limits:"nolimits",isSymbol:!0,isFunction:!1,body:t[0]&&{n:"ñ",N:"Ñ",a:"ã",o:"õ",A:"Ã",O:"Õ"}[t[0]]||"´"})),de("c","{:string}",{},(e,t)=>({type:"mord",limits:"nolimits",isSymbol:!0,isFunction:!1,body:t[0]&&{c:"ç",C:"Ç"}[t[0]]||""})),de("enclose","{notation:string}[style:string]{body:auto}",null,(e,t)=>{const i={type:"enclose",strokeColor:"currentColor",strokeWidth:1,strokeStyle:"solid",backgroundcolor:"transparent",padding:"auto",shadow:"auto",captureSelection:!0,body:t[2]};if(t[1]){const e=t[1].split(/,(?![^(]*\)(?:(?:[^(]*\)){2})*[^"]*$)/);for(const t of e){const e=t.match(/\s*(\S+)\s+(\S+)\s+(.*)/);if(e)i.strokeWidth=n(e[1],"px"),isFinite(i.strokeWidth)||(i.strokeWidth=1),i.strokeStyle=e[2],i.strokeColor=e[3];else {const e=t.match(/\s*([a-z]*)\s*=\s*"(.*)"/);e&&("mathbackground"===e[1]?i.backgroundcolor=e[2]:"mathcolor"===e[1]?i.strokeColor=e[2]:"padding"===e[1]?i.padding=n(e[2],"px"):"shadow"===e[1]&&(i.shadow=e[2]));}}"dashed"===i.strokeStyle?i.svgStrokeStyle="5,5":"dotted"===i.strokeStyle&&(i.svgStrokeStyle="1,5");}return i.borderStyle=i.strokeWidth+"px "+i.strokeStyle+" "+i.strokeColor,i.notation={},t[0].split(/[, ]/).filter(e=>e.length>0).forEach(e=>{i.notation[e.toLowerCase()]=!0;}),i.notation.updiagonalarrow&&(i.notation.updiagonalstrike=!1),i.notation.box&&(i.notation.left=!1,i.notation.right=!1,i.notation.bottom=!1,i.notation.top=!1),i}),de("cancel","{body:auto}",null,(function(e,t){return {type:"enclose",strokeColor:"currentColor",strokeWidth:1,strokeStyle:"solid",borderStyle:"1px solid currentColor",backgroundcolor:"transparent",padding:"auto",shadow:"auto",notation:{updiagonalstrike:!0},body:t[0]}})),de("bcancel","{body:auto}",null,(function(e,t){return {type:"enclose",strokeColor:"currentColor",strokeWidth:1,strokeStyle:"solid",borderStyle:"1px solid currentColor",backgroundcolor:"transparent",padding:"auto",shadow:"auto",notation:{downdiagonalstrike:!0},body:t[0]}})),de("xcancel","{body:auto}",null,(function(e,t){return {type:"enclose",strokeColor:"currentColor",strokeWidth:1,strokeStyle:"solid",borderStyle:"1px solid currentColor",backgroundcolor:"transparent",padding:"auto",shadow:"auto",notation:{updiagonalstrike:!0,downdiagonalstrike:!0},body:t[0]}})),le("math","",()=>({mathstyle:"textstyle"})),le("displaymath","",(function(){return {mathstyle:"displaystyle"}})),ce("array","{columns:colspec}",(e,t)=>({colFormat:t[0],mathstyle:"textstyle"})),ce(["equation","equation","subequations"],"",()=>({colFormat:[{align:"c"}]})),ce("multline","",(function(){return {colFormat:[{align:"m"}]}})),ce(["align","align*","aligned","eqnarray"],"",(e,t,i)=>{let a=0;for(const e of i)a=Math.max(a,e.length);const r=[{gap:0},{align:"r"},{gap:0},{align:"l"}];let s=2;for(;s<a;)r.push({gap:1}),r.push({align:"r"}),r.push({gap:0}),r.push({align:"l"}),s+=2;return r.push({gap:0}),{arraycolsep:0,colFormat:r,jot:.3}}),ce("split","",()=>({colFormat:[{align:"r"},{align:"l"}]})),ce(["gather","gathered"],"",()=>({colFormat:[{gap:.25},{align:"c"},{gap:0}],jot:.3})),ce(["matrix","pmatrix","bmatrix","Bmatrix","vmatrix","Vmatrix","smallmatrix","matrix*","pmatrix*","bmatrix*","Bmatrix*","vmatrix*","Vmatrix*","smallmatrix*"],"[columns:colspec]",(e,t)=>{var i;const a={mathstyle:"textstyle"};switch(e){case"pmatrix":case"pmatrix*":a.leftDelim="(",a.rightDelim=")";break;case"bmatrix":case"bmatrix*":a.leftDelim="[",a.rightDelim="]";break;case"Bmatrix":case"Bmatrix*":a.leftDelim="\\lbrace",a.rightDelim="\\rbrace";break;case"vmatrix":case"vmatrix*":a.leftDelim="\\vert",a.rightDelim="\\vert";break;case"Vmatrix":case"Vmatrix*":a.leftDelim="\\Vert",a.rightDelim="\\Vert";break;case"smallmatrix":case"smallmatrix*":a.mathstyle="scriptstyle";break;case"matrix":case"matrix*":a.leftDelim=".",a.rightDelim=".";}return a.colFormat=null!==(i=t[0])&&void 0!==i?i:[{align:"c"},{align:"c"},{align:"c"},{align:"c"},{align:"c"},{align:"c"},{align:"c"},{align:"c"},{align:"c"},{align:"c"}],a}),ce("cases","",()=>({arraystretch:1.2,leftDelim:"\\lbrace",rightDelim:".",colFormat:[{align:"l"},{gap:1},{align:"l"}]})),le("center","",(function(){return {colFormat:[{align:"c"}]}})),de(["overrightarrow","overleftarrow","Overrightarrow","overleftharpoon","overrightharpoon","overleftrightarrow","overbrace","overlinesegment","overgroup"],"{:auto}",null,(e,t)=>({type:"overunder",body:t[0],svgAbove:e.slice(1),skipBoundary:!0,limits:"overunder"}),(e,t,i,a)=>`${e}{${a(i,i.body)}}`),de(["underrightarrow","underleftarrow","underleftrightarrow","underbrace","underlinesegment","undergroup"],"{:auto}",null,(e,t)=>({type:"overunder",body:t[0],svgBelow:e.slice(1),skipBoundary:!0,limits:"overunder"}),(e,t,i,a)=>`${e}{${a(i,i.body)}}`),de(["xrightarrow","xleftarrow","xRightarrow","xLeftarrow","xleftharpoonup","xleftharpoondown","xrightharpoonup","xrightharpoondown","xlongequal","xtwoheadleftarrow","xtwoheadrightarrow","xleftrightarrow","xLeftrightarrow","xrightleftharpoons","xleftrightharpoons","xhookleftarrow","xhookrightarrow","xmapsto","xtofrom","xrightleftarrows","xrightequilibrium","xleftequilibrium"],"[:auto]{:auto}",null,(e,t)=>({type:"overunder",mathtype:"mrel",svgBody:e.slice(1),overscript:t[1],underscript:t[0],skipBoundary:!0}),(e,t,i,a)=>e+(i.underscript?`[${a(i,i.underscript)}]`:"")+`{${a(i,i.overscript)}}`),de(["arccos","arcsin","arctan","arctg","arcctg","arg","ch","cos","cosh","cot","coth","ctg","cth","cotg","csc","cosec","deg","dim","exp","hom","inf","ker","lg","lb","lg","ln","log","Pr","sec","sh","sin","sinh","sup","tan","tanh","tg","th"],"",null,(function(e){return {type:"mop",limits:"nolimits",isSymbol:!1,isFunction:!0,body:e.slice(1),variant:"main",variantStyle:"up"}})),de(["liminf","limsup"],"",null,e=>({type:"mop",limits:"limits",isSymbol:!1,body:{"\\liminf":"lim inf","\\limsup":"lim sup"}[e],variant:"main"})),de(["lim","mod"],"",null,(function(e){return {type:"mop",limits:"limits",isSymbol:!1,body:e.slice(1),variant:"main"}})),de(["det","max","min"],"",null,(function(e){return {type:"mop",limits:"limits",isSymbol:!1,isFunction:!0,body:e.slice(1),variant:"main"}})),de("sqrt","[index:auto]{radicand:auto}",null,(e,t)=>({type:"surd",body:t[1],index:t[0]}),(e,t,i,a)=>{let r="";return i.index&&(r+=`[${a(i,i.index)}]`),r+=`{${a(i,i.body)}}`,e+r}),de(["frac","dfrac","tfrac","cfrac","binom","dbinom","tbinom"],"{numerator}{denominator}",null,(e,t)=>{const i={type:"genfrac",numer:t[0],denom:t[1],mathstyle:"auto"};switch(e){case"\\dfrac":case"\\frac":case"\\tfrac":case"\\cfrac":i.hasBarLine=!0;break;case"\\\\atopfrac":i.hasBarLine=!1;break;case"\\dbinom":case"\\binom":case"\\tbinom":i.hasBarLine=!1,i.leftDelim="(",i.rightDelim=")";}switch(e){case"\\dfrac":case"\\dbinom":i.mathstyle="displaystyle";break;case"\\tfrac":case"\\tbinom":i.mathstyle="textstyle";}return "\\cfrac"===e&&(i.continuousFraction=!0),i},(e,t,i,a)=>`${e}{${a(i,i.numer)}}{${a(i,i.denom)}}`),de(["over","atop","choose"],"",{infix:!0},(e,t)=>{const i=t[0],a=t[1];let r=!1,s=null,o=null;switch(e){case"\\atop":break;case"\\over":r=!0;break;case"\\choose":r=!1,s="(",o=")";break;default:throw new Error("Unrecognized genfrac command")}return {type:"genfrac",numer:i,denom:a,hasBarLine:r,leftDelim:s,rightDelim:o,mathstyle:"auto"}},(e,t,i,a)=>`{${a(i,i.numer)}${e} ${a(i,i.denom)}}`),de("pdiff","{numerator}{denominator}",null,(e,t)=>({type:"genfrac",numer:t[0],denom:t[1],numerPrefix:"∂",denomPrefix:"∂",hasBarLine:!0,leftDelim:null,rightDelim:null,mathstyle:"auto"}),(e,t,i,a)=>`${e}{${a(i,i.numer)}}{${a(i,i.denom)}}`),de(["sum","prod","bigcup","bigcap","coprod","bigvee","bigwedge","biguplus","bigotimes","bigoplus","bigodot","bigsqcup","smallint","intop"],"",null,e=>({type:"mop",limits:"auto",isSymbol:!0,variant:"main",body:{coprod:"∐",bigvee:"⋁",bigwedge:"⋀",biguplus:"⨄",bigcap:"⋂",bigcup:"⋃",intop:"∫",prod:"∏",sum:"∑",bigotimes:"⨂",bigoplus:"⨁",bigodot:"⨀",bigsqcup:"⨆",smallint:"∫"}[e.slice(1)]}));const he={int:"∫",iint:"∬",iiint:"∭",oint:"∮",oiint:"∯",oiiint:"∰",intclockwise:"∱",varointclockwise:"∲",ointctrclockwise:"∳",intctrclockwise:"⨑",sqcup:"⊔",sqcap:"⊓",uplus:"⊎",wr:"≀",amalg:"⨿",Cap:"⋒",Cup:"⋓",doublecap:"⋒",doublecup:"⋓"};de(Object.keys(he),"",null,(function(e){return {type:"mop",limits:"nolimits",isSymbol:!0,body:he[e.slice(1)],variant:{"⋒":"ams","⋓":"ams"}[he[e.slice(1)]]}})),de(["Re","Im"],"",null,(function(e){return {type:"mop",limits:"nolimits",isSymbol:!1,isFunction:!0,body:{"\\Re":"ℜ","\\Im":"ℑ"}[e],variant:"fraktur"}})),de("middle","{:delim}",null,(function(e,t){return {type:"delim",delim:t[0]}}));const pe={m0:"#3f3d99",m1:"#993d71",m2:"#998b3d",m3:"#3d9956",m4:"#3d5a99",m5:"#993d90",m6:"#996d3d",m7:"#43993d",m8:"#3d7999",m9:"#843d99"},ue=["#d35d60","#7293cb","#e1974d","#84bb5d","#9066a7","#aD6a58","#f5a4ce","#fff590","#212121","#818787","#d4d5d2","#ffffff"],fe=["#cc2428","#3769b1","#da7e30","#409852","#6b4c9a","#922426","#e7298a","#ffe907","#000000","#525055","#adafaa","#ffffff"],ge={apricot:"#FBB982",aquamarine:"#00B5BE",bittersweet:"#C04F17",black:"#221E1F",blue:"#2D2F92",bluegreen:"#00B3B8",blueviolet:"#473992",brickred:"#B6321C",brown:"#792500",burntorange:"#F7921D",cadetblue:"#74729A",carnationpink:"#F282B4",cerulean:"#00A2E3",cornflowerblue:"#41B0E4",cyan:"#00AEEF",dandelion:"#FDBC42",darkorchid:"#A4538A",emerald:"#00A99D",forestgreen:"#009B55",fuchsia:"#8C368C",goldenrod:"#FFDF42",gray:"#949698",green:"#00A64F",greenyellow:"#DFE674",junglegreen:"#00A99A",lavender:"#F49EC4",limegreen:"#8DC73E",magenta:"#EC008C",mahogany:"#A9341F",maroon:"#AF3235",melon:"#F89E7B",midnightblue:"#006795",mulberry:"#A93C93",navyblue:"#006EB8",olivegreen:"#3C8031",orange:"#F58137",orangered:"#ED135A",orchid:"#AF72B0",peach:"#F7965A",periwinkle:"#7977B8",pinegreen:"#008B72",plum:"#92268F",processblue:"#00B0F0",purple:"#99479B",rawsienna:"#974006",red:"#ED1B23",redorange:"#F26035",redviolet:"#A1246B",rhodamine:"#EF559F",royalblue:"#0071BC",royalpurple:"#613F99",rubinered:"#ED017D",salmon:"#F69289",seagreen:"#3FBC9D",sepia:"#671800",skyblue:"#46C5DD",springgreen:"#C6DC67",tan:"#DA9D76",tealblue:"#00AEB3",thistle:"#D883B7",turquoise:"#00B4CE",violet:"#58429B",violetred:"#EF58A0",white:"#FFFFFF",wildstrawberry:"#EE2967",yellow:"#FFF200",yellowgreen:"#98CC70",yelloworange:"#FAA21A"};function ye(e){var t;const i=e.toLowerCase().split("!");let a,r,s,o=255,n=255,l=255,c=-1;const d=i.length>0&&"-"===i[0].charAt(0);d&&(i[0]=i[0].slice(1));for(let e=0;e<i.length;e++){a=o,r=n,s=l;const d=null===(t=i[e].match(/([a-z0-9]*)/))||void 0===t?void 0:t[1];let m=ge[d]||pe[d];m||(m=i[e]);let h=m.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if((null==h?void 0:h[1])&&h[2]&&h[3])o=Math.max(0,Math.min(255,parseInt(h[1],16))),n=Math.max(0,Math.min(255,parseInt(h[2],16))),l=Math.max(0,Math.min(255,parseInt(h[3],16)));else if(h=m.match(/^#([0-9a-f]{3})$/i),null==h?void 0:h[1]){const e=parseInt(h[1][0],16),t=parseInt(h[1][1],16),i=parseInt(h[1][2],16);o=Math.max(0,Math.min(255,16*e+e)),n=Math.max(0,Math.min(255,16*t+t)),l=Math.max(0,Math.min(255,16*i+i));}else {if(h=m.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i),!((null==h?void 0:h[1])&&h[2]&&h[3]))return null;o=Math.max(0,Math.min(255,parseInt(h[1]))),n=Math.max(0,Math.min(255,parseInt(h[2]))),l=Math.max(0,Math.min(255,parseInt(h[3])));}c>=0&&(o=(1-c)*o+c*a,n=(1-c)*n+c*r,l=(1-c)*l+c*s,c=-1),e+1<i.length&&(c=Math.max(0,Math.min(100,parseInt(i[++e])))/100);}return c>=0&&(o=c*o+(1-c)*a,n=c*n+(1-c)*r,l=c*l+(1-c)*s),d&&(o=255-o,n=255-n,l=255-l),"#"+("00"+Math.round(o).toString(16)).slice(-2)+("00"+Math.round(n).toString(16)).slice(-2)+("00"+Math.round(l).toString(16)).slice(-2)}function be(e){let t=e.toUpperCase();for(const e in ge)if(ge[e]===t){t=e;break}for(const e in pe)if(pe[e]===t){t=e;break}return t}de("ensuremath","{:math}",{},(e,t)=>({type:"group",mode:"math",body:t[0],skipBoundary:!0,latexOpen:"\\ensuremath{",latexClose:"}"}),(e,t,i,a)=>a(i,i.body)),de("color","{:color}",{},(e,t)=>({color:t[0]})),de("textcolor","{:color}{content:auto*}",{},(e,t)=>({color:t[0]})),de("boxed","{content:math}",null,(e,t)=>({type:"box",framecolor:"black",skipBoundary:!0,body:t[0]})),de("colorbox","{background-color:string}{content:auto}",{},(e,t)=>({type:"box",backgroundcolor:ye(t[0]),skipBoundary:!0,body:t[1],verbatimBackgroundcolor:t[0]}),(e,t,i,a)=>`${e}{${i.verbatimBackgroundcolor||be(i.backgroundcolor)}}{${a(i,i.body)}}`),de("fcolorbox","{frame-color:string}{background-color:string}{content:auto}",{},(e,t)=>({type:"box",framecolor:ye(t[0]),backgroundcolor:ye(t[1]),skipBoundary:!0,body:t[2],verbatimBackgroundcolor:t[1],verbatimFramecolor:t[0]}),(e,t,i,a)=>`${e}{${i.verbatimFramecolor||be(i.framecolor)}{${i.verbatimBackgroundcolor||be(i.backgroundcolor)}}{${a(i,i.body)}}`),de("bbox","[:bbox]{body:auto}",{},(e,t)=>{if(t[0]){const e=t[0];return {type:"box",padding:e.padding,border:e.border,backgroundcolor:e.backgroundcolor,skipBoundary:!0,body:t[1]}}return {type:"box",skipBoundary:!0,body:t[1]}},(e,t,i,a)=>{let r=e;if(isFinite(i.padding)||void 0!==i.border||void 0!==i.backgroundcolor){const e=[];isFinite(i.padding)&&e.push(Math.floor(100*i.padding)/100+"em"),i.border&&e.push("border:"+i.border),i.backgroundcolor&&e.push(be(i.backgroundcolor)),r+=`[${e.join(",")}]`;}return r+`{${a(i,i.body)}}`}),de(["displaystyle","textstyle","scriptstyle","scriptscriptstyle"],"",{},(e,t)=>({mathstyle:e.slice(1)})),de(["tiny","scriptsize","footnotesize","small","normalsize","large","Large","LARGE","huge","Huge"],"",{mode:"text"},(e,t)=>({fontSize:{tiny:"size1",scriptsize:"size2",footnotesize:"size3",small:"size4",normalsize:"size5",large:"size6",Large:"size7",LARGE:"size8",huge:"size9",Huge:"size10"}[e.slice(1)]})),de("fontseries","{:string}",{mode:"text"},(e,t)=>({fontSeries:t[0]})),de("fontshape","{:string}",{mode:"text"},(e,t)=>({fontShape:t[0]})),de("fontfamily","{:string}",{mode:"text"},(e,t)=>({fontFamily:t[0]})),de("selectfont","",{mode:"text"},(e,t)=>({})),de("bf","",{},(e,t)=>({fontSeries:"b",fontShape:"n",fontFamily:"cmr"})),de(["boldsymbol","bm"],"{:math*}",{},(e,t)=>({mode:"math",cssClass:"ML__boldsymbol"})),de("bold","{:math*}",{},(e,t)=>({mode:"math",variantStyle:"bold"})),de("bfseries","",{mode:"text"},(e,t)=>({fontSeries:"b"})),de("mdseries","",{mode:"text"},(e,t)=>({fontSeries:"m"})),de("upshape","",{mode:"text"},(e,t)=>({fontShape:"n"})),de("slshape","",{mode:"text"},(e,t)=>({fontShape:"sl"})),de("scshape","",{mode:"text"},(e,t)=>({fontShape:"sc"})),de("textbf","{:text*}",{},(e,t)=>({mode:"text",fontSeries:"b"})),de("textmd","{:text*}",{},(e,t)=>({mode:"text",fontSeries:"m"})),de("textup","{:text*}",{},(e,t)=>({mode:"text",fontShape:"n"})),de("textnormal","{:text*}",{},(e,t)=>({mode:"text",fontShape:"n",fontSeries:"m"})),de("textsl","{:text*}",{},(e,t)=>({mode:"text",fontShape:"sl"})),de("textit","{:text*}",{},(e,t)=>({mode:"text",fontShape:"it"})),de("textsc","{:text*}",{},(e,t)=>({mode:"text",fontShape:"sc"})),de("textrm","{:text*}",{},(e,t)=>({mode:"text",fontFamily:"roman"})),de("textsf","{:text*}",{},(e,t)=>({mode:"text",fontFamily:"sans-serif"})),de("texttt","{:text*}",{},(e,t)=>({mode:"text",fontFamily:"monospace"})),de("mathbf","{:math*}",{},(e,t)=>({mode:"math",variant:"normal",variantStyle:"bold"})),de("mathit","{:math*}",{},(e,t)=>({mode:"math",variant:"normal",variantStyle:"italic"})),de("mathbfit","{:math*}",{},(e,t)=>({mode:"math",variant:"normal",variantStyle:"bolditalic"})),de("mathrm","{:math*}",{},(e,t)=>({mode:"math",variant:"normal",variantStyle:"up"})),de("mathsf","{:math*}",{},(e,t)=>({mode:"math",variant:"sans-serif",variantStyle:"up"})),de("mathtt","{:math*}",{},(e,t)=>({mode:"math",variant:"monospace",variantStyle:"up"})),de("it","",{},(e,t)=>({fontSeries:"m",fontShape:"it",fontFamily:"cmr",variantStyle:"italic"})),de("rmfamily","",{},(e,t)=>({fontFamily:"roman"})),de("sffamily","",{},(e,t)=>({fontFamily:"sans-serif"})),de("ttfamily","",{},(e,t)=>({fontFamily:"monospace"})),de(["Bbb","mathbb"],"{:math*}",{},(e,t)=>({variant:"double-struck",variantStyle:"up"})),de(["frak","mathfrak"],"{:math*}",{},(e,t)=>({variant:"fraktur",variantStyle:"up"})),de("mathcal","{:math*}",{},(e,t)=>({variant:"calligraphic",variantStyle:"up"})),de("mathscr","{:math*}",{},(e,t)=>({variant:"script",variantStyle:"up"})),de("mbox","{:text}",null,(e,t)=>({type:"group",mode:"math",body:t[0]})),de("text","{:text*}",null,(e,t)=>({mode:"text"})),de("class","{name:string}{content:auto*}",null,(e,t)=>({cssClass:t[0]})),de("cssId","{id:string}{content:auto}",null,(e,t)=>({type:"group",body:t[1],cssId:t[0]})),de("em","",null,(e,t)=>({cssClass:"ML__emph"})),de("emph","{:auto}",null,(e,t)=>({cssClass:"ML__emph",body:t[0],type:"group",skipBoundary:!0}));const ve={"\\bigl":{mclass:"mopen",size:1},"\\Bigl":{mclass:"mopen",size:2},"\\biggl":{mclass:"mopen",size:3},"\\Biggl":{mclass:"mopen",size:4},"\\bigr":{mclass:"mclose",size:1},"\\Bigr":{mclass:"mclose",size:2},"\\biggr":{mclass:"mclose",size:3},"\\Biggr":{mclass:"mclose",size:4},"\\bigm":{mclass:"mrel",size:1},"\\Bigm":{mclass:"mrel",size:2},"\\biggm":{mclass:"mrel",size:3},"\\Biggm":{mclass:"mrel",size:4},"\\big":{mclass:"mord",size:1},"\\Big":{mclass:"mord",size:2},"\\bigg":{mclass:"mord",size:3},"\\Bigg":{mclass:"mord",size:4}};function xe(e,t,i,a,r,s=""){const o=q(e,$("Size"+i+"-Regular",ee("math",t),"delimsizing size"+i),r.mathstyle,c.textstyle,s);return a&&o.setTop((1-r.mathstyle.sizeMultiplier)*r.mathstyle.metrics.axisHeight),o.setStyle("color",r.color),"number"==typeof r.opacity&&o.setStyle("opacity",r.opacity),o}function ke(e,t){let i="";return "Size1-Regular"===t?i=" delim-size1":"Size4-Regular"===t&&(i=" delim-size4"),$(t,ee("math",e),"delimsizinginner"+i)}function _e(e,t,i,a,r,o=""){let n,l,d,m;n=d=m=ee("math",t),l=null;let h="Size1-Regular";"\\vert"===t||"\\lvert"===t||"\\rvert"===t||"\\mvert"===t||"\\mid"===t?d=n=m="∣":"\\Vert"===t||"\\lVert"===t||"\\rVert"===t||"\\mVert"===t||"\\|"===t?d=n=m="∥":"\\uparrow"===t?d=m="⏐":"\\Uparrow"===t?d=m="‖":"\\downarrow"===t?n=d="⏐":"\\Downarrow"===t?n=d="‖":"\\updownarrow"===t?(n="↑",d="⏐",m="↓"):"\\Updownarrow"===t?(n="⇑",d="‖",m="⇓"):"["===t||"\\lbrack"===t?(n="⎡",d="⎢",m="⎣",h="Size4-Regular"):"]"===t||"\\rbrack"===t?(n="⎤",d="⎥",m="⎦",h="Size4-Regular"):"\\lfloor"===t?(d=n="⎢",m="⎣",h="Size4-Regular"):"\\lceil"===t?(n="⎡",d=m="⎢",h="Size4-Regular"):"\\rfloor"===t?(d=n="⎥",m="⎦",h="Size4-Regular"):"\\rceil"===t?(n="⎤",d=m="⎥",h="Size4-Regular"):"("===t?(n="⎛",d="⎜",m="⎝",h="Size4-Regular"):")"===t?(n="⎞",d="⎟",m="⎠",h="Size4-Regular"):"\\{"===t||"\\lbrace"===t?(n="⎧",l="⎨",m="⎩",d="⎪",h="Size4-Regular"):"\\}"===t||"\\rbrace"===t?(n="⎫",l="⎬",m="⎭",d="⎪",h="Size4-Regular"):"\\lgroup"===t?(n="⎧",m="⎩",d="⎪",h="Size4-Regular"):"\\rgroup"===t?(n="⎫",m="⎭",d="⎪",h="Size4-Regular"):"\\lmoustache"===t?(n="⎧",m="⎭",d="⎪",h="Size4-Regular"):"\\rmoustache"===t?(n="⎫",m="⎩",d="⎪",h="Size4-Regular"):"\\surd"===t?(n="",m="⎷",d="",h="Size4-Regular"):"\\ulcorner"===t?(n="┌",d=m=" "):"\\urcorner"===t?(n="┐",d=m=" "):"\\llcorner"===t?(m="└",d=n=" "):"\\lrcorner"===t&&(n="┘",d=n=" ");const p=s(ee("math",n),h),u=p.height+p.depth,f=s(ee("math",d),h),g=f.height+f.depth,y=s(ee("math",m),h),b=y.height+y.depth;let v=0,x=1;if(null!==l){const e=s(ee("math",l),h);v=e.height+e.depth,x=2;}const k=u+b+v,_=Math.ceil((i-k)/(x*g)),w=k+_*x*g;let M=r.mathstyle.metrics.axisHeight;a&&(M*=r.mathstyle.sizeMultiplier);const z=w/2-M,L=[];if(L.push(ke(m,h)),null===l)for(let e=0;e<_;e++)L.push(ke(d,h));else {for(let e=0;e<_;e++)L.push(ke(d,h));L.push(ke(l,h));for(let e=0;e<_;e++)L.push(ke(d,h));}L.push(ke(n,h));const S=K(r,L,"bottom",z);return S.setStyle("color",r.color),"number"==typeof r.opacity&&S.setStyle("opacity",r.opacity),q(e,A(S,"delimsizing mult"),r.mathstyle,c.textstyle,o)}de(["bigl","Bigl","biggl","Biggl","bigr","Bigr","biggr","Biggr","bigm","Bigm","biggm","Biggm","big","Big","bigg","Bigg"],"{:delim}",null,(function(e,t){return {type:"sizeddelim",size:ve[e].size,cls:ve[e].mclass,delim:t[0]}})),de(["hspace","hspace*"],"{width:skip}",{},(function(e,t){return {type:"spacing",width:t[0]||0}})),de(["mathop","mathbin","mathrel","mathopen","mathclose","mathpunct","mathord","mathinner"],"{:auto}",null,(e,t)=>{const i={type:{"\\mathop":"mop","\\mathbin":"mbin","\\mathrel":"mrel","\\mathopen":"mopen","\\mathclose":"mclose","\\mathpunct":"mpunct","\\mathord":"mord","\\mathinner":"minner"}[e],body:t[0],captureSelection:!0};return "\\mathop"===e&&(i.limits="limits",i.isFunction=!0),i},(e,t,i,a)=>`${e}{${a(i,i.body)}}`),de(["operatorname","operatorname*"],"{operator:math}",null,(function(e,t){const i={type:"mop",captureSelection:!0,body:t[0],isFunction:!0};return i.body.forEach(e=>{e.isFunction=!1,e.variant||e.variantStyle||(e.variant="main",e.variantStyle="up"),e.type="mord",e.body={"∗":"*","−":"-"}[e.body]||e.body;}),"\\operatorname"===e?i.limits="nolimits":"\\operatorname*"===e&&(i.limits="limits"),i})),de("unicode","{charcode:number}",null,(e,t)=>{let i=parseInt(t[0]);return isFinite(i)||(i=10067),{type:"mord",body:String.fromCodePoint(i),codepoint:i}},(e,t,i,a)=>`${e}{"${("000000"+i.codepoint.toString(16)).toUpperCase().substr(-6)}}`),de("rule","[raise:dimen]{width:dimen}{thickness:dimen}",null,(function(e,t){return {type:"rule",shift:t[0],width:t[1],height:t[2]}})),de("overline","{:auto}",null,(e,t)=>({type:"line",position:"overline",skipBoundary:!0,body:t[0]})),de("underline","{:auto}",null,(e,t)=>({type:"line",position:"underline",skipBoundary:!0,body:t[0]})),de("overset","{annotation:auto}{symbol:auto}",null,(function(e,t){return {type:"overunder",overscript:t[0],skipBoundary:!0,body:t[1]}}),(e,t,i,a)=>`${e}{${a(i,i.overscript)}}{${a(i,i.body)}}`),de("underset","{annotation:auto}{symbol:auto}",null,(function(e,t){return {type:"overunder",underscript:t[0],skipBoundary:!0,body:t[1]}}),(e,t,i,a)=>`${e}{${a(i,i.overscript)}}{${a(i,i.body)}}`),de(["overwithdelims","atopwithdelims"],"{numer:auto}{denom:auto}{left-delim:delim}{right-delim:delim}",{infix:!0},(function(e,t){return {type:"genfrac",numer:t[0],denom:t[1],hasBarLine:!1,leftDelim:t[2],rightDelim:t[3],mathstyle:"auto"}}),(e,t,i,a)=>`${a(i,i.numer)} ${e}${i.leftDelim}${i.rightDelim}${a(i,i.denom)}`),de(["stackrel","stackbin"],"{annotation:auto}{symbol:auto}",null,(function(e,t){return {type:"overunder",overscript:t[0],skipBoundary:!0,body:t[1],mathtype:"\\stackrel"===e?"mrel":"mbin"}}),(e,t,i,a)=>`${e}{${a(i,i.overscript)}}{${a(i,i.body)}}`),de("rlap","{:auto}",null,(function(e,t){return {type:"overlap",align:"right",skipBoundary:!0,body:t[0]}})),de("llap","{:auto}",null,(function(e,t){return {type:"overlap",align:"left",skipBoundary:!0,body:t[0]}})),de("mathrlap","{:auto}",null,(function(e,t){return {type:"overlap",mode:"math",align:"right",skipBoundary:!0,body:t[0]}})),de("mathllap","{:auto}",null,(function(e,t){return {type:"overlap",mode:"math",align:"left",skipBoundary:!0,body:t[0]}})),function(e){for(let e=0;e<"0123456789/@.?!".length;e++){const t="0123456789/@.?!".charAt(e);U(t,t);}}(),j(65,90),j(97,122),U("\\forall","∀"),U("\\exists","∃"),U("\\nexists","∄","mord","ams"),U("\\mid","∣","mrel"),U("\\top","⊤"),U("\\bot","⊥"),U("\\sharp","♯"),U("\\flat","♭"),U("\\natural","♮"),U("\\#","#"),U("\\&","&"),U("\\clubsuit","♣"),U("\\heartsuit","♡"),U("\\spadesuit","♠"),U("\\diamondsuit","♢"),U("\\differencedelta","∆","mrel"),U("\\backslash","\\"),U("\\nabla","∇"),U("\\partial","∂"),U("\\ell","ℓ"),U("\\hbar","ℏ"),U("\\hslash","ℏ","mord","ams"),U("\\Finv","Ⅎ","mord","ams"),U("\\Game","⅁","mord","ams"),U("\\wp","℘"),U("\\eth","ð","mord","ams"),U("\\mho","℧","mord","ams"),U("\\Bbbk","k","mord","ams"),U("\\N","N","mord","double-struck"),U("\\R","R","mord","double-struck"),U("\\Q","Q","mord","double-struck"),U("\\C","C","mord","double-struck"),U("\\Z","Z","mord","double-struck"),U("\\P","P","mord","double-struck"),U("\\pounds","£"),U("\\yen","¥","mord","ams"),U("\\euro","€"),U("\\dagger","†","mbin"),U("\\dag","†","mbin"),U("\\ddag","‡","mbin"),U("\\ddagger","‡","mbin"),U("\\maltese","✠","mord","ams"),U("\\rightarrow","→","mrel"),U("\\to","→","mrel"),U("\\leftarrow","←","mrel"),U("\\gets","←","mrel"),U("\\Rightarrow","⇒","mrel"),U("\\Leftarrow","⇐","mrel"),U("\\longrightarrow","⟶","mrel"),U("\\longleftarrow","⟵","mrel"),U("\\Longrightarrow","⟹","mrel"),U("\\implies","⟹","mrel"),U("\\Longleftarrow","⟸","mrel"),U("\\impliedby","⟸","mrel"),U("\\dashrightarrow","⇢","mrel","ams"),U("\\dashleftarrow","⇠","mrel","ams"),U("\\Rrightarrow","⇛","mrel","ams"),U("\\Lleftarrow","⇚","mrel","ams"),U("\\longleftrightarrow","⟷","mrel"),U("\\biconditional","⟷","mrel"),U("\\Longleftrightarrow","⟺","mrel"),U("\\leftrightarrows","⇆","mrel","ams"),U("\\rightleftarrows","⇄","mrel","ams"),U("\\mapsto","↦","mrel"),U("\\longmapsto","⟼","mrel"),U("\\uparrow","↑","mrel"),U("\\downarrow","↓","mrel"),U("\\Uparrow","⇑","mrel"),U("\\Downarrow","⇓","mrel"),U("\\updownarrow","↕","mrel"),U("\\Updownarrow","⇕","mrel"),U("\\curvearrowright","↷","mrel","ams"),U("\\curvearrowleft","↶","mrel","ams"),U("\\hookrightarrow","↪","mrel"),U("\\hookleftarrow","↩","mrel"),U("\\rightharpoonup","⇀","mrel"),U("\\leftharpoonup","↼","mrel"),U("\\rightharpoondown","⇁","mrel"),U("\\leftharpoondown","↽","mrel"),U("\\rightrightarrows","⇉","mrel","ams"),U("\\leftleftarrows","⇇","mrel","ams"),U("\\upuparrows","⇈","mrel","ams"),U("\\downdownarrows","⇊","mrel","ams"),U("\\leftarrowtail","↢","mrel","ams"),U("\\rightarrowtail","↣","mrel","ams"),U("\\looparrowright","↬","mrel","ams"),U("\\looparrowleft","↫","mrel","ams"),U("\\twoheadleftarrow","↞","mrel","ams"),U("\\twoheadrightarrow","↠","mrel","ams"),U("\\rightleftharpoons","⇌","mrel"),U("\\leftrightharpoons","⇋","mrel","ams"),U("\\Rsh","↱","mrel","ams"),U("\\Lsh","↰","mrel","ams"),U("\\searrow","↘","mrel"),U("\\nearrow","↗","mrel"),U("\\swarrow","↙","mrel"),U("\\nwarrow","↖","mrel"),U("\\circlearrowright","↻","mrel","ams"),U("\\circlearrowleft","↺","mrel","ams"),U("\\restriction","↾","mrel","ams"),U("\\upharpoonright","↾","mrel","ams"),U("\\upharpoonleft","↿","mrel","ams"),U("\\downharpoonright","⇂","mrel","ams"),U("\\downharpoonleft","⇃","mrel","ams"),U("\\rightsquigarrow","⇝","mrel","ams"),U("\\leadsto","⇝","mrel","ams"),U("\\leftrightsquigarrow","↭","mrel","ams"),U("\\originalof","⊶","mrel"),U("\\laplace","⊶","mrel"),U("\\imageof","⊷","mrel"),U("\\Laplace","⊷","mrel"),U("\\multimap","⊸","mrel","ams"),U("\\nrightarrow","↛","mrel","ams"),U("\\nleftarrow","↚","mrel","ams"),U("\\nRightarrow","⇏","mrel","ams"),U("\\nLeftarrow","⇍","mrel","ams"),U("\\nleftrightarrow","↮","mrel","ams"),U("\\nLeftrightarrow","⇎","mrel","ams"),U("\\nless","≮","mrel","ams"),U("\\nleqslant","","mrel","ams"),U("\\lneq","⪇","mrel","ams"),U("\\lneqq","≨","mrel","ams"),U("\\nleqq","","mrel","ams"),U("\\unlhd","⊴","mbin","ams"),U("\\unrhd","⊵","mbin","ams"),U("\\lvertneqq","","mrel","ams"),U("\\lnsim","⋦","mrel","ams"),U("\\lnapprox","⪉","mrel","ams"),U("\\nprec","⊀","mrel","ams"),U("\\npreceq","⋠","mrel","ams"),U("\\precnsim","⋨","mrel","ams"),U("\\precnapprox","⪹","mrel","ams"),U("\\nsim","≁","mrel","ams"),U("\\nshortmid","","mrel","ams"),U("\\nmid","∤","mrel","ams"),U("\\nvdash","⊬","mrel","ams"),U("\\nvDash","⊭","mrel","ams"),U("\\ngtr","≯","mrel","ams"),U("\\ngeqslant","","mrel","ams"),U("\\ngeqq","","mrel","ams"),U("\\gneq","⪈","mrel","ams"),U("\\gneqq","≩","mrel","ams"),U("\\gvertneqq","","mrel","ams"),U("\\gnsim","⋧","mrel","ams"),U("\\gnapprox","⪊","mrel","ams"),U("\\nsucc","⊁","mrel","ams"),U("\\nsucceq","⋡","mrel","ams"),U("\\succnsim","⋩","mrel","ams"),U("\\succnapprox","⪺","mrel","ams"),U("\\ncong","≆","mrel","ams"),U("\\nshortparallel","","mrel","ams"),U("\\nparallel","∦","mrel","ams"),U("\\nVDash","⊯","mrel","ams"),U("\\nsupseteqq","","mrel","ams"),U("\\supsetneq","⊋","mrel","ams"),U("\\varsupsetneq","","mrel","ams"),U("\\supsetneqq","⫌","mrel","ams"),U("\\varsupsetneqq","","mrel","ams"),U("\\nVdash","⊮","mrel","ams"),U("\\precneqq","⪵","mrel","ams"),U("\\succneqq","⪶","mrel","ams"),U("\\nsubseteqq","","mrel","ams"),U("\\checkmark","✓","mord","ams"),U("\\diagup","╱","mord","ams"),U("\\diagdown","╲","mord","ams"),U("\\measuredangle","∡","mord","ams"),U("\\sphericalangle","∢","mord","ams"),U("\\backprime","‵","mord","ams"),U("\\backdoubleprime","‶","mord","ams"),U("\\ast","∗","mbin"),U("\\star","⋆","mbin"),U("\\diamond","⋄","mbin"),U("\\Diamond","◊","mord","ams"),U("\\lozenge","◊","mord","ams"),U("\\blacklozenge","⧫","mord","ams"),U("\\bigstar","★","mord","ams"),U("\\aleph","ℵ"),U("\\beth","ℶ","mord","ams"),U("\\daleth","ℸ","mord","ams"),U("\\gimel","ℷ","mord","ams"),U("\\lbrace","{","mopen"),U("\\rbrace","}","mclose"),U("\\langle","⟨","mopen"),U("\\rangle","⟩","mclose"),U("\\lfloor","⌊","mopen"),U("\\rfloor","⌋","mclose"),U("\\lceil","⌈","mopen"),U("\\rceil","⌉","mclose"),U("\\vert","∣"),U("\\mvert","∣","mrel"),U("\\lvert","∣","mopen"),U("\\rvert","∣","mclose"),U("\\|","∥"),U("\\Vert","∥"),U("\\mVert","∥"),U("\\lVert","∥","mopen"),U("\\rVert","∥","mclose"),U("\\parallel","∥","mrel"),U("\\shortparallel","∥","mrel","ams"),U("\\lbrack","[","mopen"),U("\\rbrack","]","mclose"),U("\\{","{","mopen"),U("\\}","}","mclose"),U("(","(","mopen"),U(")",")","mclose"),U("[","[","mopen"),U("]","]","mclose"),U("\\ulcorner","┌","mopen","ams"),U("\\urcorner","┐","mclose","ams"),U("\\llcorner","└","mopen","ams"),U("\\lrcorner","┘","mclose","ams"),U("\\lgroup","⟮","mopen"),U("\\rgroup","⟯","mclose"),U("\\lmoustache","⎰","mopen"),U("\\rmoustache","⎱","mclose"),U("=","=","mrel"),U("\\ne","≠","mrel"),U("\\neq","≠","mrel"),U("<","<","mrel"),U("\\lt","<","mrel"),U(">",">","mrel"),U("\\gt",">","mrel"),U("\\le","≤","mrel"),U("\\leq","≤","mrel"),U("\\ge","≥","mrel"),U("\\geq","≥","mrel"),U("\\leqslant","⩽","mrel","ams"),U("\\geqslant","⩾","mrel","ams"),U("\\ll","≪","mrel"),U("\\gg","≫","mrel"),U("\\coloneq","≔","mrel"),U("\\measeq","≝","mrel"),U("\\eqdef","≞","mrel"),U("\\questeq","≟","mrel"),U(":",":","mrel"),U("\\cong","≅","mrel"),U("\\equiv","≡","mrel"),U("\\prec","≺","mrel"),U("\\preceq","⪯","mrel"),U("\\succ","≻","mrel"),U("\\succeq","⪰","mrel"),U("\\perp","⊥","mrel"),U("\\propto","∝","mrel"),U("\\Colon","∷","mrel"),U("\\smile","⌣","mrel"),U("\\frown","⌢","mrel"),U("\\sim","∼","mrel"),U("\\gtrsim","≳","mrel","ams"),U("\\approx","≈","mrel"),U("\\approxeq","≊","mrel","ams"),U("\\thickapprox","≈","mrel","ams"),U("\\lessapprox","⪅","mrel","ams"),U("\\gtrapprox","⪆","mrel","ams"),U("\\precapprox","⪷","mrel","ams"),U("\\succapprox","⪸","mrel","ams"),U("\\thicksim","∼","mrel","ams"),U("\\succsim","≿","mrel","ams"),U("\\precsim","≾","mrel","ams"),U("\\backsim","∽","mrel","ams"),U("\\eqsim","≂","mrel","ams"),U("\\backsimeq","⋍","mrel","ams"),U("\\simeq","≃","mrel"),U("\\lesssim","≲","mrel","ams"),U("\\nleq","≰","mrel","ams"),U("\\ngeq","≱","mrel","ams"),U("\\smallsmile","⌣","mrel","ams"),U("\\smallfrown","⌢","mrel","ams"),U("\\bowtie","⋈","mrel"),U("\\Join","⋈","mrel"),U("\\asymp","≍","mrel"),U("\\sqsubseteq","⊑","mrel"),U("\\sqsupseteq","⊒","mrel"),U("\\leqq","≦","mrel","ams"),U("\\eqslantless","⪕","mrel","ams"),U("\\lll","⋘","mrel","ams"),U("\\lessgtr","≶","mrel","ams"),U("\\lesseqgtr","⋚","mrel","ams"),U("\\lesseqqgtr","⪋","mrel","ams"),U("\\risingdotseq","≓","mrel","ams"),U("\\fallingdotseq","≒","mrel","ams"),U("\\subseteqq","⫅","mrel","ams"),U("\\Subset","⋐","mrel","ams"),U("\\sqsubset","⊏","mrel","ams"),U("\\preccurlyeq","≼","mrel","ams"),U("\\curlyeqprec","⋞","mrel","ams"),U("\\vDash","⊨","mrel","ams"),U("\\Vvdash","⊪","mrel","ams"),U("\\bumpeq","≏","mrel","ams"),U("\\Bumpeq","≎","mrel","ams"),U("\\geqq","≧","mrel","ams"),U("\\eqslantgtr","⪖","mrel","ams"),U("\\ggg","⋙","mrel","ams"),U("\\gtrless","≷","mrel","ams"),U("\\gtreqless","⋛","mrel","ams"),U("\\gtreqqless","⪌","mrel","ams"),U("\\supseteqq","⫆","mrel","ams"),U("\\Supset","⋑","mrel","ams"),U("\\sqsupset","⊐","mrel","ams"),U("\\succcurlyeq","≽","mrel","ams"),U("\\curlyeqsucc","⋟","mrel","ams"),U("\\Vdash","⊩","mrel","ams"),U("\\shortmid","∣","mrel","ams"),U("\\between","≬","mrel","ams"),U("\\pitchfork","⋔","mrel","ams"),U("\\varpropto","∝","mrel","ams"),U("\\backepsilon","∍","mrel","ams"),U("\\llless","⋘","mrel","ams"),U("\\gggtr","⋙","mrel","ams"),U("\\lhd","⊲","mbin","ams"),U("\\rhd","⊳","mbin","ams"),U("\\doteq","≐","mrel"),U("\\doteqdot","≑","mrel","ams"),U("\\Doteq","≑","mrel","ams"),U("\\eqcirc","≖","mrel","ams"),U("\\circeq","≗","mrel","ams"),U("\\lessdot","⋖","mbin","ams"),U("\\gtrdot","⋗","mbin","ams"),U("\\~","~","mrel"),U("\\leftrightarrow","↔","mrel"),U("\\Leftrightarrow","⇔","mrel"),U("\\models","⊨","mrel"),U("\\vdash","⊢","mrel"),U("\\therefore","∴","mrel","ams"),U("\\because","∵","mrel","ams"),U("\\dashv","⊣","mrel"),U("\\roundimplies","⥰","mrel"),U("+","+","mbin"),U("-","−","mbin"),U("−","−","mbin"),U("\\pm","±","mbin"),U("\\mp","∓","mbin"),U("*","∗","mbin"),U("\\times","×","mbin"),U("\\div","÷","mbin"),U("\\surd","√"),U("\\divides","∣","mbin"),U("\\ltimes","⋉","mbin","ams"),U("\\rtimes","⋊","mbin","ams"),U("\\leftthreetimes","⋋","mbin","ams"),U("\\rightthreetimes","⋌","mbin","ams"),U("\\intercal","⊺","mbin","ams"),U("\\dotplus","∔","mbin","ams"),U("\\doublebarwedge","⩞","mbin","ams"),U("\\divideontimes","⋇","mbin","ams"),U("\\centerdot","⋅","mbin","ams"),U("\\cdot","⋅","mbin"),U("\\infty","∞"),U("\\prime","′"),U("\\doubleprime","″"),U("\\angle","∠"),U("`","‘"),U("\\$","$"),U("\\%","%"),U("\\_","_"),U("\\alpha","α"),U("\\beta","β"),U("\\gamma","γ"),U("\\delta","δ"),U("\\epsilon","ϵ"),U("\\varepsilon","ε"),U("\\zeta","ζ"),U("\\eta","η"),U("\\theta","θ"),U("\\vartheta","ϑ"),U("\\iota","ι"),U("\\kappa","κ"),U("\\varkappa","ϰ","mord","ams"),U("\\lambda","λ"),U("\\mu","μ"),U("\\nu","ν"),U("\\xi","ξ"),U("\\omicron","o"),U("\\pi","π"),U("\\varpi","ϖ"),U("\\rho","ρ"),U("\\varrho","ϱ"),U("\\sigma","σ"),U("\\varsigma","ς"),U("\\tau","τ"),U("\\phi","ϕ"),U("\\varphi","φ"),U("\\upsilon","υ"),U("\\chi","χ"),U("\\psi","ψ"),U("\\omega","ω"),U("\\Gamma","Γ"),U("\\Delta","Δ"),U("\\Theta","Θ"),U("\\Lambda","Λ"),U("\\Xi","Ξ"),U("\\Pi","Π"),U("\\Sigma","Σ"),U("\\Upsilon","Υ"),U("\\Phi","Φ"),U("\\Psi","Ψ"),U("\\Omega","Ω"),U("\\digamma","ϝ","mord","ams"),U("\\emptyset","∅"),U("\\varnothing","∅","mord","ams"),U("\\cap","∩","mbin"),U("\\cup","∪","mbin"),U("\\setminus","∖","mbin"),U("\\smallsetminus","∖","mbin","ams"),U("\\complement","∁","mord","ams"),U("\\in","∈","mrel"),U("\\notin","∉","mrel"),U("\\not","̸","mrel"),U("\\ni","∋","mrel"),U("\\owns","∋","mrel"),U("\\subset","⊂","mrel"),U("\\supset","⊃","mrel"),U("\\subseteq","⊆","mrel"),U("\\supseteq","⊇","mrel"),U("\\subsetneq","⊊","mrel","ams"),U("\\varsubsetneq","","mrel","ams"),U("\\subsetneqq","⫋","mrel","ams"),U("\\varsubsetneqq","","mrel","ams"),U("\\nsubset","⊄","mrel","ams"),U("\\nsupset","⊅","mrel","ams"),U("\\nsubseteq","⊈","mrel","ams"),U("\\nsupseteq","⊉","mrel","ams"),U("\\ "," ","spacing"),U("~"," ","spacing"),U("\\space"," ","spacing"),U("\\!",null,"spacing"),U("\\,",null,"spacing"),U("\\:",null,"spacing"),U("\\;",null,"spacing"),U("\\enskip",null,"spacing"),U("\\enspace",null,"spacing"),U("\\quad",null,"spacing"),U("\\qquad",null,"spacing"),U("\\colon",":","mpunct"),U("\\cdotp","⋅","mpunct"),U("\\cdots","⋯","minner"),U("\\ddots","⋱","minner"),U("\\ldots","…","minner"),U("\\mathellipsis","…","minner"),U("\\vdots","⋮"),U("\\ldotp",".","mpunct"),U(",",",","mpunct"),U(";",";","mpunct"),U("\\land","∧","mbin"),U("\\wedge","∧","mbin"),U("\\lor","∨","mbin"),U("\\vee","∨","mbin"),U("\\lnot","¬"),U("\\neg","¬"),U("\\barwedge","⊼","mbin","ams"),U("\\veebar","⊻","mbin","ams"),U("\\nor","⊻","mbin","ams"),U("\\curlywedge","⋏","mbin","ams"),U("\\curlyvee","⋎","mbin","ams"),U("\\square","□","mord","ams"),U("\\Box","□","mord","ams"),U("\\blacksquare","■","mord","ams"),U("\\boxminus","⊟","mbin","ams"),U("\\boxplus","⊞","mbin","ams"),U("\\boxtimes","⊠","mbin","ams"),U("\\boxdot","⊡","mbin","ams"),U("\\circ","∘","mbin"),U("\\bigcirc","◯","mbin"),U("\\bullet","∙","mbin"),U("\\circleddash","⊝","mbin","ams"),U("\\circledast","⊛","mbin","ams"),U("\\oplus","⊕","mbin"),U("\\ominus","⊖","mbin"),U("\\otimes","⊗","mbin"),U("\\odot","⊙","mbin"),U("\\circledcirc","⊚","mbin","ams"),U("\\oslash","⊘","mbin"),U("\\circledS","Ⓢ","mord","ams"),U("\\circledR","®","mord","ams"),U("\\triangle","△"),U("\\bigtriangleup","△","mbin"),U("\\vartriangle","△","mrel","ams"),U("\\triangleq","≜","mrel","ams"),U("\\triangledown","▽","mord","ams"),U("\\bigtriangledown","▽","mbin"),U("\\triangleleft","◃","mbin"),U("\\vartriangleleft","⊲","mrel","ams"),U("\\trianglelefteq","⊴","mrel","ams"),U("\\ntriangleleft","⋪","mrel","ams"),U("\\ntrianglelefteq","⋬","mrel","ams"),U("\\triangleright","▹","mbin"),U("\\vartriangleright","⊳","mrel","ams"),U("\\trianglerighteq","⊵","mrel","ams"),U("\\ntriangleright","⋫","mrel","ams"),U("\\ntrianglerighteq","⋭","mrel","ams"),U("\\blacktriangle","▲","mord","ams"),U("\\blacktriangledown","▼","mord","ams"),U("\\blacktriangleleft","◀","mrel","ams"),U("\\blacktriangleright","▶","mrel","ams"),U("\\/","/"),U("|","∣","textord"),U("\\And","&","mbin"),U("\\imath","ı"),U("\\jmath","ȷ"),U("\\degree","°"),U("'","′"),U('"',"”");const we=["(",")","[","\\lbrack","]","\\rbrack","\\{","\\lbrace","\\}","\\rbrace","\\lfloor","\\rfloor","\\lceil","\\rceil","\\surd"],Me=["\\uparrow","\\downarrow","\\updownarrow","\\Uparrow","\\Downarrow","\\Updownarrow","|","\\|","\\vert","\\Vert","\\lvert","\\rvert","\\lVert","\\rVert","\\mvert","\\mid","\\lgroup","\\rgroup","\\lmoustache","\\rmoustache"],ze=["<",">","\\langle","\\rangle","/","\\backslash","\\lt","\\gt"],Le=[0,1.2,1.8,2.4,3],Se=[{type:"small",mathstyle:c.scriptscriptstyle},{type:"small",mathstyle:c.scriptstyle},{type:"small",mathstyle:c.textstyle},{type:"large",size:1},{type:"large",size:2},{type:"large",size:3},{type:"large",size:4}],Ce=[{type:"small",mathstyle:c.scriptscriptstyle},{type:"small",mathstyle:c.scriptstyle},{type:"small",mathstyle:c.textstyle},{type:"stack"}],Ae=[{type:"small",mathstyle:c.scriptscriptstyle},{type:"small",mathstyle:c.scriptstyle},{type:"small",mathstyle:c.textstyle},{type:"large",size:1},{type:"large",size:2},{type:"large",size:3},{type:"large",size:4},{type:"stack"}];function $e(e,t,i,a,r,o=""){if(!t||0===t.length||"."===t)return qe(e,r,e);let n;"<"===t||"\\lt"===t?t="\\langle":">"!==t&&"\\gt"!==t||(t="\\rangle"),n=ze.includes(t)?Se:we.includes(t)?Ae:Ce;const l=function(e,t,i,a){for(let o=Math.min(2,3-a.mathstyle.size);o<i.length&&"stack"!==i[o].type;o++){const a=s(e,"small"===(r=i[o]).type?"Main-Regular":"large"===r.type?"Size"+r.size+"-Regular":"Size4-Regular");if(a.defaultMetrics)return {type:"small",mathstyle:c.scriptstyle};let n=a.height+a.depth;if("small"===i[o].type&&(n*=i[o].mathstyle.sizeMultiplier),n>t)return i[o]}var r;return i[i.length-1]}(ee("math",t),i,n,r);return "small"===l.type?function(e,t,i,a,r,s=""){const o=q(e,$("Main-Regular",ee("math",t)),r.mathstyle,i,s);return a&&o.setTop((1-r.mathstyle.sizeMultiplier/i.sizeMultiplier)*r.mathstyle.metrics.axisHeight),o.setStyle("color",r.color),"number"==typeof r.opacity&&o.setStyle("opacity",r.opacity),o}(e,t,l.mathstyle,a,r,"ML__small-delim "+o):"large"===l.type?xe(e,t,l.size,a,r,o):_e(e,t,i,a,r,o)}function De(e,t,i,a,r,s=""){if("."===t)return qe(e,r,s);const o=r.mathstyle.metrics.axisHeight*r.mathstyle.sizeMultiplier,n=Math.max(i-o,a+o);return $e(e,t,Math.max(n/500*901,2*n-.5),!0,r,s)}function qe(e,t,i){return A("","sizing"+t.mathstyle.adjustTo(c.textstyle)+" nulldelimiter "+(i||""),e)}const Te={},Ke={size1:.5,size2:.7,size3:.8,size4:.9,size5:1,size6:1.2,size7:1.44,size8:1.73,size9:2.07,size10:2.49};function Ee(e,t){Te[e]={decompose:t};}function Ne(t,i){var a,r;function s(e){return "mord"===e.type&&!!e.symbol&&/^[0-9,.]$/.test(e.symbol)}function o(e){return "text"===e.mode}const n=t instanceof d?t:new d(t),l=!n.atomIdsSettings||!n.atomIdsSettings.groupNumbers;let c=[];if(e(i)){if(0===i.length)return [];if(1===i.length)c=i[0].decompose(n),c&&l&&i[0].isSelected&&c.forEach(e=>e.selected(!0));else {let e=[],t="",d=!0,m=null;for(let h=0;h<i.length;h++){"​"===i[h].body&&(i[h].superscript||i[h].subscript)||(m=null),(null===(a=n.atomIdsSettings)||void 0===a?void 0:a.groupNumbers)&&t&&(d&&s(i[h])||!d&&o(i[h]))&&(n.atomIdsSettings.overrideID=t);const p=i[h].decompose(n,m);if(n.atomIdsSettings&&(n.atomIdsSettings.overrideID=null),p){const a=[].concat(...p);m=a,(null===(r=n.atomIdsSettings)||void 0===r?void 0:r.groupNumbers)&&((s(i[h])||o(i[h]))&&(t&&d===s(i[h])||(d=s(i[h]),t=i[h].id)),(!s(i[h])&&!o(i[h])||i[h].superscript||i[h].subscript)&&t&&(t="")),l&&i[h].isSelected?(e=e.concat(a),e.forEach(e=>e.selected(!0))):(e.length>0&&(c=[...c,...e],e=[]),c=c.concat(a));}}e.length>0&&(c=[...c,...e],e=[]);}}else i&&(c=i.decompose(n),c&&l&&i.isSelected&&c.forEach(e=>e.selected(!0)));if(!c||0===c.length)return null;if(n.mathstyle!==n.parentMathstyle){const e=n.mathstyle.sizeMultiplier/n.parentMathstyle.sizeMultiplier;for(const t of c)t.height*=e,t.depth*=e;}if(n.size!==n.parentSize){const e=Ke[n.size]/Ke[n.parentSize];for(const t of c)t.height*=e,t.depth*=e;}return c}class Fe{constructor(e,t,i="",a={}){this.mode=e,this.type=t,this.body=i,this.applyStyle(a);}toLatex(t=!1){return function(t,i){if(!(i=void 0!==i&&i)&&t.latex)return t.latex;let a="",r=0,s=0,o=0;const n=t.symbol;let l=[];const c=(t,a)=>function(t,i,a){let r="";return e(i)?r=function(e,t,i){if(0===t.length)return "";if("first"===t[0].type){if(1===t.length)return "";t=t.slice(1);}return 0===t.length?"":u(g(t,"cssClass").map(t=>{const a=u(g(t,"color").map(t=>u(function(e){const t=[];let i=[],a="NONE";return e.forEach(e=>{"first"!==e.type&&(e.mode!==a?(i.length>0&&t.push(i),i=[e],a=e.mode):i.push(e));}),i.length>0&&t.push(i),t}(t).map(t=>function(e,t,i){var a;return (null===(a=y[t[0].mode])||void 0===a?void 0:a.emitLatexRun)?y[t[0].mode].emitLatexRun(e,t,i):""}(e,t,i)))));return !t[0].cssClass||e&&e.cssClass===t[0].cssClass?a:"ML__boldsymbol"===t[0].cssClass?"\\boldsymbol{"+a+"}":"ML__emph"===t[0].cssClass?"\\emph{"+a+"}":"\\class{"+t[0].cssClass+"}{"+a+"}"}))}(t,i,a):"number"==typeof i||"boolean"==typeof i?r=i.toString():"string"==typeof i?r=i.replace(/\s/g,"~"):i&&"function"==typeof i.toLatex&&(r=i.toLatex(a)),r}(t,a,i);switch(t.type){case"group":n?a=i?c(t,t.body):t.latex:(a=t.latexOpen||(t.cssId||t.cssClass?"":"{"),t.cssId&&(a+="\\cssId{"+t.cssId+"}{"),"ML__emph"===t.cssClass?a+="\\emph{"+c(t,t.body):(t.cssClass&&(a+="\\class{"+t.cssClass+"}{"),a+=c(t,t.body),t.cssClass&&(a+="}")),t.cssId&&(a+="}"),a+=t.latexClose||(t.cssId||t.cssClass?"":"}"));break;case"array":if(a+="\\begin{"+t.environmentName+"}","array"===t.environmentName){if(a+="{",t.colFormat)for(o=0;o<t.colFormat.length;o++)t.colFormat[o].align?a+=t.colFormat[o].align:t.colFormat[o].rule&&(a+="|");a+="}";}for(s=0;s<t.array.length;s++){for(r=0;r<t.array[s].length;r++)r>0&&(a+=" & "),a+=c(t,t.array[s][r]);s<t.array.length-1&&(a+=" \\\\ ");}a+="\\end{"+t.environmentName+"}";break;case"root":a=c(t,t.body);break;case"leftright":l=t.inner?["\\left"+(t.leftDelim||"."),c(t,t.body),"\\right"+(t.rightDelim||".")]:i?["."===t.leftDelim?"":t.leftDelim,c(t,t.body),"."===t.rightDelim?"":t.rightDelim]:["\\mleft"+(t.leftDelim||"."),c(t,t.body),"\\mright"+(t.rightDelim||".")],a+=u(l);break;case"delim":case"sizeddelim":a+=n+"{"+t.delim+"}";break;case"rule":a+=n,t.shift&&(a+=`[${c(t,t.shift)}em]`),a+=`{${c(t,t.width)}em}{${c(t,t.height)}em}`;break;case"mord":case"minner":case"mbin":case"mrel":case"mpunct":case"mopen":case"mclose":case"textord":a+='\\char"'===n?t.latex:te(n,null,t,c);break;case"mop":"​"!==t.body&&("\\mathop"===n||"\\operatorname"===n?a+=n+"{"+c(t,t.body)+"}":(a+=n,/^\\.*[a-zA-Z0-9]$/.test(n)&&(a+=" "))),t.explicitLimits&&("limits"===t.limits&&(a+="\\limits "),"nolimits"===t.limits&&(a+="\\nolimits "));break;case"spacing":a+=n,"\\hspace"===n||"\\hspace*"===n?(a+="{",t.width?a+=t.width+"em":a+="0em",a+="}"):(a+=" ",t.width&&(a+=t.width+"em "));break;case"enclose":if(a+=n,"\\enclose"===n){a+="{"+Object.keys(t.notation).join(" ")+"}";let e="",i="";t.backgroundColor&&"transparent"!==t.backgroundColor&&(e+=i+'mathbackground="'+be(t.backgroundColor)+'"',i=","),t.shadow&&"auto"!==t.shadow&&(e+=i+'shadow="'+t.shadow+'"',i=","),1!==t.strokeWidth||"solid"!==t.strokeStyle?(e+=i+t.borderStyle,i=","):t.strokeColor&&"currentColor"!==t.strokeColor&&(e+=i+'mathcolor="'+be(t.strokeColor)+'"',i=","),e&&(a+=`[${e}]`);}a+=`{${c(t,t.body)}}`;break;case"mathstyle":a+="\\"+t.mathstyle;break;case"space":a+=t.symbol;break;case"placeholder":a+="\\placeholder{}";break;case"first":case"command":case"msubsup":break;case"error":a+=t.latex;break;case"":break;default:a=te(n,null,t,c),a||(a+=n);}if(t.superscript){let e=c(t,t.superscript);1===e.length?("′"===e?e="\\prime ":"″"===e&&(e="\\doubleprime "),a+="^"+e):a+="^{"+e+"}";}if(t.subscript){const e=c(t,t.subscript);1===e.length?a+="_"+e:a+="_{"+e+"}";}return a}(this,t)}getStyle(){return {mode:this.mode,color:this.isPhantom?"transparent":this.color,backgroundColor:this.isPhantom?"transparent":this.backgroundColor,variant:this.variant,variantStyle:this.variantStyle,fontFamily:this.fontFamily,fontShape:this.fontShape,fontSeries:this.fontSeries,fontSize:this.fontSize,cssId:this.cssId,cssClass:this.cssClass}}applyStyle(e){Object.assign(this,e),"none"===this.fontFamily&&(this.fontFamily=""),"auto"===this.fontShape&&(this.fontShape=""),"auto"===this.fontSeries&&(this.fontSeries=""),"none"===this.color&&(this.color=""),"none"===this.backgroundColor&&(this.backgroundColor=""),"auto"===this.fontSize&&(this.fontSize=""),this.fontSize&&(this.maxFontSize=Ke[this.fontSize]),"text"===this.mode&&"root"!==this.type&&(this.type="");}getInitialBaseElement(){let t;return e(this.body)&&this.body.length>0&&("first"!==this.body[0].type?t=this.body[0].getInitialBaseElement():this.body[1]&&(t=this.body[1].getInitialBaseElement())),t||this}getFinalBaseElement(){return e(this.body)&&this.body.length>0?this.body[this.body.length-1].getFinalBaseElement():this}isCharacterBox(){const e=this.getInitialBaseElement();return /minner|mbin|mrel|mpunct|mopen|mclose|textord/.test(e.type)}forEach(t){if(t(this),e(this.body))for(const e of this.body)e&&e.forEach(t);else this.body&&"object"==typeof this.body&&t(this.body);if(this.superscript)for(const e of this.superscript)e&&e.forEach(t);if(this.subscript)for(const e of this.subscript)e&&e.forEach(t);if(this.overscript)for(const e of this.overscript)e&&e.forEach(t);if(this.underscript)for(const e of this.underscript)e&&e.forEach(t);if(this.numer)for(const e of this.numer)e&&e.forEach(t);if(this.denom)for(const e of this.denom)e&&e.forEach(t);if(this.index)for(const e of this.index)e&&e.forEach(t);if(this.array)for(const e of this.array)for(const i of e)for(const e of i)e.forEach(t);}filter(t){let i=[];t(this)&&i.push(this);for(const a of ["body","superscript","subscript","overscript","underscript","numer","denom","index"])if(e(this[a]))for(const e of this[a])e&&(i=i.concat(e.filter(t)));if(e(this.array))for(const e of this.array)for(const a of e)a&&(i=i.concat(a.filter(t)));return i}decomposeGroup(e){const t=A(Ne(e.clone({mathstyle:this.mathstyle?c[this.mathstyle]:void 0}),this.body),"","mord");return this.cssId&&(t.cssId=this.cssId),t.applyStyle({backgroundColor:this.backgroundColor,cssClass:this.cssClass}),t}decomposeOverlap(e){const t=A(Ne(e,this.body),"inner");return A([t,A(null,"fix")],"left"===this.align?"llap":"rlap","mord")}decomposeRule(e){const t=e.mathstyle,i=A("","rule","mord");let a=this.shift&&!isNaN(this.shift)?this.shift:0;a/=t.sizeMultiplier;const r=this.width/t.sizeMultiplier,s=this.height/t.sizeMultiplier;return i.setStyle("border-right-width",r,"em"),i.setStyle("border-top-width",s,"em"),i.setStyle("margin-top",-(s-a),"em"),i.setStyle("border-color",e.color),i.width=r,i.height=s+a,i.depth=-a,i}decompose(t,i=null){var a;let r=null;if(!this.type||/mord|minner|mbin|mrel|mpunct|mopen|mclose|textord/.test(this.type)?(r="string"==typeof this.body?this.makeSpan(t,this.body):this.makeSpan(t,Ne(t,this.body)),r.type=x(this.type)?this.type:""):"group"===this.type||"root"===this.type?r=this.decomposeGroup(t):"delim"===this.type?(r=A(null,""),r.delim=this.delim):"sizeddelim"===this.type?r=this.bind(t,function(e,t,i,a,r=""){return "."===t?qe(e,a,r):("<"===t||"\\lt"===t?t="\\langle":">"!==t&&"\\gt"!==t||(t="\\rangle"),we.includes(t)||ze.includes(t)?xe(e,t,i,!1,a,r):Me.includes(t)?_e(e,t,Le[i],!1,a,r):null)}(this.cls,this.delim,this.size,t)):"overlap"===this.type?r=this.decomposeOverlap(t):"rule"===this.type?r=this.decomposeRule(t):"msubsup"===this.type?(r=A("​","","mord"),i&&(r.height=i[0].height,r.depth=i[0].depth)):"space"===this.type?r=this.makeSpan(t," "):"spacing"===this.type?"​"===this.body?r=this.makeSpan(t,"​"):" "===this.body?r="math"===this.mode?this.makeSpan(t," "):this.makeSpan(t," "):this.width?(r=A("​","mspace "),this.width>0?r.setWidth(this.width):r.setStyle("margin-left",this.width,"em")):r=A("​","mspace "+(null!==(a={"\\qquad":"qquad","\\quad":"quad","\\enspace":"enspace","\\;":"thickspace","\\:":"mediumspace","\\,":"thinspace","\\!":"negativethinspace"}[this.symbol])&&void 0!==a?a:"mediumspace")):"mathstyle"===this.type?t.setMathstyle(this.mathstyle):"command"===this.type||"error"===this.type?(r=this.makeSpan(t,this.body),r.classes="",this.isError&&(r.classes+=" ML__error"),this.isSuggestion&&(r.classes+=" ML__suggestion")):r="placeholder"===this.type?this.makeSpan(t,"⬚"):"first"===this.type?this.makeSpan(t,"​"):Te[this.type].decompose(t,this),!r)return null;if(this.caret&&"msubsup"!==this.type&&"command"!==this.type&&"placeholder"!==this.type&&"first"!==this.type&&(e(r)?"leftright"===this.type&&(this.superscript||this.subscript)||(r[r.length-1].caret=this.caret):r.caret=this.caret),this.containsCaret&&(e(r)?(r[0].classes=(r[0].classes||"")+" ML__contains-caret",r[r.length-1].classes=(r[r.length-1].classes||"")+" ML__contains-caret"):r.classes=(r.classes||"")+" ML__contains-caret"),!this.limits&&(this.superscript||this.subscript))if(e(r)){const e=r[r.length-1];r[r.length-1]=this.attachSupsub(t,e,e.type);}else r=[this.attachSupsub(t,r,r.type)];return e(r)?r:[r]}attachSupsub(e,t,i){if(!this.superscript&&!this.subscript)return t;const a=e.mathstyle;let r=null,s=null;this.superscript&&(r=A(Ne(e.sup(),this.superscript),a.adjustTo(a.sup()))),this.subscript&&(s=A(Ne(e.sub(),this.subscript),a.adjustTo(a.sub())));let o,n=0,l=0;this.isCharacterBox()||(n=L(t)-a.metrics.supDrop,l=S(t)+a.metrics.subDrop),o=a===c.displaystyle?a.metrics.sup1:a.cramped?a.metrics.sup3:a.metrics.sup2;const d=.05/(c.textstyle.sizeMultiplier*a.sizeMultiplier);let m=null;if(s&&r){n=Math.max(n,o,r.depth+.25*a.metrics.xHeight),l=Math.max(l,a.metrics.sub2);const i=.04;if(n-S(r)-(L(s)-l)<4*i){l=4*i-(n-r.depth)+L(s);const e=.8*a.metrics.xHeight-(n-S(r));e>0&&(n+=e,l-=e);}m=K(e,[s,l,r,-n],"individualShift"),this.isSymbol&&m.children[0].setLeft(-C(t));}else s&&!r?(l=Math.max(l,a.metrics.sub1,L(s)-.8*a.metrics.xHeight),m=K(e,[s],"shift",l),m.children[0].setRight(d),this.isCharacterBox()&&m.children[0].setLeft(-C(t))):!s&&r&&(n=Math.max(n,o,r.depth+.25*a.metrics.xHeight),m=K(e,[r],"shift",-n),m.children[0].setRight(d));const h=A(m,"msubsup");return this.caret&&(h.caret=this.caret,this.caret=""),A([t,h],"",i)}attachLimits(e,t,i,a){const r=this.superscript?A(Ne(e.sup(),this.superscript),e.mathstyle.adjustTo(e.mathstyle.sup())):null,s=this.subscript?A(Ne(e.sub(),this.subscript),e.mathstyle.adjustTo(e.mathstyle.sub())):null;return function(e,t,i,a,r,s){if(!r&&!s)return t;t=A(t);let o=0,n=0;r&&(o=Math.max(.111,.2-S(r))),s&&(n=Math.max(.166,.6-L(s)));let l=null;return s&&r?(l=K(e,[.1,s,n,t,o,r,.1],"bottom",.1+L(s)+S(s)+n+S(t)+i),l.children[0].setLeft(-a),l.children[2].setLeft(a)):s&&!r?(l=K(e,[.1,s,n,t],"top",L(t)-i),l.children[0].setLeft(-a)):!s&&r&&(l=K(e,[t,o,r,.1],"bottom",S(t)+i),l.children[1].setLeft(a)),A(l,"op-limits","mop")}(e,t,i,a,r,s)}bind(e,t){return "first"!==this.type&&"​"!==this.body&&(this.id=function(e){let t;return e.atomIdsSettings&&("number"==typeof e.atomIdsSettings.seed?(t=e.atomIdsSettings.overrideID?e.atomIdsSettings.overrideID:e.atomIdsSettings.seed.toString(36),e.atomIdsSettings.seed+=1):t=Date.now().toString(36).slice(-2)+Math.floor(1e5*Math.random()).toString(36)),t}(e),this.id&&(t.attributes||(t.attributes={}),t.attributes["data-atom-id"]=this.id)),t}makeSpan(e,t){const i=A(t,"","textord"===this.type?"mord":x(this.type)?this.type:""),a=this.getStyle();a.letterShapeStyle=e.letterShapeStyle,i.applyStyle(a);const r=(null==a?void 0:a.fontSize)?a.fontSize:"size5";return r!==e.parentSize?(i.classes+=" sizing reset-"+e.parentSize,i.classes+=" "+r):e.parentSize!==e.size&&(i.classes+=" sizing reset-"+e.parentSize,i.classes+=" "+e.size),i.maxFontSize=Math.max(i.maxFontSize,e.mathstyle.sizeMultiplier||1),"text"===this.mode&&(i.classes+=" ML__text"),e.mathstyle.isTight()&&(i.isTight=!0),"math"!==this.mode&&(i.italic=0),i.setRight(i.italic),"number"==typeof e.opacity&&i.setStyle("opacity",e.opacity),this.bind(e,i),this.caret&&(this.superscript||this.subscript||(i.caret=this.caret,this.caret="",e.mathstyle.isTight()&&(i.isTight=!0))),i}}function Be(t,i=[]){const a=new Fe(t,"root",i||[]);return !e(a.body)||0!==a.body.length&&"first"===a.body[0].type||a.body.unshift(new Fe(t,"first")),a}function Oe(t){return e(t)}const Re=[[8205,1],[65038,2],[127995,5],[129456,4],[917536,96]];let Pe;const Ie=[127462,127487];function He(e){var t;return Pe||(Pe={},Re.forEach(e=>{for(let t=e[0];t<=e[0]+e[1]-1;t++)Pe[t]=!0;})),null!==(t=Pe[e])&&void 0!==t&&t}function We(e){return e>=Ie[0]&&e<=Ie[1]}function Ve(e){if(/^[\x20-\xFF]*$/.test(e))return e;const t=[],i=function(e){const t=[];for(let i=0;i<e.length;i++){let a=e.charCodeAt(i);if(13===a&&10===e.charCodeAt(i+1)&&(a=10,i++),13!==a&&12!==a||(a=10),0===a&&(a=65533),a>=55296&&a<=56319){const t=e.charCodeAt(i+1);if(t>=56320&&t<=57343){const e=a-55296,r=t-56320;a=Math.pow(2,16)+e*Math.pow(2,10)+r,i++;}}t.push(a);}return t}(e);let a=0;for(;a<i.length;){const e=i[a++],r=i[a];if(8205===r){const e=a-1;for(a+=2;8205===i[a];)a+=2;t.push(String.fromCodePoint(...i.slice(e,a-e+1)));}else if(He(r)){const e=a-1;for(;He(i[a]);)a+=8205===i[a]?2:1;t.push(String.fromCodePoint(...i.slice(e,a-e)));}else We(e)?(a+=1,t.push(String.fromCodePoint(...i.slice(a-2,2)))):t.push(String.fromCodePoint(e));}return t}class Ue{constructor(e){this.obeyspaces=!1,this.s=Ve(e),this.pos=0;}end(){return this.pos>=this.s.length}get(){return this.pos<this.s.length?this.s[this.pos++]:""}peek(){return this.s[this.pos]}match(e){let t;return t="string"==typeof this.s?e.exec(this.s.slice(this.pos)):e.exec(this.s.slice(this.pos).join("")),(null==t?void 0:t[0])?(this.pos+=t[0].length,t[0]):null}next(){if(this.end())return null;if(!this.obeyspaces&&this.match(/^[ \f\n\r\t\v\xA0\u2028\u2029]+/))return "<space>";if(this.obeyspaces&&this.match(/^[ \f\n\r\t\v\xA0\u2028\u2029]/))return "<space>";const e=this.get();if("\\"===e){if(!this.end()){let e=this.match(/^[a-zA-Z*]+/);if(e)this.match(/^[ \f\n\r\t\v\xA0\u2028\u2029]*/);else if(e=this.get()," "===e)return "<space>";return "\\"+e}}else {if("{"===e)return "<{>";if("}"===e)return "<}>";if("^"===e){if("^"===this.peek()){this.get();let e=this.match(/^\^\^[0-9a-f][0-9a-f][0-9a-f][0-9a-f]/);if(e)return String.fromCodePoint(parseInt(e.slice(2),16));if(e=this.match(/^[0-9a-f][0-9a-f]/),e)return String.fromCodePoint(parseInt(e,16))}return e}if("#"===e){if(!this.end()){let e=!1;if(/[0-9?]/.test(this.peek())&&(e=!0,this.pos+1<this.s.length)){const t=this.s[this.pos+1];e=/[^0-9A-Za-z]/.test(t);}return e?"#"+this.get():"#"}}else if("$"===e)return "$"===this.peek()?(this.get(),"<$$>"):"<$>"}return e}}function je(e,t){var i,a,r,s;let o=[],n=e.next();if(n)if("\\relax"===n);else if("\\noexpand"===n)n=e.next(),n&&o.push(n);else if("\\obeyspaces"===n)e.obeyspaces=!0;else if("\\space"===n||"~"===n)o.push("<space>");else if("\\bgroup"===n)o.push("<{>");else if("\\egroup"===n)o.push("<}>");else if("\\string"===n)n=e.next(),n&&("\\"===n[0]?Array.from(n).forEach(e=>o.push("\\"===e?"\\backslash":e)):"<{>"===n?o.push("\\{"):"<space>"===n?o.push("~"):"<}>"===n&&o.push("\\}"));else if("\\csname"===n){for(;"<space>"===e.peek();)e.next();let r="",s=!1,l=[];do{if(0===l.length)if(/^#[0-9?]$/.test(e.peek())){const r=e.get().slice(1);l=Xe(null!==(a=null!==(i=null==t?void 0:t[r])&&void 0!==i?i:null==t?void 0:t["?"])&&void 0!==a?a:"\\placeholder{}",t),n=l[0];}else n=e.next(),l=n?[n]:[];s=0===l.length,s||"\\endcsname"!==n||(s=!0,l.shift()),s||(s="<$>"===n||"<$$>"===n||"<{>"===n||"<}>"===n||n.length>1&&"\\"===n[0]),s||(r+=l.shift());}while(!s);r&&o.push("\\"+r),o=o.concat(l);}else if("\\endcsname"===n);else if(n.length>1&&"#"===n[0]){const e=n.slice(1);o=o.concat(Xe(null!==(s=null!==(r=null==t?void 0:t[e])&&void 0!==r?r:null==t?void 0:t["?"])&&void 0!==s?s:"\\placeholder{}",t));}else o.push(n);return o}function Xe(e,t){const i=e.toString().split(/\r?\n/);let a="",r="";for(const e of i){a+=r,r=" ";const t=e.match(/((?:\\%)|[^%])*/);t&&(a+=t[0]);}const s=new Ue(a);let o=[];do{o=o.concat(je(s,t));}while(!s.end());return o}function Ze(e){const t=A("​","arraycolsep");return t.setWidth(e),t}function Ge(e,t,i,a){const r=[];for(const s of t){const t=A(Ne(e,a));t.depth=s.depth,t.height=s.height,r.push(t),r.push(s.pos-i);}return K(e,r,"individualShift")}Ee("genfrac",(e,t)=>{const i="auto"===t.mathstyle?e.mathstyle:c[t.mathstyle],a=e.clone({mathstyle:i});let r=[];t.numerPrefix&&r.push(A(t.numerPrefix,"mord"));const s=t.continuousFraction?i:i.fracNum();r=r.concat(Ne(a.clone({mathstyle:s}),t.numer));const o=T(r,e.mathstyle.adjustTo(s));let n=[];t.denomPrefix&&n.push(A(t.denomPrefix,"mord"));const l=t.continuousFraction?i:i.fracDen();n=n.concat(Ne(a.clone({mathstyle:l}),t.denom));const d=T(n,e.mathstyle.adjustTo(l)),m=t.hasBarLine?.04/i.sizeMultiplier:0;let h,p,u=0;i.size===c.displaystyle.size?(h=i.metrics.num1,u=m>0?3*m:.28,p=i.metrics.denom1):(m>0?(h=i.metrics.num2,u=m):(h=i.metrics.num3,u=.12),p=i.metrics.denom2);const f=o?S(o):0,g=d?L(d):0;let y;if(0===m){const e=h-f-(g-p);e<u&&(h+=.5*(u-e),p+=.5*(u-e)),y=K(a,[o,-h,d,p],"individualShift");}else {const e=i.metrics.axisHeight,r=e+.5*m,s=e-.5*m;h-f-r<u&&(h+=u-(h-f-r)),s-(g-p)<u&&(p+=u-(s-(g-p)));const n=A(null," frac-line");n.applyStyle(t.getStyle()),n.height=m/2,n.depth=m/2;const l=[];o&&(l.push(o),l.push(-h)),l.push(n),l.push(m/2-e),d&&(l.push(d),l.push(p)),y=K(a,l,"individualShift");}y.classes+=" mfrac",y.height*=i.sizeMultiplier/e.mathstyle.sizeMultiplier,y.depth*=i.sizeMultiplier/e.mathstyle.sizeMultiplier;const b=i.size===c.displaystyle.size?i.metrics.delim1:i.metrics.delim2,v=t.bind(e,$e("mopen",t.leftDelim,b,!0,e.clone({mathstyle:i}))),x=t.bind(e,$e("mclose",t.rightDelim,b,!0,e.clone({mathstyle:i})));return v.applyStyle(t.getStyle()),x.applyStyle(t.getStyle()),[t.bind(e,A([v,y,x],e.parentSize!==e.size?"sizing reset-"+e.parentSize+" "+e.size:"","mord"))]}),Ee("array",(e,t)=>{var i;let a=t.colFormat;a&&0===a.length&&(a=[{align:"l"}]),a||(a=[{align:"l"},{align:"l"},{align:"l"},{align:"l"},{align:"l"},{align:"l"},{align:"l"},{align:"l"},{align:"l"},{align:"l"}]);const r=[];let s=0;for(const e of a)e.align&&s++;for(const e of t.array){let t=0;for(;t<e.length;){const i=[],a=Math.min(e.length,t+s);for(;t<a;)i.push(e[t++]);r.push(i);}}1===r[r.length-1].length&&0===r[r.length-1][0].length&&r.pop();const o=c[t.mathstyle]||e.mathstyle,n=t.arraystretch||1,l="number"==typeof t.arraycolsep?t.arraycolsep:.5,d=1.2*n,m=.7*d,h=.3*d;let p=0,u=0;const f=[],g=r.length;for(let a=0;a<g;++a){const s=r[a];u=Math.max(u,s.length);let o=m,n=h;const l={cells:[],height:0,depth:0,pos:0};for(let i=0;i<s.length;++i){const a=Ne(e.clone({mathstyle:c[t.mathstyle]}),s[i])||[],r=[A(null,"","mord")].concat(a);n=Math.max(n,S(r)),o=Math.max(o,L(r)),l.cells.push(r);}let d=a===g-1?0:t.jot||0;(null===(i=t.rowGaps)||void 0===i?void 0:i[a])&&(d=t.rowGaps[a],d>0&&(d+=h,n<d&&(n=d),d=0)),l.height=o,l.depth=n,p+=o,l.pos=p,p+=n+d,f.push(l);}const y=p/2+o.metrics.axisHeight,b=[];for(let t=0;t<u;t++){const i=[];for(const e of f){const a=e.cells[t];a&&(a.depth=e.depth,a.height=e.height,i.push(a),i.push(e.pos-y));}i.length>0&&b.push(K(e,i,"individualShift"));}const v=[];let x=!1,k=!1,_=0,w=!t.leftDelim;for(const t of a){if(t.align&&_>=b.length)break;if(t.align&&_<b.length)x?v.push(Ze(2*l)):(k||w)&&v.push(Ze(l)),v.push(A(b[_],"col-align-"+t.align)),_++,x=!0,k=!1,w=!1;else if(void 0!==t.gap)"number"==typeof t.gap?v.push(Ze(t.gap)):v.push(Ge(e,f,y,t.gap)),x=!1,k=!1,w=!1;else if(t.rule){const t=A(null,"vertical-separator");t.setStyle("height",p,"em"),t.setStyle("margin-top",3*e.mathstyle.metrics.axisHeight-y,"em"),t.setStyle("vertical-align","top");let i=0;k?i=.16:x&&(i=l-.04),t.setLeft(i),v.push(t),x=!1,k=!0,w=!1;}}if(x&&!t.rightDelim&&v.push(Ze(l)),!(t.leftDelim&&"."!==t.leftDelim||t.rightDelim&&"."!==t.rightDelim))return [A(v,"mtable","mord")];const M=A(v,"mtable"),z=L(M),C=S(M);return [A([t.bind(e,De("mopen",t.leftDelim,z,C,e)),M,t.bind(e,De("mclose",t.rightDelim,z,C,e))],"","mord")]}),Ee("overunder",(t,i)=>{const a=i.svgBody?E(i.svgBody):Ne(t,i.body),r=t.clone({mathstyle:c.scriptstyle});let s,o;i.svgAbove?s=E(i.svgAbove):i.overscript&&(s=A(Ne(r,i.overscript),t.mathstyle.adjustTo(r.mathstyle))),i.svgBelow?o=E(i.svgBelow):i.underscript&&(o=A(Ne(r,i.underscript),t.mathstyle.adjustTo(r.mathstyle))),s&&o&&(o.setLeft(.3),o.setRight(.3),s.setLeft(.3),s.setRight(.3));let n=function(t,i,a,r,s){if(!a&&!r)return e(i)?A(i):i;let o=0,n=0;a&&(o=Math.max(.111,.2-S(a))),r&&(n=Math.max(.166,.6-L(r)));let l=null;return r&&a?l=K(t,[0,r,n,i,o,a,.166],"bottom",L(r)+S(r)+S(i)):r&&!a?l=K(t,[0,r,n,i],"top",L(i)):a&&!r&&(l=K(t,[S(i),i,Math.max(.166,o),a],"bottom",S(i))),A(l,"op-over-under",s)}(t,a,s,o,x(i.type)?i.type:"mord");return (i.superscript||i.subscript)&&(n=i.attachLimits(t,n,0,0)),[n]}),Ee("accent",(t,i)=>{const a=t.mathstyle;let r=Ne(t.cramp(),i.body);(i.superscript||i.subscript)&&(r=[i.attachSupsub(t,A(r,"","mord"),"mord")]);let s=0;e(i.body)&&1===i.body.length&&i.body[0].isCharacterBox()&&(s=function(t){if(!t)return 0;if(e(t)){let e=0;for(const i of t)e+=i.skew||0;return e}return t.skew}(r));let o,n=Math.min(L(r),a.metrics.xHeight);if(i.svgAccent)o=E(i.svgAccent),n=.111-n;else {const e=$("Main-Regular",i.accent,"math");e.italic=0;const t="⃗"===i.accent?" accent-vec":"";o=A(A(e),"accent-body"+t);}return o=K(t,[r,-n,o]),o.children[1].setLeft(2*s),[A([o],"accent","mord")]}),Ee("enclose",(e,t)=>{const i=A(Ne(e,t.body),"","mord"),a="number"==typeof t.padding?t.padding:.3,r=A("","ML__notation");r.setStyle("position","absolute"),r.setStyle("height",L(i)+S(i)+2*a,"em"),r.height=L(i)+a,r.depth=S(i)+a,0!==a?r.setStyle("width","calc(100% + "+2*a+"em)"):r.setStyle("width","100%"),r.setStyle("top","0"),r.setStyle("left",-a,"em"),r.setStyle("z-index","-1"),t.backgroundcolor&&r.setStyle("background-color",t.backgroundcolor),t.notation.box&&r.setStyle("border",t.borderStyle),t.notation.actuarial&&(r.setStyle("border-top",t.borderStyle),r.setStyle("border-right",t.borderStyle)),t.notation.madruwb&&(r.setStyle("border-bottom",t.borderStyle),r.setStyle("border-right",t.borderStyle)),t.notation.roundedbox&&(r.setStyle("border-radius",(L(i)+S(i))/2,"em"),r.setStyle("border",t.borderStyle)),t.notation.circle&&(r.setStyle("border-radius","50%"),r.setStyle("border",t.borderStyle)),t.notation.top&&r.setStyle("border-top",t.borderStyle),t.notation.left&&r.setStyle("border-left",t.borderStyle),t.notation.right&&r.setStyle("border-right",t.borderStyle),t.notation.bottom&&r.setStyle("border-bottom",t.borderStyle);let s="";if(t.notation.horizontalstrike&&(s+='<line x1="3%"  y1="50%" x2="97%" y2="50%"',s+=` stroke-width="${t.strokeWidth}" stroke="${t.strokeColor}"`,s+=' stroke-linecap="round"',t.svgStrokeStyle&&(s+=` stroke-dasharray="${t.svgStrokeStyle}"`),s+="/>"),t.notation.verticalstrike&&(s+='<line x1="50%"  y1="3%" x2="50%" y2="97%"',s+=` stroke-width="${t.strokeWidth}" stroke="${t.strokeColor}"`,s+=' stroke-linecap="round"',t.svgStrokeStyle&&(s+=` stroke-dasharray="${t.svgStrokeStyle}"`),s+="/>"),t.notation.updiagonalstrike&&(s+='<line x1="3%"  y1="97%" x2="97%" y2="3%"',s+=` stroke-width="${t.strokeWidth}" stroke="${t.strokeColor}"`,s+=' stroke-linecap="round"',t.svgStrokeStyle&&(s+=` stroke-dasharray="${t.svgStrokeStyle}"`),s+="/>"),t.notation.downdiagonalstrike&&(s+='<line x1="3%"  y1="3%" x2="97%" y2="97%"',s+=` stroke-width="${t.strokeWidth}" stroke="${t.strokeColor}"`,s+=' stroke-linecap="round"',t.svgStrokeStyle&&(s+=` stroke-dasharray="${t.svgStrokeStyle}"`),s+="/>"),s){let e;"none"!==t.shadow&&(e="auto"===t.shadow?"filter: drop-shadow(0 0 .5px rgba(255, 255, 255, .7)) drop-shadow(1px 1px 2px #333)":"filter: drop-shadow("+t.shadow+")"),function(e,t,i){e.svgOverlay=t,e.svgStyle=i;}(r,s,e);}const o=A([r,i]);return o.setStyle("position","relative"),o.setStyle("display","inline"),o.height=L(i)+a,o.depth=S(i)+a,o.setLeft(a),o.setRight(a),[o]}),Ee("box",(e,t)=>{const i="number"==typeof t.padding?t.padding:.3,a=A(Ne(e,t.body),"","mord");a.setStyle("vertical-align",-S(a),"em"),a.setStyle("height",0);const r=A(a,"","mord"),s=A("","ML__box");s.setStyle("position","absolute"),s.setStyle("height",L(r)+S(r)+2*i,"em"),0!==i?s.setStyle("width","calc(100% + "+2*i+"em)"):s.setStyle("width","100%"),s.setStyle("top",-i,"em"),s.setStyle("left",-i,"em"),s.setStyle("z-index","-1"),s.setStyle("box-sizing","border-box"),t.backgroundcolor&&s.setStyle("background-color",t.backgroundcolor),t.framecolor&&s.setStyle("border","0.04em solid "+t.framecolor),t.border&&s.setStyle("border",t.border),r.setStyle("display","inline-block"),r.setStyle("height",L(r)+S(r),"em");const o=A([s,r]);return o.setStyle("position","relative"),o.setStyle("vertical-align",-i+S(r),"em"),o.height=L(r)+i,o.depth=S(r)+i,o.setLeft(i),o.setRight(i),o.setStyle("height",o.height+o.depth-2*i,"em"),o.setStyle("top",-i,"em"),o.setStyle("display","inline-block"),[o]}),Ee("mop",(t,i)=>{var a;const r=t.mathstyle;let s,o=0,n=0;if(i.isSymbol){const e=r.size===c.displaystyle.size&&"\\smallint"!==i.symbol;s=$(e?"Size2-Regular":"Size1-Regular",i.body,"op-symbol "+(e?"large-op":"small-op"),"mop"),o=(s.height-s.depth)/2-r.metrics.axisHeight*r.sizeMultiplier,n=s.italic,s.applyStyle({color:i.isPhantom?"transparent":i.color,backgroundColor:i.isPhantom?"transparent":i.backgroundColor,cssId:i.cssId,cssClass:i.cssClass,letterShapeStyle:t.letterShapeStyle});}else s=e(i.body)?A(Ne(t,i.body),"","mop"):i.makeSpan(t,i.body);i.bind(t,s),i.isSymbol&&s.setTop(o);let l=s;if(i.superscript||i.subscript){const e=null!==(a=i.limits)&&void 0!==a?a:"auto";l="limits"===e||"auto"===e&&r.size===c.displaystyle.size?i.attachLimits(t,s,o,n):i.attachSupsub(t,s,"mop");}return [l]}),Ee("line",(e,t)=>{const i=e.mathstyle,a=Ne(e.cramp(),t.body),r=.04/i.sizeMultiplier,s=A(null,e.mathstyle.adjustTo(c.textstyle)+" "+t.position+"-line");let o;if(s.height=r,s.maxFontSize=1,"overline"===t.position)o=K(e,[a,3*r,s,r]);else {const t=A(a);o=K(e,[r,s,3*r,t],"top",L(t));}return [A(o,t.position,"mord")]}),Ee("leftright",(e,t)=>{if(!t.body)return t.leftDelim?new Fe("math","mopen",t.leftDelim).decompose(e):t.rightDelim?new Fe("math","mclose",t.rightDelim).decompose(e):null;const i=e.clone(),a=Ne(i,t.body),r=i.mathstyle;let s=0,o=0,n=[];if(s=L(a)*r.sizeMultiplier,o=S(a)*r.sizeMultiplier,t.leftDelim&&(n.push(t.bind(e,De("mopen",t.leftDelim,s,o,i,"ML__open"))),n[n.length-1].applyStyle(t.getStyle())),a){for(let r=0;r<a.length;r++)if(a[r].delim){const n=a[r].caret,l=/ML__selected/.test(a[r].classes);a[r]=t.bind(e,De("minner",a[r].delim,s,o,i)),a[r].caret=n,a[r].selected(l);}n=n.concat(a);}if(t.rightDelim){let a,r=t.rightDelim;"?"===r&&(e.smartFence?(r={"(":")","\\{":"\\}","\\lbrace":"\\rbrace","\\langle":"\\rangle","\\lfloor":"\\rfloor","\\lceil":"\\rceil","\\vert":"\\vert","\\lvert":"\\rvert","\\Vert":"\\Vert","\\lVert":"\\rVert","\\lbrack":"\\rbrack","\\ulcorner":"\\urcorner","\\llcorner":"\\lrcorner","\\lgroup":"\\rgroup","\\lmoustache":"\\rmoustache"}[t.leftDelim],r=r||t.leftDelim,a="ML__smart-fence__close"):r="."),n.push(t.bind(e,De("mclose",r,s,o,i,(a||"")+" ML__close"))),n[n.length-1].applyStyle(t.getStyle());}return t.inner?[A(n,r.cls(),"minner")]:n}),Ee("surd",(e,t)=>{const i=e.mathstyle,a=Ne(e.cramp(),t.body),r=.04/i.sizeMultiplier;let s=r;i.id<c.textstyle.id&&(s=i.metrics.xHeight);let o=r+s/4;const n=A($e("","\\surd",Math.max(2*s,(L(a)+S(a))*i.sizeMultiplier)+(o+r),!1,e),"sqrt-sign");n.applyStyle(t.getStyle());const l=n.height+n.depth-r;l>L(a)+S(a)+o&&(o=(o+l-(L(a)+S(a)))/2),n.setTop(n.height-L(a)-(o+r));const d=A(null,e.mathstyle.adjustTo(c.textstyle)+" sqrt-line");d.applyStyle(t.getStyle()),d.height=r;const m=K(e,[a,o,d,r]);if(!t.index)return [t.bind(e,A([n,m],"sqrt","mord"))];const h=e.clone({mathstyle:c.scriptscriptstyle}),p=K(e,[A(Ne(h,t.index),i.adjustTo(c.scriptscriptstyle))],"shift",-.6*(Math.max(n.height,m.height)-Math.max(n.depth,m.depth)));return [t.bind(e,A([A(p,"root"),n,m],"sqrt","mord"))]});const Ye={main:["Main-Regular","ML__cmr"],"main-italic":["Main-Italic","ML__cmr ML__it"],"main-bold":["Main-Bold","ML__cmr ML__bold"],"main-bolditalic":["Main-BoldItalic","ML__cmr ML_bold ML__it"],normal:["Main-Regular","ML__cmr"],"normal-bold":["Main-Bold","ML__mathbf"],"normal-italic":["Math-Italic","ML__mathit"],"normal-bolditalic":["Math-BoldItalic","ML__mathbfit"],ams:["AMS-Regular","ML__ams"],"ams-bold":["AMS-Regular","ML__ams"],"ams-italic":["AMS-Regular","ML__ams"],"ams-bolditalic":["AMS-Regular","ML__ams"],"sans-serif":["SansSerif-Regular","ML__sans"],"sans-serif-bold":["SansSerif-Regular","ML__sans ML__bold"],"sans-serif-italic":["SansSerif-Regular","ML__sans"],"sans-serif-bolditalic":["SansSerif-Regular","ML__sans"],calligraphic:["Caligraphic-Regular","ML__cal"],"calligraphic-bold":["Caligraphic-Regular","ML__cal ML__bold"],"calligraphic-italic":["Caligraphic-Regular","ML__cal ML__it"],"calligraphic-bolditalic":["Caligraphic-Regular","ML__cal ML__bold ML__it"],script:["Script-Regular","ML__script"],"script-bold":["Script-Regular","ML__script ML__bold"],"script-italic":["Script-Regular","ML__script ML__it"],"script-bolditalic":["Script-Regular","ML__script ML__bold ML__it"],fraktur:["Fraktur-Regular","ML__frak"],"fraktur-bold":["Fraktur-Regular","ML__frak"],"fraktur-italic":["Fraktur-Regular","ML__frak"],"fraktur-bolditalic":["Fraktur-Regular","ML__frak"],monospace:["Typewriter-Regular","ML__tt"],"monospace-bold":["Typewriter-Regular","ML__tt ML__bold"],"monospace-italic":["Typewriter-Regular","ML__tt ML__it"],"monospace-bolditalic":["Typewriter-Regular","ML__tt ML__bold ML__it"],"double-struck":["AMS-Regular","ML__bb"],"double-struck-bold":["AMS-Regular","ML__bb"],"double-struck-italic":["AMS-Regular","ML__bb"],"double-struck-bolditalic":["AMS-Regular","ML__bb"]},Je={"double-struck":/^[A-Z ]$/,script:/^[A-Z ]$/,calligraphic:/^[0-9A-Z ]$/,fraktur:/^[0-9A-Za-z ]$|^[!"#$%&'()*+,\-./:;=?[]^’‘]$/,monospace:/^[0-9A-Za-z ]$|^[!"&'()*+,\-./:;=?@[\]^_~\u0131\u0237\u0393\u0394\u0398\u039b\u039e\u03A0\u03A3\u03A5\u03A8\u03a9]$/,"sans-serif":/^[0-9A-Za-z ]$|^[!"&'()*+,\-./:;=?@[\]^_~\u0131\u0237\u0393\u0394\u0398\u039b\u039e\u03A0\u03A3\u03A5\u03A8\u03a9]$/},Qe=/^[\u03b1-\u03c9]|\u03d1|\u03d5|\u03d6|\u03f1|\u03f5]$/,et=[/^[a-z]$/,/^[A-Z]$/,Qe,/^[\u0393|\u0394|\u0398|\u039b|\u039E|\u03A0|\u03A3|\u03a5|\u03a6|\u03a8|\u03a9]$/],tt={iso:["it","it","it","it"],tex:["it","it","it","up"],french:["it","up","up","up"],upright:["up","up","up","up"]};b("math",{emitLatexRun:function(e,t,i){let a=e.variant;return e.variantStyle&&"up"!==e.variantStyle&&(a+="-"+e.variantStyle),u(g(t,"color").map(t=>{const r=u(g(t,"variant").map(t=>{let r=t[0].variant;if(t[0].variantStyle&&"up"!==t[0].variantStyle&&(r+="-"+t[0].variantStyle),t.every(t=>{const i=ae(t.symbol,e.mode,null);if(!i||!i.variant&&!i.variantStyle)return !1;let a=t.variant;return t.variantStyle&&"up"!==t.variantStyle&&(a+="-"+t.variantStyle),a===r}))return u(t.map(e=>e.toLatex(i)));let s="";return r&&r!==a&&(s={calligraphic:"\\mathcal{",fraktur:"\\mathfrak{","double-struck":"\\mathbb{",script:"\\mathscr{",monospace:"\\mathtt{","sans-serif":"\\mathsf{",normal:"\\mathrm{","normal-italic":"\\mathit{","normal-bold":"\\mathbf{","normal-bolditalic":"\\mathbfit{",ams:"","ams-italic":"\\mathit{","ams-bold":"\\mathbf{","ams-bolditalic":"\\mathbfit{",main:"","main-italic":"\\mathit{","main-bold":"\\mathbf{","main-bolditalic":"\\mathbfit{"}[r]),s+u(t.map(e=>e.toLatex(i)))+(s?"}":"")}));return !t[0].color||e&&e.color===t[0].color?r:"\\textcolor{"+be(t[0].color)+"}{"+r+"}"}))},applyStyle:function(e,t){const i="auto"!==t.letterShapeStyle&&t.letterShapeStyle?t.letterShapeStyle:"tex";let a=t.variant||"normal",r=t.variantStyle||"";"normal"===a&&!r&&/\u00a3|\u0131|\u0237/.test(e.body)&&(a="main",r="italic"),"normal"!==a||r||1!==e.body.length||et.forEach((t,a)=>{t.test(e.body)&&"it"===tt[i][a]&&(r="italic");}),"up"===r&&(r="");const s=r?a+"-"+r:a,[o,n]=Ye[s];return Je[a]&&!Je[a].test(e.body)?(e.body=Y(e.body,a,r),e.variant="",e.variantStyle="",null):(Qe.test(e.body)&&(e.classes+=" lcGreek"),n&&(e.classes+=" "+n),o)}});const it={roman:"","sans-serif":"ML__sans",monospace:"ML__tt"};function at(e){return !/^<({|}|\$|\$\$|space)>$/.test(e)}b("text",{emitLatexRun:function(e,t,i){const a=function(e,t,i){return u(g(t,"color").map(t=>{const i=function(e,t,i){return function(e,t,i){return u(g(t,"fontFamily").map(e=>{const t=function(e,t,i){return u(g(t,"fontSize").map(e=>{const t=function(e,t,i){return u(g(t,"fontSeries").map(e=>{const t=function(e,t,i){return u(g(t,"fontShape").map(e=>{const t=function(e,t,i){let a=!1;return u(t.map(e=>{let t="",i="";return e.latex?t=e.latex:"string"==typeof e.body?t=Q("text",e.body):e.symbol&&(t=e.symbol.replace(/\\/g,"\\backslash ")),!a||t&&!/^[a-zA-Z0-9*]/.test(t)||(i="{}"),a=/\\[a-zA-Z0-9]+\*?$/.test(t),i+t}))}(0,e);return "it"===e[0].fontShape?"\\textit{"+t+"}":"sl"===e[0].fontShape?"\\textsl{"+t+"}":"sc"===e[0].fontShape?"\\textsc{"+t+"}":"n"===e[0].fontShape?"\\textup{"+t+"}":e[0].fontShape?"\\fontshape{"+e[0].fontShape+"}"+t:t}))}(0,e);return "b"===e[0].fontSeries?"\\textbf{"+t+"}":"l"===e[0].fontSeries?"\\textlf{"+t+"}":"m"===e[0].fontSeries?"\\textmd{"+t+"}":e[0].fontSeries?"\\fontseries{"+e[0].fontSeries+"}"+t:t}))}(0,e),i={size1:"tiny",size2:"scriptsize",size3:"footnotesize",size4:"small",size5:"normalsize",size6:"large",size7:"Large",size8:"LARGE",size9:"huge",size10:"Huge"}[e[0].fontSize]||"";return i?"\\"+i+" "+t:t}))}(0,e),i={roman:"textrm",monospace:"texttt","sans-serif":"textsf"}[e[0].fontFamily]||"";return i?"\\"+i+"{"+t+"}":e[0].fontFamily?"\\fontfamily{"+e[0].fontFamily+"}"+t:t}))}(0,t)}(0,t);return !t[0].color||"none"===t[0].color||e&&e.color===t[0].color?i:"\\textcolor{"+be(t[0].color)+"}{"+i+"}"}))}(e,t);return t.every(e=>e.fontSeries||e.fontShape||e.fontFamily)&&t[0].mode===e.mode?a:`\\text{${a}}`},applyStyle:function(e,t){const i=t.fontFamily;if(it[i]?e.classes+=" "+it[i]:i&&e.setStyle("font-family",i),t.fontShape&&(e.classes+=" "+({it:"ML__it",sl:"ML__shape_sl",sc:"ML__shape_sc",ol:"ML__shape_ol"}[t.fontShape]||"")),t.fontSeries){const i=t.fontSeries.match(/(.?[lbm])?(.?[cx])?/);i&&(e.classes+=" "+({ul:"ML__series_ul",el:"ML__series_el",l:"ML__series_l",sl:"ML__series_sl",m:"",sb:"ML__series_sb",b:"ML__bold",eb:"ML__series_eb",ub:"ML__series_ub"}[i[1]||""]||""),e.classes+=" "+({uc:"ML__series_uc",ec:"ML__series_ec",c:"ML__series_c",sc:"ML__series_sc",n:"",sx:"ML__series_sx",x:"ML__series_x",ex:"ML__series_ex",ux:"ML__series_ux"}[i[2]||""]||""));}return "Main-Regular"},parse:(e,t,i)=>function(e,t,i){let a,r=[];for(;e.length>0;){const s=e.shift();if("<space>"===s)a=new Fe("text",""," ",i.style),a.symbol=" ",r.push(a);else if("\\"===s[0]){let t;e.unshift(s),[t,e]=i.parse("text",e,i),r=[...r,...t];}else if(1===s.length){const e=ae(s,"text",i.macros);!e||e.mode&&!e.mode.includes("text")?t({code:"unexpected-token"}):(a=new Fe("text",e?e.type:"",e?e.value:s,i.style),a.symbol=s,a.latex=X("text",s),r.push(a));}else if("<$>"===s||"<$$>"===s){const t=e.slice(0,e.findIndex(e=>e===s));e=e.slice(t.length+1);const[a]=i.parse("math",t,i);r=[...r,...a];}else "<{>"===s||"<}>"===s||t({code:"unexpected-token",arg:s});}return [r,e]}(e,t,i)[0]});class rt{constructor(e,t,i,a){this.index=0,this.style={},this.parseMode="math",this.smartFence=!1,this.tabularMode=!1,this.atoms=[],this.endCount=0,this.tokens=e,this.args=t,this.macros=i,this.onError=e=>a({before:f(this.tokens.slice(this.index,this.index+10)),after:f(this.tokens.slice(Math.max(0,this.index-10),this.index)),...e});}swapAtoms(e=[]){const t=this.atoms;return this.atoms=e,t}swapParseMode(e){const t=this.parseMode;return this.parseMode=e,t}end(){return this.endCount++,this.index>=this.tokens.length||this.endCount>1e3}get(){return this.endCount=0,this.index<this.tokens.length?this.tokens[this.index++]:""}peek(){return this.tokens[this.index]}match(e){return this.tokens[this.index]===e&&(this.index++,!0)}lastSubsupAtom(){const e=0===this.atoms.length?void 0:this.atoms[this.atoms.length-1];return (!e||"mop"!==e.type&&"leftright"!==e.type&&"msubsup"!==e.type)&&((null==e?void 0:e.limits)&&"nolimits"!==(null==e?void 0:e.limits)||this.atoms.push(new Fe(this.parseMode,"msubsup","​"))),this.atoms[this.atoms.length-1]}hasPattern(e){return e.test(this.tokens[this.index])}hasInfixCommand(){const e=this.index;if(e<this.tokens.length&&"\\"===this.tokens[e][0]){const t=ae(this.tokens[e],this.parseMode,this.macros);return !((null==t?void 0:t.mode)&&!t.mode.includes(this.parseMode))&&(null==t?void 0:t.infix)}return !1}matchColumnSeparator(){const e=this.index;return !(!this.tabularMode||"&"!==this.tokens[e]||(this.index++,0))}matchRowSeparator(){const e=this.index;return !(!this.tabularMode||"\\\\"!==this.tokens[e]&&"\\cr"!==this.tokens[e]||(this.index++,0))}placeholder(){var e;if(!this.args||void 0===this.args["?"]){const e=new Fe(this.parseMode,"placeholder","?",this.style);return e.captureSelection=!0,[e]}return "string"==typeof(null===(e=this.args)||void 0===e?void 0:e["?"])?st(this.args["?"],this.parseMode,null,this.macros,!1,this.onError):this.args["?"]}matchWhitespace(){let e=!1;for(;this.match("<space>");)e=!0;return e}skipUntilToken(e){let t=this.tokens[this.index];for(;t&&t!==e;)t=this.tokens[++this.index];t===e&&this.index++;}skipFiller(){let e=!1;do{const t=this.matchWhitespace(),i=this.match("\\relax");e=!t&&!i;}while(!e)}matchKeyword(e){const t=this.index;let i=this.end(),a="";for(;!i;){const t=this.get();at(t)?(a+=t,i=this.end()||a.length>=e.length):i=!0;}const r=e.toUpperCase()===a.toUpperCase();return r||(this.index=t),r}scanString(){let e="",t=this.end();for(;!t;){if(this.match("<space>"))e+=" ";else {const i=this.peek();"]"===this.peek()?t=!0:at(i)?e+=this.get():"\\"===i[0]?(this.onError({code:"unbalanced-braces"}),e+=this.get()):t=!0;}t=t||this.end();}return e}matchLiteralArg(){var e;let t="";if(this.match("<{>")){let i=1;for(;i>0&&!this.end();){const a=this.get();"<}>"===a?(i-=1,i>0&&(t+="}")):"<{>"===a?(i+=1,t+="{"):t+=null!==(e={"<space>":" ","<$$>":"$$","<$>":"$"}[a])&&void 0!==e?e:a;}}return t}scanColor(){return ye(this.scanString())}scanNumber(e=!0){var t,i;let a=!1,r=this.peek();for(;"<space>"===r||"+"===r||"-"===r;)this.get(),"-"===r&&(a=!a),r=this.peek();e=!!e;let s=10,o=/[0-9]/;if(this.match("'"))s=8,o=/[0-7]/,e=!0;else if(this.match('"')||this.match("x"))s=16,o=/[0-9A-F]/,e=!0;else if(this.match("`"))return r=this.get(),r?r.startsWith("\\")&&2===r.length?(a?-1:1)*(null!==(t=r.codePointAt(1))&&void 0!==t?t:0):(a?-1:1)*(null!==(i=r.codePointAt(0))&&void 0!==i?i:0):NaN;let n="";for(;this.hasPattern(o);)n+=this.get();if(!e&&(this.match(".")||this.match(",")))for(n+=".";this.hasPattern(o);)n+=this.get();const l=e?parseInt(n,s):parseFloat(n);return a?-l:l}scanDimen(){const e=this.scanNumber(!1);let t;return this.matchWhitespace(),this.matchKeyword("pt")?t=o(e,"pt"):this.matchKeyword("mm")?t=o(e,"mm"):this.matchKeyword("cm")?t=o(e,"cm"):this.matchKeyword("ex")?t=o(e,"ex"):this.matchKeyword("px")?t=o(e,"px"):this.matchKeyword("em")?t=o(e,"em"):this.matchKeyword("bp")?t=o(e,"bp"):this.matchKeyword("dd")?t=o(e,"dd"):this.matchKeyword("pc")?t=o(e,"pc"):this.matchKeyword("in")?t=o(e,"in"):this.matchKeyword("mu")?t=o(e,"mu"):(this.onError({code:"missing-unit"}),t=o(e,"pt")),t}scanSkip(){const e=this.scanDimen();return this.matchWhitespace(),this.matchKeyword("plus")&&this.scanDimen(),this.matchWhitespace(),this.matchKeyword("minus")&&this.scanDimen(),e}scanColspec(){this.matchWhitespace();const e=[];for(;!this.end()&&"<}>"!==this.peek()&&"]"!==this.peek();){const t=this.get();if("c"===t||"r"===t||"l"===t)e.push({align:t});else if("|"===t)e.push({rule:!0});else if("@"===t){if(this.match("<{>")){const t=this.swapParseMode("math");e.push({gap:this.parse(e=>"<}>"===e)}),this.swapParseMode(t);}this.match("<}>")||this.onError({code:"unbalanced-braces"});}}return e}parseModeSet(){let e="";if(this.match("\\(")&&(e="\\)"),!e&&this.match("\\[")&&(e="\\]"),!e)return null;const t=this.swapParseMode("math"),i=new Fe("math","group");return i.mathstyle="\\)"===e?"textstyle":"displaystyle",i.body=this.parse(t=>t===e),this.match(e)||this.onError({code:"unbalanced-mode-shift"}),this.swapParseMode(t),i.body&&0!==i.body.length?i:null}parseModeShift(){let e="";if(this.match("<$>")&&(e="<$>"),!e&&this.match("<$$>")&&(e="<$$>"),!e)return null;const t=new Fe("math","group");t.mathstyle="<$>"===e?"textstyle":"displaystyle",t.latexOpen="<$>"===e?"$":"$$",t.latexClose=t.latexOpen;const i=this.swapParseMode("math");return t.body=this.parse(t=>t===e),this.match(e)||this.onError({code:"unbalanced-mode-shift"}),this.swapParseMode(i),t.body&&0!==t.body.length?t:null}parseEnvironment(){if(!this.match("\\begin"))return null;const e=this.parseArgument("string");if(!e)return null;const t=ie(e);if(!t)return this.onError({code:"unknown-environment",arg:e}),null;const i=[];if(null==t?void 0:t.params)for(const a of t.params)if(a.isOptional)i.push(this.parseOptionalArgument(a.type));else {const t=this.parseArgument(a.type);t||this.onError({code:"missing-argument",arg:e}),i.push(t);}const a=this.parseMode,r=this.tabularMode,s=this.swapAtoms([]);this.tabularMode=t.tabular;const o=[],n=[];let l=[],c=!1;do{if(this.end()&&(this.onError({code:"unbalanced-environment",arg:e}),c=!0),!c&&this.match("\\end")&&(this.parseArgument("string")!==e&&this.onError({code:"unbalanced-environment",arg:e}),c=!0),!c)if(this.matchColumnSeparator())l.push(this.swapAtoms([]));else if(this.matchRowSeparator()){l.push(this.swapAtoms([]));let e=0;this.matchWhitespace(),this.match("[")&&(e=this.scanDimen(),this.matchWhitespace(),this.match("]")),n.push(e||0),o.push(l),l=[];}else this.atoms=this.atoms.concat(this.parse(e=>"<}>"===e||"&"===e||"\\end"===e||"\\cr"===e||"\\\\"===e));}while(!c);l.push(this.swapAtoms([])),l.length>0&&o.push(l);const d=this.swapAtoms(s);if(this.parseMode=a,this.tabularMode=r,!t.tabular&&0===d.length)return null;if(t.tabular&&0===o.length)return null;const m=new Fe(this.parseMode,"array",d);return Object.assign(m,t.parser(e,i,o)),m.array=o,m.rowGaps=n,m.environmentName=e,m}parse(e){var t;const i=this.style;e||(e=e=>"<}>"===e);let a="",r=null,s=[],o=null;const n=this.swapAtoms([]);for(;!this.end()&&!e(this.peek());)this.hasInfixCommand()&&!a?(a=this.get(),r=ae(a,"math",this.macros),r&&(s=this.parseArguments(r)[1]),o=this.swapAtoms([])):this.parseToken();let l;return a?(s.unshift(this.swapAtoms(n)),o&&s.unshift(o),l=[new Fe(this.parseMode,r.type,null!==(t=r.value)&&void 0!==t?t:a.slice(1),r.parse?r.parse(a,s):null)],l[0].symbol=a):l=this.swapAtoms(n),this.style=i,l}parseGroup(){if(!this.match("<{>"))return null;const e=new Fe(this.parseMode,"group");return e.body=this.parse(e=>"<}>"===e),this.match("<}>")||this.onError({code:"unbalanced-braces"}),e.latexOpen="{",e.latexClose="}",e}scanSmartFence(){if(this.matchWhitespace(),!this.match("("))return null;const e=new Fe(this.parseMode,"leftright");e.leftDelim="(",e.inner=!1;const t=this.swapAtoms([]);let i=1;for(;!this.end()&&0!==i;)this.match("(")&&(i+=1),this.match(")")&&(i-=1),0!==i&&this.parseToken();return 0===i&&this.match(")"),e.rightDelim=0===i?")":"?",e.body=this.swapAtoms(t),e}scanDelim(){this.matchWhitespace();const e=this.get();if(!e)return this.onError({code:"unexpected-end-of-string"}),null;let t=".";("\\"===e[0]||at(e))&&(t=e);const i=ae(t,"math",this.macros);return i?i.mode&&!i.mode.includes(this.parseMode)?(this.onError({code:"unexpected-delimiter",arg:t}),null):"mopen"===i.type||"mclose"===i.type||/^(\.|\?|\||<|>|\\vert|\\Vert|\\\||\\surd|\\uparrow|\\downarrow|\\Uparrow|\\Downarrow|\\updownarrow|\\Updownarrow|\\mid|\\mvert|\\mVert)$/.test(t)?t:(this.onError({code:"unexpected-delimiter",arg:t}),null):(this.onError({code:"unknown-command",arg:t}),null)}parseLeftRight(){if(this.match("\\right")||this.match("\\mright"))return this.onError({code:"unbalanced-braces"}),null;const e=this.style;let t="\\right";if(!this.match("\\left")){if(!this.match("\\mleft"))return null;t="\\mright";}const i=this.scanDelim();if(!i)return null;const a=this.swapAtoms([]);for(;!this.end()&&!this.match(t);)this.parseToken();this.style=e;const r=this.scanDelim(),s=new Fe(this.parseMode,"leftright");return s.leftDelim=i,s.rightDelim=null!=r?r:void 0,s.inner="right"===t,s.body=this.swapAtoms(a),s}parseSupSub(){var e,t;if("math"!==this.parseMode)return !1;let i=!1,a=this.peek();for(;"^"===a||"_"===a||"'"===a;){const r="_"===a?"subscript":"superscript";if(this.match("^")||this.match("_")){const t=this.parseArgument("math");if(t){const a=this.lastSubsupAtom();a[r]=(null!==(e=a[r])&&void 0!==e?e:[]).concat(t),i=!0;}}else if(this.match("'")){const e=this.lastSubsupAtom(),a=new Fe(e.mode,"mord","′");a.symbol="\\prime",e.superscript=null!==(t=e.superscript)&&void 0!==t?t:[],e.superscript.push(a),i=!0;}a=this.peek();}return i}parseLimits(){if(this.match("\\limits")){const e=this.lastSubsupAtom();return e.limits="limits",e.explicitLimits=!0,!0}if(this.match("\\nolimits")){const e=this.lastSubsupAtom();return e.limits="nolimits",e.explicitLimits=!0,!0}return !1}parseArguments(e){if(!e||!e.params)return [void 0,[]];let t;const i=[];let a=e.infix?2:0;for(;a<e.params.length;){const r=e.params[a];if(r.isOptional)i.push(this.parseOptionalArgument(r.type));else if(r.type.endsWith("*"))t=r.type.slice(0,-1);else {const e=this.parseArgument(r.type);e?i.push(e):(this.onError({code:"missing-argument"}),i.push(this.placeholder()));}a+=1;}return [t,i]}parseArgument(e){var t;let i;if(this.skipFiller(),e="auto"===e?this.parseMode:e,!this.match("<{>")){if("delim"===e)return null!==(t=this.scanDelim())&&void 0!==t?t:".";if(/^(math|text)$/.test(e)){const t=this.swapParseMode(e),i=this.parseSimpleToken();return this.swapParseMode(t),i}}const a=this.parseMode;this.parseMode=e;const r=this.swapAtoms([]);if("string"===e)i=this.scanString(),this.skipUntilToken("<}>");else if("number"===e)i=this.scanNumber(),this.skipUntilToken("<}>");else if("dimen"===e)i=this.scanDimen(),this.skipUntilToken("<}>");else if("skip"===e)i=this.scanSkip(),this.skipUntilToken("<}>");else if("colspec"===e)i=this.scanColspec(),this.skipUntilToken("<}>");else if("color"===e)i=this.scanColor()||"#ffffff",this.skipUntilToken("<}>");else if("delim"===e)i=this.scanDelim()||".",this.skipUntilToken("<}>");else {const t=this.index;let a=1;do{const e=this.get();"<}>"===e&&(a-=1),"<{>"===e&&(a+=1);}while(a>0&&!this.end());if(i=function(e,t,i,a){var r;return (null===(r=y[e])||void 0===r?void 0:r.parse)?y[e].parse(t,i,a):null}(e,this.tokens.slice(t,this.index-1),this.onError,{args:this.args,macros:this.macros,smartFence:this.smartFence,style:this.style,parse:(e,t,a)=>{const r=new rt(t,a.args,a.macros,this.onError);return r.parseMode=e,r.style=a.style,i=r.parse(),[i,t.slice(r.index)]}}),!i){this.index=t;do{this.atoms=this.atoms.concat(this.parse());}while(!this.match("<}>")&&!this.end())}}this.parseMode=a;const s=this.swapAtoms(r);return i||s}parseOptionalArgument(e){var t;if(e="auto"===e?this.parseMode:e,this.matchWhitespace(),!this.match("["))return null;const i=this.parseMode;this.parseMode=e;const a=this.swapAtoms();let r;for(;!this.end()&&!this.match("]");)if("string"===e)r=this.scanString();else if("number"===e)r=this.scanNumber();else if("dimen"===e)r=this.scanDimen();else if("skip"===e)r=this.scanSkip();else if("colspec"===e)r=this.scanColspec();else if("color"===e)r=null!==(t=this.scanColor())&&void 0!==t?t:"#ffffff";else if("bbox"===e){const e=this.scanString().toLowerCase().trim().split(/,(?![^(]*\)(?:(?:[^(]*\)){2})*[^"]*$)/),t={};for(const i of e){const e=ye(i);if(e)t.backgroundcolor=e;else {const e=i.match(/^\s*([0-9.]+)\s*([a-z][a-z])/);if(e)t.padding=o(e[1],e[2]);else {const e=i.match(/^\s*border\s*:\s*(.*)/);e&&(t.border=e[1]);}}}r=t;}else this.atoms=this.atoms.concat(this.parse(e=>"]"===e));this.parseMode=i;const s=this.swapAtoms(a);return r||s}parseSimpleToken(){const t=this.get();if(!t)return null;let i=null;if("<space>"===t)"text"===this.parseMode&&(i=new Fe("text",""," ",this.style),i.symbol=" ");else if("\\"===t[0]){if("\\placeholder"===t)i=new Fe(this.parseMode,"placeholder",this.parseArgument("string"),this.style),i.captureSelection=!0;else if("\\char"===t){const e=this.index;let t=Math.floor(this.scanNumber(!0));(!isFinite(t)||t<0||t>1114111)&&(t=10067),i=new Fe(this.parseMode,"math"===this.parseMode?"mord":"",String.fromCodePoint(t)),i.symbol="\\char",i.latex="\\char"+f(this.tokens.slice(e,this.index));}else if("\\hskip"===t||"\\kern"===t){const e=this.scanSkip();isFinite(e)&&(i=new Fe(this.parseMode,"spacing",null,this.style),i.width=e,i.symbol=t,i.latex=t);}else if(i=this.scanMacro(t),!i){const e=ae(t,this.parseMode,{});if(!e)return this.onError({code:"unknown-command",arg:t}),i=new Fe("math","error",t),i.symbol=t,i.latex=t,[i];if(e.mode&&!e.mode.includes(this.parseMode))return this.onError({code:"invalid-command",arg:t}),i=new Fe("math","error",t),i.symbol=t,i.latex=t,[i];const a=this.index,[r,s]=this.parseArguments(e);if(!s)return null;if(e.infix)this.onError({code:"too-many-infix-commands",arg:t});else {if(e.parse){const a=e.parse(t,s);if(a.type)i=new Fe(this.parseMode,e.type,r?this.parseArgument(r):null,{...this.style,...a});else {const e=this.parseMode;if(a.mode&&(this.parseMode=a.mode,delete a.mode),a.mathstyle){this.parseMode="math";const e=new Fe("math","mathstyle");e.mathstyle=a.mathstyle,this.atoms.push(e);}if(r){const e=this.style;this.style={...this.style,...a},i=this.parseArgument(r),this.style=e;}else this.style={...this.style,...a};this.parseMode=e;}}else {const a={...this.style,variant:e.variant||this.style.variant,variantStyle:e.variantStyle||this.style.variantStyle};i=new Fe(this.parseMode,e.type||"mop",e.value||t,a);}if(i instanceof Fe&&!/^\\(llap|rlap|class|cssId)$/.test(t)){i.symbol=t;const e=f(this.tokens.slice(a,this.index));if(e&&(i.latex=i.symbol+e),i.isFunction&&this.smartFence){const e=this.scanSmartFence();e&&(i=[i,e]);}}}}}else if(at(t)){const e=ae(t,this.parseMode,this.macros);if(e){const a={...this.style};i=new Fe(this.parseMode,e.type,e.value||t,a),e.isFunction&&(i.isFunction=!0);}else i=new Fe(this.parseMode,"math"===this.parseMode?"mord":"",t,this.style);if(i.symbol=t,i.latex=J(this.parseMode,t),(null==e?void 0:e.isFunction)&&this.smartFence){const e=this.scanSmartFence();e&&(i=[i,e]);}}else "<}>"===t?this.onError({latex:"",code:"unbalanced-braces"}):this.onError({latex:"",code:"unexpected-token",arg:t});return i&&!e(i)?[i]:i}scanMacro(e){var t;const i=e.slice(1);if(!this.macros||!this.macros[i])return null;const a=this.index,r=[];let s,o=0;"string"==typeof this.macros[i]?(s=this.macros[i],/(^|[^\\])#1/.test(s)&&(o=1),/(^|[^\\])#2/.test(s)&&(o=2),/(^|[^\\])#3/.test(s)&&(o=3),/(^|[^\\])#4/.test(s)&&(o=4),/(^|[^\\])#5/.test(s)&&(o=5),/(^|[^\\])#6/.test(s)&&(o=6),/(^|[^\\])#7/.test(s)&&(o=7),/(^|[^\\])#8/.test(s)&&(o=8),/(^|[^\\])#9/.test(s)&&(o=9)):(s=this.macros[i].def,o=this.macros[i].args||0);for(let e=1;e<=o;e++)r[e]=this.matchLiteralArg();r["?"]=null===(t=this.args)||void 0===t?void 0:t["?"];const n=new Fe(this.parseMode,"group",st(s,this.parseMode,r,this.macros,!1,this.onError));return n.captureSelection=!0,n.symbol=e,n.latex=e+f(this.tokens.slice(a)),n}parseToken(){let t=this.parseEnvironment()||this.parseModeShift()||this.parseModeSet()||this.parseGroup()||this.parseLeftRight();return !(t||!this.parseSupSub()&&!this.parseLimits())||(t||(t=this.parseSimpleToken()),e(t)?this.atoms=this.atoms.concat(t):t&&this.atoms.push(t),null!==t)}}function st(e,t,i,a,r=!1,s){let o=[];const n=new rt(Xe(e,i),i,a,t=>{s&&s({...t,latex:e});});for(n.parseMode=t||"math",r&&(n.smartFence=!0);!n.end();){const e=n.parse();e&&(o=o.concat(e));}return o}async function ot(e,t){if("fonts"in document){const i=["KaTeX_Main","KaTeX_Math","KaTeX_AMS","KaTeX_Caligraphic","KaTeX_Fraktur","KaTeX_SansSerif","KaTeX_Script","KaTeX_Size1","KaTeX_Size2","KaTeX_Size3","KaTeX_Size4"];let a=!1;if(!/firefox/i.test(navigator.userAgent))try{a=i.every(e=>document.fonts.check("16px "+e));}catch(e){a=!1;}if(!a){if(document.body.classList.contains("ML__fonts-loading"))return;document.body.classList.add("ML__fonts-loading");const i=new URL(".",(document.currentScript && document.currentScript.src || new URL('app.js', document.baseURI).href)).toString(),a=new URL(null!=e?e:"./fonts",i).toString(),r=[["KaTeX_Main-Regular"],["KaTeX_Main-BoldItalic",{style:"italic",weight:"bold"}],["KaTeX_Main-Bold",{weight:"bold"}],["KaTeX_Main-Italic",{style:"italic"}],["KaTeX_Math-Italic",{style:"italic"}],["KaTeX_Math-BoldItalic",{style:"italic",weight:"bold"}],["KaTeX_AMS-Regular"],["KaTeX_Caligraphic-Regular"],["KaTeX_Caligraphic-Bold",{weight:"bold"}],["KaTeX_Fraktur-Regular"],["KaTeX_Fraktur-Bold",{weight:"bold"}],["KaTeX_SansSerif-Regular",{style:"italic"}],["KaTeX_SansSerif-Bold",{weight:"bold"}],["KaTeX_SansSerif-Italic",{style:"italic"}],["KaTeX_Script-Regular"],["KaTeX_Typewriter-Regular"],["KaTeX_Size1-Regular"],["KaTeX_Size2-Regular"],["KaTeX_Size3-Regular"],["KaTeX_Size4-Regular"]].map(e=>function(e,t,i={}){return new FontFace(e,`url(${t}.woff2) format('woff2'), url(${t}.woff) format('woff')`,i)}(e[0].replace(/-[a-zA-Z]+$/,""),a+"/"+e[0],e[1]));try{(await Promise.all(r.map(e=>{try{return e.load()}catch(e){"function"==typeof t&&t({code:"font-not-found",arg:e});}}))).forEach(e=>document.fonts.add(e)),document.body.classList.remove("ML__fonts-loading");}catch(e){}}}}function nt(e,t){var i,a;if(!t)return null;let r=null!==(i=null==e?void 0:e.getRootNode())&&void 0!==i?i:null===document||void 0===document?void 0:document.head;if(!r)return null;r===document&&(r=document.head);const s=function(e){let t=0;if(0===e.length)return t;for(let i=0;i<e.length;i++)t=(t<<5)-t+e.charCodeAt(i),t&=t;return t}(t).toString(36),o=r.querySelector(`style[data-id="${s}"]`);if(o){const e=parseFloat(null!==(a=o.getAttribute("data-refcount"))&&void 0!==a?a:"0");o.setAttribute("data-refcount",Number(e+1).toString());}else {const e=document.createElement("style");e.type="text/css",e.dataset.id=s,e.dataset.refcount="1",e.appendChild(document.createTextNode(t)),r.appendChild(e);}return {release:()=>{var e;const t=document.head.querySelector(`style[data-id="${s}"]`);if(t){const i=parseFloat(null!==(e=t.getAttribute("data-refcount"))&&void 0!==e?e:"0");1===i?t.remove():t.setAttribute("data-refcount",Number(i-1).toString());}}}}function lt(e){return 0===e.length||1===e.length&&"first"===e[0].type}function ct(e){const t=e.siblings();for(let e=t.length-1;e>=0;e--)t[e].isSuggestion&&t.splice(e,1);}function dt(e){let t=1,i=e.ancestor(t);for(;i;)i.latex=void 0,t+=1,i=e.ancestor(t);}function mt(e,t){let i="";for(const t of e)i+=t.relation+":"+t.offset+"/";return t&&(i+="#"+t),i}function ht(e){const t={path:[],extent:0},i=e.split("#");i.length>1&&(t.extent=parseInt(i[1]));const a=i[0].split("/");for(const e of a){const i=e.match(/([^:]*):(.*)/);i&&t.path.push({relation:i[1],offset:parseInt(i[2])});}return t}function pt(e,t){let i=0,a=-1,r=!1;for(;!r;)a+=1,r=a>=e.length||a>=t.length,r=r||!(e[a].relation===t[a].relation&&e[a].offset===t[a].offset);return i=a===e.length&&a===t.length?0:a+1===e.length&&a+1===t.length&&e[a].relation===t[a].relation?1:2,i}function ut(e){return ht(mt(e)).path}function ft(e,t){let i=0;for(let a=0;a<t.row;a++)for(let t=0;t<e[a].length;t++)i+=1;return i+=t.col,i}function gt(e,t){let i;if("string"==typeof t){const e=t.match(/cell([0-9]*)$/);e&&(i=parseInt(e[1]));}else i=t;const a={row:0,col:0};for(;i>0;)a.col+=1,(!e[a.row]||a.col>=e[a.row].length)&&(a.col=0,a.row+=1),i-=1;return a}function yt(t,i){var a;let r;return "object"!=typeof i&&(i=gt(t,i)),e(t[i.row])&&(r=null!==(a=t[i.row][i.col])&&void 0!==a?a:null),!r||0!==r.length&&"first"===r[0].type||r.unshift(new Fe("math","first")),r}function bt(e){let t=0,i=0,a=1;for(const t of e)i+=1,t.length>a&&(a=t.length);return t=i*a,t}function vt(e,t,i){const a={...t};if(a.row+=i,a.row<0){if(a.col+=i,a.row=e.length-1,a.col<0)return null;for(;a.row>=0&&!yt(e,a);)a.row-=1;if(a.row<0)return null}else if(a.row>=e.length){for(a.col+=i,a.row=0;a.row<e.length&&!yt(e,a);)a.row+=1;if(a.row>e.length-1)return null}return a}class xt{constructor(e,t,i,a){this.options={mode:"math",removeExtraneousParentheses:!1,...e},this.root=Be(this.options.mode),this.path=[{relation:"body",offset:0}],this.extent=0,this.setListeners(t),this.setHooks(i),this.mathfield=a,this.suppressChangeNotifications=!1;}clone(){const e=new xt(this.options,this.listeners,this.hooks,this.mathfield);return e.root=this.root,e.path=ut(this.path),e}setListeners(e){this.listeners=e;}setHooks(e){this.hooks={announce:(null==e?void 0:e.announce)?e.announce:(e,t,i,a)=>{},moveOut:(null==e?void 0:e.moveOut)?e.moveOut:()=>!0,tabOut:(null==e?void 0:e.tabOut)?e.tabOut:()=>!0};}announce(e,t,i=[]){this.hooks.announce(this.mathfield,e,t,i);}toString(){return mt(this.path,this.extent)}siblings(){if(0===this.path.length)return [];let e;return this.parent().array?e=yt(this.parent().array,this.relation()):(e=this.parent()[this.relation()]||[],"string"==typeof e&&(e=[])),0!==e.length&&"first"===e[0].type||e.unshift(new Fe(this.parent().mode,"first")),e}anchorOffset(){return this.path.length>0?this.path[this.path.length-1].offset:0}focusOffset(){return this.path.length>0?this.path[this.path.length-1].offset+this.extent:0}startOffset(){return Math.min(this.focusOffset(),this.anchorOffset())}endOffset(){return Math.max(this.focusOffset(),this.anchorOffset())}sibling(e){return this.siblings()[this.startOffset()+e]}ancestor(e){if(e>this.path.length)return null;let t=this.root;for(let i=0;i<this.path.length-e;i++){const e=this.path[i];if(t.array)t=yt(t.array,e.relation)[e.offset];else {if(!t[e.relation])return null;{0!==t[e.relation].length&&"first"===t[e.relation][0].type||t[e.relation].unshift(new Fe(t[e.relation][0].mode,"first"));const i=Math.min(e.offset,t[e.relation].length-1);t=t[e.relation][i];}}}return t}parent(){return this.ancestor(1)}relation(){return this.path.length>0?this.path[this.path.length-1].relation:""}insertFirstAtom(){this.siblings();}}function kt(e){var t;"function"!=typeof(null===(t=e.listeners)||void 0===t?void 0:t.onSelectionWillChange)||e.suppressChangeNotifications||e.listeners.onSelectionWillChange(e);}function _t(e){var t;"function"!=typeof(null===(t=e.listeners)||void 0===t?void 0:t.onSelectionDidChange)||e.suppressChangeNotifications||e.listeners.onSelectionDidChange(e);}function wt(e){var t;"function"!=typeof(null===(t=e.listeners)||void 0===t?void 0:t.onContentWillChange)||e.suppressChangeNotifications||e.listeners.onContentWillChange(e);}function Mt(e){var t;"function"!=typeof(null===(t=e.listeners)||void 0===t?void 0:t.onContentDidChange)||e.suppressChangeNotifications||e.listeners.onContentDidChange(e);}function zt(e){return !!e&&("mord"===e.type&&/[0-9.]/.test(e.body)||"mpunct"===e.type&&","===e.body)}function Lt(e){const t=e.siblings();if(t.length<=1)return null;let i=Math.min(e.endOffset(),t.length-1);if("command"!==t[i].type)return null;for(;i>0&&"command"===t[i].type;)i-=1;let a=e.startOffset()+1;for(;a<=t.length-1&&"command"===t[a].type;)a+=1;return a>i?{start:i+1,end:a}:null}function St(e){const t=It(e)?jt(e):e.sibling(1);let i;if(t){if("command"===t.type)return "command";i=t.mode;}let a=1,r=e.ancestor(a);for(;!i&&r;)r&&(i=r.mode),a+=1,r=e.ancestor(a);return i}function Ct(e){const t=It(e)?jt(e):e.sibling(1);let i;if(t&&"first"!==t.type){if("command"===t.type)return {};i={color:t.color,backgroundColor:t.backgroundColor,fontFamily:t.fontFamily,fontShape:t.fontShape,fontSeries:t.fontSeries,fontSize:t.fontSize};}let a=1,r=e.ancestor(a);for(;!i&&r;)r&&(i={color:r.color,backgroundColor:r.backgroundColor,fontFamily:r.fontFamily,fontShape:r.fontShape,fontSeries:r.fontSeries,fontSize:r.fontSize}),a+=1,r=e.ancestor(a);return i}function At(e,t=1,i=!0){var a;const r=e.suppressChangeNotifications;e.suppressChangeNotifications=!0;const s=e.clone(),o=e.extent;Tt(e,t),"placeholder"===jt(e).type&&Tt(e,t);const n=Qt(e,(t,i)=>"placeholder"===i.type||t.length>1&&1===e.siblings().length,t);if(0===n.length){if(Zt(e,s,o),i&&(null===(a=e.hooks)||void 0===a?void 0:a.tabOut)&&e.hooks.tabOut(e,t>0?"forward":"backward")&&document.activeElement){const e='a[href]:not([disabled]),\n                    button:not([disabled]),\n                    textarea:not([disabled]),\n                    input[type=text]:not([disabled]),\n                    select:not([disabled]),\n                    [contentEditable="true"],\n                    [tabindex]:not([disabled]):not([tabindex="-1"])',i=Array.prototype.filter.call(document.querySelectorAll(e),e=>(e.offsetWidth>0||e.offsetHeight>0)&&!e.contains(document.activeElement)||e===document.activeElement);let a=i.indexOf(document.activeElement)+t;a<0&&(a=i.length-1),a>=i.length&&(a=0),i[a].focus();}return e.suppressChangeNotifications=r,!1}return kt(e),Zt(e,n[0]),"placeholder"===jt(e).type&&Ht(e,-1),e.announce("move",s),_t(e),e.suppressChangeNotifications=r,!0}function $t(e,t=0,i=0,a=""){const r=e.path[e.path.length-1].relation;a||(a=r);const s=e.parent();if(!s&&"body"!==a)return !1;const o=a.startsWith("cell");if(!o&&!s[a]||o&&!s.array)return !1;const n=a!==r;e.path[e.path.length-1].relation=a;const l=e.siblings().length;e.path[e.path.length-1].relation=r;const c=e.extent;"end"===i?i=l-t-1:"start"===i&&(i=-t),Ht(e,i);const d=e.extent!==c;Ht(e,c),t<0&&(t=l+t),t=Math.max(0,Math.min(t,l-1));const m=e.path[e.path.length-1].offset;return (n||m!==t||d)&&(n&&Yt(e),kt(e),e.path[e.path.length-1].relation=a,e.path[e.path.length-1].offset=t,Ht(e,i),_t(e)),!0}function Dt(t,i){var a;i=null!=i?i:{};const r={body:"numer",numer:"denom",denom:"index",index:"overscript",overscript:"underscript",underscript:"subscript",subscript:"superscript"};if(t.anchorOffset()===t.siblings().length-1){Yt(t);let e=r[t.relation()];const s=t.parent();for(;e&&!s[e];)e=r[e];if(e)return void $t(t,0,0,e);if(t.parent().array){const e=bt(t.parent().array);let i=parseInt(t.relation().match(/cell([0-9]*)$/)[1])+1;for(;i<e;){if(yt(t.parent().array,i)&&$t(t,0,0,"cell"+i))return void _t(t);i+=1;}}if(1===t.path.length)(t.suppressChangeNotifications||!(null===(a=t.hooks)||void 0===a?void 0:a.moveOut)||t.hooks.moveOut(t,"forward"))&&(t.path[0].offset=0);else {const e=!i.iterateAll&&t.parent().skipBoundary;t.path.pop(),e&&Dt(t,i);}return void _t(t)}$t(t,t.anchorOffset()+1);const s=jt(t);if(s&&!s.captureSelection){let a;if(s.array){let e=0;a="";const i=bt(s.array);for(;!a&&e<i;)yt(s.array,e)&&(a="cell"+e.toString()),e+=1;return t.path.push({relation:a,offset:0}),void $t(t,0,0,a)}for(a="body";a;){if(e(s[a]))return t.path.push({relation:a,offset:0}),t.insertFirstAtom(),void(!i.iterateAll&&s.skipBoundary&&Dt(t,i));a=r[a];}}}function qt(t,i){var a;const r={numer:"body",denom:"numer",index:"denom",overscript:"index",underscript:"overscript",subscript:"underscript",superscript:"subscript"};if(!(i=null!=i?i:{}).iterateAll&&1===t.anchorOffset()&&t.parent()&&t.parent().skipBoundary&&$t(t,0),t.anchorOffset()<1){let e=r[t.relation()];for(;e&&!$t(t,-1,0,e);)e=r[e];const i=t.parent()?t.parent().type:"none";if("body"!==e||"msubsup"!==i&&"mop"!==i||(e=null),e)return;if(Yt(t),kt(t),t.relation().startsWith("cell")){let e=parseInt(t.relation().match(/cell([0-9]*)$/)[1])-1;for(;e>=0;){if(yt(t.parent().array,e)&&$t(t,-1,0,"cell"+e))return void _t(t);e-=1;}}return 1===t.path.length?(t.suppressChangeNotifications||!(null===(a=t.hooks)||void 0===a?void 0:a.moveOut)||t.hooks.moveOut(t,"backward"))&&(t.path[0].offset=t.root.body.length-1):(t.path.pop(),$t(t,t.anchorOffset()-1)),void _t(t)}const s=jt(t);if(!s.captureSelection){let i;if(s.array){i="";const e=bt(s.array);let a=e-1;for(;!i&&a<e;)yt(s.array,a)&&(i="cell"+a.toString()),a-=1;return a+=1,t.path.push({relation:i,offset:yt(s.array,a).length-1}),void $t(t,-1,0,i)}for(i="superscript";i;){if(e(s[i]))return t.path.push({relation:i,offset:s[i].length-1}),void $t(t,-1,0,i);i=r[i];}}$t(t,t.anchorOffset()-1),!i.iterateAll&&t.sibling(0)&&t.sibling(0).skipBoundary&&qt(t,i);}function Tt(e,t,i){var a;const r=null!==(a=(i=null!=i?i:{extend:!1}).extend)&&void 0!==a&&a;if(ct(e),r)r(e,t,i);else {const i=e.clone();if(t>0)for(Wt(e)&&t--;t>0;)Dt(e),t--;else if(t<0)for(Vt(e)&&t++;0!==t;)qt(e),t++;e.announce("move",i);}return !0}function Kt(e,t){var i;const a=null!==(i=(t=null!=t?t:{extend:!1}).extend)&&void 0!==i&&i;Vt(e);const r=e.relation();if("denom"===r)a?(kt(e),e.path.pop(),e.path[e.path.length-1].offset-=1,Ht(e,1),_t(e)):$t(e,e.anchorOffset(),0,"numer"),e.announce("moveUp");else if(e.parent().array){let i=gt(e.parent().array,r);i=vt(e.parent().array,i,-1),i&&yt(e.parent().array,i)?(e.path[e.path.length-1].relation="cell"+ft(e.parent().array,i),$t(e,e.anchorOffset()),e.announce("moveUp")):Tt(e,-1,t);}else e.announce("line");return !0}function Et(e,t){var i;const a=null!==(i=(t=null!=t?t:{extend:!1}).extend)&&void 0!==i&&i;Wt(e);const r=e.relation();if("numer"===r)a?(kt(e),e.path.pop(),e.path[e.path.length-1].offset-=1,Ht(e,1),_t(e)):$t(e,e.anchorOffset(),0,"denom"),e.announce("moveDown");else if(e.parent().array){let i=gt(e.parent().array,r);i=vt(e.parent().array,i,1),i&&yt(e.parent().array,i)?(e.path[e.path.length-1].relation="cell"+ft(e.parent().array,i),$t(e,e.anchorOffset()),e.announce("moveDown")):Tt(e,1,t);}else e.announce("line");return !0}function Nt(e,t){let i=e.path[e.path.length-1].offset,a=0;const r=e.clone();a=e.extent+t;const s=i+a;if(s<0&&0!==a){if(e.path.length>1)return kt(e),e.path.pop(),Ht(e,-1),_t(e),e.announce("move",r),!0;i=e.path[e.path.length-1].offset,a=e.extent;}else if(s>=e.siblings().length){if(e.path.length>1)return kt(e),e.path.pop(),e.path[e.path.length-1].offset-=1,Ht(e,1),_t(e),e.announce("move",r),!0;It(e)&&(i-=1),a-=1;}return $t(e,i,a),e.announce("move",r),!0}function Ft(e,t,i){var a;const r=null!==(a=(i=null!=i?i:{extend:!1}).extend)&&void 0!==a&&a;t=t<0?-1:1;const s=e.clone(),o=e.siblings(),n=e.focusOffset();let l=n+t;if(r&&(l=Math.min(Math.max(0,l),o.length-1)),l<0||l>=o.length)Tt(e,t,i);else {if(o[l]&&"text"===o[l].mode){if(l=function(e,t,i){i=i<0?-1:1;const a=e.siblings();if(!a[t])return t;if("text"!==a[t].mode)return t;let r;if(V.test(a[t].body)){let e,s=t;do{e="text"===a[s].mode&&V.test(a[s].body),s+=i;}while(a[s]&&e);r=a[s]?s-2*i:s-i;}else if(/\s/.test(a[t].body)){let e=t;for(;a[e]&&"text"===a[e].mode&&/\s/.test(a[e].body);)e+=i;if(a[e]){let t=!0;do{t="text"===a[e].mode&&!/\s/.test(a[e].body),e+=i;}while(a[e]&&t);r=a[e]?e-2*i:e-i;}else r=e-i;}else {let e=t;for(;a[e]&&"text"===a[e].mode&&!/\s/.test(a[e].body);)e+=i;r=a[e]?e:e-i;let s=!0;for(;a[e]&&s;)s="text"===a[e].mode&&/\s/.test(a[e].body),s&&(r=e),e+=i;r=a[e]?e-2*i:e-i;}return r-(i>0?0:1)}(e,l,t),l<0&&!r)return void $t(e,0);if(l>o.length)return $t(e,o.length-1),void Tt(e,t,i)}else {const e=o[l]?o[l].type:"";if("mopen"===e&&t>0||"mclose"===e&&t<0){let i="mopen"===e?1:-1;for(l+=t>0?1:-1;l>=0&&l<o.length&&0!==i;)"mopen"===o[l].type?i+=1:"mclose"===o[l].type&&(i-=1),l+=t;0!==i&&(l=n+t),t>0&&(l-=1);}else {for(;o[l]&&"math"===o[l].mode&&o[l].type===e;)l+=t;l-=t>0?1:0;}}if(r){const t=e.anchorOffset();$t(e,t,l-t);}else $t(e,l);e.announce("move",s);}}function Bt(e,t=1,i){var a;i=null!=i?i:{extend:!1},t=t<0?-1:1;const r=e.clone(),s=[{relation:"body",offset:e.path[0].offset}];let o;return null!==(a=!i.extend)&&void 0!==a&&a?(s[0].offset=t<0?0:e.root.body.length-1,o=0):t<0?s[0].offset>0&&(o=-s[0].offset):s[0].offset<e.siblings().length-1&&(o=e.siblings().length-1-s[0].offset),Zt(e,s,o),e.announce("move",r),!0}function Ot(e){if(It(e))return null;const t=[],i=e.siblings(),a=e.startOffset()+1,r=e.endOffset()+1;for(let e=a;e<r;e++)i[e]&&"first"!==i[e].type&&t.push(i[e]);return t}function Rt(e){const t=e.siblings();if("text"===St(e)){let i=e.startOffset(),a=e.endOffset();for(;t[i]&&"text"===t[i].mode&&V.test(t[i].body);)i-=1;for(;t[a]&&"text"===t[a].mode&&V.test(t[a].body);)a+=1;if(a-=1,i>=a)return $t(e,e.endOffset()-1,1),!0;$t(e,i,a-i);}else if("mord"===e.sibling(0).type&&/[0-9,.]/.test(e.sibling(0).body)){let i=e.startOffset(),a=e.endOffset();for(;zt(t[i]);)i-=1;for(;zt(t[a]);)a+=1;a-=1,$t(e,i,a-i);}else $t(e,0,"end");return !0}function Pt(e){return e.path=[{relation:"body",offset:0}],$t(e,0,"end")}function It(e){return 0===e.extent}function Ht(e,t){return e.extent=t,!0}function Wt(e){return 0!==e.extent&&($t(e,e.endOffset()),!0)}function Vt(e){return 0!==e.extent&&($t(e,e.startOffset()),!0)}function Ut(e){if(e.path.length>1){const t=e.clone();return e.path.pop(),Ht(e,0),e.announce("move",t),!0}return e.announce("plonk"),!1}function jt(e){if(e.parent().array)return yt(e.parent().array,e.relation())[e.anchorOffset()];const t=e.siblings();return t[Math.min(t.length-1,e.anchorOffset())]}function Xt(e,t,i,a={extendToWordBoundary:!1}){const r=pt(t,i);if(0===r)return a.extendToWordBoundary?Xt(e,t=Jt(e,t,-1),i=Jt(e,i,1)):Zt(e,ut(t),0);if(1===r){const r=i[i.length-1].offset-t[t.length-1].offset;return a.extendToWordBoundary?Xt(e,t=Jt(e,t,r<0?1:-1),i=Jt(e,i,r<0?-1:1)):Zt(e,ut(t),r)}let s=function(e,t){const i=[],a=Math.min(e.length-1,t.length-1);let r=0;for(;r<=a&&e[r].relation===t[r].relation&&e[r].offset===t[r].offset;)i.push(e[r]),r+=1;return i}(t,i);const o=s.length;if(t.length===o||i.length===o||t[o].relation!==i[o].relation)return Zt(e,s,-1);s.push(t[o]),s=ut(s);let n=i[o].offset-t[o].offset+1;return n<=0?i.length>o+1?(s[o].relation=i[o].relation,s[o].offset=i[o].offset,s[s.length-1].offset-=1,n=2-n):(s[o].relation=i[o].relation,s[o].offset=i[o].offset,n=1-n):i.length<=t.length?s[s.length-1].offset-=1:i.length>t.length&&(s[o].offset-=1),Zt(e,s,n)}function Zt(t,i,a=0){let r;if("string"==typeof i)r=ht(i);else if(e(i)){const e=ut(i),s=t.path;t.path=e,0===a&&"placeholder"===jt(t).type&&(e[e.length-1].offset=t.anchorOffset()-1,a=1),r={path:e,extent:a||0},t.path=s;}else r=i;const s=0!==pt(t.path,r.path),o=r.extent!==t.extent;return (s||o)&&(s&&Yt(t),kt(t),t.path=ut(r.path),t.siblings().length<t.anchorOffset()?(t.path=[{relation:"body",offset:0}],t.extent=0):Ht(t,r.extent),_t(t)),s||o}function Gt(e,t,i){var a;(i=null!=i?i:{}).recursive=null!==(a=i.recursive)&&void 0!==a&&a;const r=e.siblings(),s=e.startOffset()+1,o=e.endOffset()+1;if(i.recursive)for(let e=s;e<o;e++)r[e]&&"first"!==r[e].type&&r[e].forEach(t);else for(let e=s;e<o;e++)r[e]&&"first"!==r[e].type&&t(r[e]);}function Yt(e){const t=e.siblings();if(t&&t.length<=1){let i;const a=e.relation();"numer"===a?i="numerator":"denom"===a?i="denominator":"surd"===e.parent().type&&"body"===a?i="radicand":"overunder"===e.parent().type&&"body"===a?i="base":"underscript"!==a&&"overscript"!==a||(i="annotation"),i&&t.splice(1,0,new Fe("math","placeholder","⬚",Ct(e)));}}function Jt(e,t,i){i=i<0?-1:1;const a=new xt;a.path=ut(t),a.root=e.root;let r=0;for(;a.sibling(r)&&"text"===a.sibling(r).mode&&V.test(a.sibling(r).body);)r+=i;return a.sibling(r)||(r-=i),a.path[a.path.length-1].offset+=r,a.path}function Qt(e,t,i=1){i=i<0?-1:1;const a=[],r=new xt;r.path=ut(e.path),r.extent=e.extent,r.root=e.root,i>=0?Wt(r):(Vt(r),Tt(r,1));const s=jt(r);do{t.bind(r)(r.path,jt(r))&&a.push(r.toString()),i>=0?Dt(r,{iterateAll:!0}):qt(r,{iterateAll:!0});}while(s!==jt(r));return a}const ei="apple"===ri()?{id:"apple.en-intl",displayName:"English (international)",platform:"apple",locale:"en",score:0,mapping:{KeyA:["a","A","å","Å"],KeyB:["b","B","∫","ı"],KeyC:["c","C","ç","Ç"],KeyD:["d","D","∂","Î"],KeyE:["e","E","´","´"],KeyF:["f","F","ƒ","Ï"],KeyG:["g","G","©","˝"],KeyH:["h","H","˙","Ó"],KeyI:["i","I","ˆ","ˆ"],KeyJ:["j","J","∆","Ô"],KeyK:["k","K","˚",""],KeyL:["l","L","¬","Ò"],KeyM:["m","M","µ","Â"],KeyN:["n","N","˜","˜"],KeyO:["o","O","ø","Ø"],KeyP:["p","P","π","∏"],KeyQ:["q","Q","œ","Œ"],KeyR:["r","R","®","‰"],KeyS:["s","S","ß","Í"],KeyT:["t","T","†","ˇ"],KeyU:["u","U","¨","¨"],KeyV:["v","V","√","◊"],KeyW:["w","W","∑","„"],KeyX:["x","X","≈","˛"],KeyY:["y","Y","¥","Á"],KeyZ:["z","Z","Ω","¸"],Digit1:["1","!","¡","⁄"],Digit2:["2","@","™","€"],Digit3:["3","#","£","‹"],Digit4:["4","$","¢","›"],Digit5:["5","%","∞","ﬁ"],Digit6:["6","ˆ","§","ﬂ"],Digit7:["7","&","¶","‡"],Digit8:["8","*","•","°"],Digit9:["9","(","ª","·"],Digit0:["0",")","º","‚"],Space:[" "," "," "," "],Minus:["-","_","–","—"],Equal:["=","+","≠","±"],BracketLeft:["[","{","“","”"],BracketRight:["]","}","‘","’"],Backslash:["\\","|","«","»"],Semicolon:[";",":","…","Ú"],Quote:["'",'"',"æ","Æ"],Backquote:["`","˜","`","`"],Comma:[",","<","≤","¯"],Period:[".",">","≥","˘"],Slash:["/","?","÷","¿"],NumpadDivide:["/","/","/","/"],NumpadMultiply:["*","*","*","*"],NumpadSubtract:["-","-","-","-"],NumpadAdd:["+","+","+","+"],Numpad1:["1","1","1","1"],Numpad2:["2","2","2","2"],Numpad3:["3","3","3","3"],Numpad4:["4","4","4","4"],Numpad5:["5","5","5","5"],Numpad6:["6","6","6","6"],Numpad7:["7","7","7","7"],Numpad8:["8","8","8","8"],Numpad9:["9","9","9","9"],Numpad0:["0","0","0","0"],NumpadDecimal:[".",".",".","."],IntlBackslash:["§","±","§","±"],NumpadEqual:["=","=","=","="],AudioVolumeUp:["","=","","="]}}:"windows"===ri()?{id:"windows.en-intl",displayName:"English (international)",platform:"windows",locale:"en",score:0,mapping:{KeyA:["a","A","á","Á"],KeyB:["b","B","",""],KeyC:["c","C","©","¢"],KeyD:["d","D","ð","Ð"],KeyE:["e","E","é","É"],KeyF:["f","F","",""],KeyG:["g","G","",""],KeyH:["h","H","",""],KeyI:["i","I","í","Í"],KeyJ:["j","J","",""],KeyK:["k","K","",""],KeyL:["l","L","ø","Ø"],KeyM:["m","M","µ",""],KeyN:["n","N","ñ","Ñ"],KeyO:["o","O","ó","Ó"],KeyP:["p","P","ö","Ö"],KeyQ:["q","Q","ä","Ä"],KeyR:["r","R","®",""],KeyS:["s","S","ß","§"],KeyT:["t","T","þ","Þ"],KeyU:["u","U","ú","Ú"],KeyV:["v","V","",""],KeyW:["w","W","å","Å"],KeyX:["x","X","",""],KeyY:["y","Y","ü","Ü"],KeyZ:["z","Z","æ","Æ"],Digit1:["1","!","¡","¹"],Digit2:["2","@","²",""],Digit3:["3","#","³",""],Digit4:["4","$","¤","£"],Digit5:["5","%","€",""],Digit6:["6","^","¼",""],Digit7:["7","&","½",""],Digit8:["8","*","¾",""],Digit9:["9","(","‘",""],Digit0:["0",")","’",""],Space:[" "," ","",""],Minus:["-","_","¥",""],Equal:["=","+","×","÷"],BracketLeft:["[","{","«",""],BracketRight:["]","}","»",""],Backslash:["\\","|","¬","¦"],Semicolon:[";",":","¶","°"],Quote:["'",'"',"´","¨"],Backquote:["`","~","",""],Comma:[",","<","ç","Ç"],Period:[".",">","",""],Slash:["/","?","¿",""],NumpadDivide:["/","/","",""],NumpadMultiply:["*","*","",""],NumpadSubtract:["-","-","",""],NumpadAdd:["+","+","",""],IntlBackslash:["\\","|","",""]}}:{id:"linux.en",displayName:"English",platform:"linux",locale:"en",score:0,mapping:{KeyA:["a","A","a","A"],KeyB:["b","B","b","B"],KeyC:["c","C","c","C"],KeyD:["d","D","d","D"],KeyE:["e","E","e","E"],KeyF:["f","F","f","F"],KeyG:["g","G","g","G"],KeyH:["h","H","h","H"],KeyI:["i","I","i","I"],KeyJ:["j","J","j","J"],KeyK:["k","K","k","K"],KeyL:["l","L","l","L"],KeyM:["m","M","m","M"],KeyN:["n","N","n","N"],KeyO:["o","O","o","O"],KeyP:["p","P","p","P"],KeyQ:["q","Q","q","Q"],KeyR:["r","R","r","R"],KeyS:["s","S","s","S"],KeyT:["t","T","t","T"],KeyU:["u","U","u","U"],KeyV:["v","V","v","V"],KeyW:["w","W","w","W"],KeyX:["x","X","x","X"],KeyY:["y","Y","y","Y"],KeyZ:["z","Z","z","Z"],Digit1:["1","!","1","!"],Digit2:["2","@","2","@"],Digit3:["3","#","3","#"],Digit4:["4","$","4","$"],Digit5:["5","%","5","%"],Digit6:["6","^","6","^"],Digit7:["7","&","7","&"],Digit8:["8","*","8","*"],Digit9:["9","(","9","("],Digit0:["0",")","0",")"],Space:[" "," "," "," "],Minus:["-","_","-","_"],Equal:["=","+","=","+"],BracketLeft:["[","{","[","{"],BracketRight:["]","}","]","}"],Backslash:["\\","|","\\","|"],Semicolon:[";",":",";",":"],Quote:["'",'"',"'",'"'],Backquote:["`","~","`","~"],Comma:[",","<",",","<"],Period:[".",">",".",">"],Slash:["/","?","/","?"],NumpadDivide:["/","/","/","/"],NumpadMultiply:["*","*","*","*"],NumpadSubtract:["-","-","-","-"],NumpadAdd:["+","+","+","+"],Numpad1:["1","1","1","1"],Numpad2:["2","2","2","2"],Numpad3:["3","3","3","3"],Numpad4:["4","4","4","4"],Numpad5:["5","5","5","5"],Numpad6:["6","6","6","6"],Numpad7:["7","7","7","7"],Numpad8:["8","8","8","8"],Numpad9:["9","9","9","9"],Numpad0:["0","0","0","0"],NumpadDecimal:["",".","","."],IntlBackslash:["<",">","|","¦"],NumpadEqual:["=","=","=","="],NumpadComma:[".",".",".","."],NumpadParenLeft:["(","(","(","("],NumpadParenRight:[")",")",")",")"]}},ti={enter:"[Enter]",escape:"[Escape]",backspace:"[Backspace]",tab:"[Tab]",space:"[Space]",pausebreak:"[Pause]",insert:"[Insert]",home:"[Home]",pageup:"[PageUp]",delete:"[Delete]",end:"[End]",pagedown:"[PageDown]",right:"[ArrowRight]",left:"[ArrowLeft]",down:"[ArrowDown]",up:"[ArrowUp]",numpad0:"[Numpad0]",numpad1:"[Numpad1]",numpad2:"[Numpad2]",numpad3:"[Numpad3]",numpad4:"[Numpad4]",numpad5:"[Numpad5]",numpad6:"[Numpad6]",numpad7:"[Numpad7]",numpad8:"[Numpad8]",numpad9:"[Numpad9]",numpad_divide:"[NumpadDivide]",numpad_multiply:"[NumpadMultiply]",numpad_subtract:"[NumpadSubtract]",numpad_add:"[NumpadAdd]",numpad_decimal:"[NumpadDecimal]",numpad_separator:"[NumpadComma]",capslock:"[Capslock]",f1:"[F1]",f2:"[F2]",f3:"[F3]",f4:"[F4]",f5:"[F5]",f6:"[F6]",f7:"[F7]",f8:"[F8]",f9:"[F9]",f10:"[F10]",f11:"[F11]",f12:"[F12]",f13:"[F13]",f14:"[F14]",f15:"[F15]",f16:"[F16]",f17:"[F17]",f18:"[F18]",f19:"[F19]"},ii=[];let ai;function ri(){let e="linux";return (null===navigator||void 0===navigator?void 0:navigator.platform)&&(null===navigator||void 0===navigator?void 0:navigator.userAgent)&&(/^(mac)/i.test(navigator.platform)?e="apple":/^(win)/i.test(navigator.platform)?e="windows":/(android)/i.test(navigator.userAgent)?e="linux":/(iphone)/i.test(navigator.userAgent)||/(ipod)/i.test(navigator.userAgent)||/(ipad)/i.test(navigator.userAgent)?e="apple":/\bCrOS\b/i.test(navigator.userAgent)&&(e="linux")),e}function si(e){e.platform===ri()&&ii.push(e);}function oi(e){ai=ii.find(t=>e.startsWith(t.locale));}function ni(){return null!=ai?ai:ii[0]}si(ei),si({id:"apple.french",locale:"fr",displayName:"French",platform:"apple",score:0,mapping:{KeyA:["q","Q","‡","Ω"],KeyB:["b","B","ß","∫"],KeyC:["c","C","©","¢"],KeyD:["d","D","∂","∆"],KeyE:["e","E","ê","Ê"],KeyF:["f","F","ƒ","·"],KeyG:["g","G","ﬁ","ﬂ"],KeyH:["h","H","Ì","Î"],KeyI:["i","I","î","ï"],KeyJ:["j","J","Ï","Í"],KeyK:["k","K","È","Ë"],KeyL:["l","L","¬","|"],KeyM:[",","?","∞","¿"],KeyN:["n","N","~","ı"],KeyO:["o","O","œ","Œ"],KeyP:["p","P","π","∏"],KeyQ:["a","A","æ","Æ"],KeyR:["r","R","®","‚"],KeyS:["s","S","Ò","∑"],KeyT:["t","T","†","™"],KeyU:["u","U","º","ª"],KeyV:["v","V","◊","√"],KeyW:["z","Z","Â","Å"],KeyX:["x","X","≈","⁄"],KeyY:["y","Y","Ú","Ÿ"],KeyZ:["w","W","‹","›"],Digit1:["&","1","","´"],Digit2:["é","2","ë","„"],Digit3:['"',"3","“","”"],Digit4:["'","4","‘","’"],Digit5:["(","5","{","["],Digit6:["§","6","¶","å"],Digit7:["è","7","«","»"],Digit8:["!","8","¡","Û"],Digit9:["ç","9","Ç","Á"],Digit0:["à","0","ø","Ø"],Space:[" "," "," "," "],Minus:[")","°","}","]"],Equal:["-","_","—","–"],BracketLeft:["^","¨","ô","Ô"],BracketRight:["$","*","€","¥"],Backslash:["`","£","@","#"],Semicolon:["m","M","µ","Ó"],Quote:["ù","%","Ù","‰"],Backquote:["<",">","≤","≥"],Comma:[";",".","…","•"],Period:[":","/","÷","\\"],Slash:["=","+","≠","±"],NumpadDivide:["/","/","/","/"],NumpadMultiply:["*","*","*","*"],NumpadSubtract:["-","-","-","-"],NumpadAdd:["+","+","+","+"],NumpadDecimal:[",",".",",","."],IntlBackslash:["@","#","•","Ÿ"],NumpadEqual:["=","=","=","="]}}),si({id:"linux.french",locale:"fr",displayName:"French",platform:"apple",score:0,mapping:{KeyA:["q","Q","@","Ω"],KeyB:["b","B","”","’"],KeyC:["c","C","¢","©"],KeyD:["d","D","ð","Ð"],KeyE:["e","E","€","¢"],KeyF:["f","F","đ","ª"],KeyG:["g","G","ŋ","Ŋ"],KeyH:["h","H","ħ","Ħ"],KeyI:["i","I","→","ı"],KeyJ:["j","J","̉","̛"],KeyK:["k","K","ĸ","&"],KeyL:["l","L","ł","Ł"],KeyM:[",","?","́","̋"],KeyN:["n","N","n","N"],KeyO:["o","O","ø","Ø"],KeyP:["p","P","þ","Þ"],KeyQ:["a","A","æ","Æ"],KeyR:["r","R","¶","®"],KeyS:["s","S","ß","§"],KeyT:["t","T","ŧ","Ŧ"],KeyU:["u","U","↓","↑"],KeyV:["v","V","“","‘"],KeyW:["z","Z","«","<"],KeyX:["x","X","»",">"],KeyY:["y","Y","←","¥"],KeyZ:["w","W","ł","Ł"],Digit1:["&","1","¹","¡"],Digit2:["é","2","~","⅛"],Digit3:['"',"3","#","£"],Digit4:["'","4","{","$"],Digit5:["(","5","[","⅜"],Digit6:["-","6","|","⅝"],Digit7:["è","7","`","⅞"],Digit8:["_","8","\\","™"],Digit9:["ç","9","^","±"],Digit0:["à","0","@","°"],Enter:["\r","\r","\r","\r"],Escape:["","","",""],Backspace:["\b","\b","\b","\b"],Tab:["\t","","\t",""],Space:[" "," "," "," "],Minus:[")","°","]","¿"],Equal:["=","+","}","̨"],BracketLeft:["̂","̈","̈","̊"],BracketRight:["$","£","¤","̄"],Backslash:["*","µ","̀","̆"],Semicolon:["m","M","µ","º"],Quote:["ù","%","̂","̌"],Backquote:["²","~","¬","¬"],Comma:[";",".","─","×"],Period:[":","/","·","÷"],Slash:["!","§","̣","̇"],NumpadMultiply:["*","*","*","*"],NumpadSubtract:["-","-","-","-"],NumpadAdd:["+","+","+","+"],NumpadDecimal:["",".","","."],IntlBackslash:["<",">","|","¦"]}}),si({id:"windows.french",locale:"fr",displayName:"French",platform:"windows",score:0,mapping:{KeyA:["q","Q","",""],KeyB:["b","B","",""],KeyC:["c","C","",""],KeyD:["d","D","",""],KeyE:["e","E","€",""],KeyF:["f","F","",""],KeyG:["g","G","",""],KeyH:["h","H","",""],KeyI:["i","I","",""],KeyJ:["j","J","",""],KeyK:["k","K","",""],KeyL:["l","L","",""],KeyM:[",","?","",""],KeyN:["n","N","",""],KeyO:["o","O","",""],KeyP:["p","P","",""],KeyQ:["a","A","",""],KeyR:["r","R","",""],KeyS:["s","S","",""],KeyT:["t","T","",""],KeyU:["u","U","",""],KeyV:["v","V","",""],KeyW:["z","Z","",""],KeyX:["x","X","",""],KeyY:["y","Y","",""],KeyZ:["w","W","",""],Digit1:["&","1","",""],Digit2:["é","2","~",""],Digit3:['"',"3","#",""],Digit4:["'","4","{",""],Digit5:["(","5","[",""],Digit6:["-","6","|",""],Digit7:["è","7","`",""],Digit8:["_","8","\\",""],Digit9:["ç","9","^",""],Digit0:["à","0","@",""],Space:[" "," ","",""],Minus:[")","°","]",""],Equal:["=","+","}",""],BracketLeft:["^","¨","",""],BracketRight:["$","£","¤",""],Backslash:["*","µ","",""],Semicolon:["m","M","",""],Quote:["ù","%","",""],Backquote:["²","","",""],Comma:[";",".","",""],Period:[":","/","",""],Slash:["!","§","",""],NumpadDivide:["/","/","",""],NumpadMultiply:["*","*","",""],NumpadSubtract:["-","-","",""],NumpadAdd:["+","+","",""],IntlBackslash:["<",">","",""]}}),si({id:"windows.german",locale:"de",displayName:"German",platform:"windows",score:0,mapping:{KeyA:["a","A","",""],KeyB:["b","B","",""],KeyC:["c","C","",""],KeyD:["d","D","",""],KeyE:["e","E","€",""],KeyF:["f","F","",""],KeyG:["g","G","",""],KeyH:["h","H","",""],KeyI:["i","I","",""],KeyJ:["j","J","",""],KeyK:["k","K","",""],KeyL:["l","L","",""],KeyM:["m","M","µ",""],KeyN:["n","N","",""],KeyO:["o","O","",""],KeyP:["p","P","",""],KeyQ:["q","Q","@",""],KeyR:["r","R","",""],KeyS:["s","S","",""],KeyT:["t","T","",""],KeyU:["u","U","",""],KeyV:["v","V","",""],KeyW:["w","W","",""],KeyX:["x","X","",""],KeyY:["z","Z","",""],KeyZ:["y","Y","",""],Digit1:["1","!","",""],Digit2:["2",'"',"²",""],Digit3:["3","§","³",""],Digit4:["4","$","",""],Digit5:["5","%","",""],Digit6:["6","&","",""],Digit7:["7","/","{",""],Digit8:["8","(","[",""],Digit9:["9",")","]",""],Digit0:["0","=","}",""],Space:[" "," ","",""],Minus:["ß","?","\\","ẞ"],Equal:["´","`","",""],BracketLeft:["ü","Ü","",""],BracketRight:["+","*","~",""],Backslash:["#","'","",""],Semicolon:["ö","Ö","",""],Quote:["ä","Ä","",""],Backquote:["^","°","",""],Comma:[",",";","",""],Period:[".",":","",""],Slash:["-","_","",""],NumpadDivide:["/","/","",""],NumpadMultiply:["*","*","",""],NumpadSubtract:["-","-","",""],NumpadAdd:["+","+","",""],IntlBackslash:["<",">","|",""]}}),si({id:"apple.german",locale:"de",displayName:"German",platform:"apple",score:0,mapping:{KeyA:["a","A","å","Å"],KeyB:["b","B","∫","‹"],KeyC:["c","C","ç","Ç"],KeyD:["d","D","∂","™"],KeyE:["e","E","€","‰"],KeyF:["f","F","ƒ","Ï"],KeyG:["g","G","©","Ì"],KeyH:["h","H","ª","Ó"],KeyI:["i","I","⁄","Û"],KeyJ:["j","J","º","ı"],KeyK:["k","K","∆","ˆ"],KeyL:["l","L","@","ﬂ"],KeyM:["m","M","µ","˘"],KeyN:["n","N","~","›"],KeyO:["o","O","ø","Ø"],KeyP:["p","P","π","∏"],KeyQ:["q","Q","«","»"],KeyR:["r","R","®","¸"],KeyS:["s","S","‚","Í"],KeyT:["t","T","†","˝"],KeyU:["u","U","¨","Á"],KeyV:["v","V","√","◊"],KeyW:["w","W","∑","„"],KeyX:["x","X","≈","Ù"],KeyY:["z","Z","Ω","ˇ"],KeyZ:["y","Y","¥","‡"],Digit1:["1","!","¡","¬"],Digit2:["2",'"',"“","”"],Digit3:["3","§","¶","#"],Digit4:["4","$","¢","£"],Digit5:["5","%","[","ﬁ"],Digit6:["6","&","]","^"],Digit7:["7","/","|","\\"],Digit8:["8","(","{","˜"],Digit9:["9",")","}","·"],Digit0:["0","=","≠","¯"],Space:[" "," "," "," "],Minus:["ß","?","¿","˙"],Equal:["´","`","'","˚"],BracketLeft:["ü","Ü","•","°"],BracketRight:["+","*","±",""],Backslash:["#","'","‘","’"],Semicolon:["ö","Ö","œ","Œ"],Quote:["ä","Ä","æ","Æ"],Backquote:["<",">","≤","≥"],Comma:[",",";","∞","˛"],Period:[".",":","…","÷"],Slash:["-","_","–","—"],NumpadDivide:["/","/","/","/"],NumpadMultiply:["*","*","*","*"],NumpadSubtract:["-","-","-","-"],NumpadAdd:["+","+","+","+"],NumpadDecimal:[",",",",".","."],IntlBackslash:["^","°","„","“"],NumpadEqual:["=","=","=","="]}});const li=[{key:"ctrl+alt+e",command:["insert","\\text{cmd+alt+e}"]},{key:"cmd+alt+a",command:["insert","\\text{cmd+alt+a}"]},{key:"ctrl+alt+a",command:["insert","\\text{ctrl+alt+a}"]},{key:"meta+alt+2",command:["insert","\\text{meta+alt+2}"]},{key:"ctrl+alt+shift+a",command:["insert","\\text{ctrl+alt+shift+a}"]},{key:"left",command:"moveToPreviousChar"},{key:"right",command:"moveToNextChar"},{key:"up",command:"moveUp"},{key:"down",command:"moveDown"},{key:"shift+[ArrowLeft]",command:"extendToPreviousChar"},{key:"shift+[ArrowRight]",command:"extendToNextChar"},{key:"shift+[ArrowUp]",command:"extendUp"},{key:"shift+[ArrowDown]",command:"extendDown"},{key:"[Backspace]",command:"deletePreviousChar"},{key:"alt+[Delete]",command:"deletePreviousChar"},{key:"[Delete]",command:"deleteNextChar"},{key:"alt+[Backspace]",command:"deleteNextChar"},{key:"alt+[ArrowLeft]",command:"moveToPreviousWord"},{key:"alt+[ArrowRight]",command:"moveToNextWord"},{key:"alt+shift+[ArrowLeft]",command:"extendToPreviousWord"},{key:"alt+shift+[ArrowRight]",command:"extendToNextWord"},{key:"ctrl+[ArrowLeft]",command:"moveToGroupStart"},{key:"ctrl+[ArrowRight]",command:"moveToGroupEnd"},{key:"ctrl+shift+[ArrowLeft]",command:"extendToGroupStart"},{key:"ctrl+shift+[ArrowRight]",command:"extendToGroupEnd"},{key:"[Space]",ifMode:"math",command:"moveAfterParent"},{key:"shift+[Space]",ifMode:"math",command:"moveBeforeParent"},{key:"[Home]",command:"moveToMathFieldStart"},{key:"cmd+[ArrowLeft]",command:"moveToMathFieldStart"},{key:"shift+[Home]",command:"extendToMathFieldStart"},{key:"cmd+shift+[ArrowLeft]",command:"extendToMathFieldStart"},{key:"[End]",command:"moveToMathFieldEnd"},{key:"cmd+[ArrowRight]",command:"moveToMathFieldEnd"},{key:"shift+[End]",command:"extendToMathFieldEnd"},{key:"cmd+shift+[ArrowRight]",command:"extendToMathFieldEnd"},{key:"[Pageup]",command:"moveToGroupStart"},{key:"[Pagedown]",command:"moveToGroupEnd"},{key:"[Tab]",ifMode:"math",command:"moveToNextPlaceholder"},{key:"shift+[Tab]",ifMode:"math",command:"moveToPreviousPlaceholder"},{key:"[Tab]",ifMode:"text",command:"moveToNextPlaceholder"},{key:"shift+[Tab]",ifMode:"text",command:"moveToPreviousPlaceholder"},{key:"[Escape]",ifMode:"math",command:["switch-mode","command"]},{key:"\\",ifMode:"math",command:["switch-mode","command"]},{key:"alt+[Equal]",ifMode:"math",command:["applyStyle",{mode:"text"}]},{key:"alt+[Equal]",ifMode:"text",command:["applyStyle",{mode:"math"}]},{key:"[Escape]",ifMode:"command",command:["complete",{discard:!0}]},{key:"[Tab]",ifMode:"command",command:["complete",{acceptSuggestion:!0}]},{key:"[Return]",ifMode:"command",command:"complete"},{key:"[Enter]",ifMode:"command",command:"complete"},{key:"shift+[Escape]",ifMode:"command",command:["complete",{discard:!0}]},{key:"[ArrowDown]",ifMode:"command",command:"nextSuggestion"},{key:"[ArrowUp]",ifMode:"command",command:"previousSuggestion"},{key:"ctrl+a",ifPlatform:"!macos",command:"selectAll"},{key:"cmd+a",command:"selectAll"},{key:"[Cut]",command:"cutToClipboard"},{key:"[Copy]",command:"copyToClipboard"},{key:"[Paste]",command:"pasteFromClipboard"},{key:"[Clear]",command:"deletePreviousChar"},{key:"ctrl+z",ifPlatform:"!macos",command:"undo"},{key:"cmd+z",command:"undo"},{key:"[Undo]",command:"undo"},{key:"ctrl+y",ifPlatform:"!macos",command:"redo"},{key:"cmd+shift+y",command:"redo"},{key:"ctrl+shift+z",ifPlatform:"!macos",command:"redo"},{key:"cmd+shift+z",command:"redo"},{key:"[Redo]",command:"redo"},{key:"[EraseEof]",command:"deleteToGroupEnd"},{key:"ctrl+b",ifPlatform:"macos",command:"moveToPreviousChar"},{key:"ctrl+f",ifPlatform:"macos",command:"moveToNextChar"},{key:"ctrl+p",ifPlatform:"macos",command:"moveUp"},{key:"ctrl+n",ifPlatform:"macos",command:"moveDown"},{key:"ctrl+a",ifPlatform:"macos",command:"moveToMathFieldStart"},{key:"ctrl+e",ifPlatform:"macos",command:"moveToMathFieldEnd"},{key:"ctrl+shift+b",ifPlatform:"macos",command:"extendToPreviousChar"},{key:"ctrl+shift+f",ifPlatform:"macos",command:"extendToNextChar"},{key:"ctrl+shift+p",ifPlatform:"macos",command:"extendUp"},{key:"ctrl+shift+n",ifPlatform:"macos",command:"extendDown"},{key:"ctrl+shift+a",ifPlatform:"macos",command:"extendToMathFieldStart"},{key:"ctrl+shift+e",ifPlatform:"macos",command:"extendToMathFieldEnd"},{key:"ctrl+alt+b",ifPlatform:"macos",command:"moveToPreviousWord"},{key:"ctrl+alt+f",ifPlatform:"macos",command:"moveToNextWord"},{key:"ctrl+shift+alt+b",ifPlatform:"macos",command:"extendToPreviousWord"},{key:"ctrl+shift+alt+f",ifPlatform:"macos",command:"extendToNextWord"},{key:"ctrl+h",ifPlatform:"macos",command:"deletePreviousChar"},{key:"ctrl+d",ifPlatform:"macos",command:"deleteNextChar"},{key:"ctrl+l",ifPlatform:"macos",command:"scrollIntoView"},{key:"shift+[Quote]",ifMode:"math",command:["switchMode","text","","“"]},{key:"shift+[Quote]",ifMode:"text",command:["switch-mode","math","”",""]},{key:"ctrl+[Digit2]",ifMode:"math",command:["insert","$$\\sqrt{#0}$$"]},{key:"ctrl+[Digit5]",ifMode:"math",command:"moveToOpposite"},{key:"ctrl+[Digit6]",ifMode:"math",command:"moveToSuperscript"},{key:"ctrl+[Minus]",ifMode:"math",command:"moveToSubscript"},{key:"alt+[BracketLeft]",ifMode:"math",command:["insert","$$\\left\\lbrack #0 \\right\\rbrack$$"]},{key:"alt+shift+[BracketLeft]",ifMode:"math",command:["insert","$$\\left\\lbrace #0 \\right\\rbrace$$"]},{key:"[Return]",ifMode:"math",command:"addRowAfter"},{key:"[Enter]",ifMode:"math",command:"addRowAfter"},{key:"ctrl+[Comma]",ifMode:"math",command:"addColumnAfter"},{key:"[Return]",ifMode:"text",command:"addRowAfter"},{key:"[Enter]",ifMode:"text",command:"addRowAfter"},{key:"ctrl+[Comma]",ifMode:"text",command:"addColumnAfter"},{key:"alt+p",ifMode:"math",command:["insert","$$\\pi$$"]},{key:"alt+v",ifMode:"math",command:["insert","$$\\sqrt{#0}$$"]},{key:"alt+w",ifMode:"math",command:["insert","$$\\sum_{i=#?}^{#?}$$"]},{key:"alt+u",ifMode:"math",command:["insert","$$\\cup$$"]},{key:"alt+n",ifMode:"math",command:["insert","$$\\cap$$"]},{key:"alt+o",ifMode:"math",command:["insert","$$\\emptyset$$"]},{key:"alt+d",ifMode:"math",command:["insert","$$\\differentialD$$"]},{key:"alt+shift+o",ifMode:"math",command:["insert","$$\\varnothing$$"]},{key:"alt+shift+d",ifMode:"math",command:["insert","$$\\partial$$"]},{key:"alt+shift+p",ifMode:"math",command:["insert","$$\\prod_{i=#?}^{#?}$$"]},{key:"alt+shift+u",ifMode:"math",command:["insert","$$\\bigcup$$"]},{key:"alt+shift+n",ifMode:"math",command:["insert","$$\\bigcap$$"]},{key:"alt+shift+a",ifMode:"math",command:["insert","$$\\forall$$"]},{key:"alt+shift+e",ifMode:"math",command:["insert","$$\\exists$$"]},{key:"alt+[Digit5]",ifMode:"math",command:["insert","$\\infty$$"]},{key:"alt+[Digit6]",ifMode:"math",command:["insert","$$\\wedge$$"]},{key:"alt+shift+[Digit6]",ifMode:"math",command:["insert","$$\\vee$$"]},{key:"alt+[Digit9]",ifMode:"math",command:["insert","("]},{key:"alt+[Digit0]",ifMode:"math",command:["insert",")"]},{key:"alt+shift+[Backslash]",ifMode:"math",command:["insert","|"]},{key:"alt+[Backslash]",ifMode:"math",command:["insert","$$\\backslash$$"]},{key:"[Slash]",ifMode:"math",command:["insert","$$\\frac{#@}{#?}$$"]},{key:"alt+[Slash]",ifMode:"math",command:["insert","$$\\frac{#?}{#@}$$"]},{key:"[NumpadDivide]",ifMode:"math",command:["insert","$$\\frac{#@}{#?}$$"]},{key:"alt+[NumpadDivide]",ifMode:"math",command:["insert","\\frac{#?}{#@}"]},{key:"shift+[Backquote]",ifMode:"math",command:["insert","$$\\~$$"]},{key:"alt+shift+[Slash]",ifMode:"math",command:["insert","$$\\/$$"]},{key:"alt+shift+k",command:"toggleKeystrokeCaption"},{key:"alt+[Space]",command:"toggleVirtualKeyboard"},{key:"ctrl+alt+[ArrowUp]",command:["speak","parent",{withHighlighting:!1}]},{key:"ctrl+alt+[ArrowDown]",command:["speak","all",{withHighlighting:!1}]}],ci={"\\theta":"alt+q","\\sqrt":["alt+v","ctrl+[Digit2]"],"\\pi":"alt+p","\\prod":"alt+shift+p","\\sum":"alt+w","\\int":"alt+b","\\cup":"alt+u","\\cap":"alt+n","\\bigcup":"alt+shift+u","\\bigcap":"alt+shift+n","\\forall":"alt+shift+a","\\exists":"alt+shift+e","\\infty":"alt+[Digit5]","\\wedge":"alt+[Digit5]","\\vee":"alt+shift+[Digit6]","\\differentialD":"alt+d","\\partial":"alt+shift+d","\\frac":"Slash","\\emptyset":"alt+o","\\varnothing":"alt+shift+o","\\~":"~"};function di(e){if((null===navigator||void 0===navigator?void 0:navigator.platform)&&(null===navigator||void 0===navigator?void 0:navigator.userAgent)){let t;if(/^(mac)/i.test(navigator.platform)?t="macos":/^(win)/i.test(navigator.platform)?t="windows":/(android)/i.test(navigator.userAgent)?t="android":/(iphone)/i.test(navigator.userAgent)||/(ipod)/i.test(navigator.userAgent)||/(ipad)/i.test(navigator.userAgent)?t="ios":/\bCrOS\b/i.test(navigator.userAgent)&&(t="chromeos"),e.startsWith("!")&&!e.endsWith(t))return !0;if(e.endsWith(t))return !0}return !1}function mi(t){let i=t;return e(i)&&(i=i.length>0?i[0]+"("+i.slice(1).join("")+")":""),i}function hi(e){const t=di("macos")||di("ios"),i=e.split("+");let a="";for(const e of i)!t&&a&&(a+='<span class="ML__shortcut-join">+</span>'),e.startsWith("Key")?a+=e.substr(3,1):e.startsWith("Digit")?a+=e.substr(5,1):a+={cmd:"⌘",meta:t?"⌘":"command",shift:t?"⇧":"shift",alt:t?"⌥":"alt",ctrl:t?"⌃":"control","\n":t?"⏎":"return","[return]":t?"⏎":"return","[enter]":t?"⌤":"enter","[tab]":t?"⇥":"tab","[escape]":"esc","[backspace]":t?"⌫":"backspace","[delete]":t?"⌦":"del","[pageup]":t?"⇞":"page up","[pagedown]":t?"⇟":"page down","[home]":t?"⤒":"home","[end]":t?"⤓":"end","[space]":"space","[equal]":"=","[minus]":"-","[comma]":",","[backslash]":"\\","[bracketleft]":"[","[bracketright]":"]",semicolon:";",period:".",comma:",",minus:"-",equal:"=",quote:"'",bracketLeft:"[",bracketRight:"]",backslash:"\\",intlbackslash:"\\",backquote:"`",slash:"/",numpadmultiply:"* &#128290;",numpaddivide:"/ &#128290;",numpadsubtract:"- &#128290;",numpadadd:"+ &#128290;",numpaddecimal:". &#128290;",numpadcomma:", &#128290;",help:"help",left:"⇠",up:"⇡",right:"⇢",down:"⇣","[arrowleft]":"⇠","[arrowup]":"⇡","[arrowright]":"⇢","[arrowdown]":"⇣","[digit0]":"0","[digit1]":"1","[digit2]":"2","[digit3]":"3","[digit4]":"4","[digit5]":"5","[digit6]":"6","[digit7]":"7","[digit8]":"8","[digit9]":"9"}[e.toLowerCase()]||e.toUpperCase();return a}function pi(e,t){const i=[],a=[];return e.forEach(e=>{try{const t=function(e){if(e.ifPlatform&&!/^!?(macos|windows|android|ios|chromeos|other)$/.test(e.ifPlatform))throw new Error(`Unexpected platform "${e.ifPlatform}" for keybinding ${e.key}`);let t=e.key.split("+");const i=t.pop();let a=e.ifPlatform;if(t=t.map(e=>{const t=e.toLowerCase();if("cmd"===t){if(a&&"macos"!==a&&"ios"!==a)throw new Error('Unexpected "cmd" modifier with platform "'+a+'"');return a||(a=di("ios")?"ios":"macos"),"meta"}if("win"===t){if(a&&"windows"!==a)throw new Error('Unexpected "win" modifier with platform "'+a+'"');return a="windows","meta"}return t}),!a||di(a)){if(/^\[(.*)\]$/.test(i))t.push(i);else {const a=function(e){var t,i;const a=null!==(t=ii[0])&&void 0!==t?t:ei;for(const[t,i]of Object.entries(a.mapping))if(i[0]===e)return "["+t+"]";return null!==(i=ti[e])&&void 0!==i?i:""}(i);if(!a)throw new Error('Invalid keybinding key "'+e.key+'"');t.push(a);}return {...e,ifPlatform:a,key:t.join("+")}}}(e);t&&i.push(t);}catch(e){a.push(e.message);}}),a.length>0&&t(a),i}function ui(e,t,i,a){const r=t.split(" ");for(const t of r){const r=t.match(/(.*):(.*)/);if(r){const t=null!=a?a:{};"active"===r[2]?t.passive=!1:t[r[2]]=!0,e.addEventListener(r[1],i,t);}else e.addEventListener(t,i,a);}}function fi(e,t,i,a){const r=t.split(" ");for(const t of r){const r=t.match(/(.*):(.*)/);if(r){const t=null!=a?a:{};"active"===r[2]?t.passive=!1:t[r[2]]=!0,e.removeEventListener(r[1],i,t);}else e.removeEventListener(t,i,a);}}function gi(e,t){let i=document.getElementById(e);return i?i.setAttribute("data-refcount",Number(parseInt(i.getAttribute("data-refcount"))+1).toString()):(i=document.createElement("div"),i.setAttribute("aria-hidden","true"),i.setAttribute("data-refcount","1"),i.className=t,i.id=e,document.body.appendChild(i)),i}function yi(e){if(!e)return;const t=parseInt(e.getAttribute("data-refcount"));t<=1?e.remove():e.setAttribute("data-refcount",Number(t-1).toString());}function bi(e){return e.element&&e.element.mathfield===e}function vi(e){const t=function e(t){if(t.classList.contains("ML__caret")||t.classList.contains("ML__text-caret")||t.classList.contains("ML__command-caret"))return t;let i;for(const a of t.children)if(i=e(a),i)break;return i}(e);if(t){const e=t.getBoundingClientRect();return {x:e.right,y:e.bottom,height:e.height}}return null}function xi(e){const t=e.querySelectorAll(".ML__selected");if(t&&t.length>0){const i={top:1/0,bottom:-1/0,left:1/0,right:-1/0};t.forEach(e=>{const t=e.getBoundingClientRect();t.left<i.left&&(i.left=t.left),t.right>i.right&&(i.right=t.right),t.bottom>i.bottom&&(i.bottom=t.bottom),t.top<i.top&&(i.top=t.top);});const a=e.getBoundingClientRect(),r=i.right-i.left,s=i.bottom-i.top;return i.left=Math.ceil(i.left-a.left+e.scrollLeft),i.right=i.left+r,i.top=Math.ceil(i.top-a.top),i.bottom=i.top+s,i}return null}function ki(e,t,i){let a,r,s,o,n;"object"==typeof i&&(i.default||i.pressed)?(i.default&&t.setAttribute("data-"+e.config.namespace+"command",JSON.stringify(i.default)),i.alt&&t.setAttribute("data-"+e.config.namespace+"command-alt",JSON.stringify(i.alt)),i.altshift&&t.setAttribute("data-"+e.config.namespace+"command-altshift",JSON.stringify(i.altshift)),i.shift&&t.setAttribute("data-"+e.config.namespace+"command-shift",JSON.stringify(i.shift)),i.pressed&&t.setAttribute("data-"+e.config.namespace+"command-pressed",JSON.stringify(i.pressed)),i.pressAndHoldStart&&t.setAttribute("data-"+e.config.namespace+"command-pressAndHoldStart",JSON.stringify(i.pressAndHoldStart)),i.pressAndHoldEnd&&t.setAttribute("data-"+e.config.namespace+"command-pressAndHoldEnd",JSON.stringify(i.pressAndHoldEnd))):t.setAttribute("data-"+e.config.namespace+"command",JSON.stringify(i)),ui(t,"mousedown touchstart:passive",i=>{if("mousedown"!==i.type||1===i.buttons){i.stopPropagation(),i.preventDefault(),t.classList.add("pressed"),a=Date.now(),"touchstart"===i.type&&(s=i.changedTouches[0].identifier);const o=t.getAttribute("data-"+e.config.namespace+"command-pressed");o&&e.$perform(JSON.parse(o));const l=t.getAttribute("data-"+e.config.namespace+"command-pressAndHoldStart");l&&(r=t,n&&clearTimeout(n),n=window.setTimeout((function(){t.classList.contains("pressed")&&e.$perform(JSON.parse(l));}),300));}}),ui(t,"mouseleave touchcancel",()=>{t.classList.remove("pressed");}),ui(t,"touchmove:passive",e=>{e.preventDefault();for(let t=0;t<e.changedTouches.length;t++)if(e.changedTouches[t].identifier===s){const i=document.elementFromPoint(e.changedTouches[t].clientX,e.changedTouches[t].clientY);i!==o&&o&&(o.dispatchEvent(new MouseEvent("mouseleave"),{bubbles:!0}),o=null),i&&(o=i,i.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,buttons:1})));}}),ui(t,"mouseenter",e=>{1===e.buttons&&t.classList.add("pressed");}),ui(t,"mouseup touchend click",i=>{if(o){i.stopPropagation(),i.preventDefault();const e=o;return o=null,void e.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0}))}if(t.classList.remove("pressed"),t.classList.add("active"),"click"===i.type&&0!==i.detail)return i.stopPropagation(),void i.preventDefault();window.setTimeout((function(){t.classList.remove("active");}),150);let s=t.getAttribute("data-"+e.config.namespace+"command-pressAndHoldEnd");const n=Date.now();(t!==r||n<a+300)&&(s=void 0),!s&&i.altKey&&i.shiftKey&&(s=t.getAttribute("data-"+e.config.namespace+"command-altshift")),!s&&i.altKey&&(s=t.getAttribute("data-"+e.config.namespace+"command-alt")),!s&&i.shiftKey&&(s=t.getAttribute("data-"+e.config.namespace+"command-shift")),s||(s=t.getAttribute("data-"+e.config.namespace+"command")),s&&e.$perform(JSON.parse(s)),i.stopPropagation(),i.preventDefault();});}const _i={"\\text":"roman text","\\textrm":"roman text","\\textnormal":"roman text","\\textit":"italic text","\\textbf":"bold text","\\texttt":"monospaced text","\\textsf":"sans-serif text","\\mathrm":["roman","(upright)"],"\\mathbf":"bold","\\bf":"bold","\\bold":"bold","\\mathit":"italic","\\mathbb":"blackboard","\\mathscr":"script","\\mathtt":["typewriter","(monospaced)"],"\\mathsf":"sans-serif","\\mathcal":"caligraphic","\\frak":["fraktur","(gothic)"],"\\mathfrak":["fraktur","(gothic)"],"\\textcolor":"text color","\\color":"color","\\forall":"for all","\\exists":"there exists","\\nexists":"there does not exist","\\frac":"fraction","\\dfrac":"display fraction","\\cfrac":"continuous fraction","\\tfrac":"text fraction","\\binom":"binomial coefficient","\\dbinom":"display binomial coefficient","\\tbinom":"text binomial coefficient","\\pdiff":"partial differential","\\vec":"vector","\\check":"caron","\\acute":"acute","\\breve":"breve","\\tilde":"tilde","\\dot":"dot","\\hat":["hat","circumflex"],"\\ddot":"double dot","\\bar":"bar","\\prime":"prime","\\doubleprime":"double prime","\\varnothing":"empty set","\\emptyset":"empty set","\\subseteq":"subset of or <br>equal to","\\supseteq":"superset of or <br>equal to","\\supset":"superset of","\\subset":"subset of","\\partial":"partial derivative","\\bigcup":"union","\\bigcap":"intersection","\\approx":"approximately equal to","\\notin":"not an element of","\\in":["element of","included in"],"\\infty":"infinity","\\land":"logical and","\\sqrt":"square root","\\prod":"product","\\sum":"summation","\\amalg":["amalgamation","coproduct","free product","disjoint union"],"\\cup":"union with","\\cap":"intersection with","\\int":"integral","\\iint":"surface integral","\\oint":"curve integral","\\iiint":"volume integral","\\iff":"if and only if","\\ln":"natural logarithm","\\boldsymbol":"bold","\\setminus":"set subtraction","\\stackrel":"relation with symbol above","\\stackbin":"operator with symbol above","\\underset":"symbol with annotation below","\\overset":"symbol with annotation above","\\hslash":["h-bar","Planck constant"],"\\gtrsim":"greater than or <br>similar to","\\propto":"proportional to","\\equiv":"equivalent to","\\!":["negative thin space","(-3 mu)"],"\\ ":["space","(6 mu)"],"\\,":["thin space","(3 mu)"],"\\:":["medium space","(4 mu)"],"\\;":["thick space","(5 mu)"],"\\quad":["1 em space","(18 mu)"],"\\qquad":["2 em space","(36 mu)"],"\\enskip":["&#189; em space","(9 mu)"],"\\mp":"minus or plus","\\pm":"plus or minus","\\Im":"Imaginary part of","\\Re":"Real part of","\\gothicCapitalR":"Real part of","\\gothicCapitalI":"Imaginary part part of","\\differentialD":"differential d","\\aleph":["aleph","infinite cardinal",'<a target="_blank" href="https://en.wikipedia.org/wiki/Cardinal_number">Wikipedia <big>&#x203A;</big></a>'],"\\beth":["beth","beth number",'<a target="_blank" href="https://en.wikipedia.org/wiki/Beth_number">Wikipedia <big>&#x203A;</big></a>'],"\\gimel":["gimel","gimel function",'<a target="_blank" href="https://en.wikipedia.org/wiki/Gimel_function">Wikipedia <big>&#x203A;</big></a>'],"\\O":"empty set","\\N":"set of <br>natural numbers","\\Z":"set of <br>integers","\\Q":"set of <br>rational numbers","\\C":"set of <br>complex numbers","\\R":"set of <br>real numbers","\\P":"set of <br>prime numbers","\\lesseqqgtr":"less than, equal to or<br> greater than","\\gnapprox":"greater than and <br>not approximately","\\lnapprox":"lesser than and <br>not approximately","\\j":"dotless j","\\i":"dotless i","\\cdot":"centered dot","\\lmoustache":"left moustache","\\rmoustache":"right moustache","\\nabla":["nabla","del","differential vector operator"],"\\square":["square","d’Alembert operator",'<a target="_blank" href="https://en.wikipedia.org/wiki/D%27Alembert_operator">Wikipedia <big>&#x203A;</big></a>'],"\\blacksquare":["black square","end of proof","tombstone","Halmos symbol"],"\\Box":"end of proof","\\colon":["such that","ratio"],"\\coloneq":["is defined by","is assigned"],"\\Colon":["is defined by","as"],"\\_":["underbar","underscore"],"\\ll":"much less than","\\gg":"much greater than","\\doteq":"approximately equal to","\\Doteq":"approximately equal to","\\doteqdot":"approximately equal to","\\cong":["isomorphism of","(for algebras, modules...)"],"\\det":["determinant of","(of a matrix)"],"\\dotplus":"Cartesian product algebra","\\otimes":["tensor product","(of algebras)","Kronecker product","(of matrices)"],"\\oplus":["direct sum","(of modules)"],"\\lb":"base-2 logarithm","\\lg":"base-10 logarithm","\\wp":["Weierstrass P",'<a target="_blank" href="https://en.wikipedia.org/wiki/Weierstrass%27s_elliptic_functions">Wikipedia <big>&#x203A;</big></a>'],"\\wr":["wreath product",'<a target="_blank" href="https://en.wikipedia.org/wiki/Wreath_product">Wikipedia <big>&#x203A;</big></a>'],"\\top":["tautology","Proposition P is universally true"],"\\bot":["contradiction","Proposition P is contradictory"],"\\mid":["probability","of event A given B"],"\\mho":["Siemens","electrical conductance in SI unit",'<a target="_blank" href="https://en.wikipedia.org/wiki/Siemens_(unit)">Wikipedia <big>&#x203A;</big></a>'],"\\Longrightarrow":"implies","\\Longleftrightarrow":"if, and only if,","\\prec":"precedes","\\preceq":"precedes or is equal to","\\succ":"succeedes","\\succeq":"succeedes or is equal to","\\perp":["is perpendicular to","is independent of"],"\\models":["entails","double-turnstyle, models","is a semantic consequence of",'<a target="_blank" href="https://en.wikipedia.org/wiki/Double_turnstile">Wikipedia <big>&#x203A;</big></a>'],"\\vdash":["satisfies","turnstyle, assertion sign","syntactic inference",'<a target="_blank" href="https://en.wikipedia.org/wiki/Turnstile_(symbol)">Wikipedia <big>&#x203A;</big></a>'],"\\implies":["implies","logical consequence"],"\\impliedby":["implied by","logical consequence"],"\\surd":["surd","root of","checkmark"],"\\ltimes":["semi direct product",'<a target="_blank" href="https://en.wikipedia.org/wiki/Semidirect_product">Wikipedia <big>&#x203A;</big></a>'],"\\rtimes":["semi direct product",'<a target="_blank" href="https://en.wikipedia.org/wiki/Semidirect_product">Wikipedia <big>&#x203A;</big></a>'],"\\leftthreetimes":["semi direct product",'<a target="_blank" href="https://en.wikipedia.org/wiki/Semidirect_product">Wikipedia <big>&#x203A;</big></a>'],"\\rightthreetimes":["semi direct product",'<a target="_blank" href="https://en.wikipedia.org/wiki/Semidirect_product">Wikipedia <big>&#x203A;</big></a>'],"\\divideontimes":["divide on times"],"\\curlywedge":"nor","\\curlyvee":"nand","\\simeq":"is group isomorphic with","\\vartriangleleft":["is a normal subgroup of","is an ideal ring of"],"\\circ":["circle","ring","function composition"],"\\rlap":["overlap right","\\rlap{x}o"],"\\llap":["overlap left","o\\llap{/}"],"\\colorbox":["color box","\\colorbox{#fbc0bd}{...}"],"\\ast":["asterisk","reflexive closure (as a superscript)"],"\\bullet":"bullet","\\lim":"limit"};function wi(t,i,a){if(!i||0===i.length)return void Li(t);const r=i,s=function(e,t){const i=st(e,"math",null,t.config.macros);return D(A(Ne({mathstyle:c.displaystyle,macros:t.config.macros},i),"ML__base"),"ML__mathlive").toMarkup()}(i,t),o=function(t){let i=_i[t]||"";return e(i)&&(i=i.join("<br>")),i}(r),n=function(t,i){let a=[];if("string"==typeof i){const t=ci[i];e(t)?a=t.slice():t&&a.push(t);}const r=mi(i),s=new RegExp("^"+r.replace("\\","\\\\").replace("|","\\|").replace("*","\\*").replace("$","\\$").replace("^","\\^")+"([^*a-zA-Z]|$)");return t.forEach(e=>{s.test(mi(e.command))&&a.push(e);}),a.map(hi)}(t.keybindings,r).join("<br>");let l=a?'<div class="ML__popover__prev-shortcut" role="button" aria-label="Previous suggestion"><span><span>&#x25B2;</span></span></div>':"";l+='<span class="ML__popover__content" role="button">',l+='<div class="ML__popover__command">'+s+"</div>",o&&(l+='<div class="ML__popover__note">'+o+"</div>"),n&&(l+='<div class="ML__popover__shortcut">'+n+"</div>"),l+="</span>",l+=a?'<div class="ML__popover__next-shortcut" role="button" aria-label="Next suggestion"><span><span>&#x25BC;</span></span></div>':"",function(e,t){e.popover.innerHTML=e.config.createHTML(t);const i=vi(e.field);i&&zi(e,i),e.popover.classList.add("is-visible");}(t,l);let d=t.popover.getElementsByClassName("ML__popover__content");d&&d.length>0&&ki(t,d[0],{default:["complete",{acceptSuggestion:!0}]}),d=t.popover.getElementsByClassName("ML__popover__prev-shortcut"),d&&d.length>0&&ki(t,d[0],"previousSuggestion"),d=t.popover.getElementsByClassName("ML__popover__next-shortcut"),d&&d.length>0&&ki(t,d[0],"nextSuggestion");}function Mi(e,t){if(e.element&&e.element.mathfield===e&&e.popover.classList.contains("is-visible"))if(null==t?void 0:t.deferred)window.requestAnimationFrame(()=>Mi(e));else if(jt(e.model)&&"command"===jt(e.model).type){const t=vi(e.field);t&&zi(e,t);}else Li(e);}function zi(e,t){const i=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,a=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,r=window.innerWidth-document.documentElement.clientWidth,s=window.innerHeight-document.documentElement.clientHeight,o=e.virtualKeyboardVisible?e.virtualKeyboard.offsetHeight:0;t.x+e.popover.offsetWidth/2>a-r?e.popover.style.left=a-e.popover.offsetWidth-r+"px":t.x-e.popover.offsetWidth/2<0?e.popover.style.left="0":e.popover.style.left=t.x-e.popover.offsetWidth/2+"px",t.y+e.popover.offsetHeight+5>i-s-o?(e.popover.classList.add("ML__popover--reverse-direction"),e.popover.style.top=t.y-t.height-e.popover.offsetHeight-5+"px"):(e.popover.classList.remove("ML__popover--reverse-direction"),e.popover.style.top=t.y+5+"px");}function Li(e){e.popover.classList.remove("is-visible");}function Si(e,t=!1){let i="";const a=Lt(e);if(a){const r=t?e.anchorOffset()+1:a.end,s=e.siblings();for(let e=a.start;e<r;e++)i+=s[e].body||"";}return i}function Ci(e,t){const i=Lt(e);if(i){const a=e.siblings();for(let e=i.start;e<i.end;e++)a[e].isError=t;}}function Ai(e,t){const i=Lt(e);if(i){if(wt(e),t){e.siblings().splice(i.start,i.end-i.start,...t);let a=[];for(const e of t)a=a.concat(e.filter(e=>"placeholder"===e.type));Ht(e,0),e.path[e.path.length-1].offset=i.start-1,0!==a.length&&At(e,1,!1)||$t(e,i.start+t.length-1);}else e.siblings().splice(i.start,i.end-i.start),$t(e,i.start-1,0);Mt(e);}}const $i={"\\pm":"&#177;","\\times":"&#215;","\\colon":":","\\vert":"|","\\Vert":"∥","\\mid":"∣","\\lbrace":"{","\\rbrace":"}","\\langle":"⟨","\\rangle":"⟩","\\lfloor":"⌊","\\rfloor":"⌋","\\lceil":"⌈","\\rceil":"⌉","\\vec":"&#x20d7;","\\acute":"&#x00b4;","\\grave":"&#x0060;","\\dot":"&#x02d9;","\\ddot":"&#x00a8;","\\tilde":"&#x007e;","\\bar":"&#x00af;","\\breve":"&#x02d8;","\\check":"&#x02c7;","\\hat":"&#x005e;"};function Di(e){return e.replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function qi(e,t){return e&&t.generateID?' extid="'+e+'"':""}function Ti(e,t,i){let a=!1;t=t||e.atoms.length;let r="",s="",o=-1,n=-1;const l=e.atoms[e.index];if(e.index<t&&("mord"===l.type||"textord"===l.type)&&"0123456789,.".indexOf(l.body)<0&&(s=Wi(l,i),l.superscript&&(o=e.index),l.subscript&&(n=e.index),e.index+=1),s.length>0){if(a=!0,Ki(e)&&(o=e.index,e.index+=1),Ei(e)&&(n=e.index,e.index+=1),o>=0&&n>=0)r="<msubsup>"+s,r+=Pi(e.atoms[n].subscript,0,0,i).mathML,r+=Pi(e.atoms[o].superscript,0,0,i).mathML,r+="</msubsup>";else if(o>=0){if(r="<msup>"+s,Ki(e)){const t=Pi(e.atoms[o].superscript,0,0,i).mathML,a=Pi(e.atoms[o+1].superscript,0,0,i).mathML;r+="<mi>′</mi>"!==t&&"<mi>&#x2032;</mi>"!==t||"<mi>′</mi>"!==a&&"<mi>&#x2032;</mi>"!==a?"<mi>′</mi>"===t||"<mi>&#x2032;</mi>"===t?"<mi>&#x2032;</mi>":t:"<mi>&#x2033;</mi>";}else r+=Pi(e.atoms[o].superscript,0,0,i).mathML;r+="</msup>";}else n>=0?(r="<msub>"+s,r+=Pi(e.atoms[n].subscript,0,0,i).mathML,r+="</msub>"):r=s;"mi"!==e.lastType&&"mn"!==e.lastType&&"mtext"!==e.lastType&&"fence"!==e.lastType||/^<mo>(.*)<\/mo>$/.test(r)||(r="<mo>&#8290;</mo>"+r),s.endsWith(">f</mi>")||s.endsWith(">g</mi>")?(r+="<mo>&x2061;</mo>",e.lastType="applyfunction"):e.lastType=/^<mo>(.*)<\/mo>$/.test(r)?"mo":"mi",e.mathML+=r;}return a}function Ki(e){return e.index<e.atoms.length&&e.atoms[e.index].superscript&&"msubsup"===e.atoms[e.index].type}function Ei(e){return e.index<e.atoms.length&&e.atoms[e.index].subscript&&"msubsup"===e.atoms[e.index].type}function Ni(e,t,i){let a=!1,r="",s=t.atoms[t.index-1];return !!s&&(s.superscript||s.subscript||(Ki(t)||Ei(t))&&(s=t.atoms[t.index],t.index+=1),!!s&&(s.superscript&&s.subscript?(r="<msubsup>"+e,r+=Pi(s.subscript,0,0,i).mathML,r+=Pi(s.superscript,0,0,i).mathML,r+="</msubsup>"):s.superscript?(r="<msup>"+e,r+=Pi(s.superscript,0,0,i).mathML,r+="</msup>"):s.subscript&&(r="<msub>"+e,r+=Pi(s.subscript,0,0,i).mathML,r+="</msub>"),r.length>0&&(a=!0,t.mathML+=r,t.lastType=""),a))}function Fi(e,t,i){let a=!1;t=t||e.atoms.length;const r=e.index;let s="";for(;e.index<t&&"text"===e.atoms[e.index].mode;)s+=e.atoms[e.index].body?e.atoms[e.index].body:" ",e.index+=1;return s.length>0&&(a=!0,s="<mtext"+qi(e.atoms[r].id,i)+">"+s+"</mtext>",e.mathML+=s,e.lastType="mtext"),a}function Bi(e,t,i){let a=!1;t=t||e.atoms.length;const r=e.index;let s="",o=function(e){let t=-1,i=e.index,a=!1,r=!1;for(;i<e.atoms.length&&!a&&!r;)a="mord"!==e.atoms[i].type||"0123456789,.".indexOf(e.atoms[i].body)<0,r=!a&&e.atoms[i].superscript,i++;return r&&(t=i-1),t}(e);for(o>=0&&o<t&&(t=o);e.index<t&&"mord"===e.atoms[e.index].type&&"0123456789,.".indexOf(e.atoms[e.index].body)>=0;)s+=e.atoms[e.index].body,e.index+=1;return s.length>0&&(a=!0,s="<mn"+qi(e.atoms[r].id,i)+">"+s+"</mn>",o<0&&Ki(e)&&(o=e.index,e.index+=1),o>=0&&(s="<msup>"+s,s+=Pi(e.atoms[o].superscript,0,0,i).mathML,s+="</msup>"),e.mathML+=s,e.lastType="mn"),a}function Oi(e,t,i){let a=!1;t=t||e.atoms.length;let r="",s="";if(e.index<t&&"mopen"===e.atoms[e.index].type){let o=!1,n=0;const l=e.index;let c=-1,d=l+1;for(;d<t&&!o;)"mopen"===e.atoms[d].type?n+=1:"mclose"===e.atoms[d].type&&(n-=1),-1===n&&(o=!0,c=d),d+=1;o&&(r="<mrow>",r+=Ii(e.atoms[l],i),r+=Pi(e.atoms,l+1,c,i).mathML,r+=Ii(e.atoms[c],i),r+="</mrow>","mi"!==e.lastType&&"mn"!==e.lastType&&"mfrac"!==e.lastType&&"fence"!==e.lastType||(r="<mo>&#8290;</mo>"+r),e.index=c+1,Ni(r,e,i)&&(a=!0,e.lastType="",r=""),s="fence");}return r.length>0&&(a=!0,e.mathML+=r,e.lastType=s),a}function Ri(e,t,i){let a=!1;t=t||e.atoms.length;let r="",s="";const o=e.atoms[e.index];if(e.index<t&&("mbin"===o.type||"mrel"===o.type))r+=Wi(e.atoms[e.index],i),e.index+=1,s="mo";else if(e.index<t&&"mop"===o.type){if("limits"===o.limits&&(o.superscript||o.subscript)){const e=Ii(o,i);o.superscript&&o.subscript?(r+=("nolimits"!==o.limits?"<munderover>":"<msubsup>")+e,r+=Pi(o.subscript,0,0,i).mathML,r+=Pi(o.superscript,0,0,i).mathML,r+="nolimits"!==o.limits?"</munderover>":"</msubsup>"):o.superscript?(r+=("nolimits"!==o.limits?"<mover>":"<msup>")+e,r+=Pi(o.superscript,0,0,i).mathML,r+="nolimits"!==o.limits?"</mover>":"</msup>"):(r+=("nolimits"!==o.limits?"<munder>":"<msub>")+e,r+=Pi(o.subscript,0,0,i).mathML,r+="nolimits"!==o.limits?"</munder>":"</msub>"),s="mo";}else {const t=e.atoms[e.index],o="\\operatorname"===t.symbol,n=o?'<mi class="MathML-Unit"'+qi(t.id,i)+">"+Hi(t.body)+"</mi>":Ii(t,i);r+=n,e.index+=1,Ni(r,e,i)&&(a=!0,e.lastType="",r=""),e.index-=1,o||/^<mo>(.*)<\/mo>$/.test(n)?s=o?"mi":"mo":(r+="<mo>&#x2061;</mo>",s="applyfunction");}"mi"!==e.lastType&&"mn"!==e.lastType||/^<mo>(.*)<\/mo>$/.test(r)||(r="<mo>&#8290;</mo>"+r),e.index+=1;}return r.length>0&&(a=!0,e.mathML+=r,e.lastType=s),a}function Pi(e,t,i,a){const r={atoms:e,index:null!=t?t:0,mathML:"",lastType:""};if("number"==typeof e||"boolean"==typeof e)r.mathML=e.toString();else if("string"==typeof e)r.mathML=e;else if(e instanceof Fe)r.mathML=Wi(e,a);else if(Array.isArray(e)){let t=0;for(i=i||(e?e.length:0);r.index<i;)if(Fi(r,i,a)||Bi(r,i,a)||Ti(r,i,a)||Ri(r,i,a)||Oi(r,i,a))t+=1;else if(r.index<i){let e=Wi(r.atoms[r.index],a);"mn"===r.lastType&&e.length>0&&"genfrac"===r.atoms[r.index].type&&(e="<mo>&#x2064;</mo>"+e),"genfrac"===r.atoms[r.index].type?r.lastType="mfrac":r.lastType="",e.length>0&&(r.mathML+=e,t+=1),r.index+=1;}t>1&&(r.mathML="<mrow>"+r.mathML+"</mrow>");}return r}function Ii(e,t){let i="";const a=Hi(e.body);return a&&(i="<mo"+qi(e.id,t)+">"+a+"</mo>"),i}function Hi(e){if(!e)return "";if("string"==typeof e)return Di(e);if(!Array.isArray(e)&&"string"==typeof e.body)return Di(e.body);let t="";for(const i of e)"string"==typeof i.body&&(t+=i.body);return Di(t)}function Wi(e,t){var i,a,r,s,o,n,l,c;const d={widehat:"^",widecheck:"ˇ",widetilde:"~",utilde:"~",overleftarrow:"←",underleftarrow:"←",xleftarrow:"←",overrightarrow:"→",underrightarrow:"→",xrightarrow:"→",underbrace:"⏟",overbrace:"⏞",overgroup:"⏠",undergroup:"⏡",overleftrightarrow:"↔",underleftrightarrow:"↔",xleftrightarrow:"↔",Overrightarrow:"⇒",xRightarrow:"⇒",overleftharpoon:"↼",xleftharpoonup:"↼",overrightharpoon:"⇀",xrightharpoonup:"⇀",xLeftarrow:"⇐",xLeftrightarrow:"⇔",xhookleftarrow:"↩",xhookrightarrow:"↪",xmapsto:"↦",xrightharpoondown:"⇁",xleftharpoondown:"↽",xrightleftharpoons:"⇌",xleftrightharpoons:"⇋",xtwoheadleftarrow:"↞",xtwoheadrightarrow:"↠",xlongequal:"=",xtofrom:"⇄",xrightleftarrows:"⇄",xrightequilibrium:"⇌",xleftequilibrium:"⇋"},m={"\\exponentialE":"&#x02147;","\\imaginaryI":"&#x2148;","\\differentialD":"&#x2146;","\\capitalDifferentialD":"&#x2145;","\\alpha":"&#x03b1;","\\pi":"&#x03c0;","\\infty":"&#x221e;","\\forall":"&#x2200;","\\nexists":"&#x2204;","\\exists":"&#x2203;","\\hbar":"ℏ","\\cdotp":"⋅","\\ldots":"…","\\cdots":"⋯","\\ddots":"⋱","\\vdots":"⋮","\\ldotp":"."},h={"\\!":-3/18,"\\ ":6/18,"\\,":3/18,"\\:":4/18,"\\;":5/18,"\\enspace":.5,"\\quad":1,"\\qquad":2,"\\enskip":.5};let p,u,f,g,y,b,v="",x="",k={cal:"script",frak:"fraktur",bb:"double-struck",scr:"script",cmtt:"monospace",cmss:"sans-serif"}[e.fontFamily||e.font]||"";k&&(k=' mathvariant="'+k+'"');const _=e.symbol;if("text"===e.mode)v="<mi"+qi(e.id,t)+">"+e.body+"</mi>";else switch(e.type){case"first":break;case"group":case"root":v=Pi(e.body,0,0,t).mathML;break;case"array":if((e.leftDelim&&"."!==e.leftDelim||e.rightDelim&&"."!==e.rightDelim)&&(v+="<mrow>",e.leftDelim&&"."!==e.leftDelim&&(v+="<mo>"+($i[e.leftDelim]||e.leftDelim)+"</mo>")),v+="<mtable",e.colFormat){for(v+=' columnalign="',f=0;f<e.colFormat.length;f++)e.colFormat[f].align&&(v+={l:"left",c:"center",r:"right"}[e.colFormat[f].align]+" ");v+='"';}for(v+=">",u=0;u<e.array.length;u++){for(v+="<mtr>",p=0;p<e.array[u].length;p++)v+="<mtd>"+Pi(e.array[u][p],0,0,t).mathML+"</mtd>";v+="</mtr>";}v+="</mtable>",(e.leftDelim&&"."!==e.leftDelim||e.rightDelim&&"."!==e.rightDelim)&&(e.rightDelim&&"."!==e.rightDelim&&(v+="<mo>"+($i[e.leftDelim]||e.rightDelim)+"</mo>"),v+="</mrow>");break;case"genfrac":(e.leftDelim||e.rightDelim)&&(v+="<mrow>"),e.leftDelim&&"."!==e.leftDelim&&(v+="<mo"+qi(e.id,t)+">"+($i[e.leftDelim]||e.leftDelim)+"</mo>"),e.hasBarLine?(v+="<mfrac>",v+=Pi(e.numer,0,0,t).mathML||"<mi>&nbsp;</mi>",v+=Pi(e.denom,0,0,t).mathML||"<mi>&nbsp;</mi>",v+="</mfrac>"):(v+="<mtable"+qi(e.id,t)+">",v+="<mtr>"+Pi(e.numer,0,0,t).mathML+"</mtr>",v+="<mtr>"+Pi(e.denom,0,0,t).mathML+"</mtr>",v+="</mtable>"),e.rightDelim&&"."!==e.rightDelim&&(v+="<mo"+qi(e.id,t)+">"+($i[e.rightDelim]||e.rightDelim)+"</mo>"),(e.leftDelim||e.rightDelim)&&(v+="</mrow>");break;case"surd":e.index?(v+="<mroot"+qi(e.id,t)+">",v+=Pi(e.body,0,0,t).mathML,v+=Pi(e.index,0,0,t).mathML,v+="</mroot>"):(v+="<msqrt"+qi(e.id,t)+">",v+=Pi(e.body,0,0,t).mathML,v+="</msqrt>");break;case"leftright":v="<mrow>",e.leftDelim&&"."!==e.leftDelim&&(v+="<mo"+qi(e.id,t)+">"+($i[e.leftDelim]||e.leftDelim)+"</mo>"),e.body&&(v+=Pi(e.body,0,0,t).mathML),e.rightDelim&&"."!==e.rightDelim&&(v+="<mo"+qi(e.id,t)+">"+($i[e.rightDelim]||e.rightDelim)+"</mo>"),v+="</mrow>";break;case"sizeddelim":case"delim":v+='<mo separator="true"'+qi(e.id,t)+">"+($i[e.delim]||e.delim)+"</mo>";break;case"accent":v+='<mover accent="true"'+qi(e.id,t)+">",v+=Pi(e.body,0,0,t).mathML,v+="<mo>"+($i[_]||e.accent)+"</mo>",v+="</mover>";break;case"line":case"overlap":break;case"overunder":y=e.overscript,g=e.underscript,(e.svgAbove||y)&&(e.svgBelow||g)?b=e.body:y?(b=e.body,(null===(a=null===(i=e.body)||void 0===i?void 0:i[0])||void 0===a?void 0:a.underscript)?(g=e.body[0].underscript,b=e.body[0].body):"first"===(null===(r=null==e?void 0:e.body[0])||void 0===r?void 0:r.type)&&(null===(s=null==e?void 0:e.body[1])||void 0===s?void 0:s.underscript)&&(g=e.body[1].underscript,b=e.body[1].body)):g&&(b=e.body,(null===(n=null===(o=null==e?void 0:e.body)||void 0===o?void 0:o[0])||void 0===n?void 0:n.overscript)?(y=e.body[0].overscript,b=e.body[0].body):"first"===(null===(l=null==e?void 0:e.body[0])||void 0===l?void 0:l.type)&&(null===(c=null==e?void 0:e.body[1])||void 0===c?void 0:c.overscript)&&(y=e.body[1].overscript,b=e.body[1].body)),(e.svgAbove||y)&&(e.svgBelow||g)?(v+=`<munderover ${k} ${qi(e.id,t)}>`,v+=d[e.svgBody]||Pi(b,0,0,t).mathML,v+=d[e.svgBelow]||Pi(g,0,0,t).mathML,v+=d[e.svgAbove]||Pi(y,0,0,t).mathML,v+="</munderover>"):e.svgAbove||y?(v+=`<mover ${k} ${qi(e.id,t)}>`+(d[e.svgBody]||Pi(b,0,0,t).mathML),v+=d[e.svgAbove]||Pi(y,0,0,t).mathML,v+="</mover>"):(e.svgBelow||g)&&(v+=`<munder ${k} ${qi(e.id,t)}>`+(d[e.svgBody]||Pi(b,0,0,t).mathML),v+=d[e.svgBelow]||Pi(g,0,0,t).mathML,v+="</munder>");break;case"placeholder":case"mord":{v=m[_]||_||("string"==typeof e.body?e.body:"");const i=_?_.match(/[{]?\\char"([0-9abcdefABCDEF]*)[}]?/):null;i?v="&#x"+i[1]+";":v.length>0&&"\\"===v.charAt(0)&&(v="string"==typeof e.body&&e.body.charCodeAt(0)>255?"&#x"+("000000"+e.body.charCodeAt(0).toString(16)).substr(-4)+";":"string"==typeof e.body?e.body.charAt(0):e.body);const a=/\d/.test(v)?"mn":"mi";v="<"+a+k+qi(e.id,t)+">"+Di(v)+"</"+a+">";break}case"mbin":case"mrel":case"textord":case"minner":v=_&&m[_]?"<mi"+qi(e.id,t)+">"+m[_]+"</mi>":_&&$i[_]?"<mo"+qi(e.id,t)+">"+$i[_]+"</mo>":Ii(e,t);break;case"mpunct":v='<mo separator="true"'+qi(e.id,t)+">"+($i[_]||_)+"</mo>";break;case"mop":"​"!==e.body&&(v="<mo"+qi(e.id,t)+">",v+="\\operatorname"===_?e.body:_||e.body,v+="</mo>");break;case"mathstyle":break;case"box":v='<menclose notation="box"',e.backgroundcolor&&(v+=' mathbackground="'+ye(e.backgroundcolor)+'"'),v+=qi(e.id,t)+">"+Pi(e.body,0,0,t).mathML+"</menclose>";break;case"spacing":v+='<mspace width="'+(h[_]||0)+'em"/>';break;case"enclose":v='<menclose notation="';for(const t in e.notation)Object.prototype.hasOwnProperty.call(e.notation,t)&&e.notation[t]&&(v+=x+t,x=" ");v+=qi(e.id,t)+'">'+Pi(e.body,0,0,t).mathML+"</menclose>";break;case"space":v+="&nbsp;";}return v}function Vi(e,t){return Pi(e,0,0,t).mathML}function Ui(e){let t=0;for(let i=0;i<e.length;i++)t=31*t+e.charCodeAt(i),t|=0;return Math.abs(t)}function ji(e){e.dirty||(e.dirty=!0,requestAnimationFrame(()=>{bi(e)&&e.dirty&&Xi(e);}));}function Xi(e,t){t=null!=t?t:{},e.dirty=!1,window.mathlive||(window.mathlive={}),jt(e.model)||(e.model.path=[{relation:"body",offset:0}]),e.model.root.forEach(e=>{e.caret="",e.isSelected=!1,e.containsCaret=!1;});const i=e.$hasFocus();if(It(e.model)?jt(e.model).caret=i&&!e.config.readOnly?e.mode:"":Gt(e.model,e=>{e.isSelected=!0;}),i&&!e.config.readOnly){let t=e.model.ancestor(1),i=1,a=!1;for(;t&&!a;)"surd"!==t.type&&"leftright"!==t.type||(t.containsCaret=!0,a=!0),i+=1,t=e.model.ancestor(i);}const a=A(Ne({mathstyle:c.displaystyle,letterShapeStyle:e.config.letterShapeStyle,atomIdsSettings:{seed:Ui(e.model.root.toLatex(!1)),groupNumbers:t.forHighlighting},smartFence:e.config.smartFence,macros:e.config.macros},e.model.root),"ML__base");a.attributes={translate:"no","aria-hidden":"true"};const r=D(a,"ML__mathlive");e.field.innerHTML=e.config.createHTML(r.toMarkup(0,e.config.horizontalSpacingScale)),e.field.classList.toggle("ML__focused",i&&!e.config.readOnly),e.accessibleNode.innerHTML=e.config.createHTML('<math xmlns="http://www.w3.org/1998/Math/MathML">'+Vi(e.model.root,e.config)+"</math>");const s=xi(e.field);if(s){const t=document.createElement("div");t.classList.add("ML__selection"),t.style.position="absolute",t.style.left=s.left+"px",t.style.top=s.top+"px",t.style.width=Math.ceil(s.right-s.left)+"px",t.style.height=Math.ceil(s.bottom-s.top-1)+"px",e.field.insertBefore(t,e.field.childNodes[0]);}}const Zi={};function Gi(e,t){t=null!=t?t:{target:"mathfield",canUndo:!1},Object.keys(e).forEach(i=>{Zi[i]={...t,fn:e[i]};});}function Yi(e,t=",",i){if(!e)return [];let a,r=[];for(let s of e)s&&s.length>0&&"first"===s[0].type&&(s=s.slice(1)),s&&s.length>0&&(a?r.push(a):a=new Fe("math","mpunct",t,i),r=r.concat(s));return r}function Ji(t,i){const a=t.parent();if(a&&"array"===a.type&&e(a.array)){const e=t.relation();if(a.array){const r=gt(a.array,e);"after row"===i||"before row"===i?(r.col=0,r.row=r.row+("after row"===i?1:0),a.array.splice(r.row,0,[[]])):(r.col+="after column"===i?1:0,a.array[r.row].splice(r.col,0,[]));const s=ft(a.array,r);t.path.pop(),t.path.push({relation:"cell"+s.toString(),offset:0}),t.insertFirstAtom();}}}function Qi(e){var t;const i=e.parent();if("leftright"===i.type){i.type="array";const a=null!==(t={"(":"pmatrix","\\lbrack":"bmatrix","\\lbrace":"cases"}[i.leftDelim])&&void 0!==t?t:"matrix",r=ie(a),s=[[i.body]];Object.assign(i,r.parser(a,[],s)),i.mode=St(e),i.environmentName=a,i.array=s,i.rowGaps=[0],delete i.body,e.path[e.path.length-1].relation="cell0";}}function ea(e){return wt(e),Qi(e),Ji(e,"after row"),Mt(e),!0}function ta(e){return wt(e),Qi(e),Ji(e,"after column"),Mt(e),!0}function ia(e,t=0){wt(e),kt(e);const i=e.suppressChangeNotifications;if(e.suppressChangeNotifications=!0,t=t<0?-1:t>0?1:t,ct(e),e.parent().array&&t<0&&0===e.startOffset()){const t=e.parent().array;if(function(e){const t={col:0,row:0};for(;t.row<e.length&&!yt(e,t);)t.row+=1;return yt(e,t)?"cell"+ft(e,t):""}(t)===e.relation()){const i=function(e,t=[";",","],i){let a,r=[];for(const s of e)a?r.push(a):a=new Fe("math","mpunct",t[0],i),r=r.concat(Yi(s,t[1]));return r}(t);e.path.pop(),e.siblings().splice(e.anchorOffset(),1,...i),$t(e,e.anchorOffset()-1,i.length);}else {const i=gt(t,e.relation());if(0===i.col){const a=vt(t,i,-1);a.col=t[a.row].length-1,e.path[e.path.length-1].relation="cell"+ft(t,a);const r=t[a.row][a.col].length,s=Yi(t[i.row]);t[a.row][a.col]=t[a.row][a.col].concat(s),$t(e,r-1,s.length),function(e,t){e.splice(t,1);}(t,i.row);}else 0===function(e,t){let i=0;const a={col:t,row:0};for(;a.row<e.length;){const t=yt(e,a);if(t&&t.length>0){let e=t.length;"first"===t[0].type&&(e-=1),e>0&&(i+=1);}a.row+=1;}return i}(t,i.col)&&(function(e,t){let i=0;for(;i<e.length;)e[i][t]&&e[i].splice(t,1),i+=1;}(t,i.col),i.col-=1,e.path[e.path.length-1].relation="cell"+ft(t,i),$t(e,t[i.row][i.col].length-1,0));}return e.suppressChangeNotifications=i,_t(e),void Mt(e)}const a=e.siblings();if(It(e)){const i=e.anchorOffset();if(t<0)if(0!==i){const t=e.sibling(0);"leftright"===t.type?(t.rightDelim="?",Tt(e,-1)):!t.captureSelection&&/^(group|array|genfrac|surd|leftright|overlap|overunder|box|mathstyle|sizing)$/.test(t.type)?Tt(e,-1):(e.announce("deleted",null,a.slice(i,i+1)),a.splice(i,1),$t(e,i-1));}else {const t=e.relation();if("superscript"===t||"subscript"===t){const i=e.parent()[t].filter(e=>"placeholder"!==e.type&&"first"!==e.type);e.parent()[t]=null,e.path.pop(),e.siblings().splice(e.anchorOffset(),0,...i),$t(e,e.anchorOffset()-1),e.announce("deleted: "+t);}else if("denom"===t){const t=e.parent().numer.filter(e=>"placeholder"!==e.type&&"first"!==e.type),i=e.parent().denom.filter(e=>"placeholder"!==e.type&&"first"!==e.type);e.path.pop(),e.siblings().splice(e.anchorOffset(),1,...i),e.siblings().splice(e.anchorOffset(),0,...t),$t(e,e.anchorOffset()+t.length-1),e.announce("deleted: denominator");}else if("body"===t){const t=e.siblings().filter(e=>"placeholder"!==e.type);e.path.length>1&&(t.shift(),e.path.pop(),e.siblings().splice(e.anchorOffset(),1,...t),$t(e,e.anchorOffset()-1),e.announce("deleted: root"));}else Tt(e,-1),aa(e,-1);}else if(t>0)if(i!==a.length-1)/^(group|array|genfrac|surd|leftright|overlap|overunder|box|mathstyle|sizing)$/.test(e.sibling(1).type)?Tt(e,1):(e.announce("deleted",null,a.slice(i+1,i+2)),a.splice(i+1,1));else if("numer"===e.relation()){const t=e.parent().numer.filter(e=>"placeholder"!==e.type&&"first"!==e.type),i=e.parent().denom.filter(e=>"placeholder"!==e.type&&"first"!==e.type);e.path.pop(),e.siblings().splice(e.anchorOffset(),1,...i),e.siblings().splice(e.anchorOffset(),0,...t),$t(e,e.anchorOffset()+t.length-1),e.announce("deleted: numerator");}else Tt(e,1),aa(e,-1);}else {const t=e.startOffset()+1,i=e.endOffset()+1;e.announce("deleted",null,a.slice(t,i)),a.splice(t,i-t),$t(e,t-1);}dt(e),e.suppressChangeNotifications=i,_t(e),Mt(e);}function aa(e,t=0){if(0===t)ia(e,0);else if(t>0)for(;t>0;)ia(e,1),t--;else for(;t<0;)ia(e,-1),t++;return !0}Gi({performWithFeedback:(e,t)=>function(e,t){return e.$focus(),e.config.keypressVibration&&(null===navigator||void 0===navigator?void 0:navigator.vibrate)&&navigator.vibrate(3),"moveToNextPlaceholder"===(t=t.replace(/-\w/g,e=>e[1].toUpperCase()))||"moveToPreviousPlaceholder"===t||"complete"===t?e.returnKeypressSound?(e.returnKeypressSound.load(),e.returnKeypressSound.play().catch(e=>{})):e.keypressSound&&(e.keypressSound.load(),e.keypressSound.play().catch(e=>{})):"deletePreviousChar"!==t&&"deleteNextChar"!==t&&"deletePreviousWord"!==t&&"deleteNextWord"!==t&&"deleteToGroupStart"!==t&&"deleteToGroupEnd"!==t&&"deleteToMathFieldStart"!==t&&"deleteToMathFieldEnd"!==t||!e.deleteKeypressSound?e.keypressSound&&(e.keypressSound.load(),e.keypressSound.play().catch(e=>{})):(e.deleteKeypressSound.load(),e.deleteKeypressSound.play().catch(e=>{})),e.$perform(t)}(e,t)}),Gi({addRowAfter:ea,addColumnAfter:ta,addRowBefore:function(e){return wt(e),Qi(e),Ji(e,"before row"),Mt(e),!0},addColumnBefore:function(e){return wt(e),Qi(e),Ji(e,"before column"),Mt(e),!0}},{target:"model",category:"array-edit"});const ra={"''":{mode:"math",value:"^{\\doubleprime}"},alpha:"\\alpha",delta:"\\delta",Delta:"\\Delta",pi:{mode:"math",value:"\\pi"},"pi ":{mode:"text",value:"\\pi "},Pi:{mode:"math",value:"\\Pi"},theta:"\\theta",Theta:"\\Theta",ii:{after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text",value:"\\imaginaryI"},jj:{after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text",value:"\\imaginaryJ"},ee:{mode:"math",after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text",value:"\\exponentialE"},nabla:{mode:"math",value:"\\nabla"},grad:{mode:"math",value:"\\nabla"},del:{mode:"math",value:"\\partial"},"∞":"\\infty",oo:{mode:"math",after:"nothing+digit+frac+surd+binop+relop+punct+array+openfence+closefence+space",value:"\\infty"},"∑":{mode:"math",value:"\\sum"},sum:{mode:"math",value:"\\sum_{#?}^{#?}"},prod:{mode:"math",value:"\\prod_{#?}^{#?}"},sqrt:{mode:"math",value:"\\sqrt"},"∆":{mode:"math",value:"\\differentialD"},"∂":{mode:"math",value:"\\differentialD"},arcsin:{mode:"math",value:"\\arcsin"},arccos:{mode:"math",value:"\\arccos"},arctan:{mode:"math",value:"\\arctan"},sin:{mode:"math",value:"\\sin"},sinh:{mode:"math",value:"\\sinh"},cos:{mode:"math",value:"\\cos"},cosh:{mode:"math",value:"\\cosh"},tan:{mode:"math",value:"\\tan"},tanh:{mode:"math",value:"\\tanh"},sec:{mode:"math",value:"\\sec"},csc:{mode:"math",value:"\\csc"},cot:{mode:"math",value:"\\cot"},log:{mode:"math",value:"\\log"},ln:{mode:"math",value:"\\ln"},exp:{mode:"math",value:"\\exp"},lim:{mode:"math",value:"\\lim_{#?}"},dx:{mode:"math",after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text",value:"\\differentialD x"},dy:{mode:"math",after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text",value:"\\differentialD y"},dt:{mode:"math",after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text",value:"\\differentialD t"},AA:{mode:"math",value:"\\forall"},EE:{mode:"math",value:"\\exists"},"!EE":{mode:"math",value:"\\nexists"},"&&":{mode:"math",value:"\\land"},xin:{mode:"math",after:"nothing+text+relop+punct+openfence+space",value:"x \\in"},in:{mode:"math",after:"nothing+letter+closefence",value:"\\in"},"!in":{mode:"math",value:"\\notin"},NN:"\\N",ZZ:"\\Z",QQ:"\\Q",RR:"\\R",CC:"\\C",PP:"\\P",xx:{mode:"math",value:"\\times"},"+-":{mode:"math",value:"\\pm"},"!=":{mode:"math",value:"\\ne"},">=":{mode:"math",value:"\\ge"},"<=":{mode:"math",value:"\\le"},"<<":{mode:"math",value:"\\ll"},">>":{mode:"math",value:"\\gg"},"~~":{mode:"math",value:"\\approx"},"≈":{mode:"math",value:"\\approx"},"?=":{mode:"math",value:"\\questeq"},"÷":{mode:"math",value:"\\div"},"¬":{mode:"math",value:"\\neg"},":=":{mode:"math",value:"\\coloneq"},"::":{mode:"math",value:"\\Colon"},"(:":{mode:"math",value:"\\langle"},":)":{mode:"math",value:"\\rangle"},beta:"\\beta",chi:"\\chi",epsilon:"\\epsilon",varepsilon:"\\varepsilon",eta:{mode:"math",after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text",value:"\\eta"},"eta ":{mode:"text",after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text",value:"\\eta "},gamma:"\\gamma",Gamma:"\\Gamma",iota:"\\iota",kappa:"\\kappa",lambda:"\\lambda",Lambda:"\\Lambda",mu:{mode:"math",after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text",value:"\\mu"},"mu ":{mode:"text",after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text",value:"\\mu "},nu:{mode:"math",after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text",value:"\\nu"},"nu ":{mode:"text",after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text",value:"\\nu "},"µ":"\\mu",phi:{after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text",value:"\\phi"},Phi:{after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text",value:"\\Phi"},varphi:"\\varphi",psi:{after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text",value:"\\psi"},Psi:{after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text",value:"\\Psi"},rho:{after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text",value:"\\rho"},sigma:"\\sigma",Sigma:"\\Sigma",tau:{after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text",value:"\\tau"},vartheta:"\\vartheta",upsilon:"\\upsilon",xi:{after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text",value:"\\xi"},Xi:{after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text",value:"\\Xi"},zeta:"\\zeta",omega:"\\omega",Omega:"\\Omega","Ω":"\\omega",forall:{mode:"math",value:"\\forall"},exists:{mode:"math",value:"\\exists"},"!exists":{mode:"math",value:"\\nexists"},":.":{mode:"math",value:"\\therefore"},liminf:"\\operatorname*{lim~inf}_{#?}",limsup:"\\operatorname*{lim~sup}_{#?}",argmin:"\\operatorname*{arg~min}_{#?}",argmax:"\\operatorname*{arg~max}_{#?}",det:"\\det",mod:{mode:"math",value:"\\mod"},max:{mode:"math",value:"\\max"},min:{mode:"math",value:"\\min"},erf:"\\operatorname{erf}",erfc:"\\operatorname{erfc}",bessel:{mode:"math",value:"\\operatorname{bessel}"},mean:{mode:"math",value:"\\operatorname{mean}"},median:{mode:"math",value:"\\operatorname{median}"},fft:{mode:"math",value:"\\operatorname{fft}"},lcm:{mode:"math",value:"\\operatorname{lcm}"},gcd:{mode:"math",value:"\\operatorname{gcd}"},randomReal:"\\operatorname{randomReal}",randomInteger:"\\operatorname{randomInteger}",Re:{mode:"math",value:"\\operatorname{Re}"},Im:{mode:"math",value:"\\operatorname{Im}"},mm:{mode:"math",after:"nothing+digit",value:"\\operatorname{mm}"},cm:{mode:"math",after:"nothing+digit",value:"\\operatorname{cm}"},km:{mode:"math",after:"nothing+digit",value:"\\operatorname{km}"},kg:{mode:"math",after:"nothing+digit",value:"\\operatorname{kg}"},"...":"\\ldots","+...":"+\\cdots","-...":"-\\cdots","->...":"\\to\\cdots","->":"\\to","|->":"\\mapsto","--\x3e":"\\longrightarrow","<--":"\\longleftarrow","=>":"\\Rightarrow","==>":"\\Longrightarrow","<=>":"\\Leftrightarrow","<->":"\\leftrightarrow","(.)":"\\odot","(+)":"\\oplus","(/)":"\\oslash","(*)":"\\otimes","(-)":"\\ominus","||":"\\Vert","{":"\\{","}":"\\}","*":"\\cdot"};function sa(e,t,i){var a;return function(e,t){if(!t)return "";if("string"==typeof t)return t;if(!e)return t.value;let i=!1,a=!1,r=!1,s=!1,o=!1,n=!1,l=!1,c=!1,d=!1,m=!1,h=!1,p=!1,u=!1,f=!1,g=e[e.length-1],y=e.length-1;for(;g&&/msubsup|placeholder/.test(g.type);)y-=1,g=e[y];if(i=!g||"first"===g.type,g){if(void 0!==t.mode&&g.mode!==t.mode)return "";u="text"===g.mode,a=!u&&"mord"===g.type&&W.test(g.body),r=!u&&"mord"===g.type&&/[0-9]+$/.test(g.body),s=!u&&g.isFunction,o="genfrac"===g.type,n="surd"===g.type,l="mbin"===g.type,c="mrel"===g.type,d="mpunct"===g.type||"minner"===g.type,m=!!g.array,h="mopen"===g.type,p="mclose"===g.type||"leftright"===g.type,f="space"===g.type;}return void 0!==t.after?/nothing/.test(t.after)&&i||/letter/.test(t.after)&&a||/digit/.test(t.after)&&r||/function/.test(t.after)&&s||/frac/.test(t.after)&&o||/surd/.test(t.after)&&n||/binop/.test(t.after)&&l||/relop/.test(t.after)&&c||/punct/.test(t.after)&&d||/array/.test(t.after)&&m||/openfence/.test(t.after)&&h||/closefence/.test(t.after)&&p||/text/.test(t.after)&&u||/space/.test(t.after)&&f?t.value:"":t.value}(e,null!==(a=null==i?void 0:i[t])&&void 0!==a?a:ra[t])}function oa(e,t){if(!e)return ["latex",""];if(e.length<=1)return ["latex",e];if(!t||"ASCIIMath"!==t.format){const t=e.trim();if(t.startsWith("$$")&&t.endsWith("$$")||t.startsWith("\\[")&&t.endsWith("\\]")||t.startsWith("\\(")&&t.endsWith("\\)"))return ["latex",t.substring(2,t.length-2)];if(t.startsWith("$")&&t.endsWith("$"))return ["latex",t.substring(1,t.length-1)];if(e=e.replace(/\\\\([^\s\n])/g,"\\$1"),/\\/.test(e))return ["latex",e]}return e=(e=(e=(e=(e=(e=e.replace(/\u2061/gu,"")).replace(/\u3016/gu,"{")).replace(/\u3017/gu,"}")).replace(/([^\\])sinx/g,"$1\\sin x")).replace(/([^\\])cosx/g,"$1\\cos x ")).replace(/\u2013/g,"-"),[(null==t?void 0:t.format)||"ASCIIMath",na(e,null!=t?t:{})]}function na(e,t){var i,a,r,s,o,n,l;if(!e)return "";let c,d=!1;if(d||"^"!==e[0]&&"_"!==e[0]||(c=la(e.substr(1),{inlineShortcuts:null!==(i=null==t?void 0:t.inlineShortcuts)&&void 0!==i?i:{},noWrap:!0}),e=e[0]+"{"+c.match+"}",e+=na(c.rest,t),d=!0),d||(c=e.match(/^(sqrt|\u221a)(.*)/),c&&(c=la(c[2],{inlineShortcuts:null!==(a=null==t?void 0:t.inlineShortcuts)&&void 0!==a?a:{},noWrap:!0}),e="\\sqrt{"+c.match+"}",e+=na(c.rest,t),d=!0)),d||(c=e.match(/^(\\cbrt|\u221b)(.*)/),c&&(c=la(c[2],{inlineShortcuts:null!==(r=null==t?void 0:t.inlineShortcuts)&&void 0!==r?r:{},noWrap:!0}),e="\\sqrt[3]{"+c.match+"}",e+=na(c.rest,t),d=!0)),d||(c=e.match(/^abs(.*)/),c&&(c=la(c[1],{inlineShortcuts:null!==(s=null==t?void 0:t.inlineShortcuts)&&void 0!==s?s:{},noWrap:!0}),e="\\left|"+c.match+"\\right|",e+=na(c.rest,t),d=!0)),d||(c=e.match(/^["”“](.*?)["”“](.*)/),c&&(e="\\text{"+c[1]+"}",e+=na(c[2],t),d=!0)),d||(c=e.match(/^([^a-zA-Z({[_^\\\s"]+)(.*)/),c&&(e=ca(c[1],t),e+=na(c[2],t),d=!0)),!d&&/^(f|g|h)[^a-zA-Z]/.test(e)&&(c=la(e.substring(1),{inlineShortcuts:null!==(o=t.inlineShortcuts)&&void 0!==o?o:{},noWrap:!0}),e="("===e[1]?e[0]+"\\mleft("+c.match+"\\mright)":e[0]+c.match,e+=na(c.rest,t),d=!0),d||(c=e.match(/^([a-zA-Z]+)(.*)/),c&&(e=ca(c[1],t),e+=na(c[2],t),d=!0)),!d)if(c=la(e,{inlineShortcuts:null!==(n=t.inlineShortcuts)&&void 0!==n?n:{},noWrap:!0}),c.match&&"/"===c.rest[0]){const i=la(c.rest.substr(1),{inlineShortcuts:null!==(l=t.inlineShortcuts)&&void 0!==l?l:{},noWrap:!0});i.match&&(e="\\frac{"+c.match+"}{"+i.match+"}"+na(i.rest,t)),d=!0;}else c.match&&(e="("===e[0]?"\\left("+c.match+"\\right)"+na(c.rest,t):c.match+na(c.rest,t),d=!0);return d||(c=e.match(/^(\s+)(.*)$/),c&&(e=" "+na(c[2],t),d=!0)),e}function la(e,t){let i="",a=e=e.trim(),r=e.charAt(0),s={"(":")","{":"}","[":"]"}[r];if(s){let o=1,n=1;for(;n<e.length&&o>0;)e[n]===r&&o++,e[n]===s&&o--,n++;0===o?(t.noWrap&&"("===r?i=na(e.substring(1,n-1),t):("{"===r&&"}"===s&&(r="\\{",s="\\}"),i="\\left"+r+na(e.substring(1,n-1),t)+"\\right"+s),a=e.substring(n)):(i=e.substring(1,n),a="");}else {let r=e.match(/^([a-zA-Z]+)/);if(r){let i=sa(null,e,t.inlineShortcuts);if(i)return i=i.replace("_{#?}",""),i=i.replace("^{#?}",""),{match:i,rest:e.substring(i.length)}}if(r=e.match(/^([a-zA-Z])/),r)return {match:r[1],rest:e.substring(1)};if(r=e.match(/^(-)?\d+(\.\d*)?/),r)return {match:r[0],rest:e.substring(r[0].length)};/^\\(left|right)/.test(e)||(r=e.match(/^(\\[a-zA-Z]+)/),r&&(a=e.substring(r[1].length),i=r[1]));}return {match:i,rest:a}}function ca(e,t){let i=sa(null,e,t);return i?(i=i.replace("_{#?}",""),i=i.replace("^{#?}",""),i+=" "):i=e,i}function da(e,t,i){const a=e.parent();let r="leftright"===a.type?a.leftDelim+a.rightDelim:"";if("\\lbrace\\rbrace"===r&&(r="{}"),"\\{\\}"===r&&(r="{}"),"{}"===r&&/\||\\vert|\\Vert|\\mvert|\\mid/.test(t))return ha(e,"\\,\\middle"+t+"\\, ",{mode:"math",format:"latex",style:i}),!0;"{"!==t&&"\\{"!==t||(t="\\lbrace"),"}"!==t&&"\\}"!==t||(t="\\rbrace"),"["===t&&(t="\\lbrack"),"]"===t&&(t="\\rbrack");const s=P[t];if(s&&("leftright"!==a.type||"|"!==a.leftDelim)){let a="";const r=It(e)||"placeholder"===jt(e).type;a=e.sibling(0).isFunction?"\\mleft"+t+"\\mright":"\\left"+t+"\\right",a+=r?"?":s;let o=[];return r&&(o=e.siblings().splice(e.anchorOffset()+1,e.siblings().length)),ha(e,a,{mode:"math",format:"latex",style:i}),r&&(e.sibling(0).body=o,Tt(e,-1)),!0}let o;if(Object.keys(P).forEach(e=>{t===P[e]&&(o=e);}),o){if(a&&"leftright"===a.type&&e.endOffset()===e.siblings().length-1)return wt(e),a.rightDelim=t,Tt(e,1),Mt(e),!0;const r=e.siblings();let s;for(s=e.endOffset();s>=0&&("leftright"!==r[s].type||"?"!==r[s].rightDelim);s--);if(s>=0)return wt(e),r[s].rightDelim=t,r[s].body=r[s].body.concat(r.slice(s+1,e.endOffset()+1)),r.splice(s+1,e.endOffset()-s),$t(e,s),Mt(e),!0;if(a&&"leftright"===a.type&&"?"===a.rightDelim){wt(e),a.rightDelim=t;const i=r.slice(e.endOffset()+1);return r.splice(e.endOffset()+1),e.path.pop(),e.siblings().splice(e.endOffset()+1,0,...i),Mt(e),!0}const o=e.ancestor(2);return !(!o||"leftright"!==o.type||"?"!==o.rightDelim||e.endOffset()!==r.length-1)&&(Tt(e,1),da(e,t,i))}return !1}function ma(e,t){if(It(e))return !1;function i(t,i){let a=!0;return Gt(e,e=>{a=a&&e[t]===i;},{recursive:!0}),a}return t.color&&i("color",t.color)&&(t.color="none"),t.backgroundColor&&i("backgroundColor",t.backgroundColor)&&(t.backgroundColor="none"),t.fontFamily&&i("fontFamily",t.fontFamily)&&(t.fontFamily="none"),t.series&&(t.fontSeries=t.series),t.fontSeries&&i("fontSeries",t.fontSeries)&&(t.fontSeries="auto"),t.shape&&(t.fontShape=t.shape),t.fontShape&&i("fontShape",t.fontShape)&&(t.fontShape="auto"),t.size&&(t.fontSize=t.size),t.fontSize&&i("fontSize",t.fontSize)&&(t.fontSize="size5"),wt(e),Gt(e,e=>e.applyStyle(t),{recursive:!0}),Mt(e),!0}function ha(e,t,i){var a,r,s,o;if(null!==(a=i.smartFence)&&void 0!==a&&a){if(da(e,t,i.style))return}else {const i=e.parent();if("leftright"===(null==i?void 0:i.type)&&"?"===i.rightDelim&&e.endOffset()===e.siblings().length-1&&/^[)}\]|]$/.test(t))return wt(e),i.rightDelim=t,Tt(e,1),void Mt(e)}const n=e.suppressChangeNotifications;i.suppressChangeNotifications&&(e.suppressChangeNotifications=!0),wt(e);const l=e.suppressChangeNotifications;e.suppressChangeNotifications=!0,i.insertionMode||(i.insertionMode="replaceSelection"),i.selectionMode||(i.selectionMode="placeholder"),i.format||(i.format="auto"),i.macros=null!==(r=i.macros)&&void 0!==r?r:e.options.macros;const c=i.mode||St(e);let d;const m=[Be("math",Ot(e)).toLatex(!1)],h=null!==(s=i.placeholder)&&void 0!==s?s:"\\placeholder{}";m["?"]=h,"replaceSelection"!==i.insertionMode||It(e)?"replaceAll"===i.insertionMode?(e.root.body=[],e.root.latex="",e.path=[{relation:"body",offset:0}],e.extent=0):"insertBefore"===i.insertionMode?Vt(e):"insertAfter"===i.insertionMode&&Wt(e):aa(e);const p=e.siblings(),u=e.startOffset();if(u+1<p.length&&p[u+1]&&"placeholder"===p[u+1].type?aa(e,1):u>0&&p[u]&&"placeholder"===p[u].type&&aa(e,-1),"math"===c&&"ASCIIMath"===i.format)[,t]=oa(t,{format:"ASCIIMath"}),d=st(t,"math",null,null==i?void 0:i.macros,!1,e.listeners.onError),ua(e,d);else if("text"===c||"auto"!==i.format&&"latex"!==i.format)"text"!==c&&"text"!==i.format||(d=st(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=t.replace(/\\/g,"\\textbackslash ")).replace(/#/g,"\\#")).replace(/\$/g,"\\$")).replace(/%/g,"\\%")).replace(/&/g,"\\&")).replace(/_/g,"\\_")).replace(/{/g,"\\textbraceleft ")).replace(/}/g,"\\textbraceright ")).replace(/\^/g,"\\textasciicircum ")).replace(/~/g,"\\textasciitilde ")).replace(/£/g,"\\textsterling "),"text",m,i.macros,!1,e.listeners.onError));else if("command"===c){d=[];for(const e of t)H.test(e)&&d.push(new Fe("command","command",e));}else if(""===t)d=[new Fe("command","command","\\")];else {if("auto"===i.format&&([i.format,t]=oa(t)),m[0])t=t.replace(/(^|[^\\])#@/g,"$1#0");else if(/(^|[^\\])#@/.test(t)){const i=function(e){const t=e.siblings();let i=e.startOffset();if("text"===t[i].mode)for(;i>=1&&"text"===t[i].mode;)i--;else for(;i>=1&&/^(mord|surd|msubsup|leftright|mop)$/.test(t[i].type);)i--;return i}(e);t=t.replace(/(^|[^\\])#@/g,"$1"+function(e,t,i){const a=e.siblings();if(lt(a))return "";if("first"===a[0].type&&0===t&&(t=1),"root"===e.parent().type&&1===t&&i===a.length-1)return e.parent().toLatex(!1);let r="",s=t;for(;s<=i;)r+=a[s].toLatex(!1),s++;return r}(e,i+1,e.startOffset())),function(e,t){t>0?e.siblings().splice(e.anchorOffset()+1,t):(e.siblings().splice(e.anchorOffset()+t+1,-t),$t(e,e.anchorOffset()+t));}(e,i-e.startOffset());}else t=t.replace(/(^|[^\\])#@/g,"$1#?");/^\$\$(.*)\$\$$/.test(t)&&(t=t.substring(2,t.length-2)),m[0]||(m[0]=h),d=st(t,c,m,i.macros,null!==(o=i.smartFence)&&void 0!==o&&o,e.listeners.onError),"latex"!==i.format&&ua(e,d);}dt(e),function e(t,i){t&&i&&(Oe(t)?t.forEach(t=>e(t,i)):"object"==typeof t&&(t.color||t.backgroundColor||t.fontFamily||t.fontShape||t.fontSeries||t.fontSize||(t.applyStyle(i),e(t.body,i),e(t.numer,i),e(t.denom,i),e(t.index,i),e(t.overscript,i),e(t.underscript,i),e(t.subscript,i),e(t.superscript,i))));}(d,i.style);const f=e.parent();if("latex"!==i.format&&e.options.removeExtraneousParentheses&&f&&"leftright"===f.type&&"("===f.leftDelim&&lt(f.body)&&d&&1===d.length&&"genfrac"===d[0].type?(e.path.pop(),e.siblings()[e.anchorOffset()]=d[0]):("latex"!==i.format||1!==m.length||m[0]||"root"===f.type&&lt(f.body)&&(f.latex=t),e.siblings().splice(e.anchorOffset()+1,0,...d)),e.insertFirstAtom(),e.suppressChangeNotifications=l,"placeholder"===i.selectionMode){let t=[];for(const e of d)t=t.concat(e.filter(e=>"placeholder"===e.type));0!==t.length&&At(e,1,!1)?e.announce("move"):$t(e,e.anchorOffset()+d.length);}else "before"===i.selectionMode||("after"===i.selectionMode?$t(e,e.anchorOffset()+d.length):"item"===i.selectionMode&&$t(e,e.anchorOffset(),d.length));Mt(e),e.suppressChangeNotifications=n;}function pa(e){if(e)return 1===e.length&&"leftright"===e[0].type&&"("===e[0].leftDelim&&(e=e[0].body),e}function ua(e,t){if(t&&e.options.removeExtraneousParentheses){for(let e=0;t[e];e++)if("leftright"===t[e].type&&"("===t[e].leftDelim&&Oe(t[e].body)){let i=0,a=0,r=0;for(let s=0;t[e].body[s];s++)"genfrac"===t[e].body[s].type&&(i++,a=s),"first"!==t[e].body[s].type&&r++;0===r&&1===i&&(t[e]=t[e].body[a]);}t.forEach(t=>{if("genfrac"===t.type&&(ua(e,t.numer),ua(e,t.denom),t.numer=pa(t.numer),t.denom=pa(t.denom)),t.superscript&&(ua(e,t.superscript),t.superscript=pa(t.superscript)),t.subscript&&(ua(e,t.subscript),t.subscript=pa(t.subscript)),t.underscript&&(ua(e,t.underscript),t.underscript=pa(t.underscript)),t.overscript&&(ua(e,t.overscript),t.overscript=pa(t.overscript)),t.index&&(ua(e,t.index),t.index=pa(t.index)),"surd"===t.type?(ua(e,t.body),t.body=pa(t.body)):Oe(t.body)&&ua(e,t.body),t.array)for(let i=bt(t.array);i>=0;i--)ua(e,yt(t.array,i));});}}function fa(e){if(Wt(e),!jt(e).superscript)if(jt(e).subscript)jt(e).superscript=[new Fe(e.parent().mode,"first")];else {const t=e.sibling(1);(null==t?void 0:t.superscript)?e.path[e.path.length-1].offset+=1:(null==t?void 0:t.subscript)?(e.path[e.path.length-1].offset+=1,jt(e).superscript=[new Fe(e.parent().mode,"first")]):("limits"!==jt(e).limits&&(e.siblings().splice(e.anchorOffset()+1,0,new Fe(e.parent().mode,"msubsup","​",Ct(e))),e.path[e.path.length-1].offset+=1),jt(e).superscript=[new Fe(e.parent().mode,"first")]);}return e.path.push({relation:"superscript",offset:0}),Rt(e),!0}Gi({moveToOpposite:e=>{const t={superscript:"subscript",subscript:"superscript",denom:"numer",numer:"denom"}[e.relation()];return t||fa(e),e.parent()[t]||(e.parent()[t]=[new Fe(e.parent().mode,"first")]),$t(e,0,"end",t),!0},moveBeforeParent:e=>e.path.length>1?(e.path.pop(),$t(e,e.anchorOffset()-1),!0):(e.announce("plonk"),!1),moveAfterParent:e=>Ut(e),moveToNextPlaceholder:e=>At(e,1),moveToPreviousPlaceholder:e=>At(e,-1),moveToNextChar:e=>Tt(e,1),moveToPreviousChar:e=>Tt(e,-1),moveUp:e=>Kt(e),moveDown:e=>Et(e),moveToNextWord:e=>Ft(e,1),moveToPreviousWord:e=>Ft(e,-1),moveToGroupStart:e=>$t(e,0),moveToGroupEnd:e=>$t(e,-1),moveToMathFieldStart:e=>Bt(e,-1),moveToMathFieldEnd:e=>Bt(e,1),moveToSuperscript:e=>fa(e),moveToSubscript:e=>function(e){if(Wt(e),!jt(e).subscript)if(jt(e).superscript)jt(e).subscript=[new Fe(e.parent().mode,"first")];else {const t=e.sibling(1);(null==t?void 0:t.subscript)?e.path[e.path.length-1].offset+=1:(null==t?void 0:t.superscript)?(e.path[e.path.length-1].offset+=1,jt(e).subscript=[new Fe(e.parent().mode,"first")]):("limits"!==jt(e).limits&&(e.siblings().splice(e.anchorOffset()+1,0,new Fe(e.parent().mode,"msubsup","​",Ct(e))),e.path[e.path.length-1].offset+=1),jt(e).subscript=[new Fe(e.parent().mode,"first")]);}return e.path.push({relation:"subscript",offset:0}),Rt(e),!0}(e)},{target:"model",category:"selection-anchor"}),Gi({selectGroup:e=>Rt(e),selectAll:e=>Pt(e),extendToNextChar:e=>Nt(e,1),extendToPreviousChar:e=>Nt(e,-1),extendToNextWord:e=>Ft(e,1,{extend:!0}),extendToPreviousWord:e=>Ft(e,-1,{extend:!0}),extendUp:e=>Kt(e,{extend:!0}),extendDown:e=>Et(e,{extend:!0}),extendToNextBoundary:e=>Ft(e,1,{extend:!0}),extendToPreviousBoundary:e=>Ft(e,-1,{extend:!0}),extendToGroupStart:e=>Ht(e,-e.anchorOffset()),extendToGroupEnd:e=>Ht(e,e.siblings().length-e.anchorOffset()),extendToMathFieldStart:e=>Bt(e,-1,{extend:!0}),extendToMathFieldEnd:e=>Bt(e,1,{extend:!0})},{target:"model",category:"selection-extend"}),Gi({deleteAll:e=>(Pt(e),aa(e)),deleteNextChar:e=>aa(e,1),deletePreviousChar:e=>aa(e,-1),deleteNextWord:e=>(Ft(e,1,{extend:!0}),aa(e)),deletePreviousWord:e=>(Ft(e,-1,{extend:!0}),aa(e)),deleteToGroupStart:e=>(Ht(e,-e.anchorOffset()),aa(e)),deleteToGroupEnd:e=>(Bt(e,-1,{extend:!0}),aa(e)),deleteToMathFieldStart:e=>(Bt(e,-1,{extend:!0}),aa(e)),deleteToMathFieldEnd:e=>(Bt(e,1,{extend:!0}),aa(e))},{target:"model",category:"delete"});const ga=["Backquote","Digit0","Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Minus","Equal","IntlYen","KeyQ","KeyW","KeyE","KeyR","KeyT","KeyY","KeyU","KeyI","KeyO","KeyP","BracketLeft","BracketRight","Backslash","KeyA","KeyS","KeyD","KeyF","KeyG","KeyH","KeyJ","KeyK","KeyL","Semicolon","Quote","IntlBackslash","KeyZ","KeyX","KeyC","KeyV","KeyB","KeyN","KeyM","Comma","Period","Slash","IntlRo","Space","Numpad0","Numpad1","Numpad2","Numpad3","Numpad4","Numpad5","Numpad6","Numpad7","Numpad8","Numpad9","NumpadAdd","NumpadComma","NumpadDecimal","NumpadDivide","NumpadEqual","NumpadHash","NumpadMultiply","NumpadParenLeft","NumpadParenRight","NumpadStar","NumpadSubstract"];function ya(e){return !e.ctrlKey&&!e.metaKey&&"Dead"!==e.key&&ga.indexOf(e.code)>=0}function ba(e){const t=[];return (e=function(e){if(!e.code){const t=Object.entries(ni().mapping);let i,a=!1,r=!1;for(let s=0;s<4;s++){for(const[o,n]of t)if(n[s]===e.key){i=o,3===s?(a=!0,r=!0):2===s?a=!0:1===s&&(r=!0);break}if(i)break}return new KeyboardEvent(e.type,{...e,altKey:a,shiftKey:r,code:i})}return new KeyboardEvent(e.type,e)}(e)).ctrlKey&&t.push("ctrl"),e.metaKey&&t.push("meta"),e.altKey&&t.push("alt"),e.shiftKey&&t.push("shift"),0===t.length?"["+e.code+"]":(t.push("["+e.code+"]"),t.join("+"))}function va(e){var t;if(!e)return "";let i;return "Unidentified"===e.key&&e.target&&(i=e.target.value),i=null!==(t=null!=i?i:e.key)&&void 0!==t?t:e.code,/^(Dead|Return|Enter|Tab|Escape|Delete|PageUp|PageDown|Home|End|Help|ArrowLeft|ArrowRight|ArrowUp|ArrowDown)$/.test(i)&&(i=""),i}class xa{constructor(e){this.maximumDepth=1e3,this.record=!1,this.canCoalesce=!1,this.model=e,this.reset();}reset(){this.stack=[],this.index=-1;}startRecording(){this.record=!0;}canUndo(){return this.index>0}canRedo(){return this.index!==this.stack.length-1}undo(e){this.canUndo()&&("function"==typeof(null==e?void 0:e.onUndoStateWillChange)&&e.onUndoStateWillChange(this.model.mathfield,"undo"),this.restore(this.stack[this.index-1],e),this.index-=1,e&&"function"==typeof e.onUndoStateDidChange&&e.onUndoStateDidChange(this.model.mathfield,"undo"),this.canCoalesce=!1);}redo(e){this.canRedo()&&("function"==typeof(null==e?void 0:e.onUndoStateWillChange)&&e.onUndoStateWillChange(this.model.mathfield,"redo"),this.index+=1,this.restore(this.stack[this.index],e),e&&"function"==typeof e.onUndoStateDidChange&&e.onUndoStateDidChange(this.model.mathfield,"redo"),this.canCoalesce=!1);}pop(){this.canUndo()&&(this.index-=1,this.stack.pop());}snapshot(e){this.record&&("function"==typeof(null==e?void 0:e.onUndoStateWillChange)&&e.onUndoStateWillChange(this.model.mathfield,"snapshot"),this.stack.splice(this.index+1,this.stack.length-this.index-1),this.stack.push({latex:this.model.root.toLatex(!1),selection:this.model.toString()}),this.index++,this.stack.length>this.maximumDepth&&this.stack.shift(),e&&"function"==typeof e.onUndoStateDidChange&&e.onUndoStateDidChange(this.model.mathfield,"snapshot"),this.canCoalesce=!1);}snapshotAndCoalesce(e){this.canCoalesce&&this.pop(),this.snapshot(e),this.canCoalesce=!0;}save(){return {latex:this.model.root.toLatex(!1),selection:this.model.toString()}}restore(e,t){const i=this.model.suppressChangeNotifications;void 0!==t.suppressChangeNotifications&&(this.model.suppressChangeNotifications=t.suppressChangeNotifications),ha(this.model,e?e.latex:"",{...t,format:"latex",mode:"math",insertionMode:"replaceAll",selectionMode:"after",smartFence:!1}),Zt(this.model,e?e.selection:[{relation:"body",offset:0}]),this.model.suppressChangeNotifications=i;}}const ka={"−":"-","-":"-","\\alpha":"alpha","\\beta":"beta","\\gamma":"gamma","\\delta":"delta","\\epsilon":"epsilon","\\varepsilon":"varepsilon","\\zeta":"zeta","\\eta":"eta","\\theta":"theta","\\vartheta":"vartheta","\\iota":"iota","\\kappa":"kappa","\\lambda":"lambda","\\mu":"mu","\\nu":"nu","\\xi":"xi","\\pi":"pi","\\rho":"rho","\\sigma":"sigma","\\tau":"tau","\\upsilon":"upsilon","\\phi":"phi","\\varphi":"varphi","\\chi":"chi","\\psi":"psi","\\omega":"omega","\\Gamma":"Gamma","\\Delta":"Delta","\\Theta":"Theta","\\Lambda":"Lambda","\\Xi":"Xi","\\Pi":"Pi","\\Sigma":"Sigma","\\Phi":"Phi","\\Psi":"Psi","\\Omega":"Omega"},_a={"\\pm":"+-","\\times":"xx","\\colon":":","\\vert":"|","\\Vert":"||","\\mid":"|","\\lbrace":"{","\\rbrace":"}","\\langle":"(:","\\rangle":":)"};function wa(t){if(!t)return "";if(e(t)){let e="";if(0===t.length)return "";if("first"===t[0].type&&(t=t.slice(1)),0===t.length)return "";if("text"===t[0].mode){let i=0;for(e='"';t[i]&&"text"===t[i].mode;)e+=t[i].body,i++;e+='"'+wa(t.slice(i));}else if("math"===t[0].mode){let i=0;for(;t[i]&&"math"===t[i].mode;)e+=wa(t[i]),i++;e+=wa(t.slice(i));}return e.trim()}if("text"===t.mode)return '"'+t.body+'"';let i="";const a=t.symbol;let r;switch(t.type){case"group":case"root":i=wa(t.body);break;case"array":break;case"genfrac":(t.leftDelim||t.rightDelim)&&(i+="."!==t.leftDelim&&t.leftDelim?t.leftDelim:"{:"),t.hasBarLine?(i+="(",i+=wa(t.numer),i+=")/(",i+=wa(t.denom),i+=")"):(i+="("+wa(t.numer)+"),",i+="("+wa(t.denom)+")"),(t.leftDelim||t.rightDelim)&&(i+="."!==t.rightDelim&&t.rightDelim?t.rightDelim:"{:");break;case"surd":t.index?i+="root("+wa(t.index)+")("+wa(t.body)+")":i+="sqrt("+wa(t.body)+")";break;case"leftright":i+="."!==t.leftDelim&&t.leftDelim?t.leftDelim:"{:",i+=wa(t.body),i+="."!==t.rightDelim&&t.rightDelim?t.rightDelim:":}";break;case"sizeddelim":case"delim":case"overlap":case"overunder":break;case"mord":i=ka[a]||a||("string"==typeof t.body?t.body:""),"\\"===i[0]&&(i+=""),r=a?a.match(/[{]?\\char"([0-9abcdefABCDEF]*)[}]?/):null,r?i=String.fromCharCode(parseInt("0x"+r[1])):i.length>0&&"\\"===i.charAt(0)&&(i="string"==typeof t.body?t.body.charAt(0):t.symbol);break;case"mbin":case"mrel":case"textord":case"minner":i=a&&ka[a]?ka[a]:a&&_a[a]?_a[a]:t.body;break;case"mopen":case"mclose":i+=t.body;break;case"mpunct":i=_a[a]||a;break;case"mop":"​"!==t.body&&(i="",i+="\\operatorname"===a?wa(t.body):t.body||a,i+=" ");break;case"mathstyle":case"box":case"spacing":case"enclose":break;case"space":i=" ";}if(t.subscript){i+="_";const e=wa(t.subscript);e.length>1&&!/^(-)?\d+(\.\d*)?$/.test(e)?i+="("+e+")":i+=e;}if(t.superscript){i+="^";const e=wa(t.superscript);e.length>1&&!/^(-)?\d+(\.\d*)?$/.test(e)?i+="("+e+")":i+=e;}return i}const Ma={};function za(e){const t=Ma.locale.substring(0,2);let i="";return Ma.strings[Ma.locale]&&(i=Ma.strings[Ma.locale][e]),!i&&Ma.strings[t]&&(i=Ma.strings[t][e]),i||(i=Ma.strings.en[e]),i||(i=e),i}function La(e,t,i){ct(e);const a=[],r=t.substr(i);for(const e of r){const t=new Fe("command","command",e);t.isSuggestion=!0,a.push(t);}Array.prototype.splice.apply(e.siblings(),[e.anchorOffset()+1,0].concat(a));}function Sa(e,t){if(t=t||{acceptSuggestion:!1},Li(e),t.discard)return Ai(e.model,null),e.switchMode("math"),!0;const i=Si(e.model,!t.acceptSuggestion);if(i){if("\\("===i||"\\)"===i)Ai(e.model,[]),ha(e.model,i.slice(1),{mode:e.mode});else {e.switchMode("math");const t=st(i,"math",null,e.config.macros);t?Ai(e.model,t):Ci(e.model,!0);}return e.snapshot(),e.model.announce("replacement"),!0}return !1}function Ca(e){!function(e){const t=e.siblings(),i=Lt(e);let a=i.start;for(;a<i.end&&!t[a].isSuggestion;)a++;$t(e,a-1);}(e.model),ct(e.model);const t=Si(e.model),i=re(t);if(0===i.length)Li(e),Ci(e.model,!0);else {const a=e.suggestionIndex%i.length,r=t.length-i[a].match.length;0!==r&&La(e.model,i[a].match,r),wi(e,i[a].match,i.length>1);}return ji(e),!0}Ma.plural=function(e,t,i){(i=null!=i?i:{}).type=i.type||"cardinal";const a=Ma.locale.substring(0,2),r="ordinal"===i.type?Ma._ordinal:Ma._cardinal;let s,o="ordinal"===i.type?Ma._ordinalPluralCategories.indexOf(r.select(e)):Ma._cardinalPluralCategories.indexOf(r.select(e));return Ma.strings[Ma.locale]&&(s=Ma.strings[Ma.locale][t]),!s&&Ma.strings[a]&&(s=Ma.strings[a][t]),s||(s=Ma.strings.en[t],s||(s=t),o="ordinal"===i.type?Ma._ordinalPluralCategories.indexOf(Ma._ordinalEnglish.select(e)):Ma._cardinalPluralCategories.indexOf(Ma._cardinalEnglish.select(e))),s.split(";")[o]||s.split(";")[0]},Ma.merge=function(e,t){if(e&&t){const i=Ma._locale;Ma.locale=e,Ma.strings[e]={...Ma.strings[e],...t},Ma.locale=i;}else e&&!t&&Object.keys(e).forEach(t=>Ma.merge(t,e[t]));},Object.defineProperty(Ma,"locale",{set(e){Ma._locale=e,Ma._ordinal=null,Ma._cardinal=null;},get(){var e;return Ma._locale||(Ma._locale=null!==(e=null===navigator||void 0===navigator?void 0:navigator.language.slice(0,5))&&void 0!==e?e:"en"),Ma._locale}}),Object.defineProperty(Ma,"ordinal",{get:()=>(Ma._ordinal||(Ma._ordinalEnglish=new Intl.PluralRules("en",{type:"ordinal"}),Ma._ordinalEnglishPluralCategories=Ma._ordinalEnglish.resolvedOptions().pluralCategories,Ma._ordinal=new Intl.PluralRules(Ma.locale,{type:"ordinal"}),Ma._ordinalPluralCategories=Ma._ordinal.resolvedOptions().pluralCategories),Ma._ordinal)}),Object.defineProperty(Ma,"cardinal",{get:()=>(Ma._cardinal||(Ma._cardinalEnglish=new Intl.PluralRules("en",{type:"cardinal"}),Ma._cardinalEnglishPluralCategories=Ma._cardinalEnglish.resolvedOptions().pluralCategories,Ma._cardinal=new Intl.PluralRules(Ma.locale,{type:"cardinal"}),Ma._cardinalPluralCategories=Ma._ordinal.resolvedOptions().pluralCategories),Ma._cardinal)}),Ma.strings={en:{"keyboard.tooltip.functions":"Functions","keyboard.tooltip.symbols":"Symbols","keyboard.tooltip.greek":"Greek Letters","keyboard.tooltip.command":"LaTeX Command Mode","keyboard.tooltip.numeric":"Numeric","keyboard.tooltip.roman":"Roman Letters","tooltip.copy to clipboard":"Copy to Clipboard","tooltip.redo":"Redo","tooltip.toggle virtual keyboard":"Toggle Virtual Keyboard","tooltip.undo":"Undo"},ar:{"keyboard.tooltip.functions":"مهام","keyboard.tooltip.symbols":"حرف او رمز","keyboard.tooltip.greek":"حروف يونانية","keyboard.tooltip.command":"حالة تلقي الأوامر اللاتك","keyboard.tooltip.numeric":"الرقمية","keyboard.tooltip.roman":"رموز الاحرف الرومانية","tooltip.copy to clipboard":"نسخ إلى الحافظة","tooltip.redo":"الإعادة","tooltip.toggle virtual keyboard":"تبديل لوحة المفاتيح الإفتراضية","tooltip.undo":"إلغاء"},de:{"keyboard.tooltip.functions":"Funktionen","keyboard.tooltip.symbols":"Symbole","keyboard.tooltip.greek":"Griechische Buchstaben","keyboard.tooltip.command":"LaTeX-Befehlsmodus","keyboard.tooltip.numeric":"Numerisch","keyboard.tooltip.roman":"Römische Buchstaben","tooltip.copy to clipboard":"In die Zwischenablage kopieren","tooltip.redo":"Wiederholen","tooltip.toggle virtual keyboard":"Virtuelle Tastatur umschalten","tooltip.undo":"Widerrufen"},el:{"keyboard.tooltip.functions":"συναρτήσεις","keyboard.tooltip.symbols":"σύμβολα","keyboard.tooltip.greek":"ελληνικά γράμματα","keyboard.tooltip.command":"Λειτουργία εντολών LaTeX","keyboard.tooltip.numeric":"Αριθμητικός","keyboard.tooltip.roman":"Ρωμαϊκά γράμματα","tooltip.copy to clipboard":"Αντιγραφή στο πρόχειρο","tooltip.redo":"Ξανακάνω","tooltip.toggle virtual keyboard":"Εναλλαγή εικονικού πληκτρολογίου","tooltip.undo":"Ξεκάνω"},es:{"keyboard.tooltip.functions":"Funciones","keyboard.tooltip.symbols":"Símbolos","keyboard.tooltip.greek":"Letras griegas","keyboard.tooltip.command":"Modo Comando LaTeX","keyboard.tooltip.numeric":"Numérico","keyboard.tooltip.roman":"Letras romanas","tooltip.copy to clipboard":"Copiar al portapapeles","tooltip.redo":"Rehacer","tooltip.toggle virtual keyboard":"Alternar teclado virtual","tooltip.undo":"Deshacer"},fa:{"keyboard.tooltip.functions":"توابع","keyboard.tooltip.symbols":"نمادها","keyboard.tooltip.greek":"حروف یونانی","keyboard.tooltip.command":"حالت دستور لاتک","keyboard.tooltip.numeric":"عددی","keyboard.tooltip.roman":"حروف رومی","tooltip.copy to clipboard":"کپی به کلیپبورد","tooltip.redo":"بازگشت به بعد","tooltip.toggle virtual keyboard":"نمایش/نهفتن کیبورد مجازی","tooltip.undo":"بازگشت به قبل"},fr:{"keyboard.tooltip.functions":"Fonctions","keyboard.tooltip.symbols":"Symboles","keyboard.tooltip.greek":"Lettres grecques","keyboard.tooltip.command":"Mode de commandes LaTeX","keyboard.tooltip.numeric":"Numérique","keyboard.tooltip.roman":"Lettres romaines","tooltip.copy to clipboard":"Copier dans le presse-papiers","tooltip.redo":"Rétablir","tooltip.toggle virtual keyboard":"Afficher/Masquer le clavier virtuel","tooltip.undo":"Annuler"},it:{"keyboard.tooltip.functions":"Funzioni","keyboard.tooltip.symbols":"Simboli","keyboard.tooltip.greek":"Lettere greche","keyboard.tooltip.command":"Modalità di comando LaTeX","keyboard.tooltip.numeric":"Numerico","keyboard.tooltip.roman":"Lettere romane","tooltip.copy to clipboard":"Copia negli appunti","tooltip.redo":"Rifare","tooltip.toggle virtual keyboard":"Attiva / disattiva la tastiera virtuale","tooltip.undo":"Disfare"},ja:{"keyboard.tooltip.functions":"関数","keyboard.tooltip.symbols":"シンボル","keyboard.tooltip.greek":"ギリシャ文字","keyboard.tooltip.command":"LaTeXコマンドモード","keyboard.tooltip.numeric":"数値","keyboard.tooltip.roman":"ローマ字","tooltip.copy to clipboard":"クリップボードにコピー","tooltip.redo":"やり直し","tooltip.toggle virtual keyboard":"仮想キーボードの切り替え","tooltip.undo":"元に戻す"},pl:{"keyboard.tooltip.functions":"Funkcje","keyboard.tooltip.symbols":"Symbolika","keyboard.tooltip.greek":"Litery greckie","keyboard.tooltip.command":"Tryb poleceń LaTeX","keyboard.tooltip.numeric":"Numeryczne","keyboard.tooltip.roman":"Litery rzymskie","tooltip.copy to clipboard":"Kopiuj do Schowka","tooltip.redo":"Przywróć","tooltip.toggle virtual keyboard":"Przełącz wirtualną klawiaturę","tooltip.undo":"Cofnij"},ru:{"keyboard.tooltip.functions":"Функции","keyboard.tooltip.symbols":"Символы","keyboard.tooltip.greek":"Греческие буквы","keyboard.tooltip.command":"Режим командной строки LaTeX","keyboard.tooltip.numeric":"числовой","keyboard.tooltip.roman":"Латинские буквы","tooltip.copy to clipboard":"Скопировать в буфер обмена","tooltip.redo":"переделывать","tooltip.toggle virtual keyboard":"Переключить виртуальную клавиатуру","tooltip.undo":"расстегивать"}},Gi({complete:Sa,nextSuggestion:function(e){return e.suggestionIndex+=1,Ca(e),!1},previousSuggestion:function(e){if(e.suggestionIndex-=1,e.suggestionIndex<0){ct(e.model);const t=re(Si(e.model));e.suggestionIndex=t.length-1;}return Ca(e),!1}},{target:"mathfield",category:"autocomplete"});const Aa={"\\alpha":"alpha ","\\mu":"mew ","\\sigma":"sigma ","\\pi":"pie ","\\imaginaryI":"eye ","\\sum":"Summation ","\\prod":"Product ",a:'<phoneme alphabet="ipa" ph="eɪ">a</phoneme>',A:'capital <phoneme alphabet="ipa" ph="eɪ">A</phoneme>',"+":"plus ","-":"minus ",";":'<break time="150ms"/> semi-colon <break time="150ms"/>',",":'<break time="150ms"/> comma  <break time="150ms"/>',"|":'<break time="150ms"/>Vertical bar<break time="150ms"/>',"(":'<break time="150ms"/>Open paren. <break time="150ms"/>',")":'<break time="150ms"/> Close paren. <break time="150ms"/>',"=":"equals ","<":"is less than ","\\lt":"is less than ","<=":"is less than or equal to ","\\le":"is less than or equal to ","\\gt":"is greater than ",">":"is greater than ","\\ge":"is greater than or equal to ","\\geq":"is greater than or equal to ","\\leq":"is less than or equal to ","!":"factorial ","\\sin":"sine ","\\cos":"cosine ","​":"","−":"minus ",":":'<break time="150ms"/> such that <break time="200ms"/> ',"\\colon":'<break time="150ms"/> such that <break time="200ms"/> ',"\\hbar":"etch bar ","\\iff":'<break time="200ms"/>if, and only if, <break time="200ms"/>',"\\Longleftrightarrow":'<break time="200ms"/>if, and only if, <break time="200ms"/>',"\\land":"and ","\\lor":"or ","\\neg":"not ","\\div":"divided by ","\\forall":"for all ","\\exists":"there exists ","\\nexists":"there does not exists ","\\in":"element of ","\\N":'the set <break time="150ms"/><say-as interpret-as="character">n</say-as>',"\\C":'the set <break time="150ms"/><say-as interpret-as="character">c</say-as>',"\\Z":'the set <break time="150ms"/><say-as interpret-as="character">z</say-as>',"\\Q":'the set <break time="150ms"/><say-as interpret-as="character">q</say-as>',"\\infty":"infinity ","\\nabla":"nabla ","\\partial":"partial derivative of ","\\cdots":"dot dot dot ","\\Rightarrow":"implies ","\\lbrace":'<break time="150ms"/>open brace<break time="150ms"/>',"\\{":'<break time="150ms"/>open brace<break time="150ms"/>',"\\rbrace":'<break time="150ms"/>close brace<break time="150ms"/>',"\\}":'<break time="150ms"/>close brace<break time="150ms"/>',"\\langle":'<break time="150ms"/>left angle bracket<break time="150ms"/>',"\\rangle":'<break time="150ms"/>right angle bracket<break time="150ms"/>',"\\lfloor":'<break time="150ms"/>open floor<break time="150ms"/>',"\\rfloor":'<break time="150ms"/>close floor<break time="150ms"/>',"\\lceil":'<break time="150ms"/>open ceiling<break time="150ms"/>',"\\rceil":'<break time="150ms"/>close ceiling<break time="150ms"/>',"\\vert":'<break time="150ms"/>vertical bar<break time="150ms"/>',"\\mvert":'<break time="150ms"/>divides<break time="150ms"/>',"\\lvert":'<break time="150ms"/>left vertical bar<break time="150ms"/>',"\\rvert":'<break time="150ms"/>right vertical bar<break time="150ms"/>',"\\lbrack":'<break time="150ms"/> open square bracket <break time="150ms"/>',"\\rbrack":'<break time="150ms"/> close square bracket <break time="150ms"/>',mm:"millimeters",cm:"centimeters",km:"kilometers",kg:"kilograms"};function $a(e){let t=0;if(Oe(e))for(const i of e)"first"!==i.type&&(t+=1);return 1===t}function Da(e){let t="";if(Oe(e))for(const i of e)"first"!==i.type&&"string"==typeof i.body&&(t+=i.body);return t}function qa(e,t){var i;const a={...t,textToSpeechRulesOptions:{...t.textToSpeechRulesOptions}};if(window.sre&&"sre"===a.textToSpeechRules){const t=Vi(e,a);return t?(a.textToSpeechMarkup&&(a.textToSpeechRulesOptions=null!==(i=a.textToSpeechRulesOptions)&&void 0!==i?i:{},a.textToSpeechRulesOptions.markup=a.textToSpeechMarkup,"ssml"===a.textToSpeechRulesOptions.markup&&(a.textToSpeechRulesOptions.markup="ssml_step"),a.textToSpeechRulesOptions.rate=a.speechEngineRate),a.textToSpeechRulesOptions&&window.sre.System.getInstance().setupEngine(a.textToSpeechRulesOptions),window.sre.System.getInstance().toSpeech(t)):""}let r=function e(t,i,a){function r(e){return "<emphasis>"+e+"</emphasis>"}if(!i)return "";let s="";if(Oe(i)){let o=!1,n=!1;for(let l=0;l<i.length;l++)"text"!==i[l].mode&&(n=!1),l<i.length-2&&"mopen"===i[l].type&&"mclose"===i[l+2].type&&"mord"===i[l+1].type?(s+=" of ",s+=r(e(t,i[l+1],a)),l+=2):"text"===i[l].mode?n?s+=i[l].body?i[l].body:" ":(n=!0,s+=e("text",i[l],a)):"mord"===i[l].type&&/[0123456789,.]/.test(i[l].body)?o?s+=i[l].body:(o=!0,s+=e(t,i[l],a)):(o=!1,s+=e(t,i[l],a));}else if("text"===i.mode)i.id&&"math"===t&&(s+='<mark name="'+i.id.toString()+'"/>'),s+=i.body;else {i.id&&"math"===t&&(s+='<mark name="'+i.id.toString()+'"/>');let o="",n="",l="",c=!1;switch(i.type){case"group":case"root":s+=e("math",i.body,a);break;case"genfrac":if(o=e("math",i.numer,a),n=e("math",i.denom,a),$a(i.numer)&&$a(i.denom)){const e={"1/2":" half ","1/3":" one third ","2/3":" two third","1/4":" one quarter ","3/4":" three quarter ","1/5":" one fifth ","2/5":" two fifths ","3/5":" three fifths ","4/5":" four fifths ","1/6":" one sixth ","5/6":" five sixths ","1/8":" one eight ","3/8":" three eights ","5/8":" five eights ","7/8":" seven eights ","1/9":" one ninth ","2/9":" two ninths ","4/9":" four ninths ","5/9":" five ninths ","7/9":" seven ninths ","8/9":" eight ninths "}[Da(i.numer)+"/"+Da(i.denom)];e?s=e:s+=o+" over "+n;}else s+=' the fraction <break time="150ms"/>'+o+', over <break time="150ms"/>'+n+'.<break time="150ms"/> End fraction.<break time="150ms"/>';break;case"surd":if(l=e("math",i.body,a),i.index){let t=e("math",i.index,a);t=t.trim();const r=t.replace(/<mark([^/]*)\/>/g,"");s+="3"===r?' the cube root of <break time="200ms"/>'+l+'. <break time="200ms"/> End cube root':"n"===r?' the nth root of <break time="200ms"/>'+l+'. <break time="200ms"/> End root':' the root with index: <break time="200ms"/>'+t+', of <break time="200ms"/>'+l+'. <break time="200ms"/> End root';}else $a(i.body)?s+=" the square root of "+l+" , ":s+=' the square root of <break time="200ms"/>'+l+'. <break time="200ms"/> End square root';break;case"leftright":s+=Aa[i.leftDelim]||i.leftDelim,s+=e("math",i.body,a),s+=Aa[i.rightDelim]||i.rightDelim;break;case"rule":case"overunder":case"overlap":break;case"placeholder":s+="placeholder "+i.body;break;case"delim":case"sizeddelim":case"mord":case"minner":case"mbin":case"mrel":case"mpunct":case"mopen":case"mclose":case"textord":{const r=i.symbol;if("\\mathbin"===r||"\\mathrel"===r||"\\mathopen"===r||"\\mathclose"===r||"\\mathpunct"===r||"\\mathord"===r||"\\mathinner"===r){s=e(t,i.body,a);break}let o=i.body,n=i.symbol;if("delim"!==i.type&&"sizeddelim"!==i.type||(o=n=i.delim),"text"===t)s+=o;else {if("mbin"===i.type&&(s+='<break time="150ms"/>'),o){const e=Aa[o]||(n?Aa[n.trim()]:"");if(e)s+=" "+e;else {const e=n?function(e){let t="";return "\\"===e.charAt(0)&&(t=" "+e.replace("\\","")+" "),t}(n.trim()):"";s+=e||function(e){let t="";return a.textToSpeechMarkup?/[a-z]/.test(e)?t+=' <say-as interpret-as="character">'+e+"</say-as>":/[A-Z]/.test(e)?t+="capital "+e.toLowerCase():t+=e:/[a-z]/.test(e)?t+=" '"+e.toUpperCase()+"'":/[A-Z]/.test(e)?t+=" 'capital "+e.toUpperCase()+"'":t+=e,t}(o);}}else s+=e("math",i.body,a);"mbin"===i.type&&(s+='<break time="150ms"/>');}break}case"mop":if("​"!==i.body){const t=i.symbol;if("\\sum"===t)if(i.superscript&&i.subscript){let t=e("math",i.superscript,a);t=t.trim();let r=e("math",i.subscript,a);r=r.trim(),s+=' the summation from <break time="200ms"/>'+r+'<break time="200ms"/> to  <break time="200ms"/>'+t+'<break time="200ms"/> of <break time="150ms"/>',c=!0;}else if(i.subscript){let t=e("math",i.subscript,a);t=t.trim(),s+=' the summation from <break time="200ms"/>'+t+'<break time="200ms"/> of <break time="150ms"/>',c=!0;}else s+=" the summation of";else if("\\prod"===t)if(i.superscript&&i.subscript){let t=e("math",i.superscript,a);t=t.trim();let r=e("math",i.subscript,a);r=r.trim(),s+=' the product from <break time="200ms"/>'+r+'<break time="200ms"/> to <break time="200ms"/>'+t+'<break time="200ms"/> of <break time="150ms"/>',c=!0;}else if(i.subscript){let t=e("math",i.subscript,a);t=t.trim(),s+=' the product from <break time="200ms"/>'+t+'<break time="200ms"/> of <break time="150ms"/>',c=!0;}else s+=" the product  of ";else if("\\int"===t)if(i.superscript&&i.subscript){let t=e("math",i.superscript,a);t=t.trim();let o=e("math",i.subscript,a);o=o.trim(),s+=' the integral from <break time="200ms"/>'+r(o)+'<break time="200ms"/> to <break time="200ms"/>'+r(t)+' <break time="200ms"/> of ',c=!0;}else s+=' the integral of <break time="200ms"/> ';else "string"==typeof i.body?s+=Aa[i.body]||Aa[i.symbol]||" "+i.body:i.symbol&&("\\"===i.symbol[0]?s+=" "+i.symbol.substr(1):s+=" "+i.symbol);}break;case"enclose":l=e("math",i.body,a),$a(i.body)?s+=" crossed out "+l+" , ":s+=" crossed out "+l+". End cross out";}if(!c&&i.superscript){let r=e(t,i.superscript,a);r=r.trim();const o=r.replace(/<[^>]*>/g,"");if($a(i.superscript)){if("math"===t){const e=function(e){if(Oe(e))for(const t of e)if("first"!==t.type&&t.id)return t.id.toString();return ""}(i.superscript);e&&(s+='<mark name="'+e+'"/>');}"′"===o?s+=" prime ":"2"===o?s+=" squared ":"3"===o?s+=" cubed ":isNaN(parseInt(o))?s+=" to the "+r+"; ":s+=' to the <say-as interpret-as="ordinal">'+o+"</say-as> power; ";}else isNaN(parseInt(o))?s+=" raised to the "+r+"; ":s+=' raised to the <say-as interpret-as="ordinal">'+o+"</say-as> power; ";}if(!c&&i.subscript){let t=e("math",i.subscript,a);t=t.trim(),$a(i.subscript)?s+=" sub "+t:s+=" subscript "+t+". End subscript. ";}}return s}("math",e,a);if("ssml"===a.textToSpeechMarkup){let e="";a.speechEngineRate&&(e='<prosody rate="'+a.speechEngineRate+'">'),r='<?xml version="1.0"?><speak version="1.1" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US"><amazon:auto-breaths>'+e+"<p><s>"+r+"</s></p>"+(e?"</prosody>":"")+"</amazon:auto-breaths></speak>";}else r="mac"===a.textToSpeechMarkup&&"mac"===function(e){let t="other";return (null===navigator||void 0===navigator?void 0:navigator.platform)&&(null===navigator||void 0===navigator?void 0:navigator.userAgent)&&(/^(mac)/i.test(navigator.platform)?t="mac":/^(win)/i.test(navigator.platform)?t="win":/(android)/i.test(navigator.userAgent)?t="android":/(iphone)/i.test(navigator.userAgent)||/(ipod)/i.test(navigator.userAgent)||/(ipad)/i.test(navigator.userAgent)?t="ios":/\bCrOS\b/i.test(navigator.userAgent)&&(t="chromeos")),"mac"===t?"mac":"!mac"}()?r.replace(/<mark([^/]*)\/>/g,"").replace(/<emphasis>/g,"[[emph+]]").replace(/<\/emphasis>/g,"").replace(/<break time="([0-9]*)ms"\/>/g,"[[slc $1]]").replace(/<say-as[^>]*>/g,"").replace(/<\/say-as>/g,""):r.replace(/<[^>]*>/g,"").replace(/\s{2,}/g," ");return r}function Ta(e,t,i){return t+qa(i,{...e,textToSpeechMarkup:"",textToSpeechRulesOptions:{...e.textToSpeechRulesOptions,markup:"none"}})}function Ka(e,t){if(!t&&window&&window.mathlive&&(t=window.mathlive.config),(t=null!=t?t:{}).speechEngine&&"local"!==t.speechEngine)if("amazon"===t.speechEngine){if(window&&window.AWS){const i=new window.AWS.Polly({apiVersion:"2016-06-10"}),a={OutputFormat:"mp3",VoiceId:t.speechEngineVoice,Engine:["Amy","Emma","Brian","Ivy","Joanna","Kendra","Kimberly","Salli","Joey","Justin","Matthew"].includes(t.speechEngineVoice)?"neural":"standard",Text:e,TextType:"ssml"};i.synthesizeSpeech(a,(function(e,t){if(e);else if(null==t?void 0:t.AudioStream){const e=new Uint8Array(t.AudioStream),i=new Blob([e.buffer],{type:"audio/mpeg"}),a=URL.createObjectURL(i);new Audio(a).play().catch(e=>{});}}));}}else t.speechEngine;else {const t=new SpeechSynthesisUtterance(e);window&&window.speechSynthesis.speak(t);}}function Ea(e,t,i,a){let r="";"plonk"===t?(e.plonkSound&&(e.plonkSound.load(),e.plonkSound.play().catch(e=>{})),e.resetKeystrokeBuffer()):"delete"===t?r=Ta(e.config,"deleted: ",a):"focus"===t||/move/.test(t)?r=(It(e.model)?"":"selected: ")+function(e,t){function i(e,t){return "body"===t.relation?{enclose:"cross out",leftright:"fence",surd:"square root",root:"math field"}[e.type]:{numer:"numerator",denom:"denominator",index:"index",body:"parent",subscript:"subscript",superscript:"superscript"}[t.relation]}const a=t?t.path:[],r=e.model.path,s=r[r.length-1];let o="";for(;a.length>r.length;)o+="out of "+i(t.parent(),a[a.length-1])+"; ",a.pop();if(!It(e.model))return Ta(e.config,"",Ot(e.model));const n=i(e.model.parent(),s);0===s.offset&&(o+=(n?"start of "+n:"unknown")+": ");const l=e.model.sibling(Math.max(1,e.model.extent));return l?o+=Ta(e.config,"",l):0!==s.offset&&(o+=n?"end of "+n:"unknown"),o}(e,i):"replacement"===t?r=Ta(e.config,"",e.model.sibling(0)):"line"===t?(r=Ta(e.config,"",e.model.root),e.accessibleNode.innerHTML=e.config.createHTML('<math xmlns="http://www.w3.org/1998/Math/MathML">'+Vi(e.model.root,e.config)+"</math>"),e.textarea.setAttribute("aria-label","after: "+r)):r=a?Ta(e.config,t+" ",a):t;const s=/\u00a0/.test(e.ariaLiveText.textContent)?"   ":"   ";e.ariaLiveText.textContent=r+s;}Gi({speak:(e,t,i)=>function(e,t,i){i=null!=i?i:{withHighlighting:!1};const a=function(e,t){let i=null;switch(t){case"all":i=e.model.root;break;case"selection":It(e.model)||(i=Ot(e.model));break;case"left":{const t=e.model.siblings(),a=e.model.startOffset();if(a>=1){i=[];for(let e=1;e<=a;e++)i.push(t[e]);}break}case"right":{const t=e.model.siblings(),a=e.model.endOffset()+1;if(a<=t.length-1){i=[];for(let e=a;e<=t.length-1;e++)i.push(t[e]);}break}case"group":i=e.model.siblings();break;case"parent":{const t=e.model.parent();t&&"root"!==t.type&&(i=e.model.parent());break}}return i}(e,t);if(null===a)return e.config.speakHook(function(e){let t="";switch(e){case"all":break;case"selection":t="no selection";break;case"left":t="at start";break;case"right":t="at end";break;case"group":break;case"parent":t="no parent";}return t}(t),e.config),!1;const r={...e.config};(i.withHighlighting||"amazon"===r.speechEngine)&&(r.textToSpeechMarkup=window.sre&&"sre"===r.textToSpeechRules?"ssml_step":"ssml");const s=qa(a,r);return i.withHighlighting?(window.mathlive.readAloudMathField=e,Xi(e,{forHighlighting:!0}),e.config.readAloudHook&&e.config.readAloudHook(e.field,s,e.config)):e.config.speakHook&&e.config.speakHook(s,r),!1}(e,t,i)},{target:"mathfield",category:"speech"});const Na=()=>{};function Fa(e){if("string"==typeof e){const t=new Audio;return t.preload="none",t.src=e,t.volume=.5,t}return e}function Ba(e){e instanceof HTMLAudioElement&&(e.pause(),e.removeAttribute("src"),e.load());}function Oa(t,i){const a=Ra(t,Object.keys(t));return Object.keys(i).forEach(t=>{var r;switch(t){case"scriptDepth":if(e(i.scriptDepth))a.scriptDepth=[i.scriptDepth[0],i.scriptDepth[1]];else {if("number"!=typeof i.scriptDepth)throw Error("Unexpected value for scriptDepth");a.scriptDepth=[i.scriptDepth,i.scriptDepth];}break;case"namespace":if(!/^[a-z]*[-]?$/.test(i.namespace))throw Error("namespace must be a string of lowercase characters only");/-$/.test(i.namespace)?a.namespace=i.namespace:a.namespace=i.namespace+"-";break;case"locale":a.locale="auto"===i.locale?Ma.locale:i.locale;break;case"strings":Ma.merge(i.strings);break;case"virtualKeyboardLayout":"auto"===i.virtualKeyboardLayout?a.virtualKeyboardLayout={fr:"azerty",be:"azerty",al:"qwertz",ba:"qwertz",cz:"qwertz",de:"qwertz",hu:"qwertz",sk:"qwertz",ch:"qwertz"}[Ma.locale.substring(0,2)]||"qwerty":a.virtualKeyboardLayout=i.virtualKeyboardLayout;break;case"virtualKeyboardMode":{const e=null===(r=window.matchMedia)||void 0===r?void 0:r.call(window,"(any-pointer: coarse)").matches;"auto"===i.virtualKeyboardMode?a.virtualKeyboardMode=e?"onfocus":"off":a.virtualKeyboardMode=i.virtualKeyboardMode;}break;case"letterShapeStyle":"auto"===i.letterShapeStyle?"fr"===Ma.locale.substring(0,2)?a.letterShapeStyle="french":a.letterShapeStyle="tex":a.letterShapeStyle=i.letterShapeStyle;break;case"plonkSound":Ba(a.plonkSound),a.plonkSound=Fa(i.plonkSound);break;case"keypressSound":if(Ba(a.keypressSound),"string"==typeof i.keypressSound){const e=Fa(i.keypressSound);a.keypressSound={delete:e,return:e,spacebar:e,default:e};}else if(i.keypressSound instanceof HTMLAudioElement)a.keypressSound={delete:i.keypressSound,return:i.keypressSound,spacebar:i.keypressSound,default:i.keypressSound};else {if(!i.keypressSound.default)throw Error("Missing keypressSound.default");a.keypressSound={...i.keypressSound},a.keypressSound.return||(a.keypressSound.return=i.keypressSound.default),a.keypressSound.spacebar||(a.keypressSound.spacebar=i.keypressSound.default),a.keypressSound.delete||(a.keypressSound.delete=i.keypressSound.default);}break;case"onBlur":case"onFocus":case"onContentWillChange":case"onContentDidChange":case"onSelectionWillChange":case"onSelectionDidChange":case"onUndoStateWillChange":case"onUndoStateDidChange":case"onModeChange":case"onVirtualKeyboardToggle":case"onReadAloudStatus":case"onError":if(null===i[t])a[t]=Na;else if("function"!=typeof i[t])throw Error(t+" must be a function or null");a[t]=i[t];break;default:e(i[t])?a[t]=[...i[t]]:"object"==typeof i[t]?a[t]={...i[t]}:a[t]=i[t];}}),void 0!==i.overrideDefaultInlineShortcuts&&(i.overrideDefaultInlineShortcuts?a.inlineShortcuts=i.inlineShortcuts:a.inlineShortcuts={...ra,...i.inlineShortcuts}),a}function Ra(t,i){let a;a="string"==typeof i?[i]:void 0===i?Object.keys(t):i;const r={};return a.forEach(i=>{e(r[i])?r[i]=[...r[i]]:"object"==typeof r[i]?r[i]={...r[i]}:r[i]=t[i];}),"string"==typeof i?r[i]:r}function Pa(e,t,i){"function"==typeof t&&(i=t,t=1/0),void 0===t&&(t=1/0);let a=0,r=!1;for(wt(e.model);!r;){const s=e.model.sibling(a);r=0===t||!s||"math"!==s.mode||!(/mord|textord|mpunct/.test(s.type)||"mop"===s.type&&/[a-zA-Z]+/.test(s.body))||!!s.superscript||!!s.subscript||i&&!i(s),r||(s.applyStyle({mode:"text"}),s.symbol=s.body,s.latex=""),a-=1,t-=1;}Mt(e.model);}function Ia(e,t,i){"function"==typeof t&&(i=t,t=1/0),void 0===t&&(t=1/0),wt(e.model);let a=0,r=!1;for(;!r;){const s=e.model.sibling(a);r=0===t||!s||"text"!==s.mode||" "===s.body||i&&!i(s),r||s.applyStyle({mode:"math"}),a-=1,t-=1;}Ha(e),Mt(e.model);}function Ha(e){let t=0;for(;e.model.sibling(t)&&"math"===e.model.sibling(t).mode;)t-=1;if(e.model.sibling(t)&&"text"===e.model.sibling(t).mode&&" "===e.model.sibling(t).body&&(!e.model.sibling(t-1)||"math"===e.model.sibling(t-1).mode)){wt(e.model),e.model.siblings().splice(t-1,1),Mt(e.model);const i=e.model.suppressChangeNotifications;e.model.suppressChangeNotifications=!0,$t(e.model,e.model.anchorOffset()-1),e.model.suppressChangeNotifications=i;}}function Wa(e,t,i){!function(e){const t=e.shiftKey&&e.altKey?3:e.altKey?2:e.shiftKey?1:0;if("Unidentified"===e.key)return;if("Dead"===e.key)return;const i=ii.filter(i=>{var a;return (null===(a=i.mapping[e.code])||void 0===a?void 0:a[t])===e.key});0!==i.length&&(i.forEach(e=>{e.score+=1;}),ii.sort((e,t)=>t.score-e.score));}(i);const a=ni();if(e.keyboardLayout!==a.id&&(e.keyboardLayout=a.id,e.keybindings=pi(e.config.keybindings,t=>{"function"==typeof e.config.onError&&e.config.onError({code:"invalid-keybinding",arg:t.join("\n")});})),function(e,t){const i=e.keystrokeCaption;if(i&&e.keystrokeCaptionVisible){const a=e.element.getBoundingClientRect();i.style.left=a.left+"px",i.style.top=a.top-64+"px",i.innerHTML=e.config.createHTML("<span>"+(hi(t)||t)+"</span>"+i.innerHTML),i.style.visibility="visible",setTimeout((function(){i.childNodes.length>0&&i.removeChild(i.childNodes[i.childNodes.length-1]),0===i.childNodes.length&&(i.style.visibility="hidden");}),3e3);}}(e,t),clearTimeout(e.keystrokeBufferResetTimer),e.config.onKeystroke&&!e.config.onKeystroke(e,t,i))return (null==i?void 0:i.preventDefault)&&(i.preventDefault(),i.stopPropagation()),!1;let r,s,o,n=!1;if("command"!==e.mode&&(!i||!i.ctrlKey&&!i.metaKey))if(ya(i)){const t=va(i),a=e.keystrokeBuffer+t;let o=0;for(;!r&&o<a.length;){let t;if(e.keystrokeBufferStates[o]){const i=new xt;i.root=Be("math",st(e.keystrokeBufferStates[o].latex,e.config.defaultMode,null,e.config.macros)),Zt(i,e.keystrokeBufferStates[o].selection),t=i.siblings();}else t=e.model.siblings();r=sa(t,a.slice(o),e.config.inlineShortcuts),o+=1;}s=o-1,e.keystrokeBuffer+=t,e.keystrokeBufferStates.push(e.getUndoRecord()),function(e,t){const i=[],a=t.overrideDefaultInlineShortcuts;for(let r=0;r<=e.length-1;r++){const s=e.substring(r);a||Object.keys(ra).forEach(e=>{e.startsWith(s)&&!i.includes(e)&&i.push(e);});const o=(null==t?void 0:t.inlineShortcuts)?t.inlineShortcuts:null;o&&Object.keys(o).forEach(e=>{e.startsWith(s)&&i.push(e);});}return i}(a,e.config).length<=1?n=!0:e.config.inlineShortcutTimeout&&(e.keystrokeBufferResetTimer=setTimeout(()=>{e.resetKeystrokeBuffer();},e.config.inlineShortcutTimeout));}else e.resetKeystrokeBuffer();if(e.config.smartMode){const a=e.mode;r?e.mode="math":function(e,t,i){if(e.smartModeSuppressed)return !1;if(e.model.endOffset()<e.model.siblings().length-1)return !1;if(!i||!ya(i))return !1;const a=va(i);if(!It(e.model))return !("text"!==e.mode||!/[/_^]/.test(a));const r=function(e){let t="",i=0,a=!1;for(;!a;){const r=e.model.sibling(i);a=!(r&&("text"===r.mode&&!r.type||"math"===r.mode&&/mord|textord|mpunct/.test(r.type))),a||(t=r.body+t),i-=1;}return t}(e)+a;if("text"===e.mode){if("Esc"===t||/[/\\]/.test(a))return !0;if(/[\^_]/.test(a))return /(^|\s)[a-zA-Z][^_]$/.test(r)&&Ia(e,1),!0;const i={")":"(","}":"{","]":"["}[a];if(i&&e.model.parent()&&"leftright"===e.model.parent().type&&e.model.parent().leftDelim===i)return !0;if(/(^|[^a-zA-Z])(a|I)[ ]$/.test(r))return !1;if(/[$€£₤₺¥¤฿¢₡₧₨₹₩₱]/u.test(a))return !0;if(/(^|[^a-zA-Z'’])[a-zA-Z][ ]$/.test(r))return Ia(e,1),!1;if(/[^0-9]\.[^0-9\s]$/.test(r)){Ia(e,1);const t=e.model.sibling(0);return t.body="⋅",t.variant="normal",t.symbol="\\cdot",t.latex="",!0}if(/(^|\s)[a-zA-Z][^a-zA-Z]$/.test(r))return Ia(e,1),!0;if(/\.[0-9]$/.test(r))return Ia(e,1),!0;if(/[(][0-9+\-.]$/.test(r))return Ia(e,1),!0;if(/[(][a-z][,;]$/.test(r))return Ia(e,2),!0;if(/[0-9+\-=><*|]$/.test(a))return Ha(e),!0}else {if("[Space]"===t)return Pa(e,void 0,e=>/[a-z][:,;.]$/.test(e.body)),!0;if(/[a-zA-Z]{3,}$/.test(r)&&!/(dxd|abc|xyz|uvw)$/.test(r))return Pa(e,void 0,e=>/[a-zA-Z]/.test(e.body)),!0;if(/(^|\W)(if|If)$/i.test(r))return Pa(e,1),!0;if(/(\u0393|\u0394|\u0398|\u039b|\u039E|\u03A0|\u03A3|\u03a5|\u03a6|\u03a8|\u03a9|[\u03b1-\u03c9]|\u03d1|\u03d5|\u03d6|\u03f1|\u03f5){3,}$/u.test(r)&&!/(αβγ)$/.test(r))return Pa(e,void 0,e=>/(:|,|;|.|\u0393|\u0394|\u0398|\u039b|\u039E|\u03A0|\u03A3|\u03a5|\u03a6|\u03a8|\u03a9|[\u03b1-\u03c9]|\u03d1|\u03d5|\u03d6|\u03f1|\u03f5)/u.test(e.body)),!0;if("?"===a)return !0;if("."===a&&!/[0-9-+]\.$/.test(r))return !0}return !1}(e,t,i)&&(e.mode={math:"text",text:"math"}[e.mode],o=""),e.mode!==a&&"function"==typeof e.config.onModeChange&&e.config.onModeChange(e,e.mode);}if(r||o||(o=function(e,t,i){if(0===e.length)return "";for(let a=e.length-1;a--;a>=0)if(e[a].key===i&&(!e[a].ifMode||e[a].ifMode===t))return e[a].command;return ""}(e.keybindings,e.mode,t)),!r&&!o)return !0;if(e.config.readOnly&&"insert"===o[0])return !0;Ci(e.model,!1);const l=e.model.parent();if("moveAfterParent"===o&&l&&"leftright"===l.type&&e.model.endOffset()===e.model.siblings().length-1&&e.config.smartFence&&da(e.model,".",e.style)&&(o="",ji(e)),"math"===e.mode&&"[Spacebar]"===t&&!r){const t=e.model.sibling(1),i=e.model.sibling(-1);(t&&"text"===t.mode||i&&"text"===i.mode)&&ha(e.model," ",{mode:"text"});}if(o)e.$perform(o);else if(r){if(!/^(\\{|\\}|\\[|\\]|\\@|\\#|\\$|\\%|\\^|\\_|\\backslash)$/.test(r)){const t={...Ct(e.model),...e.style};ha(e.model,va(i),{suppressChangeNotifications:!0,mode:e.mode,style:t});const a=e.mode;e.snapshotAndCoalesce(),e.restoreToUndoRecord(e.keystrokeBufferStates[s]),e.mode=a;}wt(e.model);const t=e.model.suppressChangeNotifications;e.model.suppressChangeNotifications=!0;const a={...Ct(e.model),...e.style};ha(e.model,r,{format:"latex",mode:e.mode,style:a,smartFence:!0}),Ha(e),r.endsWith(" ")&&(e.mode="text",ha(e.model," ",{mode:"text",style:a})),e.model.suppressChangeNotifications=t,Mt(e.model),e.snapshot(),ji(e),e.model.announce("replacement"),n&&e.resetKeystrokeBuffer();}return e.scrollIntoView(),(null==i?void 0:i.preventDefault)&&(i.preventDefault(),i.stopPropagation()),!1}function Va(e,t,i){if(e.config.readOnly)return void e.model.announce("plonk");if((i=null!=i?i:{}).focus&&e.$focus(),i.feedback&&(e.config.keypressVibration&&(null===navigator||void 0===navigator?void 0:navigator.vibrate)&&navigator.vibrate(3),e.keypressSound&&(e.keypressSound.load(),e.keypressSound.play().catch(e=>{}))),i.commandMode&&"command"!==e.mode&&e.switchMode("command"),Ci(e.model,!1),i.simulateKeystroke){const i=t.charAt(0);if(!Wa(e,i,new KeyboardEvent("keypress",{key:i})))return}let a="",r=!1;if(e.pasteInProgress)e.pasteInProgress=!1,ha(e.model,t,{smartFence:e.config.smartFence,mode:"math"});else {const i={...Ct(e.model),...e.style},s=Ve(t);for(const t of s)if("command"===e.mode){ct(e.model),e.suggestionIndex=0;const i=Si(e.model),s=re(i+t);r=s.length>1,0===s.length?(ha(e.model,t,{mode:"command"}),/^\\[a-zA-Z\\*]+$/.test(i+t)&&Ci(e.model,!0),Li(e)):(ha(e.model,t,{mode:"command"}),s[0].match!==i+t&&La(e.model,s[0].match,-s[0].match.length+i.length+1),a=s[0].match);}else if("math"===e.mode){const a={"^":"moveToSuperscript",_:"moveToSubscript"," ":"moveAfterParent"}[t];if(a){if("moveToSuperscript"===a){if(Ua(e)>=e.config.scriptDepth[1])return void e.model.announce("plonk")}else if("moveToSubscript"===a&&ja(e)>=e.config.scriptDepth[0])return void e.model.announce("plonk");e.$perform(a);}else e.config.smartSuperscript&&"superscript"===e.model.relation()&&/[0-9]/.test(t)&&0===e.model.siblings().filter(e=>"first"!==e.type).length?(ha(e.model,t,{mode:"math",style:i}),Ut(e.model)):ha(e.model,t,{mode:"math",style:i,smartFence:e.config.smartFence});}else "text"===e.mode&&ha(e.model,t,{mode:"text",style:i});}"command"!==e.mode&&e.snapshotAndCoalesce(),e.dirty=!0,e.scrollIntoView(),wi(e,a,r);}function Ua(e){let t=0,i=0,a=e.model.ancestor(i),r=!1;for(;a;)(a.superscript||a.subscript)&&(t+=1),a.superscript?r=!0:a.subscript&&(r=!1),i+=1,a=e.model.ancestor(i);return r?t:0}function ja(e){let t=0,i=0,a=e.model.ancestor(i),r=!1;for(;a;)(a.superscript||a.subscript)&&(t+=1),a.superscript?r=!1:a.subscript&&(r=!0),i+=1,a=e.model.ancestor(i);return r?t:0}function Xa(e){return e.pasteInProgress=!0,!0}let Za;Gi({undo:e=>(Sa(e),e.undo(),!0),redo:e=>(Sa(e),e.redo(),!0),scrollIntoView:e=>(e.scrollIntoView(),!0),scrollToStart:e=>(e.field.scroll(0,0),!0),scrollToEnd:e=>{const t=e.field.getBoundingClientRect();return e.field.scroll(t.left-window.scrollX,0),!0},enterCommandMode:e=>(e.switchMode("command"),!0),toggleKeystrokeCaption:e=>(e.keystrokeCaptionVisible=!e.keystrokeCaptionVisible,e.keystrokeCaption.innerHTML="",e.keystrokeCaptionVisible||(e.keystrokeCaption.style.visibility="hidden"),!1),switchMode:(e,t)=>(e.switchMode(t),!0),insert:(e,t,i)=>e.$insert(t,i),typedText:(e,t)=>(Va(e,t),!0)}),Gi({applyStyle:function(e,t){e.resetKeystrokeBuffer();const i=function(e){const t={};return "string"==typeof e.mode&&(t.mode=e.mode.toLowerCase()),"string"==typeof e.color&&(t.color=e.color),"string"==typeof e.backgroundColor&&(t.backgroundColor=e.backgroundColor),"string"==typeof e.fontFamily&&(t.fontFamily=e.fontFamily),"string"==typeof e.series&&(t.fontSeries=e.series),"string"==typeof e.fontSeries&&(t.fontSeries=e.fontSeries.toLowerCase()),t.fontSeries&&(t.fontSeries={bold:"b",medium:"m",normal:"m"}[t.fontSeries]||t.fontSeries),"string"==typeof e.shape&&(t.fontShape=e.shape),"string"==typeof e.fontShape&&(t.fontShape=e.fontShape.toLowerCase()),t.fontShape&&(t.fontShape={italic:"it",up:"n",upright:"n",normal:"n"}[t.fontShape]||t.fontShape),"string"==typeof e.size?t.fontSize=e.size:"number"==typeof e.size&&(t.fontSize="size"+Math.min(0,Math.max(10,e.size))),"string"==typeof e.fontSize&&(t.fontSize=e.fontSize.toLowerCase()),t.fontSize&&(t.fontSize={tiny:"size1",scriptsize:"size2",footnotesize:"size3",small:"size4",normal:"size5",normalsize:"size5",large:"size6",Large:"size7",LARGE:"size8",huge:"size9",Huge:"size10"}[t.fontSize]||t.fontSize),t}(t);if(i.mode){if(It(e.model))e.switchMode(i.mode);else {const t=e.mode,i="math"===(St(e.model)||e.config.defaultMode)?"text":"math";let a=e.$selectedText("ASCIIMath");if("math"===i&&/^"[^"]+"$/.test(a)&&(a=a.slice(1,-1)),e.$insert(a,{mode:i,selectionMode:"item",format:"text"===i?"text":"ASCIIMath"}),e.mode=i,e.groupIsSelected()){const t=e.model.parent();!t||"group"!==t.type&&"root"!==t.type||(t.mode=i);}e.mode!==t&&"function"==typeof e.config.onModeChange&&e.config.onModeChange(e,e.mode);}delete i.mode;}return It(e.model)?(e.style.fontSeries&&i.fontSeries===e.style.fontSeries&&(i.fontSeries="auto"),i.fontShape&&i.fontShape===e.style.fontShape&&(i.fontShape="auto"),i.color&&i.color===e.style.color&&(i.color="none"),i.backgroundColor&&i.backgroundColor===e.style.backgroundColor&&(i.backgroundColor="none"),i.fontSize&&i.fontSize===e.style.fontSize&&(i.fontSize="auto"),e.style={...e.style,...i}):(ma(e.model,i),e.snapshot()),!0}},{target:"mathfield"}),Gi({copyToClipboard:e=>(e.$focus(),It(e.model)&&e.$select(),document.execCommand("copy"),!1),cutToClipboard:e=>(e.$focus(),document.execCommand("cut"),!0),pasteFromClipboard:e=>(e.$focus(),document.execCommand("paste"),!0)},{target:"mathfield",category:"clipboard"});let Ga=0;function Ya(e,t,i,a){var r;let s;(a=null!=a?a:{}).bias=null!==(r=a.bias)&&void 0!==r?r:0;const o=function e(t,i,a){let r={element:null,distance:Number.POSITIVE_INFINITY},s=!0;if(t.getAttribute("data-atom-id")){r.element=t;const e=t.getBoundingClientRect(),o=i-(e.left+e.right)/2,n=a-(e.top+e.bottom)/2;r.distance=o*o+n*n,s=i>=e.left&&i<=e.right;}if(s&&t.children)for(const s of t.children){const t=e(s,i,a);t.element&&t.distance<=r.distance&&(r=t);}return r}(e.field,t,i).element,n=o?o.getAttribute("data-atom-id"):null;if(n){const i=Qt(e.model,(e,t)=>t.captureSelection?t.filter(e=>e.id===n).length>0:t.id===n);if(i&&i.length>0)if(s=ht(i[0]).path,0===a.bias){const e=o.getBoundingClientRect();t<e.left+e.width/2&&!o.classList.contains("ML__placeholder")&&(s[s.length-1].offset=Math.max(0,s[s.length-1].offset-1));}else a.bias<0&&(s[s.length-1].offset=Math.min(e.model.siblings().length-1,Math.max(0,s[s.length-1].offset+a.bias)));}return s}const Ja={numeric:{tooltip:"keyboard.tooltip.numeric",layer:"math",label:"123",layers:["math"]},roman:{tooltip:"keyboard.tooltip.roman",layer:"lower-roman",label:"ABC",layers:["lower-roman","upper-roman"]},greek:{tooltip:"keyboard.tooltip.greek",layer:"lower-greek",label:"&alpha;&beta;&gamma;",classes:"tex-math",layers:["lower-greek","upper-greek"]},functions:{tooltip:"keyboard.tooltip.functions",layer:"functions",label:"<i>f</i>&thinsp;()",classes:"tex",layers:["functions"]},symbols:{tooltip:"keyboard.tooltip.symbols",layer:"symbols",label:"&infin;≠∈",classes:"tex",layers:["symbols"]},command:{tooltip:"keyboard.tooltip.command",command:"enterCommandMode",label:"<svg><use xlink:href='#svg-command' /></svg>",layers:["lower-command","upper-command","symbols-command"]},style:{tooltip:"keyboard.tooltip.style",layer:"style",label:"<b>b</b><i>i</i>𝔹"}},Qa={"\\varphi ":["&Phi;","\\Phi "],"\\varsigma ":["&Sigma;","\\Sigma "],"\\epsilon ":["&#x0190;",'{\\char"0190}'],"\\rho ":["&#x3A1",'{\\char"3A1}'],"\\tau ":["&#x3A4;",'{\\char"3A4}'],"\\upsilon ":["&Upsilon;","\\Upsilon "],"\\theta ":["&Theta;","\\Theta "],"\\iota ":["&Iota;",'{\\char"399}'],"\\omicron ":["&#x039F;",'{\\char"39F}'],"\\pi ":["&Pi;","\\Pi "],"\\alpha ":["&Alpha;",'{\\char"391}'],"\\sigma ":["&Sigma;","\\Sigma "],"\\delta ":["&Delta;","\\Delta "],"\\phi ":["&#x03a6;","\\Phi "],"\\gamma ":["&Gamma;","\\Gamma "],"\\eta ":["&Eta;",'{\\char"397}'],"\\xi ":["&Xi;","\\Xi "],"\\kappa ":["&Kappa;",'{\\char"39A}'],"\\lambda ":["&Lambda;","\\Lambda "],"\\zeta ":["&Zeta;",'{\\char"396}'],"\\chi ":["&Chi;",'{\\char"3A7}'],"\\psi ":["&Psi;","\\Psi "],"\\omega ":["&Omega;","\\Omega "],"\\beta ":["&Beta;",'{\\char"392}'],"\\nu ":["&Nu;",'{\\char"39D}'],"\\mu ":["&Mu;",'{\\char"39C}']},er={0:["\\emptyset","\\varnothing","\\infty",{latex:"#?_0",insert:"#@_0"},"\\circ","\\bigcirc","\\bullet"],2:["\\frac{1}{2}",{latex:"#?^2",insert:"#@^2"}],3:["\\frac{1}{3}",{latex:"#?^3",insert:"#@^3"}],".":[",",";","\\colon",{latex:":",aside:"ratio"},{latex:"\\cdotp",aside:"center dot",classes:"box"},{latex:"\\cdots",aside:"center ellipsis",classes:"box"},{latex:"\\ldotp",aside:"low dot",classes:"box"},{latex:"\\ldots",aside:"low ellipsis",classes:"box"},{latex:"\\vdots",aside:"",classes:"box"},{latex:"\\ddots",aside:"",classes:"box"},"\\odot","\\oslash","\\circledcirc"],"*":["\\cdot","\\ast","\\star","\\bigstar","\\ltimes","\\rtimes","\\rightthreetimes","\\leftthreetimes","\\intercal","\\prod",{latex:"\\prod_{n\\mathop=0}^{\\infty}",classes:"small"}],"+":["\\pm","\\mp","\\sum",{latex:"\\sum_{n\\mathop=0}^{\\infty}",classes:"small"},"\\dotplus","\\oplus"],"-":["\\pm","\\mp","\\ominus","\\vert #0  \\vert"],"/":["\\divideontimes","/","\\div"],"(":["\\left( #0\\right)","\\left[ #0\\right]","\\left\\{ #0\\right\\}","\\left\\langle #0\\right\\rangle","\\lfloor","\\llcorner","(","\\lbrack","\\lvert","\\lVert","\\lgroup","\\langle","\\lceil","\\ulcorner","\\lmoustache","\\lbrace"],")":["\\rfloor","\\lrcorner",")","\\rbrack","\\rvert","\\rVert","\\rgroup","\\rangle","\\rceil","\\urcorner","\\rmoustache","\\rbrace"],"=":["\\cong","\\asymp","\\equiv","\\differencedelta","\\varpropto","\\thickapprox","\\approxeq","\\thicksim","\\backsim","\\eqsim","\\simeq","\\Bumpeq","\\bumpeq","\\doteq","\\Doteq","\\fallingdotseq","\\risingdotseq","\\coloneq","\\eqcirc","\\circeq","\\triangleq","\\between"],"!=":["\\neq","\\ncong","","\\nsim"],"<":["\\leq","\\leqq","\\lneqq","\\ll","\\nless","\\nleq","\\precsim","\\lesssim","\\lessgtr","\\prec","\\preccurlyeq","\\lessdot","\\nprec"],">":["\\geq","\\geqq","\\gneqq","\\gg","\\ngtr","\\ngeq","\\succsim","\\gtrsim","\\gtrless","\\succ","\\succcurlyeq","\\gtrdot","\\nsucc"],set:["\\in","\\owns","\\subset","\\nsubset","\\supset","\\nsupset"],"!set":["\\notin","\\backepsilon"],subset:[],supset:[],infinity:["\\aleph_0","\\aleph_1","\\omega","\\mathfrak{m}"],"numeric-pi":["\\prod","\\theta","\\rho","\\sin","\\cos","\\tan"],ee:["\\times 10^{#?}","\\ln","\\ln_{10}","\\log"],"^":["_{#?}"],int:[{latex:"\\int_{#?}^{#?}",classes:"small"},{latex:"\\int",classes:"small"},{latex:"\\smallint",classes:"small"},{latex:"\\iint",classes:"small"},{latex:"\\iiint",classes:"small"},{latex:"\\oint",classes:"small"},{latex:"\\dfrac{\\rd}{\\rd x}",classes:"small"},{latex:"\\frac{\\partial}{\\partial x}",classes:"small"},"\\capitalDifferentialD","\\rd","\\partial"],nabla:["\\nabla\\times","\\nabla\\cdot","\\nabla^{2}"],"!":["!!","\\Gamma","\\Pi"],accents:["\\bar{#@}","\\vec{#@}","\\hat{#@}","\\check{#@}","\\dot{#@}","\\ddot{#@}","\\mathring{#@}","\\breve{#@}","\\acute{#@}","\\tilde{#@}","\\grave{#@}"],A:[{latex:"\\aleph",aside:"aleph"},{latex:"\\forall",aside:"for all"}],a:[{latex:"\\aleph",aside:"aleph"},{latex:"\\forall",aside:"for all"}],b:[{latex:"\\beth",aside:"beth"}],B:[{latex:"\\beth",aside:"beth"}],c:[{latex:"\\C",aside:"set of complex numbers"}],d:[{latex:"\\daleth",aside:"daleth"}],D:[{latex:"\\daleth",aside:"daleth"}],e:[{latex:"\\exponentialE",aside:"exponential e"},{latex:"\\exists",aside:"there is"},{latex:"\\nexists",aside:"there isn’t"}],g:[{latex:"\\gimel",aside:"gimel"}],G:[{latex:"\\gimel",aside:"gimel"}],h:[{latex:"\\hbar",aside:"h bar"},{latex:"\\hslash",aside:"h slash"}],i:[{latex:"\\imaginaryI",aside:"imaginary i"}],j:[{latex:"\\imaginaryJ",aside:"imaginary j"}],l:[{latex:"\\ell",aside:"ell"}],n:[{latex:"\\N",aside:"set of natural numbers"}],p:[{latex:"\\P",aside:"set of primes"}],q:[{latex:"\\Q",aside:"set of rational numbers"}],r:[{latex:"\\R",aside:"set of real numbers"}],z:[{latex:"\\Z",aside:"set of integers"}],"x-var":["y","z","t","r",{latex:"f(#?)",classes:"small"},{latex:"g(#?)",classes:"small"},"x^2","x^n","x_n","x_{n+1}","x_i","x_{i+1}"],"n-var":["i","j","p","k","a","u"],ii:["\\Re","\\Im","\\imaginaryJ","\\Vert #0 \\Vert"],logic:[{latex:"\\exists",aside:"there is"},{latex:"\\nexists",aside:"there isn’t"},{latex:"\\ni",aside:"such that"},{latex:"\\Colon",aside:"such that"},{latex:"\\implies",aside:"implies"},{latex:"\\impliedby",aside:"implied by"},{latex:"\\iff",aside:"if and only if"},{latex:"\\land",aside:"and"},{latex:"\\lor",aside:"or"},{latex:"\\oplus",aside:"xor"},{latex:"\\lnot",aside:"not"},{latex:"\\downarrow",aside:"nor"},{latex:"\\uparrow",aside:"nand"},{latex:"\\curlywedge",aside:"nor"},{latex:"\\bar\\curlywedge",aside:"nand"},{latex:"\\therefore",aside:"therefore"},{latex:"\\because",aside:"because"},{latex:"^\\biconditional",aside:"biconditional"},"\\leftrightarrow","\\Leftrightarrow","\\to","\\models","\\vdash","\\gets","\\dashv","\\roundimplies"],"set-operators":["\\cap","\\cup","\\setminus","\\smallsetminus","\\complement"],"set-relations":["\\in","\\notin","\\ni","\\owns","\\subset","\\supset","\\subseteq","\\supseteq","\\subsetneq","\\supsetneq","\\varsubsetneq","\\subsetneqq","\\nsubset","\\nsupset","\\nsubseteq","\\nsupseteq"],space:[{latex:'\\char"203A\\!\\char"2039',insert:"\\!",aside:"negative thin space<br>⁻³⧸₁₈ em"},{latex:'\\unicode{"203A}\\,\\unicode{"2039}',insert:"\\,",aside:"thin space<br>³⧸₁₈ em"},{latex:'\\unicode{"203A}\\:\\unicode{"2039}',insert:"\\:",aside:"medium space<br>⁴⧸₁₈ em"},{latex:'\\unicode{"203A}\\;\\unicode{"2039}',insert:"\\;",aside:"thick space<br>⁵⧸₁₈ em"},{latex:'\\unicode{"203A}\\ \\unicode{"2039}',insert:"\\ ",aside:"⅓ em"},{latex:'\\unicode{"203A}\\enspace\\unicode{"2039}',insert:"\\enspace",aside:"½ em"},{latex:'\\unicode{"203A}\\quad\\unicode{"2039}',insert:"\\quad",aside:"1 em"},{latex:'\\unicode{"203A}\\qquad\\unicode{"2039}',insert:"\\qquad",aside:"2 em"}],delete:[{label:'<span class="warning"><svg><use xlink:href="#svg-trash" /></svg></span>',command:'"deleteAll"'}],"->|":[]};let tr={};const ir={math:"\n        <div class='rows'>\n            <ul>\n                <li class='keycap tex' data-alt-keys='x-var'><i>x</i></li>\n                <li class='keycap tex' data-alt-keys='n-var'><i>n</i></li>\n                <li class='separator w5'></li>\n                <row name='numpad-1'/>\n                <li class='separator w5'></li>\n                <li class='keycap tex' data-insert='$$\\exponentialE$$' data-alt-keys='ee'>e</li>\n                <li class='keycap tex' data-insert='$$\\imaginaryI$$' data-alt-keys='ii'>i</li>\n                <li class='keycap tex' data-latex='\\pi' data-alt-keys='numeric-pi'></li>\n            </ul>\n            <ul>\n                <li class='keycap tex' data-key='<' data-alt-keys='<'>&lt;</li>\n                <li class='keycap tex' data-key='>' data-alt-keys='>'>&gt;</li>\n                <li class='separator w5'></li>\n                <row name='numpad-2'/>\n                <li class='separator w5'></li>\n                <li class='keycap tex' data-alt-keys='x2' data-insert='$$#@^{2}$$'><span><i>x</i>&thinsp;²</span></li>\n                <li class='keycap tex' data-alt-keys='^' data-insert='$$#@^{#?}$$'><span><i>x</i><sup>&thinsp;<small>&#x2b1a;</small></sup></span></li>\n                <li class='keycap tex' data-alt-keys='sqrt' data-insert='$$\\sqrt{#0}$$' data-latex='\\sqrt{#0}'></li>\n            </ul>\n            <ul>\n                <li class='keycap tex' data-alt-keys='(' >(</li>\n                <li class='keycap tex' data-alt-keys=')' >)</li>\n                <li class='separator w5'></li>\n                <row name='numpad-3'/>\n                <li class='separator w5'></li>\n                <li class='keycap tex small' data-alt-keys='int' data-latex='\\int_0^\\infty'><span></span></li>\n                <li class='keycap tex' data-latex='\\forall' data-alt-keys='logic' ></li>\n                <li class='action font-glyph bottom right' data-alt-keys='delete' data-command='[\"performWithFeedback\",\"deletePreviousChar\"]'>&#x232b;</li></ul>\n            </ul>\n            <ul>\n                <li class='keycap' data-alt-keys='foreground-color' data-command='[\"applyStyle\",{\"color\":\"#cc2428\"}]'><span style='border-radius: 50%;width:22px;height:22px; border: 3px solid #cc2428; box-sizing: border-box'></span></li>\n                <li class='keycap' data-alt-keys='background-color' data-command='[\"applyStyle\",{\"backgroundColor\":\"#fff590\"}]'><span style='border-radius: 50%;width:22px;height:22px; background:#fff590; box-sizing: border-box'></span></li>\n                <li class='separator w5'></li>\n                <row name='numpad-4'/>\n                <li class='separator w5'></li>\n                <arrows/>\n            </ul>\n        </div>\n    ","lower-roman":"\n        <div class='rows'>\n            <ul>\n                <row name='numpad-1' class='if-wide'/>\n                <row name='lower-1' shift-layer='upper-roman'/>\n            </ul>\n            <ul>\n                <row name='numpad-2' class='if-wide'/>\n                <row name='lower-2'  shift-layer='upper-roman''/>\n            </ul>\n            <ul>\n                <row name='numpad-3' class='if-wide'/>\n                <row name='lower-3'  shift-layer='upper-roman''/>\n            </ul>\n            <ul>\n                <row name='numpad-4' class='if-wide'/>\n                <li class='keycap' >;</li>\n                <li class='keycap' data-alt-keys=','>,</li>\n                <li class='keycap w50' data-key=' ' data-alt-keys='space'>&nbsp;</li>\n                <arrows/>\n            </ul>\n        </div>","upper-roman":"\n        <div class='rows'>\n            <ul>\n                <row name='numpad-1' class='if-wide'/>\n                <row name='upper-1'  shift-layer='lower-roman'/>\n            </ul>\n            <ul>\n                <row name='numpad-2' class='if-wide'/>\n                <row name='upper-2' shift-layer='lower-roman'/>\n            </ul>\n            <ul>\n                <row name='numpad-3' class='if-wide'/>\n                <row name='upper-3' shift-layer='lower-roman'/>\n            </ul>\n            <ul>\n                <row name='numpad-4' class='if-wide'/>\n                <li class='keycap' >;</li>\n                <li class='keycap' data-alt-keys='.'>;</li>\n                <li class='keycap w50' data-key=' '>&nbsp;</li>\n                <arrows/>\n            </ul>\n        </div>",symbols:"\n        <div class='rows'>\n            <ul>\n                <row name='numpad-1' class='if-wide'/>\n                <li class='keycap tex' data-alt-keys='(' data-insert='\\lbrace '>{</li>\n                <li class='keycap tex' data-alt-keys=')' data-insert='\\rbrace '>}</li>\n                <li class='separator w5'></li>\n                <li class='keycap tex' data-alt-keys='set' data-insert='\\in '>&#x2208;</li>\n                <li class='keycap tex' data-alt-keys='!set' data-insert='\\notin '>&#x2209;</li>\n                <li class='keycap tex' data-insert='\\Re '>&#x211c;<aside>Real</aside></li>\n                <li class='keycap tex' data-insert='\\Im '>&#x2111;<aside>Imaginary</aside></li>\n                <li class='keycap w15' data-insert='\\ulcorner#0\\urcorner '><span><sup>&#x250c;</sup><span><span style='color:#ddd'>o</span><sup>&#x2510;</sup></span><aside>ceil</aside></li>\n                <li class='keycap tex' data-alt-keys='nabla' data-insert='\\nabla '>&#x2207;<aside>nabla</aside></li>\n                <li class='keycap tex' data-alt-keys='infinity' data-insert='\\infty '>&#x221e;</li>\n\n            </ul>\n            <ul>\n                <row name='numpad-2' class='if-wide'/>\n                <li class='keycap tex' data-alt-keys='(' data-insert='\\lbrack '>[</li>\n                <li class='keycap tex' data-alt-keys=')' data-insert='\\rbrack '>]</li>\n                <li class='separator w5'></li>\n                <li class='keycap tex' data-alt-keys='subset' data-insert='\\subset '>&#x2282;</li>\n                <li class='keycap tex' data-alt-keys='supset' data-insert='\\supset '>&#x2283;</li>\n                <li class='keycap tex' data-key='!' data-alt-keys='!'>!<aside>factorial</aside></li>\n                <li class='keycap' data-insert='$$^{\\prime} $$'><span><sup><span><span style='color:#ddd'>o</span>&#x2032</sup></span><aside>prime</aside></li>\n                <li class='keycap w15' data-insert='\\llcorner#0\\lrcorner '><span><sub>&#x2514;</sub><span style='color:#ddd'>o</span><sub>&#x2518;</sub></span><aside>floor</aside></li>\n                <li class='keycap tex' data-insert='\\partial '>&#x2202;<aside>partial<br>derivative</aside></li>\n                <li class='keycap tex' data-insert='\\emptyset '>&#x2205;<aside>empty set</aside></li>\n\n            </ul>\n            <ul>\n                <row name='numpad-3' class='if-wide'/>\n                <li class='keycap tex' data-alt-keys='(' data-insert='\\langle '>&#x27e8;</li>\n                <li class='keycap tex' data-alt-keys=')' data-insert='\\rangle '>&#x27e9;</li>\n                <li class='separator w5'></li>\n                <li class='keycap tex' data-insert='\\subseteq '>&#x2286;</li>\n                <li class='keycap tex' data-insert='\\supseteq '>&#x2287;</li>\n                <li class='keycap tex' data-alt-keys='accents' data-insert='$$\\vec{#@}$$' data-latex='\\vec{#?}' data-aside='vector'></li>\n                <li class='keycap tex' data-alt-keys='accents' data-insert='$$\\bar{#@}$$' data-latex='\\bar{#?}' data-aside='bar'></li>\n                <li class='keycap tex' data-alt-keys='absnorm' data-insert='$$\\left| #0 \\right|$$' data-latex='\\left| #? \\right|' data-aside='abs'></li>\n                <li class='keycap tex' data-insert='\\ast '>&#x2217;<aside>asterisk</aside></li>\n\n                <li class='action font-glyph bottom right w15'\n                    data-shifted='<span class=\"warning\"><svg><use xlink:href=\"#svg-trash\" /></svg></span>'\n                    data-shifted-command='\"deleteAll\"'\n                    data-alt-keys='delete' data-command='[\"performWithFeedback\",\"deletePreviousChar\"]'\n                >&#x232b;</li>\n            </ul>\n            <ul>\n                <row name='numpad-4' class='if-wide'/>\n                <li class='keycap tex' data-insert=','>,</li>\n                <li class='keycap tex' data-insert='\\cdot '>&#x22c5;<aside>centered dot</aside></li>\n                <li class='keycap tex' data-insert='\\colon '>:<aside>colon</aside></li>\n                <li class='keycap tex' data-insert='\\circ '>&#x2218;<aside>circle</aside></li>\n                <li class='keycap tex' data-insert='\\approx '>&#x2248;<aside>approx.</aside></li>\n                <li class='keycap tex' data-insert='\\ne '>&#x2260;</li>\n                <li class='keycap tex' data-insert='\\pm '>&#x00b1;</li>\n                <arrows/>\n            </ul>\n        </div>","lower-greek":"\n        <div class='rows'>\n            <ul><li class='keycap tex' data-insert='\\varphi '><i>&#x03c6;</i><aside>phi var.</aside></li>\n                <li class='keycap tex' data-insert='\\varsigma '><i>&#x03c2;</i><aside>sigma var.</aside></li>\n                <li class='keycap tex' data-insert='\\epsilon '><i>&#x03f5;</i></li>\n                <li class='keycap tex' data-insert='\\rho '><i>&rho;</i></li>\n                <li class='keycap tex' data-insert='\\tau '><i>&tau;</i></li>\n                <li class='keycap tex' data-insert='\\upsilon '><i>&upsilon;</i></li>\n                <li class='keycap tex' data-insert='\\theta '><i>&theta;</i></li>\n                <li class='keycap tex' data-insert='\\iota '><i>&iota;</i></li>\n                <li class='keycap tex' data-insert='\\omicron '>&omicron;</i></li>\n                <li class='keycap tex' data-insert='\\pi '><i>&pi;</i></li>\n            </ul>\n            <ul><li class='keycap tex' data-insert='\\alpha ' data-shifted='&Alpha;' data-shifted-command='[\"insert\",\"{\\\\char\\\"391}\"]'><i>&alpha;</i></li>\n                <li class='keycap tex' data-insert='\\sigma '><i>&sigma;</i></li>\n                <li class='keycap tex' data-insert='\\delta '><i>&delta;</i></li>\n                <li class='keycap tex' data-insert='\\phi '><i>&#x03d5;</i></i></li>\n                <li class='keycap tex' data-insert='\\gamma '><i>&gamma;</i></li>\n                <li class='keycap tex' data-insert='\\eta '><i>&eta;</i></li>\n                <li class='keycap tex' data-insert='\\xi '><i>&xi;</i></li>\n                <li class='keycap tex' data-insert='\\kappa '><i>&kappa;</i></li>\n                <li class='keycap tex' data-insert='\\lambda '><i>&lambda;</i></li>\n            </ul>\n            <ul><li class='shift modifier font-glyph bottom left w15 layer-switch' data-layer='upper-greek'>&#x21e7;</li>\n                <li class='keycap tex' data-insert='\\zeta '><i>&zeta;</i></li>\n                <li class='keycap tex' data-insert='\\chi '><i>&chi;</i></li>\n                <li class='keycap tex' data-insert='\\psi '><i>&psi;</i></li>\n                <li class='keycap tex' data-insert='\\omega '><i>&omega;</i></li>\n                <li class='keycap tex' data-insert='\\beta '><i>&beta;</i></li>\n                <li class='keycap tex' data-insert='\\nu '><i>&nu;</i></li>\n                <li class='keycap tex' data-insert='\\mu '><i>&mu;</i></li>\n                <li class='action font-glyph bottom right w15'\n                    data-shifted='<span class=\"warning\"><svg><use xlink:href=\"#svg-trash\" /></svg></span>'\n                    data-shifted-command='\"deleteAll\"'\n                    data-alt-keys='delete' data-command='[\"performWithFeedback\",\"deletePreviousChar\"]'\n                >&#x232b;</li>\n            </ul>\n            <ul>\n                <li class='keycap ' data-key=' '>&nbsp;</li>\n                <li class='keycap'>,</li>\n                <li class='keycap tex' data-insert='\\varepsilon '><i>&#x03b5;</i><aside>epsilon var.</aside></li>\n                <li class='keycap tex' data-insert='\\vartheta '><i>&#x03d1;</i><aside>theta var.</aside></li>\n                <li class='keycap tex' data-insert='\\varkappa '><i>&#x3f0;</i><aside>kappa var.</aside></li>\n                <li class='keycap tex' data-insert='\\varpi '><i>&#x03d6;<aside>pi var.</aside></i></li>\n                <li class='keycap tex' data-insert='\\varrho '><i>&#x03f1;</i><aside>rho var.</aside></li>\n                <arrows/>\n            </ul>\n        </div>","upper-greek":"\n        <div class='rows'>\n            <ul><li class='keycap tex' data-insert='\\Phi '>&Phi;<aside>phi</aside></li>\n                <li class='keycap tex' data-insert='\\Sigma '>&Sigma;<aside>sigma</aside></li>\n                <li class='keycap tex' data-insert='{\\char\"0190}'>&#x0190;<aside>epsilon</aside></li>\n                <li class='keycap tex' data-insert='{\\char\"3A1}'>&#x3A1;<aside>rho</aside></li>\n                <li class='keycap tex' data-insert='{\\char\"3A4}'>&#x3A4;<aside>tau</aside></li>\n                <li class='keycap tex' data-insert='\\Upsilon '>&Upsilon;<aside>upsilon</aside></li>\n                <li class='keycap tex' data-insert='\\Theta '>&Theta;<aside>theta</aside></li>\n                <li class='keycap tex' data-insert='{\\char\"399}'>&Iota;<aside>iota</aside></li>\n                <li class='keycap tex' data-insert='{\\char\"39F}'>&#x039F;<aside>omicron</aside></li>\n                <li class='keycap tex' data-insert='\\Pi '>&Pi;<aside>pi</aside></li></ul>\n            <ul><li class='keycap tex' data-insert='{\\char\"391}'>&#x391;<aside>alpha</aside></li>\n                <li class='keycap tex' data-insert='\\Sigma '>&Sigma;<aside>sigma</aside></li>\n                <li class='keycap tex' data-insert='\\Delta '>&Delta;<aside>delta</aside></li>\n                <li class='keycap tex' data-insert='\\Phi '>&#x03a6;<aside>phi</aside></li>\n                <li class='keycap tex' data-insert='\\Gamma '>&Gamma;<aside>gamma</aside></li>\n                <li class='keycap tex' data-insert='{\\char\"397}'>&Eta;<aside>eta</aside></li>\n                <li class='keycap tex' data-insert='\\Xi '>&Xi;<aside>xi</aside></li>\n                <li class='keycap tex' data-insert='{\\char\"39A}'>&Kappa;<aside>kappa</aside></li>\n                <li class='keycap tex' data-insert='\\Lambda '>&Lambda;<aside>lambda</aside></li></ul>\n            <ul><li class='shift modifier font-glyph bottom left selected w15 layer-switch' data-layer='lower-greek'>&#x21e7;</li>\n                <li class='keycap tex' data-insert='{\\char\"396}'>&Zeta;<aside>zeta</aside></li>\n                <li class='keycap tex' data-insert='{\\char\"3A7}'>&Chi;<aside>chi</aside></li>\n                <li class='keycap tex' data-insert='\\Psi '>&Psi;<aside>psi</aside></li>\n                <li class='keycap tex' data-insert='\\Omega '>&Omega;<aside>omega</aside></li>\n                <li class='keycap tex' data-insert='{\\char\"392}'>&Beta;<aside>beta</aside></li>\n                <li class='keycap tex' data-insert='{\\char\"39D}'>&Nu;<aside>nu</aside></li>\n                <li class='keycap tex' data-insert='{\\char\"39C}'>&Mu;<aside>mu</aside></li>\n                <li class='action font-glyph bottom right w15' data-command='[\"performWithFeedback\",\"deletePreviousChar\"]'>&#x232b;</li></ul>\n            <ul>\n                <li class='separator w10'>&nbsp;</li>\n                <li class='keycap'>.</li>\n                <li class='keycap w50' data-key=' '>&nbsp;</li>\n                <arrows/>\n            </ul>\n        </div>","lower-command":"\n        <div class='rows'>\n            <ul><row name='lower-1' class='tt' shift-layer='upper-command'/></ul>\n            <ul><row name='lower-2' class='tt' shift-layer='upper-command'/></ul>\n            <ul><row name='lower-3' class='tt' shift-layer='upper-command'/></ul>\n            <ul>\n                <li class='layer-switch font-glyph modifier bottom left' data-layer='symbols-command'>01#</li>\n                <li class='keycap tt' data-shifted='[' data-shifted-command='[\"insertAndUnshiftKeyboardLayer\", \"[\"]'>{</li>\n                <li class='keycap tt' data-shifted=']' data-shifted-command='[\"insertAndUnshiftKeyboardLayer\", \"]\"]'>}</li>\n                <li class='keycap tt' data-shifted='(' data-shifted-command='[\"insertAndUnshiftKeyboardLayer\", \"(\"]'>^</li>\n                <li class='keycap tt' data-shifted=')' data-shifted-command='[\"insertAndUnshiftKeyboardLayer\", \")\"]'>_</li>\n                <li class='keycap w20' data-key=' '>&nbsp;</li>\n                <arrows/>\n            </ul>\n        </div>","upper-command":"\n        <div class='rows'>\n            <ul><row name='upper-1' class='tt' shift-layer='lower-command'/></ul>\n            <ul><row name='upper-2' class='tt' shift-layer='lower-command'/></ul>\n            <ul><row name='upper-3' class='tt' shift-layer='lower-command'/></ul>\n            <ul>\n                <li class='layer-switch font-glyph modifier bottom left' data-layer='symbols-command'01#</li>\n                <li class='keycap tt'>[</li>\n                <li class='keycap tt'>]</li>\n                <li class='keycap tt'>(</li>\n                <li class='keycap tt'>)</li>\n                <li class='keycap w20' data-key=' '>&nbsp;</li>\n                <arrows/>\n            </ul>\n        </div>","symbols-command":"\n        <div class='rows'>\n            <ul><li class='keycap tt'>1</li><li class='keycap tt'>2</li><li class='keycap tt'>3</li><li class='keycap tt'>4</li><li class='keycap tt'>5</li><li class='keycap tt'>6</li><li class='keycap tt'>7</li><li class='keycap tt'>8</li><li class='keycap tt'>9</li><li class='keycap tt'>0</li></ul>\n            <ul><li class='keycap tt'>!</li><li class='keycap tt'>@</li><li class='keycap tt'>#</li><li class='keycap tt'>$</li><li class='keycap tt'>%</li><li class='keycap tt'>^</li><li class='keycap tt'>&</li><li class='keycap tt'>*</li><li class='keycap tt'>+</li><li class='keycap tt'>=</li></ul>\n            <ul>\n                <li class='keycap tt'>\\</li>\n                <li class='keycap tt'>|</li>\n                <li class='keycap tt'>/</li>\n                <li class='keycap tt'>`</li>\n                <li class='keycap tt'>;</li>\n                <li class='keycap tt'>:</li>\n                <li class='keycap tt'>?</li>\n                <li class='keycap tt'>'</li>\n                <li class='keycap tt'>\"</li>\n                <li class='action font-glyph bottom right'\n                    data-shifted='<span class=\"warning\"><svg><use xlink:href=\"#svg-trash\" /></svg></span>'\n                    data-shifted-command='\"deleteAll\"'\n                    data-alt-keys='delete' data-command='[\"performWithFeedback\",\"deletePreviousChar\"]'\n                >&#x232b;</li>\n            </ul>\n            <ul>\n                <li class='layer-switch font-glyph modifier bottom left' data-layer='lower-command'>abc</li>\n                <li class='keycap tt'>&lt;</li>\n                <li class='keycap tt'>&gt;</li>\n                <li class='keycap tt'>~</li>\n                <li class='keycap tt'>,</li>\n                <li class='keycap tt'>.</li>\n                <li class='keycap' data-key=' '>&nbsp;</li>\n                <arrows/>\n            </ul>\n        </div>",functions:"\n        <div class='rows'>\n            <ul><li class='separator'></li>\n                <li class='fnbutton' data-insert='\\sin'></li>\n                <li class='fnbutton' data-insert='\\sin^{-1}'></li>\n                <li class='fnbutton' data-insert='\\ln'></li>\n                <li class='fnbutton' data-insert='\\exponentialE^{#?}'></li>\n                <li class='bigfnbutton' data-insert='$$\\operatorname{lcm}(#?)$$' data-latex='\\operatorname{lcm}()'></li>\n                <li class='bigfnbutton' data-insert='$$\\operatorname{ceil}(#?)$$' data-latex='\\operatorname{ceil}()'></li>\n                <li class='bigfnbutton' data-insert='$$\\lim_{n\\to\\infty}$$'></li>\n                <li class='bigfnbutton' data-insert='$$\\int$$'></li>\n                <li class='bigfnbutton' data-insert='$$\\operatorname{abs}(#?)$$' data-latex='\\operatorname{abs}()'></li>\n            </ul>\n            <ul><li class='separator'></li>\n                <li class='fnbutton' data-insert='\\cos'></li>\n                <li class='fnbutton' data-insert='\\cos^{-1}'></li>\n                <li class='fnbutton' data-insert='\\ln_{10}'></li>\n                <li class='fnbutton' data-insert='$$10^{#?}$$'></li>\n                <li class='bigfnbutton' data-insert='$$\\operatorname{gcd}(#?)$$' data-latex='\\operatorname{gcd}()'></li>\n                <li class='bigfnbutton' data-insert='$$\\operatorname{floor}(#?)$$' data-latex='\\operatorname{floor}()'></li>\n                <li class='bigfnbutton' data-insert='$$\\sum_{n\\mathop=0}^{\\infty}$$'></li>\n                <li class='bigfnbutton' data-insert='$$\\int_{0}^{\\infty}$$'></li>\n                <li class='bigfnbutton' data-insert='$$\\operatorname{sign}(#?)$$' data-latex='\\operatorname{sign}()'></li>\n            </ul>\n            <ul><li class='separator'></li>\n                <li class='fnbutton' data-insert='\\tan'></li>\n                <li class='fnbutton' data-insert='\\tan^{-1}'></li>\n                <li class='fnbutton' data-insert='$$\\log_{#?}$$'></li>\n                <li class='fnbutton' data-insert='$$\\sqrt[#?]{#0}$$'></li>\n                <li class='bigfnbutton' data-insert='$$#0 \\mod$$' data-latex='\\mod'></li>\n                <li class='bigfnbutton' data-insert='$$\\operatorname{round}(#?) $$' data-latex='\\operatorname{round}()'></li>\n                <li class='bigfnbutton' data-insert='$$\\prod_{n\\mathop=0}^{\\infty}$$' data-latex='{\\scriptstyle \\prod_{n=0}^{\\infty}}'></li>\n                <li class='bigfnbutton' data-insert='$$\\frac{\\differentialD #0}{\\differentialD x}$$'></li>\n                <li class='action font-glyph bottom right' data-command='[\"performWithFeedback\",\"deletePreviousChar\"]'>&#x232b;</li></ul>\n            <ul><li class='separator'></li>\n                <li class='fnbutton'>(</li>\n                <li class='fnbutton'>)</li>\n                <li class='fnbutton' data-insert='$$^{#?} $$' data-latex='x^{#?} '></li>\n                <li class='fnbutton' data-insert='$$_{#?} $$' data-latex='x_{#?} '></li>\n                <li class='keycap w20 ' data-key=' '>&nbsp;</li>\n                <arrows/>\n            </ul>\n        </div>",style:"\n        <div class='rows'>\n            <ul>\n                <li class='keycap' data-alt-keys='foreground-color' data-command='[\"applyStyle\",{\"color\":\"#cc2428\"}]'><span style='border-radius: 50%;width:22px;height:22px; border: 3px solid #cc2428'></span></li>\n                <li class='keycap' data-alt-keys='background-color' data-command='[\"applyStyle\",{\"backgroundColor\":\"#fff590\"}]'><span style='border-radius: 50%;width:22px;height:22px; background:#fff590'></span></li>\n                <li class='separator w5'></li>\n                <li class='keycap' data-command='[\"applyStyle\",{\"size\":\"size3\"}]' data-latex='\\scriptsize\\text{small}'></li>\n                <li class='keycap' data-command='[\"applyStyle\",{\"size\":\"size5\"}]' data-latex='\\scriptsize\\text{normal}'></li>\n                <li class='keycap' data-command='[\"applyStyle\",{\"size\":\"size9\"}]' data-latex='\\huge\\text{big}'></li>\n                <li class='separator w5'></li>\n                <li class='keycap' data-latex='\\langle' data-command='[\"insert\", \"\\\\langle\", {\"smartFence\":true}]'></li>\n            </ul>\n            <ul>\n                <li class='keycap' data-command='[\"applyStyle\",{\"series\":\"l\"}]' data-latex='\\fontseries{l}\\text{Ab}'></li>\n                <li class='keycap' data-command='[\"applyStyle\",{\"series\":\"m\"}]' data-latex='\\fontseries{m}\\text{Ab}'></li>\n                <li class='keycap' data-command='[\"applyStyle\",{\"series\":\"b\"}]' data-latex='\\fontseries{b}\\text{Ab}'></li>\n                <li class='keycap' data-command='[\"applyStyle\",{\"series\":\"bx\"}]' data-latex='\\fontseries{bx}\\text{Ab}'></li>\n                <li class='keycap' data-command='[\"applyStyle\",{\"series\":\"sb\"}]' data-latex='\\fontseries{sb}\\text{Ab}'></li>\n                <li class='keycap' data-command='[\"applyStyle\",{\"series\":\"c\"}]' data-latex='\\fontseries{c}\\text{Ab}'></li>\n            </ul>\n            <ul>\n                <li class='keycap' data-command='[\"applyStyle\",{\"shape\":\"up\"}]' data-latex='\\textup{Ab}'></li>\n                <li class='keycap' data-command='[\"applyStyle\",{\"shape\":\"it\"}]' data-latex='\\textit{Ab}'></li>\n                <li class='keycap' data-command='[\"applyStyle\",{\"shape\":\"sl\"}]' data-latex='\\textsl{Ab}'></li>\n                <li class='keycap' data-command='[\"applyStyle\",{\"shape\":\"sc\"}]' data-latex='\\textsc{Ab}'></li>\n                <li class='separator w5'></li>\n                <li class='keycap' data-insert='$$\\emph{#?} $$' data-latex='\\text{\\emph{emph}}'></li>\n            </ul>\n            <ul>\n                <li class='keycap' data-command='[\"applyStyle\",{\"fontFamily\":\"cmr\"}]' data-latex='\\textrm{Az}'></li>\n                <li class='keycap' data-command='[\"applyStyle\",{\"fontFamily\":\"cmtt\"}]' data-latex='\\texttt{Az}'></li>\n                <li class='keycap' data-command='[\"applyStyle\",{\"fontFamily\":\"cmss\"}]' data-latex='\\textsf{Az}'></li>\n\n                <li class='keycap' data-command='[\"applyStyle\",{\"fontFamily\":\"bb\"}]'  data-latex='\\mathbb{AZ}'></li>\n                <li class='keycap' data-command='[\"applyStyle\",{\"fontFamily\":\"scr\"}]'  data-latex='\\mathscr{AZ}'></li>\n                <li class='keycap' data-command='[\"applyStyle\",{\"fontFamily\":\"cal\"}]' data-latex='\\mathcal{A1}'></li>\n                <li class='keycap' data-command='[\"applyStyle\",{\"fontFamily\":\"frak\"}]' data-latex='\\mathfrak{Az}'></li>\n            </ul>\n        </div>"};function ar(e,t,i){return e=e.replace(/(^|[^\\])#@/g,"$1#?"),D(A(Ne({mathstyle:c.displaystyle,macros:i.config.macros},st(e,"math",t,i.config.macros)),"ML__base"),"ML__mathlive").toMarkup()}function rr(e,t,i){var a;let r="<div class='left'>";const s=t.replace(/\s+/g," ").split(" ");if(s.length>1){const t={...Ja,...null!==(a=e.config.customVirtualKeyboards)&&void 0!==a?a:{}};for(const e of s){if(!t[e])break;r+="<div class='",e===i?r+="selected ":t[e].command?r+="action ":r+="layer-switch ",r+=(t[e].classes||"")+"'",t[e].tooltip&&(r+="data-tooltip='"+za(t[e].tooltip)+"' ",r+="data-placement='top' data-delay='1s'"),e!==i&&(t[e].command&&(r+="data-command='\""+t[e].command+"\"'"),t[e].layer&&(r+="data-layer='"+t[e].layer+"'")),r+=">"+t[e].label+"</div>";}}return r+="</div>",r+=`\n        <div class='right'>\n            <div class='action'\n                data-command='"copyToClipboard"'\n                data-tooltip='${za("tooltip.copy to clipboard")}' data-placement='top' data-delay='1s'>\n                <svg><use xlink:href='#svg-copy' /></svg>\n            </div>\n            <div class='action disabled'\n                data-command='"undo"'\n                data-tooltip='${za("tooltip.undo")}' data-placement='top' data-delay='1s'>\n                <svg><use xlink:href='#svg-undo' /></svg>\n            </div>\n            <div class='action disabled'\n                data-command='"redo"'\n                data-tooltip='${za("tooltip.redo")}' data-placement='top' data-delay='1s'>\n                <svg><use xlink:href='#svg-redo' /></svg>\n            </div>\n        </div>\n    `,"<div class='keyboard-toolbar' role='toolbar'>"+r+"</div>"}function sr(e,t,i){var a;for(let r=0;r<t.length;++r){const s=t[r];let o;s.getAttribute("data-latex")?o=ar(s.getAttribute("data-latex").replace(/&quot;/g,'"'),{"?":'{\\color{#555}{\\scriptstyle \\char"2B1A}}'},e):s.getAttribute("data-insert")&&""===s.innerHTML?o=ar(s.getAttribute("data-insert").replace(/&quot;/g,'"'),{"?":'{\\color{#555}{\\scriptstyle \\char"2B1A}}'},e):s.getAttribute("data-content")&&(o=s.getAttribute("data-content").replace(/&quot;/g,'"')),s.getAttribute("data-aside")&&(o=(null!=o?o:"")+"<aside>"+s.getAttribute("data-aside").replace(/&quot;/g,'"')+"</aside>"),void 0!==o&&(s.innerHTML=e.config.createHTML(o)),s.getAttribute("data-classes")&&s.classList.add(s.getAttribute("data-classes"));const n=null===(a=s.getAttribute("data-insert"))||void 0===a?void 0:a.replace(/&quot;/g,'"');let l;if(n&&Qa[n]&&(s.setAttribute("data-shifted",Qa[n][0]),s.setAttribute("data-shifted-command",JSON.stringify(["insertAndUnshiftKeyboardLayer",Qa[n][1]]))),l=s.getAttribute("data-command")?JSON.parse(s.getAttribute("data-command")):s.getAttribute("data-insert")?["insert",s.getAttribute("data-insert"),{focus:!0,feedback:!0,mode:"math",format:"latex",resetStyle:!0}]:s.getAttribute("data-latex")?["insert",s.getAttribute("data-latex"),{focus:!0,feedback:!0,mode:"math",format:"latex",resetStyle:!0}]:["typedText",s.getAttribute("data-key")||s.textContent,{focus:!0,feedback:!0,simulateKeystroke:!0}],i&&(l=[i,l]),s.getAttribute("data-alt-keys")){const e=tr[s.getAttribute("data-alt-keys")];e&&(l={default:l,pressAndHoldStart:["showAlternateKeys",s.getAttribute("data-alt-keys"),e],pressAndHoldEnd:"hideAlternateKeys"});}ki(e,s,l);}}function or(e,t){const i={qwerty:{"lower-1":"qwertyuiop","lower-2":" asdfghjkl ","lower-3":"^zxcvbnm~","upper-1":"QWERTYUIOP","upper-2":" ASDFGHJKL ","upper-3":"^ZXCVBNM~","numpad-1":"789/","numpad-2":"456*","numpad-3":"123-","numpad-4":"0.=+"},azerty:{"lower-1":"azertyuiop","lower-2":"qsdfghjklm","lower-3":"^ wxcvbn ~","upper-1":"AZERTYUIOP","upper-2":"QSDFGHJKLM","upper-3":"^ WXCVBN ~"},qwertz:{"lower-1":"qwertzuiop","lower-2":" asdfghjkl ","lower-3":"^yxcvbnm~","upper-1":"QWERTZUIOP","upper-2":" ASDFGHJKL","upper-3":"^YXCVBNM~"},dvorak:{"lower-1":"^  pyfgcrl ","lower-2":"aoeuidhtns","lower-3":"qjkxbmwvz~","upper-1":"^  PYFGCRL ","upper-2":"AOEUIDHTNS","upper-3":"QJKXBMWVZ~"},colemak:{"lower-1":" qwfpgjluy ","lower-2":"arstdhneio","lower-3":"^zxcvbkm~","upper-1":" QWFPGNLUY ","upper-2":"ARSTDHNEIO","upper-3":"^ZXCVBKM~"}},a=i[e.config.virtualKeyboardLayout]?i[e.config.virtualKeyboardLayout]:i.qwerty;let r,s=t;s=s.replace(/<arrows\/>/g,"\n        <li class='action' data-command='[\"performWithFeedback\",\"moveToPreviousChar\"]'\n            data-shifted='<svg><use xlink:href=\"#svg-angle-double-left\" /></svg>'\n            data-shifted-command='[\"performWithFeedback\",\"extendToPreviousChar\"]'>\n            <svg><use xlink:href='#svg-arrow-left' /></svg>\n        </li>\n        <li class='action' data-command='[\"performWithFeedback\",\"moveToNextChar\"]'\n            data-shifted='<svg><use xlink:href=\"#svg-angle-double-right\" /></svg>'\n            data-shifted-command='[\"performWithFeedback\",\"extendToNextChar\"]'>\n            <svg><use xlink:href='#svg-arrow-right' /></svg>\n        </li>\n        <li class='action' data-command='[\"performWithFeedback\",\"moveToNextPlaceholder\"]'>\n        <svg><use xlink:href='#svg-tab' /></svg></li>");let o=s.match(/(<row\s+)(.*)((?:<\/row|\/)>)/);for(;o;){r="";const e=o[2].match(/[a-zA-Z][a-zA-Z0-9-]*=(['"])(.*?)\1/g),t={};for(const i of e){const e=i.match(/([a-zA-Z][a-zA-Z0-9-]*)=(['"])(.*?)\2/);t[e[1]]=e[3];}let n=a[t.name];if(n||(n=i.qwerty[t.name]),n)for(const e of n){let i=t.class||"";i&&(i=" "+i),"~"===e?(r+="<li class='action font-glyph bottom right ",r+=n.length-(n.match(/ /g)||[]).length/2==10?"w10":"w15",r+='\' data-shifted=\'<span class="warning"><svg><use xlink:href="#svg-trash" /></svg></span>\'\n                        data-shifted-command=\'"deleteAll"\'\n                        data-alt-keys=\'delete\' data-command=\'["performWithFeedback","deletePreviousChar"]\'\n                        >&#x232b;</li>'):" "===e?r+="<li class='separator w5'></li>":"^"===e?r+="<li class='shift modifier font-glyph bottom left w15 layer-switch' data-layer='"+t["shift-layer"]+"'>&#x21e7;</li>":"/"===e?r+="<li class='keycap"+i+"' data-alt-keys='/' data-insert='\\frac{#0}{#?}'>&divide;</li>":"*"===e?r+="<li class='keycap"+i+"' data-alt-keys='*' data-insert='\\times '>&times;</li>":"-"===e?r+="<li class='keycap"+i+"' data-alt-keys='-' data-key='-' data-alt-keys='-'>&#x2212;</li>":/tt/.test(i)?r+="<li class='keycap"+i+"' data-alt-keys='"+e+'\' data-command=\'["typedText","'+e+'",{"commandMode":true, "focus":true, "feedback":true}]\'>'+e+"</li>":r+="<li class='keycap"+i+"' data-alt-keys='"+e+"'>"+e+"</li>";}s=s.replace(new RegExp(o[1]+o[2]+o[3]),r),o=s.match(/(<row\s+)(.*)((?:<\/row|\/)>)/);}return s}function nr(e){const t=document.getElementById("mathlive-alternate-keys-panel");return t&&(t.classList.remove("is-visible"),t.innerHTML="",yi(t)),!1}function lr(e){const t=e.virtualKeyboard.querySelectorAll("div.keyboard-layer.is-visible .rows .keycap, div.keyboard-layer.is-visible .rows .action");if(t)for(let i=0;i<t.length;i++){const a=t[i],r=a.getAttribute("data-unshifted-content");r&&(a.innerHTML=e.config.createHTML(r));const s=a.getAttribute("data-unshifted-command");s&&a.setAttribute("data-"+e.config.namespace+"command",s);}return !1}function cr(e){var t;const i=null===(t=e.virtualKeyboard)||void 0===t?void 0:t.querySelector(".keyboard-toolbar");if(i){const t=i.querySelector("[data-command='\"undo\"']"),a=i.querySelector("[data-command='\"redo\"']");e.canRedo()?a.classList.remove("disabled"):a.classList.add("disabled"),e.canUndo()?t.classList.remove("disabled"):t.classList.add("disabled");}}function dr(e,t){if("off"!==e.config.virtualKeyboardMode){"lower-command"!==t&&"upper-command"!==t&&"symbols-command"!==t&&Sa(e),mr(e),nr(),lr(e);const i=e.virtualKeyboard.getElementsByClassName("keyboard-layer");let a=!1;for(let e=0;e<i.length;e++)if(i[e].dataset.layer===t){a=!0;break}if(a)for(let e=0;e<i.length;e++)i[e].dataset.layer===t?i[e].classList.add("is-visible"):i[e].classList.remove("is-visible");e.$focus();}return !0}function mr(e,t=""){return e.virtualKeyboardVisible=!1,pr(e,t),!1}function hr(e){return e.virtualKeyboardVisible=!0,pr(e),!1}function pr(e,t){return e.virtualKeyboardVisible=!e.virtualKeyboardVisible,e.virtualKeyboardVisible?(e.virtualKeyboard?e.virtualKeyboard.classList.add("is-visible"):(e.virtualKeyboard=function(e,t){var i,a;let r='<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">\n\n            <symbol id="svg-command" viewBox="0 0 640 512">\n                <path d="M34.495 36.465l211.051 211.05c4.686 4.686 4.686 12.284 0 16.971L34.495 475.535c-4.686 4.686-12.284 4.686-16.97 0l-7.071-7.07c-4.686-4.686-4.686-12.284 0-16.971L205.947 256 10.454 60.506c-4.686-4.686-4.686-12.284 0-16.971l7.071-7.07c4.686-4.687 12.284-4.687 16.97 0zM640 468v-10c0-6.627-5.373-12-12-12H300c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h328c6.627 0 12-5.373 12-12z"/>\n            </symbol>\n\n            <symbol id="svg-undo" viewBox="0 0 512 512">\n                <path d="M20 8h10c6.627 0 12 5.373 12 12v110.625C85.196 57.047 165.239 7.715 256.793 8.001 393.18 8.428 504.213 120.009 504 256.396 503.786 393.181 392.834 504 256 504c-63.926 0-122.202-24.187-166.178-63.908-5.113-4.618-5.354-12.561-.482-17.433l7.069-7.069c4.503-4.503 11.749-4.714 16.482-.454C150.782 449.238 200.935 470 256 470c117.744 0 214-95.331 214-214 0-117.744-95.331-214-214-214-82.862 0-154.737 47.077-190.289 116H180c6.627 0 12 5.373 12 12v10c0 6.627-5.373 12-12 12H20c-6.627 0-12-5.373-12-12V20c0-6.627 5.373-12 12-12z"/>\n            </symbol>\n            <symbol id="svg-redo" viewBox="0 0 512 512">\n                <path d="M492 8h-10c-6.627 0-12 5.373-12 12v110.625C426.804 57.047 346.761 7.715 255.207 8.001 118.82 8.428 7.787 120.009 8 256.396 8.214 393.181 119.166 504 256 504c63.926 0 122.202-24.187 166.178-63.908 5.113-4.618 5.354-12.561.482-17.433l-7.069-7.069c-4.503-4.503-11.749-4.714-16.482-.454C361.218 449.238 311.065 470 256 470c-117.744 0-214-95.331-214-214 0-117.744 95.331-214 214-214 82.862 0 154.737 47.077 190.289 116H332c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h160c6.627 0 12-5.373 12-12V20c0-6.627-5.373-12-12-12z"/>\n            </symbol>\n            <symbol id="svg-arrow-left" viewBox="0 0 192 512">\n                <path d="M25.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L64.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L25 264.5c-4.6-4.7-4.6-12.3.1-17z"/>\n            </symbol>\n            <symbol id="svg-arrow-right" viewBox="0 0 192 512">\n                    <path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z"/>\n            </symbol>\n            <symbol id="svg-tab" viewBox="0 0 448 512">\n                    <path d="M32 217.1c0-8.8 7.2-16 16-16h144v-93.9c0-7.1 8.6-10.7 13.6-5.7l143.5 143.1c6.3 6.3 6.3 16.4 0 22.7L205.6 410.4c-5 5-13.6 1.5-13.6-5.7v-93.9H48c-8.8 0-16-7.2-16-16v-77.7m-32 0v77.7c0 26.5 21.5 48 48 48h112v61.9c0 35.5 43 53.5 68.2 28.3l143.6-143c18.8-18.8 18.8-49.2 0-68L228.2 78.9c-25.1-25.1-68.2-7.3-68.2 28.3v61.9H48c-26.5 0-48 21.6-48 48zM436 64h-8c-6.6 0-12 5.4-12 12v360c0 6.6 5.4 12 12 12h8c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12z"/>\n            </symbol>\n            <symbol id="svg-copy" viewBox="0 0 448 512">\n                <path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM352 32.491a15.88 15.88 0 0 1 7.431 4.195l51.882 51.883A15.885 15.885 0 0 1 415.508 96H352V32.491zM288 464c0 8.822-7.178 16-16 16H48c-8.822 0-16-7.178-16-16V144c0-8.822 7.178-16 16-16h80v240c0 26.51 21.49 48 48 48h112v48zm128-96c0 8.822-7.178 16-16 16H176c-8.822 0-16-7.178-16-16V48c0-8.822 7.178-16 16-16h144v72c0 13.2 10.8 24 24 24h72v240z"/>\n            </symbol>\n            <symbol id="svg-angle-double-right" viewBox="0 0 320 512">\n                <path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17zm128-17l-117.8-116c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17L255.3 256 153.1 356.4c-4.7 4.7-4.7 12.3 0 17l7.1 7.1c4.7 4.7 12.3 4.7 17 0l117.8-116c4.6-4.7 4.6-12.3-.1-17z"/>\n            </symbol>\n            <symbol id="svg-angle-double-left" viewBox="0 0 320 512">\n                <path d="M153.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L192.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L153 264.5c-4.6-4.7-4.6-12.3.1-17zm-128 17l117.8 116c4.7 4.7 12.3 4.7 17 0l7.1-7.1c4.7-4.7 4.7-12.3 0-17L64.7 256l102.2-100.4c4.7-4.7 4.7-12.3 0-17l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L25 247.5c-4.6 4.7-4.6 12.3.1 17z"/>\n            </symbol>\n            <symbol id="svg-trash" viewBox="0 0 448 512">\n                <path d="M336 64l-33.6-44.8C293.3 7.1 279.1 0 264 0h-80c-15.1 0-29.3 7.1-38.4 19.2L112 64H24C10.7 64 0 74.7 0 88v2c0 3.3 2.7 6 6 6h26v368c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V96h26c3.3 0 6-2.7 6-6v-2c0-13.3-10.7-24-24-24h-88zM184 32h80c5 0 9.8 2.4 12.8 6.4L296 64H152l19.2-25.6c3-4 7.8-6.4 12.8-6.4zm200 432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V96h320v368zm-176-44V156c0-6.6 5.4-12 12-12h8c6.6 0 12 5.4 12 12v264c0 6.6-5.4 12-12 12h-8c-6.6 0-12-5.4-12-12zm-80 0V156c0-6.6 5.4-12 12-12h8c6.6 0 12 5.4 12 12v264c0 6.6-5.4 12-12 12h-8c-6.6 0-12-5.4-12-12zm160 0V156c0-6.6 5.4-12 12-12h8c6.6 0 12 5.4 12 12v264c0 6.6-5.4 12-12 12h-8c-6.6 0-12-5.4-12-12z"/>\n            </symbol>\n        </svg>\n        ';nt(e.element,'.ML__keyboard{--keyboard-background:rgba(209,213,217,0.97);--keyboard-text:#000;--keyboard-text-active:var(--primary);--keyboard-background-border:#ddd;--keycap-background:#fff;--keycap-background-active:#e5e5e5;--keycap-background-border:#e5e6e9;--keycap-background-border-bottom:#8d8f92;--keycap-text:#000;--keycap-text-active:#fff;--keycap-secondary-text:#000;--keycap-modifier-background:#b9bdc7;--keycap-modifier-border:#c5c9d0;--keycap-modifier-border-bottom:#989da6;--keyboard-alternate-background:#fff;--keyboard-alternate-background-active:#e5e5e5;--keyboard-alternate-text:#000;position:fixed;left:0;bottom:-267px;width:100vw;z-index:var(--ML_keyboard-zindex,105);padding-top:5px;transform:translate(0);opacity:0;visibility:hidden;transition:.28s cubic-bezier(0,0,.2,1);transition-property:transform,opacity;-webkit-backdrop-filter:grayscale(50%);backdrop-filter:grayscale(50%);background-color:var(--keyboard-background);border:1px solid var(--keyboard-background-border);font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;font-size:16px;font-weight:400;margin:0;text-shadow:none;box-sizing:border-box;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;box-shadow:0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23)}.ML__keyboard.is-visible{transform:translateY(-267px);opacity:1;visibility:visible;transition-timing-function:cubic-bezier(.4,0,1,1)}.ML__keyboard .tex{font-family:KaTeX_Main,Cambria Math,Asana Math,OpenSymbol,Symbola,STIX,Times,serif!important}.ML__keyboard .tex-math{font-family:KaTeX_Math,Cambria Math,Asana Math,OpenSymbol,Symbola,STIX,Times,serif!important}.ML__keyboard .tt{font-family:IBM Plex Mono,Source Code Pro,Consolas,Roboto Mono,Menlo,Bitstream Vera Sans Mono,DejaVu Sans Mono,Monaco,Courier,monospace!important;font-size:30px;font-weight:400}.ML__keyboard.alternate-keys{visibility:hidden;max-width:286px;background-color:var(--keyboard-alternate-background);text-align:center;border-radius:6px;position:fixed;bottom:auto;top:0;box-sizing:content-box;transform:none;z-index:calc(var(--ML_keyboard-zindex, 105) + 1);display:flex;flex-direction:row;justify-content:center;align-content:center;box-shadow:0 14px 28px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.22);transition:none}@media only screen and (max-height:412px){.ML__keyboard.alternate-keys{max-width:320px}}.ML__keyboard.alternate-keys.is-visible{visibility:visible}.ML__keyboard.alternate-keys ul{list-style:none;margin:3px;padding:0;display:flex;flex-flow:row wrap-reverse;justify-content:center}.ML__keyboard.alternate-keys ul>li{display:flex;flex-flow:column;align-items:center;justify-content:center;font-size:30px;height:70px;width:70px;box-sizing:border-box;margin:0;background:transparent;border:1px solid transparent;border-radius:5px;pointer-events:all;color:var(--keyboard-alternate-text);fill:currentColor}@media only screen and (max-height:412px){.ML__keyboard.alternate-keys ul>li{font-size:24px;height:50px;width:50px}}.ML__keyboard.alternate-keys ul>li.active,.ML__keyboard.alternate-keys ul>li.pressed,.ML__keyboard.alternate-keys ul>li:hover{box-shadow:0 10px 20px rgba(0,0,0,.19),0 6px 6px rgba(0,0,0,.23);background:var(--keyboard-alternate-background-active);color:var(--keyboard-text-active)}.ML__keyboard.alternate-keys ul>li.small{font-size:18px}.ML__keyboard.alternate-keys ul>li.small-button{width:42px;height:42px;margin:2px;background:#fbfbfb}.ML__keyboard.alternate-keys ul>li.small-button:hover{background:var(--keyboard-alternate-background-active)}.ML__keyboard.alternate-keys ul>li.box>div,.ML__keyboard.alternate-keys ul>li.box>span{border:1px dashed rgba(0,0,0,.24)}.ML__keyboard.alternate-keys ul>li .warning{min-height:60px;min-width:60px;background:#cd0030;color:#fff;padding:5px;display:flex;align-items:center;justify-content:center;border-radius:5px}.ML__keyboard.alternate-keys ul>li .warning.active,.ML__keyboard.alternate-keys ul>li .warning.pressed,.ML__keyboard.alternate-keys ul>li .warning:hover{background:red}.ML__keyboard.alternate-keys ul>li .warning svg{width:50px;height:50px}.ML__keyboard.alternate-keys ul>li aside{font-size:12px;line-height:12px;opacity:.78;padding-top:2px}.ML__keyboard>div.keyboard-layer{display:none;outline:none}.ML__keyboard>div.keyboard-layer.is-visible{display:flex;flex-flow:column}.ML__keyboard>div>div.keyboard-toolbar{align-self:center;display:flex;flex-flow:row;justify-content:space-between;width:736px}@media only screen and (min-width:768px) and (max-width:1024px){.ML__keyboard>div>div.keyboard-toolbar{width:556px}}@media only screen and (max-width:767px){.ML__keyboard>div>div.keyboard-toolbar{width:365px;max-width:100vw}}.ML__keyboard>div>div.keyboard-toolbar svg{height:20px;width:20px}@media only screen and (max-width:767px){.ML__keyboard>div>div.keyboard-toolbar svg{height:13px;width:17px}}.ML__keyboard>div>div.keyboard-toolbar>.left{position:relative;display:flex;justify-content:flex-start;flex-flow:row}.ML__keyboard>div>div.keyboard-toolbar>.right{display:flex;justify-content:flex-end;flex-flow:row}.ML__keyboard>div>div.keyboard-toolbar>div>div{display:flex;align-items:baseline;justify-content:center;pointer-events:all;color:var(--keyboard-text);fill:currentColor;background:0;font-size:110%;cursor:pointer;min-height:0;padding:4px 10px;margin:7px 4px 6px;box-shadow:none;border:none;border-bottom:2px solid transparent}.ML__keyboard>div>div.keyboard-toolbar>div>div.disabled.pressed svg,.ML__keyboard>div>div.keyboard-toolbar>div>div.disabled:hover svg,.ML__keyboard>div>div.keyboard-toolbar>div>div.disabled svg{color:var(--keyboard-text);opacity:.2}@media only screen and (max-width:414px){.ML__keyboard>div>div.keyboard-toolbar>div>div{font-size:100%;padding:0 6px 0 0}}@media only screen and (max-width:767px){.ML__keyboard>div>div.keyboard-toolbar>div>div{padding-left:4px;padding-right:4px;font-size:90%}}.ML__keyboard>div>div.keyboard-toolbar>div>div.active,.ML__keyboard>div>div.keyboard-toolbar>div>div.pressed,.ML__keyboard>div>div.keyboard-toolbar>div>div:active,.ML__keyboard>div>div.keyboard-toolbar>div>div:hover{color:var(--keyboard-text-active)}.ML__keyboard>div>div.keyboard-toolbar>div>div.selected{color:var(--keyboard-text-active);border-bottom:2px solid var(--keyboard-text-active);margin-bottom:8px;padding-bottom:0}.ML__keyboard div .rows{border:0;border-collapse:separate;clear:both;margin:auto;display:flex;flex-flow:column;align-items:center}.ML__keyboard div .rows>ul{list-style:none;height:40px;margin:0 0 3px;padding:0}.ML__keyboard div .rows>ul>li{display:flex;flex-flow:column;align-items:center;justify-content:center;width:34px;margin-right:2px;height:40px;box-sizing:border-box;padding:8px 0;vertical-align:top;text-align:center;float:left;color:var(--keycap-text);fill:currentColor;font-size:20px;background:var(--keycap-background);border:1px solid var(--keycap-background-border);border-bottom-color:var(--keycap-background-border-bottom);border-radius:5px;pointer-events:all;position:relative;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}.ML__keyboard div .rows>ul>li:last-child{margin-right:0}.ML__keyboard div .rows>ul>li.small{font-size:16px}.ML__keyboard div .rows>ul>li.tt{color:var(--keyboard-text-active)}.ML__keyboard div .rows>ul>li.bottom{justify-content:flex-end}.ML__keyboard div .rows>ul>li.left{align-items:flex-start;padding-left:4px}.ML__keyboard div .rows>ul>li.right{align-items:flex-end;padding-right:4px}.ML__keyboard div .rows>ul>li svg{width:20px;height:20px}.ML__keyboard div .rows>ul>li .warning{height:25px;width:25px;min-height:25px;min-width:25px;background:#cd0030;color:#fff;border-radius:100%;padding:5px;display:flex;align-items:center;justify-content:center;margin-bottom:-2px}.ML__keyboard div .rows>ul>li .warning svg{width:16px;height:16px}@media only screen and (max-width:768px){.ML__keyboard div .rows>ul>li .warning{height:16px;width:16px;min-height:16px;min-width:16px}.ML__keyboard div .rows>ul>li .warning svg{width:14px;height:14px}}.ML__keyboard div .rows>ul>li>.w0{width:0}.ML__keyboard div .rows>ul>li>.w5{width:16px}.ML__keyboard div .rows>ul>li>.w15{width:52px}.ML__keyboard div .rows>ul>li>.w20{width:70px}.ML__keyboard div .rows>ul>li>.w50{width:178px}.ML__keyboard div .rows>ul>li.separator{background:transparent;border:none;pointer-events:none}@media only screen and (max-width:560px){.ML__keyboard div .rows>ul>li.if-wide{display:none}}.ML__keyboard div .rows>ul>li.tex-math{font-size:25px}.ML__keyboard div .rows>ul>li.pressed,.ML__keyboard div .rows>ul>li:hover{background:var(--keycap-background-active);color:var(--keyboard-text-active)}.ML__keyboard div .rows>ul>li.action.active,.ML__keyboard div .rows>ul>li.action:active,.ML__keyboard div .rows>ul>li.keycap.active,.ML__keyboard div .rows>ul>li.keycap:active{transform:translateY(-20px) scale(1.4);z-index:calc(var(--ML_keyboard-zindex, 105) - 5);color:var(--keyboard-text-active)}.ML__keyboard div .rows>ul>li.modifier.active,.ML__keyboard div .rows>ul>li.modifier:active{background:var(--keyboard-text-active);color:var(--keycap-text-active)}.ML__keyboard div .rows>ul>li.action.font-glyph,.ML__keyboard div .rows>ul>li.modifier.font-glyph{font-size:18px}@media only screen and (max-width:767px){.ML__keyboard div .rows>ul>li.action.font-glyph,.ML__keyboard div .rows>ul>li.modifier.font-glyph{font-size:16px}}@media only screen and (max-width:767px){.ML__keyboard div .rows>ul>li.bigfnbutton,.ML__keyboard div .rows>ul>li.fnbutton{font-size:12px}}.ML__keyboard div .rows>ul>li.bigfnbutton{font-size:14px}@media only screen and (max-width:767px){.ML__keyboard div .rows>ul>li.bigfnbutton{font-size:9px}}.ML__keyboard div .rows>ul>li.action,.ML__keyboard div .rows>ul>li.modifier{background-color:var(--keycap-modifier-background);border-bottom-color:var(--keycap-modifier-border);border-color:var(--keycap-modifier-border) var(--keycap-modifier-border) var(--keycap-modifier-border-bottom);font-size:65%;font-weight:100}.ML__keyboard div .rows>ul>li.action.selected,.ML__keyboard div .rows>ul>li.modifier.selected{color:var(--keyboard-text-active)}.ML__keyboard div .rows>ul>li.action.selected.active,.ML__keyboard div .rows>ul>li.action.selected.pressed,.ML__keyboard div .rows>ul>li.action.selected:active,.ML__keyboard div .rows>ul>li.action.selected:hover,.ML__keyboard div .rows>ul>li.modifier.selected.active,.ML__keyboard div .rows>ul>li.modifier.selected.pressed,.ML__keyboard div .rows>ul>li.modifier.selected:active,.ML__keyboard div .rows>ul>li.modifier.selected:hover{color:#fff}.ML__keyboard div .rows>ul>li.keycap.w50{font-size:80%;padding-top:10px;font-weight:100}.ML__keyboard div .rows>ul>li small{color:#555}@media only screen and (max-width:767px){.ML__keyboard div .rows>ul>li small{font-size:9px}}.ML__keyboard div .rows>ul>li aside{font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;font-size:10px;line-height:10px;color:#666}@media only screen and (max-width:767px){.ML__keyboard div .rows>ul>li aside{display:none}}@media only screen and (max-width:414px){.ML__keyboard div .rows>ul>li{width:29px;margin-right:2px}.ML__keyboard div .rows>ul>.w5{width:13.5px}.ML__keyboard div .rows>ul>.w15{width:44.5px}.ML__keyboard div .rows>ul>.w20{width:60px}.ML__keyboard div .rows>ul>.w50{width:153px}}@media only screen and (min-width:415px) and (max-width:768px){.ML__keyboard div .rows>ul>li{width:37px;margin-right:3px}.ML__keyboard div .rows>ul>.w5{width:17px}.ML__keyboard div .rows>ul>.w15{width:57px}.ML__keyboard div .rows>ul>.w20{width:77px}.ML__keyboard div .rows>ul>.w50{width:197px}}@media only screen and (min-width:768px) and (max-width:1024px){.ML__keyboard div .rows>ul{height:52px}.ML__keyboard div .rows>ul>li{height:52px;width:51px;margin-right:4px}.ML__keyboard div .rows>ul>.w5{width:23.5px}.ML__keyboard div .rows>ul>.w15{width:78.5px}.ML__keyboard div .rows>ul>.w20{width:106px}.ML__keyboard div .rows>ul>.w50{width:271px}}@media only screen and (min-width:1025px){.ML__keyboard div .rows>ul{height:52px}.ML__keyboard div .rows>ul>li{height:52px;width:66px;margin-right:6px}.ML__keyboard div .rows>ul>.action,.ML__keyboard div .rows>ul>.modifier{font-size:80%}.ML__keyboard div .rows>ul>.w5{width:30px}.ML__keyboard div .rows>ul>.w15{width:102px}.ML__keyboard div .rows>ul>.w20{width:138px}.ML__keyboard div .rows>ul>.w50{width:354px}}@media (prefers-color-scheme:dark){body:not([theme=light]) .ML__keyboard{--hue:206;--keyboard-background:hsl(var(--hue),19%,38%);--keyboard-text:#f0f0f0;--keyboard-text-active:hsl(var(--hue),100%,60%);--keyboard-background-border:#333;--keycap-background:hsl(var(--hue),25%,39%);--keycap-background-active:hsl(var(--hue),35%,42%);--keycap-background-border:hsl(var(--hue),25%,35%);--keycap-background-border-bottom:#426b8a;--keycap-text:#d0d0d0;--keycap-text-active:#000;--keycap-secondary-text:#fff;--keycap-modifier-background:hsl(var(--hue),35%,40%);--keycap-modifier-border:hsl(var(--hue),35%,35%);--keycap-modifier-border-bottom:hsl(var(--hue),35%,42%);--keyboard-alternate-background:hsl(var(--hue),19%,38%);--keyboard-alternate-background-active:hsl(var(--hue),35%,42%);--keyboard-alternate-text:#d1d1d1}}body[theme=dark] .ML__keyboard{--hue:206;--keyboard-background:hsl(var(--hue),19%,38%);--keyboard-text:#f0f0f0;--keyboard-text-active:hsl(var(--hue),100%,60%);--keyboard-background-border:#333;--keycap-background:hsl(var(--hue),25%,39%);--keycap-background-active:hsl(var(--hue),35%,42%);--keycap-background-border:hsl(var(--hue),25%,35%);--keycap-background-border-bottom:#426b8a;--keycap-text:#d0d0d0;--keycap-text-active:#000;--keycap-secondary-text:#fff;--keycap-modifier-background:hsl(var(--hue),35%,40%);--keycap-modifier-border:hsl(var(--hue),35%,35%);--keycap-modifier-border-bottom:hsl(var(--hue),35%,42%);--keyboard-alternate-background:hsl(var(--hue),19%,38%);--keyboard-alternate-background-active:hsl(var(--hue),35%,42%);--keyboard-alternate-text:#d1d1d1}div.ML__keyboard.material{--keyboard-background:rgba(209,213,217,0.9);--keyboard-background-border:#ddd;--keycap-background:transparent;--keycap-background-active:#cccfd1;--keycap-background-border:transparent;--keyboard-alternate-background:#efefef;--keyboard-alternate-text:#000;font-family:Roboto,sans-serif}div.ML__keyboard.material.alternate-keys{background:var(--keyboard-alternate-background);border:1px solid transparent;border-radius:5px;box-shadow:0 14px 28px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.22)}div.ML__keyboard.material.alternate-keys ul li.active,div.ML__keyboard.material.alternate-keys ul li.pressed,div.ML__keyboard.material.alternate-keys ul li:active,div.ML__keyboard.material.alternate-keys ul li:hover{border:1px solid transparent;background:#5f97fc;color:#fff;fill:currentColor}div.ML__keyboard.material .keyboard-toolbar>div>div{font-size:16px}div.ML__keyboard.material .keyboard-toolbar div.div.active,div.ML__keyboard.material .keyboard-toolbar div.div.pressed,div.ML__keyboard.material .keyboard-toolbar div div:active,div.ML__keyboard.material .keyboard-toolbar div div:hover{color:#5f97fc;fill:currentColor}div.ML__keyboard.material .keyboard-toolbar>div>.selected{color:#5f97fc;fill:currentColor;border-bottom:2px solid #5f97fc;margin-bottom:8px;padding-bottom:0}div.ML__keyboard.material div>.rows>ul>.keycap{background:transparent;border:1px solid transparent;border-radius:5px;color:var(--keycap-text);fill:currentColor;transition:none}div.ML__keyboard.material div>.rows>ul>.keycap.tt{color:#5f97fc}div.ML__keyboard.material div>.rows>ul>.keycap[data-key=" "]{margin-top:10px;margin-bottom:10px;height:20px;background:#e0e0e0}div.ML__keyboard.material div>.rows>ul>.keycap[data-key=" "].active,div.ML__keyboard.material div>.rows>ul>.keycap[data-key=" "].pressed,div.ML__keyboard.material div>.rows>ul>.keycap[data-key=" "]:active,div.ML__keyboard.material div>.rows>ul>.keycap[data-key=" "]:hover{background:#d0d0d0;box-shadow:none;transform:none}div.ML__keyboard.material div>.rows>ul>.keycap:not([data-key=" "]):hover{border:1px solid transparent;background:var(--keycap-background-active);box-shadow:none}div.ML__keyboard.material div>.rows>ul>.keycap:not([data-key=" "]).active,div.ML__keyboard.material div>.rows>ul>.keycap:not([data-key=" "]).pressed,div.ML__keyboard.material div>.rows>ul>.keycap:not([data-key=" "]):active{background:var(--keyboard-alternate-background);color:var(--keyboard-alternate-text);box-shadow:0 10px 20px rgba(0,0,0,.19),0 6px 6px rgba(0,0,0,.23)}@media only screen and (max-width:767px){div.ML__keyboard.material div>.rows>ul>.keycap:not([data-key=" "]).active,div.ML__keyboard.material div>.rows>ul>.keycap:not([data-key=" "]).pressed,div.ML__keyboard.material div>.rows>ul>.keycap:not([data-key=" "]):active{box-shadow:0 10px 20px rgba(0,0,0,.19),0 6px 6px rgba(0,0,0,.23);font-size:10px;vertical-align:top;width:19.5px;margin-right:10px;margin-left:10px;transform:translateY(-20px) scale(2);transition:none;justify-content:flex-start;padding:2px 0 0;z-index:calc(var(--ML_keyboard-zindex, 105) - 5)}}@media only screen and (max-width:414px){div.ML__keyboard.material div>.rows>ul>.keycap:not([data-key=" "]).active,div.ML__keyboard.material div>.rows>ul>.keycap:not([data-key=" "]).pressed,div.ML__keyboard.material div>.rows>ul>.keycap:not([data-key=" "]):active{width:16.5px}}@media only screen and (max-width:767px){div.ML__keyboard.material div>.rows>ul>.keycap:last-child.active,div.ML__keyboard.material div>.rows>ul>.keycap:last-child:active{margin-right:0;margin-left:14px}}div.ML__keyboard.material div div.rows ul li.action,div.ML__keyboard.material div div.rows ul li.modifier{background:transparent;border:0;color:#869096;fill:currentColor;font-size:16px;transition:none}div.ML__keyboard.material div div.rows ul li.action.selected,div.ML__keyboard.material div div.rows ul li.modifier.selected{color:#5f97fc;border-radius:0;border-bottom:2px solid #5f97fc}div.ML__keyboard.material div div.rows ul li.action.active,div.ML__keyboard.material div div.rows ul li.action.pressed,div.ML__keyboard.material div div.rows ul li.action:active,div.ML__keyboard.material div div.rows ul li.action:hover,div.ML__keyboard.material div div.rows ul li.modifier.active,div.ML__keyboard.material div div.rows ul li.modifier.pressed,div.ML__keyboard.material div div.rows ul li.modifier:active,div.ML__keyboard.material div div.rows ul li.modifier:hover{border:0;color:var(--keycap-text);background:var(--keycap-background-active);box-shadow:none}div.ML__keyboard.material div div.rows ul li.bigfnbutton,div.ML__keyboard.material div div.rows ul li.fnbutton{background:transparent;border:0}div.ML__keyboard.material div div.rows ul li.bigfnbutton.selected,div.ML__keyboard.material div div.rows ul li.fnbutton.selected{color:#5f97fc;fill:currentColor;border-radius:0;border-bottom:2px solid #5f97fc}div.ML__keyboard.material div div.rows ul li.bigfnbutton.active,div.ML__keyboard.material div div.rows ul li.bigfnbutton.pressed,div.ML__keyboard.material div div.rows ul li.bigfnbutton:active,div.ML__keyboard.material div div.rows ul li.bigfnbutton:hover,div.ML__keyboard.material div div.rows ul li.fnbutton.active,div.ML__keyboard.material div div.rows ul li.fnbutton.pressed,div.ML__keyboard.material div div.rows ul li.fnbutton:active,div.ML__keyboard.material div div.rows ul li.fnbutton:hover{border:0;color:#5f97fc;fill:currentColor;background:var(--keycap-background-active);box-shadow:none}@media (prefers-color-scheme:dark){body:not([theme=light]) div.ML__keyboard.material{--hue:198;--keyboard-background:hsl(var(--hue),19%,18%);--keyboard-text:#d4d6d7;--keyboard-text-active:#5f97fc;--keyboard-background-border:#333;--keycap-background:hsl(var(--hue),25%,39%);--keycap-background-active:#5f97fc;--keycap-background-border:transparent;--keycap-background-border-bottom:transparent;--keycap-text:#d0d0d0;--keycap-text-active:#d4d6d7;--keycap-secondary-text:#5f97fc;--keycap-modifier-background:hsl(var(--hue),35%,40%);--keycap-modifier-border:hsl(var(--hue),35%,35%);--keycap-modifier-border-bottom:hsl(var(--hue),35%,42%);--keyboard-alternate-background:hsl(var(--hue),8%,2%);--keyboard-alternate-background-active:hsl(var(--hue),35%,42%);--keyboard-alternate-text:#d1d1d1}}body[theme=dark] div.ML__keyboard.material{--hue:198;--keyboard-background:hsl(var(--hue),19%,18%);--keyboard-text:#d4d6d7;--keyboard-text-active:#5f97fc;--keyboard-background-border:#333;--keycap-background:hsl(var(--hue),25%,39%);--keycap-background-active:#5f97fc;--keycap-background-border:transparent;--keycap-background-border-bottom:transparent;--keycap-text:#d0d0d0;--keycap-text-active:#d4d6d7;--keycap-secondary-text:#5f97fc;--keycap-modifier-background:hsl(var(--hue),35%,40%);--keycap-modifier-border:hsl(var(--hue),35%,35%);--keycap-modifier-border-bottom:hsl(var(--hue),35%,42%);--keyboard-alternate-background:hsl(var(--hue),8%,2%);--keyboard-alternate-background-active:hsl(var(--hue),35%,42%);--keyboard-alternate-text:#d1d1d1}'),er["foreground-color"]=[];for(const e of fe)er["foreground-color"].push({classes:"small-button",content:'<span style="border-radius:50%;width:32px;height:32px; box-sizing: border-box; border: 3px solid '+e+'"></span>',command:'["applyStyle",{"color":"'+e+'"}]'});er["background-color"]=[];for(const e of ue)er["background-color"].push({classes:"small-button",content:'<span style="border-radius:50%;width:32px;height:32px; background:'+e+'"></span>',command:'["applyStyle",{"backgroundColor":"'+e+'"}]'});tr={...er},Object.keys(tr).forEach(e=>{tr[e]=tr[e].slice();});for(let e=0;e<26;e++){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZ"[e];tr[t]||(tr[t]=[]),tr[t].unshift({latex:"\\mathbb{"+t+"}",aside:"blackboard",insert:"\\mathbb{"+t+"}"}),tr[t].unshift({latex:"\\mathbf{"+t+"}",aside:"bold",insert:"\\mathbf{"+t+"}"}),tr[t].unshift({latex:"\\mathsf{"+t+"}",aside:"sans",insert:"\\mathsf{"+t+"}"}),tr[t].unshift({latex:"\\mathtt{"+t+"}",aside:"monospace",insert:"\\mathtt{"+t+"}"}),tr[t].unshift({latex:"\\mathcal{"+t+"}",aside:"calligraphy",insert:"\\mathcal{"+t+"}"}),tr[t].unshift({latex:"\\mathfrak{"+t+"}",aside:"fraktur",insert:"\\mathfrak{"+t+"}"});}for(let e=0;e<=26;e++){const t="abcdefghijklmnopqrstuvwxyz"[e];tr[t]||(tr[t]=[]),tr[t].unshift({latex:"\\mathsf{"+t+"}",aside:"sans",insert:"\\mathsf{"+t+"}"}),tr[t].unshift({latex:"\\mathbf{"+t+"}",aside:"bold",insert:"\\mathbf{"+t+"}"}),tr[t].unshift({latex:"\\mathtt{"+t+"}",aside:"monospace",insert:"\\mathtt{"+t+"}"}),tr[t].unshift({latex:"\\mathfrak{"+t+"}",aside:"fraktur",insert:"\\mathfrak{"+t+"}"});}for(let e=0;e<10;e++){const t="0123456789"[e];tr[t]||(tr[t]=[]),tr[t].unshift({latex:"\\mathbf{"+t+"}",aside:"bold",insert:"\\mathbf{"+t+"}"}),tr[t].unshift({latex:"\\mathsf{"+t+"}",aside:"sans",insert:"\\mathsf{"+t+"}"}),tr[t].unshift({latex:"\\mathtt{"+t+"}",aside:"monospace",insert:"\\mathtt{"+t+"}"}),tr[t].unshift({latex:"\\mathcal{"+t+"}",aside:"script",insert:"\\mathcal{"+t+"}"}),tr[t].unshift({latex:"\\mathfrak{"+t+"}",aside:"fraktur",insert:"\\mathfrak{"+t+"}"});}let s=e.config.virtualKeyboards;s||(s="all"),s=s.replace(/\ball\b/i,"numeric functions symbols roman  greek");const o={...ir,...null!==(i=e.config.customVirtualKeyboardLayers)&&void 0!==i?i:{}},n={...Ja,...null!==(a=e.config.customVirtualKeyboards)&&void 0!==a?a:{}},l=s.replace(/\s+/g," ").split(" ");for(const t of l){if(!n[t])break;let i=n[t].layers||[];n[t].layer&&i.push(n[t].layer),i=Array.from(new Set(i));for(const a of i){if(!o[a])break;if("object"==typeof o[a]){let e="";if(o[a].styles&&(e+=`<style>${o[a].styles}</style>`),o[a].backdrop&&(e+=`<div class='${o[a].backdrop}'>`),o[a].container&&(e+=`<div class='${o[a].container}'>`),o[a].rows){e+="<div class='rows'>";for(const t of o[a].rows){e+="<ul>";for(const i of t)e+="<li",i.class&&(e+=` class="${i.class}"`),i.key&&(e+=` data-key="${i.key}"`),i.command&&("string"==typeof i.command?e+=` data-command='"${i.command}"'`:(e+=" data-command='",e+=JSON.stringify(i.command),e+="'")),i.insert&&(e+=` data-insert="${i.insert}"`),i.latex&&(e+=` data-latex="${i.latex}"`),i.aside&&(e+=` data-aside="${i.aside}"`),i.altKeys&&(e+=` data-alt-keys="${i.altKeys}"`),i.shifted&&(e+=` data-shifted="${i.shifted}"`),i.shiftedCommand&&(e+=` data-shifted-command="${i.shiftedCommand}"`),e+=`>${i.label?i.label:""}</li>`;e+="</ul>";}e+="</div>";}o[a].container&&(e+="</div>"),o[a].backdrop&&(e+="</div>"),o[a]=e;}r+="<div tabindex=\"-1\" class='keyboard-layer' data-layer='"+a+"'>",r+=rr(e,s,t);const i="function"==typeof o[a]?o[a]():o[a];r+=or(e,i),r+="</div>";}}const c=document.createElement("div");c.className="ML__keyboard",t?c.classList.add(t):e.config.virtualKeyboardTheme&&c.classList.add(e.config.virtualKeyboardTheme),c.innerHTML=e.config.createHTML(r),sr(e,[].slice.call(c.querySelectorAll(".keycap, .action, .fnbutton, .bigfnbutton")));const d=c.getElementsByClassName("layer-switch");for(let t=0;t<d.length;++t)d[t].classList.contains("shift")?ki(e,d[t],{pressed:["shiftKeyboardLayer","shift"],default:["switchKeyboardLayer",d[t].getAttribute("data-layer")],pressAndHoldEnd:"unshiftKeyboardLayer"}):ki(e,d[t],{default:["switchKeyboardLayer",d[t].getAttribute("data-layer")]});const m=c.getElementsByClassName("keyboard-layer");return Array.from(m).forEach(e=>{e.addEventListener("mousedown",e=>{e.preventDefault(),e.stopPropagation();}),e.addEventListener("touchstart",e=>{e.preventDefault(),e.stopPropagation();},{passive:!1});}),m[0].classList.add("is-visible"),window.addEventListener("mouseup",(function(){nr(),lr(e);})),window.addEventListener("blur",(function(){nr(),lr(e);})),window.addEventListener("touchend",(function(){nr(),lr(e);})),window.addEventListener("touchcancel",(function(){nr(),lr(e);})),c}(e,t),ui(e.virtualKeyboard,"touchstart:passive mousedown",()=>{e.$focus();}),document.body.appendChild(e.virtualKeyboard)),window.setTimeout(()=>{e.virtualKeyboard.classList.add("is-visible");},1)):e.virtualKeyboard&&e.virtualKeyboard.classList.remove("is-visible"),"function"==typeof e.config.onVirtualKeyboardToggle&&e.config.onVirtualKeyboardToggle(e,e.virtualKeyboardVisible,e.virtualKeyboard),!1}Gi({showAlternateKeys:(e,t,i)=>{const a=gi("mathlive-alternate-keys-panel","ML__keyboard alternate-keys");e.virtualKeyboard.classList.contains("material")&&a.classList.add("material"),i.length>=7?a.style.width="286px":4===i.length||2===i.length?a.style.width="146px":1===i.length?a.style.width="86px":a.style.width="146px",a.style.height="auto";let r="";for(const e of i)r+="<li","string"==typeof e?r+=' data-latex="'+e.replace(/"/g,"&quot;")+'"':(e.latex&&(r+=' data-latex="'+e.latex.replace(/"/g,"&quot;")+'"'),e.content&&(r+=' data-content="'+e.content.replace(/"/g,"&quot;")+'"'),e.insert&&(r+=' data-insert="'+e.insert.replace(/"/g,"&quot;")+'"'),e.command&&(r+=" data-command='"+e.command.replace(/"/g,"&quot;")+"'"),e.aside&&(r+=' data-aside="'+e.aside.replace(/"/g,"&quot;")+'"'),e.classes&&(r+=' data-classes="'+e.classes+'"')),r+=">",r+=e.label||"",r+="</li>";r="<ul>"+r+"</ul>",a.innerHTML=e.config.createHTML(r),sr(e,[].slice.call(a.getElementsByTagName("li")),"performAlternateKeys");const s=e.virtualKeyboard.querySelector('div.keyboard-layer.is-visible div.rows ul li[data-alt-keys="'+t+'"]').getBoundingClientRect();if(s){s.top-a.clientHeight<0&&(a.style.width="auto",i.length<=6?a.style.height="56px":i.length<=12?a.style.height="108px":a.style.height="205px");const e=(s.top-a.clientHeight+5).toString()+"px",t=Math.max(0,Math.min(window.innerWidth-a.offsetWidth,(s.left+s.right-a.offsetWidth)/2))+"px";a.style.transform="translate("+t+","+e+")",a.classList.add("is-visible");}return !1}},{target:"virtual-keyboard"}),Gi({shiftKeyboardLayer:t=>{const i=t.virtualKeyboard.querySelectorAll("div.keyboard-layer.is-visible .rows .keycap, div.keyboard-layer.is-visible .rows .action");if(i)for(let a=0;a<i.length;a++){const r=i[a];let s=r.getAttribute("data-shifted");if(s||/^[a-z]$/.test(r.innerHTML)){r.setAttribute("data-unshifted-content",r.innerHTML),s||(s=r.innerHTML.toUpperCase()),r.innerHTML=t.config.createHTML(s);const i=r.getAttribute("data-"+t.config.namespace+"command");if(i){r.setAttribute("data-unshifted-command",i);const a=r.getAttribute("data-shifted-command");if(a)r.setAttribute("data-"+t.config.namespace+"command",a);else {const a=JSON.parse(i);e(a)&&(a[1]=a[1].toUpperCase()),r.setAttribute("data-"+t.config.namespace+"command",JSON.stringify(a));}}}}return !1}},{target:"virtual-keyboard"}),Gi({hideAlternateKeys:e=>nr(),performAlternateKeys:(e,t)=>(nr(),e.$perform(t)),switchKeyboardLayer:(e,t)=>dr(e,t),unshiftKeyboardLayer:e=>lr(e),insertAndUnshiftKeyboardLayer:(e,t)=>(e.$insert(t),lr(e),!0)},{target:"virtual-keyboard"}),Gi({toggleVirtualKeyboardAlt:e=>{let t=!1;return e.virtualKeyboard&&(t=e.virtualKeyboard.classList.contains("material"),e.virtualKeyboard.remove(),delete e.virtualKeyboard,e.virtualKeyboard=null),mr(e,t?"":"material"),!1},toggleVirtualKeyboardShift:e=>{var t,i;e.config.virtualKeyboardLayout={qwerty:"azerty",azerty:"qwertz",qwertz:"dvorak",dvorak:"colemak",colemak:"qwerty"}[e.config.virtualKeyboardLayout];const a=null!==(i=null===(t=e.virtualKeyboard)||void 0===t?void 0:t.querySelector("div.keyboard-layer.is-visible").id)&&void 0!==i?i:"";return e.virtualKeyboard&&(e.virtualKeyboard.remove(),delete e.virtualKeyboard,e.virtualKeyboard=null),mr(e),a&&dr(e,a),!1}},{target:"virtual-keyboard"}),Gi({toggleVirtualKeyboard:(e,t)=>pr(e,t),hideVirtualKeyboard:e=>hr(e),showVirtualKeyboard:(e,t)=>mr(e,t)},{target:"virtual-keyboard"});const ur={"\\imaginaryI":"ⅈ","\\imaginaryJ":"ⅉ","\\pi":"π","\\exponentialE":"ℯ","﹢":"+","＋":"+","−":"-","-":"-","﹣":"-","－":"-","\\times":"*","\\cdot":"*","⨉":"*","️✖":"*","️×":"*",".":"*","÷":"/","⁄":"/","／":"/","!":"factorial","\\mp":"minusplus","\\ne":"!=","\\coloneq":":=","\\questeq":"?=","\\approx":"approx","\\cong":"congruent","\\sim":"similar","\\equiv":"equiv","\\pm":"plusminus","\\land":"and","\\wedge":"and","\\lor":"or","\\vee":"or","\\oplus":"xor","\\veebar":"xor","\\lnot":"not","\\neg":"not","\\exists":"exists","\\nexists":"!exists","\\forall":"forAll","\\backepsilon":"suchThat","\\therefore":"therefore","\\because":"because","\\nabla":"nabla","\\circ":"circle","\\ominus":"ominus","\\odot":"odot","\\otimes":"otimes","\\zeta":"Zeta","\\Gamma":"Gamma","\\min":"min","\\max":"max","\\mod":"mod","\\lim":"lim","\\sum":"sum","\\prod":"prod","\\int":"integral","\\iint":"integral2","\\iiint":"integral3","\\Re":"Re","\\gothicCapitalR":"Re","\\Im":"Im","\\gothicCapitalI":"Im","\\binom":"nCr","\\partial":"partial","\\differentialD":"differentialD","\\capitalDifferentialD":"capitalDifferentialD","\\Finv":"Finv","\\Game":"Game","\\wp":"wp","\\ast":"ast","\\star":"star","\\asymp":"asymp","\\to":"to","\\gets":"gets","\\in":"elementof","\\notin":"!elementof","\\ni":"ownedby","\\owns":"ownedby","\\subset":"subset","\\supset":"superset","\\complement":"complement","\\rightarrow":"shortLogicalImplies","\\leftarrow":"shortLogicalImpliedBy","\\leftrightarrow":"shortLogicalEquivalent","\\longrightarrow":"logicalImplies","\\longleftarrow":"logicalImpliedBy","\\longleftrightarrow":"logicalEquivalent","\\Rightarrow":"shortImplies","\\Leftarrow":"shortImpliedBy","\\Leftrightarrow":"shortEquivalent","\\implies":"implies","\\Longrightarrow":"implies","\\impliedby":"impliedBy","\\Longleftarrow":"impliedBy","\\iff":"equivalent","\\Longleftrightarrow":"equivalent"},fr={"+":"add","*":"multiply","-":"subtract","/":"divide","=":"equal",":=":"assign","!=":"ne","?=":"questeq",approx:"approx",congruent:"congruent",similar:"similar",equiv:"equiv","<":"lt",">":"gt","<=":"le",">=":"ge","≤":"le","≥":"ge",">>":"gg","<<":"ll","**":"pow","++":"increment","--":"decrement"},gr={equal:"%0 = %1",ne:"%0 \\ne %1",questeq:"%0 \\questeq %1",approx:"%0 \\approx %1",congruent:"%0 \\cong %1",similar:"%0 \\sim %1",equiv:"%0 \\equiv %1",assign:"%0 := %1",lt:"%0 < %1",gt:"%0 > %1",le:"%0 \\le %1",ge:"%0 \\ge %1",sin:"\\sin%_%^ %0",cos:"\\cos%_%^ %0",tan:"\\tan%_%^ %0",cot:"\\cot%_%^ %0",sec:"\\sec%_%^ %0",csc:"\\csc%_%^ %0",sinh:"\\sinh %0",cosh:"\\cosh %0",tanh:"\\tanh %0",csch:"\\csch %0",sech:"\\sech %0",coth:"\\coth %0",arcsin:"\\arcsin %0",arccos:"\\arccos %0",arctan:"\\arctan %0",arccot:"\\arcctg %0",arcsec:"\\arcsec %0",arccsc:"\\arccsc %0",arsinh:"\\arsinh %0",arcosh:"\\arcosh %0",artanh:"\\artanh %0",arcsch:"\\arcsch %0",arsech:"\\arsech %0",arcoth:"\\arcoth %0",ln:"\\ln%_%^ %",log:"\\log%_%^ %",lg:"\\lg %",lb:"\\lb %",sum:"\\sum%_%^ %0",prod:"\\prod%_%^ %0",Zeta:"\\zeta%_%^ %",Gamma:"\\Gamma %",min:"\\min%_%^ %",max:"\\max%_%^ %",mod:"\\mod%_%^ %",lim:"\\lim%_%^ %",binom:"\\binom %",nabla:"\\nabla %",curl:"\\nabla\\times %0",div:"\\nabla\\cdot %0",floor:"\\lfloor %0 \\rfloor%_%^",ceil:"\\lceil %0 \\rceil%_%^",abs:"\\left| %0 \\right|%_%^",norm:"\\lVert %0 \\rVert%_%^",ucorner:"\\ulcorner %0 \\urcorner%_%^",lcorner:"\\llcorner %0 \\lrcorner%_%^",angle:"\\langle %0 \\rangle%_%^",group:"\\lgroup %0 \\rgroup%_%^",moustache:"\\lmoustache %0 \\rmoustache%_%^",brace:"\\lbrace %0 \\rbrace%_%^","sqrt[]":"\\sqrt[%^]{%0}",sqrt:"\\sqrt{%0}",lcm:"\\operatorname{lcm}%",gcd:"\\operatorname{gcd}%",erf:"\\operatorname{erf}%",erfc:"\\operatorname{erfc}%",randomReal:"\\operatorname{randomReal}%",randomInteger:"\\operatorname{randomInteger}%",and:"%0 \\land %1",or:"%0 \\lor %1",xor:"%0 \\oplus %1",not:"%0 \\lnot %1",circle:"%0 \\circ %1",ast:"%0 \\ast %1",star:"%0 \\star %1",asymp:"%0 \\asymp %1","/":"\\frac{%0}{%1}",Re:"\\Re{%0}",Im:"\\Im{%0}",factorial:"%0!",factorial2:"%0!!"},yr={degree:880,nabla:740,curl:740,partial:740,differentialD:740,capitalDifferentialD:740,"**":720,odot:710,not:680,div:660,solidus:660,"/":660,setminus:650,"%":640,otimes:410,union:350,intersection:350,"*":390,ast:390,".":390,oplus:300,ominus:300,"+":275,"-":275,"+-":275,"-+":275,circle:265,circledast:265,circledcirc:265,star:265,"..":263,to:262,in:262,"|":261,congruent:265,equiv:260,"=":260,"!=":255,"?=":255,similar:250,approx:247,"<":245,">":243,">=":242,"≥":242,"<=":241,complement:240,subset:240,superset:240,elementof:240,"!elementof":240,exists:230,"!exists":230,forall:230,and:200,xor:195,or:190,suchThat:110,":":100,assign:80,":=":80,therefore:70,because:70,shortLogicalImplies:52,shortImplies:51,logicalImplies:50,implies:49,shortLogicalImpliedBy:48,shortImpliedBy:47,logicalImpliedBy:46,impliedBy:45,shortLogicalEquivalent:44,shortEquivalent:43,logicalEquivalent:42,equivalent:41,",":40,";":30};function br(t,i){return e(t.arg)?t.arg[i]:void 0}function vr(e){return e&&yr[e]||-1}function xr(e){return /=|=>/.test(e)?"right":"left"}function kr(e){if("f"===e||"g"===e)return !0;const t=gr[e];return !!t&&!!/%[^01_^]?/.test(t)}function _r(e){e=(e||"").trim();let t=ur[e];if(!t)if(/^\\[^{}]+$/.test(e)){const i=ae(e,"math",{});t=i&&i.value||e.slice(1);}else t=e;return t}function wr(e){if(!e)return null;const t=_r(Ar(e)),i=[vr(t),xr(t)];return i[0]<=0?null:i}function Mr(e){return null!==wr(e)}const zr={"\\lfloor\\rfloor":"floor","\\lceil\\rceil":"ceil","\\vert\\vert":"abs","\\lvert\\rvert":"abs","||":"abs","\\Vert\\Vert":"norm","\\lVert\\rVert":"norm","\\ulcorner\\urcorner":"ucorner","\\llcorner\\lrcorner":"lcorner","\\langle\\rangle":"angle","\\lgroup\\rgroup":"group","\\lmoustache\\rmoustache":"moustache","\\lbrace\\rbrace":"brace"},Lr={"!":"factorial","\\dag":"dagger","\\dagger":"dagger","\\ddagger":"dagger2","\\maltese":"maltese","\\backprime":"backprime","\\backdoubleprime":"backprime2","\\prime":"prime","\\doubleprime":"prime2","\\$":"$","\\%":"%","\\_":"_","\\degree":"degree"},Sr={"+":"add","-":"add","*":"multiply","=":"equal",",":"list",";":"list2",and:"and",or:"or",xor:"xor",union:"union",shortLogicalEquivalent:"logicalEquivalent",logicalEquivalent:"logicalEquivalent",shortEquivalent:"equivalent",equivalent:"equivalent"},Cr={",":"list",";":"list2"};function Ar(t){if("string"==typeof t)return t;if(e(t)){let e="";for(const i of t)e+=Ar(i);return e}if(t.symbol&&!/^\\math(op|bin|rel|open|punct|ord|inner)/.test(t.symbol))return t.symbol;if("leftright"===t.type)return "";if("string"==typeof t.body)return t.body;if(e(t.body)){let e="";for(const i of t.body)e+=Ar(i);return e}return ""}function $r(e){return "string"==typeof e.sym?function(e){let t=gr[e];return t?t.replace("%1","").replace("%0","").replace("%",""):(e.length>1&&(t="\\"+e),t||(t=Q("math",e)),t)}(e.sym)||e.sym:""}function Dr(e){return parseFloat(e.num)}function qr(e){return "object"==typeof e&&void 0!==e.num}function Tr(e){let t=0;return qr(e)&&(t="object"==typeof e.num?void 0!==e.num.re?es(e.num.re):0:parseFloat(e.num)),t}function Kr(e){let t=0;return qr(e)&&"object"==typeof e.num&&(t=void 0!==e.num.im?es(e.num.im):0),t}function Er(e){return e&&void 0!==e.sup}function Nr(e){return e&&void 0!==e.sub}function Fr(e,t,i){let a=!1;const r=e.atoms[e.index];return r&&r.type===t&&(a=void 0===i||Ar(r)===i),a}function Br(e,...t){const i={fn:e,arg:void 0};if(t){const e=[];for(const i of t)i&&e.push(i);e.length>0&&(i.arg=e);}return i}function Or(e){return "number"==typeof e?{num:e.toString()}:"string"==typeof e||"object"==typeof e?{num:e}:void 0}function Rr(e){if(qr(e)){const t=Tr(e),i=Kr(e);return 0!==i?(0!==t&&(e.num.re=(-t).toString()),e.num.im=(-i).toString()):e.num=(-t).toString(),e}return Br("negate",e)}function Pr(e){const t=e.atoms[e.index+1];return t&&"msubsup"===t.type}function Ir(e,t){let i=e.atoms[e.index];return !i||void 0===i.superscript&&void 0===i.subscript?i=null:e.index+=1,i||(i=e.atoms[e.index+1],i&&"msubsup"===i.type&&(i.superscript||i.subscript)?e.index+=2:i=null),i?(void 0!==i.subscript&&(e.ast.sub=Gr(i.subscript,t)),void 0!==i.superscript&&("msubsup"===i.type?/['\u2032]|\\prime/.test(Ar(i.superscript))?(e.index+=1,i=e.atoms[e.index+1],i&&"msubsup"===i.type&&/['\u2032]|\\prime/.test(Ar(i.superscript))?e.ast.sup={sym:"″"}:(e.ast.sup={sym:"′"},e.index-=1)):/['\u2033]|\\doubleprime/.test(Ar(i.superscript))?e.ast.sup={sym:"″"}:e.ast&&(e.ast.sup=Gr(i.superscript,t)):e.ast.sup=Gr(i.superscript,t))):e.index+=1,e}function Hr(e,t){const i=e.ast;if(Vr(e,"!!"))return e.index+=1,e.ast=Br("factorial2",i),Hr(e=Ir(e,t),t);if(Vr(e,"++"))return e.index+=1,e.ast=Br("increment",i),Hr(e=Ir(e,t),t);if(Vr(e,"--"))return e.index+=1,e.ast=Br("decrement",i),Hr(e=Ir(e,t),t);const a=e.atoms[e.index];return (null==a?void 0:a.symbol)&&Lr[a.symbol]&&(e.ast=Br(Lr[a.symbol],i),e=Hr(e=Ir(e,t),t)),e}function Wr(e,t,i,a){if(e.index=e.index||0,0===e.atoms.length||e.index>=e.atoms.length)return e.ast=void 0,e;const r=e.minPrec;e.minPrec=0;let s=e.atoms[e.index];if(t){if("mopen"===s.type&&Ar(s)===t)e.index+=1,s=(e=jr(e,a)).atoms[e.index],s&&"mclose"===s.type&&Ar(s)===i&&(Pr(e)&&(e.ast={group:e.ast}),e=Hr(e=Ir(e,a),a));else if("textord"===s.type&&Ar(s)===t)e.index+=1,s=(e=jr(e,a)).atoms[e.index],s&&"textord"===s.type&&Ar(s)===i&&(e.index+=1,e=Hr(e=Ir(e,a),a));else if("\\lVert"===t&&"textord"===s.type&&"|"===s.symbol){if(s=e.atoms[e.index+1],s&&"textord"===s.type&&"|"===s.symbol){e.index+=2,s=(e=jr(e,a)).atoms[e.index];const t=e.atoms[e.index+1];s&&"textord"===s.type&&"|"===s.symbol&&t&&"textord"===t.type&&"|"===t.symbol&&(e.index+=2,e=Hr(e=Ir(e,a),a));}}else if("sizeddelim"===s.type&&s.delim===t)e.index+=1,s=(e=jr(e,a)).atoms[e.index],s&&"sizeddelim"===s.type&&s.delim===i&&(e.index+=1,e=Hr(e=Ir(e,a),a));else {if("leftright"!==s.type||s.leftDelim!==t||"?"!==s.rightDelim&&s.rightDelim!==i)return;e.ast=Gr(s.body,a),Pr(e)&&(e.ast={group:e.ast}),e=Hr(e=Ir(e,a),a);}return e.minPrec=r,e}{let o=!0;if("mopen"===s.type?(t=s.symbol,i=P[t]):"sizeddelim"===s.type?(t=s.delim,i=P[t]):"leftright"===s.type?(o=!1,t=s.leftDelim,"?"===(i=s.rightDelim)&&(i=P[t])):"textord"===s.type&&(t=s.symbol,i=P[t]),t&&i){if("|"===t&&"|"===i){const a=e.atoms[e.index+1];a&&"textord"===a.type&&"|"===a.symbol&&(t="\\lVert",i="\\rVert");}if(e=Wr(e,t,i,a))return o&&(e.index+=1),e.ast={fn:zr[t+i]||t+i,arg:[e.ast]},e.minPrec=r,e}}}function Vr(e,t){return e.index=e.index||0,!(e.atoms.length<=1||e.index>=e.atoms.length-1)&&t===Ar(e.atoms[e.index])+Ar(e.atoms[e.index+1])}function Ur(e){if(e.index=e.index||0,!(e.atoms.length<=1||e.index>=e.atoms.length-1)){if(!Fr(e,"textord","\\nabla")){const t=e.atoms[e.index].symbol+e.atoms[e.index+1].symbol,i=/^(>=|<=|>>|<<|:=|!=)$/.test(t)?t:"";return i&&(e.index+=1),i}return e.index+=1,Fr(e,"mbin","\\times")?(e.index+=1,e.ast="curl",e):Fr(e,"mbin","\\cdot")?(e.index+=1,e.ast="div",e):void(e.index-=1)}}function jr(t,i){if(t.index=t.index||0,t.ast=void 0,0===t.atoms.length||t.index>=t.atoms.length)return t;t.minPrec=t.minPrec||0;let a=function t(i,a){if(i.index=i.index||0,i.ast=void 0,0===i.atoms.length||i.index>=i.atoms.length)return i;let r=i.atoms[i.index];if("text"===r.mode){let e="";for(;i.atoms[i.index]&&"text"===i.atoms[i.index].mode;)e+=i.atoms[i.index].body,i.index+=1;return i.ast={text:e},i}const s=_r(Ar(r));if(Ur(i))i.ast=Br(i.ast,t(i,a).ast);else {if("root"===r.type)return i.index=0,i.atoms=r.body,t(i,a);if("mbin"===r.type&&"-"===s)i.index+=1,(i=t(i,a)).ast=Rr(i.ast);else if("mbin"===r.type&&"+"===s)i.index+=1,(i=t(i,a)).ast=Br("add",i.ast);else if("mord"===r.type&&/^[0-9.]$/.test(r.symbol)){let e="",s=!1,o=/^[0-9.eEdD]$/;for(;i.index<i.atoms.length&&!s&&(Fr(i,"spacing")||(Fr(i,"mord")||Fr(i,"mpunct",",")||Fr(i,"mbin"))&&o.test(i.atoms[i.index].symbol));)if("spacing"===i.atoms[i.index].type)i.index+=1;else if(void 0!==i.atoms[i.index].superscript||void 0!==i.atoms[i.index].subscript)s=!0;else {let t=i.atoms[i.index].symbol;"d"===t||"D"===t?(t="e",o=/^[0-9+-.]$/):"e"===t||"E"===t?Pr(i)?(t="",i.index-=1,s=!0):(t="E",o=/^[0-9+-.]$/):o===/^[0-9+-.]$/&&(o=/^[0-9]$/),e+=","===t?"":t,i.index+=1;}if(i.ast=e?Or(e):void 0,r=i.atoms[i.index],r&&"genfrac"===r.type&&!isNaN(i.ast.num)){const e=i.ast;(i=t(i,a)).ast=Br("add",e,i.ast);}if(r&&"group"===r.type&&r.symbol&&r.symbol.startsWith("\\nicefrac")){const e=i.ast;(i=t(i,a)).ast=Br("add",e,i.ast);}r&&"msubsup"===r.type&&(i=Ir(i,a)),i=Hr(i,a);}else if("genfrac"===r.type||"surd"===r.type)i.ast=Xr(r,a),i=Hr(i=Ir(i,a),a);else if("mord"===r.type||"mbin"===r.type){if(kr(s)&&!Mr(r)){i.ast={fn:s};const e=(i=Ir(i,a)).ast,r=t(i,a).ast;r&&/^(list0|list|list2)$/.test(r.fn)?e.arg=r.arg:r&&(e.arg=[r]),i.ast=e;}else i.ast=Xr(r,a),"ⅈ"===i.ast.sym&&(i.ast=Or({im:"1"})),i=Ir(i,a);i=Hr(i,a);}else if("textord"===r.type){if(!Mr(r)&&!P[r.symbol||r.body])if(kr(s)){i.ast={fn:s};const e=(i=Ir(i,a)).ast;i.index+=1,e.arg=[t(i,a).ast],i.ast=e,i=Hr(i,a);}else i.ast=Xr(r,a),void 0===r.superscript&&(i.index+=1),i=Hr(i=Ir(i,a),a);}else if("mop"===r.type){if((/^\\(mathop|operatorname|operatorname\*)/.test(r.symbol)||kr(s))&&!Mr(r))if(i.ast={fn:/^\\(mathop|operatorname|operatorname\*)/.test(r.symbol)?Ar(r.body):s},Er((i=Ir(i,a)).ast)){const e={sin:"arcsin",cos:"arccos",tan:"arctan",cot:"arccot",sec:"arcsec",csc:"arccsc",sinh:"arsinh",cosh:"arcosh",tanh:"artanh",csch:"arcsch",sech:"arsech",coth:"arcoth"};if(-1===Dr(i.ast.sup)&&e[s])i.ast=Br(e[s],t(i,a).ast);else {const e=i.ast;e.arg=[t(i,a).ast],i.ast=e;}}else {const e=i.ast,r=t(i,a).ast;r&&/^(list0|list|list2)$/.test(r.fn)?e.arg=r.arg:r&&(e.arg=[r]),i.ast=e;}}else if("array"===r.type)i.index+=1,i.ast=Xr(r,a);else if("group"===r.type)i.index+=1,i.ast=Xr(r,a);else {if("mclose"===r.type)return i;if("error"===r.type)return i.index+=1,i.ast={error:r.symbol},i}}if(void 0===i.ast){const e=Wr(i,"(",")",a)||Wr(i,null,null,a);e?i=e:Mr(r)||("placeholder"===r.type?i.ast=Or(0):(i.ast={text:"?"},i.ast.error="Unexpected token '"+r.type+"'",r.latex?i.ast.latex=r.latex:r.body&&r.toLatex&&(i.ast.latex=r.toLatex())),i.index+=1);}if(r=i.atoms[i.index],r&&("mord"===r.type||"surd"===r.type||"mop"===r.type||"mopen"===r.type||"sizeddelim"===r.type||"leftright"===r.type)){if("sizeddelim"===r.type)for(const e in P)if(r.delim===P[e])return i.index+=1,i;if(("mord"===r.type||"mop"===r.type)&&Mr(r))return i;const s=i.ast;i.ast={},(null==(i=t(i,a))?void 0:i.ast)&&s?kr(s.fn)&&void 0===s.arg||e(s.arg)&&0===s.arg.length?"list2"===i.ast.fn||"list"===i.ast.fn?i.ast=Br(s.fn,i.ast.arg):i.ast=Br("multiply",s,i.ast):"multiply"===i.ast.fn?i.ast.arg.unshift(s):0===Kr(s)&&0!==Tr(s)&&1===Kr(i.ast)&&0===Tr(i.ast)?i.ast=Or({im:Tr(s).toString()}):i.ast=Br("multiply",s,i.ast):i.ast=s;}return i}(t,i).ast,r=!1;const s=t.minPrec;for(;!r;){const e=t.atoms[t.index],o=Ur(t);let n,l;if(r=!e||"text"===e.mode||!o&&!Mr(e),r||([n,l]=o?[vr(o),xr(o)]:wr(e),r=n<s),!r){const s=o||_r(Ar(e));if(t.minPrec="left"===l?n+1:n,t.index+=1,"|"===s)if(void 0!==e.subscript||t.atoms[t.index]&&void 0!==t.atoms[t.index].subscript&&"msubsup"===t.atoms[t.index].type){t.ast={};const e=Ir(t,i).ast.sub;if(a=Br("bind",a),e&&"equal"===e.fn&&a.arg)a.arg.push(br(e,0)),a.arg.push(br(e,1));else if(e&&a.arg&&("list"===e.fn||"list2"===e.fn)){let t={sym:"x"};for(let i=0;i<e.arg.length;i++)"equal"===e.arg[i].fn?(t=br(e.arg[i],0),a.arg.push(t),a.arg.push(br(e.arg[i],1))):(a.arg.push(t),a.arg.push(e.arg[i]));}else e&&(a.arg.push({sym:"x"}),a.arg.push(e));}else r=!0;else {const e=jr(t,i).ast;let r=Cr[s];r&&a&&a.fn!==r&&(a=Br(r,a)),"-"===s?(null==a?void 0:a.arg)&&"add"===a.fn?void 0!==e&&a.arg.push(Rr(e)):a=a&&"subtract"===a.fn?Br("add",br(a,0),Rr(br(a,1)),Rr(e)):!qr(a)||Er(a)||!qr(e)||Er(e)||void 0!==e.num.re&&"0"!==e.num.re||void 0===e.num.im?Br("subtract",a,e):{num:{re:a.num,im:(-parseFloat(e.num.im)).toString()}}:(r=Sr[s],"add"===r&&a&&"subtract"===a.fn?a=Br("add",br(a,0),Rr(br(a,1)),e):r&&a&&a.fn===r&&!Er(a)?void 0!==e&&(e.fn===r&&!Er(e)&&e.arg?a.arg=[...a.arg,...e.arg]:a.arg&&a.arg.push(e)):r&&e&&e.arg&&e.fn===r?(e.arg.unshift(a),a=e):a="multiply"===r&&qr(a)&&!Er(a)&&e&&10===Dr(e)&&qr(e.sup)?Or(Dr(a)*Math.pow(10,Dr(e.sup))):"add"===r&&qr(a)&&!Er(a)&&e&&0!==Kr(e)&&!Er(e)?{num:{re:a.num,im:e.num.im}}:Br(r||fr[s]||s,a,e));}}}return t.ast=a,t}function Xr(e,t){var i,a,r;let s,o,n,l,c={},d="",m={"double-struck":"double-struck",calligraphic:"script",script:"script",fraktur:"fraktur","sans-serif":"sans-serif",monospace:"monospace"}[e.variant+(e.variantStyle&&"up"!==e.variantStyle?"-"+e.variantStyle:"")],h="";"b"===e.fontSeries&&(h+="bold"),"it"===e.fontShape&&(h+="italic");const p=e.symbol;switch(e.type){case"root":case"group":(null===(i=e.symbol)||void 0===i?void 0:i.startsWith("\\nicefrac"))?(s=e.symbol.slice(9).match(/({.*}|[^}])({.*}|[^}])/),s?(o=1===s[1].length?s[1]:s[1].substr(1,s[1].length-2),o=st(o,"math",null,t.macros),n=1===s[2].length?s[2]:s[2].substr(1,s[2].length-2),n=st(n,"math",null,t.macros),c=Br("divide",Gr(o,t),Gr(n,t))):c={fn:"divide"}):c={group:Gr(e.body,t)};break;case"genfrac":c=Br("divide",Gr(e.numer,t),"placeholder"===(null===(r=null===(a=e.denom)||void 0===a?void 0:a[0])||void 0===r?void 0:r.type)?Or(1):Gr(e.denom,t));break;case"surd":c=e.index?Br("pow",Gr(e.body,t),Br("divide",Or(1),Gr(e.index,t))):Br("sqrt",Gr(e.body,t));break;case"rule":case"overlap":case"overunder":break;case"mord":case"textord":case"mbin":s=p?p.match(/[{]?\\char"([0-9abcdefABCDEF]*)[}]?/):void 0,s?d=String.fromCodePoint(parseInt(s[1],16)):(d=_r(Ar(e)),d.length>0&&"\\"===d.charAt(0)&&"string"==typeof e.body&&(d=e.body)),l=Y(d,m,h).replace(/[\\]/g,"\\\\").replace(/["]/g,'\\"').replace(/[\b]/g,"\\b").replace(/[\f]/g,"\\f").replace(/[\n]/g,"\\n").replace(/[\r]/g,"\\r").replace(/[\t]/g,"\\t"),l!==d?(c={sym:l},m="normal"):c={sym:d};break;case"minner":case"mop":break;case"box":c=Gr(e.body,t);break;case"enclose":break;case"array":if("cardinality"===e.environmentName)c=Br("card",Gr(e.array,t));else if(/array|matrix|pmatrix|bmatrix/.test(e.environmentName)){c={fn:"array",args:[]};for(const i of e.array)c.args.push(i.map(e=>Gr(e,t)));}else if("cases"===e.environmentName){c={fn:"cases",args:[]};for(const i of e.array)if(i[0]){const e=[];e.push(Gr(i[0],t));let a=Gr(i[1],t);a&&"text"===a.fn&&a.arg&&/^(if|when|for)$/i.test(a.arg[0].trim())&&(a=a.arg.filter(e=>"string"!=typeof e)),e.push(null!=a?a:{}),c.args.push(e);}}break;case"spacing":case"space":case"mathstyle":break;default:c=void 0;}return c&&m&&"normal"!==m&&(c.variant=m),c&&"string"==typeof e.cssClass&&(c.class=e.cssClass),c&&"string"==typeof e.cssId&&(c.id=e.cssId),c}function Zr(t){if(!t)return [];let i;if(e(t)){i=[];for(const e of t){const t=Zr(e);i=i.concat(t);}}else {if("spacing"===t.type||"first"===t.type)return [];"box"===t.type?i=Zr(t.body):(t.body&&e(t.body)&&(t.body=Zr(t.body)),t.superscript&&e(t.superscript)&&(t.superscript=Zr(t.superscript)),t.subscript&&e(t.subscript)&&(t.subscript=Zr(t.subscript)),t.index&&e(t.index)&&(t.index=Zr(t.index)),t.denom&&e(t.denom)&&(t.denom=Zr(t.denom)),t.numer&&e(t.numer)&&(t.numer=Zr(t.numer)),t.array&&e(t.array)&&(t.array=t.array.map(e=>e.map(e=>Zr(e)))),i=[t]);}return i}function Gr(e,t){return function(e,t){e.index=e.index||0,e.ast=void 0;const i=[];for(;e.atoms[e.index];)if("text"===e.atoms[e.index].mode){let t="";for(;e.atoms[e.index]&&"text"===e.atoms[e.index].mode;)t+=e.atoms[e.index].body,e.index+=1;i.push(Br("text",t));}else {const a=jr(e,t).ast;if(!a)return;i.push(a);}return i.length>1?Br("sequence",...i):i[0]||void 0}({atoms:Zr(e)},t)}function Yr(e,t){return Gr(e,t)}function Jr(e,...t){e=e||".. ";let i="";if(t.length>0){"."!==e[0]&&(i+=e[0]);let a="";for(const r of t)i+=a+r,a=e[2];"."!==e[1]&&(i+=e[1]);}return i}function Qr(e,t){const i=e.length;e=e.substr(0,t.precision-2);for(let i=0;i<e.length-16;i++){const a=e.substr(0,i);for(let r=0;r<17;r++){const s=e.substr(i,r+1),o=Math.floor((e.length-a.length)/s.length);if(o>1&&(a+s.repeat(o+1)).startsWith(e))return "0"===s?a.replace(/(\d{3})/g,"$1"+t.groupSeparator):a.replace(/(\d{3})/g,"$1"+t.groupSeparator)+t.beginRepeatingDigits+s.replace(/(\d{3})/g,"$1"+t.groupSeparator)+t.endRepeatingDigits}}return i!==e.length&&(e+="\\ldots"),e.replace(/(\d{3})/g,"$1"+t.groupSeparator)}function es(e){return parseFloat(parseFloat(e).toPrecision(15))}function ts(e,t){let i,a="";if("number"==typeof t.precision){if("number"!=typeof e){let i="",a="";if("-"===e[0]?(i="-",e=e.substr(1)):"+"===e[0]&&(e=e.substr(1)),e.indexOf(".")>=0){const r=e.match(/(\d*).(\d*)([e|E]([-+]?[0-9]*))?/),s=r[1],o=r[2].substring(0,Math.min(t.precision-s.length,r[2].length));if(a=r[4]||"","0"===s){let a=0;for(;"0"===o[a]&&a<o.length;)a+=1;let r="";if(a<=4)r="0"+t.decimalMarker,r+=o.substr(0,a),r+=Qr(e.substr(r.length),t);else if(a+1>=t.precision)r="0",i="";else {r=e[a];const i=Qr(e.substr(a+1),t);i&&(r+=t.decimalMarker+i);}"0"!==r&&(e.length-1>t.precision&&!r.endsWith("}")&&!r.endsWith("\\ldots")&&(r+="\\ldots"),a>4&&(r+=t.exponentProduct,t.exponentMarker?r+=t.exponentMarker+(1-a).toString():r+="10^{"+(1-a).toString()+"}")),e=r;}else {e=s.replace(/\B(?=(\d{3})+(?!\d))/g,t.groupSeparator);const i=Qr(o,t);i&&(e+=t.decimalMarker+i);}}else if(e.length>t.precision){const i=e.length;let a=e[0];const r=Qr(e.substr(2),t);r&&(a+=t.decimalMarker+r,"}"!==a[a.length-1]&&(a+="\\ldots")),"1"!==a?a+=t.exponentProduct:a="",t.exponentMarker?a+=t.exponentMarker+(i-2).toString():a+="10^{"+(i-2).toString()+"}",e=a;}else e=e.replace(/\B(?=(\d{3})+(?!\d))/g,t.groupSeparator);return a&&(a=t.exponentMarker?t.exponentMarker+a:t.exponentProduct+" 10^{"+a+"}"),i+e+a}i=es(e);}if("engineering"===t.scientificNotation)if(0===i)a="0";else {const e=Math.abs(i);let r=Math.round(Math.log10(e));r-=r%3,e<1e3&&(r=0);const s=e/Math.pow(10,r);let o="";const n=s.toString().match(/^(.*)\.(.*)$/);(null==n?void 0:n[1])&&n[2]&&(o=n[1]+t.decimalMarker+n[2]),t.groupSeparator&&(o=Qr(s.toExponential(),t));let l="";l=0===r?"":t.exponentMarker?t.exponentMarker+r:t.exponentProduct+" 10^{"+r+"}",a=(i<0?"-":"")+o+l;}else {const i="string"==typeof e?e:e.toString();let r,s,o,n=i.match(/^(.*)[e|E]([-+]?[0-9]*)$/i);r=i,o="",(null==n?void 0:n[1])&&n[2]&&(r=n[1],s=t.exponentMarker?t.exponentMarker+n[2]:t.exponentProduct+" 10^{"+n[2]+"}"),n=r.match(/^(.*)\.(.*)$/),(null==n?void 0:n[1])&&n[2]&&(r=n[1],o=n[2]),t.groupSeparator&&(r=r.replace(/\B(?=(\d{3})+(?!\d))/g,t.groupSeparator),o=Qr(o,t)),o&&(o=t.decimalMarker+o),a=r+o+(s||"");}return a}var is='.ML__sr-only{position:absolute;width:1px;height:1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}body.ML__fonts-loading .ML__base{visibility:hidden}.ML__base{visibility:inherit;display:inline-block;position:relative;cursor:text}.ML__strut,.ML__strut--bottom{display:inline-block;min-height:.5em}.ML__small-delim{font-family:KaTeX_Main}.ML__text{font-family:var(--ml_text-font-family,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif);white-space:pre}.ML__cmr{font-family:KaTeX_Main;font-style:normal}.ML__mathit{font-family:KaTeX_Math;font-style:italic}.ML__mathbf{font-family:KaTeX_Main;font-weight:700}.lcGreek.ML__mathbf{font-family:KaTeX_Math;font-weight:400}.ML__mathbfit{font-family:KaTeX_Math;font-weight:700;font-style:italic}.ML__ams,.ML__bb{font-family:KaTeX_AMS}.ML__cal{font-family:KaTeX_Caligraphic}.ML__frak{font-family:KaTeX_Fraktur}.ML__tt{font-family:KaTeX_Typewriter}.ML__script{font-family:KaTeX_Script}.ML__sans{font-family:KaTeX_SansSerif}.ML__series_el,.ML__series_ul{font-weight:100}.ML__series_l{font-weight:200}.ML__series_sl{font-weight:300}.ML__series_sb{font-weight:500}.ML__bold,.ML__boldsymbol{font-weight:700}.ML__series_eb{font-weight:800}.ML__series_ub{font-weight:900}.ML__series_uc{font-stretch:ultra-condensed}.ML__series_ec{font-stretch:extra-condensed}.ML__series_c{font-stretch:condensed}.ML__series_sc{font-stretch:semi-condensed}.ML__series_sx{font-stretch:semi-expanded}.ML__series_x{font-stretch:expanded}.ML__series_ex{font-stretch:extra-expanded}.ML__series_ux{font-stretch:ultra-expanded}.ML__it{font-style:italic}.ML__shape_ol{-webkit-text-stroke:1px #000;text-stroke:1px #000;color:transparent}.ML__shape_sc{font-variant:small-caps}.ML__shape_sl{font-style:oblique}.ML__emph{color:#bc2612}.ML__emph .ML__emph{color:#0c7f99}.ML__highlight{color:#007cb2;background:#edd1b0}.ML__mathlive{display:inline-block;line-height:0;direction:ltr;text-align:left;text-indent:0;text-rendering:auto;font-family:KaTeX_Main;font-style:normal;font-size-adjust:none;letter-spacing:normal;word-wrap:normal;word-spacing:normal;white-space:nowrap;text-shadow:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:-webkit-min-content;width:-moz-min-content;width:min-content;transform:translateZ(0)}.ML__mathlive .reset-textstyle.scriptstyle{font-size:.7em}.ML__mathlive .reset-textstyle.scriptscriptstyle{font-size:.5em}.ML__mathlive .reset-scriptstyle.textstyle{font-size:1.42857em}.ML__mathlive .reset-scriptstyle.scriptscriptstyle{font-size:.71429em}.ML__mathlive .reset-scriptscriptstyle.textstyle{font-size:2em}.ML__mathlive .reset-scriptscriptstyle.scriptstyle{font-size:1.4em}.ML__mathlive .style-wrap{position:relative}.ML__mathlive .vlist{display:inline-block}.ML__mathlive .vlist>span{display:block;height:0;position:relative;line-height:0}.ML__mathlive .vlist>span>span{display:inline-block}.ML__mathlive .msubsup{text-align:left}.ML__mathlive .mfrac>span{text-align:center}.ML__mathlive .mfrac .frac-line{width:100%}.ML__mathlive .mfrac .frac-line:after{content:"";display:block;margin-top:-.04em;border-bottom-style:solid;border-bottom-width:.04em;min-height:.04em;box-sizing:content-box}.ML__mathlive .rspace.negativethinspace{margin-right:-.16667em}.ML__mathlive .rspace.thinspace{margin-right:.16667em}.ML__mathlive .rspace.negativemediumspace{margin-right:-.22222em}.ML__mathlive .rspace.mediumspace{margin-right:.22222em}.ML__mathlive .rspace.thickspace{margin-right:.27778em}.ML__mathlive .rspace.sixmuspace{margin-right:.333333em}.ML__mathlive .rspace.eightmuspace{margin-right:.444444em}.ML__mathlive .rspace.enspace{margin-right:.5em}.ML__mathlive .rspace.twelvemuspace{margin-right:.666667em}.ML__mathlive .rspace.quad{margin-right:1em}.ML__mathlive .rspace.qquad{margin-right:2em}.ML__mathlive .mspace{display:inline-block}.ML__mathlive .mspace.negativethinspace{margin-left:-.16667em}.ML__mathlive .mspace.thinspace{width:.16667em}.ML__mathlive .mspace.negativemediumspace{margin-left:-.22222em}.ML__mathlive .mspace.mediumspace{width:.22222em}.ML__mathlive .mspace.thickspace{width:.27778em}.ML__mathlive .mspace.sixmuspace{width:.333333em}.ML__mathlive .mspace.eightmuspace{width:.444444em}.ML__mathlive .mspace.enspace{width:.5em}.ML__mathlive .mspace.twelvemuspace{width:.666667em}.ML__mathlive .mspace.quad{width:1em}.ML__mathlive .mspace.qquad{width:2em}.ML__mathlive .llap,.ML__mathlive .rlap{width:0;position:relative}.ML__mathlive .llap>.inner,.ML__mathlive .rlap>.inner{position:absolute}.ML__mathlive .llap>.fix,.ML__mathlive .rlap>.fix{display:inline-block}.ML__mathlive .llap>.inner{right:0}.ML__mathlive .rlap>.inner{left:0}.ML__mathlive .rule{display:inline-block;border:0 solid;position:relative}.ML__mathlive .overline .overline-line,.ML__mathlive .underline .underline-line{width:100%}.ML__mathlive .overline .overline-line:before,.ML__mathlive .underline .underline-line:before{border-bottom-style:solid;border-bottom-width:.04em;content:"";display:block}.ML__mathlive .overline .overline-line:after,.ML__mathlive .underline .underline-line:after{border-bottom-style:solid;border-bottom-width:.04em;min-height:thin;content:"";display:block;margin-top:-1px}.ML__mathlive .stretchy{display:block;position:absolute;width:100%;left:0;overflow:hidden}.ML__mathlive .stretchy:after,.ML__mathlive .stretchy:before{content:""}.ML__mathlive .stretchy svg{display:block;position:absolute;width:100%;height:inherit;fill:currentColor;stroke:currentColor;fill-rule:nonzero;fill-opacity:1;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1}.ML__mathlive .slice-1-of-2{left:0}.ML__mathlive .slice-1-of-2,.ML__mathlive .slice-2-of-2{display:inline-flex;position:absolute;width:50.2%;overflow:hidden}.ML__mathlive .slice-2-of-2{right:0}.ML__mathlive .slice-1-of-3{display:inline-flex;position:absolute;left:0;width:25.1%;overflow:hidden}.ML__mathlive .slice-2-of-3{display:inline-flex;position:absolute;left:25%;width:50%;overflow:hidden}.ML__mathlive .slice-3-of-3{display:inline-flex;position:absolute;right:0;width:25.1%;overflow:hidden}.ML__mathlive .slice-1-of-1{display:inline-flex;position:absolute;width:100%;left:0;overflow:hidden}.ML__mathlive .sqrt{display:inline-block}.ML__mathlive .sqrt>.sqrt-sign{font-family:KaTeX_Main;position:relative}.ML__mathlive .sqrt .sqrt-line{height:.04em;width:100%}.ML__mathlive .sqrt .sqrt-line:before{content:"";display:block;margin-top:-.04em;border-bottom-style:solid;border-bottom-width:.04em;min-height:.5px}.ML__mathlive .sqrt .sqrt-line:after{border-bottom-width:1px;content:" ";display:block;margin-top:-.1em}.ML__mathlive .sqrt>.root{margin-left:.27777778em;margin-right:-.55555556em}.ML__mathlive .fontsize-ensurer,.ML__mathlive .sizing{display:inline-block}.ML__mathlive .fontsize-ensurer.reset-size1.size1,.ML__mathlive .sizing.reset-size1.size1{font-size:1em}.ML__mathlive .fontsize-ensurer.reset-size1.size2,.ML__mathlive .sizing.reset-size1.size2{font-size:1.4em}.ML__mathlive .fontsize-ensurer.reset-size1.size3,.ML__mathlive .sizing.reset-size1.size3{font-size:1.6em}.ML__mathlive .fontsize-ensurer.reset-size1.size4,.ML__mathlive .sizing.reset-size1.size4{font-size:1.8em}.ML__mathlive .fontsize-ensurer.reset-size1.size5,.ML__mathlive .sizing.reset-size1.size5{font-size:2em}.ML__mathlive .fontsize-ensurer.reset-size1.size6,.ML__mathlive .sizing.reset-size1.size6{font-size:2.4em}.ML__mathlive .fontsize-ensurer.reset-size1.size7,.ML__mathlive .sizing.reset-size1.size7{font-size:2.88em}.ML__mathlive .fontsize-ensurer.reset-size1.size8,.ML__mathlive .sizing.reset-size1.size8{font-size:3.46em}.ML__mathlive .fontsize-ensurer.reset-size1.size9,.ML__mathlive .sizing.reset-size1.size9{font-size:4.14em}.ML__mathlive .fontsize-ensurer.reset-size1.size10,.ML__mathlive .sizing.reset-size1.size10{font-size:4.98em}.ML__mathlive .fontsize-ensurer.reset-size2.size1,.ML__mathlive .sizing.reset-size2.size1{font-size:.71428571em}.ML__mathlive .fontsize-ensurer.reset-size2.size2,.ML__mathlive .sizing.reset-size2.size2{font-size:1em}.ML__mathlive .fontsize-ensurer.reset-size2.size3,.ML__mathlive .sizing.reset-size2.size3{font-size:1.14285714em}.ML__mathlive .fontsize-ensurer.reset-size2.size4,.ML__mathlive .sizing.reset-size2.size4{font-size:1.28571429em}.ML__mathlive .fontsize-ensurer.reset-size2.size5,.ML__mathlive .sizing.reset-size2.size5{font-size:1.42857143em}.ML__mathlive .fontsize-ensurer.reset-size2.size6,.ML__mathlive .sizing.reset-size2.size6{font-size:1.71428571em}.ML__mathlive .fontsize-ensurer.reset-size2.size7,.ML__mathlive .sizing.reset-size2.size7{font-size:2.05714286em}.ML__mathlive .fontsize-ensurer.reset-size2.size8,.ML__mathlive .sizing.reset-size2.size8{font-size:2.47142857em}.ML__mathlive .fontsize-ensurer.reset-size2.size9,.ML__mathlive .sizing.reset-size2.size9{font-size:2.95714286em}.ML__mathlive .fontsize-ensurer.reset-size2.size10,.ML__mathlive .sizing.reset-size2.size10{font-size:3.55714286em}.ML__mathlive .fontsize-ensurer.reset-size3.size1,.ML__mathlive .sizing.reset-size3.size1{font-size:.625em}.ML__mathlive .fontsize-ensurer.reset-size3.size2,.ML__mathlive .sizing.reset-size3.size2{font-size:.875em}.ML__mathlive .fontsize-ensurer.reset-size3.size3,.ML__mathlive .sizing.reset-size3.size3{font-size:1em}.ML__mathlive .fontsize-ensurer.reset-size3.size4,.ML__mathlive .sizing.reset-size3.size4{font-size:1.125em}.ML__mathlive .fontsize-ensurer.reset-size3.size5,.ML__mathlive .sizing.reset-size3.size5{font-size:1.25em}.ML__mathlive .fontsize-ensurer.reset-size3.size6,.ML__mathlive .sizing.reset-size3.size6{font-size:1.5em}.ML__mathlive .fontsize-ensurer.reset-size3.size7,.ML__mathlive .sizing.reset-size3.size7{font-size:1.8em}.ML__mathlive .fontsize-ensurer.reset-size3.size8,.ML__mathlive .sizing.reset-size3.size8{font-size:2.1625em}.ML__mathlive .fontsize-ensurer.reset-size3.size9,.ML__mathlive .sizing.reset-size3.size9{font-size:2.5875em}.ML__mathlive .fontsize-ensurer.reset-size3.size10,.ML__mathlive .sizing.reset-size3.size10{font-size:3.1125em}.ML__mathlive .fontsize-ensurer.reset-size4.size1,.ML__mathlive .sizing.reset-size4.size1{font-size:.55555556em}.ML__mathlive .fontsize-ensurer.reset-size4.size2,.ML__mathlive .sizing.reset-size4.size2{font-size:.77777778em}.ML__mathlive .fontsize-ensurer.reset-size4.size3,.ML__mathlive .sizing.reset-size4.size3{font-size:.88888889em}.ML__mathlive .fontsize-ensurer.reset-size4.size4,.ML__mathlive .sizing.reset-size4.size4{font-size:1em}.ML__mathlive .fontsize-ensurer.reset-size4.size5,.ML__mathlive .sizing.reset-size4.size5{font-size:1.11111111em}.ML__mathlive .fontsize-ensurer.reset-size4.size6,.ML__mathlive .sizing.reset-size4.size6{font-size:1.33333333em}.ML__mathlive .fontsize-ensurer.reset-size4.size7,.ML__mathlive .sizing.reset-size4.size7{font-size:1.6em}.ML__mathlive .fontsize-ensurer.reset-size4.size8,.ML__mathlive .sizing.reset-size4.size8{font-size:1.92222222em}.ML__mathlive .fontsize-ensurer.reset-size4.size9,.ML__mathlive .sizing.reset-size4.size9{font-size:2.3em}.ML__mathlive .fontsize-ensurer.reset-size4.size10,.ML__mathlive .sizing.reset-size4.size10{font-size:2.76666667em}.ML__mathlive .fontsize-ensurer.reset-size5.size1,.ML__mathlive .sizing.reset-size5.size1{font-size:.5em}.ML__mathlive .fontsize-ensurer.reset-size5.size2,.ML__mathlive .sizing.reset-size5.size2{font-size:.7em}.ML__mathlive .fontsize-ensurer.reset-size5.size3,.ML__mathlive .sizing.reset-size5.size3{font-size:.8em}.ML__mathlive .fontsize-ensurer.reset-size5.size4,.ML__mathlive .sizing.reset-size5.size4{font-size:.9em}.ML__mathlive .fontsize-ensurer.reset-size5.size5,.ML__mathlive .sizing.reset-size5.size5{font-size:1em}.ML__mathlive .fontsize-ensurer.reset-size5.size6,.ML__mathlive .sizing.reset-size5.size6{font-size:1.2em}.ML__mathlive .fontsize-ensurer.reset-size5.size7,.ML__mathlive .sizing.reset-size5.size7{font-size:1.44em}.ML__mathlive .fontsize-ensurer.reset-size5.size8,.ML__mathlive .sizing.reset-size5.size8{font-size:1.73em}.ML__mathlive .fontsize-ensurer.reset-size5.size9,.ML__mathlive .sizing.reset-size5.size9{font-size:2.07em}.ML__mathlive .fontsize-ensurer.reset-size5.size10,.ML__mathlive .sizing.reset-size5.size10{font-size:2.49em}.ML__mathlive .fontsize-ensurer.reset-size6.size1,.ML__mathlive .sizing.reset-size6.size1{font-size:.41666667em}.ML__mathlive .fontsize-ensurer.reset-size6.size2,.ML__mathlive .sizing.reset-size6.size2{font-size:.58333333em}.ML__mathlive .fontsize-ensurer.reset-size6.size3,.ML__mathlive .sizing.reset-size6.size3{font-size:.66666667em}.ML__mathlive .fontsize-ensurer.reset-size6.size4,.ML__mathlive .sizing.reset-size6.size4{font-size:.75em}.ML__mathlive .fontsize-ensurer.reset-size6.size5,.ML__mathlive .sizing.reset-size6.size5{font-size:.83333333em}.ML__mathlive .fontsize-ensurer.reset-size6.size6,.ML__mathlive .sizing.reset-size6.size6{font-size:1em}.ML__mathlive .fontsize-ensurer.reset-size6.size7,.ML__mathlive .sizing.reset-size6.size7{font-size:1.2em}.ML__mathlive .fontsize-ensurer.reset-size6.size8,.ML__mathlive .sizing.reset-size6.size8{font-size:1.44166667em}.ML__mathlive .fontsize-ensurer.reset-size6.size9,.ML__mathlive .sizing.reset-size6.size9{font-size:1.725em}.ML__mathlive .fontsize-ensurer.reset-size6.size10,.ML__mathlive .sizing.reset-size6.size10{font-size:2.075em}.ML__mathlive .fontsize-ensurer.reset-size7.size1,.ML__mathlive .sizing.reset-size7.size1{font-size:.34722222em}.ML__mathlive .fontsize-ensurer.reset-size7.size2,.ML__mathlive .sizing.reset-size7.size2{font-size:.48611111em}.ML__mathlive .fontsize-ensurer.reset-size7.size3,.ML__mathlive .sizing.reset-size7.size3{font-size:.55555556em}.ML__mathlive .fontsize-ensurer.reset-size7.size4,.ML__mathlive .sizing.reset-size7.size4{font-size:.625em}.ML__mathlive .fontsize-ensurer.reset-size7.size5,.ML__mathlive .sizing.reset-size7.size5{font-size:.69444444em}.ML__mathlive .fontsize-ensurer.reset-size7.size6,.ML__mathlive .sizing.reset-size7.size6{font-size:.83333333em}.ML__mathlive .fontsize-ensurer.reset-size7.size7,.ML__mathlive .sizing.reset-size7.size7{font-size:1em}.ML__mathlive .fontsize-ensurer.reset-size7.size8,.ML__mathlive .sizing.reset-size7.size8{font-size:1.20138889em}.ML__mathlive .fontsize-ensurer.reset-size7.size9,.ML__mathlive .sizing.reset-size7.size9{font-size:1.4375em}.ML__mathlive .fontsize-ensurer.reset-size7.size10,.ML__mathlive .sizing.reset-size7.size10{font-size:1.72916667em}.ML__mathlive .fontsize-ensurer.reset-size8.size1,.ML__mathlive .sizing.reset-size8.size1{font-size:.28901734em}.ML__mathlive .fontsize-ensurer.reset-size8.size2,.ML__mathlive .sizing.reset-size8.size2{font-size:.40462428em}.ML__mathlive .fontsize-ensurer.reset-size8.size3,.ML__mathlive .sizing.reset-size8.size3{font-size:.46242775em}.ML__mathlive .fontsize-ensurer.reset-size8.size4,.ML__mathlive .sizing.reset-size8.size4{font-size:.52023121em}.ML__mathlive .fontsize-ensurer.reset-size8.size5,.ML__mathlive .sizing.reset-size8.size5{font-size:.57803468em}.ML__mathlive .fontsize-ensurer.reset-size8.size6,.ML__mathlive .sizing.reset-size8.size6{font-size:.69364162em}.ML__mathlive .fontsize-ensurer.reset-size8.size7,.ML__mathlive .sizing.reset-size8.size7{font-size:.83236994em}.ML__mathlive .fontsize-ensurer.reset-size8.size8,.ML__mathlive .sizing.reset-size8.size8{font-size:1em}.ML__mathlive .fontsize-ensurer.reset-size8.size9,.ML__mathlive .sizing.reset-size8.size9{font-size:1.19653179em}.ML__mathlive .fontsize-ensurer.reset-size8.size10,.ML__mathlive .sizing.reset-size8.size10{font-size:1.43930636em}.ML__mathlive .fontsize-ensurer.reset-size9.size1,.ML__mathlive .sizing.reset-size9.size1{font-size:.24154589em}.ML__mathlive .fontsize-ensurer.reset-size9.size2,.ML__mathlive .sizing.reset-size9.size2{font-size:.33816425em}.ML__mathlive .fontsize-ensurer.reset-size9.size3,.ML__mathlive .sizing.reset-size9.size3{font-size:.38647343em}.ML__mathlive .fontsize-ensurer.reset-size9.size4,.ML__mathlive .sizing.reset-size9.size4{font-size:.43478261em}.ML__mathlive .fontsize-ensurer.reset-size9.size5,.ML__mathlive .sizing.reset-size9.size5{font-size:.48309179em}.ML__mathlive .fontsize-ensurer.reset-size9.size6,.ML__mathlive .sizing.reset-size9.size6{font-size:.57971014em}.ML__mathlive .fontsize-ensurer.reset-size9.size7,.ML__mathlive .sizing.reset-size9.size7{font-size:.69565217em}.ML__mathlive .fontsize-ensurer.reset-size9.size8,.ML__mathlive .sizing.reset-size9.size8{font-size:.83574879em}.ML__mathlive .fontsize-ensurer.reset-size9.size9,.ML__mathlive .sizing.reset-size9.size9{font-size:1em}.ML__mathlive .fontsize-ensurer.reset-size9.size10,.ML__mathlive .sizing.reset-size9.size10{font-size:1.20289855em}.ML__mathlive .fontsize-ensurer.reset-size10.size1,.ML__mathlive .sizing.reset-size10.size1{font-size:.20080321em}.ML__mathlive .fontsize-ensurer.reset-size10.size2,.ML__mathlive .sizing.reset-size10.size2{font-size:.2811245em}.ML__mathlive .fontsize-ensurer.reset-size10.size3,.ML__mathlive .sizing.reset-size10.size3{font-size:.32128514em}.ML__mathlive .fontsize-ensurer.reset-size10.size4,.ML__mathlive .sizing.reset-size10.size4{font-size:.36144578em}.ML__mathlive .fontsize-ensurer.reset-size10.size5,.ML__mathlive .sizing.reset-size10.size5{font-size:.40160643em}.ML__mathlive .fontsize-ensurer.reset-size10.size6,.ML__mathlive .sizing.reset-size10.size6{font-size:.48192771em}.ML__mathlive .fontsize-ensurer.reset-size10.size7,.ML__mathlive .sizing.reset-size10.size7{font-size:.57831325em}.ML__mathlive .fontsize-ensurer.reset-size10.size8,.ML__mathlive .sizing.reset-size10.size8{font-size:.69477912em}.ML__mathlive .fontsize-ensurer.reset-size10.size9,.ML__mathlive .sizing.reset-size10.size9{font-size:.8313253em}.ML__mathlive .fontsize-ensurer.reset-size10.size10,.ML__mathlive .sizing.reset-size10.size10{font-size:1em}.ML__mathlive .delimsizing.size1{font-family:KaTeX_Size1}.ML__mathlive .delimsizing.size2{font-family:KaTeX_Size2}.ML__mathlive .delimsizing.size3{font-family:KaTeX_Size3}.ML__mathlive .delimsizing.size4{font-family:KaTeX_Size4}.ML__mathlive .delimsizing.mult .delim-size1{font-family:KaTeX_Size1;vertical-align:top}.ML__mathlive .delimsizing.mult .delim-size4{font-family:KaTeX_Size4;vertical-align:top}.ML__mathlive .nulldelimiter{width:.12em}.ML__mathlive .op-symbol{position:relative}.ML__mathlive .op-symbol.small-op{font-family:KaTeX_Size1}.ML__mathlive .op-symbol.large-op{font-family:KaTeX_Size2}.ML__mathlive .op-limits .vlist>span{text-align:center}.ML__mathlive .op-over-under>.vlist>span:first-child,.ML__mathlive .op-over-under>.vlist>span:last-child{text-align:center}.ML__mathlive .accent>.vlist>span{text-align:center}.ML__mathlive .accent .accent-body>span{font-family:KaTeX_Main;width:0}.ML__mathlive .accent .accent-body.accent-vec>span{position:relative;left:.326em}.ML__mathlive .mtable .vertical-separator{display:inline-block;margin:0 -.025em;border-right:.05em solid}.ML__mathlive .mtable .arraycolsep{display:inline-block}.ML__mathlive .mtable .col-align-m>.vlist{text-align:center}.ML__mathlive .mtable .col-align-c>.vlist{text-align:center}.ML__mathlive .mtable .col-align-l>.vlist{text-align:left}.ML__mathlive .mtable .col-align-r>.vlist{text-align:right}.ML__error{background-image:radial-gradient(ellipse at center,#cc0041,transparent 70%);background-repeat:repeat-x;background-size:3px 3px;background-position:0 98%}.ML__placeholder{opacity:.7;padding-left:.4ex;padding-right:.4ex;padding-top:.4ex}';class as{constructor(e,t){this.stylesheets=[],this.config=Oa({namespace:"",substituteTextArea:void 0,readOnly:!1,createHTML:e=>e,fontsDirectory:"./fonts",defaultMode:"math",macros:R,horizontalSpacingScale:1,letterShapeStyle:"auto",smartMode:!1,smartFence:!0,smartSuperscript:!0,scriptDepth:[1/0,1/0],removeExtraneousParentheses:!0,ignoreSpacebarInMathMode:!0,locale:"auto",strings:{},keybindings:li,overrideDefaultInlineShortcuts:!1,inlineShortcuts:{},inlineShortcutTimeout:0,virtualKeyboardToggleGlyph:'<span style="width: 21px; margin-top: 4px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M528 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h480c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm16 336c0 8.823-7.177 16-16 16H48c-8.823 0-16-7.177-16-16V112c0-8.823 7.177-16 16-16h480c8.823 0 16 7.177 16 16v288zM168 268v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm96 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm96 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm96 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm-336 80v-24c0-6.627-5.373-12-12-12H84c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm384 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zM120 188v-24c0-6.627-5.373-12-12-12H84c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm96 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm96 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm96 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm96 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm-96 152v-8c0-6.627-5.373-12-12-12H180c-6.627 0-12 5.373-12 12v8c0 6.627 5.373 12 12 12h216c6.627 0 12-5.373 12-12z"/></svg></span>',virtualKeyboardMode:"auto",virtualKeyboards:"all",virtualKeyboardLayout:"auto",customVirtualKeyboardLayers:{},customVirtualKeyboards:{},virtualKeyboardTheme:/android|cros/i.test(null===navigator||void 0===navigator?void 0:navigator.userAgent)?"material":"apple",keypressVibration:!0,keypressSound:null,plonkSound:null,textToSpeechRules:"mathlive",textToSpeechMarkup:"",textToSpeechRulesOptions:{},speechEngine:"local",speechEngineVoice:"Joanna",speechEngineRate:"100%",speakHook:Na,readAloudHook:Na,onAnnounce:Ea,onKeystroke:()=>!0,onMoveOutOf:()=>!0,onTabOutOf:()=>!0,onBlur:Na,onFocus:Na,onContentWillChange:Na,onContentDidChange:Na,onSelectionWillChange:Na,onSelectionDidChange:Na,onUndoStateWillChange:Na,onUndoStateDidChange:Na,onModeChange:Na,onVirtualKeyboardToggle:Na,onReadAloudStatus:Na,onError:()=>{}},t),this.element=e,e.mathfield=this,this.originalContent=e.innerHTML;let i=this.element.textContent;i&&(i=i.trim()),ot(this.config.fontsDirectory,this.config.onError),this.stylesheets.push(nt(e,is)),this.stylesheets.push(nt(e,'@-webkit-keyframes ML__caret-blink{0%,to{opacity:1}50%{opacity:0}}@keyframes ML__caret-blink{0%,to{opacity:1}50%{opacity:0}}.ML__caret:after{content:"";border:none;border-radius:2px;border-right:2px solid var(--caret);margin-right:-2px;position:relative;left:-1px;-webkit-animation:ML__caret-blink 1.05s step-end infinite forwards;animation:ML__caret-blink 1.05s step-end infinite forwards}.ML__text-caret:after{content:"";border:none;border-radius:1px;border-right:1px solid var(--caret);margin-right:-1px;position:relative;left:0;-webkit-animation:ML__caret-blink 1.05s step-end infinite forwards;animation:ML__caret-blink 1.05s step-end infinite forwards}.ML__command-caret:after{content:"_";border:none;margin-right:-1ex;position:relative;color:var(--caret);-webkit-animation:ML__caret-blink 1.05s step-end infinite forwards;animation:ML__caret-blink 1.05s step-end infinite forwards}.ML__fieldcontainer{display:flex;flex-flow:row;justify-content:space-between;align-items:flex-end;min-height:39px;touch-action:none;width:100%;--hue:212;--highlight:hsl(var(--hue),97%,85%);--caret:hsl(var(--hue),40%,49%);--highlight-inactive:#ccc;--primary:hsl(var(--hue),40%,50%);--secondary:hsl(var(--hue),19%,26%);--on-secondary:hsl(var(--hue),19%,26%)}@media (prefers-color-scheme:dark){body:not([theme=light]) .ML__fieldcontainer{--highlight:hsl(var(--hue),40%,49%);--highlight-inactive:hsl(var(--hue),10%,35%);--caret:hsl(var(--hue),97%,85%);--secondary:hsl(var(--hue),25%,35%);--on-secondary:#fafafa}}body[theme=dark] .ML__fieldcontainer{--highlight:hsl(var(--hue),40%,49%);--highlight-inactive:hsl(var(--hue),10%,35%);--caret:hsl(var(--hue),97%,85%);--secondary:hsl(var(--hue),25%,35%);--on-secondary:#fafafa}.ML__fieldcontainer:focus{outline:2px solid var(--primary);outline-offset:3px}.ML__fieldcontainer__field{align-self:center;position:relative;overflow:hidden;line-height:0;padding:2px;width:100%}.ML__virtual-keyboard-toggle{display:flex;align-self:center;align-items:center;flex-shrink:0;flex-direction:column;justify-content:center;width:34px;height:34px;padding:0;margin-right:4px;cursor:pointer;box-sizing:border-box;border-radius:50%;border:1px solid transparent;transition:background .2s cubic-bezier(.64,.09,.08,1);color:var(--primary);fill:currentColor;background:transparent}.ML__virtual-keyboard-toggle:hover{background:hsl(var(--hue),25%,35%);color:#fafafa;fill:currentColor;border-radius:50%;box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12),0 3px 1px -2px rgba(0,0,0,.2)}.ML__popover{visibility:hidden;min-width:160px;background-color:rgba(97,97,97,.95);color:#fff;text-align:center;border-radius:6px;position:fixed;z-index:1;display:flex;flex-direction:column;justify-content:center;box-shadow:0 14px 28px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.22);transition:all .2s cubic-bezier(.64,.09,.08,1)}.ML__popover:after{content:"";position:absolute;top:-5px;left:calc(50% - 3px);width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;font-size:1rem;border-bottom:5px solid rgba(97,97,97,.9)}.ML__popover--reverse-direction:after{top:auto;bottom:-5px;border-top:5px solid rgba(97,97,97,.9);border-bottom:0}.ML__textarea__textarea{transform:scale(0);resize:none;position:absolute;clip:rect(0 0 0 0);width:1px;height:1px;font-size:16px}.ML__focused .ML__text{background:hsla(var(--hue),40%,50%,.1)}.ML__smart-fence__close{opacity:.5}.ML__selection{background:var(--highlight-inactive);box-sizing:border-box}.ML__focused .ML__selection{background:var(--highlight)!important;color:var(--on-highlight)}.ML__contains-caret.ML__close,.ML__contains-caret.ML__open,.ML__contains-caret>.ML__close,.ML__contains-caret>.ML__open,.sqrt.ML__contains-caret>.sqrt-sign,.sqrt.ML__contains-caret>.vlist>span>.sqrt-line{color:var(--caret)}.ML__command{font-family:IBM Plex Mono,Source Code Pro,Consolas,Roboto Mono,Menlo,Bitstream Vera Sans Mono,DejaVu Sans Mono,Monaco,Courier,monospace;letter-spacing:-1px;font-weight:400;line-height:1em;color:var(--primary)}:not(.ML__command)+.ML__command{margin-left:.25em}.ML__command+:not(.ML__command){padding-left:.25em}.ML__suggestion{opacity:.5}.ML__virtual-keyboard-toggle.pressed{background:hsla(0,0%,70%,.5)}.ML__virtual-keyboard-toggle:focus{outline:none;border-radius:50%;border:2px solid var(--primary)}.ML__virtual-keyboard-toggle.active,.ML__virtual-keyboard-toggle.active:hover{background:hsla(0,0%,70%,.5);color:#000;fill:currentColor}.ML__scroller{position:fixed;z-index:1;top:0;height:100vh;width:200px}[data-tooltip]{position:relative}[data-tooltip][data-placement=top]:after{top:inherit;bottom:100%}[data-tooltip]:after{position:absolute;visibility:hidden;content:attr(data-tooltip);display:inline-table;top:110%;width:-webkit-max-content;width:-moz-max-content;width:max-content;max-width:200px;padding:8px;background:#616161;color:#fff;text-align:center;z-index:2;box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12),0 3px 1px -2px rgba(0,0,0,.2);border-radius:2px;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;font-weight:400;font-size:12px;opacity:0;transform:scale(.5);transition:all .15s cubic-bezier(.4,0,1,1)}@media only screen and (max-width:767px){[data-tooltip]:after{height:32px;padding:4px 16px;font-size:14px}}[data-tooltip]:hover{position:relative}[data-tooltip]:hover:after{visibility:visible;opacity:1;transform:scale(1)}[data-tooltip][data-delay]:after{transition-delay:0s}[data-tooltip][data-delay]:hover:after{transition-delay:1s}'));let a="";this.config.substituteTextArea?"string"==typeof this.config.substituteTextArea?a+=this.config.substituteTextArea:a+="<span></span>":/android|ipad|ipod|iphone/i.test(null===navigator||void 0===navigator?void 0:navigator.userAgent)?a+="<span class='ML__textarea'>\n                <span class='ML__textarea__textarea'\n                    tabindex=\"0\" role=\"textbox\"\n                    style='display:inline-block;height:1px;width:1px' >\n                </span>\n            </span>":a+='<span class="ML__textarea"><textarea class="ML__textarea__textarea" autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false" aria-hidden="true" tabindex="0"></textarea></span>',a+='<span class="ML__fieldcontainer"><span class="ML__fieldcontainer__field"></span>',"manual"===this.config.virtualKeyboardMode?(a+=`<div class="ML__virtual-keyboard-toggle" role="button" data-tooltip="${za("tooltip.toggle virtual keyboard")}">`,this.config.virtualKeyboardToggleGlyph?a+=this.config.virtualKeyboardToggleGlyph:a+='<span style="width: 21px; margin-top: 4px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M528 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h480c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm16 336c0 8.823-7.177 16-16 16H48c-8.823 0-16-7.177-16-16V112c0-8.823 7.177-16 16-16h480c8.823 0 16 7.177 16 16v288zM168 268v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm96 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm96 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm96 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm-336 80v-24c0-6.627-5.373-12-12-12H84c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm384 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zM120 188v-24c0-6.627-5.373-12-12-12H84c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm96 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm96 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm96 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm96 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm-96 152v-8c0-6.627-5.373-12-12-12H180c-6.627 0-12 5.373-12 12v8c0 6.627 5.373 12 12 12h216c6.627 0 12-5.373 12-12z"/></svg></span>',a+="</div>"):a+="<span ></span>",a+="</span>",a+='\n        <div class="ML__sr-only">\n            <span aria-live="assertive" aria-atomic="true"></span>\n            <span></span>\n        </div>\n    ',this.element.innerHTML=this.config.createHTML(a);let r=0;"function"==typeof this.config.substituteTextArea?this.textarea=this.config.substituteTextArea():this.textarea=this.element.children[r++].firstElementChild,this.field=this.element.children[r].children[0],this.field.addEventListener("wheel",e=>{e.preventDefault(),e.stopPropagation();const t=void 0===e.deltaX?e.detail:-e.deltaX;isFinite(t)&&this.field.scroll({top:0,left:this.field.scrollLeft-5*t});},{passive:!1}),this.virtualKeyboardToggleDOMNode=this.element.children[r++].children[1],ki(this,this.virtualKeyboardToggleDOMNode,{default:"toggleVirtualKeyboard",alt:"toggleVirtualKeyboardAlt",shift:"toggleVirtualKeyboardShift"}),this.ariaLiveText=this.element.children[r].children[0],this.accessibleNode=this.element.children[r++].children[1],this.popover=gi("mathlive-popover-panel","ML__popover"),this.stylesheets.push(nt(e,"div.ML__popover.is-visible{visibility:inherit;-webkit-animation:ML__fade-in .15s cubic-bezier(0,0,.2,1);animation:ML__fade-in .15s cubic-bezier(0,0,.2,1)}@-webkit-keyframes ML__fade-in{0%{opacity:0}to{opacity:1}}@keyframes ML__fade-in{0%{opacity:0}to{opacity:1}}.ML__popover__content{border-radius:6px;padding:2px;cursor:pointer;min-height:100px;display:flex;flex-direction:column;justify-content:center;margin-left:8px;margin-right:8px}.ML__popover__content a{color:#5ea6fd;padding-top:.3em;margin-top:.4em;display:block}.ML__popover__content a:hover{color:#5ea6fd;text-decoration:underline}.ML__popover__content.active,.ML__popover__content.pressed,.ML__popover__content:hover{background:hsla(0,0%,100%,.1)}.ML__popover__command{font-size:1.6rem}.ML__popover__prev-shortcut{height:31px;opacity:.1;cursor:pointer;margin-left:8px;margin-right:8px;padding-top:4px;padding-bottom:2px}.ML__popover__next-shortcut:hover,.ML__popover__prev-shortcut:hover{opacity:.3}.ML__popover__next-shortcut.active,.ML__popover__next-shortcut.pressed,.ML__popover__prev-shortcut.active,.ML__popover__prev-shortcut.pressed{opacity:1}.ML__popover__next-shortcut>span,.ML__popover__prev-shortcut>span{padding:5px;border-radius:50%;width:20px;height:20px;display:inline-block}.ML__popover__prev-shortcut>span>span{margin-top:-2px;display:block}.ML__popover__next-shortcut>span>span{margin-top:2px;display:block}.ML__popover__next-shortcut:hover>span,.ML__popover__prev-shortcut:hover>span{background:hsla(0,0%,100%,.1)}.ML__popover__next-shortcut{height:34px;opacity:.1;cursor:pointer;margin-left:8px;margin-right:8px;padding-top:2px;padding-bottom:4px}.ML__popover__shortcut{font-size:.8em;margin-top:.25em}.ML__popover__note,.ML__popover__shortcut{font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;opacity:.7;padding-top:.25em}.ML__popover__note{font-size:.8rem;line-height:1em;padding-left:.5em;padding-right:.5em}.ML__shortcut-join{opacity:.5}")),this.keystrokeCaption=gi("mathlive-keystroke-caption-panel","ML__keystroke-caption"),this.stylesheets.push(nt(e,".ML__keystroke-caption{visibility:hidden;background:var(--secondary);border-color:var(--secondary-border);box-shadow:0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23);text-align:center;border-radius:6px;padding:16px;position:absolute;z-index:1;display:flex;flex-direction:row;justify-content:center;--keystroke:#fff;--on-keystroke:#555;--keystroke-border:#f7f7f7}@media (prefers-color-scheme:dark){body:not([theme=light]) .ML__keystroke-caption{--keystroke:hsl(var(--hue),50%,30%);--on-keystroke:#fafafa;--keystroke-border:hsl(var(--hue),50%,25%)}}body[theme=dark] .ML__keystroke-caption{--keystroke:hsl(var(--hue),50%,30%);--on-keystroke:#fafafa;--keystroke-border:hsl(var(--hue),50%,25%)}.ML__keystroke-caption>span{min-width:14px;margin:0 8px 0 0;padding:4px;background-color:var(--keystroke);color:var(--on-keystroke);fill:currentColor;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;font-size:1em;border-radius:6px;border:2px solid var(--keystroke-border)}")),this.keystrokeCaptionVisible=!1,this.virtualKeyboardVisible=!1,this.keystrokeBuffer="",this.keystrokeBufferStates=[],this.keystrokeBufferResetTimer=null,this.suggestionIndex=0,this.mode=this.config.defaultMode,this.smartModeSuppressed=!1,this.style={},this.blurred=!0,ui(this.element,"focus",this),ui(this.element,"blur",this),ui(this.textarea,"cut",this),ui(this.textarea,"copy",this),ui(this.textarea,"paste",this),function(e,t){let i,a=null,r=null,s=!1,o=!1;function n(e){clearTimeout(i),i=setTimeout((function(){clearTimeout(i),e();}));}function l(){if(function(e){return e.selectionStart!==e.selectionEnd}(e))return;const i=e.value;e.value="",i.length>0&&t.typedText(i);}const c=e;c.addEventListener("keydown",i=>{if(t.allowDeadKey()||"Dead"!==i.key&&"Unidentified"!==i.key&&229!==i.keyCode)o=!1;else {o=!0,s=!1;const i=t.blur,a=t.focus;t.blur=null,t.focus=null,"function"==typeof e.blur&&(e.blur(),e.focus()),t.blur=i,t.focus=a;}return !(!s&&"CapsLock"!==i.code&&!/(Control|Meta|Alt|Shift)(Right|Left)/.test(i.code))||(a=i,r=null,t.keystroke(ba(i),i))},!0),c.addEventListener("keypress",e=>{s||(a&&r&&t.keystroke(ba(a),a),r=e,n(l));},!0),c.addEventListener("keyup",()=>{s||!a||r||l();},!0),c.addEventListener("paste",()=>{e.focus();const i=e.value;e.value="",i.length>0&&t.paste(i);},!0),c.addEventListener("blur",()=>{a=null,r=null,t.blur&&t.blur();},!0),c.addEventListener("focus",()=>{t.focus&&t.focus();},!0),c.addEventListener("compositionstart",()=>{s=!0;},!0),c.addEventListener("compositionend",()=>{s=!1,o&&t.allowDeadKey()&&n(l);},!0),c.addEventListener("input",()=>{if(o){const i=t.blur,a=t.focus;t.blur=null,t.focus=null,e.blur(),e.focus(),t.blur=i,t.focus=a,o=!1,s=!1,t.allowDeadKey()&&n(l);}else s||n(l);});}(this.textarea,{allowDeadKey:()=>"text"===this.mode,typedText:e=>Va(this,e),paste:()=>Xa(this),keystroke:(e,t)=>Wa(this,e,t),focus:()=>this._onFocus(),blur:()=>this._onBlur()}),window.PointerEvent?ui(this.field,"pointerdown",this):ui(this.field,"touchstart:active mousedown",this),ui(window,"resize",this),this.model=new xt({mode:this.config.defaultMode,macros:this.config.macros,removeExtraneousParentheses:this.config.removeExtraneousParentheses},{onContentDidChange:e=>this.config.onContentDidChange(this),onSelectionDidChange:e=>this._onSelectionDidChange(),onContentWillChange:()=>this.config.onContentWillChange(this),onSelectionWillChange:()=>this.config.onSelectionWillChange(this),onError:this.config.onError},{announce:(e,t,i,a)=>{var r,s;return null===(s=(r=this.config).onAnnounce)||void 0===s?void 0:s.call(r,this,t,i,a)},moveOut:(e,t)=>this.config.onMoveOutOf(this,t),tabOut:(e,t)=>this.config.onTabOutOf(this,t)},this),this.undoManager=new xa(this.model),ha(this.model,i,{insertionMode:"replaceAll",selectionMode:"after",format:"latex",mode:"math",suppressChangeNotifications:!0,macros:this.config.macros}),this.undoManager.startRecording(),this.undoManager.snapshot(this.config),this.model.setListeners({onContentDidChange:e=>this.config.onContentDidChange(this),onSelectionDidChange:e=>this._onSelectionDidChange(),onContentWillChange:()=>this.config.onContentWillChange(this),onSelectionWillChange:()=>this.config.onSelectionWillChange(this),onError:this.config.onError}),this.model.setHooks({announce:(e,t,i,a)=>{var r,s;return null===(s=(r=this.config).onAnnounce)||void 0===s?void 0:s.call(r,this,t,i,a)},moveOut:(e,t)=>this.config.onMoveOutOf(this,t),tabOut:(e,t)=>this.config.onTabOutOf(this,t)}),this.config.locale.startsWith(ni().locale)||oi(this.config.locale),this.keybindings=pi(this.config.keybindings,e=>{"function"==typeof this.config.onError&&this.config.onError({code:"invalid-keybinding",arg:e.join("\n")});}),ji(this);}$setConfig(e){this.config=Oa(this.config,e),this.model.setListeners({onContentDidChange:e=>this.config.onContentDidChange(this),onSelectionDidChange:e=>this._onSelectionDidChange(),onContentWillChange:()=>this.config.onContentWillChange(this),onSelectionWillChange:()=>this.config.onSelectionWillChange(this),onError:this.config.onError}),this.model.setHooks({announce:(e,t,i,a)=>{var r,s;return null===(s=(r=this.config).onAnnounce)||void 0===s?void 0:s.call(r,this,t,i,a)},moveOut:(e,t)=>this.config.onMoveOutOf(this,t),tabOut:(e,t)=>this.config.onTabOutOf(this,t)}),this.config.locale.startsWith(ni().locale)||oi(this.config.locale),this.keybindings=pi(this.config.keybindings,e=>{"function"==typeof this.config.onError&&this.config.onError({code:"invalid-keybinding",arg:e.join("\n")});}),this.config.readOnly||this._onBlur(),ji(this);}getConfig(e){return Ra(this.config,e)}handleEvent(e){switch(e.type){case"focus":this._onFocus();break;case"blur":this._onBlur();break;case"touchstart":case"mousedown":case"pointerdown":!function(e,t){const i=e;let a,r=!1,s=!1,o=!1;if(1!==t.buttons&&0!==t.buttons)return;let n=!1,l=!1;const c=t.touches?t.touches[0].clientX:t.clientX,d=t.touches?t.touches[0].clientY:t.clientY,m=Date.now(),h=setInterval(()=>{n?i.field.scroll({top:0,left:i.field.scrollLeft-16}):l&&i.field.scroll({top:0,left:i.field.scrollLeft+16});},32);function p(e){window.PointerEvent?(fi(i.field,"pointermove",u),fi(i.field,"pointerup pointercancel",p),i.field.releasePointerCapture(e.pointerId)):(fi(i.field,"touchmove",u),fi(i.field,"touchcancel touchend",p),fi(window,"mousemove",u),fi(window,"mouseup blur",p)),r=!1,clearInterval(h),i.element.querySelectorAll(".ML__scroller").forEach(e=>e.parentNode.removeChild(e)),e.preventDefault(),e.stopPropagation();}function u(t){const r=t.touches?t.touches[0].clientX:t.clientX,o=t.touches?t.touches[0].clientY:t.clientY,h="touch"===t.pointerType?20:5;if(Date.now()<m+500&&Math.abs(c-r)<h&&Math.abs(d-o)<h)return t.preventDefault(),void t.stopPropagation();const p=i.field.getBoundingClientRect();l=r>p.right,n=r<p.left;let u=a;window.PointerEvent?t.isPrimary||(u=Ya(i,t.clientX,t.clientY,{bias:0})):t.touches&&2===t.touches.length&&(u=Ya(i,t.touches[1].clientX,t.touches[1].clientY,{bias:0}));const f=Ya(i,r,o,{bias:r<=c?r===c?0:-1:1});f&&Xt(i.model,u,f,{extendToWordBoundary:s})&&ji(e),t.preventDefault(),t.stopPropagation();}Za&&Math.abs(Za.x-c)<5&&Math.abs(Za.y-d)<5&&Date.now()<Za.time+500?(Ga+=1,Za.time=m):(Za={x:c,y:d,time:m},Ga=1);const f=e.field.getBoundingClientRect();if(c>=f.left&&c<=f.right&&d>=f.top&&d<=f.bottom){e.$hasFocus()||(o=!0,e.textarea.focus&&e.textarea.focus()),e.resetKeystrokeBuffer(),e.smartModeSuppressed=!1;const n=e.field.querySelector(".ML__mathlive").getBoundingClientRect();if(a=c>n.right?[{relation:"body",offset:e.model.root.body.length-1}]:Ya(e,c,d,{bias:0}),a){let n=document.createElement("div");n.className="ML__scroller",e.element.appendChild(n),n.style.left=f.left-200+"px",n=document.createElement("div"),n.className="ML__scroller",e.element.appendChild(n),n.style.left=f.right+"px",t.shiftKey?(Xt(e.model,e.model.path,a),a=ut(e.model.path),a[a.length-1].offset-=1):Zt(e.model,a,0),o=!0,e.style={},3===t.detail||Ga>2?(p(t),3!==t.detail&&3!==Ga||Pt(e.model)):r||(r=!0,window.PointerEvent?(ui(i.field,"pointermove",u),ui(i.field,"pointerup pointercancel",p),i.field.setPointerCapture(t.pointerId)):(ui(window,"blur",p),t.touches?(ui(t.target,"touchmove",u),ui(t.target,"touchcancel touchend",p)):(ui(window,"mousemove",u),ui(window,"mouseup",p))),2!==t.detail&&2!==Ga||(s=!0,Rt(e.model)));}}else Za=null;o&&ji(e),t.preventDefault();}(this,e);break;case"resize":this.resizeTimer&&window.cancelAnimationFrame(this.resizeTimer),this.resizeTimer=window.requestAnimationFrame(()=>bi(this)&&this._onResize());break;case"cut":t=this,setTimeout(function(){t.$clearSelection(),ji(t);}.bind(t),0);break;case"copy":!function(e,t){It(e.model)?(t.clipboardData.setData("text/plain","$$"+e.$text("latex-expanded")+"$$"),t.clipboardData.setData("application/json",e.$text("json")),t.clipboardData.setData("application/xml",e.$text("mathML"))):(t.clipboardData.setData("text/plain","$$"+e.$selectedText("latex-expanded")+"$$"),t.clipboardData.setData("application/json",e.$selectedText("json")),t.clipboardData.setData("application/xml",e.$selectedText("mathML"))),t.preventDefault();}(this,e);break;case"paste":Xa(this);}var t;}$revertToOriginalContent(){this.element.innerHTML=this.config.createHTML(this.originalContent),delete this.element.mathfield,delete this.accessibleNode,delete this.ariaLiveText,delete this.field,fi(this.textarea,"cut",this),fi(this.textarea,"copy",this),fi(this.textarea,"paste",this),this.textarea.remove(),delete this.textarea,this.virtualKeyboardToggleDOMNode.remove(),delete this.virtualKeyboardToggleDOMNode,yi(this.popover),delete this.popover,yi(this.keystrokeCaption),delete this.keystrokeCaption,yi(this.virtualKeyboard),delete this.virtualKeyboard,yi(document.getElementById("mathlive-alternate-keys-panel")),fi(this.element,"pointerdown",this),fi(this.element,"touchstart:active mousedown",this),fi(this.element,"focus",this),fi(this.element,"blur",this),fi(window,"resize",this),delete this.element,this.stylesheets.forEach(e=>e.release());}resetKeystrokeBuffer(){this.keystrokeBuffer="",this.keystrokeBufferStates=[],clearTimeout(this.keystrokeBufferResetTimer);}_onSelectionDidChange(){!function(e){const t=Lt(e);if(t){const i=e.siblings(),a=e.anchorOffset()+1;for(let e=t.start;e<a;e++)i[e]&&(i[e].isSuggestion=!1);}}(this.model);const t=It(this.model)?"":Be("math",Ot(this.model)).toLatex(!1),i=this.textarea;t?(i.value=t,this.$hasFocus()&&i.select&&i.select()):(i.value="",i.setAttribute("aria-label",""));{const t=this.mode;this.mode=St(this.model)||this.config.defaultMode,this.mode!==t&&"function"==typeof this.config.onModeChange&&this.config.onModeChange(this,this.mode),"command"===t&&"command"!==this.mode&&(Li(this),function(t){wt(t);const i=t.suppressChangeNotifications;t.suppressChangeNotifications=!0,function t(i){if(i)if(e(i))for(let e=i.length-1;e>=0;e--)"command"===i[e].type?i.splice(e,1):t(i[e]);else if(t(i.body),t(i.superscript),t(i.subscript),t(i.underscript),t(i.overscript),t(i.numer),t(i.denom),t(i.index),i.array)for(let e=bt(i.array);e>=0;e--)t(yt(i.array,e));}(t.root.body),t.suppressChangeNotifications=i,Mt(t);}(this.model));}Mi(this,{deferred:!0}),"function"==typeof this.config.onSelectionDidChange&&this.config.onSelectionDidChange(this);}_onFocus(){this.config.readOnly||this.blurred&&(this.blurred=!1,this.textarea.focus&&this.textarea.focus(),"onfocus"===this.config.virtualKeyboardMode&&mr(this),Mi(this),this.config.onFocus&&this.config.onFocus(this),ji(this));}_onBlur(){this.blurred||(this.blurred=!0,this.ariaLiveText.textContent="","onfocus"===this.config.virtualKeyboardMode&&hr(this),Sa(this,{discard:!0}),ji(this),this.config.onBlur&&this.config.onBlur(this));}_onResize(){this.element.classList.remove("ML__isNarrowWidth","ML__isWideWidth","ML__isExtendedWidth"),window.innerWidth>=1024?this.element.classList.add("ML__isExtendedWidth"):window.innerWidth>=768?this.element.classList.add("ML__isWideWidth"):this.element.classList.add("ML__isNarrowWidth"),Mi(this);}$perform(t){return function(t,i){var a;if(!i)return !1;let r,s=[],o=!1,n=!1;if(e(i)?(r=i[0],s=i.slice(1)):r=i,r=r.replace(/-\w/g,e=>e[1].toUpperCase()),"model"===(null===(a=Zi[r])||void 0===a?void 0:a.target)){if(/^(delete|transpose|add)/.test(r)&&t.resetKeystrokeBuffer(),/^(delete|transpose|add)/.test(r)&&"command"!==t.mode&&(t.popUndoStack(),t.snapshot()),Zi[r].fn(t.model,...s),/^(delete|transpose|add)/.test(r)&&"command"!==t.mode&&t.snapshot(),/^(delete)/.test(r)&&"command"===t.mode){const e=re(Si(t.model));0===e.length?Li(t):wi(t,e[0].match,e.length>1);}n=!0,o=!0;}else {if(!Zi[r])throw Error('Unknown command "'+r+'"');n=Zi[r].fn(t,...s),o=!0;}return It(t.model)&&!/^(transpose|paste|complete|((moveToNextChar|moveToPreviousChar|extend).*))_$/.test(r)||(t.resetKeystrokeBuffer(),t.style={}),n&&ji(t),o}(this,t)}formatMathlist(e,t){let i="";if("latex"===(t=t||"latex")||"latex-expanded"===t)i=e.toLatex("latex-expanded"===t);else if("mathML"===t)i=Vi(e,this.config);else if("spoken"===t)i=qa(e,this.config);else if("spoken-text"===t){const t=this.config.textToSpeechMarkup;this.config.textToSpeechMarkup="",i=qa(e,this.config),this.config.textToSpeechMarkup=t;}else if("spoken-ssml"===t||"spoken-ssml-withHighlighting"===t){const t=this.config.textToSpeechMarkup;this.config.textToSpeechMarkup="ssml",i=qa(e,this.config),this.config.textToSpeechMarkup=t;}else if("json"===t){const t=Yr(e);i=JSON.stringify(t);}else if("json-2"===t){const t=Yr(e);i=JSON.stringify(t,null,2);}else "ASCIIMath"===t&&(i=wa(e));return i}$text(e){return this.formatMathlist(this.model.root,e)}$selectedText(e){const t=Ot(this.model);if(!t)return "";const i=Be("math",t);return this.formatMathlist(i,e)}$selectionIsCollapsed(){return It(this.model)}$selectionDepth(){return this.model.path.length}$selectionAtStart(){return 0===this.model.startOffset()}$selectionAtEnd(){return this.model.endOffset()>=this.model.siblings().length-1}groupIsSelected(){return 0===this.model.startOffset()&&this.model.endOffset()>=this.model.siblings().length-1}$latex(e,t){return "string"==typeof e?(e!==this.model.root.toLatex()&&(t=null!=t?t:{mode:"math"},ha(this.model,e,{insertionMode:"replaceAll",selectionMode:"after",format:"latex",mode:"math",suppressChangeNotifications:t.suppressChangeNotifications,macros:this.config.macros}),this.undoManager.snapshot(this.config),ji(this)),e):this.model.root.toLatex()}$el(){return this.element}scrollIntoView(){var e;this.dirty&&Xi(this);let t=null===(e=vi(this.field))||void 0===e?void 0:e.x;const i=this.field.getBoundingClientRect();if(void 0===t){const e=xi(this.field);e&&(t=e.right+i.left-this.field.scrollLeft);}if(void 0!==t){const e=t-window.scrollX;e<i.left?this.field.scroll({top:0,left:e-i.left+this.field.scrollLeft-20,behavior:"smooth"}):e>i.right&&this.field.scroll({top:0,left:e-i.right+this.field.scrollLeft+20,behavior:"smooth"});}}$insert(e,t){if("string"==typeof e&&e.length>0){if((t=null!=t?t:{mode:"math"}).focus&&this.$focus(),t.feedback&&(this.config.keypressVibration&&(null===navigator||void 0===navigator?void 0:navigator.vibrate)&&navigator.vibrate(3),this.keypressSound&&(this.keypressSound.load(),this.keypressSound.play())),"\\\\"===e)ea(this.model);else if("&"===e)ta(this.model);else {const i=this.style;ha(this.model,e,{mode:this.mode,style:Ct(this.model),...t}),t.resetStyle&&(this.style=i);}return this.undoManager.snapshot(this.config),ji(this),!0}return !1}switchMode(e,t="",i=""){this.resetKeystrokeBuffer(),this.smartModeSuppressed=/text|math/.test(this.mode)&&/text|math/.test(e),t&&this.$insert(t,{format:"latex",mode:{math:"text",text:"math"}[e]}),Ci(this.model,!1),"command"===e?(ct(this.model),Li(this),this.suggestionIndex=0,this.virtualKeyboardVisible&&dr(this,"lower-command"),ha(this.model,"",{mode:"math"})):this.mode=e,i&&this.$insert(i,{format:"latex",mode:e}),"function"==typeof this.config.onModeChange&&this.config.onModeChange(this,this.mode),ji(this);}$hasFocus(){return document.hasFocus()&&function e(t=document){var i,a;return (null===(a=null===(i=t.activeElement)||void 0===i?void 0:i.shadowRoot)||void 0===a?void 0:a.activeElement)?e(t.activeElement.shadowRoot):t.activeElement}(document)===this.textarea}$focus(){this.$hasFocus()||("function"==typeof this.textarea.focus&&this.textarea.focus(),this.model.announce("line"));}$blur(){this.$hasFocus()&&this.textarea.blur&&this.textarea.blur();}$select(){Pt(this.model);}$clearSelection(){aa(this.model);}$applyStyle(e){ma(this.model,e);}$keystroke(e,t){return Wa(this,e,t)}$typedText(e){Va(this,e);}canUndo(){return this.undoManager.canUndo()}canRedo(){return this.undoManager.canRedo()}popUndoStack(){this.undoManager.pop();}snapshot(){this.undoManager.snapshot({...this.config,onUndoStateDidChange:(e,t)=>{cr(this),this.config.onUndoStateDidChange(e,t);}});}snapshotAndCoalesce(){this.undoManager.snapshotAndCoalesce({...this.config,onUndoStateDidChange:(e,t)=>{cr(this),this.config.onUndoStateDidChange(e,t);}});}getUndoRecord(){return this.undoManager.save()}restoreToUndoRecord(e){this.undoManager.restore(e,{...this.config,suppressChangeNotifications:!0});}undo(){return this.undoManager.undo({...this.config,onUndoStateDidChange:(e,t)=>{cr(this),this.config.onUndoStateDidChange(e,t);}})}redo(){return this.undoManager.redo({...this.config,onUndoStateDidChange:(e,t)=>{cr(this),this.config.onUndoStateDidChange(e,t);}})}}function rs(e,t,i){let a=i,r=0;const s=e.length;for(;a<t.length;){const i=t[a];if(r<=0&&t.slice(a,a+s)===e)return a;"\\"===i?a++:"{"===i?r++:"}"===i&&r--,a++;}return -1}function ss(e,t,i,a){const r=[];for(let s=0;s<e.length;s++)if("text"===e[s].type){const o=e[s].data;let n,l=!0,c=0;n=o.indexOf(t),-1!==n&&(c=n,c>0&&r.push({type:"text",data:o.slice(0,c)}),l=!1);let d=!1;for(;!d;){if(l){if(n=o.indexOf(t,c),-1===n){d=!0;break}c!==n&&r.push({type:"text",data:o.slice(c,n)}),c=n;}else {if(n=rs(i,o,c+t.length),-1===n){d=!0;break}r.push({type:"math",data:o.slice(c+t.length,n),rawData:o.slice(c,n+i.length),mathstyle:a}),c=n+i.length;}l=!l;}c<o.length&&r.push({type:"text",data:o.slice(c)});}else r.push(e[s]);return r}function os(e,t){let i=[{type:"text",data:e}];for(let e=0;e<t.inline.length;e++){const a=t.inline[e];i=ss(i,a[0],a[1],"textstyle");}for(let e=0;e<t.display.length;e++){const a=t.display[e];i=ss(i,a[0],a[1],"displaystyle");}return i}function ns(e,t,i,a){const r=function(e,t,i,a){let r=document.createElement("span");r.setAttribute("aria-hidden","true"),t.preserveOriginalContent&&(r.setAttribute("data-"+t.namespace+"original-content",e),i&&r.setAttribute("data-"+t.namespace+"original-mathstyle",i));try{ot(t.fontsDirectory),nt(null,is);const a=t.renderToMarkup(e,{mathstyle:null!=i?i:"displaystyle",format:"html",macros:t.macros});r.innerHTML=t.createHTML?t.createHTML(a):a;}catch(t){if(!a)return null;r=document.createTextNode(e);}return r}(e,i,t,a);if(r&&/\b(mathml|speakable-text)\b/i.test(i.renderAccessibleContent)){const t=document.createDocumentFragment();if(/\bmathml\b/i.test(i.renderAccessibleContent)&&i.renderToMathML&&t.appendChild(function(e,t){const i=document.createElement("span");try{const a="<math xmlns='http://www.w3.org/1998/Math/MathML'>"+t.renderToMathML(e,t)+"</math>";i.innerHTML=t.createHTML?t.createHTML(a):a;}catch(t){i.textContent=e;}return i.className="ML__sr-only",i}(e,i)),/\bspeakable-text\b/i.test(i.renderAccessibleContent)&&i.renderToSpeakableText){const a=document.createElement("span"),r=i.renderToSpeakableText(e,i);a.innerHTML=i.createHTML?i.createHTML(r):r,a.className="ML__sr-only",t.appendChild(a);}return t.appendChild(r),t}return r}function ls(e,t){let i=null;if(t.TeX.processEnvironments&&/^\s*\\begin/.test(e))i=document.createDocumentFragment(),i.appendChild(ns(e,void 0,t,!0));else {if(!e.trim())return null;const a=os(e,t.TeX.delimiters);if(1===a.length&&"text"===a[0].type)return null;i=document.createDocumentFragment();for(let e=0;e<a.length;e++)"text"===a[e].type?i.appendChild(document.createTextNode(a[e].data)):i.appendChild(ns(a[e].data,a[e].mathstyle,t,!0));}return i}const cs={namespace:"",skipTags:["noscript","style","textarea","pre","code","annotation","annotation-xml"],processScriptType:"math/tex",ignoreClass:"tex2jax_ignore",processClass:"tex2jax_process",preserveOriginalContent:!0,renderAccessibleContent:"mathml",TeX:{processEnvironments:!0,delimiters:{inline:[["\\(","\\)"]],display:[["$$","$$"],["\\[","\\]"]]}}};function ds(e,t){if(!e)return null;let i=null;Array.isArray(t)&&(i=t.slice(),t=i.shift());let a=null;if("number"==typeof t&&t<e.length)return i&&i.length>0?ds(e[t].children,i):e[t];if("string"==typeof t){for(let r=0;r<e.length;r++){if(e[r].body===t)return i&&i.length>0?ds(e[r].children,i):e[r];if(a=ds(e[r].children,t),a)return a}return a}return null}function ms(e,t){var i;const a=ds(e,t);return a?null!==(i=a.classes)&&void 0!==i?i:"":null}function hs(e,t){let i="";return e[t]&&(i+='<span class="styleprop">'+t+"=</span>",i+='<span class="stylevalue">',i+=e[t],i+='</span>" '),i}var ps={mathlistToMarkup:function e(t,i=""){if(!t)return "";let a="";if(Array.isArray(t))for(let r=0;r<t.length;r++)a+=e(t[r],r+"."+i);else if(a="<br>"+i,t.type&&(a+='<span class="type',a+=t.isSelected?" selected":"",a+=t.caret?" caret":"",a+='">'+t.type+(t.caret?" caret ":"")+"</span>"),"string"==typeof t.body&&t.body.length>0&&(a+='&nbsp;<span class="value">',a+=t.body,(t.body.charCodeAt(0)<32||t.body.charCodeAt(0)>127)&&(a+="&nbsp;U+"+("000000"+t.body.charCodeAt(0).toString(16)).substr(-6)),a+="</span>&nbsp;"),"mathrm"===t.fontFamily?(a+='<span style="opacity:.2">',a+=hs(t,"fontFamily"),a+="</span>"):a+=hs(t,"fontFamily"),a+=hs(t,"hasBarLine"),a+=hs(t,"leftDelim"),a+=hs(t,"rightDelim"),a+=hs(t,"continuousFraction"),a+=hs(t,"limits"),a+=hs(t,"symbol"),a+=function(e,t){let i="";return e.framecolor&&(i+='<span class="styleprop">framecolor=</span>',i+='<span style="font-size:2em;vertical-align:middle;color:'+e.framecolor+'">&#9632;</span>',i+='<span class="stylevalue">',i+=e.framecolor,i+="</span>"),i}(t),a+=hs(t,"mathstyle"),a+=hs(t,"size"),a+=hs(t,"cls"),a+=hs(t,"delim"),a+=hs(t,"shift"),a+=hs(t,"width"),a+=hs(t,"height"),a+=hs(t,"position"),a+=e(t.overscript,i+"↑"),a+=e(t.underscript,i+"↓"),a+=e(t.superscript,i+"↑"),a+=e(t.subscript,i+"↓"),a+=e(t.body,i+"▶"),a+=e(t.numer,i+"▲"),a+=e(t.denom,i+"▼"),t.array)for(let r=0;r<t.array.length;r++){a+="<br>"+i+"⌗ row "+(r+1)+"/"+t.array.length;for(let s=0;s<t.array[r].length;s++)a+=e(t.array[r][s],i+"⌗〉");}return a},spanToMarkup:function e(t,i=""){let a="";if(Array.isArray(t))for(let r=0;r<t.length;r++)a+=e(t[r],i);else if(t)if(a="<br>"+i,t.classes.includes("fontsize-ensurer"))a+="FONTSIZE-ENSURER";else {if(t.type&&(a+='<span class="type">'+t.type+"</span>"),t.body&&t.body.length>0&&(a+='<span class="value">'+t.body+"</span>"),t.classes&&t.classes.length>0&&(a+='&nbsp;<span class="classes">'+t.classes+"</span>"),t.isTight&&(a+='&nbsp;<span class="stylevalue"> tight </span>'),t.caret&&(a+='&nbsp;<span class="stylevalue"> caret </span>'),t.style)for(const e in t.style)Object.prototype.hasOwnProperty.call(t.style,e)&&(a+='&nbsp;<span class="styleprop">'+e+":</span>",a+='<span class="stylevalue"> '+t.style[e]+"</span>;&nbsp;");t.children&&(a+=t.children.map(t=>e(t,i+"▷")).join("; "));}return a},spanToString:function e(t,i=""){let a="";if(Array.isArray(t))if(0===t.length)a+="[]\n";else {a+="[\n";for(let r=0;r<t.length;r++)a+=e(t[r],"\t"+i+r+","),a+=r<t.length-1?",\n":"\n";a+=i+"]\n";}else {if(a=i+"{\n",t.type&&(a+=i+'type:"'+t.type+'",\n'),t.body&&t.body.length>0&&(a+=i+'body:"'+t.body+'",\n'),t.classes&&t.classes.length>0&&(a+=i+'classes:"'+t.classes+'",\n'),t.style)for(const e in t.style)Object.prototype.hasOwnProperty.call(t.style,e)&&(a+=i+e+':"',a+=t.style[e]+'",\n');t.children&&t.children.length>0&&(a+=i+"children:"+t.children.map(t=>e(t,i)).join("; ")),a+=i+"}";}return a},hasClass:function(e,t,i){const a=ms(e,t);if(!a)return !1;const r=a.split(" ");for(let e=0;e<r.length;e++)if(r[e]===i)return !0;return !1},getClasses:ms,getProp:function(e,t,i){const a=ds(e,t);return a?a[i]:null},getStyle:function(e,t,i){const a=ds(e,t);return (null==a?void 0:a.style)?a.style[i]:null},getType:function(e,t){const i=ds(e,t);return i?i.type:null},latexToAsciiMath:function(e,t="math"){return wa(st(e,t,null,null))},asciiMathToLatex:function(e){const[,t]=oa(e,{format:"ASCIIMath"});return t},FUNCTIONS:B,MATH_SYMBOLS:N,TEXT_SYMBOLS:I,ENVIRONMENTS:O,MACROS:R,INLINE_SHORTCUTS:ra,DEFAULT_KEYBINDINGS:li,getKeybindingMarkup:hi};function us(e,t,i){var a;if(!window)return;if(!i&&window.mathlive&&(i=window.mathlive.config),"amazon"!==(i=null!=i?i:{}).speechEngine)return void(i.speakHook&&i.speakHook(t,i));if(!window.AWS)return;const r=new window.AWS.Polly({apiVersion:"2016-06-10"}),s={OutputFormat:"json",VoiceId:i.speechEngineVoice||"Joanna",Engine:"standard",Text:t,TextType:"ssml",SpeechMarkTypes:["ssml"]};window.mathlive=null!==(a=window.mathlive)&&void 0!==a?a:{},window.mathlive.readAloudElement=e;const o=i.onReadAloudStatus||window.mathlive.onReadAloudStatus;r.synthesizeSpeech(s,(e,t)=>{if(e)return;if(!t||!t.AudioStream)return;const i=new TextDecoder("utf-8").decode(new Uint8Array(t.AudioStream));window.mathlive.readAloudMarks=i.split("\n").map(e=>e?JSON.parse(e):{}),window.mathlive.readAloudTokens=[];for(const e of window.mathlive.readAloudMarks)e.value&&window.mathlive.readAloudTokens.push(e.value);window.mathlive.readAloudCurrentMark="",s.OutputFormat="mp3",s.SpeechMarkTypes=[],r.synthesizeSpeech(s,(function(e,t){if(e)return;if(!t||!t.AudioStream)return;const i=new Uint8Array(t.AudioStream),a=new Blob([i.buffer],{type:"audio/mpeg"}),r=URL.createObjectURL(a);window.mathlive.readAloudAudio?window.mathlive.readAloudAudio.pause():(window.mathlive.readAloudAudio=new Audio,window.mathlive.readAloudAudio.addEventListener("ended",()=>{const e=window.mathlive.readAloudMathField;o&&o(e,"ended"),e?(Xi(e),window.mathlive.readAloudElement=null,window.mathlive.readAloudMathField=null,window.mathlive.readAloudTokens=[],window.mathlive.readAloudMarks=[],window.mathlive.readAloudCurrentMark=""):function e(t){if(t.classList.remove("ML__highlight"),t.children)for(const i of t.children)e(i);}(window.mathlive.readAloudElement);}),window.mathlive.readAloudAudio.addEventListener("timeupdate",()=>{let e="";const t=1e3*window.mathlive.readAloudAudio.currentTime+100;for(const i of window.mathlive.readAloudMarks)i.time<t&&(e=i.value);window.mathlive.readAloudCurrentMark!==e&&(window.mathlive.readAloudCurrentToken=e,e&&e===window.mathlive.readAloudFinalToken?window.mathlive.readAloudAudio.pause():(window.mathlive.readAloudCurrentMark=e,function e(t,i){var a;i&&(null===(a=t.dataset)||void 0===a?void 0:a.atomId)!==i?(t.classList.remove("ML__highlight"),t.children&&t.children.length>0&&Array.from(t.children).forEach(t=>{e(t,i);})):(t.classList.add("ML__highlight"),t.children&&t.children.length>0&&Array.from(t.children).forEach(t=>{e(t);}));}(window.mathlive.readAloudElement,window.mathlive.readAloudCurrentMark)));})),window.mathlive.readAloudAudio.src=r,o&&o(window.mathlive.readAloudMathField,"playing"),window.mathlive.readAloudAudio.play();}));});}function fs(e,t,i=3e3,a="$0"){t.forEach(t=>{N[t]&&(N[t].frequency=i,N[t].category=e,N[t].template=a.replace(/\$0/g,t)),B[t]&&(B[t]={...B[t],frequency:i,category:e,template:a.replace(/\$0/g,t)});});}function gs(e,t){var i;(t=null!=t?t:{}).mathstyle=t.mathstyle||"displaystyle",t.letterShapeStyle=t.letterShapeStyle||"auto",t.macros={...R,...null!==(i=t.macros)&&void 0!==i?i:{}};const a=st(e,"math",null,t.macros,!1,t.onError);let r=Ne({mathstyle:c[t.mathstyle],letterShapeStyle:t.letterShapeStyle},a);return r=function e(t){if(!t||0===t.length)return [];t[0].children=e(t[0].children);const i=[t[0]];for(let a=1;a<t.length;a++)i[i.length-1].tryCoalesceWith(t[a])||(t[a].children=e(t[a].children),i.push(t[a]));return i}(r),"span"===t.format?r:D(A(r,"ML__base"),"ML__mathlive").toMarkup()}function ys(e,t){var i;return (t=null!=t?t:{}).macros={...R,...null!==(i=t.macros)&&void 0!==i?i:{}},Vi(st(e,"math",[],t.macros,!1,t.onError),t)}function bs(e,t){var i;return (t=null!=t?t:{}).macros=null!==(i=t.macros)&&void 0!==i?i:{},Object.assign(t.macros,R),qa(st(e,"math",null,t.macros,!1,t.onError),t)}function vs(e){if("string"==typeof e){const t=document.getElementById(e);if(!t)throw Error(`The element with ID "${e}" could not be found.`);return t}return e}function xs(e,t){var i,a;(t=null!=t?t:{}).renderToMarkup=null!==(i=t.renderToMarkup)&&void 0!==i?i:gs,t.renderToMathML=null!==(a=t.renderToMathML)&&void 0!==a?a:ys,t.renderToSpeakableText=t.renderToSpeakableText||bs,t.macros=t.macros||R,function(e,t){try{if((t={...cs,...t}).ignoreClassPattern=new RegExp(t.ignoreClass),t.processClassPattern=new RegExp(t.processClass),t.processScriptTypePattern=new RegExp(t.processScriptType),t.macros=R,t.namespace){if(!/^[a-z]+[-]?$/.test(t.namespace))throw Error("options.namespace must be a string of lowercase characters only");/-$/.test(t.namespace)||(t.namespace+="-");}!function e(t,i){const a=t.getAttribute("data-"+i.namespace+"original-content");if(a){const e=ns(a,t.getAttribute("data-"+i.namespace+"mathstyle"),i,!1);null!=e&&(t.textContent="",t.appendChild(e));}else {if(1===t.childNodes.length&&3===t.childNodes[0].nodeType){const e=t.childNodes[0].textContent;if(i.TeX.processEnvironments&&/^\s*\\begin/.test(e))return t.textContent="",void t.appendChild(ns(e,void 0,i,!0));const a=os(e,i.TeX.delimiters);if(1===a.length&&"math"===a[0].type)return t.textContent="",void t.appendChild(ns(a[0].data,a[0].mathstyle,i,!0));if(1===a.length&&"text"===a[0].type)return}for(let a=0;a<t.childNodes.length;a++){const r=t.childNodes[a];if(3===r.nodeType){const e=ls(r.textContent,i);e&&(a+=e.childNodes.length-1,t.replaceChild(e,r));}else if(1===r.nodeType){const a=r.nodeName.toLowerCase();if("script"===a&&i.processScriptTypePattern.test(r.type)){let e="displaystyle";for(const t of r.type.split(";")){const i=t.split("=");"mode"===i[0].toLowerCase()&&(e="display"===i[1].toLoweCase()?"displaystyle":"textstyle");}const t=ns(r.textContent,e,i,!0);r.parentNode.replaceChild(t,r);}else if("script"!==a&&(i.processClassPattern.test(r.className)||!i.skipTags.includes(a)&&!i.ignoreClassPattern.test(r.className)))if(1===t.childNodes.length&&3===t.childNodes[0].nodeType){const e=t.textContent;t.textContent="",t.appendChild(ns(e,"displaystyle",i,!0));}else e(r,i);}}}}(e,t);}catch(e){}}(vs(e),t);}function ks(e){if(e.namespace){if(!/^[a-z]+[-]?$/.test(e.namespace))throw Error("options.namespace must be a string of lowercase characters only");/-$/.test(e.namespace)||(e.namespace+="-");}}fs("Trigonometry",["\\cos","\\sin","\\tan"],4e3),fs("Trigonometry",["\\arcsin","\\arccos","\\arctan","\\arctg","\\arcctg","\\arcsec","\\arccsc","\\arsinh","\\arcosh","\\artanh","\\arcsech","\\arccsch","\\arg","\\ch","\\cosec","\\cosh","\\cot","\\cotg","\\coth","\\csc","\\ctg","\\cth","\\lg","\\lb","\\sec","\\sinh","\\sh","\\tanh","\\tg","\\th"],2e3),fs("Functions",["\\ln","\\log","\\exp","\\lim"],4e3),fs("Functions",["\\dim","\\ker","\\deg","\\det","\\mod","\\min","\\max"],3e3),fs("Functions",["\\hom"],1200),fs("Decoration",["\\rule"],200,"$0{2em}{1em}"),fs("Decoration",["\\color","\\textcolor"],200,"{$0{m0}A}{$0{m1}B}{$0{m2}C }{$0{m3}a}{$0{m4}b}{$0{m5}c}{$0{m6}8}"),fs("Decoration",["\\overline","\\underline"],3e3,"$0{\\placeholder{}}"),fs("Decoration",["\\enclose"],1200,'\\enclose{updiagonalstrike,roundedbox}[1px solid red, mathbackground="#fbc0bd"]{x=0}'),fs("Decoration",["\\fcolorbox"],1200,'\\fcolorbox{#cd0030}{#ffd400}{\\unicode{"2B1A}}'),fs("Decoration",["\\colorbox"],1200,'\\colorbox{#fbc0bd}{\\unicode{"2B1A}}'),fs("Decoration",["\\boxed","\\cancel","\\bcancel","\\xcancel"],1200,"$0{\\placeholder{}}"),fs("Decoration",["\\bbox"],1200,'\\bbox[#ffd400, solid 2px #ffd400]{\\unicode{"2B1A}}'),fs("Styling",["\\mathbb"],4e3,"$0{Don Knuth}"),fs("Styling",["\\textbf","\\textup","\\textit","\\textrm","\\textsf","\\texttt","\\textnormal","\\textmd","\\textsl","\\textsc","\\mathsf","\\mathtt","\\mathrm","\\mathfrak","\\mathcal","\\mathscr","\\mathbf","\\mathmd","\\mathit","\\text","\\mbox","\\Bbb","\\bold","\\bm","\\boldsymbol"],3e3,"$0{Don Knuth}"),fs("Styling",["\\frak","\\tt","\\bf","\\it","\\rmfamily","\\sffamily","\\ttfamily","\\class","\\cssId"],1200,"{$0 Don Knuth}"),fs("Styling",["\\bfseries","\\mdseries","\\upshape","\\slshape","\\scshape"],1200,"\\text{$0 Don Knuth}"),fs("Styling",["\\class","\\cssId"],1200,"$0{testIdentifier}{Don Knuth}"),fs("Styling",["\\fontseries"],1200,"\\text{$0{b}Don Knuth}"),fs("Styling",["\\fontfamily"],1200,"\\text{$0{cmtt}Don Knuth}"),fs("Styling",["\\fontshape"],1200,"\\text{$0{sc}Don Knuth}"),fs("Styling",["\\selectfont"],1200,"\\text{$0}"),fs("Styling",["\\emph"],1200,"Don$0{Knuth}"),fs("Styling",["\\em"],1200,"Don{$0 Knuth}"),fs("Layout",["\\mathop","\\mathbin","\\mathrel","\\mathopen","\\mathclose","\\mathpunct","\\mathord","\\mathinner","\\operatorname","\\operatorname*"],1200,"x=$0{arg}=0"),fs("Layout",["\\middle"],1200,"\\left\\{x$0|x>0\\right\\}"),fs("Layout",["\\overset","\\underset","\\stackrel","\\stackbin"],1200,"$0{arg}{x=0}"),fs("Layout",["\\rlap","\\mathrlap"],1200,"$0{/}0"),fs("Layout",["\\llap","\\mathllap"],1200,"o$0{/}"),fs("Fractions",["\\frac"],4e3,"$0{\\placeholder{}}{\\placeholder{}}"),fs("Fractions",["\\binom","\\dfrac","\\tfrac","\\dbinom","\\tbinom","\\pdiff","\\cfrac"],1200,"$0{\\placeholder{}}{\\placeholder{}}"),fs("Fractions",["\\over","\\atop","\\choose"],1200,'\\unicode{"2B1A} $0 \\unicode{"2B1A}'),fs("Fractions",["\\overwithdelims","\\atopwithdelims"],1200,'{\\unicode{"2B1A} $0{\\lbrace}{\\rbrace} \\unicode{"2B1A}}'),fs("Extensible Operators",["\\sum","\\prod","\\bigcap","\\bigcup","\\int"],4e3),fs("Extensible Operators",["\\bigoplus","\\smallint","\\iint","\\oint"],3e3),fs("Extensible Operators",["\\bigwedge","\\bigvee","\\coprod","\\bigsqcup","\\bigotimes","\\bigodot","\\biguplus","\\intop","\\sqcup","\\sqcap","\\uplus","\\wr","\\Cap","\\Cup","\\doublecap","\\doublecup","\\amalg","\\iiint","\\oiint","\\oiiint","\\intclockwise","\\varointclockwise","\\ointctrclockwise","\\intctrclockwise"],1200),fs("Accents",["\\vec"],4e3),fs("Accents",["\\bar","\\ddot","\\acute","\\tilde","\\check"],3e3,"$0{\\placeholder{}}"),fs("Accents",["\\^","\\`","\\'"],1200,"$0{e}"),fs("Accents",["\\c"],1200,"$0{c}"),fs("Accents",["\\~"],1200,"$0{n}"),fs("Accents",["\\mathring","\\hat","\\dot","\\breve","\\grave"],1200,"$0{\\placeholder{}}"),fs("Extensible Symbols",["\\overrightarrow","\\overleftarrow","\\Overrightarrow","\\overleftharpoon","\\overrightharpoon","\\overleftrightarrow","\\overbrace","\\overlinesegment","\\overgroup","\\widehat","\\widecheck","\\widetilde"],3e3,"$0{ABC}"),fs("Extensible Symbols",["\\underrightarrow","\\underleftarrow","\\underleftrightarrow","\\underbrace","\\underlinesegment","\\undergroup","\\utilde"],3e3,"$0{ABC}"),fs("Sizing",["\\tiny","\\scriptsize","\\footnotesize","\\small","\\normalsize","\\large","\\Large","\\LARGE","\\huge","\\Huge"],1200,"$0{x=0}"),fs("Sizing",["\\big","\\Big","\\bigg","\\Bigg"],1200,"$0($0)"),fs("Sizing",["\\bigl","\\Bigl","\\biggl","\\Biggl"],1200,"$0("),fs("Sizing",["\\bigr","\\Bigr","\\biggr","\\Biggr"],1200,"$0)"),fs("Sizing",["\\bigm","\\Bigm","\\biggm","\\Biggm"],1200,"$0|"),fs("Letterlike Symbols",["\\nabla","\\partial","\\doubleStruckCapitalN","\\N","\\doubleStruckCapitalR","\\R","\\doubleStruckCapitalQ","\\Q","\\doubleStruckCapitalC","\\C","\\doubleStruckCapitalZ","\\Z","\\exponentialE","\\forall","\\exists","\\nexists","\\$","\\%","\\And","\\degree"],4e3),fs("Letterlike Symbols",["\\doubleStruckCapitalP","\\P","\\ell","\\hbar","\\hslash","\\imath","\\jmath","\\imaginaryI","\\imaginaryJ","\\differentialD","\\rd","\\capitalDifferentialD","\\rD","\\differencedelta","\\mid","@","\\Re","\\Im"],3e3),fs("Letterlike Symbols",["\\top","\\bot","\\scriptCapitalE","\\scriptCapitalH","\\scriptCapitalL","\\gothicCapitalC","\\gothicCapitalH","\\gothicCapitalI","\\gothicCapitalR","\\Bbbk","\\Finv","\\Game","\\wp","\\eth","\\mho","\\pounds","\\yen","\\euro"],1200),fs("Crosses",["\\dagger","\\dag"],4e3),fs("Crosses",["\\ddag","\\ddagger","\\maltese","\\textdagger","\\textdaggerdbl"],1200),fs("Various",["\\checkmark","\\diagup","\\diagdown","\\angle","\\measuredangle","\\sphericalangle","\\prime","\\doubleprime","\\backprime","\\backdoubleprime","\\sharp","\\flat","\\natural","\\&","\\#","\\clubsuit","\\spadesuit","\\diamondsuit","\\heartsuit","\\backslash","\\infty","/","\\_","\\/","|","'"],1200),fs("Various",["\\unicode"],1200,'$0{"2B1A}'),fs("Arrows",["\\longrightarrow","\\rightarrow","\\Longrightarrow","\\Rightarrow"],4e3),fs("Arrows",["\\longmapsto","\\mapsto","\\Longleftrightarrow","\\rightleftarrows","\\leftarrow","\\curvearrowleft","\\uparrow","\\downarrow","\\hookrightarrow","\\rightharpoonup","\\rightleftharpoons"],3e3),fs("Arrows",["\\Leftarrow","\\longleftrightarrow","\\longleftarrow","\\Longleftarrow","\\searrow","\\nearrow","\\swarrow","\\nwarrow","\\Uparrow","\\Downarrow","\\updownarrow","\\Updownarrow","\\hookleftarrow","\\leftharpoonup","\\leftharpoondown","\\rightharpoondown","\\leftrightarrows","\\dashrightarrow","\\dashleftarrow","\\leftleftarrows","\\Lleftarrow","\\twoheadleftarrow","\\leftarrowtail","\\looparrowleft","\\leftrightharpoons","\\circlearrowleft","\\Lsh","\\upuparrows","\\downharpoonleft","\\multimap","\\leftrightsquigarrow","\\twoheadrightarrow","\\rightarrowtail","\\looparrowright","\\curvearrowright","\\circlearrowright","\\Rsh","\\downdownarrows","\\upharpoonright","\\downharpoonright","\\rightsquigarrow","\\leadsto","\\Rrightarrow","\\restriction"],1200),fs("Arrows",["\\upharpoonleft","\\rightrightarrows"],0),fs("Negated Arrows",["\\nrightarrow","\\nRightarrow","\\nleftrightarrow","\\nLeftrightarrow","\\nleftarrow","\\nLeftarrow"],1200),fs("Extensible Symbols",["\\xrightarrow","\\xleftarrow","\\xRightarrow","\\xLeftarrow","\\xleftharpoonup","\\xleftharpoondown","\\xrightharpoonup","\\xrightharpoondown","\\xlongequal","\\xtwoheadleftarrow","\\xtwoheadrightarrow","\\xleftrightarrow","\\xLeftrightarrow","\\xrightleftharpoons","\\xleftrightharpoons","\\xhookleftarrow","\\xhookrightarrow","\\xmapsto","\\xtofrom","\\xrightleftarrows","\\xrightequilibrium","\\xleftequilibrium"],1200,"$0[below]{above}=0"),fs("Negated Relations",["\\nless","\\nleqslant","\\lneq","\\lneqq","\\nleqq","\\unlhd","\\unrhd","\\lvertneqq","\\lnsim","\\lnapprox","\\nprec","\\npreceq","\\precnsim","\\precnapprox","\\nsim","\\nshortmid","\\nmid","\\nvdash","\\nvDash","\\ngtr","\\ngeqslant","\\ngeqq","\\gneq","\\gneqq","\\gvertneqq","\\gnsim","\\nsucc","\\succnsim","\\ncong","\\nshortparallel","\\nparallel","\\nVDash","\\nVdash","\\precneqq","\\succneqq","\\gnapprox","\\succnapprox","\\nsucceq"],1200),fs("Hebrew",["\\aleph","\\beth","\\daleth","\\gimel"],1200),fs("Fences",["\\lbrace","\\rbrace","\\vert","\\Vert","\\{","\\}","(",")","[","]"],4e3),fs("Fences",["\\langle","\\rangle","\\lfloor","\\rfloor","\\lceil","\\rceil","\\mvert","\\|","\\mVert"],3e3),fs("Fences",["\\lvert","\\rvert","\\lVert","\\rVert","\\lbrack","\\rbrack","\\ulcorner","\\urcorner","\\llcorner","\\lrcorner","\\lgroup","\\rgroup","\\lmoustache","\\rmoustache"],1200),fs("Relations",["=","\\ne","\\neq","<",">","\\leqslant","\\geqslant","\\approx"],4e3),fs("Relations",["\\lt","\\gt","\\le","\\ge","\\leq","\\geq","\\gg","\\cong","\\equiv","\\prec","\\preceq","\\succ","\\perp","\\parallel","\\propto","\\smile","\\frown","\\sim","\\gtrsim"],3e3),fs("Relations",["\\coloneq","\\succeq","\\approxeq","\\thickapprox","\\lessapprox","\\gtrapprox","\\precapprox","\\succapprox","\\thicksim","\\succsim","\\precsim","\\backsim","\\eqsim","\\backsimeq","\\simeq","\\lesssim","\\nleq","\\ngeq","\\smallsmile","\\smallfrown","\\bowtie","\\asymp","\\leqq","\\eqslantless","\\ll","\\lll","\\lessgtr","\\lesseqgtr","\\lesseqqgtr","\\risingdotseq","\\fallingdotseq","\\preccurlyeq","\\curlyeqprec","\\vDash","\\Vvdash","\\bumpeq","\\Bumpeq","\\geqq","\\eqslantgtr","\\ggg","\\gtrless","\\gtreqless","\\gtreqqless","\\succcurlyeq","\\curlyeqsucc","\\Vdash","\\shortmid","\\shortparallel","\\between","\\pitchfork","\\varpropto","\\backepsilon","\\llless","\\gggtr","\\lhd","\\rhd","\\Join","\\doteq","\\doteqdot","\\Doteq","\\eqcirc","\\circeq","\\lessdot","\\gtrdot","\\measeq","\\eqdef","\\questeq"],1200),fs("Logic",["\\leftrightarrow","\\Leftrightarrow","\\to"],4e3),fs("Logic",["\\models","\\vdash"],3e3),fs("Logic",["\\therefore","\\because","\\implies","\\gets","\\dashv","\\impliedby","\\biconditional","\\roundimplies"],1200),fs("Operators",["+","-","*","\\cdot"],4e3),fs("Operators",["\\sqrt"],4e3,"$0{\\placeholder{}}"),fs("Operators",["\\pm","\\mp","\\times","\\div","\\surd"],3e3),fs("Operators",["\\ltimes","\\rtimes","\\leftthreetimes","\\rightthreetimes","\\intercal","\\dotplus","\\centerdot","\\doublebarwedge","\\divideontimes","\\divides"],1200),fs("Logic",["\\wedge","\\vee","\\neg"],4e3),fs("Logic",["\\lnot"],3e3),fs("Logic",["\\land","\\lor","\\barwedge","\\veebar","\\nor","\\curlywedge","\\curlyvee"],1200),fs("Greek",["\\alpha","\\beta","\\gamma","\\delta","\\epsilon","\\varepsilon","\\zeta","\\eta","\\theta","\\vartheta","\\iota","\\kappa","\\varkappa","\\lambda","\\mu","\\nu","\\xi","\\pi","\\varpi","\\rho","\\varrho","\\sigma","\\varsigma","\\tau","\\phi","\\varphi","\\upsilon","\\chi","\\psi","\\omega","\\Gamma","\\Delta","\\Theta","\\Lambda","\\Xi","\\Pi","\\Sigma","\\Upsilon","\\Phi","\\Psi","\\Omega","\\digamma","\\omicron"],3e3),fs("Sets",["\\emptyset","\\varnothing","\\cap","\\cup","\\in","\\notin","\\subset","\\supset","\\subseteq","\\supseteq","\\sqsubseteq"],4e3),fs("Sets",["\\setminus","\\not","\\ni","\\sqsupseteq","\\nsupseteqq","\\supsetneq","\\varsupsetneq","\\supsetneqq","\\varsupsetneqq"],3e3),fs("Sets",["\\smallsetminus","\\complement","\\owns","\\subsetneq","\\varsubsetneq","\\subsetneqq","\\varsubsetneqq","\\nsubset","\\nsupset","\\nsubseteq","\\nsupseteq","\\nsubseteqq","\\subseteqq","\\Subset","\\sqsubset","\\supseteqq","\\Supset","\\sqsupset"],1200),fs("Spacing",["\\space, \\quad","\\qquad"],3e3,'\\unicode{"203A}$0\\unicode{"2039}'),fs("Spacing",["\\!","\\,","\\:","\\;","\\enskip","\\enspace"],1200,'\\unicode{"203A}$0\\unicode{"2039}'),fs("Spacing",["\\hspace","\\hspace*"],1200,'\\unicode{"203A}$0{1em}\\unicode{"2039}'),fs("Punctuation",["\\colon","\\cdotp","\\ldots","\\cdots","\\ddots","\\vdots","?","!",":",'"',",",".",";"],3e3),fs("Punctuation",["\\mathellipsis","\\ldotp","\\Colon"],1200),fs("Boxes",["\\square","\\Box"],3e3),fs("Boxes",["\\blacksquare","\\boxminus","\\boxplus","\\boxtimes","\\boxdot"],1200),fs("Circles",["\\circ","\\bullet","\\circleddash","\\oplus","\\otimes"],3e3),fs("Circles",["\\bigcirc","\\circledast","\\ominus","\\circledcirc","\\oslash","\\circledS","\\circledR","\\odot"],1200),fs("Triangles",["\\triangle","\\triangleq"],3e3),fs("Triangles",["\\bigtriangleup","\\vartriangle","\\triangledown","\\bigtriangledown","\\triangleleft","\\vartriangleleft","\\trianglelefteq","\\ntriangleleft","\\ntrianglelefteq","\\triangleright","\\vartriangleright","\\trianglerighteq","\\ntriangleright","\\ntrianglerighteq","\\blacktriangle","\\blacktriangledown","\\blacktriangleleft","\\blacktriangleright"],1200),fs("Shapes",["\\ast","\\star"],3e3),fs("Shapes",["\\diamond","\\Diamond","\\lozenge","\\blacklozenge","\\bigstar"],1200);var _s={version:"0.54.1",latexToMarkup:gs,latexToMathML:ys,latexToSpeakableText:bs,latexToAST:function(e,t){var i;return (t=null!=t?t:{}).macros={...R,...null!==(i=t.macros)&&void 0!==i?i:{}},Yr(st(e,"math",null,t.macros,!1,t.onError),t)},astToLatex:function(t,i){return function t(i,a){const r=Object.assign({precision:14,decimalMarker:".",groupSeparator:"\\, ",product:"\\cdot ",exponentProduct:"\\cdot ",exponentMarker:"",arcSeparator:"\\,",scientificNotation:"auto",beginRepeatingDigits:"\\overline{",endRepeatingDigits:"}"},a);let s="";if(void 0===i)return "";if("string"==typeof i)s=i;else if(i.latex)s=i.latex;else if(qr(i)){const e=Dr(i);if(e===-1/0)s="-\\infty ";else if(e===1/0)s="\\infty ";else if("object"!=typeof i.num||"string"!=typeof i.num.re&&"string"!=typeof i.num.im)s=isNaN(e)?"\\text{NaN}":ts(i.num,r);else {const e=Tr(i),t=Kr(i);isNaN(e)||isNaN(t)?s="\\text{NaN}":Math.abs(t)<=Number.EPSILON&&Math.abs(e)<=Number.EPSILON?s="0":(Math.abs(e)>Number.EPSILON&&(s=ts(e,r)),Math.abs(t)>Number.EPSILON&&(Math.abs(e)>Number.EPSILON&&(s+=t>0?"+":""),s+=(1!==Math.abs(t)?ts(t,r):"")+"\\imaginaryI "));}Er(i)&&(s+="^{"+t(i.sup,r)+"}"),Nr(i)&&(s+="_{"+t(i.sub,r)+"}");}else if(i.group)s=t(i.group,r),qr(i.group)||$r(i.group)?0!==Kr(i.group)&&(s=Jr(i.fence||"(),",s)):s=Jr(i.fence||"(),",s),Er(i)&&(s+="^{"+t(i.sup,r)+"}"),Nr(i)&&(s+="_{"+t(i.sub,r)+"}");else if(i.fn)if("bind"===i.fn){if(s=t(br(i,0),r)+"|_{",i.arg&&2===i.arg.length)s+=t(br(i,1));else {let e="";for(let a=1;a<i.arg.length;a+=2)s+=e+t(br(i,a))+" = "+t(br(i,a+1)),e=", ";}s+="}";}else if("divide"===i.fn)s="\\frac{"+t(br(i,0),r)+"}{"+t(br(i,1),r)+"}";else if("negate"===i.fn)s="-"+t(br(i,0),r);else if("subtract"===i.fn)s=t(br(i,0),r)+" - "+t(br(i,1),r);else if("add"!==i.fn&&"multiply"!==i.fn||!e(i.arg))if("list"===i.fn||"list2"===i.fn){const e=[];if(i.arg)for(const a of i.arg)e.push(t(a,r));s=e.join("list2"===i.fn?"; ":", ");}else if("sequence"===i.fn)s=u(i.arg.map(e=>t(e,r)));else if("text"===i.fn)s="\\text{"+(i.arg[0]||"")+"}";else if("pow"===i.fn&&e(i.arg)&&i.arg.length>=2)s=t(br(i,0),r),qr(br(i,0))||$r(br(i,0))||(s=Jr(i.fence||"(),",s)),s+="^{"+t(br(i,1),r)+"}";else if("equal"===i.fn&&i.arg&&i.arg.length>2)s=i.arg.map(e=>t(e,r)).join(" = ");else {const a=function(e){let t=gr[e];return t||(t=e.length>1?"\\operatorname{"+e+"}%^%_ %":e+"%^%_ %"),t}(i.fn);s=a;let o="";if(/%(?![01_^])/.test(a)&&e(i.arg)&&i.arg.length>1)s+=Jr(i.fence||"(),",...i.arg.map(e=>t(e,r)));else if(e(i.arg)&&i.arg.length>0){const e=t(br(i,0),r),n=t(br(i,1),r),l=[...i.arg];/%0/.test(a)&&(s=s.replace("%0",e),l.shift()),/%1/.test(a)&&(s=s.replace("%1",n),l.shift()),l.length>0&&(o=Jr(i.fence||"(),",...l.map(e=>t(e,r))));}else o=Jr(i.fence||"(),","");s=Er(i)?s.replace("%^","^{"+t(i.sup,r)+"}"):s.replace("%^",""),s=Nr(i)?s.replace("%_","_{"+t(i.sub,r)+"}"):s.replace("%_",""),s=s.replace(/%(?![01_^])/,o),s=s.replace("%0","").replace("%1","");}else {const e=[];for(const a of i.arg)"add"===a.fn||"subtract"===a.fn||0!==Tr(o=a)&&0!==Kr(o)||Er(i)&&0!==Kr(a)&&1!==Kr(a)?e.push(Jr("() ",t(a,r))):e.push(t(a,r));if("multiply"===i.fn)s=!i.arg||2!==i.arg.length||!qr(i.arg[0])&&"divide"!==i.arg[0].fn||qr(i.arg[1])&&(0!==Tr(i.arg[1])||1!==Kr(i.arg[1]))?e.join(" \\times "):e[0]+e[1];else if(i.arg&&1===i.arg.length)s="negate"===i.arg[0].fn||qr(i.arg[0])&&Dr(i.arg[0])<0?e[0]:"+"+e[0];else {s=e[0];for(let t=1;t<i.arg.length;t++)"negate"===i.arg[t].fn||qr(i.arg[t])&&Dr(i.arg[t])<0?s+=e[t]:s+=" + "+e[t];}}else if("string"==typeof i.sym){s=$r(i);let e=s.match(/^&#x([0-9a-f]+);$/i);(null==e?void 0:e[1])?s=String.fromCodePoint(parseInt(e[1],16)):(e=s.match(/^&#([0-9]+);$/i),(null==e?void 0:e[1])&&(s=String.fromCodePoint(parseInt(e[1])))),"string"==typeof i.variant&&(s="\\"+{normal:"mathrm","double-struck":"mathbb",bold:"mathbf",fraktur:"mathfrak",script:"mathscr","sans-serif":"mathsf",monospace:"mathtt"}[i.variant]+"{"+s+"}"),Er(i)&&(s+="^{"+t(i.sup,r)+"}"),Nr(i)&&(s+="_{"+t(i.sub,r)+"}");}else "string"==typeof i.text&&(s="\\text{"+i.text+"}");var o;return "string"==typeof i.error&&(s="\\bbox[#F56165]{"+s+"}"),s}("string"==typeof t?JSON.parse(t):t,i)},makeMathField:function(e,t){var i,a;return (t=null!=t?t:{}).speakHook=null!==(i=t.speakHook)&&void 0!==i?i:Ka,t.readAloudHook=null!==(a=t.readAloudHook)&&void 0!==a?a:us,new as(vs(e),t)},renderMathInDocument:function(e){xs(document.body,e);},renderMathInElement:xs,revertToOriginalContent:function(e,t){var i;if(e instanceof as)e.$revertToOriginalContent();else {e=vs(e).children[1],ks(t=null!=t?t:{});const a=e.getAttribute("data-"+(null!==(i=t.namespace)&&void 0!==i?i:"")+"original-content");e.innerHTML=t.createHTML?t.createHTML(a):a;}},getOriginalContent:function(e,t){var i;return e instanceof as?e.originalContent:(e=vs(e).children[1],ks(t=null!=t?t:{}),e.getAttribute("data-"+(null!==(i=t.namespace)&&void 0!==i?i:"")+"original-content"))},readAloud:us,readAloudStatus:function(){var e;return window?(window.mathlive=null!==(e=window.mathlive)&&void 0!==e?e:{},window.mathlive.readAloudAudio?window.mathlive.readAloudAudio.paused?"paused":window.mathlive.readAloudAudio.ended?"ready":"playing":"ready"):"unavailable"},pauseReadAloud:function(){var e;window&&(window.mathlive=null!==(e=window.mathlive)&&void 0!==e?e:{},window.mathlive.readAloudAudio&&(window.mathlive.onReadAloudStatus&&window.mathlive.onReadAloudStatus(window.mathlive.readAloudMathField,"paused"),window.mathlive.readAloudAudio.pause()));},resumeReadAloud:function(){var e;window&&(window.mathlive=null!==(e=window.mathlive)&&void 0!==e?e:{},window.mathlive.readAloudAudio&&(window.mathlive.onReadAloudStatus&&window.mathlive.onReadAloudStatus(window.mathlive.readAloudMathField,"playing"),window.mathlive.readAloudAudio.play()));},playReadAloud:function(e,t){var i;if(window&&(window.mathlive=null!==(i=window.mathlive)&&void 0!==i?i:{},window.mathlive.readAloudAudio)){let i=0;if(window.mathlive.readAloudFinalToken=null,e){window.mathlive.readAloudMarks=window.mathlive.readAloudMarks||[];for(const t of window.mathlive.readAloudMarks)t.value===e&&(i=t.time/1e3);let a=window.mathlive.readAloudTokens.indexOf(e);a>=0&&(a+=t,a<window.mathlive.readAloudTokens.length&&(window.mathlive.readAloudFinalToken=a));}window.mathlive.readAloudAudio.currentTime=i,window.mathlive.onReadAloudStatus&&window.mathlive.onReadAloudStatus(window.mathlive.readAloudMathField,"playing"),window.mathlive.readAloudAudio.play();}},debug:{getStyle:ps.getStyle,getType:ps.getType,spanToString:ps.spanToString,hasClass:ps.hasClass,latexToAsciiMath:ps.latexToAsciiMath,asciiMathToLatex:ps.asciiMathToLatex,FUNCTIONS:ps.FUNCTIONS,MATH_SYMBOLS:ps.MATH_SYMBOLS,TEXT_SYMBOLS:ps.TEXT_SYMBOLS,ENVIRONMENTS:ps.ENVIRONMENTS,MACROS:ps.MACROS,DEFAULT_KEYBINDINGS:ps.DEFAULT_KEYBINDINGS,getKeybindingMarkup:ps.getKeybindingMarkup}};

  var __assign = Object.assign;
  var script = {
    name: "mathlive-mathfield",
    props: {
      id: {
        type: String,
        default: ""
      },
      value: {
        type: String,
        default: ""
      },
      config: {
        type: Object,
        default: () => ({})
      },
      onKeystroke: {
        type: Function,
        default: function(_keystroke, _ev) {
          return true;
        }
      },
      onMoveOutOf: {
        type: Function,
        default: function(_direction) {
          return true;
        }
      },
      onTabOutOf: {
        type: Function,
        default: function(_direction) {
          return true;
        }
      }
    },
    watch: {
      value: function(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.$el.mathfield.$latex(newValue, {
            suppressChangeNotifications: true
          });
        }
      },
      config: {
        deep: true,
        handler: function(config) {
          this.$el.mathfield.$setConfig(config);
        }
      }
    },
    mounted: function() {
      this.$nextTick(() => {
        _s.makeMathField(this.$el, __assign(__assign({}, this.config), {
          onContentDidChange: (_) => {
            this.$emit("input", this.$el.mathfield.$text());
          },
          onFocus: (_) => {
            this.$emit("focus");
          },
          onBlur: (_) => {
            this.$emit("blur");
          },
          onContentWillChange: (_) => {
            this.$emit("content-will-change");
          },
          onSelectionWillChange: (_) => {
            this.$emit("selection-will-change");
          },
          onUndoStateWillChange: (_, command) => {
            this.$emit("undo-state-will-change", command);
          },
          onUndoStateDidChange: (_, command) => {
            this.$emit("undo-state-did-change", command);
          },
          onVirtualKeyboardToggle: (_, visible, keyboardElement) => {
            this.$emit("virtual-keyboard-toggle", visible, keyboardElement);
          },
          onReadAloudStatus: (_, status) => {
            this.$emit("read-aloud-status", status);
          },
          onKeystroke: (_, keystroke, ev) => {
            return this.onKeystroke(keystroke, ev);
          },
          onMoveOutOf: (_, direction) => {
            return this.onMoveOutOf(direction);
          },
          onTabOutOf: (_, direction) => {
            return this.onTabOutOf(direction);
          }
        }));
      });
    },
    methods: {
      perform: function(selector) {
        this.$el.mathfield.$perform(selector);
      },
      hasFocus: function() {
        return this.$el.mathfield.$hasFocus();
      },
      focus: function() {
        this.$el.mathfield.$focus();
      },
      blur: function() {
        this.$el.mathfield.$blur();
      },
      text: function(format) {
        return this.$el.mathfield.$text(format);
      },
      selectedText: function(format) {
        return this.$el.mathfield.$selectedText(format);
      },
      insert: function(text, options) {
        this.$el.mathfield.$insert(text, options);
      },
      keystroke: function(keys, evt) {
        return this.$el.mathfield.$keystroke(keys, evt);
      },
      typedText: function(text) {
        this.$el.mathfield.$keystroke(text);
      },
      selectionIsCollapsed: function() {
        return this.$el.mathfield.$selectionIsCollapsed();
      },
      selectionDepth: function() {
        return this.$el.mathfield.$selectionDepth();
      },
      selectionAtStart: function() {
        return this.$el.mathfield.$selectionAtStart();
      },
      selectionAtEnd: function() {
        return this.$el.mathfield.$selectionAtEnd();
      },
      select: function() {
        this.$el.mathfield.$select();
      },
      clearSelection: function() {
        this.$el.mathfield.$clearSelection();
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      let hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              const originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              const existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  /* script */
  const __vue_script__ = script;
  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "mathfield", attrs: { id: _vm.id } },
      [_vm._t("default")],
      2
    )
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    const __vue_inject_styles__ = undefined;
    /* scoped */
    const __vue_scope_id__ = "data-v-4883d22a";
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__ = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      undefined,
      undefined,
      undefined
    );

  var script$1 = {
    name: "app",
    components: {
      "mathlive-mathfield": __vue_component__
    },
    data: function() {
      return {
        formula: "g(x)",
        keystroke: "",
        parameters: [],
        next_parameter_id: 0,
        next_equation_id: 0,
        equations: []
      };
    },
    methods: {
      add_parameter: function() {
        this.parameters.push({id: this.next_parameter_id++, name: "", value: ""});
      },
      add_equation: function() {
        this.equations.push({id: this.next_equation_id++, forumula: "blah"});
      },
      delete_parameter: function(id) {
        this.parameters = this.parameters.filter((item) => item.id != id);
      },
      delete_equation: function(id) {
        this.equations = this.equations.filter((item) => item.id != id);
      }
    }
  };

  /* script */
  const __vue_script__$1 = script$1;
  /* template */
  var __vue_render__$1 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { attrs: { id: "app" } },
      [
        _c("h2", [_vm._v("MathLive with Vue.js")]),
        _vm._v(" "),
        _c("button", { on: { click: _vm.add_parameter } }, [
          _vm._v("Add Parameter")
        ]),
        _vm._v(" "),
        _c("button", { on: { click: _vm.add_equation } }, [
          _vm._v("Add Equation")
        ]),
        _vm._v(" "),
        _vm._l(_vm.parameters, function(param) {
          return _c("div", { key: "parameters" + param.id }, [
            _c("div", [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: param.name,
                    expression: "param.name"
                  }
                ],
                domProps: { value: param.name },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(param, "name", $event.target.value);
                  }
                }
              }),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: param.value,
                    expression: "param.value"
                  }
                ],
                domProps: { value: param.value },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(param, "value", $event.target.value);
                  }
                }
              }),
              _vm._v(" "),
              _c(
                "button",
                {
                  on: {
                    click: function($event) {
                      return _vm.delete_parameter(param.id)
                    }
                  }
                },
                [_vm._v("Delete")]
              )
            ])
          ])
        }),
        _vm._v(" "),
        _vm._l(_vm.equations, function(equation) {
          return _c("div", { key: "equations" + equation.id }, [
            _c(
              "div",
              [
                _c(
                  "mathlive-mathfield",
                  {
                    ref: "mathfield",
                    refInFor: true,
                    attrs: {
                      id: "mf" + equation.id,
                      config: { smartFence: true, virtualKeyboardMode: "off" }
                    },
                    model: {
                      value: equation.formula,
                      callback: function($$v) {
                        _vm.$set(equation, "formula", $$v);
                      },
                      expression: "equation.formula"
                    }
                  },
                  [_vm._v(_vm._s(equation.formula))]
                ),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    on: {
                      click: function($event) {
                        return _vm.delete_equation(equation.id)
                      }
                    }
                  },
                  [_vm._v("Delete")]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "output" }, [
                  _vm._v("LaTeX: " + _vm._s(equation.formula))
                ])
              ],
              1
            )
          ])
        })
      ],
      2
    )
  };
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;

    /* style */
    const __vue_inject_styles__$1 = undefined;
    /* scoped */
    const __vue_scope_id__$1 = undefined;
    /* module identifier */
    const __vue_module_identifier__$1 = undefined;
    /* functional template */
    const __vue_is_functional_template__$1 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      false,
      undefined,
      undefined,
      undefined
    );

  Vue.config.productionTip = false;
  Vue.config.devtools = true;
  window.languagePluginLoader.then(() => {
    console.log("Python ready");
    window.pyodide.loadPackage("micropip").then(() => {
      window.pyodide.loadPackage("http://localhost:8080/assets/pyodide/mpmath.js").then(() => {
        window.pyodide.loadPackage("http://localhost:8080/assets/pyodide/sympy.js").then(() => {
          console.log(window.pyodide.runPython(`
        def do_work(*args):
          import parse_latex
          print(parse_latex(r'\frac{1}{2}+sqrt{pi}-s'))
    
        import micropip
        micropip.install('antlr4-python3-runtime').then(do_work)
        `));
        });
      });
    });
  });
  console.log("got here 2");
  new Vue({
    render: (h) => h(__vue_component__$1)
  }).$mount("#app");

}());
