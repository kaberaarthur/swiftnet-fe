import { ImagePath } from '@/Constant'
import { variationTimeLineDataList } from '@/Data/BonusUi/Timeline/Timeline'
import Image from 'next/image'

const DynamicVariationTimeline = () => {
  return (
    <>
      {variationTimeLineDataList.map((data, index) => (
        <li className={`d-flex ${data.className}`} key={index}>
          <div className={`activity-dot-${data.color}`}></div>
          <div className="w-100 ms-3">
            <p className="d-flex justify-content-between mb-2">
              <span className="date-content bg-light-primary">{data.date}</span>
              <span>{data.time}</span>
            </p>
            <h6 className="f-w-600">
              {data.title}
              <span className="dot-notification"></span>
            </h6>
            <p className={data.subTitleClass ? data.subTitleClass : ""}>{data.subTitle}</p>
            {data.image && (
              <div className="recent-images">
                <ul className='flex-row'>
                  {data.image.map((item, index) => (
                    <li key={index}>
                      <div className="recent-img-wrap">
                        <Image width={50} height={50} src={`${ImagePath}/${item}`} className="img-fluid" alt="chair" />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </li>
      ))}
    </>
  )
}

export default DynamicVariationTimeline