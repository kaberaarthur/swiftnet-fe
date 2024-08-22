import { ImagePath } from "@/Constant";
import Image from "next/image";

const HeaderProfile = () => {
  return (
    <div className="d-flex">
      <div className="media-size-email">
        <Image width={38} height={38} className="me-3 rounded-circle" src={`${ImagePath}/user/4.jpg`} alt="Image" />
      </div>
      <div className="flex-grow-1">
        <h6>{"MARK JENCO"}</h6>
        <p>{"Markjecno@gmail.com"}</p>
      </div>
    </div>
  );
};

export default HeaderProfile;
