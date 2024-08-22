import { Card, CardBody, CardHeader, Col, Input } from 'reactstrap'
import { SearchArticles, SearchArticlesPlaceholder } from '@/Constant'
import { Search } from 'react-feather'
import { FaRegQuestionCircle } from 'react-icons/fa'

const SearchArticle = () => {
  return (
    <Col lg="12">
      <Card className="card-mb-faq xs-mt-search">
        <CardHeader className="faq-header pb-0">
          <h4 className="ps-0">{SearchArticles}</h4>
          <FaRegQuestionCircle className="fa-regular" />
        </CardHeader>
        <CardBody className="faq-body">
          <div className="faq-form">
            <Input type="text" placeholder={SearchArticlesPlaceholder} />
            <Search className="search-icon" />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default SearchArticle