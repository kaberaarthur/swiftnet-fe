import { Button, Col, Row } from 'reactstrap'
import { ImagePath, MoveToCarts } from '@/Constant'
import { whishListProduct } from '@/Data/Application/Ecommerce/WhishList'
import Link from 'next/link'
import Image from 'next/image'
import { Rating } from 'react-simple-star-rating'

const WishlistData = () => {
  return (
    <Row>
      {whishListProduct.map((item, index) => (
        <Col xl="2" md="4" sm="6" lg="3" key={index}>
          <div className="prooduct-details-box">
            <div className="d-block">
              <Link href={`/ecommerce/productpage`}>
                <Image width={237} height={258} className="align-self-center img-fluid" src={`${ImagePath}/ecommerce/${item.image}`} alt="#" />
              </Link>
              <div className="flex-grow-1">
                <div className="product-name">
                  <Link href={`/ecommerce/productpage`}>
                    <h6>{item.name}</h6>
                  </Link>
                </div>
                <Rating initialValue={5} size={17} />
                <div className="price">Price
                  <span>: 210$</span> 
                </div>
                <div className="avaiabilty">
                  <div className="font-success">InStock</div>
                </div>
                <div>
                  <Button color="primary" size="xs">{MoveToCarts}</Button>
                </div>
              </div>
            </div>
          </div>
        </Col>
       ))} 
    </Row>
  )
}

export default WishlistData