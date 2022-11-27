import React from 'react'
import styled from "styled-components"
import IconProviderComp from './Icons/IconProviderComp';
const ItemInGrid = styled.button`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    /* width: 64px;
    height: 64px; */
    min-height: 64px;
    min-width: 64px;
    width: fit-content;
`
const ItemInGridComp = ({icon,label,handler}) => {
  return (
    <ItemInGrid className="shadow-2 br4 ma2 pa2 cursor-pointer" onClick={handler}>
        <IconProviderComp iconName={icon} settings={{size:"1.5rem"}}/>
        <p className='fw6 mt2'>{label}</p>
    </ItemInGrid>
  )
}

export default ItemInGridComp