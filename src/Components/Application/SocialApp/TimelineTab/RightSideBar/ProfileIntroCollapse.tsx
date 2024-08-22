import { Button, CardBody, Collapse } from "reactstrap";
import { FilterPropsType } from "@/Type/Application/SocialApp/SocialApp";
import { Fragment } from "react";
import { Dribbble, Facebook, SocialNetworks, Twitter } from "@/Constant";
import { profileIntroData } from "@/Data/Application/SocialApp/SocialApp";
import Link from "next/link";

const ProfileIntroCollapse: React.FC<FilterPropsType> = ({ isFilter }) => {
  return (
    <Collapse isOpen={isFilter}>
      <CardBody className="filter-cards-view">
        {profileIntroData.map((data, index) => (
          <Fragment key={index}>
            <span className="f-w-600 mb-2 d-block">{data.tittle} :</span>
            <p className="mb-3">{data.paragraph}</p>
          </Fragment>
        ))}
        <div className="social-network theme-form">
          <span className="f-w-600">{SocialNetworks}</span>
          <Link href="https://www.facebook.com/">
            <Button color="transparent" className="social-btn btn-fb mb-2 text-center">
              <i className="fa fa-facebook m-r-5" />
              {Facebook}
            </Button>
          </Link>
          <Link href="https://www.twitter.com/">
            <Button color="transparent" className="social-btn btn-twitter mb-2 text-center">
              <i className="fa fa-twitter m-r-5" />
              {Twitter}
            </Button>
          </Link>
          <Link href="https://dribbble.com/session/new">
            <Button color="transparent" className="social-btn btn-google text-center">
              <i className="fa fa-dribbble m-r-5" />
              {Dribbble}
            </Button>
          </Link>
        </div>
      </CardBody>
    </Collapse>
  );
};

export default ProfileIntroCollapse;
