import CardHeaderDropdown from "@/CommonComponent/CommonCardHeader/CardHeaderDropdown";
import { ImagePath} from "@/Constant";
import { ContactWrapperData } from "@/Data/Application/Chats";
import { Fragment } from "react";
import ContactEdit from "../UserChat/ContactEdit";
import Image from "next/image";

export const ContactList = () => {
  return (
    <div className="contact-wrapper">
        {ContactWrapperData.map((data, index) => (
          <Fragment key={index}>
            <p>{data.mainLetter}</p>
            {data.contactData.map((item, i) => (
              <ul className="border-0" key={i}>
                <li className="common-space">
                  <div className="chat-time">
                    {item.image && <Image width={42} height={42} className="img-fluid rounded-circle" src={`${ImagePath}/${item.image}`} alt="user" />}
                    {item.imageUser && (
                      <div className={`custom-name bg-light-${item.color}`}>
                        <p className={`txt-${item.color} f-w-500`}>{item.imageUser}</p>
                      </div>
                    )}
                    <div>
                      <span>{item.name}</span>
                      <p>{item.phoneNumber}</p>
                    </div>
                  </div>
                  <div className="contact-edit">
                    <ContactEdit  />
                  </div>
                </li>
              </ul>
            ))}
          </Fragment>
        ))}
    </div>
  );
};
