"use client"
import { Container, Row } from 'reactstrap'
import BasicTooltips from './BasicTooltips/BasicTooltips'
import ColoredTooltip from './ColoredTooltip/ColoredTooltip'
import TooltipDirections from './TooltipDirections/TooltipDirections'
import ElementsWithHoverEffect from './ElementsWithHoverEffect/ElementsWithHoverEffect'
import FilledTooltip from './FilledTooltip/FilledTooltip'
import WonkyTooltip from './WonkyTooltip/WonkyTooltip'
import ImageTooltip from './ImageTooltip/ImageTooltip'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs'
import { Tooltip, UiKits } from '@/Constant'

const TooltipContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={Tooltip} parent={UiKits}/>
      <Container fluid>
        <Row>
          <BasicTooltips />
          <ColoredTooltip />
          <TooltipDirections />
          <ElementsWithHoverEffect />
          <FilledTooltip />
          <WonkyTooltip />
          <ImageTooltip />
        </Row>
      </Container>
    </>
  )
}

export default TooltipContainer