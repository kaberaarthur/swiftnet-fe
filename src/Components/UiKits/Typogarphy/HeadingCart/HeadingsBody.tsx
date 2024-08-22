import { CardBody, Table } from "reactstrap";
import HeadingsTableBody from "./HeadingsTableBody";
import { Code, FontSize, FontWeight, Heading, Pixel } from "@/Constant";

const HeadingsBody = () => {
  return (
    <CardBody>
      <div className="theme-scrollbar">
        <Table responsive className="mb-0 typography-table">
          <thead>
            <tr>
              <th className="pt-0">{Code}</th>
              <th className="pt-0">{FontSize}</th>
              <th className="pt-0">{Pixel}</th>
              <th className="pt-0">{FontWeight}</th>
              <th className="pt-0">{Heading}</th>
            </tr>
          </thead>
          <HeadingsTableBody />
        </Table>
      </div>
    </CardBody>
  );
};

export default HeadingsBody;
