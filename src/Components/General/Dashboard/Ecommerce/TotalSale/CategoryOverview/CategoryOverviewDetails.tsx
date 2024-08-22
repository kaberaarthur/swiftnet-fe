import { categoryOverviewDetailsData } from "@/Data/General/Dashboard/Ecommerce/Ecommerce";

const CategoryOverviewDetails = () => {
  return (
    <ul>
      {categoryOverviewDetailsData.map((item, i) => (
        <li className="d-flex align-items-center bg-light card-hover" key={i}>
          <div className="flex-shrink-0">
            <div className={`circle-dot-${item.color}`}>
              <span />
            </div>
          </div>
          <div className="flex-grow-1">
            <h6 className="f-w-500">{item.category}</h6>
            <span className="f-13 font-light">{item.count} Products Sold</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CategoryOverviewDetails;
