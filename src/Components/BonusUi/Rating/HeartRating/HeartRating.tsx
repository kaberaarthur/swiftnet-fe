//@ts-nocheck
import { useState } from 'react'
import { Card, CardBody, Col } from 'reactstrap';
import { HeartRatingBar } from '@/Constant';
import Rating from "react-rating";
import { heartRatingData } from '@/Data/BonusUi/Rating/Rating';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';

const HeartRating = () => {
    const [rating, setRating] = useState(3);

    return (
      <Col xxl="4" md="6">
        <Card>
          <CardHeaderCommon title={HeartRatingBar} span={heartRatingData} headClass='pb-0' />
          <CardBody>
            <div className="rating">
              <Rating initialRating={rating} emptySymbol="font-primary fa fa-heart-o fa-2x" fullSymbol="font-primary fa fa-heart fa-2x" onClick={(rate: number) => setRating(rate)} />
              <span className="font-primary ms-3 mb-1 current-rating">{rating}</span>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
}

export default HeartRating