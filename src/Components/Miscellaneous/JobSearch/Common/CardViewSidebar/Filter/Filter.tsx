import { useState } from 'react'
import { Button, Card, CardBody, Collapse } from 'reactstrap';
import { FilterHeading, FindJobs } from '@/Constant';
import HeaderWithIcon from './HeaderWithIcon';
import SearchAndMap from './SearchAndMap';
import FilterCheckBox from './FilterCheckBox';

const Filter = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    return (
      <div className="accordion faq-accordion accordion accordion-flush" id="accordionExample">
        <Card>
          <HeaderWithIcon heading={FilterHeading} isOpen={isOpen} setIsOpen={setIsOpen}/>
          <Collapse isOpen={isOpen}>
            <CardBody className="filter-cards-view animate-chk">
              <SearchAndMap />
              <FilterCheckBox />
              <Button className="text-center" color="primary" >{FindJobs}</Button>
            </CardBody>
          </Collapse>
        </Card>
      </div>
    );
}

export default Filter