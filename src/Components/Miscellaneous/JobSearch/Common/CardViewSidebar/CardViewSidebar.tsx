import { useState } from 'react'
import { JobFilterData } from '@/Constant';
import Filter from './Filter/Filter';
import Location from './Location/Location';
import JobTitleClass from './JobTitleClass/JobTitleClass';
import Industry from './Industry/Industry';
import SkillClass from './SkillClass/SkillClass';
import { Button } from 'reactstrap';

const CardViewSidebar = () => {
  const [filterToggle, setFilterToggle] = useState<boolean>(false);
  const toggle = () => setFilterToggle(!filterToggle);

  return (
    <>
      <Button color="primary" className="email-aside-toggle md-sidebar-toggle" onClick={toggle}>{JobFilterData}</Button>
      <div className={`md-sidebar-aside job-sidebar ${filterToggle ? "open" : ""}`}>
        <div className="default-according style-1 faq-accordion job-accordion">
          <Filter />
          <Location />
          <JobTitleClass />
          <Industry />
          <SkillClass />
        </div>
      </div>
    </>
  );
}

export default CardViewSidebar