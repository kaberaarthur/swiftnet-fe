import React, { useMemo, useState } from "react";
import { Card, CardBody, CardHeader, Col, Input, Label } from "reactstrap";
import { RowCreateCallBackSpan, SearchTableButton } from "@/Constant";
import DataTable from "react-data-table-component";
import { rowCreateCallColumn, rowCreateCallData, rowCreateCallList } from "@/Data/Tables/DataTables/AdvanceInit/AdvanceInit";

const RowCreateCallback = () => {
  const [filterText, setFilterText] = useState("");

  const filteredItems = rowCreateCallList.filter((item) => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));
  const subHeaderComponentMemo = useMemo(() => {
    return (
      <div id="row_create_filter" className="dataTables_filter d-flex align-items-center">
        <Label className="me-1">{SearchTableButton}:</Label>
        <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)} type="search" value={filterText} />
      </div>
    );
  }, [filterText]);

  return (
    <Col sm="12">
      <Card>
        <CardHeader className="pb-0 card-no-border">
          <h4 className="mb-2">{RowCreateCallBackSpan}</h4>
          {rowCreateCallData.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </CardHeader>
        <CardBody>
          <div className="table-responsive " id="row_create">
            <DataTable data={filteredItems} columns={rowCreateCallColumn} highlightOnHover striped pagination className="display dataTable custom-scrollbar" subHeader subHeaderComponent={subHeaderComponentMemo} />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default RowCreateCallback;
