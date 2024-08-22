"use client";
import { Container, Row } from 'reactstrap'
import HtmlSourcedData from './HtmlSourcedData/HtmlSourcedData'
import AjaxSourcedData from './AjaxSourcedData/AjaxSourcedData'
import JavaScriptSourcedData from './JavaScriptSourcedData/JavaScriptSourcedData'
import ServerSideProcessing from './ServerSideProcessing/ServerSideProcessing'
import { DATASourceDataTables, DataTables } from '@/Constant'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';

const DataSourceContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={DATASourceDataTables} parent={DataTables} />
      <Container fluid className="basicinit-page">
        <Row>
          <HtmlSourcedData />
          <AjaxSourcedData />
          <JavaScriptSourcedData />
          <ServerSideProcessing />
        </Row>
      </Container>
    </>
  )
}

export default DataSourceContainer