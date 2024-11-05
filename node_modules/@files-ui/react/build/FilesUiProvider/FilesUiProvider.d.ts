import * as React from "react";
import { FilesUIConfig } from "./FilesUIConfig";
interface FilesUiProviderProps {
    children: React.ReactNode;
    config?: FilesUIConfig;
}
declare const FilesUiProvider: React.FC<FilesUiProviderProps>;
export default FilesUiProvider;
