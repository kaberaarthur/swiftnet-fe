import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { Instructions, SecondExample } from "@/Constant";
import { useState } from "react";
import { SimpleMdeReact } from "react-simplemde-editor";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";

const MdeExampleTwo = () => {
  const [value, setValue] = useState("");
  const handelChange = (newValue: string) => setValue(newValue);
  const mdeEditorText = "Enter text in the area on the left. For more info, click the ? (help) icon in the menu.";

  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <Card>
            <CardCommonHeader title={SecondExample} />
            <CardBody>
              <Row className="editor_container">
                <Col md="6">
                  <SimpleMdeReact id="editor_container" options={{ autofocus: true, spellChecker: false }} onChange={handelChange} />
                </Col>
                <Col md="6" className="reader">
                  <h3>{Instructions}</h3>
                  <p>{mdeEditorText}</p>
                  <br />
                  {value}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MdeExampleTwo;
