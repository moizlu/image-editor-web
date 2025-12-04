<script lang="ts">
    import { onMount } from "svelte";

    import { getCanvas, setCanvasCreated } from "../../CanvasContainer/state.svelte";
    import { logicSize } from "../../CanvasContainer/state.svelte";

    import AccordionItem from "$lib/components/ui/AccordionItem/AccordionItem.svelte";
    import RGBValue from "$lib/components/ui/RGBValue/RGBValue.svelte";

    // let isCreateCanvasDialogOpened = $state(false);

    let width = $state(logicSize.width);
    let height = $state(logicSize.height);
    let backgroundColor = $state("");

    const validationInput = (event: Event) => {
        if (!event.target) { return; }

        const value = (event.target as HTMLInputElement).value;
        if (!value) {
            (event.target as HTMLInputElement).value = "1";
        }
    };

    const onCreateCanvasClicked = () => {
        const canvas = getCanvas();
        if (!canvas) { return; }

        logicSize.width = width;
        logicSize.height = height;
        canvas.setDimensions({
            width: width,
            height: height
        });

        setCanvasCreated(true);
    };

    const onBackgroundColorChanged = () => {
        const canvas = getCanvas();
        if (!canvas) { return; }

        canvas.backgroundColor = backgroundColor;
        canvas.renderAll();
    };

    onMount(() => {
        document.addEventListener('canvasCreated', () => {
            const canvas = getCanvas();
            if (!canvas) { return; }

            width = logicSize.width;
            height = logicSize.height;

            backgroundColor = canvas.backgroundColor as string;
        });
    });
</script>

{#snippet createCanvasHeader()}
    <p>キャンバスサイズ変更</p>
{/snippet}

{#snippet backGroundColorHeader()}
    <p>背景色変更</p>
{/snippet}

<div class="m-2 flex flex-col justify-start">
    <AccordionItem header={createCanvasHeader}>
        <div class="m-2 flex flex-col justify-start">
            <div class="flex justify-start items-center">
                <p class="m-2">　幅</p>
                <input type="number" onchange={validationInput} bind:value={width} min="1" step="1" class="w-30">
                <p class="m-2">px</p>
            </div>
            <div class="flex justify-start items-center">
                <p class="m-2">高さ</p>
                <input type="number" onchange={validationInput} bind:value={height} min="1" step="1" class="w-30">
                <p class="m-2">px</p>
            </div>

            <button onclick={onCreateCanvasClicked} class="button-general m-5 px-10 py-2 text-base-light">
                <p>適用</p>
            </button>
        </div>
    </AccordionItem>

    <AccordionItem header={backGroundColorHeader}>
        <RGBValue onchange={onBackgroundColorChanged} bind:value={backgroundColor} class="m-2" />
    </AccordionItem>
</div>
