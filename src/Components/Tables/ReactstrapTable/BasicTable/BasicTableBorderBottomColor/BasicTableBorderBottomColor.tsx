import { Badge, Card, Col } from 'reactstrap'
import { BasicTableWithBorderBottomColor, ImagePath } from '@/Constant'
import CommonTable from '../Common/CommonTable'
import { basicTableBody, basicTableBorderColor, basicTableHead } from '@/Data/Tables/ReactstrapTable/BasicTable/BasicTable'
import Image from 'next/image'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const BasicTableBorderBottomColor = () => {
  return (
    <Col sm="12">
      <Card className="basicborder-table">
        <CommonCardHeader title={BasicTableWithBorderBottomColor} span={basicTableBorderColor} />
        <CommonTable headData={basicTableHead} headRowClass="b-b-primary">
          {basicTableBody.map((data) => (
            <tr className={`b-b-${data.color}`} key={data.id}>
              <th scope="row">{data.id}</th>
              <td>
                <Image width={30} height={30} className="img-30 me-2" src={`${ImagePath}/${data.image}`} alt="users" />
                {data.firstName}
              </td>
              <td>{data.lastName}</td>
              <td>{data.userName}</td>
              <td>{data.designation}</td>
              <td>{data.company}</td>
              <td>
                <Badge color={`light-${data.badgeColor}`} className={`text-${data.badgeColor}`}>{data.language}</Badge>
              </td>
              <td>{data.country}</td>
            </tr>
          ))}
        </CommonTable>
      </Card>
    </Col>
  )
}

export default BasicTableBorderBottomColor