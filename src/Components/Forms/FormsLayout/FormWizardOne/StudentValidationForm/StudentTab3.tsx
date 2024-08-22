import React from 'react'
import { GitHubPlaceholder, Github, SocialLinks, Submit, Twitter, TwitterPlaceholder } from '@/Constant';
import { Button, Col, Input, InputGroup, Label, Row } from 'reactstrap';
import { StudentTabProp } from '@/Type/Forms/FormsLayout/FormsLayout';

const StudentTab3 :React.FC<StudentTabProp> = ({ studentValidationForm, getUserData}) => {
    const { twitterUrl, gitHubUrl } = studentValidationForm;
  
    return (
      <>
        <h5 className="mb-2">{SocialLinks}</h5>
        <Row className="g-3">
          <Col sm="6">
            <Label check>{Twitter}</Label>
            <Input name="twitterUrl" onChange={getUserData} value={twitterUrl} type="url" placeholder={TwitterPlaceholder} />
          </Col>
          <Col sm="6">
            <Label check>{Github}</Label>
            <Input name="gitHubUrl" onChange={getUserData} value={gitHubUrl} type="url" placeholder={GitHubPlaceholder} />
          </Col>
          <Col xs="12">
            <InputGroup>
              <Input name="studentFile" onChange={getUserData} type="file" />
              <Button color="secondary" outline>{Submit}</Button>
            </InputGroup>
          </Col>
          <Col xs="12">
            <Input type="select" onChange={getUserData} name="positions">
              <option>Positions</option>
              <option>Web Designer</option>
              <option>Software Engineer</option>
              <option>UI/UX Designer </option>
              <option>Web Developer</option>
            </Input>
          </Col>
          <Col xs="12">
            <Label check>Why do you want to take this position?</Label>
            <Input type="textarea" name="positionQuestion" onChange={getUserData} id="questionsTextarea" rows={2} />
          </Col>
        </Row>
      </>
    );
  };

export default StudentTab3