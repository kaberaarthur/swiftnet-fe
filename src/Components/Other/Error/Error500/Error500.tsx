'use client'
import { errorFiveSvgData } from '@/Data/OtherPage/OtherPage'
import CommonError from '../Common/CommonError'

const Error500Container = () => {
  return (
    <CommonError errorSvg={errorFiveSvgData} />
  )
}

export default Error500Container