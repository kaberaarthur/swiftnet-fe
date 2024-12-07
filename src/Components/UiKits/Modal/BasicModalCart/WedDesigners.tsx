import SvgIcon from "@/CommonComponent/SVG/SvgIcon";
import { WebDesigner } from "@/Constant";
import { scrollingWebData } from "@/Data/UiKits/Modal/Modal";

const WedDesigners = () => {
  return (
    <>
      <h6>{WebDesigner}</h6>
      <div className="d-flex mt-3">
        <div className="flex-shrink-0">
          <SvgIcon iconId="arrow-right-circle" className="feather svg-modal" />
        </div>
        <div className="flex-grow-1 ms-2">
          <p>For a site to be successful, a designer must be able to communicate their ideas, chat with a firm about what they want, and inquire about the target audience.</p>
        </div>
      </div>
      {scrollingWebData.map(({ text, className }, index) => (
        <div className="d-flex mt-2" key={index}>
          <div className="flex-shrink-0">
            <SvgIcon iconId="arrow-right-circle" className="feather svg-modal" />
          </div>
          <div className="flex-grow-1 ms-2">
            <p className={className && className}>{text}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default WedDesigners;
