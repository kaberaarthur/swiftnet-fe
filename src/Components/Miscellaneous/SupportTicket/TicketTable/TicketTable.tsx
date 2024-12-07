import { useCallback, useState } from "react";
import DataTable from "react-data-table-component";
import { supportColumnData, supportTicketData } from "@/Data/Miscellaneous/SupportTicket/SupportTicket";
import { DeleteData, DeleteSupportTicket } from "@/Constant";
import { SupportDataType } from "@/Type/Miscellaneous/SupportTicket/SupportTicket";
import { Button } from "reactstrap";

const TicketTable = () => {
  const [selectedRows, setSelectedRows] = useState<SupportDataType[]>([]);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [data, setData] = useState(supportTicketData);

  const handleRowSelected = useCallback((state: { selectedRows: SupportDataType[] }) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map((r: SupportDataType) => r.name)}?`)) {
      setToggleDelete(!toggleDelete);
      setData(data.filter((item) => (selectedRows.filter((elem: SupportDataType) => elem.id === item.id).length > 0 ? false : true)));
      setSelectedRows([]);
    }
  };
  return (
    <div className="table-responsive mb-0">
      {selectedRows.length !== 0 && (
        <div className={`d-flex align-items-center justify-content-between bg-light-info p-2`}>
          <h4 className="text-muted m-0">{DeleteData}</h4>
          <Button color="danger" onClick={handleDelete}>
            {DeleteSupportTicket}
          </Button>
        </div>
      )}
      <DataTable columns={supportColumnData} className="custom-scrollbar" data={data} striped={true} pagination selectableRows onSelectedRowsChange={handleRowSelected} clearSelectedRows={toggleDelete} />
    </div>
  );
};

export default TicketTable;
