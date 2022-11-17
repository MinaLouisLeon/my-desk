import React from 'react'
import { Icon } from '@blueprintjs/core';
import styled from "styled-components"
const ItemInGrid = styled.div`
    /* display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    align-items: center; */
    
`
const ItemInGridComp = ({icon,iconColor,label}) => {
  return (
    <ItemInGrid>
        <Icon icon={icon} color={iconColor} />
        <p className='fw6' >{label}</p>
    </ItemInGrid>
  )
}

export default ItemInGridComp