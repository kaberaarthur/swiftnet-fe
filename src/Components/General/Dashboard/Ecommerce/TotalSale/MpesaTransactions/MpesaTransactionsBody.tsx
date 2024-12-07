import { mpesaTransactionsData } from "@/Data/General/Dashboard/Ecommerce/Ecommerce";

const MpesaTransactionsBody = () => {
  return (
    <>
      {mpesaTransactionsData.map((item, i) => (
        <tr key={i}>
          <td>
            <p>{item.id}</p>
          </td>
          <td>
            <h6 className="f-w-500">{item.firstName}</h6>
          </td>
          <td>
            <h6 className="f-w-500">{item.transId}</h6>
          </td>
          <td>
            <h6 className="f-w-500">{item.amount}</h6>
          </td>
          <td>
            <h6 className="f-w-500">{item.createdAt}</h6>
          </td>
        </tr>
      ))}
    </>
  );
};

export default MpesaTransactionsBody;
