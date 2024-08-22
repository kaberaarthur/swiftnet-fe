import { Badge, CardBody, Col, Row } from 'reactstrap'
import { Href } from '@/Constant'
import { knowledgeBaseData } from '@/Data/Miscellaneous/KnowledgeBase/KnowledgeBase'
import SvgIcon from '@/CommonComponent/SVG/SvgIcon'
import Link from 'next/link'

const CategoryDataCardBody = () => {
  return (
    <CardBody>
      <Row className="browse g-sm-4 g-3">
        {knowledgeBaseData.map((data) => (
          <Col xl="4" md="6" key={data.id} className="xl-50">
            <div className="browse-articles">
              <h6>
                <span>
                  <SvgIcon iconId={"archive"} className='feather' />
                </span>{data.title}
              </h6>
              <ul>
                {data.knowledgeList &&
                  data.knowledgeList.map((data, index2) => (
                    <li key={index2} className="border-0">
                      <Link href={Href}>
                        {data.fileTextIcon ? (<span><SvgIcon iconId='file-text' className='feather' /></span>) : (<span><SvgIcon iconId='arrow-right' className='feather' /></span>)}
                        <span>{data.text}</span>
                        {data.badge ? <Badge color="primary" className="pull-right">{data.badge}</Badge> : " "}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </Col>
        ))}
      </Row>
    </CardBody>
  )
}

export default CategoryDataCardBody