import { Total } from "@/Constant";

const SalesByProductTableFooter = () => {
  return (
    <tfoot className="bg-light">
      <tr>
        <th>{Total}</th>
        <th className="font-dark f-w-800">$9,978</th>
        <th> </th>
        <th />
      </tr>
    </tfoot>
  );
};

export default SalesByProductTableFooter;
