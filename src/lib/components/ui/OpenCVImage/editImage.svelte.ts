import { effects, trimmingProps, imageSrc } from "$lib/state.svelte";
import { Utils } from "$lib/utils";
import cv from "@techstark/opencv-js";

export const editImage = (srcUrl: string | undefined, onCompleted: (dataUrl: string) => void, isDist: boolean=false) => {
    const { autoResize, trimming, grayscale, blur, edge, flipH, flipV } = effects;
    const { beginImgX, beginImgY, imgWidth, imgHeight, isMousePressing } = trimmingProps;

    if ((!srcUrl) || (isMousePressing)) { return; }

    const img = document.createElement("img");
    img.src = srcUrl;

    img.onload = () => {
        let src = cv.imread(img);

        if ((trimming) && (trimmingProps.isValid) && (imgWidth > 0)) {

            let rect: cv.Rect | undefined = undefined;

            if ((isDist) && (autoResize)) {
                rect = new cv.Rect(beginImgX / imageSrc.magRate, beginImgY / imageSrc.magRate, imgWidth / imageSrc.magRate, imgHeight / imageSrc.magRate);
            } else {
                rect = new cv.Rect(beginImgX, beginImgY, imgWidth, imgHeight);
            }

            const dist = src.roi(rect);
            src.delete();
            src = dist;
        }

        if (grayscale) {
            cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
        }
        if (blur) {
            const size = Math.round((Utils.map(blur, 0, 1, 0, 17) - 1) / 2) * 2 + 1; // 最も近い奇数に丸める
            cv.GaussianBlur(src, src, new cv.Size(size, size), 0, 0, cv.BORDER_DEFAULT);
        }
        if (edge) {
            if (!grayscale) {
                cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
            }
            const threshold = Math.floor(Utils.map(edge, 0, 1, 0, 1000));
            cv.Canny(src, src, 0, threshold, 3, false);
        }
        if (flipH) {
            cv.flip(src, src, 1);
        }
        if (flipV) {
            cv.flip(src, src, 0);
        }

        const canvas = document.createElement("canvas");
        cv.imshow(canvas, src); // ここ
        onCompleted(canvas.toDataURL("image/png"));

        src.delete();
        img.remove();
    };
}