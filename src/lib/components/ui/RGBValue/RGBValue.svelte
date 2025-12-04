<script lang="ts">
    import { onMount } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    interface Props extends HTMLAttributes<HTMLDivElement> {
        value: string;
    }
    let { value = $bindable(), class: className, onchange: onChangeInParent, ...props }: Props = $props();

    const MIN = 0;
    const MAX = 255;

    let red = $state(0);
    let green = $state(0);
    let blue = $state(0);

    const init = () => {
        const initValue = value.match(/\d+/g);
        red =   Number(initValue?.[0]) ?? 0;
        green = Number(initValue?.[1]) ?? 0;
        blue =  Number(initValue?.[2]) ?? 0;
    };

    const onValueChanged = (event: Event) => {
        value = `rgb(${red}, ${green}, ${blue})`;
        if (onChangeInParent) {
            onChangeInParent(event as any);
        }
    };

    onMount(() => {
        const onCanvasCreated = () => {
            // 遅らせないと親コンポーネント側の初期化処理と競合する
            setTimeout(() => {
                init();
            }, 50);
        };
        document.addEventListener('canvasCreated', onCanvasCreated);

        init();

        return () => {
            document.removeEventListener('canvasCreated', onCanvasCreated);
        }
    })

</script>

<div class={[className, "flex-col-center gap-2"]}>
    <div class="flex-center gap-2">
        <p class="text-2xl">R</p>
        <input type="range" min={MIN} max={MAX} step={1} bind:value={red} onchange={onValueChanged}>
        <input type="number" min={MIN} max={MAX} step={1} bind:value={red} onchange={onValueChanged}>
    </div>
    <div class="flex-center gap-2">
        <p class="text-2xl">G</p>
        <input type="range" min={MIN} max={MAX} step={1} bind:value={green} onchange={onValueChanged}>
        <input type="number" min={MIN} max={MAX} step={1} bind:value={green} onchange={onValueChanged}>
    </div>
    <div class="flex-center gap-2">
        <p class="text-2xl">B</p>
        <input type="range" min={MIN} max={MAX} step={1} bind:value={blue} onchange={onValueChanged}>
        <input type="number" min={MIN} max={MAX} step={1} bind:value={blue} onchange={onValueChanged}>
    </div>
</div>
