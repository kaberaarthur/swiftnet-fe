import { Card, CardBody, CardHeader, Col } from 'reactstrap'
import { FaqLatestUpdates, Href } from '@/Constant'
import { latestFaqData } from '@/Data/Miscellaneous/Faq/Faq'
import Link from 'next/link'

const LatestUpdate = () => {
  return (
    <Col lg="12">
      <Card>
        <CardHeader className="faq-header pb-0">
          <h4 className="d-inline-block">{FaqLatestUpdates}</h4>
          <span className="pull-right d-inline-block">See All</span>
        </CardHeader>
        <CardBody className="faq-body">
          {latestFaqData.map((item, i) => (
            <div className="d-flex updates-faq-main" key={i}>
              <div className="updates-faq">
                {item.iconClass}
              </div>
              <div className="flex-grow-1 updates-bottom-time">
                <p>{item.name} <Link className="font-primary" href={Href}>{item.val}</Link> {item.title}</p>
                <p>{item.time}</p>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </Col>
  )
}

export default LatestUpdate