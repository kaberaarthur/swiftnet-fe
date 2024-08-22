import { Card, CardBody } from 'reactstrap'
import { Brand, Href } from '@/Constant'
import { brandDetailsData } from '@/Data/Application/Ecommerce/ProductPage'
import Link from 'next/link'

const ProductBrand = () => {
  return (
    <Card>
      <CardBody>
        <div className="filter-block">
          <h4>{Brand}</h4>
          <ul>
            {brandDetailsData.map((data,i)=>(
              <li key={i}>
                <Link href={Href} className="f-w-500">{data}</Link>
              </li>
            ))}
          </ul>
        </div>
      </CardBody>
    </Card>
  )
}

export default ProductBrand