import { Card, CardBody, Col, ListInlineItem } from "reactstrap";
import { tourProfileData, userCardData } from "@/Data/Application/SocialApp/SocialApp";
import { Followers, Following, Href, ImagePath, Posts } from "@/Constant";
import Link from "next/link";
import SvgIcon from "@/CommonComponent/SVG/SvgIcon";
import Image from "next/image";

const FriendsCard = () => {
  return (
    <>
      {userCardData.map((item) => (
        <Col sm="6" xxl="3" xl="4" className="col-ed-4 box-col-4" key={item.id}>
          <Card className="social-profile">
            <CardBody>
              <div className="social-img-wrap">
                <div className="social-img">
                  <Image width={70} height={70} src={`${ImagePath}/${item.avatar}`} alt="user" />
                </div>
                <div className="edit-icon">
                  <SvgIcon iconId={item.icon} className="feather stroke-primary" />
                </div>
              </div>
              <div className="social-details">
                <h4 className="mb-1">
                  <Link className="f-20" href={Href}>
                    {item.name}
                  </Link>
                </h4>
                <span className="font-light">{item.email}</span>
                <ul className="card-social">
                  {tourProfileData.map((item, index) => (
                    <ListInlineItem key={index}>
                      <Link href={item.link} target="_blank" rel="noreferrer">
                        <i className={`${item.icon} font-primary`} />
                      </Link>
                    </ListInlineItem>
                  ))}
                </ul>
                <ul className="social-follow d-block">
                  <li>
                    <h5 className="mb-0">{item.totalPost}</h5>
                    <span className="font-light">{Posts}</span>
                  </li>
                  <li>
                    <h5 className="mb-0">{item.follower}</h5>
                    <span className="font-light">{Followers}</span>
                  </li>
                  <li>
                    <h5 className="mb-0">{item.following}</h5>
                    <span className="font-light">{Following}</span>
                  </li>
                </ul>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default FriendsCard;
