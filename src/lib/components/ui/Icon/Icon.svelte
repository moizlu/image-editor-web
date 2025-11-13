<script lang="ts">
    import type { HTMLImgAttributes } from "svelte/elements";

    interface Props extends Omit<HTMLImgAttributes, "src"> {
        lightSrc: string;
        darkSrc: string;

        lightImgClassName?: string;
        darkImgClassName?: string;
    }
    const { lightSrc, darkSrc, lightImgClassName, darkImgClassName, class: className, ...props }: Props = $props();

    const transition = "transition-opacity duration-300";
</script>

<div class={[className, "relative"]}>
    <img src={lightSrc} class={[lightImgClassName, transition, "absolute opacity-100 dark:opacity-0"]} {...props} />
    <img src={darkSrc} class={[darkImgClassName, transition, "opacity-0 dark:opacity-100"]} {...props} />
</div>
