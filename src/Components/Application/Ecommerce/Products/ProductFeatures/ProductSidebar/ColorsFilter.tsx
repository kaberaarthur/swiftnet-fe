import { Fragment, MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Colors } from "@/Constant";
import { filterColor } from "@/Redux/Reducers/FilterSlice";
import { getColors } from "@/utils/Ecommerce.service";

const ColorsFilter = () => {
  const { productItem } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const colors = getColors(productItem);

  const colorHandle = (event: MouseEvent<HTMLLIElement>, color: string) => {
    const elems = document.getElementsByClassName("color-selector")[0].getElementsByTagName("li");
    for (let i = 0; i < elems.length; i++) {
      elems[i].classList.remove("active");
    }
    (event.target as Element).classList.add("active");
    dispatch(filterColor(color));
  };
  return (
    <div className="product-filter slider-product">
      <h6 className="f-w-600">{Colors}</h6>
      <div className="color-selector">
        <ul className="d-flex gap-1">
          {colors.map((color, i) => (
            <Fragment key={i}>
              <li className={color} title={color} onClick={(e) => colorHandle(e, color)}></li>
            </Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ColorsFilter;
