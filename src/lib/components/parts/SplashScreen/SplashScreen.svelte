<script lang="ts">
    import { fade } from "svelte/transition";

    import Icon from "$lib/components/ui/Icon/Icon.svelte";

    import { isReady } from "$lib/state.svelte";

</script>

{#if (!isReady.mount) || (!isReady.openCV)}
    <div transition:fade={{ duration: 300 }} class="fixed top-0 h-screen w-screen z-100000 bg-primary flex-col-center">
        <p class="text-2xl">読み込み中...</p>
        <p class="text-sm">時間がかかりすぎる場合は再読み込みしてみてください。</p>
        <Icon lightSrc="/images/light/loading.svg" darkSrc="/images/dark/loading.svg" width={100} height={100} fetchpriority="high" class="animate-spin" />
    </div>
{/if}
