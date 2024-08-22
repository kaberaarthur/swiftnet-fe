import { Tooltip } from "reactstrap";
import { mailHeader } from "@/Data/Application/LetterBox/LetterBox";
import { useAppDispatch } from "@/Redux/Hooks";
import { InterviewMail } from "@/Constant";
import { Fragment, useState } from "react";
import { handleInterview } from "@/Redux/Reducers/LetterBoxSlice";
import SvgIcon from "@/CommonComponent/SVG/SvgIcon";

const InterviewMailHeader = () => {
  const dispatch = useAppDispatch();
  const [tooltipOpen, setTooltipOpen] = useState<number | null>(null);
  const toggle = (index: number) => {
    setTooltipOpen(tooltipOpen !== index ? index : null);
  };
  return (
    <div className="mail-header-wrapper header-wrapper1">
      <div className="mail-header1">
        <div className="light-square" onClick={() => dispatch(handleInterview(false))}>
          <SvgIcon className="feather btn-email" iconId="arrow-left" />
        </div>
        <span>{InterviewMail}</span>
      </div>
      <div className="mail-body1">
        {mailHeader.map((data, i) => (
          <Fragment key={i}>
            <div className="light-square" id={`light-${data.icon}`}>
              <SvgIcon iconId={data.icon} className={`feather ${data.className ? data.className : ""}`} />
            </div>
            <Tooltip placement="top" isOpen={tooltipOpen === i} target={`light-${data.icon}`} toggle={() => toggle(i)}>
              {data.tooltip}
            </Tooltip>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default InterviewMailHeader;
