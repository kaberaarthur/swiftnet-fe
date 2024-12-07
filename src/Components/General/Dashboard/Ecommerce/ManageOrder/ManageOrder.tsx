import { Card, CardBody, Col, Table } from "reactstrap";
import { Href, ImagePath, ManageOrderHeading, Monthly, Weekly, Yearly } from "@/Constant";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";
import { manageOrderData } from "@/Data/General/Dashboard/Ecommerce/Ecommerce";
import Link from "next/link";
import Image from "next/image";

const ManageOrder = () => {
  return (
    <Col md="6" xl="3">
      <Card>
        <CardCommonHeader headClass="pb-0" title={ManageOrderHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
        <CardBody className="manage-order">
          <Table>
            <tbody>
              {manageOrderData.map((data, i) => (
                <tr key={i}>
                  <td>
                    <div className="d-flex gap-2 align-items-center">
                      <div className="flex-shrink-0">
                        <Image width={42} height={42} className="img-fluid img-42 b-r-10" src={`${ImagePath}/avatar/${data.image}`} alt="avatar" />
                      </div>
                      <div className="flex-grow-1">
                        <Link href={Href}>
                          <h6 className="f-w-500">{data.userName}</h6>
                          <span className="f-13">{data.email}</span>
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-block text-end">
                      <h6 className="f-w-500">{data.amount}</h6>
                      <span className="f-w-500">{data.sale} sale</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ManageOrder;
