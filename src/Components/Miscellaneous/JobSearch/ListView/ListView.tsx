"use client"
import { Col, Container, Row } from 'reactstrap'
import CardViewSidebar from '../Common/CardViewSidebar/CardViewSidebar'
import CardsPagination from '../Common/CardViewSidebar/CardsPagination/CardsPagination'
import ListViewCard from './ListViewCard'
import { JobSearch, ListView } from '@/Constant'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs'

const ListViewContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={ListView} parent={JobSearch} />
      <Container fluid className='job-cards-view'>
        <Row>
          <Col xxl="3" xl="4" className="box-col-30">
            <div className="md-sidebar">
              <CardViewSidebar />
            </div>
          </Col>
          <Col xl="9" className="xl-60 box-col-12">
            <ListViewCard />
            <CardsPagination />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ListViewContainer