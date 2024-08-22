import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { Bio, Emailaddress, ImagePath, MyProfile, Password, Save, Website } from '@/Constant'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'
import Image from 'next/image'

const EditMyProfile = () => {
  return (
    <Col xl="4">
      <Card>
        <CommonCardHeader title={MyProfile} tagClass='card-title mb-0' />
        <CardBody>
          <Form onSubmit={(event) => event.preventDefault()}>
            <Row className="mb-2">
              <div className="profile-title">
                <div className="d-flex">
                  <Image width={70} height={70} className="img-70 rounded-circle" alt="edit-user" src={`${ImagePath}/avatar/1.jpg`} />
                  <div className="flex-grow-1">
                    <h4 className="mb-1">{'MARK JECNO'}</h4>
                    <p>{'DESIGNER'}</p>
                  </div>
                </div>
              </div>
            </Row>
            <FormGroup>
              <Label tag={'h6'}>{Bio}</Label>
              <Input type='textarea' rows={5} defaultValue={"On the other hand, we denounce with righteous indignation"} />
            </FormGroup>
            <FormGroup>
              <Label>{Emailaddress}</Label>
              <Input placeholder="your-email@domain.com" />
            </FormGroup>
            <FormGroup>
              <Label>{Password}</Label>
              <Input type="password" defaultValue="password" />
            </FormGroup>
            <FormGroup>
              <Label>{Website}</Label>
              <Input placeholder="http://Uplor.com" />
            </FormGroup>
            <div className="form-footer">
              <Button color="primary" block>{Save}</Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  )
}

export default EditMyProfile