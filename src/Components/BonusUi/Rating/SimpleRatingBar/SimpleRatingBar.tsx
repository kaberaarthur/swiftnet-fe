// @ts-nocheck
import { useState } from 'react'
import { Card, CardBody, Col } from 'reactstrap';
import { RatingBars } from '@/Constant';
import { barRatingData } from '@/Data/BonusUi/Rating/Rating';
import Rating from "react-rating";
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';

const SimpleRatingBar = () => {
    const [rating, setRating] = useState<number>(8);

    return (
      <Col xxl="4" md="6">
        <Card>
          <CardHeaderCommon title={RatingBars} span={barRatingData} headClass='pb-0' />
          <CardBody>
            <div className="rating">
              <Rating stop={10} initialRating={rating} emptySymbol="br-selected" fullSymbol="br-selected br-current" onChange={(rate) => setRating(rate)} />
              <span className="current-rating">{rating}</span>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
}

export default SimpleRatingBar