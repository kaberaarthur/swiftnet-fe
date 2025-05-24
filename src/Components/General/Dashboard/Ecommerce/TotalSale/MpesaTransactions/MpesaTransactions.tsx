import { useEffect, useState } from "react";
import { Card, CardBody, Col, Table } from "reactstrap";
import { Monthly, Weekly, Yearly } from "@/Constant";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";
import { RootState } from "../../../../../../Redux/Store";
import { useSelector } from 'react-redux';
import Cookies from "js-cookie";

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

  const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`/backend/pppoe-payments?company_id=${user.company_id}`, {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}` || ""
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const data: Transaction[] = await response.json();

        // Sort and limit to 10 transactions
        const sortedTransactions = data
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .slice(0, 6);

        setTransactions(sortedTransactions);

        console.log(sortedTransactions);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (user.company_id) {
      fetchTransactions();
    }
  }, [user.company_id, accessToken]);

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
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>{`${transaction.Phone} - Kes. ${transaction.Amount}`}</td>
                    <td>{transaction.MpesaReceiptNumber}</td>
                    <td>{transaction.Amount}</td>
                    <td>{new Date(transaction.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </CardBody>
      </Card>
    </Col>
  );
};

export default TopSellingProducts;
