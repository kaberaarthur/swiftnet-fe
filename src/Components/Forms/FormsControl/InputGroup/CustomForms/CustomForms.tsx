import { Button, Card, CardBody, Col, Form, InputGroup, InputGroupText, Row } from "reactstrap";
import { CustomForm, CustomFormSubmit, FavoriteChocolatesTitle, FavoriteColorsTitle, FavoriteThemeTitle, OptionsFormGroup, PixelstrapThemeTitle } from "@/Constant";
import CustomFormSelect from "./CustomFormSelect";
import { chocolateData, colorData, customFormData, favoriteThemeData, pixelData } from "@/Data/Forms/FormsControl/InputGroup/InputGroup";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader/CommonCardHeader";

const CustomForms = () => {
  return (
    <Col md="6">
      <Card>
        <CommonCardHeader title={CustomForm} span={customFormData} headClass="pb-0" />
        <CardBody className="card-wrapper input-group-wrapper">
          <Form className="theme-form ">
            <Row className="g-3">
            <InputGroup>
              <InputGroupText>{OptionsFormGroup}</InputGroupText>
              <CustomFormSelect inputId="inputGroupSelect01" title={PixelstrapThemeTitle} options={pixelData} />
            </InputGroup>
            <InputGroup>
              <CustomFormSelect inputId="inputGroupSelect02" title={FavoriteColorsTitle} options={colorData} />
              <InputGroupText>{OptionsFormGroup}</InputGroupText>
            </InputGroup>
            <InputGroup>
              <Button color="secondary" outline>
                <i className="icofont icofont-credit-card"></i>
              </Button>
              <CustomFormSelect inputId="inputGroupSelect03" title={FavoriteChocolatesTitle} options={chocolateData} />
            </InputGroup>
            <InputGroup>
              <CustomFormSelect inputId="inputGroupSelect04" title={FavoriteThemeTitle} options={favoriteThemeData}/>
              <Button color="secondary" outline> {CustomFormSubmit}</Button>
            </InputGroup>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CustomForms;
