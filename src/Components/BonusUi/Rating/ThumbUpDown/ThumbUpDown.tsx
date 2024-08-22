//@ts-nocheck
import { useState } from 'react'
import { Card, CardBody, Col } from 'reactstrap';
import { ThumbUpDownRate } from '@/Constant';
import Rating from "react-rating";
import { thumbUpDownData } from '@/Data/BonusUi/Rating/Rating';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';

const ThumbUpDown = () => {
    const [thumbs, setThumbs] = useState<number>(4);

    return (
      <Col xxl="4" md="6">
        <Card>
          <CardHeaderCommon title={ThumbUpDownRate} span={thumbUpDownData} headClass='pb-0' />
          <CardBody>
            <div className="rating">
              <Rating initialRating={thumbs} emptySymbol="font-primary fa fa-thumbs-down fa-2x" fullSymbol="font-primary fa fa-thumbs-up fa-2x" onClick={(rate) => setThumbs(rate)} />
              <span className="font-primary ms-2 mt-1 current-rating">{thumbs}</span>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
}

export default ThumbUpDown