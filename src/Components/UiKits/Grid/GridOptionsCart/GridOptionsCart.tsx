import { Card, CardBody, Col, Table } from 'reactstrap'
import GridOptionTableHead from './GridOptionTableHead'
import GridOptionTableBody from './GridOptionTableBody'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { GridOptions } from '@/Constant'
import { gridData } from '@/Data/UiKits/Grid/GridData'

const GridOptionsCart = () => {
  return (
    <Col xl="12">
      <Card>
        <CardHeaderCommon title={GridOptions} span={gridData} headClass="pb-0" />
        <CardBody>
          <Table bordered striped responsive>
            <GridOptionTableHead />
            <GridOptionTableBody />
          </Table>
        </CardBody>
      </Card>
    </Col>
  )
}

export default GridOptionsCart