import { Breadcrumb, BreadcrumbItem, Card, CardBody, Col } from 'reactstrap'
import { BreadcrumbAlert, BreadcrumbHome, BreadcrumbUiKits, DefaultBreadcrumbs, Href } from '@/Constant'
import { breadcrumbData } from '../../../../Data/BonusUi/Breadcrumb/Breadcrumb'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import Link from 'next/link'

const DefaultBreadcrumb = () => {
  return (
    <Col sm="6">
      <Card>
        <CardHeaderCommon title={DefaultBreadcrumbs} span={breadcrumbData} headClass='pb-0' />
        <CardBody>
          <Breadcrumb className='mb-3'>
            <BreadcrumbItem active>
              <Link href={Href}>{BreadcrumbHome}</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{BreadcrumbUiKits}</BreadcrumbItem>
          </Breadcrumb>
          <Breadcrumb className="m-0">
            <BreadcrumbItem>
              <Link href={Href}>{BreadcrumbHome}</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link href={Href}>{BreadcrumbUiKits}</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{BreadcrumbAlert}</BreadcrumbItem>
          </Breadcrumb>
        </CardBody>
      </Card>
    </Col>
  )
}

export default DefaultBreadcrumb