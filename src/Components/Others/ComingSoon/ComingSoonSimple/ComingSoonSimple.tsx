import { Container } from "reactstrap";
import { ImagePath, WeAreComingSoon } from "@/Constant";
import CountdownData from "../Common/CountdownData";
import Image from "next/image";

const ComingSoonSimpleContainer = () => {
  return (
    <div className="page-wrapper compact-wrapper" id="pageWrapper">
      <Container fluid className="p-0">
        <div className="comingsoon">
          <div className="comingsoon-inner text-center">
            <Image width={80} height={71} src={`${ImagePath}/logo/logo-login.png`} alt="comingsoon" />
            {/* <Image width={80} height={71} className="for-dark" src={`${ImagePath}/logo/dark-login-logo.png`} alt="comingsoon" /> */}
            <h5>{WeAreComingSoon}</h5>
            <div className="countdown">
              <CountdownData />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ComingSoonSimpleContainer;
