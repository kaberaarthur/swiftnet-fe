import { AllNotification, Href, ImagePath } from "@/Constant";
import { notificationData } from "@/Data/Layout/HeaderData";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button, ButtonGroup } from "reactstrap";

const ActivityUpdate = () => {
  return (
    <ul className="activity-update">
      {notificationData.map((item, i) => (
        <li className={`d-flex align-items-center b-l-${item.color}`} key={i}>
          <div className="flex-grow-1">
            <span>{item.time}</span>
            <Link href={item.link}>
              <h5>{item.title}</h5>
            </Link>
            <h6>{item.userName}</h6>
          </div>
          <div className="flex-shrink-0">
            <Image className="b-r-15 img-40" height={40} width={40} src={`${ImagePath}/avatar/${item.image}`} alt="avatar" />
          </div>
        </li>
      ))}
      <li className="mt-3 d-flex justify-content-center">
        <ButtonGroup>
          <Button color="secondary" href={Href}>
            {AllNotification}
          </Button>
        </ButtonGroup>
      </li>
    </ul>
  );
};

export default ActivityUpdate;
