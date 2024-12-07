import { materialStyleDataList } from '@/Data/UiKits/ReactstrapTabs/BootstrapTabs'
import { TabContentProp } from '@/Type/UiKits/UiKitsType'
import { CardBody, TabContent, TabPane, Table } from 'reactstrap'

const MaterialTabContent:React.FC<TabContentProp> = ({basicTab}) => {
  return (
    <TabContent activeTab={basicTab}>
      {materialStyleDataList.map(({ tabId, header, tableHeaders, tableData }, index) => (
        <TabPane tabId={tabId} key={index}>
          <CardBody className="px-0 pb-0">
            <div className="user-header pb-2">
              <h6 className="f-w-600">{header}</h6>
            </div>
            <div className="user-content">
              <Table responsive className="mb-0">
                <thead>
                  <tr>
                    {tableHeaders.map((item, index) => (
                      <th scope="col" key={index}>
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, index) => (
                        <td key={index}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </TabPane>
      ))}
    </TabContent>
  )
}

export default MaterialTabContent