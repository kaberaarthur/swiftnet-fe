import { Card, CardHeader, Col, Row } from 'reactstrap'
import { BrowseArticles, KnowledgeArticle } from '@/Constant'
import CategoryDataCardBody from './CategoryDataCardBody'

const   CategoryData = () => {
  return (
    <Col sm="12">
      <div className="header-faq">
        <h5 className="mb-0">{KnowledgeArticle}</h5>
      </div>
      <Row>
        <Col sm="12">
          <Card>
            <CardHeader>
              <h5 className="f-w-700">{BrowseArticles}</h5>
            </CardHeader>
            <CategoryDataCardBody />
          </Card>
        </Col>
      </Row>
    </Col>
  )
}

export default CategoryData