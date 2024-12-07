import { CategoryHeading, Price } from '@/Constant'
import BrandFilter from './BrandFilter'
import ColorsFilter from './ColorsFilter'
import GenderFilter from './GenderFilter'
import RangeSlider from './RangeSlider'

const Category = () => {
  return (
    <>
      <div className="product-filter">
        <h6 className="f-w-600">{CategoryHeading}</h6>
        <GenderFilter />
      </div>
      <BrandFilter />
      <ColorsFilter />
      <div className="product-filter mb-5">
        <h6 className="f-w-600">{Price}</h6>
        <RangeSlider />
      </div>
    </>
  )
}

export default Category