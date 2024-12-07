import { Fragment } from 'react'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Href } from '@/Constant'
import { coloredBreadcrumbDataList } from '../../../../Data/BonusUi/Breadcrumb/Breadcrumb'
import Link from 'next/link'

const DynamicColoredBreadcrumb = () => {
  return (
    <>
      {coloredBreadcrumbDataList.map(({ className, span }, index) => (
        <Breadcrumb className={`breadcrumb-colored ${className}`} key={index}>
          {span.map(({ title, activeTitle }, index) => (
            <Fragment key={index}>
              {title && (
                <BreadcrumbItem>
                  <Link className="fw-bold" href={Href}>{title}</Link>
                </BreadcrumbItem>
              )}
              {activeTitle && <BreadcrumbItem active className="fw-bold bg-transparent">{activeTitle}</BreadcrumbItem>}
            </Fragment>
          ))}
        </Breadcrumb>
      ))}
    </>
  )
}

export default DynamicColoredBreadcrumb