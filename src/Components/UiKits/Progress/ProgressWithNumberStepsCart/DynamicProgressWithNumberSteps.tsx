import { progressNumberList } from "@/Data/UiKits/Progress/Progress";
import { Button } from "reactstrap";

const DynamicProgressWithNumberSteps = () => {
  return (
    <>
      {progressNumberList.map(({ color, number, className }, index) => (
        <Button size="sm" color={color} className={`position-absolute top-0 p-0 ${className} translate-middle rounded-circle`} style={{ width: "2rem", height: "2rem" }} key={index}>
          {number}
        </Button>
      ))}
    </>
  );
};

export default DynamicProgressWithNumberSteps;
