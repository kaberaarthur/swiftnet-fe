import { Badge, Card, Col, Form, Input, Label, Row } from 'reactstrap'
import { withoutBorderDataList } from '@/Data/Forms/FormsControl/MegaOption/MegaOption'

const WithoutBordersStyleForm = () => {
  return (
    <Form className="mega-inline plain-style">
      <Row>
        {withoutBorderDataList.map(({ id, color, badgeTitle, digits, plansText, check }) => (
          <Col sm="6" key={id}>
            <Card>
              <div className="p-20 pb-0 d-flex">
                <Label for={`checkbox${id}`} check>
                  <Input id={`checkbox${id}`} type="checkbox" className={`checkbox checkbox-border-${color} checkbox-${color}`} defaultChecked={check} />{badgeTitle}
                </Label>
                <div className="flex-grow-1">
                  <Badge color={color} className="pull-right digits">{digits}</Badge>
                </div>
              </div>
              <span className='p-20 pt-0'> {plansText}</span>
            </Card>
          </Col>
        ))}
      </Row>
    </Form>
  )
}

export default WithoutBordersStyleForm