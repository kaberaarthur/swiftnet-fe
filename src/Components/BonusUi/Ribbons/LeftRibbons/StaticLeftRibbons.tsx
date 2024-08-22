import { Col } from 'reactstrap'
import { CssRibbons, RibbonLeftText2 } from '@/Constant';

const StaticLeftRibbons = () => {
  const ribbonLeftText1 = " have been a part of web design. There is a design for you in this collection, regardless of whether you use ";
  const ribbonLeftTextEm = "Ribbon designs";
  return (
    <Col sm="6" xl="4">
      <div className="ribbon-wrapper solid-border border-1 h-100 bg-light-primary">
        <div className="ribbon ribbon-primary ribbon-space-bottom">SAVE 10%</div>
        <p>
          <em className="font-danger">{ribbonLeftTextEm}</em>{ribbonLeftText1}
          <em className="font-danger">{CssRibbons}</em>{RibbonLeftText2}
        </p>
      </div>
    </Col>
  )
}

export default StaticLeftRibbons