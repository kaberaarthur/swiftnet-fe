import { Button, CardFooter } from 'reactstrap'
import { ButtonBasicInputCancel, ButtonBasicInputSubmit } from '@/Constant'

const BasicInputGroupsCardFooter = () => {
  return (
    <CardFooter>
      <Button color="primary" className="m-r-15">{ButtonBasicInputSubmit}</Button>
      <Button color="light-primary" type="reset">{ButtonBasicInputCancel}</Button>
    </CardFooter>
  )
}

export default BasicInputGroupsCardFooter