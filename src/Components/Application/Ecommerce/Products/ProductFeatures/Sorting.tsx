import { ChangeEvent } from "react";
import { useAppDispatch } from "@/Redux/Hooks";
import { Col, Input } from "reactstrap";
import { filterSortBy } from "@/Redux/Reducers/FilterSlice";
import { Featured, HighestPrices, LowestPrices, ProductShown } from "@/Constant";

const Sorting = () => {
  const dispatch = useAppDispatch();

  const filterSort = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(filterSortBy(event.target.value));
  };
  return (
    <Col md="6" className="text-sm-end">
      <span className="f-w-600 m-r-5">{ProductShown}</span>
      <div className="select2-drpdwn-product select-options d-inline-block" onChange={filterSort}>
        <Input type="select" className="form-control btn-square" name="select" defaultValue={Featured}>
          <option value="Featured">{Featured}</option>
          <option value="LowestPrices">{LowestPrices}</option>
          <option value="HighestPrices">{HighestPrices}</option>
        </Input>
      </div>
    </Col>
  );
};

export default Sorting;
