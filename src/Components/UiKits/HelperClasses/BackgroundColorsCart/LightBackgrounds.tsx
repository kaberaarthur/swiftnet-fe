import { LightBackground } from '@/Constant'
import { lightBackgroundData } from '@/Data/UiKits/HelperClasses/HelperClassesData'
import { Col } from 'reactstrap'

const LightBackgrounds = () => {
  return (
    <Col xl="6" sm="6">
      <div className="border-wrapper h-100">
        <h5 className="mb-3">{LightBackground}</h5>
        <div className="helper-common-box">
          <div className="helper-box bg-light-primary"> </div>.alert-light-primary
        </div>
        {lightBackgroundData.map((item, index) => (
          <div className="helper-common-box" key={index}>
            <div className={`helper-box ${item}`}> </div>.{item}
          </div>
        ))}
      </div>
    </Col>
  )
}

export default LightBackgrounds