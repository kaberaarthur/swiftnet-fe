import { Button, Card, CardBody, Col } from "reactstrap";
import { Href } from "@/Constant";

const ProfileGreet = () => {
  return (
    <Col xl="4" sm="6">
      <Card className="profile-greeting card-hover">
        <CardBody>
          <div className="img-overlay">
            <h1>Good day, Lena Miller</h1>
            <p>Welcome to the Edmin family! We are delighted that you have visited our dashboard.</p>
            <Button color="primary" href={Href}>
              Go Premium
            </Button>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProfileGreet;
