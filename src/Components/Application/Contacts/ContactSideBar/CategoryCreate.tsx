import { AddCategory, Cancel, EnterCategoryName, Save } from '@/Constant'
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks'
import { setCategoryModal } from '@/Redux/Reducers/ContactSlice'
import { Button, Col, Form, FormGroup, Input, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'

const CategoryCreate = () => {
  const {categoryModal} =useAppSelector((state)=>state.contact)
  const dispatch = useAppDispatch()
  const categoryToggle = () => dispatch(setCategoryModal())
  return (
    <>
      <Button color='transparent' className='btn-category' onClick= {categoryToggle} >
        <span className="title txt-primary f-w-600"> + {AddCategory}</span>
      </Button>
      <Modal fade isOpen={categoryModal} toggle={categoryToggle}>
        <ModalHeader toggle={categoryToggle}>
          <h3 className="modal-title">{AddCategory}</h3>
        </ModalHeader>
        <ModalBody>
          <Form className="form-bookmark">
            <Row className='g-2'>
              <Col md="12">
                <FormGroup>
                  <Input type="text" required placeholder={EnterCategoryName} autoComplete="off" />
                </FormGroup>
              </Col>
            </Row>
            <Button className="me-2" color='secondary' onClick= {categoryToggle}>{Save}</Button>
            <Button color='primary' onClick= {categoryToggle }>{Cancel}</Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  )
}

export default CategoryCreate