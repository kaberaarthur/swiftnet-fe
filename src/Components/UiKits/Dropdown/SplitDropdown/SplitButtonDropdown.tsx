import { Href } from '@/Constant';
import { SplitButtonDropdownProp } from '@/Type/UiKits/UiKitsType';
import Link from 'next/link';
import React, { useState } from 'react'
import { Button, ButtonGroup, Dropdown,DropdownToggle } from 'reactstrap'

const SplitButtonDropdown:React.FC<SplitButtonDropdownProp> = ({ item }) => {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = () => setOpen(!open);
  return (
    <ButtonGroup>
      <Button outline color={item.btnColor}>{item.btnText}</Button>
      <Dropdown className="separated-btn" isOpen={open} toggle={toggle}>
        <DropdownToggle color={item.btnColor}>
          <i className="icofont icofont-arrow-down"></i>
        </DropdownToggle>
        <div className="dropdown-content">
          <Link href={Href}>{item.items1}</Link>
          <Link href={Href}>{item.items2}</Link>
        </div>
      </Dropdown>
    </ButtonGroup>
  )
}

export default SplitButtonDropdown