import { ChangeEvent } from "react";
import { Form, Input } from "reactstrap";
import { SearchBarPropsType } from "@/Type/Application/FileSideBar/FileSideBar";
import { SearchPlaceholder } from "@/Constant";

const SearchBar: React.FC<SearchBarPropsType> = ({ setSearchTerm, searchTerm }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };
  return (
    <Form className="form-inline">
      <div className="d-flex mb-0">
        <i className="fa fa-search"></i>
        <Input className="form-control-plaintext p-0" type="text" value={searchTerm} onChange={(e) => handleChange(e)} placeholder={SearchPlaceholder} />
      </div>
    </Form>
  );
};

export default SearchBar;
