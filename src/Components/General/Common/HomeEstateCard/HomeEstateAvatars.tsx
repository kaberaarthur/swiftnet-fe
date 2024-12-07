import { ImagePath } from "@/Constant";
import { HomeEstateAvatarsProps } from "@/Type/General/Dashboard/ProjectType";
import Image from "next/image";

const HomeEstateAvatars:React.FC<HomeEstateAvatarsProps> = ({data}) => {
  return (
    <div className="customer d-inline-block avatar-group text-end">
      <ul className="justify-content-end">
        <li className="d-inline-block p-0">
          <Image width={40} height={40} className="img-40 b-r-10" src={`${ImagePath}/${data.imageOne}`} alt="user"/>
        </li>
        <li className="d-inline-block p-0">
          <Image width={40} height={40} className="img-40 b-r-10" src={`${ImagePath}/${data.imageTwo}`}alt="user"/>
        </li>
        <li className="d-inline-block p-0">
          <span className="b-r-10">+{data.number}</span>
        </li>
      </ul>
    </div>
  );
};

export default HomeEstateAvatars;
