"use client";
import { Container, Row } from 'reactstrap'
import Article from './Article/Article'
import Questions from './Questions/Questions'
import FAQFeaturesTutorial from './FAQFeaturesTutorial/FAQFeaturesTutorial'
import ArticleVideo from './ArticleVideo/ArticleVideo'
import { Faq } from '@/Constant'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';

const FaqContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={Faq} parent={Faq} />
      <Container fluid>
        <Row>
          <Article />
          <Questions />
          <FAQFeaturesTutorial />
          <ArticleVideo />
        </Row>
      </Container>
    </>
  )
}

export default FaqContainer