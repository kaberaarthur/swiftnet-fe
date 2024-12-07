import { Col } from "reactstrap";
import { Fragment } from "react";
import { designMeetingAvatarData } from "@/Data/General/Dashboard/Project/Project";
import SvgIcon from "@/CommonComponent/SVG/SvgIcon";
import Image from "next/image";
import { ImagePath } from "@/Constant";

const DesignMeetingAvatar = () => {
  return (
    <Col xs="10" className="timeline-items">
      {designMeetingAvatarData.map((data, i) => (
        <Fragment key={i}>
          <div className={`timeline-box d-flex align-items-center b-w-39 b-t-${data.color}`} key={i}>
            <div className="flex-grow-1">
              <h6 className="f-15 f-w-600 mb-1">{data.title}</h6>
              <div className="font-light">
                <SvgIcon className="feather" iconId="clock" />
                <span className="font-light f-w-400 f-14">{data.time}</span>
              </div>
            </div>
            <div className="team-member text-end">
              <div className="customers d-inline-block avatar-group">
                <ul>
                  {data.avatar.map((item, i) => (
                    <li className="d-inline-block p-0" key={i}>
                      <Image width={38} height={38} className="img-38 b-r-8" src={`${ImagePath}/user/${item}`} alt="#" />
                    </li>
                  ))}
                  <li className="d-inline-block p-0">
                    <span className="b-r-10">+{data.number}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-4" />
        </Fragment>
      ))}
    </Col>
  );
};

export default DesignMeetingAvatar;
