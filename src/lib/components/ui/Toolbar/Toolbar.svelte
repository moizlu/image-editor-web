<script lang="ts">
    import basicLight from "$lib/assets/images/light/features/basic.svg";
    import basicDark from "$lib/assets/images/dark/features/basic.svg";
    import effectsLight from "$lib/assets/images/light/features/effects.svg";
    import effectsDark from "$lib/assets/images/dark/features/effects.svg";
    import filtersLight from "$lib/assets/images/light/features/filters.svg";
    import filtersDark from "$lib/assets/images/dark/features/filters.svg";

    import { onMount } from "svelte";
    import type { Canvas } from "fabric";

    import { getCanvas } from "../CanvasContainer/state.svelte";

    import BasicContent from "./contents/Basic.svelte";
    import EffectsContent from "./contents/Effects.svelte";
    import Filters from "./contents/Filters.svelte";

    import type { Tab } from '../TabMenu/TabMenu.svelte';
    import TabMenu from '../TabMenu/TabMenu.svelte';
    import Icon from '../Icon/Icon.svelte';

    import Number from "../Number/Number.svelte";
    import ToggleButton from "../ToggleButton/ToggleButton.svelte";

    import AccordionItem from "../AccordionItem/AccordionItem.svelte";

    interface Props {
        class?: string;
    }
    const { class: className }: Props = $props();

    let tabs: Record<string, Tab> = {};
    let canvas: Canvas | undefined = undefined;

    tabs["basic"] = {
        header: basicTab,
        content: BasicContent
    }

    // tabs["effects"] = {
    //     header: effectsTab,
    //     content: EffectsContent
    // }

    tabs["filters"] = {
        header: filtersTab,
        content: Filters
    }

    onMount(() => {
        document.addEventListener('canvasInitialized', () => {
            canvas = getCanvas();
        });
    });

</script>

{#snippet tab(name: string, lightSrc: string, darkSrc: string)}
    <div class="flex-col-center">
        <Icon {lightSrc} {darkSrc} width={30} height={30} class="m-2" />
        <p class="text-[10px]">{name}</p>
    </div>
{/snippet}

<!--* 基本編集タブ -->
{#snippet basicTab()}
    {@render tab("基本編集", basicLight, basicDark)}
{/snippet}

<!--* エフェクトタブ -->
{#snippet effectsTab()}
    {@render tab("エフェクト", effectsLight, effectsDark)}
{/snippet}

<!--* フィルタータブ -->
{#snippet filtersTab()}
    {@render tab("フィルター", filtersLight, filtersDark)}
{/snippet}

<TabMenu {tabs} class={[className, "grid max-lg:grid-rows-[1fr_160px] lg:grid-cols-[100px_1fr] lg:-mt-1"]} tabClass="order-2 lg:order-1 flex lg:flex-col p-2 shadow-black shadow-[0_0_10px_0_rgba(0,0,0,0)]" tabItemClass="w-18 h-18 p-2 m-2 button-general" activeTabItemClass="scale-110 bg-turn-on/35 shadow-lg/50" contentClass="overflow-auto w-full order-1 lg:order-2 max-lg:h-50" activeTabId="basic" />
