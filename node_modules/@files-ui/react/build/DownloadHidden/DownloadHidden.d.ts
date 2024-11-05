import * as React from "react";
export type DownloadHiddenProps = {
    downloadUrl?: string;
    anchorRef: React.RefObject<HTMLAnchorElement>;
    fileName: string;
};
declare const DownloadHidden: React.FC<DownloadHiddenProps>;
export default DownloadHidden;
