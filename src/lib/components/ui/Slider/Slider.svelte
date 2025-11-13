<script lang="ts">
  import type { int } from "@techstark/opencv-js";
    import type { Snippet } from "svelte";

    interface Props {
        children: Snippet;
        value?: int;
        disabled?: boolean;
        class?: string;
    }

    let { children, value = $bindable(0), disabled = false, class: className="" }: Props = $props();

</script>

<div class="flex-col-center">
<div class="flex-col-center w-30">
  <label for="volume" class="text-lg">
        <div class="flex-col-center">
            {@render children()}
            <input type="number" class="text-right m-1" min={0} max={1} step={0.01} bind:value />
        </div>
    </label>
  <input id="volume" type="range" min={0} max={1} bind:value step={0.01} class="slider" />
</div>
</div>

<style>
    @reference "../../../../app.css";

    @layer components {
        .slider {
            @apply appearance-none w-full h-7 cursor-pointer border-accent border;
        }

        .slider::-moz-range-track {
            @apply appearance-none w-full h-7 cursor-pointer border-accent border;
        }

        .slider::-webkit-slider-thumb {
            @apply appearance-none w-5 h-5 bg-accent transition-transform duration-150;
        }

        .slider::-moz-range-thumb {
            @apply appearance-none w-5 h-5 bg-accent transition-transform duration-150;
        }

    }
</style>
