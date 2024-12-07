import { Href } from '@/Constant'
import { darkThemeLists } from '@/Data/UiKits/Alert/AlertData'
import Link from 'next/link'
import { Fragment } from 'react'
import { Alert, Col } from 'reactstrap'

const DarkThemeRightSection = () => {
  return (
    <Col lg="6">
      <p className="mb-0">Warning Alert</p>
      <Alert color="warning" className='dark'>
        <p>{`This is a `}
          <Link className="alert-link text-white" href={Href}>Warning alert</Link> with an example link. Check it out.
        </p>
      </Alert>
      {darkThemeLists.map(({ title, color, className }, index) => (
        <Fragment key={index}>
          <p className="mb-0">{title} Alert</p>
          <Alert color={color} className="dark">
            <p>This is a
              <Link className={`alert-link text-${className ? className : "light"}`} href={Href}>{title} alert </Link>
              with an example link. Check it out.
            </p>
          </Alert>
        </Fragment>
      ))}
    </Col>
  )
}

export default DarkThemeRightSection