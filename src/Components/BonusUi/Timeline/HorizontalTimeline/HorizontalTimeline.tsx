import { Button, Card, CardBody, Col, ListInlineItem, Row } from 'reactstrap'
import { horizontalTimeLineData, horizontalTimeLineDataList } from '@/Data/BonusUi/Timeline/Timeline'
import { HorizontalTimelines, Href, ReadMore } from '@/Constant'
import { HorizontalTimelineProp } from '@/Type/BonusUi/BonusUiTypes'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'

const HorizontalTimeline = () => {
  return (
    <Col xxl="8" xl="7" className="box-col-12">
      <Card>
        <CardHeaderCommon title={HorizontalTimelines} span={horizontalTimeLineData} headClass='pb-0'/>
        <CardBody>
          {horizontalTimeLineDataList.map(({ mainClass, child }: HorizontalTimelineProp, index) => (
            <Row className={`list-inline events timeline-list ${mainClass}`} key={index}>
              {child.map(({ colClass, color, date, header, paragraph, verticalLine1, verticalLine2 }, index) => (
                <Col xxl="4" className={colClass} key={index}>
                  <div>
                    {verticalLine2 && <div className={verticalLine2}></div>}
                    <ListInlineItem className="event-list">
                      <div className="px-4">
                        <div className={`event-date alert-light-${color} txt-${color}`}>{date}</div>
                        <h5 className="f-w-600">{header} </h5>
                        <p className="text-muted">{paragraph}</p>
                        <div className="read-more-btn">
                          <Button color="primary" href={Href} className="px-3">{ReadMore}</Button>
                        </div>
                      </div>
                    </ListInlineItem>
                    {verticalLine1 && <div className={verticalLine1}></div>}
                  </div>
                </Col>
              ))}
            </Row>
          ))}
        </CardBody>
      </Card>
    </Col>
  )
}

export default HorizontalTimeline