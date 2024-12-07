import { NavItem, NavLink } from "reactstrap";
import { AddLabelHeading } from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setModal } from "@/Redux/Reducers/LetterBoxSlice";

const AddLabel = () => {
  const {modal} = useAppSelector((state)=>state.letterBox)
  const dispatch = useAppDispatch()
  return (
    <NavItem>
      <NavLink onClick={()=>dispatch(setModal(!modal))}>
        <i className="fa fa-plus" />
        {AddLabelHeading}
      </NavLink>
    </NavItem>
  );
};

export default AddLabel;
