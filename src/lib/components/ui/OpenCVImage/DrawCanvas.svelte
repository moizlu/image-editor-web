<script lang="ts">
    import { trimmingProps, effects } from "$lib/state.svelte";
    import { onMount } from "svelte";

    let canvas: HTMLCanvasElement | undefined = undefined;
    let ctx: CanvasRenderingContext2D | undefined = undefined;

    const setBoundingClientRect = () => {
        if (!canvas) { return; }
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }

    onMount(() => {
        if (!canvas) {
            throw new Error("canvasがundefinedです。");
        }
        ctx = canvas.getContext('2d') ?? undefined;
        if (!ctx) {
            throw new Error("トリミング用キャンバスの初期化に失敗しました。");
        }

        setBoundingClientRect();

        ctx.strokeStyle = 'Red';
        ctx.lineWidth = 2;
    });

    const onmousedown = (e: MouseEvent) => {
        if ((!canvas) || (!ctx) || (!effects.trimming)) { return; }
        trimmingProps.isMousePressing = true;

        setBoundingClientRect();

        if (!trimmingProps.isMousePressing) { return; }

        let clientRect = (e.target as HTMLElement).getBoundingClientRect();
        if (!clientRect) { return; }

        trimmingProps.beginX = e.offsetX;
        trimmingProps.beginY = e.offsetY;
    }

    const onmouseup = (e: MouseEvent) => {
        if ((!canvas) || (!ctx)) { return; }

        setBoundingClientRect();

        trimmingProps.isMousePressing = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        trimmingProps.isValid = true;
    }

    const onmousemove = (e: MouseEvent) => {
        if ((!canvas) || (!ctx) || (!trimmingProps.isMousePressing)) { return; }

        setBoundingClientRect();

        trimmingProps.endX = e.offsetX;
        trimmingProps.endY = e.offsetY;

        trimmingProps.width = trimmingProps.endX - trimmingProps.beginX;
        trimmingProps.height = trimmingProps.endY - trimmingProps.beginY;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeRect(trimmingProps.beginX, trimmingProps.beginY, trimmingProps.width, trimmingProps.height);
    }
</script>

<canvas class="absolute inset-0 w-full h-full" {onmousedown} {onmouseup} {onmousemove} bind:this={canvas}></canvas>