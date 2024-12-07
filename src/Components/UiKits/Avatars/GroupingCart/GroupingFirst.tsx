import { ImagePath } from "@/Constant";
import { groupingImageOne } from "@/Data/UiKits/Avtar/Avtar";
import Image from "next/image";

const GroupingFirst = () => {
  return (
    <div className="customers d-inline-block avatar-group">
      <ul>
        <li className="d-inline-block">
          <Image width={100} height={100} className="img-100 b-r-8" src={`${ImagePath}/avatar/4.jpg`} alt="image" />
        </li>
        {groupingImageOne.map(({ className, src }, index) => (
          <li className="d-inline-block" key={index}>
            <Image width={100} height={100} className={`${className} h-auto`} src={`${ImagePath}/${src}`} alt="image" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupingFirst;
