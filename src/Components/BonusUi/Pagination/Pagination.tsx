"use client";
import { Container, Row } from 'reactstrap'
import DefaultPagination from './DefaultPagination/DefaultPagination'
import PaginationActiveAndDisabled from './PaginationActiveAndDisabled/PaginationActiveAndDisabled'
import PaginationWithIcons from './PaginationWithIcons/PaginationWithIcons'
import RoundedPagination from './RoundedPagination/RoundedPagination'
import PaginationAlignment from './PaginationAlignment/PaginationAlignment'
import PaginationSizing from './PaginationSizing/PaginationSizing'
import { BonusUi, Pagination } from '@/Constant'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs'

const PaginationContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={Pagination} parent={BonusUi} />
      <Container fluid>
        <Row>
          <DefaultPagination />
          <PaginationActiveAndDisabled />
          <PaginationWithIcons />
          <RoundedPagination />
          <PaginationAlignment />
          <PaginationSizing />
        </Row>
      </Container>
    </>
  )
}

export default PaginationContainer