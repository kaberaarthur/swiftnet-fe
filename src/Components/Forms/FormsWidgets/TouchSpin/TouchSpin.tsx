'use client'
import { Container, Row } from 'reactstrap'
import DefaultTouchspin from './DefaultTouchspin/DefaultTouchspin'
import OutlinedTouchspin from './OutlinedTouchspin/OutlinedTouchspin'
import IconsWithPrefixAndPostfix from './IconsWithPrefixAndPostfix/IconsWithPrefixAndPostfix'
import ButtonsWithPrefixAndPostfix from './ButtonsWithPrefixAndPostfix/ButtonsWithPrefixAndPostfix'
import RoundedTouchspins from './RoundedTouchspins/RoundedTouchspins'
import { FormsWidgets, Touchspin } from '@/Constant'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs'

const TouchSpinContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={Touchspin} parent={FormsWidgets} />
      <Container fluid>
        <Row>
          <DefaultTouchspin />
          <OutlinedTouchspin />
          <IconsWithPrefixAndPostfix />
          <ButtonsWithPrefixAndPostfix />
          <RoundedTouchspins />
        </Row>
      </Container>
    </>
  )
}

export default TouchSpinContainer