import { useEffect, useState } from "react";
import { Card, CardBody, Col, Table } from "reactstrap";
import { Monthly, Weekly, Yearly } from "@/Constant";
import MpesaTransactionsBody from "./MpesaTransactionsBody";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";
import { RootState } from "../../../../../../Redux/Store";
import { useSelector } from 'react-redux';


// Define Transaction interface
interface Transaction {
  id: number;
  Amount: string;
  CheckoutRequestID: string;
  ExternalReference: string;
  MerchantRequestID: string;
  MpesaReceiptNumber: string;
  Phone: string;
  ResultCode: number;
  ResultDesc: string;
  Status: string;
  timestamp: string;
  usedStatus: string;
  company_id: number | null;
  company_username: string | null;
  router_id: number | null;
  router_name: string | null;
  plan_id: number | null;
  plan_name: string | null;
  plan_validity: string | null;
  mac_address: string | null;
  phone_number: string | null;
  payment_type: string;
  installation_fee: number | null;
  customer_id: number | null;
}

const TopSellingProducts = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`/backend/pppoe-payments?company_id=${user.company_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data: Transaction[] = await response.json();

        // Sort transactions by timestamp (newest first) and limit to 10
        const sortedTransactions = data
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .slice(0, 10);

        setTransactions(sortedTransactions);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if(user.company_id) {
      fetchTransactions();
    }
  }, []);

  return (
    <Col md="6" xl="6">
      <Card>
        <CardCommonHeader
          headClass="pb-0"
          title={"Recent Mpesa Transactions"}
          firstItem={Weekly}
          secondItem={Monthly}
          thirdItem={Yearly}
        />
        <CardBody className="selling-table checkbox-checked">
          {loading ? (
            <p>Loading transactions...</p>
          ) : error ? (
            <p className="text-danger">Error: {error}</p>
          ) : (
            <Table responsive id="sell-product">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Phone</th>
                  <th>TransID</th>
                  <th>Amount</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>{transaction.Phone}</td>
                    <td>{transaction.MpesaReceiptNumber}</td>
                    <td>{transaction.Amount}</td>
                    <td>{new Date(transaction.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
                {/* Keeping the existing MpesaTransactionsBody if needed */}
                <MpesaTransactionsBody />
              </tbody>
            </Table>
          )}
        </CardBody>
      </Card>
    </Col>
  );
};

export default TopSellingProducts;
