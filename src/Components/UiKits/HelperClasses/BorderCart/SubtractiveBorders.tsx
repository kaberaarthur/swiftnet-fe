import { SubtractiveBorder } from '@/Constant'
import { subtractiveData } from '@/Data/UiKits/HelperClasses/HelperClassesData'
import { Col } from 'reactstrap'

const SubtractiveBorders = () => {
  return (
    <Col xl="4" sm="6">
      <div className="border-wrapper h-100">
        <h5 className="mb-3">{SubtractiveBorder}</h5>
        <div className="helper-common-box">
          <div className="helper-box bg-light solid-border border-0"> </div>.border-0
        </div>
        {subtractiveData.map((item ,index) => (
          <div className="helper-common-box" key={index}>
            <div className={`helper-box bg-light solid-border ${item}`}> </div>.{item}
          </div>
        ))}
      </div>
    </Col>
  )
}

export default SubtractiveBorders