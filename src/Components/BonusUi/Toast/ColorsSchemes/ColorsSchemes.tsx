import { useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, Toast, ToastBody } from 'reactstrap'
import { ColorsScheme } from '@/Constant'
import { colorSchema } from '@/Data/BonusUi/Toast/Toast'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'

const ColorsSchemes = () => {
  const [open,setOpen] = useState<boolean>(true)
  useEffect(() => {
    setTimeout(()=>{
      setOpen(false)
    },5000)
  },[])
  return (
    <Col xl="6">
      <Card>
        <CardHeaderCommon title={ColorsScheme} span={colorSchema} headClass='pb-0'/>
        <CardBody>
          <Toast fade className="default-show-toast align-items-center text-light bg-tertiary border-0" isOpen={open}>
            <div className="d-flex justify-content-between align-items-center">
              <ToastBody>Your time over after 5 minute.</ToastBody>
              <Button close className="btn-close-white me-2 m-auto" onClick={() => setOpen(false)}></Button>
            </div>
          </Toast>
        </CardBody>
      </Card>
    </Col>
  )
}

export default ColorsSchemes