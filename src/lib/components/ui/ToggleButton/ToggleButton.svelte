<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        children: Snippet;
        state: boolean;
        disabled?: boolean;
        class?: string;
    }

    let { children, state = $bindable(false), disabled = false, class: className="" }: Props = $props();

    let checkBoxClasses = $derived.by(() => {
        let checkBoxClasses = {
            box: "relative h-11 w-30 border-accent border  transition-all duration-200",
            pin: "absolute top-2 left-1 h-7 w-7 transition-all duration-200"
        };

        if (state) {
            checkBoxClasses.box += " bg-accent";
            checkBoxClasses.pin += " bg-primary translate-x-21";
        } else {
            checkBoxClasses.box += " bg-primary";
            checkBoxClasses.pin += " bg-accent";
        }

        return checkBoxClasses;
    });
</script>

<button type="button" class={[className, "bg-primary text-accent border-0 flex-col-center transition-all duration-200"]} onclick={() => state = !state}>
    {@render children()}
    <div class={checkBoxClasses.box}>
        <div class={checkBoxClasses.pin}></div>
    </div>
</button>
