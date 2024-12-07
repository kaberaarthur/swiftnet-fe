import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { BrandIcons, CategoriesLearning, Color, ProductCategory, Quality } from "@/Constant";

const CategoriesForm = () => {
  return (
    <>
      <h4 className="mt-4">{CategoriesLearning}</h4>
      <Form>
        <div className="product-group">
          <Row>
            <Col sm="12">
              <FormGroup>
                <Label>{ProductCategory}</Label>
                <Input type="select" defaultValue={"Select.."}>
                  <option>Select..</option><option>Man's Shirt</option><option>Man's Jeans</option><option>Women T-shirt</option><option>Women Skirt</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <FormGroup>
                <Label>{BrandIcons}</Label>
                <Input type="select" defaultValue={"Select.."}>
                  <option>Select..</option><option>Levi's</option><option>Hudson</option><option>Denizen</option><option>Spykar</option>
                </Input>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label>{Color}</Label>
                <Input type="select" defaultValue={"Select.."}>
                  <option>Select..</option><option>Black</option><option>Red</option><option>Blue</option><option>White</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <FormGroup>
                <Label>{Quality}</Label>
                <Input type="select" defaultValue={"Brand New"}>
                  <option>Brand New</option><option>Second Hand</option><option>Both Quality</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </div>
      </Form>
    </>
  );
};

export default CategoriesForm;
