export class Utils {
    static loadImage = (file: File, onload: (ev: ProgressEvent<FileReader>) => void | undefined) => {
        const reader = new FileReader();
        reader.onload = onload;

        reader.readAsDataURL(file);
    };

    static map = (val: number, inMin: number, inMax: number, outMin: number, outMax: number)  => {
        return (val - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }
}