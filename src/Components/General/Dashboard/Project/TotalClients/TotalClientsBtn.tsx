import { AllClients, Invite } from "@/Constant";
import Link from "next/link";
import { Button } from "reactstrap";

const TotalClientsBtn = () => {
  return (
    <div className="client-btn d-flex justify-content-between">
      <Link href="/app/letterbox">
        <Button color="secondary">{AllClients}</Button>
      </Link>
      <Link href="/ecommerce/productlist">
        <Button color="primary" className="px-5 px-lg-3 px-md-2">{Invite}</Button>
      </Link>
    </div>
  );
};

export default TotalClientsBtn;
