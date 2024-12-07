import { Fragment } from 'react'
import { leftRibbonsDataList } from '@/Data/BonusUi/Ribbons/Ribbons'
import { Col } from 'reactstrap'
import SVG from '@/CommonComponent/SVG'
import { RibbonProp } from '@/Type/BonusUi/BonusUiTypes'

const DynamicLeftRibbons = () => {
  return (
    <>
      {leftRibbonsDataList.map(({ className, ribbonClass, title, span, icon,iconClass }: RibbonProp, index) => (
        <Col sm="6" xl="4" key={index}>
          <div className={`solid-border border-1 h-100 ${className ? className : ""}`}>
            <div className={`ribbon ${ribbonClass}`}>
              {title && title}
              {icon && <SVG className={iconClass} iconId={icon} />}
            </div>
            <p>
              {span.map(({ spanText, text }, index) => (
                <Fragment key={index}>
                  {text && text}
                  {spanText && <em className="txt-danger">{spanText}</em>}
                </Fragment>
              ))}
            </p>
          </div>
        </Col>
      ))}
    </>
  )
}

export default DynamicLeftRibbons