import { useAppDispatch, useAppSelector } from '@/Redux/Hooks'
import { ContactCreated, ContactHistory, Href } from '@/Constant'
import { setHistory } from '@/Redux/Reducers/ContactSlice'
import { NavLink } from 'reactstrap'

const HistoryClass = () => {
  const {history} = useAppSelector((state)=>state.contact)
  const dispatch = useAppDispatch()
  return (
    <div id="right-history" className={history ? "show":""}>
      <div className="modal-header p-20 border-bottom">
        <h6 className="modal-title w-100">{ContactHistory}
          <span className="pull-right">
            <NavLink className="closehistory" to={Href} onClick={()=>dispatch(setHistory())}>
              <i className="icofont icofont-close"></i>
            </NavLink>
          </span>
        </h6>
      </div>
      <div className="history-details">
        <div className="text-center">
          <i className="icofont icofont-ui-edit"></i>
          <p>{'Contact has not been modified yet.'}</p>
        </div>
        <div className="d-flex">
          <i className="icofont icofont-star"></i>
          <div className="flex-grow-1 mt-0">
            <h6 className="mt-0">{ContactCreated}</h6>
            <p className="mb-0">{'Contact is created via mail'}</p>
            <span className="f-12">Sep 10, 2022 4:00</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryClass