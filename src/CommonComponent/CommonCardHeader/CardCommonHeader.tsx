import { CardHeader } from "reactstrap";
import Link from "next/link";
import { CardCommonHeaderType } from "@/Type/Layout/CommonCardHeader";
import CardHeaderDropdown from "./CardHeaderDropdown";

const CardCommonHeader = ({ title, subTitle, headClass, mainTitle, firstItem, secondItem, thirdItem, borderClass }: CardCommonHeaderType) => {
  return (
    <CardHeader className={`${headClass} ${!borderClass === true ? "card-no-border" : ""} `}>
      <h4>{title}</h4>
      {subTitle && <Link href={`/dashboard/default`}>{subTitle}</Link>}
      {firstItem && <CardHeaderDropdown mainTitle={mainTitle} firstItem={firstItem} secondItem={secondItem} thirdItem={thirdItem} />}
    </CardHeader>
  );
};

export default CardCommonHeader;
