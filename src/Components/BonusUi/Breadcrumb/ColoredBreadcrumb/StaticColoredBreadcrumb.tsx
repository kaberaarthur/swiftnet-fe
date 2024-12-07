import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { BreadcrumbBonusUi, BreadcrumbHome, BreadcrumbHeading, Href } from '@/Constant'
import Link from 'next/link'

const StaticColoredBreadcrumb = () => {
  return (
    <Breadcrumb className="breadcrumb-colored mb-4 bg-primary">
      <BreadcrumbItem>
        <Link href={Href}>{BreadcrumbHome}</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link href={Href}>{BreadcrumbBonusUi}</Link>
      </BreadcrumbItem>
      <BreadcrumbItem active>{BreadcrumbHeading}</BreadcrumbItem>
    </Breadcrumb>
  )
}

export default StaticColoredBreadcrumb