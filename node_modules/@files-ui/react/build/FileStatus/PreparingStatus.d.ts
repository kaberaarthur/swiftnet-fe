import * as React from "react";
import { FileStatusProps } from "./FileStatusProps";
export type PreparingStatusProps = {
    [P in keyof FileStatusProps]: FileStatusProps[P];
} & {
    onCancel?: Function;
};
declare const PreparingStatus: React.FC<PreparingStatusProps>;
export default PreparingStatus;
