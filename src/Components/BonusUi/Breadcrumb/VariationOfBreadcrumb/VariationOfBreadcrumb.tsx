import { Breadcrumb, BreadcrumbItem, Card, CardBody, Col } from 'reactstrap'
import { Href, VariationOfBreadcrumbs } from '@/Constant'
import { variationOfBreadcrumbData } from '@/Data/BonusUi/Breadcrumb/Breadcrumb'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import Link from 'next/link'
import SVG from '@/CommonComponent/SVG'

const VariationOfBreadcrumb = () => {
  return (
    <Col sm="6">
      <Card>
        <CardHeaderCommon title={VariationOfBreadcrumbs} span={variationOfBreadcrumbData} headClass='pb-0' />
        <CardBody className="breadcrumb-space">
          <Breadcrumb className="breadcrumb-no-divider mb-3 gap-2">
            <BreadcrumbItem className="mb-1 mb-xl-0">
              <Link href={Href}>{`Home`}</Link>
            </BreadcrumbItem>
            <BreadcrumbItem className="ps-0 mb-1 mb-xl-0">
              <Link href={Href}>{`Chat`}</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active className="ps-0">
              {`Video Chat`}
            </BreadcrumbItem>
          </Breadcrumb>
          <Breadcrumb className="bg-white p-l-0">
            <BreadcrumbItem>
              <Link href={Href}>
                <SVG className='home-icon' iconId='Home' />
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>{`Blog`}</BreadcrumbItem>
            <BreadcrumbItem active className="ps-0">{`Blog Details`}</BreadcrumbItem>
          </Breadcrumb>
        </CardBody>
      </Card>
    </Col>
  )
}

export default VariationOfBreadcrumb