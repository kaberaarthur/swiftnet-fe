"use client";
import { Col, Container } from 'reactstrap'
import { BackToHomePage, MAINTENANCE } from '@/Constant'
import Link from 'next/link';
import { maintenanceSvgData } from '@/Data/OtherPage/OtherPage';

const MaintenanceContainer = () => {
  return (
    <div className="page-wrapper">
      <div className="error-wrapper maintenance-bg">
        <Container>
          <Col xs="12">{maintenanceSvgData}</Col>
          <div className="maintenance-heading">
            <h2 className="headline">{MAINTENANCE}</h2>
          </div>
          <h4 className="sub-content">
            Our Site is Currently under maintenance We will be back Shortly
            <br /> Thank You For Patience
          </h4>
          <div>
            <Link className="btn btn-primary" href={`/dashboard/default`}>{BackToHomePage}</Link>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default MaintenanceContainer