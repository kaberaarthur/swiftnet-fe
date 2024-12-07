import { Button, Card, CardBody, Col } from "reactstrap";
import { AjaxAlert, GithubAvatarHeading } from "@/Constant";
import Swal from "sweetalert2";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";

const GithubAvatar = () => {
  const displayAlert = () => {
    Swal.fire({
      title: "Submit your Github username",
      input: "text",
      inputAttributes: {autocapitalize: "off",},
      showCancelButton: true,
      confirmButtonText: "Look up",
      showLoaderOnConfirm: true,
      preConfirm: async (login) => {
        try {
          const githubUrl = `https://api.github.com/users/${login}`;
          const response = await fetch(githubUrl);
          if (!response.ok) {
            return Swal.showValidationMessage(`${JSON.stringify(await response.json())}`);
          }return response.json();
        } catch (error) {
          Swal.showValidationMessage(`
            Request failed: ${error}
        `);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url,
        });
      }
    });
  };
  return (
    <Col xl="3">
      <Card>
        <CardHeaderCommon headClass="pb-0" title={GithubAvatarHeading} />
        <CardBody>
          <div className="common-flex"><Button color="primary" className="sweet-11" onClick={displayAlert}>{AjaxAlert}</Button></div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default GithubAvatar;
