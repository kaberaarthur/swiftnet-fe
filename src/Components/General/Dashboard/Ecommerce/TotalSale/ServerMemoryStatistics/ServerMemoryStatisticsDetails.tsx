import { serverMemoryStatisticsDetailsData } from "@/Data/General/Dashboard/Ecommerce/Ecommerce";

const ServerMemoryStatisticsDetails = () => {
  return (
    <ul>
      {serverMemoryStatisticsDetailsData.map((item, i) => (
        <li className="d-flex align-items-center bg-light card-hover" key={i}>
          <div className="flex-shrink-0">
            <div className={`circle-dot-${item.color}`}>
              <span />
            </div>
          </div>
          <div className="flex-grow-1">
            <h6 className="f-w-500">{item.name}</h6>
            <span className="f-13 font-light">{item.amount}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ServerMemoryStatisticsDetails;
