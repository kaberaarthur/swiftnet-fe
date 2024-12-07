"use client"
import { Container } from 'reactstrap'
import LeftRibbons from './LeftRibbons/LeftRibbons'
import RightRibbons from './RightRibbons/RightRibbons'
import { BonusUi, Ribbons } from '@/Constant'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs'

const RibbonsContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={Ribbons} parent={BonusUi} />
      <Container fluid>
        <LeftRibbons />
        <RightRibbons />
      </Container>
    </>
  )
}

export default RibbonsContainer