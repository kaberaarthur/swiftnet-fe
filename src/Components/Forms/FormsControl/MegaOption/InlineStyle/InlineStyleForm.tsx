import { Badge, Card, Col, Form, Input, Label, Row } from 'reactstrap'
import { inlineStyeDataList } from '@/Data/Forms/FormsControl/MegaOption/MegaOption'

const InlineStyleForm = () => {
  return (
    <Form className="mega-inline">
      <Row>
        {inlineStyeDataList.map(({id,color,badgeTitle,digits,shippingText: shippingText},index) => (
          <Col sm="6" key={index}>
            <Card className='mb-2'>
              <div className="p-20 pb-0 d-flex">
                <Label for={`radio=${id}`} className="d-block" check>
                  <Input id={`radio=${id}`} type="radio" name="radio1" className={`radio-border-${color} radio-${color}`} value="option1" />{badgeTitle}
                </Label>
                <div className='flex-grow-1'>
                  <Badge color={color} className="pull-right digits">{digits}</Badge>
                </div>
              </div>
              <span className="p-20 pt-0">{shippingText}</span>
            </Card>
          </Col>
        ))}
      </Row>
    </Form>
  )
}

export default InlineStyleForm