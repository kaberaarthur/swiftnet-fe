import { useState } from 'react'
import { Card, CardBody, Col, Collapse } from 'reactstrap';
import { CategoriesTitleLearning } from '@/Constant';
import DesignCategories from './DesignCategories';
import DevelopmentCategories from './DevelopmentCategories';
import CommonLearningHeader from '../../Common/CommonLearningHeader';

const CategoriesCheckBoxes = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    return (
      <Col xl="12">
        <Card className='mb-3'>
          <CommonLearningHeader heading={CategoriesTitleLearning} isOpen={isOpen} setIsOpen={setIsOpen}/> 
          <CardBody className='px-0 custom-scrollbar'>
            <Collapse isOpen={isOpen} >
              <DesignCategories />
              <DevelopmentCategories />
            </Collapse>
          </CardBody>
        </Card>
      </Col>
    );
}

export default CategoriesCheckBoxes