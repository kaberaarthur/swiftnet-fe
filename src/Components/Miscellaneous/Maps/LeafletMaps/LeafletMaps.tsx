import { Container, Row } from 'reactstrap'
import WorldMap from './WorldMap/WorldMap'
import USAMap from './USAMap/USAMap'
import IndiaMap from './IndiaMap/IndiaMap'
import AustraliaMap from './AustraliaMap/AustraliaMap'
import { LeafletMap, Maps } from '@/Constant'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs'

const LeafletMapsContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={LeafletMap} parent={Maps} />
      <Container fluid>
        <Row>
          <WorldMap />
          <USAMap />
          <IndiaMap />
          <AustraliaMap/>
        </Row>
      </Container>
    </>
  )
}

export default LeafletMapsContainer