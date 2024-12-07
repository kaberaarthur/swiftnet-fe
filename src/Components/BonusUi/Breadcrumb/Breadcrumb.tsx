"use client";
import { Container, Row } from 'reactstrap'
import DefaultBreadcrumb from './DefaultBreadcrumb/DefaultBreadcrumb'
import DividerBreadcrumb from './DividerBreadcrumb/DividerBreadcrumb'
import WithIconsBreadcrumb from './WithIconsBreadcrumb/WithIconsBreadcrumb'
import VariationOfBreadcrumb from './VariationOfBreadcrumb/VariationOfBreadcrumb'
import ColoredBreadcrumb from './ColoredBreadcrumb/ColoredBreadcrumb'
import OutlineBreadcrumb from './OutlineBreadcrumb/OutlineBreadcrumb'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs'
import { BonusUi, BreadcrumbHeading } from '@/Constant'

const BreadcrumbContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={BreadcrumbHeading} parent={BonusUi} />
      <Container fluid>
        <Row>
          <DefaultBreadcrumb />
          <DividerBreadcrumb />
          <WithIconsBreadcrumb />
          <VariationOfBreadcrumb />
          <ColoredBreadcrumb />
          <OutlineBreadcrumb />
        </Row>
      </Container>
    </>
  )
}

export default BreadcrumbContainer