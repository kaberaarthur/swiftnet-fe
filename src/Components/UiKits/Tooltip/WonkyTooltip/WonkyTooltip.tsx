import { Card, CardBody, Col, Form, Input, InputGroup, InputGroupText } from "reactstrap";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { Password, Username, WonkyTooltipHeading } from "@/Constant";
import { wonkyTooltipData } from "@/Data/UiKits/Tooltip/Tooltip";
import SVG from "@/CommonComponent/SVG";

const WonkyTooltip = () => {
  return (
    <Col xl="6" lg="7">
      <Card>
        <CardHeaderCommon headClass="pb-0" title={WonkyTooltipHeading} span={wonkyTooltipData} />
        <CardBody className="wonky-tooltip">
          <Form>
            <InputGroup>
              <Input type="text" placeholder={Username} />
              <InputGroupText className="bg-primary">
                <SVG className="svg-w-20 svg-white" iconId="Profile" />
                <span className="tooltip bg-white default-border font-primary">
                  Username must consist of "Number or special characters"
                </span>
              </InputGroupText>
            </InputGroup>
            <InputGroup>
              <Input type="text" placeholder={Password}/>
              <InputGroupText className="bg-secondary">
                <SVG className="svg-w-20 svg-white" iconId="Password" />
                <span className="tooltip bg-white default-border font-secondary">
                  Minimum 8 characters password contains combination
                </span>
              </InputGroupText>
            </InputGroup>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default WonkyTooltip;
