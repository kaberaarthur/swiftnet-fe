import { UpdatedProduct } from '@/Constant'

const StaticVariationTimeline = () => {
  return (
    <li className="d-flex">
      <div className="activity-dot-primary"></div>
      <div className="w-100 ms-3">
        <p className="d-flex justify-content-between mb-2">
          <span className="date-content bg-light-primary">8th March, 2022 </span>
          <span>1 day ago</span>
        </p>
        <h6 className="f-w-600">{UpdatedProduct}<span className="dot-notification"></span></h6>
        <p className="font-light">Quisque a consequat ante sit amet magna...</p>
      </div>
    </li>
  )
}

export default StaticVariationTimeline