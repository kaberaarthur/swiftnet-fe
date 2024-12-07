import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { FormGroup, Input, Label } from 'reactstrap';
import { modalOneDatas } from '@/Data/Forms/FormsLayout/TwoFactor/TwoFactor';
import { getValue } from '@/Redux/Reducers/TwoFactorSlice';

const ModalOneData = () => {
  const { selectAuthenticatorMethodName } = useAppSelector((state) => state.twoFactor);
  const dispatch = useAppDispatch();

  return (
    <div className="authentication-options">
      <FormGroup check className="radio radio-primary ps-0">
        <ul className="radio-wrapper">
          {modalOneDatas.map((data, index) => (
            <li key={index}>
              <Input onChange={(e) => dispatch(getValue(e.target.value))} id={data.tittle} type="radio" name="selectAuthenticatorMethodName" checked={selectAuthenticatorMethodName === data.tittle} value={data.tittle} />
              <Label className="mb-0" for={data.tittle} check>
                <i className={`fa ${data.iconClassName}`} />
                <span className="d-flex flex-column">
                  <span>{data.tittle}</span>
                  <span>{data.description}</span>
                </span>
              </Label>
            </li>
          ))}
        </ul>
      </FormGroup>
    </div>
  );
}

export default ModalOneData