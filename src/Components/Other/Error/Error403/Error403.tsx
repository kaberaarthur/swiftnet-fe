'use client'
import { errorThreeSvgData } from '@/Data/OtherPage/OtherPage'
import CommonError from '../Common/CommonError'

const Error403Container = () => {
  return (
    <CommonError errorSvg={errorThreeSvgData} />
  )
}

export default Error403Container