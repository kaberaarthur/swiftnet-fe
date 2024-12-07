import { ImagePath } from "@/Constant";
import { CommonFormPropsType } from "@/Type/OtherPages/OtherPages";
import Image from "next/image";
import Link from "next/link";

const CommonLogo:React.FC<CommonFormPropsType> = ({ alignLogo }) => {
  return (
    <Link className={`logo ${alignLogo ? alignLogo : ""}`} href={`/dashboard/default`}>
      <Image width={106} height={37} className="img-fluid" src={`${ImagePath}/logo/logo.png`} alt="loginpage" />
      {/* <Image width={106} height={37} className="for-dark m-auto" src={`${ImagePath}/logo/dark-logo.png`} alt="loginpage" /> */}
    </Link>
  );
};

export default CommonLogo;
