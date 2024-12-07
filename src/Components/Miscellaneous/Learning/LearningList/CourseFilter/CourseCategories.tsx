import { useState } from 'react'
import { Button, Card, CardBody, Col, Collapse } from 'reactstrap';
import { FilterLearning, FindCourseLearning } from '@/Constant';
import CommonLearningHeader from '../Common/CommonLearningHeader';
import SearchInput from './SearchInput';
import CategoriesCheckBox from './CategoriesCheckBox';
import DurationCheckBox from './DurationCheckBox';
import PriceCheckBox from './PriceCheckBox';
import StatusCheckBox from './StatusCheckBox';

const CourseCategories = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <Col xl="12">
      <Card className='mb-3'>
        <CommonLearningHeader heading={FindCourseLearning} isOpen={isOpen} setIsOpen={setIsOpen}/>
        <Collapse isOpen={isOpen}>
          <CardBody className="filter-cards-view animate-chk">
            <SearchInput />
            <CategoriesCheckBox />
            <DurationCheckBox />
            <PriceCheckBox />
            <StatusCheckBox />
            <Button color="primary" className="text-center">{FilterLearning}</Button>
          </CardBody>
        </Collapse>
      </Card>
    </Col>
  );
}

export default CourseCategories