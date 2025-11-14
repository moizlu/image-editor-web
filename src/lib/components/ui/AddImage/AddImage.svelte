<script lang="ts">
    import { effects, imageSrc, trimmingProps } from "$lib/state.svelte";
    import Dialog from "$lib/components/ui/Dialog/Dialog.svelte";
    import { Utils } from "$lib/utils";
    import cv from "@techstark/opencv-js";

    let error = $state({
        isOpened: false,
        message: ""
    });

    const resizeImage = (url: string, onCompleted: (dataUrl: string) => void) => {
        const MAX = 700;

        const img = document.createElement("img");
        img.src = url;

        img.onload = () => {
            const src = cv.imread(img);

            const ratioCom = Math.min(MAX / src.cols, MAX / src.rows);

            if (ratioCom >= 1.0) {
                return url;
            }

            const newWidth = Math.round(src.cols * ratioCom);
            const newHeight = Math.round(src.rows * ratioCom);

            cv.resize(src, src, new cv.Size(newWidth, newHeight), cv.INTER_AREA);

            const canvas = document.createElement("canvas");
            cv.imshow(canvas, src);
            onCompleted(canvas.toDataURL("image/png"));

            src.delete();
            img.remove();
        };
    }

    const validateAndLoad = (file: File) => {
        if (!file.type.startsWith("image/")) {
            error.isOpened = true;
            error.message = "画像ファイルをアップロードしてください。";
            return;
        }
        Utils.loadImage(file, (ev) => {
            imageSrc.originalSrc = ev.target?.result as string;
            imageSrc.distSrc = imageSrc.originalSrc;
        });

        trimmingProps.isValid = false;
    }

    const handleFileChange = (event: Event) => {
        const file = (event.target as HTMLInputElement).files?.[0];

        if (file) {
            validateAndLoad(file);
        }
    }

    const handleDrop = (event: DragEvent) => {
        event.preventDefault();
        const file = event.dataTransfer?.files?.[0];
        if (file) {
            validateAndLoad(file);
        }
    }

    $effect(() => {
        if (effects.autoResize && imageSrc.originalSrc) {
            resizeImage(imageSrc.originalSrc, (dataUrl) => {
                imageSrc.resizedSrc = dataUrl;
                imageSrc.displaySrc = dataUrl;
            });
        } else {
            imageSrc.resizedSrc = imageSrc.originalSrc;
            imageSrc.displaySrc = imageSrc.originalSrc;
        }
    });
</script>

<Dialog choices={["OK"]} bind:isOpened={error.isOpened} isModal={true}>
    <p class="text-2xl">{error.message}</p>
</Dialog>

<div class="relative h-20 max-w-150 p-2 m-2 button-general flex-col-center" role="img">
    <input type="file" accept="image/*" class="opacity-0 absolute inset-0 cursor-pointer" onchange={handleFileChange} ondrop={handleDrop} ondragover={(e) => e.preventDefault()}>
    <p class="text- lg:text-2xl">ここをクリックするかD&Dでファイルを追加</p>
</div>
