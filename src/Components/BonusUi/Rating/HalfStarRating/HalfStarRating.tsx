// @ts-nocheck
import { useState } from 'react'
import { Card, CardBody, Col } from 'reactstrap';
import Rating from "react-rating";
import { HalfStarRatingBar } from '@/Constant';
import { halfStarRatingData } from '@/Data/BonusUi/Rating/Rating';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';

const HalfStarRating = () => {
    const [rating, setRating] = useState(1.5);

    return (
      <Col xxl="4" md="6">
        <Card>
          <CardHeaderCommon title={HalfStarRatingBar} span={halfStarRatingData} headClass="pb-0" />
          <CardBody>
            <div className="rating">
              <Rating initialRating={rating} fractions={2} emptySymbol="font-primary star fa fa-star-o fa-2x" fullSymbol="font-primary star fa fa-star fa-2x" onChange={(rate) => setRating(rate)} />
              <span className="font-primary current-rating">{rating}</span>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
}

export default HalfStarRating