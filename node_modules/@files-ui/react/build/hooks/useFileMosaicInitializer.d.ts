import { IconsSet } from "../FilesUiProvider";
/**
 * Initializer hook for FileItemNeo
 * @param file The file Object
 * @param valid Whether the file is valid, not valid or not set
 * @param preview Whether to show a preview on FileItem
 * @param imageUrl The image url
 * @param xhr the xhr object
 * @param progress the current progress given by props
 * @returns an array thta contains the following properties [isImage, isVideo, url, imageSource, localProgress]
 */
export declare const useFileMosaicInitializer: (file: File | undefined, name: string | undefined, type: string | undefined, valid: boolean | undefined | null, preview: boolean, imageUrl: string | undefined, videoUrl: string | undefined, customIcons?: IconsSet, xhr?: XMLHttpRequest) => [boolean, boolean, boolean, string, string | undefined, File | string | undefined];
