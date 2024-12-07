import { Button, Card, CardBody } from "reactstrap";
import { ComposeEmail } from "@/Constant";
import EmailNavMenu from "./EmailNavMenu";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { LetterBoxNavType } from "@/Type/Application/LetterBox/LetterBox";
import { setComposeEmail } from "@/Redux/Reducers/LetterBoxSlice";

const EmailLeftSidebar: React.FC<LetterBoxNavType> = ({ navId, setNavId }) => {
  const { composeEmail } = useAppSelector((state) => state.letterBox);
  const dispatch = useAppDispatch();
  return (
    <div className="email-left-aside">
      <Card>
        <CardBody className="custom-scrollbar">
          <div className="email-app-sidebar">
            <Button color="primary" className="emailbox" onClick={() => dispatch(setComposeEmail(!composeEmail))}>
              <i className="fa fa-plus" />
              {ComposeEmail}
            </Button>
            <EmailNavMenu navId={navId} setNavId={setNavId}/>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default EmailLeftSidebar;
