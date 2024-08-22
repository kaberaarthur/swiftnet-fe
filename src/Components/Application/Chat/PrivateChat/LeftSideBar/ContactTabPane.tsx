import SvgIcon from "@/CommonComponent/SVG/SvgIcon";
import { Href, NameAndPhoneNumber } from "@/Constant";
import { Button, Input } from "reactstrap";
import { ContactList } from "./ContactList";

export const ContactTabPane = () => {
  return (
    <>
      <div className="common-space">
        <p>Contacts</p>
        <div className="header-top">
          <Button tag="a" color="transparent" className="badge-light-primary f-w-500" href={Href}>
            <i className="fa fa-plus" />
          </Button>
        </div>
      </div>
      <div className="search-contacts">
        <Input type="text" placeholder={NameAndPhoneNumber} />
        <SvgIcon className="feather" iconId="micp" />
        <i className="fa fa-search"></i>
      </div>
      <ContactList/>
    </>
  );
};
