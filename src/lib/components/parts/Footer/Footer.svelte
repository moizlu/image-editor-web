<script lang="ts">
  import Icon from "$lib/components/ui/Icon/Icon.svelte";
</script>

<div class="fixed flex-col-center bottom-0 left-0 m-5 text-lg z-100001 bg-primary/3 backdrop-blur-sm drop-shadow-sm drop-shadow-primary pointer-events-none">
    <p class="m-1">作者:玉木</p>
    <a class="flex-center pointer-events-auto" href="https://github.com/moizlu/image-editor-web" target="_blank">
        <p class="m-1">ソースコード</p>
        <Icon lightSrc="/images/light/ex_link.svg" darkSrc="/images/dark/ex_link.svg" alt="link" width={20} class="m-2 pointer-events-none drop-shadow-sm drop-shadow-accent" />
    </a>
</div>