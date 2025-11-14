<script lang="ts">
    import { trimmingProps, effects } from "$lib/state.svelte";
    import { onMount } from "svelte";


    interface Props {
        imgElement: HTMLImageElement;
    }
    const { imgElement }: Props = $props();

    let canvas: HTMLCanvasElement | undefined = undefined;
    let ctx: CanvasRenderingContext2D | undefined = undefined;

    const setBoundingClientRect = () => {
        if (!canvas) { return; }
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }

    const canvasToImageCo = (x: number, y: number): { x: number, y: number } => {
        if ((!canvas) || (!ctx) || (!imgElement)) { return { x: 0, y: 0 }; }

        const imageRatio = imgElement.naturalWidth / imgElement.naturalHeight;
        const imageDisplayRatio = imgElement.clientWidth / imgElement.clientHeight;

        let renderedWidth = 0;
        let renderedHeight = 0;
        let canvasMargin = { x: 0, y: 0};

        // 縦か横か
        if (imageRatio > imageDisplayRatio) {
            renderedWidth = imgElement.clientWidth;
            renderedHeight = imgElement.clientWidth / imageRatio;
            canvasMargin.y = (imgElement.clientHeight - renderedHeight) / 2;
        } else {
            renderedHeight = imgElement.clientHeight;
            renderedWidth = imgElement.clientHeight * imageRatio;
            canvasMargin.x = (imgElement.clientWidth - renderedWidth) / 2;
        }

        if ((x < canvasMargin.x) || (x > canvasMargin.x +renderedWidth) ||
            (y < canvasMargin.y) || (y > canvasMargin.y +renderedHeight)) {
            return { x: x, y: y };
        }

        const relative = {
            x: x - canvasMargin.x,
            y: y - canvasMargin.y
        }
        const imageCo = {
            x: Math.round(relative.x * (imgElement.naturalWidth / renderedWidth)),
            y: Math.round(relative.y * (imgElement.naturalHeight / renderedHeight))
        };

        return imageCo;
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
        trimmingProps.isValid = false;

        setBoundingClientRect();

        if (!trimmingProps.isMousePressing) { return; }

        let clientRect = (e.target as HTMLElement).getBoundingClientRect();
        if (!clientRect) { return; }

        trimmingProps.beginX = e.offsetX;
        trimmingProps.beginY = e.offsetY;

        const imgCo = canvasToImageCo(e.offsetX, e.offsetY);
        trimmingProps.beginImgX = imgCo.x;
        trimmingProps.beginImgY = imgCo.y;
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

        const imgCo = canvasToImageCo(e.offsetX, e.offsetY);
        trimmingProps.endImgX = imgCo.x;
        trimmingProps.endImgY = imgCo.y;

        const width = e.offsetX - trimmingProps.beginX;
        const height = e.offsetY - trimmingProps.beginY;

        trimmingProps.imgWidth = trimmingProps.endImgX - trimmingProps.beginImgX;
        trimmingProps.imgHeight = trimmingProps.endImgY - trimmingProps.beginImgY;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeRect(trimmingProps.beginX, trimmingProps.beginY, width, height);
    }
</script>

<canvas class="absolute inset-0 w-full h-full" {onmousedown} {onmouseup} {onmousemove} bind:this={canvas}></canvas>