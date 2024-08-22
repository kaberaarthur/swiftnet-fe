import { Button, CardFooter } from 'reactstrap'
import { Cancel, Submit } from '@/Constant'
import { CommonCardFooterProp } from '@/Type/Forms/FormControls/FormsControls'

const CommonCardFooter:React.FC<CommonCardFooterProp> = ({ footerClass, color1, btn2Class, btn1Class, color2 }) => {
  return (
    <CardFooter className={footerClass}>
      <Button color={color1} className={`m-r-15 ${btn1Class}`}>{Submit}</Button>
      <Button color={color2} className={color2} type="reset">{Cancel}</Button>
    </CardFooter>
  )
}

export default CommonCardFooter