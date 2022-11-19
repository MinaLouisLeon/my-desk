import React from 'react'
import { Icon } from '@blueprintjs/core';
import styled from "styled-components"
const ItemInGrid = styled.button`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 64px;
    
`
const ItemInGridComp = ({icon,iconColor,label,handler}) => {
  return (
    <ItemInGrid className="shadow-2 br4 ma2 cursor-pointer" onClick={handler}>
        <Icon icon={icon} color={iconColor} />
        <p className='fw6 mt2' >{label}</p>
    </ItemInGrid>
  )
}

export default ItemInGridComp