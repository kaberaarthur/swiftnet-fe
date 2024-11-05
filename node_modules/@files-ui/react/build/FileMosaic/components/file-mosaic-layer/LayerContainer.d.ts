import * as React from "react";
import { OverridableComponentProps } from "../../../overridable";
import "./LayerContainer.scss";
interface LayerContainerPropMap extends OverridableComponentProps {
}
interface LayerDivProps extends React.HTMLProps<HTMLDivElement> {
}
export type LayerContainerProps = {
    [F in keyof LayerDivProps]: LayerDivProps[F];
} & {
    [F in keyof LayerContainerPropMap]: LayerContainerPropMap[F];
};
declare const LayerContainer: React.FC<LayerContainerProps>;
export default LayerContainer;
