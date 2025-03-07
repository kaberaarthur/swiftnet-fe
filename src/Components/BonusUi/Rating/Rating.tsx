"use client"
import { Container, Row } from 'reactstrap'
import SimpleRatingBar from './SimpleRatingBar/SimpleRatingBar'
import MovingRating from './MovingRating/MovingRating'
import SquareRating from './SquareRating/SquareRating'
import PillRating from './PillRating/PillRating'
import ReverseRating from './ReverseRating/ReverseRating'
import StarRating from './StarRating/StarRating'
import HalfStarRating from './HalfStarRating/HalfStarRating'
import ThumbUpDown from './ThumbUpDown/ThumbUpDown'
import HeartRating from './HeartRating/HeartRating'
import { BonusUi, Rating } from '@/Constant'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs'

const RatingContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={Rating} parent={BonusUi}  />
      <Container fluid>
        <Row>
          <SimpleRatingBar />
          <MovingRating />
          <SquareRating />
          <PillRating />
          <ReverseRating />
          <StarRating />
          <HalfStarRating />
          <ThumbUpDown />
          <HeartRating/>
        </Row>
      </Container>
    </>
  )
}

export default RatingContainer