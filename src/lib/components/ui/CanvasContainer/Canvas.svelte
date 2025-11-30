<script lang="ts">
  import { onMount } from "svelte";
    import { getCanvas } from "./state.svelte";

    interface Props {
        canvasElement: HTMLCanvasElement | undefined;
        container: HTMLDivElement;
    }
    let { canvasElement = $bindable(), container = $bindable() }: Props = $props();

    const resizeCanvas = () => {
        if (!canvasElement || !container) { return; }
        const canvas = getCanvas();
        if (!canvas) { return; }

        const canvasWidth = canvas.getWidth();
        const canvasHeight = canvas.getHeight();

        const containerWidth = container.clientWidth - 10;
        const containerHeight = container.clientHeight - 10;

        const scale = Math.min(
            containerWidth / canvasWidth,
            containerHeight / canvasHeight
        );

        canvas.setDimensions({
            width: canvasWidth * scale,
            height: canvasHeight * scale
        });

        canvas.setZoom(scale);
        canvas.requestRenderAll();
    };

    onMount(() => {
        return;

        document.addEventListener('canvasInitialized', resizeCanvas);
        window.addEventListener('resize', resizeCanvas);
        document.addEventListener('canvasInitialized', resizeCanvas);
    });
</script>

<canvas id="main-canvas" bind:this={canvasElement} class=" shadow-black shadow-lg/50"></canvas>