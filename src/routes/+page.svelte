<script lang="ts">
    import OpenCVImage from "$lib/components/ui/OpenCVImage/OpenCVImage.svelte";
    import { editImage } from "$lib/components/ui/OpenCVImage/editImage.svelte";

    import { effects, imageSrc } from "$lib/state.svelte";
    import AddImage from "$lib/components/ui/AddImage/AddImage.svelte";
    import ToggleButton from "$lib/components/ui/ToggleButton/ToggleButton.svelte";
    import Slider from "$lib/components/ui/Slider/Slider.svelte";

    const onDownloadButtonClicked = () => {
        editImage(imageSrc.originalSrc, (dataUrl) => {
            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = "result-" + Date.now().toString();
            a.click();
        }, true);
    };
</script>

<main class="flex-col-center min-h-screen w-full">
    <AddImage />

    <div class="lg:flex lg:justify-around lg:items-end">
        <div class="flex-col-center">
            <p class="text-sm">縮小した場合実際の編集結果と異なる場合があります。</p>

            <ToggleButton bind:state={effects.autoResize}><p class="text-2xl">縮小表示</p></ToggleButton>

            <p>プレビュー</p>
            <div class="max-w-200 min-w-50 m-2 p-2 border-accent border">
                <OpenCVImage />
            </div>
        </div>

        <div class="grid grid-cols-2 gap-2 m-2">
            <!-- <ToggleButton bind:state={effects.trimming}><p class="text-2xl">トリミング</p></ToggleButton> -->
            <ToggleButton bind:state={effects.grayscale}><p class="text-2xl">グレイスケール</p></ToggleButton>
            <Slider bind:value={effects.blur}><p class="text-2xl">ぼかし</p></Slider>
            <Slider bind:value={effects.edge}><p class="text-2xl">エッジ抽出</p></Slider>
            <ToggleButton bind:state={effects.flipH}><p class="text-2xl">水平方向に反転</p></ToggleButton>
            <ToggleButton bind:state={effects.flipV}><p class="text-2xl">垂直方向に反転</p></ToggleButton>
        </div>
    </div>

    <button type="button" class="m-2" onclick={onDownloadButtonClicked}>
        <p class="text-3xl p-2">ダウンロード</p>
    </button>
</main>
