import * as React from "react";
import { Localization } from "@files-ui/core";
import { FooterConfig } from "../dropzone/DropzoneProps";
export interface DropzoneFooterProps extends FooterConfig {
    firstClassName?: string;
    accept?: string;
    message?: string;
    localization?: Localization;
    borderRadius?: string | number;
    style?: React.CSSProperties;
    className?: string;
    resetStyles?: boolean;
}
declare const DropzoneFooter: React.FC<DropzoneFooterProps>;
export default DropzoneFooter;
