import { useCallback, useState } from 'react'
import { Col, Container, Row } from 'reactstrap';
import { icoIconData } from '@/Data/Icons/IcoIcons';
import IcoIconCard from './IcoIconCard';
import IconMarkUp from '../IconMarkUp';
import { IcoIcon, Icons } from '@/Constant';
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';

const ICOIconContainer = () => {
    const [iTag, setITag] = useState<string | object>("");
    const [icon, setIcon] = useState<string | object>("");
  
    const callback = useCallback((tag: string) => {
      setITag({
        iTag: '<i className="icofont icofont-' + tag + '"></i>',
      });
      setIcon({
        icon: "icofont icofont-" + tag + " fa-2x",
      });
    }, []);
    return (
      <>
        <Breadcrumbs mainTitle={IcoIcon} parent={Icons} />
        <Container fluid>
          {icoIconData.map((item, i) => {
            return (
              <Row key={i}>
                <Col xl="12">
                  <IcoIconCard iconType={item.data} title={item.title} parentCallback={callback} />
                </Col>
              </Row>
            );
          })}
        </Container>
        <IconMarkUp iTag={iTag} icons={icon} svg={false} />
      </>
    );
}

export default ICOIconContainer