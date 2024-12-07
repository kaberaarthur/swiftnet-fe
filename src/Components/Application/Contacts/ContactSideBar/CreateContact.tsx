import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { SubmitHandler, useForm } from 'react-hook-form'
import { AddContacts, Cancel, EmailAddress, FirstName, LastName, Name, NewContacts, Phone, Save } from '@/Constant';
import { Button, Col, Form, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { ContactUsersType } from '@/Type/Application/Contacts/Contacts';
import { createUser, setContactValidation, setModal } from '@/Redux/Reducers/ContactSlice';
import SvgIcon from '@/CommonComponent/SVG/SvgIcon';

const CreateContact = () => {
  const { modal,contactValidation } = useAppSelector((state) => state.contact);
  const {register,formState: { errors },handleSubmit, reset} = useForm<ContactUsersType>();
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setModal());

  const AddContact: SubmitHandler<ContactUsersType> = (data) => {
    if (data !== undefined) {
      dispatch(createUser(data));
      dispatch(setModal());
      reset();
    }
  };
  return (
    <>
      <Button block className="w-100 btn-mail" color="light-primary" onClick={toggle}>
        <SvgIcon className="feather me-2" iconId='users' />{NewContacts}
      </Button>
      <Modal className="modal-bookmark" isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>{AddContacts}</ModalHeader>
        <ModalBody>
          <Form className="form-bookmark needs-validation" onSubmit={handleSubmit(AddContact)}>
            <Row className="g-3">
              <Col md="12" className='mb-3 mt-0'>
                <Label check>{Name}</Label>
                <Row>
                  <Col sm="6">
                    <input className={`form-control ${contactValidation && `${errors.name ? "is-invalid" : "is-valid"}`}`} type="text" {...register("name", { required: true })} placeholder={FirstName} />
                  </Col>
                  <Col sm="6">
                    <input className={`form-control ${contactValidation && `${errors.sureName ? "is-invalid" : "is-valid"}`}`} type="text" {...register("sureName", { required: true })} placeholder={LastName} />
                  </Col>
                </Row>
              </Col>
              <Col md="12" className='mb-3 mt-0'>
                <Label check>{EmailAddress}</Label>
                <input className={`form-control ${contactValidation && `${errors.email ? "is-invalid" : "is-valid"}`}`} type="text" {...register("email", { required: true })} />
              </Col>
              <Col md="12" className='mb-3 my-0'>
                <Label check>{Phone}</Label>
                <Row>
                  <Col sm="6">  
                    <input className={`form-control ${contactValidation && `${errors.mobile ? "is-invalid" : "is-valid"}`}`} type="number" {...register("mobile", { required: true })} />
                  </Col>
                  <Col sm="6">
                    <Input type="select" defaultValue={"Mobile"}><option>{'Mobile'}</option><option>{'Work'}</option><option>{'Other'}</option></Input>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Button color="secondary" className='me-3' type="submit" onClick={() => dispatch(setContactValidation(true))}>{Save}</Button>
            <Button color="primary" onClick={toggle}>{Cancel}</Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  )
}

export default CreateContact