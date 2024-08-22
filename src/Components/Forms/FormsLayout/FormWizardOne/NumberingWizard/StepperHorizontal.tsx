import { stepperHorizontalData } from '@/Data/Forms/FormsLayout/FormWizardOne/FormWizardOne'
import { StepperHorizontalPropsType } from '@/Type/Forms/FormsLayout/FormsLayout'

const StepperHorizontal:React.FC<StepperHorizontalPropsType>= ({ level }) => {
  return (
    <div className="stepper-horizontal custom-scrollbar">
      {stepperHorizontalData.map((data, index) => (
        <div key={index} className={`stepper-${data.step} stepper step ${level > index + 1 ? "done active " : "editing"}`}>
          <div className="step-circle"><span>{index + 1}</span></div>
          <div className="step-title">{data.title}</div>
          <div className="step-bar-left" />
          <div className="step-bar-right" />
        </div>
      ))}
    </div>
  )
}

export default StepperHorizontal