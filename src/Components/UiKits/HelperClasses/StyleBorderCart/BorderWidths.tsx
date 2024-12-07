import { BorderWidth } from '@/Constant'
import { borderWidthData } from '@/Data/UiKits/HelperClasses/HelperClassesData'
import { Col } from 'reactstrap'

const BorderWidths = () => {
  return (
    <Col lg="3" sm="6">
      <div className="border-wrapper h-100 dark-helper">
        <h5 className="mb-3">{BorderWidth}</h5>
        <div className="helper-common-box">
          <div className="helper-box b-w-1 solid-border"> </div>
          <span>.b-w-1</span>
        </div>
        {borderWidthData.map((item, index) => (
          <div className="helper-common-box" key={index}>
            <div className={`helper-box ${item} solid-border`}> </div>
            <span>.{item}</span>
          </div>
        ))}
      </div>
    </Col>
  )
}

export default BorderWidths