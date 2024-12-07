"use client";
import { Card, Col, Container, Row } from 'reactstrap'
import { hoverData } from '@/Data/Miscellaneous/Gallery/Gallery'
import { Gallery, ImageHoverEffects } from '@/Constant'
import ImageHoverEffectsCardBody from './ImageHoverEffectsCardBody';
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader';

const HoverEffectContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={ImageHoverEffects} parent={Gallery} />
      <Container fluid>
        {hoverData.map((data, index) => (
          <Row key={index}>
            <Col sm="12">
              <Card>
                <CommonCardHeader title={`Hover Effect ${data}`} headClass='pb-0'/>
                <ImageHoverEffectsCardBody data={data} />
              </Card>
            </Col>
          </Row>
        ))}
      </Container>
    </>
  )
}

export default HoverEffectContainer