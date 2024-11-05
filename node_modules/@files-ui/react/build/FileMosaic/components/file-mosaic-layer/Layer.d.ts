import * as React from "react";
import { OverridableComponentProps } from "../../../overridable";
import "./Layer.scss";
interface LayerPropsMap extends OverridableComponentProps {
    visible?: boolean;
}
type DefDivProps = React.HTMLProps<HTMLDivElement>;
type DivPropsOmitInputButtonFullProps = Omit<DefDivProps, keyof LayerPropsMap>;
type LayerProps = DivPropsOmitInputButtonFullProps & {
    [D in keyof LayerPropsMap]: LayerPropsMap[D];
};
declare const Layer: React.FC<LayerProps>;
export default Layer;
