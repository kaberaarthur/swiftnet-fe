/**
 * @param progress the progress given as a prop to the component
 * @param xhr the XMLHttpRequest object for AJAX operations
 * @returns the progress to be shown in the component
 */
export declare const useProgress: (progress: number | undefined, xhr?: XMLHttpRequest) => number | undefined;
