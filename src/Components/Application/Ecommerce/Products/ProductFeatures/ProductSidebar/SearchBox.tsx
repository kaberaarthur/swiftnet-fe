import { useState } from 'react'
import { useAppDispatch } from '@/Redux/Hooks';
import { Col, Form, Input } from 'reactstrap';
import { Search } from '@/Constant';
import { filterSearchBy } from '@/Redux/Reducers/FilterSlice';

const SearchBox = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const dispatch = useAppDispatch();
  const handleSearchKeyword = (keyword: string) => {
    setSearchKeyword(keyword);
    dispatch(filterSearchBy(searchKeyword));
  };
  return (
    <Col md="9" sm="12">
      <Form>
        <div className="form-group m-0">
          <Input type="search" placeholder={Search} onChange={(e) => handleSearchKeyword(e.target.value)}/>
        </div>
      </Form>
    </Col>
  )
}

export default SearchBox