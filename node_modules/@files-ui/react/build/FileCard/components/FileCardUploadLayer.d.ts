import * as React from "react";
import { Localization, UPLOADSTATUS } from "@files-ui/core";
import "./FileCardUploadLayer.scss";
export interface FileCardUploadLayerPropsMap {
    visible?: boolean;
    uploadStatus?: UPLOADSTATUS;
    onCancel?: Function;
    onAbort?: Function;
    progress?: number;
    localization?: Localization;
}
export type FileCardUploadLayerProps = {
    [T in keyof FileCardUploadLayerPropsMap]: FileCardUploadLayerPropsMap[T];
};
declare const FileCardUploadLayer: React.FC<FileCardUploadLayerProps>;
export default FileCardUploadLayer;
