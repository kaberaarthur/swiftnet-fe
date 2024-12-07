import SvgIcon from '@/CommonComponent/SVG/SvgIcon'
import { WebDesigner, WebDesigns } from '@/Constant'
import { commonWebData } from '@/Data/UiKits/Modal/Modal'

const WebDesign = () => {
  return (
    <>
      <div className="large-modal-header">
        <SvgIcon iconId='chevrons-right' className='feather' />
        <h6>{WebDesigns}</h6>
      </div>
      <p className="modal-padding-space">We build specialised websites for companies, list them on digital directories, and set up a sales funnel to boost ROI.</p>
      <h6>{WebDesigner}</h6>
      {commonWebData.map(({ title, className ,pClassName}, index) => (
        <div className={`d-flex ${className}`} key={index}>
          <div className="flex-shrink-0">
            <SvgIcon iconId='arrow-right-circle' className='feather svg-modal' />
          </div>
          <div className="flex-grow-1 ms-2">
            <p className={`mb-0 ${pClassName && pClassName}`}>{title}</p>
          </div>
        </div>
      ))}
    </>
  )
}

export default WebDesign