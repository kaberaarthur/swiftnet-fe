import { ImagePath } from "@/Constant";
import Image from "next/image";

const DynamicGroupingWithCounter = () => {
  return (
    <div className="customers d-inline-block avatar-group">
      <ul>
        <li className="d-inline-block">
          <Image width={40} height={40} className="img-40 b-r-30" src={`${ImagePath}/avatar/4.jpg`} alt="#" />
        </li>
        <li className="d-inline-block">
          <Image width={40} height={40} className="img-40 b-r-30" src={`${ImagePath}/avatar/5.jpg`} alt="#" />
        </li>
        <li className="d-inline-block">
          <Image width={40} height={40} className="img-40 b-r-30" src={`${ImagePath}/avatar/8.jpg`} alt="#" />
        </li>
        <li className="d-inline-block">
          <span className="b-r-30">+2</span>
        </li>
      </ul>
    </div>
  );
};

export default DynamicGroupingWithCounter;
