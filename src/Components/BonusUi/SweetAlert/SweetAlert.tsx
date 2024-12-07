'use client'
import { Container, Row } from 'reactstrap'
import BasicExample from './BasicExample/BasicExample'
import { BonusUi, SweetAlert } from '@/Constant'
import AdvanceSweetalert from './AdvanceSweetalert/AdvanceSweetalert'
import UniqueSweetalert from './UniqueSweetalert/UniqueSweetalert'
import DirectionSweetalert from './DirectionSweetalert/DirectionSweetalert'
import InputSweetalert from './InputSweetalert/InputSweetalert'
import GithubAvatar from './GithubAvatar/GithubAvatar'
import RTLSupport from './RTLSupport/RTLSupport'
import MessageTimer from './MessageTimer/MessageTimer'
import ModalWithImages from './ModalWithImages/ModalWithImages'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs'

const SweetAlertsContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={SweetAlert} parent={BonusUi} />
      <Container fluid>
        <Row>
          <BasicExample />
          <AdvanceSweetalert />
          <UniqueSweetalert />
          <DirectionSweetalert />
          <InputSweetalert />
          <GithubAvatar />
          <RTLSupport />
          <MessageTimer />
          <ModalWithImages />
        </Row>
      </Container>
    </>
  )
}

export default SweetAlertsContainer