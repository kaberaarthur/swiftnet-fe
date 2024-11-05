import * as React from "react";
interface FileMosaicImageLayerProps {
    /**
     * The image source
     */
    imageSource: string | undefined;
    /**
     * the url file icon
     */
    url: string;
    /**
     * The name to be used as alt
     */
    fileName: string;
    /**
     *
     */
    card?: boolean;
    /**
     *
     */
    isBlur?: boolean;
    /**
     * If not present, image width will be set to 100%.
     *
     * If present, image will be analized and displayed according to its heigh and width.
     * Image with height greater than its width has a "portrait" orientation.
     * Otherwise it has a "landscape" orientation.
     * - If value is "orientation", image will be displayed complete by giving 100%
     * to width prop if the orientation is "landscape".
     * When orientation is "portrait", height prop will be set to 100%. Some images
     * will show an empty space.
     * - If value is "center", image will be centered and will not be displayed complete.
     * This the empty space is avoided. This is achived by giving 100% to width prop if
     * the orientation is "portrait". When orientation is "landscape", height prop will be set to 100%.
     * @default orientation
     */
    smartImgFit?: false | "orientation" | "center";
}
declare const FileMosaicImageLayer: React.FC<FileMosaicImageLayerProps>;
export default FileMosaicImageLayer;
