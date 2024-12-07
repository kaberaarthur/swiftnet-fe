import { basicTimeLineDataList } from '@/Data/BonusUi/Timeline/Timeline'

const DynamicBasicTimeline = () => {
  return (
    <>
      {basicTimeLineDataList.map(({ color, date, time, title, span }, index) => (
        <li className="d-flex" key={index}>
          <div className={`timeline-dot-${color}`}></div>
          <div className="w-100 ms-3">
            <p className="d-flex justify-content-between mb-2">
              <span className="date-content bg-light-primary">{date}</span>
              <span>{time}</span>
            </p>
            <h6 className="f-w-600">{title}<span className="dot-notification"></span></h6>
            <p className="font-light">{span}</p>
          </div>
        </li>
      ))}
    </>
  )
}

export default DynamicBasicTimeline