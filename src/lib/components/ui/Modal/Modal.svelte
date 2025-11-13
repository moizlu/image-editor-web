<script lang="ts">
    import { fade } from "svelte/transition";
    import type { Snippet } from "svelte";

    export interface Props {
        isOpened?: boolean;
        isModal?: boolean;
        children: Snippet;
    }

    let { isOpened = $bindable(true), isModal = false, children }: Props = $props();

    let backgroundElement: HTMLDivElement | undefined = $state(undefined);

    const onclick = (e: Event) => {
        if (!isModal && (e.target === backgroundElement)) {
            isOpened = false;
        }
    };
</script>

{#if isOpened}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class = "fixed top-0 left-0 w-full h-full z-10000 transition-opacity duration-200
                border-0 bg-primary/3 text-accent
                backdrop-blur-sm flex-center"
        transition:fade={{ duration: 150 }}
        bind:this={backgroundElement}
        {onclick}>
        {@render children()}
    </div>
{/if}
