import { useAppDispatch } from '@/Redux/Hooks';
import { Href } from '@/Constant';
import { setColView, setListView } from '@/Redux/Reducers/FilterSlice';
import SvgIcon from '@/CommonComponent/SVG/SvgIcon';
import { NavLink } from 'reactstrap';

const GridAndListView = () => {
  const dispatch = useAppDispatch();

  const gridLayout = () => {
    dispatch(setListView(false));
    dispatch(setColView("col-xl-3 col-lg-4 col-sm-6"));
  };

  const listLayout = () => dispatch(setListView(true));
  return (
    <>
      <div className="square-product-setting d-inline-block">
        <NavLink className="icon-grid grid-layout-view" href={Href} onClick={gridLayout}>
          <SvgIcon iconId='grid' className='feather' />
        </NavLink>
      </div>
      <div className="square-product-setting d-inline-block">
        <NavLink className="icon-grid m-0 list-layout-view" href={Href} onClick={listLayout}>
          <SvgIcon iconId='list' className='feather' />
        </NavLink>
      </div>
    </>
  )
}

export default GridAndListView