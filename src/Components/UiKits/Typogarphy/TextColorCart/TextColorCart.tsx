import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { TextColor } from '@/Constant'
import { textColorData, textDataColor } from '@/Data/UiKits/Typogarphy/Typogarphy'

const TextColorCart = () => {
  return (
    <Col xxl="6">
      <Card>
        <CardHeaderCommon title={TextColor} span={textColorData} headClass='pb-0' />
        <CardBody>
          <div className="d-flex flex-column gap-2">
            <p className="font-primary mb-0">This is Primary text You can archive this adding.<code>.font-primary</code> Class</p>
            {textDataColor.map(({ title, code }, index) => (
              <p className={`${code} mb-0`} key={index}>{`This is ${title} text You can archive this adding.`}<code>{code}</code> Class</p>
            ))}
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default TextColorCart