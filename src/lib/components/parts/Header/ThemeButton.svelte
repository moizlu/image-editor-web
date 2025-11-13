<script lang="ts">
    import { getTheme, setTheme } from '$lib/theme.svelte';
    import Icon from '$lib/components/ui/Icon/Icon.svelte';

    const onclick = () => {
        setTheme(getTheme() === "dark" ? "light" : "dark");
    }
</script>

<button {onclick} class="bg-primary m-2" id="theme-button">
    <Icon lightSrc="/images/light/theme.svg" darkSrc="/images/dark/theme.svg" alt="theme" width={50} class="" />
</button>
