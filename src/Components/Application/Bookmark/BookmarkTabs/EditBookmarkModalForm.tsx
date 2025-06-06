import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Cancel, Collection, Description, Group, MyBookmark, Save, Title, WebUrl } from "@/Constant";
import { EditBookmarkModalFormType } from "@/Type/Application/Bookmark/BookmarkType";

export const EditBookmarkModalForm: React.FC<EditBookmarkModalFormType> = ({ register, errors, editToggle, handleSubmit, updateBookMarkData }) => {
  return (
    <Form className="form-bookmark needs-validation" onSubmit={handleSubmit(updateBookMarkData)}>
      <Row className="g-2">
        <Col md="12">
          <FormGroup>
            <Label check>{WebUrl}</Label>
            <input className="form-control" type="text" {...register("url", { required: true })} />
            {errors.url && <span className="txt-danger">Url is required</span>}
          </FormGroup>
        </Col>
        <Col md="12" className="mt-0">
          <FormGroup>
            <Label check>{Title}</Label>
            <input className="form-control" type="text" {...register("title", { required: true })} />
            {errors.title && <span className="txt-danger">Title is required</span>}
          </FormGroup>
        </Col>
        <Col md="12" className="mt-0">
          <FormGroup>
            <Label check>{Description}</Label>
            <input className="form-control" type="textarea" {...register("desc", { required: true })} />
            {errors.desc && <span className="txt-danger">Description is required</span>}
          </FormGroup>
        </Col>
        <Col md="6" className="mt-0">
          <FormGroup>
            <Label check>{Group}</Label>
            <Input type="select" className="form-control" name="group"><option value="bookmark">{MyBookmark}</option></Input>
          </FormGroup>
        </Col> 
        <Col md="6" className="mt-0">
          <FormGroup>
            <Label check>{Collection}</Label>
            <Input type="select" className="form-control" name="collection"><option value="General">General</option><option value="Fs">Fs</option></Input>
          </FormGroup>
        </Col>
      </Row>
      <Button color="primary" type="submit" className="me-1">
        {Save}
      </Button>
      <Button color="secondary" onClick={editToggle}>
        {Cancel}
      </Button>
    </Form>
  );
};
