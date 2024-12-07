import { Input } from 'reactstrap'
import { verticalBoxData } from '@/Data/Forms/FormsLayout/FormsWizardTwo/FormsWizardTwo'

const VariationBox = () => {
  return (
    <div className="variation-box mb-3">
      {verticalBoxData.map((data, index) => (
        <div className="selection-box" key={index}>
          <Input type="checkbox" />
          <div className="custom--mega-checkbox">
            <ul className="flex-column">
              <li>{data.tittle}</li>
              <li className="txt-primary">{data.details}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

export default VariationBox