<script lang="ts">
    import Icon from "$lib/components/ui/Icon/Icon.svelte";
    import CopyButton from "$lib/components/ui/CopyButton/CopyButton.svelte";
    import ThemeButton from "./ThemeButton.svelte";
    import Modal from "$lib/components/ui/Modal/Modal.svelte";

    let isShareOpened = $state(false);

    const onclick = () => {
        isShareOpened = !isShareOpened;
    };
</script>

<header class="fixed top-0 h-20 z-100 w-full bg-accent/3 backdrop-blur-md  flex-center">
    <h1 class="text-2xl sm:text-5xl">画像編集ツール(Web版)</h1>
    <ThemeButton />
</header>

<button class="fixed bottom-0 right-2 sm:right-[calc(50%-var(--breakpoint-sm)/2)] m-5 z-10001 bg-transparent border-0" onclick={() => isShareOpened = !isShareOpened}>
    <Icon lightSrc="/images/light/close.svg" darkSrc="/images/dark/close.svg" alt="share" width={70} class={[(isShareOpened) ? "block" : "hidden", "absolute drop-shadow-primary drop-shadow-sm"]} />
    <Icon lightSrc="/images/light/share.svg" darkSrc="/images/dark/share.svg" alt="share" width={70} class={[(isShareOpened) ? "hidden" : "block", "drop-shadow-primary drop-shadow-sm"]} />
</button>

<Modal bind:isOpened={isShareOpened}>
    <div class="flex-col-center bg-primary m-2 p-5 border-accent border shadow-lg shadow-primary">
        <Icon lightSrc="/images/light/qr.svg" darkSrc="/images/dark/qr.svg" alt="QRコード" width={500} class="m-2 scale-100" />
        <div class="max-sm:flex-col flex justify-center items-center gap-4">
            <p class="text-sm md:text-2xl m-2">https://imageeditor.moizlu.com/</p>
            <CopyButton url="https://imageeditor.moizlu.com/" />
        </div>
    </div>
</Modal>
