import { Fragment } from 'react'
import { rightRibbonDataList } from '@/Data/BonusUi/Ribbons/Ribbons'
import { Col } from 'reactstrap'
import { RibbonProp } from '@/Type/BonusUi/BonusUiTypes'
import SVG from '@/CommonComponent/SVG'

const DynamicRightRibbons = () => {
  return (
    <>
      {rightRibbonDataList.map(({ className, ribbonClass, title, span, icon ,iconClass}: RibbonProp, index) => (
        <Col sm="6" xl="4" key={index}>
          <div className={`border border-1 height-equal ${className ? className : ""}`}>
            <div className={`ribbon ${ribbonClass}`}>
              {title && title}
              {icon && <SVG className={iconClass} iconId={icon} />}
            </div>
            <p>
              {span.map(({ spanText, text }, index) => (
                <Fragment key={index}>
                  {text && text}
                  {spanText && <em className="font-danger">{spanText}</em>}
                </Fragment>
              ))}
            </p>
          </div>
        </Col>
      ))}
    </>
  )
}

export default DynamicRightRibbons