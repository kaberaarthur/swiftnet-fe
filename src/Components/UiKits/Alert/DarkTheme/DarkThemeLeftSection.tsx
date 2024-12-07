import { Href } from "@/Constant";
import { darkThemeList } from "@/Data/UiKits/Alert/AlertData";
import Link from "next/link";
import { Fragment } from "react";
import { Alert, Col } from "reactstrap";

const DarkThemeLeftSection = () => {
  return (
    <Col lg="6">
      <p className="mb-1">Primary Alert</p>
      <Alert color="primary" className="dark">
        <p>
          {`This is a `}
          <Link className="alert-link text-white" href={Href}> Primary alert</Link>
          {` with an example link. Check it out.`}
        </p>
      </Alert>
      {darkThemeList.map(({ title, color }, index) => (
        <Fragment key={index}>
          <p className="mb-1">{title} Alert</p>
          <Alert color={color} className="dark">
            <p>
              {`This is a `}
              <Link className="alert-link text-white" href={Href}>
                {title} alert
              </Link>
              {` with an example link. Check it out.`}
            </p>
          </Alert>
        </Fragment>
      ))}
    </Col>
  );
};

export default DarkThemeLeftSection;
