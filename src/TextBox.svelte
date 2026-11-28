<script lang="ts">
  import type { FormEventHandler } from "svelte/elements";
  import appState from "./stores.svelte";

  interface Props {
    id: string;
    textContent: string;
    enter: () => void;
    oninput: FormEventHandler<HTMLDivElement>;
    commit?: () => void;
  }

  let {
    id,
    textContent = $bindable(),
    enter,
    oninput,
    commit
  }: Props = $props();

  let lastKnownText = "";
  let isDirty = false;

  $effect(() => {
    if (textContent !== lastKnownText) {
      isDirty = false;
      lastKnownText = textContent;
    }
  });

  const handleInput: FormEventHandler<HTMLDivElement> = (e) => {
    isDirty = true;
    lastKnownText = e.currentTarget.textContent ?? "";
    oninput(e);
  };

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key == 'Enter' && !e.shiftKey && !e[appState.modifierKey]) {      
      e.preventDefault();
      if (isDirty) {
        isDirty = false;
        commit?.();
      }
      enter();
    }
  }

  function handleFocusOut(e: FocusEvent) {
    if (isDirty && (e.currentTarget as HTMLDivElement).isConnected) {
      isDirty = false;
      commit?.();
    }
  }
</script>

<style>
  div.editable {
    margin-bottom: 0px;
    margin-left: 7px;
    min-width: 12rem;
    width: fit-content;
    border: 1px solid gray;
    border-radius: 2px;
  }

  @media print {
    div.editable {
      border: none;
    }
  }
</style>

<div
  role="textbox"
  tabindex="0"
  class="editable"
  contenteditable="true"
  onkeydown={handleKeyDown}
  onfocusout={handleFocusOut}
  id={id}
  bind:textContent
  oninput={handleInput}
>
</div>