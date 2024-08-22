import SvgIcon from "@/CommonComponent/SVG/SvgIcon";
import { ImagePath } from "@/Constant";
import { balanceData } from "@/Data/UiKits/Modal/Modal";
import { BalanceModalType } from "@/Type/UiKits/UiKitsType";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge, Card, CardBody, Col, Modal } from "reactstrap";

const BalanceModal: React.FC<BalanceModalType> = ({ modalThird, modalThirdToggle }) => {
  return (
    <Modal centered fade isOpen={modalThird} toggle={modalThirdToggle}>
      <Col xl="12">
        <Card className="balance-box mb-0">
          <CardBody>
            <div className="balance-profile">
              <div className="balance-img">
                <Image width={100} height={100} className="image-fluid" src={`${ImagePath}/avatar/9.jpg`} alt="user vector" />
                <Link className="edit-icon" href="/app/users/profile">
                  <div className="icon">
                    <SvgIcon iconId="edit-2" className="feather stroke-primary" />
                  </div>
                </Link>
              </div>
              <span className="font-light d-block">Your Balance</span>
              <h4 className="mt-1">$768,987.90</h4>
              <ul>
                {balanceData.map(({ title, text, data, icon, color }, index) => (
                  <li key={index}>
                    <div className={`balance-item`}>
                      <div className={`balance-icon-wrap bg-light-${color}`}>
                        <div className={`balance-icon bg-${color}`}>
                          <div className="icon">
                            <SvgIcon iconId={icon} className="feather" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className="f-12 f-light">{title}</span>
                        <h5>{text}</h5>
                        <Badge pill color={`light-${color}`} className={`text-${color}`}>
                          {data}
                        </Badge>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Modal>
  );
};

export default BalanceModal;
