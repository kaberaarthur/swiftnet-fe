'use client'
import { errorOneSvgData } from '@/Data/OtherPage/OtherPage'
import CommonError from '../Common/CommonError'

const Error400Container = () => {
  return (
    <CommonError errorSvg={errorOneSvgData}/>
  )
}

export default Error400Container