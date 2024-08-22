import { Href } from '@/Constant'
import { lightThemeList } from '@/Data/UiKits/Alert/AlertData'
import Link from 'next/link'
import { Fragment } from 'react'
import { Alert, Col } from 'reactstrap'

const LightThemeLeftSection = () => {
  return (
    <Col lg="6">
      <p className="mb-0">Primary Alert</p>
      <Alert color="light-primary">
        <p className="mb-0">This is a
          <Link className="alert-link font-primary" href={Href}> Primary alert </Link>
          with an example link.Check it out.
        </p>
      </Alert>
      {lightThemeList.map((title, index) => (
        <Fragment key={index}>
          <p className="mb-0">{title} Alert</p>
          <Alert className={`alert-light-${title.toLocaleLowerCase()} border-0`} color={`light-${title.toLocaleUpperCase()}`}>
            <p className={"mb-0"}>{`This is a `}
              <Link className={`alert-link font-${title.toLocaleLowerCase()}`} href={Href}>{title} alert </Link> with an example link. Check it out.
            </p>
          </Alert>
        </Fragment>
      ))}
    </Col>
  )
}

export default LightThemeLeftSection