import { Col, Row } from 'reactstrap'
import { LatestArticles } from '@/Constant'
import ArticleVideo1 from './ArticleVideo1'
import ArticleVideo2 from './ArticleVideo2'
import ArticleVideo3 from './ArticleVideo3'

const ArticleVideo = () => {
  return (
    <Col lg="12">
      <div className="header-faq">
        <h4 className="mb-0">{LatestArticles}</h4>
      </div>
      <Row className='latest-articles'>
        <ArticleVideo1 />
        <ArticleVideo2 />
        <ArticleVideo3 />
      </Row>
    </Col>
  )
}

export default ArticleVideo