import React from 'react'
import { Col } from 'reactstrap'
import { ImagePath, WilliamJennings } from '@/Constant'
import Image from 'next/image'
import { CommonTourHeaderProp } from '@/Type/BonusUi/BonusUiTypes'

const CommonTourHeader:React.FC<CommonTourHeaderProp> = ({ date, time }) => {
  return (
    <Col sm="8">
      <div className="d-flex">
        <Image width={40} height={40} className="img-thumbnail rounded-circle me-3" src={`${ImagePath}/avatar/5.jpg`} alt="Generic placeholder" />
        <div className="flex-grow-1 align-self-center">
          <h5 className="mt-0 user-name">{WilliamJennings}</h5>
          <div className="tour-wrapper">
            <span>{date}</span>
            <i className="tour-dot font-light fa fa-circle"></i>
            <span className="font-danger">{time}</span>
          </div>
        </div>
      </div>
    </Col>
  )
}

export default CommonTourHeader