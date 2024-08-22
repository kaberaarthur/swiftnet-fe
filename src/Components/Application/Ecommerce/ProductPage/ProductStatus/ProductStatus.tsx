import { Card, CardBody } from 'reactstrap'
import { servicesData } from '@/Data/Application/Ecommerce/ProductPage'
import SvgIcon from '@/CommonComponent/SVG/SvgIcon'

const ProductStatus = () => {
  return (
    <Card>
      <CardBody>
        <div className="collection-filter-block">
          <ul className="pro-services">
            {servicesData.map((data,index) => (
              <li key={index} className='p-0'>
                <div className="d-flex">
                  <SvgIcon className='feather' iconId={data.icon} />
                  <div className="flex-grdow-1">
                    <h5>{data.title} </h5>
                    <p>{data.subtitle}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardBody>
    </Card>
  )
}

export default ProductStatus