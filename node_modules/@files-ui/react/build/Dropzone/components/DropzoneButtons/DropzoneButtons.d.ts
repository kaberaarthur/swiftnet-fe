import * as React from "react";
import { Localization } from "@files-ui/core";
import { DropzoneActions } from "../dropzone/DropzoneProps";
import "./DropzoneButtons.scss";
interface DropzoneButtonsProps extends DropzoneActions {
    localization?: Localization;
    onAbort?: Function;
    onDelete?: Function;
    onUpload?: Function;
    onClean?: Function;
    top?: boolean;
    disabled?: boolean;
}
declare const DropzoneButtons: React.FC<DropzoneButtonsProps>;
export default DropzoneButtons;
