import { learningFilterData } from "@/Data/Miscellaneous/Learning/Learning";
import { CategoriesLearning } from "@/Constant";
import { Input, Label } from "reactstrap";

const CategoriesCheckBox = () => {
  return (
    <div className="checkbox-animated">
      <div className="learning-header">
        <span className="f-w-600">{CategoriesLearning}</span>
      </div>
      {learningFilterData.map((data, index) => (
        <Label key={index} className="d-block" for={`chk-ani-${index}`}>
          <Input className="checkbox-primary" id={`chk-ani-${index}`} type="checkbox" />
          {data}
        </Label>
      ))}
    </div>
  );
};

export default CategoriesCheckBox;
