import * as React from "react";
import { FileStatusProps } from "./FileStatusProps";
export type UploadingStatusProps = {
    [P in keyof FileStatusProps]: FileStatusProps[P];
} & {
    onAbort?: Function;
    progress?: number;
};
declare const UploadingStatus: React.FC<UploadingStatusProps>;
export default UploadingStatus;
