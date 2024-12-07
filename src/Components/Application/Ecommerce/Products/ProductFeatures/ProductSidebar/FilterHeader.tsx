import { useAppDispatch } from '@/Redux/Hooks';
import { CardHeader } from 'reactstrap';
import { Filters } from '@/Constant';
import { setSideBarOn } from '@/Redux/Reducers/FilterSlice';

const FilterHeader = () => {
  const dispatch = useAppDispatch();
  return (
    <CardHeader>
      <h6 className="mb-0 f-w-600"> {Filters}
        <span className="pull-right" onClick={() => dispatch(setSideBarOn())}>
          <i className="fa fa-chevron-down toggle-data"></i>
        </span>
      </h6>
    </CardHeader>
  )
}

export default FilterHeader