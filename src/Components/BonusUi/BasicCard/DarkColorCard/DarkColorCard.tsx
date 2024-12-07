import { Card, CardBody, CardFooter, Col } from 'reactstrap'
import { DarkColorCards, FooterCard, ImagePath, SmartHeadphones } from '@/Constant'
import { darkColorData } from '@/Data/BonusUi/BasicCard/BasicCard'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';
import Image from 'next/image';

const DarkColorCard = () => {
  const DarkColorText1 = " — also called smart earbuds or hearable — are high-tech in-ear devices that do more than transmit audio. These headphones are usually wireless, and they can sync up with your phone, tablet, computer or other Bluetooth-enabled device. The main appeal of hearables is convenience, as they allow you to complete common tasks without directly accessing your phone or computer. Smart wireless headphones sync up to other devices using Bluetooth technology, and many of their features rely on data from your smartphone or computer.";
  return (
    <Col sm="12">
      <Card className='dark-color-card'>
        <CardHeaderCommon title={DarkColorCards} span={darkColorData} headClass="bg-dark border-bottom"/>
        <CardBody className="bg-dark">
          <div className="d-flex align-items-center gap-3 pills-blogger">
            <div className="blog-wrapper">
              <Image width={100} height={100} className="blog-img img-100" src={`${ImagePath}/dashboard2/product/headphones.png`} alt="head-phone" />
            </div>
            <div className="blog-content">
              <p><em className="font-danger fw-bold">{SmartHeadphones}</em>{DarkColorText1}</p>
            </div>
          </div>
        </CardBody>
        <CardFooter className="bg-dark border-top">
          <h6 className="mb-0">{FooterCard}</h6>
        </CardFooter>
      </Card>
    </Col>
  )
}

export default DarkColorCard