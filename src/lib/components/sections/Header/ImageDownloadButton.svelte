<script lang="ts">
    import downloadLight from "$lib/assets/images/light/download.svg";
    import downloadDark from "$lib/assets/images/dark/download.svg";

    import { getCanvas } from "$lib/components/ui/CanvasContainer/state.svelte";

    import Icon from "$lib/components/ui/Icon/Icon.svelte";
  import { onMount } from "svelte";

    let canDownload = $state(false);

    onMount(() => {
        document.addEventListener('canvasInitialized', () => {
            const canvas = getCanvas();

            if (canvas) {
                const updateObjectCount = () => {
                    canDownload = (canvas?.getObjects().length ?? 0) !== 0;
                }

                canvas.on('object:added', updateObjectCount);
                canvas.on('object:removed', updateObjectCount);
            }
        });
    });

    const onclick = () => {
        const a = document.createElement('a');
        a.href = getCanvas()?.toDataURL() ?? "#";
        a.download = "result-" + Date.now().toString();
        a.click();
    }
</script>

<button type="button" {onclick} class="relative group flex-center button-general p-2 bg-turn-on/20 hover:bg-turn-on/40 active:bg-turn-on/60 disabled:bg-disabled" disabled={!canDownload}>
    <div class="transition-all duration-200 group-hover:translate-y-1 group-active:translate-y-2 group-disabled:translate-0">
        <Icon lightSrc={downloadLight} darkSrc={downloadDark} />
    </div>
    <p>ダウンロード</p>
</button>
