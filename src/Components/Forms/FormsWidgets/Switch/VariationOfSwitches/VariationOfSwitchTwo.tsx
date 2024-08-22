import { Fragment } from 'react'
import { variationSwitchList } from '@/Data/Forms/FormsWidgets/Switch/Switch'
import { Input, Label, Media } from 'reactstrap'

const VariationOfSwitchTwo = () => {
  return (
    <>
      {variationSwitchList.map(({ flexClass, text, color }, index) => (
        <Fragment key={index}>
          <li className="tg-list-item">
            <Media>
              <Media body className={`text-end ${flexClass}`}>
                <Label className="switch mb-0 square-checked">
                  <Input type="checkbox" defaultChecked />
                  <span className={`switch-state bg-${color} rounded-2`}></span>
                </Label>
              </Media>
            </Media>
          </li>
          <li>
            <p>{text}</p>
          </li>
        </Fragment>
      ))}
    </>
  )
}

export default VariationOfSwitchTwo