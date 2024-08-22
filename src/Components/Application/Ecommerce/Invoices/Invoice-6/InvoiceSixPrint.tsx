import { Button, Col } from "reactstrap";
import { Cancel, Print } from "@/Constant";
import { InvoicePrintType } from "@/Type/Application/Ecommerce/Ecommerce";

const InvoiceSixPrint: React.FC<InvoicePrintType> = ({ handlePrint }) => {
  return (
    <Col sm="12" className="text-center mt-3">
      <Button onClick={handlePrint} color="primary" className="me-2">
        {Print}
      </Button>
      <Button color="secondary">{Cancel}</Button>
    </Col>
  );
};

export default InvoiceSixPrint;
