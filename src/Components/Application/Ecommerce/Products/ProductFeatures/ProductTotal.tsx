import { useAppDispatch } from '@/Redux/Hooks';
import { Col, Row } from 'reactstrap';
import { Filters } from '@/Constant';
import GridAndListView from './GridAndListView';
import GridOptions from './GridOptions';
import Sorting from './Sorting';
import { setSideBarOn } from '@/Redux/Reducers/FilterSlice';
import SvgIcon from '@/CommonComponent/SVG/SvgIcon';

const ProductTotal = () => {
  const dispatch = useAppDispatch();
  return (
    <Row>
      <Col md="6" className="products-total">
        <GridAndListView />
        <span className="d-none-productlist filter-toggle"  onClick={() => dispatch(setSideBarOn())}>
          {Filters}
          <span className="ms-2">
            <SvgIcon iconId='chevron-down' className="feather toggle-data" />
          </span>
        </span>
        <GridOptions />
      </Col>
      <Sorting />
    </Row>
  )
}

export default ProductTotal