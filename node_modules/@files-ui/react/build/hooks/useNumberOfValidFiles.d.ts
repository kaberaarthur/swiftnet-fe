import { ExtFile } from "@files-ui/core";
/**
 * Custom hook for managing
 * @param localFiles the list of extFiles that are managed locally inside dropzone component
 * @param validateFilesFlag if true, the number will be updated with the number of files that have valid attribute as true
 * @returns the updated number of valid files
 */
export declare function useNumberOfValidFiles(localFiles: ExtFile[], validateFilesFlag: boolean): number;
