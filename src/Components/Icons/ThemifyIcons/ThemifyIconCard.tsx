import React from 'react'
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { IconsCommonProps2 } from '@/Type/Icons/IconsTypes';

const ThemifyIconCard:React.FC<IconsCommonProps2> = ({ iconType, title, parentCallback }) => {
    const getITag = (tag: string | undefined) => {
      parentCallback(tag);
    };
  
    return (
      <>
        <Col xl="12">
          <Card>
            <CardHeader className='pb-0 d-flex justify-content-between align-items-center'>
              <h4>{title}</h4>
            </CardHeader>
            <CardBody>
              <Row className="icon-event iconly-icons icon-lists">
                {iconType.map((icon, i) => {
                  return (
                    <Col xxl="2" xl="3" key={i} onClick={() => getITag(icon)}>
                      <Card className="d-flex align-items-center flex-column default-border">
                        <i className={`${icon}`}></i>
                        <div className="flex-grow-1">
                         <h6>{icon}</h6>
                         </div>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  };

export default ThemifyIconCard