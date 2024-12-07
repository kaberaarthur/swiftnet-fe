import SvgIcon from '@/CommonComponent/SVG/SvgIcon'
import { FREE, ImagePath, PricingPlan, Selected, TrialVersion } from '@/Constant'
import Image from 'next/image'
import { Button } from 'reactstrap'

const PricingPlans = () => {
  return (
    <ul >
      <li>
        <Button outline color="primary">
          <SvgIcon iconId="grid" className="feather" />
          {PricingPlan}
        </Button>
      </li>
      <div className="pricing-plan">
        <h6>{TrialVersion} </h6>
        <h5>{FREE}</h5>
        <p>{'100GB Space'}</p>
        <Button size="xs" color="primary" outline>{Selected}</Button>
        <Image width={128} height={128} className="bg-img" src={`${ImagePath}/file-manager/folder.png`} alt="dashboard"/>
      </div>
    </ul>
  )
}

export default PricingPlans