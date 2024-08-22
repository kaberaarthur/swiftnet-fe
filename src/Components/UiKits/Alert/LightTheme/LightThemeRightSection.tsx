import { Href } from '@/Constant'
import { lightThemeLists } from '@/Data/UiKits/Alert/AlertData'
import Link from 'next/link'
import { Fragment } from 'react'
import { Alert, Col } from 'reactstrap'

const LightThemeRightSection = () => {
  return (
    <Col lg="6">
      <p className="mb-1">Warning Alert</p>
      <Alert color="light-warning" className="border-0">
        <p className="mb-0">{`This is a `}
          <Link className="alert-link txt-warning" href={Href}>warning alert</Link>
          with an example link. Check it out.
        </p>
      </Alert>
      {lightThemeLists.map(({title,color}, index) => (
        <Fragment key={index}>
          <p className="mb-1">{title}</p>
          <Alert color={color}>
            <p className={"mb-0"}>{`This is a `}
              <Link className={`alert-link`} href={Href}>{title}</Link> with an example link. Check it out.
            </p>
          </Alert>
        </Fragment>
      ))}
    </Col>
  )
}

export default LightThemeRightSection