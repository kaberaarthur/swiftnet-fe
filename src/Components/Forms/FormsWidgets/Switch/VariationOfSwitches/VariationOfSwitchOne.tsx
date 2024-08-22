import { Fragment } from "react";
import { Input, Label } from "reactstrap";
import { variationSwitchDataList } from "@/Data/Forms/FormsWidgets/Switch/Switch";

const VariationOfSwitchOne = () => {
  return (
    <>
      {variationSwitchDataList.map(({ id, inputClass, text, offData, onData }, index) => (
        <Fragment key={index}>
          <li className="tg-list-item">
            <Input className={`tgl ${inputClass}`} id={id} type="checkbox" />
            <Label className="tgl-btn" data-tg-off={offData} data-tg-on={onData} for={id}></Label>
          </li>
          <li>
            <p>{text}</p>
          </li>
        </Fragment>
      ))}
    </>
  );
};

export default VariationOfSwitchOne;
