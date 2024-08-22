import { CardBody, Collapse } from "reactstrap";
import { FilterPropsType } from "@/Type/Application/SocialApp/SocialApp";
import MessagesAndNotification from "./MessagesAndNotification";
import LikesViewButton from "./LikesViewButton";
import { ImagePath, NewLikesThisWeek } from "@/Constant";
import SocialGroup from "./SocialGroup";
import Image from "next/image";

const MyProfileClassCollapse: React.FC<FilterPropsType> = ({ isFilter }) => {
  return (
    <Collapse isOpen={isFilter}>
      <CardBody className="socialprofile filter-cards-view">
        <div className="d-flex">
          <Image width={50} height={50} className="img-50 img-fluid m-r-20 rounded-circle" src={`${ImagePath}/avatar/1.jpg`} alt="user" />
          <MessagesAndNotification />
        </div>
        <LikesViewButton />
        <div className="likes-profile text-center">
          <h5>
            <span className="font-light">
              <i className="fa fa-heart font-danger" /> 884
            </span>
          </h5>
        </div>
        <div className="text-center">35 {NewLikesThisWeek}</div>
        <div className="customers text-center social-group">
          <SocialGroup />
        </div>
        <Image width={336} height={224} className= "img-fluid mt-5" alt= "timeline-image" src= {`${ImagePath}/social-app/timeline-3.png`}  /> 
      </CardBody>
    </Collapse>
  );
};

export default MyProfileClassCollapse;
