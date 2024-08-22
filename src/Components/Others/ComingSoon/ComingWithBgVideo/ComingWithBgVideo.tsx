import { Container } from "reactstrap";
import { ImagePath, WeAreComingSoon } from "@/Constant";
import CountdownData from "../Common/CountdownData";
import Image from "next/image";

const ComingWithBgVideoContainer = () => {
  return (
    <Container fluid className="p-0">
      <div className="comingsoon auth-bg-video">
        <video className="bgvideo-comingsoon" id="bgvid" poster={`${ImagePath}/other-images/coming-soon-bg.jpg`} playsInline autoPlay muted loop>
          <source src={"../../assets/video/auth-bg.mp4"} type="video/mp4" />
        </video>
        <div className="comingsoon-inner text-center">
          <Image width={80} height={71} src={`${ImagePath}/logo/logo-login.png`} alt="comingsoon" />
          {/* <Image width={80} height={71} className="for-dark" src={`${ImagePath}/logo/dark-login-logo.png`} alt="comingsoon" /> */}
          <h5>{WeAreComingSoon}</h5>
          <div className="countdown" id="clockdiv">
            <CountdownData />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ComingWithBgVideoContainer;
