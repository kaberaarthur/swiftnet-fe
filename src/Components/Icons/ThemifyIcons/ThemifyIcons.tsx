import { useCallback, useState } from 'react'
import { Container, Row } from 'reactstrap';
import { themifyIconData } from '@/Data/Icons/ThemifyIcon';
import IconMarkUp from '../IconMarkUp';
import ThemifyIconCard from './ThemifyIconCard';
import { Icons, ThemifyIcon } from '@/Constant';
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';

const ThemifyIconsContainer = () => {
    const [iTag, setITag] = useState<string | object>("");
    const [icon, setIcon] = useState<string | object>("");
  
    const callback = useCallback((tag: string) => {
      setITag({
        iTag: '<i className="'+ tag + '"></i>',
      });
      setIcon({
        icon: "" + tag + " fa-2x",
      });
    }, []);
    return (
      <>
        <Breadcrumbs mainTitle={ThemifyIcon} parent={Icons} />
        <Container fluid>
          {themifyIconData.map((item, i) => {
            return (
              <Row key={i}>
                <ThemifyIconCard iconType={item.data} title={item.title} parentCallback={callback} />
              </Row>
            );
          })}
        </Container>
        <IconMarkUp iTag={iTag} icons={icon} svg={false} />
      </>
    );
}

export default ThemifyIconsContainer