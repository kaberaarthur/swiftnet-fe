import { ImagePath } from "@/Constant";
import { groupingImageThird } from "@/Data/UiKits/Avtar/Avtar";
import Image from "next/image";

const GroupInThird = () => {
  return (
    <div className="customers d-inline-block avatar-group">
      <ul>
        <li className="d-inline-block">
          <Image width={40} height={40} className="img-40 b-r-30" src={`${ImagePath}/avatar/4.jpg`} alt="image" />
        </li>
        {groupingImageThird.map((item, index) => (
          <li className="d-inline-block" key={index}>
            <Image width={40} height={40} className="img-40 b-r-30" src={`${ImagePath}/${item}`} alt="image" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupInThird;
