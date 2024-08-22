import { Table } from "reactstrap";

const ProductTables = () => {
  return (
    <div>
      <Table className="product-page-width" borderless>
        <tbody>
          <tr>
            <td>
              <b>Brand :</b>
            </td>
            <td>Pixelstrap</td>
          </tr>
          <tr>
            <td>
              <b>Availability : </b>
            </td>
            <td className="font-success">In stock</td>
          </tr>
          <tr>
            <td>
              <b>Seller : </b>
            </td>
            <td>ABC</td>
          </tr>
          <tr>
            <td>
              <b>Fabric : </b>
            </td>
            <td>Cotton</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ProductTables;
