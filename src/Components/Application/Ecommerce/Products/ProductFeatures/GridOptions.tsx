import { Href } from '@/Constant'
import { useAppDispatch } from '@/Redux/Hooks'
import { setColView } from '@/Redux/Reducers/FilterSlice'
import { filterProductData } from '@/Data/Application/Ecommerce/Product'
import { NavLink } from 'reactstrap'

const GridOptions = () => {
  const dispatch = useAppDispatch();
  const LayoutView = (colClass: string) => dispatch(setColView(colClass));
  return (
    <div className="grid-options d-inline-block">
      <ul className="overflow-visible">
        {filterProductData.map((data, index) => (
          <li key={index} className='p-0'>
            <NavLink className={`product-${data.id}-layout-view`} href={Href} onClick={() => LayoutView(data.colClass)}>
              {data.filterData.map((item, number) => (
                <span key={number} className={`line-grid line-grid-${item} bg-primary`}></span>
              ))}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GridOptions