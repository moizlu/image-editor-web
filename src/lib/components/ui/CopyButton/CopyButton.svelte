<script lang="ts">
    import Icon from '$lib/components/ui/Icon/Icon.svelte';

    interface Props {
        url: string;
        size?:number;
        className?: string;
    }
    const { url, size=25, className }: Props = $props();
</script>

<button class={[className, `group flex justify-center items-center
                                transition-all duration-300
                                w-15 h-15 m-2 p-3
                                bg-accent
                                hover:bg-primary active:bg-primary
                                border-accent border
                                `
]}
        onclick={() => { navigator.clipboard.writeText(url); }}>
        <img src="" alt="" class="">

    <Icon lightSrc="/images/light/copy.svg" darkSrc="/images/dark/copy.svg" alt="copy" height={size} width={size} lightImgClassName="group-hover:opacity-0 dark:group-hover:opacity-100 group-active:opacity-0 dark:group-active:opacity-100" darkImgClassName="group-hover:opacity-100 group-active:opacity-100 dark:group-hover:opacity-0 dark:group-active:opacity-0" />
</button>
