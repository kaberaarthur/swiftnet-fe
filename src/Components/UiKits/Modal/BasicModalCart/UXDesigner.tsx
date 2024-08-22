import SvgIcon from "@/CommonComponent/SVG/SvgIcon"
import { UXDesigners } from "@/Constant"
import { scrollingUxData } from "@/Data/UiKits/Modal/Modal"

const UXDesigner = () => {
  return (
    <>
      <h6>{UXDesigners}</h6>
      <div className="d-flex mt-3">
        <div className="flex-shrink-0">
          <SvgIcon iconId='arrow-right-circle' className='feather svg-modal' />
        </div>
        <div className="flex-grow-1 ms-2">
          <p>{"User research, persona creation, building wireframes and interactive prototypes, and testing ideas are among the common tasks of a UX designer. These duties can differ greatly between organizations."}</p>
        </div>
      </div>
      {scrollingUxData.map((item, index) => (
        <div className="d-flex mt-3" key={index}>
          <div className="flex-shrink-0">
            <SvgIcon iconId='arrow-right-circle' className='feather svg-modal' />
          </div>
          <div className="flex-grow-1 ms-2">
            <p>{item}</p>
          </div>
        </div>
      ))}
    </>
  )
}

export default UXDesigner