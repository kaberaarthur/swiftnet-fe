import { ImagePath } from "@/Constant";
import { groupingImageTwo } from "@/Data/UiKits/Avtar/Avtar";
import Image from "next/image";

const GroupingSecond = () => {
  return (
    <div className="customers d-inline-block avatar-group">
      <ul>
        <li className="d-inline-block">
          <Image width={60} height={60} className="img-60 rounded-circle" src={`${ImagePath}/avatar/2.jpg`} alt="image" />
        </li>
        {groupingImageTwo.map(({ className, src }, index) => (
          <li className="d-inline-block" key={index}>
            <Image width={100} height={100} className={`${className} h-auto`} src={`${ImagePath}/${src}`} alt="image" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupingSecond;
