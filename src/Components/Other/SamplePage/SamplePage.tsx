"use client";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { ImagePath, SampleCards, SamplePage } from "@/Constant";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader/CommonCardHeader";
import Image from "next/image";

const SamplePageContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={SamplePage} parent={SamplePage} />
      <Container fluid>
        <Row>
          <Col xl="12">
            <Card>
              <CommonCardHeader title={SampleCards} headClass="pb-0"/>
              <CardBody>
                <div className="d-flex align-items-center gap-3 pills-blogger"> 
                  <div className="blog-wrapper">
                    <Image width={100} height={100} className="blog-img img-100" src={`${ImagePath}/dashboard2/product/headphones.png`} alt="head-phone" />
                  </div>
                  <div className="blog-content"> 
                    <p> <em className="font-primary fw-bold">Smart headphones</em> - also called smart earbuds or hearable — are high-tech in-ear devices that do more than transmit audio. These headphones are usually wireless, and they can sync up with your phone, tablet, computer or other Bluetooth-enabled device. The main appeal of hearables is convenience, as they allow you to complete common tasks without directly accessing your phone or computer. Smart wireless headphones sync up to other devices using Bluetooth technology, and many of their features rely on data from your smartphone or computer.</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SamplePageContainer;
