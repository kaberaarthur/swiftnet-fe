import { Class, ValueOfClass } from "@/Constant";
import { GridCommonCardFooterType } from "@/Type/UiKits/UiKitsType";
import { CardFooter, Table } from "reactstrap";

const GridCommonCardFooter:React.FC<GridCommonCardFooterType> = ({ className, valueClass }) => {
  return (
    <CardFooter>
      <Table className="w-100" responsive>
        <tbody>
          <tr>
            <th>{Class}</th>
            <th>{ValueOfClass}</th>
          </tr>
          <tr>
            <td><code>{className}</code></td>
            <td>{valueClass}</td>
          </tr>
        </tbody>
      </Table>
    </CardFooter>
  );
};

export default GridCommonCardFooter;