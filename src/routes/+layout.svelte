<script lang="ts">
    import { browser } from "$app/environment";
    import cv from "@techstark/opencv-js";

	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { isReady } from "$lib/state.svelte.ts";

    import { initTheme } from "$lib/theme.svelte";
	import SplashScreen from '$lib/components/parts/SplashScreen/SplashScreen.svelte';
	import Header from '$lib/components/parts/Header/Header.svelte';
	import Footer from '$lib/components/parts/Footer/Footer.svelte';
	import { onMount } from "svelte";

	let { children } = $props();

    if (browser) {
        let onOpenCVInitialized = new Event('onOpenCVInitialized');

		onMount(() => {
			isReady.mount = true;
		});

        cv['onRuntimeInitialized'] = () => {
            isReady.openCV = true;
            document.dispatchEvent(onOpenCVInitialized);
        };

        initTheme();
    }
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	<meta property="og:url" content="https://imageeditor.moizlu.com/" />
	<meta property="og:type" content="profile" />
	<meta property="og:title" content="画像編集ツール(Web版)" />
	<meta property="og:image" content="https://imageeditor.moizlu.com/ogp.png" />
	<meta property="og:site_name" content="画像編集ツール(Web版)" />
	<meta property="og:description" content="画像編集ツール(Web版)" />

    <title>画像編集ツール(Web版)</title>l
</svelte:head>

<SplashScreen />

<Header />
<div class="main-content">
	{@render children()}
</div>
<Footer />


<style>
    @media screen and (max-height :900px) {
        .main-content {
            margin-top: 5rem;
        }
    }
</style>
