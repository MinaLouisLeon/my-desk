import React from 'react'
import styled from "styled-components";
const GridSystem = styled.div`
  display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    align-items: center;
`
const GridSystemComp = ({children}) => {
  return (
    <GridSystem>
        {children}
    </GridSystem>
  )
}

export default GridSystemComp