import { Progress, Table } from "reactstrap";
import SalesByProductTableFooter from "./SalesByProductTableFooter";
import { salesByProductTableBody } from "@/Data/General/Dashboard/Ecommerce/Ecommerce";

const SalesByProductTable = () => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Amount</th>
          <th>%Sold</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {salesByProductTableBody.map((data, i) => (
          <tr key={i}>
            <td>{data.product}</td>
            <td>{data.amount}</td>
            <td>{data.percentage}</td>
            <td>
              <div className="progress-showcase">
                <Progress value={data.value} className={`sm-progress-bar progress-border-${data.color}`} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      <SalesByProductTableFooter />
    </Table>
  );
};

export default SalesByProductTable;
