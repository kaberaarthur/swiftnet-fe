import * as React from "react";
import "./FileCardRightActions.scss";
declare type FileCardRightActionsProps = {
    darkMode?: boolean;
    deleteIcon?: boolean;
    onDelete?: Function;
    imageIcon: boolean;
    onSee: ((imageSource: string | undefined) => void) | undefined;
    videoIcon: boolean;
    onWatch: ((videoSource: File | undefined) => void) | undefined;
    downloadIcon: boolean;
    onDownload: Function | undefined;
    infoIcon: boolean;
    onOpenInfo: Function | undefined;
    isActive?: boolean;
    visible?: boolean;
};
declare const FileCardRightActions: React.FC<FileCardRightActionsProps>;
export default FileCardRightActions;
