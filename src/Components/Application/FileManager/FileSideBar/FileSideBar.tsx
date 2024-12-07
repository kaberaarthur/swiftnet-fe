import { useState } from 'react'
import { Button, Card, CardBody, Col } from 'reactstrap';
import { FileFilter } from '@/Constant';
import { sideButtons } from '@/Data/Application/FileSideBar/FileSideBar';
import StoragePlan from './StoragePlan';
import PricingPlans from './PricingPlans';
import SvgIcon from '@/CommonComponent/SVG/SvgIcon';

const FileSideBar = () => {
  const [IsOpen, setIsOpen] = useState(false);
  const OnHandelClick = () => {
    setIsOpen(!IsOpen);
  };
  return (
    <Col xl="3" className="box-col-6 pe-0">
      <div className="md-sidebar job-sidebar">
        <Button color="primary" className="md-sidebar-toggle" onClick={OnHandelClick}>
          {FileFilter}
        </Button>
        <div className={`md-sidebar-aside custom-scrollbar ${IsOpen ? "open" : ""}`}>
          <div className="file-sidebar">
            <Card>
              <CardBody className='custom-scrollbar'>
                <ul>
                  {sideButtons.map((item, i) => (
                    <li key={i}>
                      <Button className={item.className} color="">
                        <SvgIcon iconId={item.icon} className='feather' />
                        {item.title}
                      </Button>
                    </li>
                  ))}
                </ul>
                <hr style={{ opacity: 0.25 }} />
                <StoragePlan />
                <hr style={{ opacity: 0.25 }} />
                <PricingPlans />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </Col>
  );
}

export default FileSideBar