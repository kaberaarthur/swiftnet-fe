import { useCallback, useState } from 'react'
import { Button, Card, CardBody, Col } from 'reactstrap';
import DataTable from "react-data-table-component";
import { DeleteSelectDataButton } from '@/Constant';
import RowSelectionAndDeletionHeader from './RowSelectionAndDeletionHeader';
import { deleteDataColumn, deleteRowDataList } from '@/Data/Tables/DataTables/ApiDataTable/ApiDataTable';
import { DeleteRowData } from '@/Type/Tables/DataTables/DataTables';

const RowSelectionAndDeletion = () => {
    const [data, setData] = useState(deleteRowDataList);
    const [selectedRows, setSelectedRows] = useState<DeleteRowData[]>([]);
    const [toggleCleared, setToggleCleared] = useState(false);
    const handleRowSelected = useCallback((state: { selectedRows:DeleteRowData[] }) => {
      setSelectedRows(state.selectedRows);
    }, []);
    const handleDelete = () => {
      if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map((r: DeleteRowData) => r.name)}?`)) {
        setToggleCleared(!toggleCleared);
        setData(data.filter((item) => (selectedRows.filter((elem: DeleteRowData) => elem.id === item.id).length > 0 ? false : true)));
        setSelectedRows([]);
      }
    };
    return (
      <Col sm="12">
        <Card>
          <RowSelectionAndDeletionHeader />
          <CardBody>
            <div className="table-responsive ">
              {selectedRows.length !== 0 && (<Button color="secondary" onClick={handleDelete} className="mb-3">{DeleteSelectDataButton}</Button>
              )}
              <div id="row-select-delete">
                <DataTable data={data} columns={deleteDataColumn} striped highlightOnHover pagination selectableRows onSelectedRowsChange={handleRowSelected} clearSelectedRows={toggleCleared} className="display custom-scrollbar" />
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
}

export default RowSelectionAndDeletion