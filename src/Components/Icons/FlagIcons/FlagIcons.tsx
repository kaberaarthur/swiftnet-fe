import  { useState } from 'react'
import { Card, CardHeader, Col, Container, Row } from 'reactstrap';
import { FlagIcon, Icons } from '@/Constant';
import FlagIconCardBody from './FlagIconCardBody';
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';
import IconMarkUp from '../IconMarkUp';

const FlagIconsContainer = () => {
  const [iTag, setITag] = useState<string | object>("");
  const [icon, setIcon] = useState<string | object>("");

  const getITag = (tag: string) => {
    setITag({
      iTag: '<i className="flag-icon flag-icon-' + tag + '"></i>',
    });
    setIcon({
      icon: "flag-icon flag-icon-" + tag + " fa-2x",
    });
  };

  return (
    <>
      <Breadcrumbs mainTitle={FlagIcon} parent={Icons} />
      <Container fluid>
        <Row>
          <Col xl="12">
            <Card>
              <CardHeader className='pb-0 d-flex justify-content-between align-items-center'>
                <h4>{FlagIcon}</h4>
              </CardHeader>
              <FlagIconCardBody getITag={getITag}/>
            </Card>
          </Col>
        </Row>
      </Container>
      <IconMarkUp iTag={iTag} icons={icon} svg={false} />
    </>
  );
}

export default FlagIconsContainer