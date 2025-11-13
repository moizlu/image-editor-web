<script lang="ts">
    import { imageSrc } from "$lib/state.svelte";
    import { editImage } from "./editImage.svelte";
    import DrawCanvas from "./DrawCanvas.svelte";

    $effect(() => {
        editImage(imageSrc.resizedSrc, (dataUrl) => imageSrc.displaySrc = dataUrl);
    });
</script>


{#if imageSrc.displaySrc}
    <div class="relative w-full h-full">
        <img class="pointer-events-none h-100 object-contain" src={imageSrc.displaySrc} alt="画像" />
        <DrawCanvas />
    </div>
{:else}
    <p class="h-100 w-50 flex-center text-xl">No Image</p>
{/if}
