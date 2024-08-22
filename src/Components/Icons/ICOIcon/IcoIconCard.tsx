import React from 'react'
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import {  IconsCommonProps3 } from '@/Type/Icons/IconsTypes';

const IcoIconCard: React.FC<IconsCommonProps3> = ({ title, iconType, parentCallback }) => {
    const getITag = (tag: string) => {
      parentCallback(tag);
    };
    return (
      <Card>
        <CardHeader className='pb-0 d-flex justify-content-between align-items-center'>
          <h4>{title}</h4>
        </CardHeader>
        <CardBody>
          <Row className="icon-event iconly-icons icon-lists">
            {iconType?.map((item, i)=>(
              <Col xxl="2" lg="3" sm="4" key={i} onClick={() => getITag(item)}>
                <Card className="d-flex align-items-center flex-column default-border">
                  <i className={`icofont icofont-${item}`}></i> 
                  <div className="flex-grow-1">
                    <h6>{item}</h6>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>
    );
  };

export default IcoIconCard