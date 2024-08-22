import { Card, Col, Table } from 'reactstrap'
import { AddprojectAndUpload, Date, Price, ProjectName, Status } from '@/Constant'
import AddProjectsAndUploadTableBody from './AddProjectsAndUploadTableBody'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const AddProjectsAndUpload = () => {
  return (
    <Col md="12">
      <Card>
        <CommonCardHeader title={AddprojectAndUpload} tagClass="card-title mb-0" />
        <Table responsive className="add-project card-table table-vcenter text-nowrap">
          <thead>
            <tr>
              <th>{ProjectName}</th>
              <th>{Date}</th>
              <th>{Status}</th>
              <th>{Price}</th>
              <th />
            </tr>
          </thead>
          <AddProjectsAndUploadTableBody />
        </Table>
      </Card>
    </Col>
  )
}

export default AddProjectsAndUpload