import { Col, Form, FormGroup, Input } from "reactstrap";
import { ImagePath, KnowledgebaseHelpQue, KnowledgebasePlaceholder } from "@/Constant";
import SvgIcon from "@/CommonComponent/SVG/SvgIcon";
import Image from "next/image";

const KnowledgebaseHelp = () => {
  return (
    <Col xs="12" className="position-relative">
      <div className="knowledgebase-bg">
        <Image width={1600} height={500} className="bg-img-cover bg-center" src={`${ImagePath}/knowledgebase/bg_1.jpg`} alt="looginpage" />
      </div>
      <div className="knowledgebase-search">
        <div>
          <h3 className="text-dark">{KnowledgebaseHelpQue}</h3>
          <Form onSubmit={(e) => e.preventDefault()} className="form-inline" method="get">
            <FormGroup className="w-100">
              <SvgIcon iconId="search" className="feather" />
              <Input className="form-control-plaintext w-100" type="text" placeholder={KnowledgebasePlaceholder} />
            </FormGroup>
          </Form>
        </div>
      </div>
    </Col>
  );
};

export default KnowledgebaseHelp;
