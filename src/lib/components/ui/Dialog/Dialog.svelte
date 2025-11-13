<script lang="ts">
  import type { Snippet } from "svelte";
    import Modal from "../Modal/Modal.svelte";
    import type { Props as ModalProps } from "../Modal/Modal.svelte";

    interface Props extends ModalProps {
        choices: string[];
        onClose?: (choice: string) => void;
    }

    let { choices, onClose, isOpened = $bindable(true), children, ...modalProps }: Props = $props();

    const onChoiceClicked = (choice: string) => {
        if (onClose) {
            onClose(choice);
        }

        isOpened = false;
    }

</script>

<!-- !グリッドレイアウトを使うことを検討すること -->
<Modal bind:isOpened {...modalProps}>
    <div class="relative max-w-200 w-full max-h-100 h-full bg-primary border-2 m-20 p-2 shadow-black shadow-2xl">
        <div class="absolute top-0 left-0 h-[80%] w-full flex-center">
            {@render children()}
        </div>

        <div class="absolute bottom-0 left-0 h-[20%] w-full flex justify-end items-center">
            {#each choices as choice}
                <button type="button" class="text-5xl m-2 p-2" onclick={() => {onChoiceClicked(choice)}}>
                    {choice}
                </button>
            {/each}
        </div>
    </div>
</Modal>
