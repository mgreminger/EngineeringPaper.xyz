<script>
  import {onMount} from "svelte";

  export let mathFieldLatex = "";

  let mathSpan;
  let mathField;
  let MQ = MathQuill.getInterface(2);

  onMount(() => {
    mathField = MQ.MathField(mathSpan, {
      handlers: {
        edit: () => {
          mathFieldLatex = mathField.latex();
        }
      }
    });

  });

</script>

<span bind:this={mathSpan}>{mathFieldLatex}</span>
