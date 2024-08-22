import { useState } from "react";
import { Button, Card, Collapse } from "reactstrap";
import HeaderWithIcon from "../Filter/HeaderWithIcon";
import { AllJobTitle, JobHeading } from "@/Constant";
import JobTitleCheckBox from "./JobTitleCheckBox";

const JobTitleClass = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <Card>
      <HeaderWithIcon heading={JobHeading} isOpen={isOpen} setIsOpen={setIsOpen} />
      <Collapse isOpen={isOpen}>
        <JobTitleCheckBox />
        <Button block className="text-center" color="primary">
          {AllJobTitle}
        </Button>
      </Collapse>
    </Card>
  );
};

export default JobTitleClass;
