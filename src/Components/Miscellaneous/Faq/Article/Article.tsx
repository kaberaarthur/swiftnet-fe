import { Card, CardBody, Col } from 'reactstrap'
import { articleData } from '@/Data/Miscellaneous/Faq/Faq'
import SvgIcon from '@/CommonComponent/SVG/SvgIcon'

const Article = () => {
  return (
    <>
      {articleData.map((item) => (
        <Col xl="4" sm={item.sm} className={`"box-col-${item.box}`} key={item.id}>
          <Card className="bg-primary height_equal">
            <CardBody>
              <div className="faq-widgets d-flex">
                <div className="flex-grow-1">
                  <h4>{item.title}</h4>
                  <p>{item.paragraph}</p>
                </div>
                <SvgIcon className='feather' iconId={item.icon} />
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </>
  )
}

export default Article