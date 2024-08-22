"use client";
import { Container, Row } from 'reactstrap'
import ZeroConfigurationTable from './ZeroConfigurationTable/ZeroConfigurationTable'
import StateSaving from './StateSaving/StateSaving'
import ScrollVerticalDynamicHeight from './ScrollVerticalDynamicHeight/ScrollVerticalDynamicHeight'
import { BasicDataTables, DataTables } from '@/Constant'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';

const BasicInitContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={BasicDataTables} parent={DataTables} />
      <Container fluid className='basicinit-page'>
        <Row>
          <ZeroConfigurationTable />
          <StateSaving />
          <ScrollVerticalDynamicHeight />
        </Row>
      </Container>
    </>
  )
}

export default BasicInitContainer