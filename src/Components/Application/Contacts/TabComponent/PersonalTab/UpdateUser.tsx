import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '@/Redux/Hooks';
import { toast } from 'react-toastify';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { Cancel, Email, Mobile, Name, Phone, Save } from '@/Constant';
import { UpdateUserPropsType, UserUpdateType } from '@/Type/Application/Contacts/Contacts';
import { setEditData } from '@/Redux/Reducers/ContactSlice';

const UpdateUser = ({ editData, userEditCallback }:UpdateUserPropsType) => {
  const { register, handleSubmit, formState: { errors } } = useForm<UserUpdateType>();
  const dispatch =useAppDispatch()

  const UpdateContact:SubmitHandler<UserUpdateType> = (updatedData) => {
    const withImageData ={...updatedData,avatar:("user/4.jpg")}
    userEditCallback(false,withImageData)
    dispatch(setEditData(withImageData));
    toast.success("User Update Success")
  };
  return (
    <div className="contact-editform ps-0 m-auto">
      <Form onSubmit={handleSubmit(UpdateContact)}>
        <Row className='g-2'>
          <Col md="12">
            <FormGroup>
              <Label check>{Name}</Label>
              <Row>
                <Col sm="6">
                  <input className="form-control" type="text"  defaultValue={editData?.name} {...register('name', { required: true })} />
                  {errors.name &&  <span className='text-danger'>First name is required</span>}
                </Col>
                <Col sm="6">
                  <input className="form-control" type="text"  defaultValue={editData.sureName} {...register('sureName', { required: true })} />
                  {errors.sureName && <span className='text-danger'>Last name is required</span>}
                </Col>
              </Row>
            </FormGroup>
          </Col>
          <Col md="12">
            <FormGroup>
              <Label check>{Email}</Label>
              <input className="form-control" type="text"  defaultValue={editData.email} {...register('email', { required: true })} />
              {errors.email && <span className='text-danger'>Please enter email between 18 to 70 year.</span>}
            </FormGroup>
          </Col>
          <Col md="12">
            <FormGroup className="my-0">
              <Row>
                <Col sm="6">
                  <Label for="con-phone" check>{Phone}</Label>
                  <input className="form-control"  type="number" defaultValue={editData.mobile} {...register('mobile', { required: true })} />
                  {errors.mobile && <span className='text-danger'>Please enter Mobile no.</span>}
                </Col>
                <Col sm="6">
                  <Label for="con-phone" check>{Mobile}</Label>
                  <Input type="select" >
                    <option>{'Mobile'}</option>
                    <option>{'Work'}</option>
                    <option>{'Other'}</option>
                  </Input>
                </Col>
              </Row>
            </FormGroup>
          </Col>
        </Row>
        <Button color='secondary' className='update-contact me-1'>{Save}</Button>
        <Button color='primary' onClick={() => userEditCallback(false,editData)}>{Cancel}</Button>
      </Form>
    </div>
  )
}

export default UpdateUser