'use client'
import { Container, Row } from 'reactstrap'
import KnowledgebaseHelp from './KnowledgebaseHelp/KnowledgebaseHelp'
import Article from '../Faq/Article/Article'
import FAQFeaturesTutorial from '../Faq/FAQFeaturesTutorial/FAQFeaturesTutorial'
import ArticleVideo from '../Faq/ArticleVideo/ArticleVideo'
import CategoryData from './CategoryData/CategoryData'
import { Knowledgebase } from '@/Constant'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs'

const KnowledgebaseContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={Knowledgebase} parent={Knowledgebase} />
      <Container fluid className='table-space'>
        <Row>
          <KnowledgebaseHelp />
          <Article />
          <CategoryData />
          <FAQFeaturesTutorial />
          <ArticleVideo /> 
        </Row>
      </Container>
    </>
  )
}

export default KnowledgebaseContainer