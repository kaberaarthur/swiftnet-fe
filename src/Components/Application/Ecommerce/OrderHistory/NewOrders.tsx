import { useState } from 'react'
import { Button, Card, CardBody, Col, Row } from 'reactstrap'
import { Href, ImagePath, NewOrder, Price, Processing } from '@/Constant'
import { orderData } from '@/Data/Application/Ecommerce/OrderHistory'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'
import Image from 'next/image'
import Link from 'next/link'
import SvgIcon from '@/CommonComponent/SVG/SvgIcon'
import { Rating } from "react-simple-star-rating";

const NewOrders = () => {
  const [newOrder,setNewOrder]=useState(orderData)
  const deleteHandler = (id: number) => {
    const newData = newOrder.filter((item) => item.id !== id);
    setNewOrder([...newData]);
  }
  return (
    <Card>
      <CommonCardHeader title={NewOrder} />
      <CardBody>
        <Row className="g-sm-4 g-3">
          {newOrder.map((item, index) => (
            <Col xxl="4" md="6" key={index}>
              <div className="prooduct-details-box">
                <div className="d-flex gap-3">
                  <Image width={60} height={60} className="align-self-center img-fluid img-60" src={`${ImagePath}/ecommerce/${item.image}`} alt={item.name} />
                  <div className="flex-grow-1">
                    <div className="product-name">
                      <h6><Link href={Href}>{item.name}</Link></h6>
                    </div>
                    <Rating initialValue={5} size={17} />
                    <div className="price">
                      <div className="text-muted me-2">{Price}</div>: 210$
                    </div>
                    <div className="avaiabilty">
                      <div className="text-success">In stock</div>
                    </div>
                    <Button color="primary" size="xs">{Processing}</Button>
                    <SvgIcon className="feather close" onClick={() => deleteHandler(item.id)} iconId='x' />
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </CardBody>
    </Card>
  )
}

export default NewOrders