export const isReady = $state({ mount: false, openCV: false });

export const imageSrc: { displaySrc: string | undefined, distSrc: string | undefined, resizedSrc: string | undefined, originalSrc: string | undefined, magRate: number } = $state({
    displaySrc: undefined,
    distSrc: undefined,
    resizedSrc: undefined,
    originalSrc: undefined,
    magRate: 1.0
});

export const effects = $state({
    autoResize: true,
    trimming: false,
    grayscale: false,
    blur: 0.0,
    edge: 0.0,
    flipV: false,
    flipH: false,
});

export const trimmingProps = $state({
    beginX: -1,
    beginY: -1,
    endX:   -1,
    endY:   -1,
    width:  -1,
    height: -1,
    isMousePressing: false,
    isValid: false
});
