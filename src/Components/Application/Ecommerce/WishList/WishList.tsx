"use client";
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import { Ecommerce, Wishlist } from '@/Constant'
import WishlistData from './WishlistData'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';
import CardCommonHeader from '@/CommonComponent/CommonCardHeader/CardCommonHeader';

const WishListContainer = () => {
  return (
    <>
        <Breadcrumbs mainTitle={Wishlist} parent={Ecommerce} />
        <Container fluid>
            <Row>
                <Col sm="12">
                    <Card>
                        <CardCommonHeader title={Wishlist} headClass='pb-0' />
                        <CardBody className='whishlist-main'>
                            <WishlistData />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default WishListContainer