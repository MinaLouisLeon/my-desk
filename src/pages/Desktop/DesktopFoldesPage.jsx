import React from 'react'
import { useSelector } from 'react-redux'
import ItemInGridComp from '../../components/Desktop/ItemInGridComp';
import styled from "styled-components";
const GridSystem = styled.div`
  grid-auto-flow: row dense
`
const DesktopFoldesPage = () => {
  const folders = useSelector(state => state.foldersReducer.folders);
  return (
    <div className='grid auto-cols-auto bg-slate-400'>
    {folders.map((folder) => {
      return(
        /* <ItemInGridComp icon="folder-close" iconColor="#ffca28" label={folder.label} /> */
        <span className='bg-red-400'>{folder.label}</span>
      )
    })}
    </div>
  )
}

export default DesktopFoldesPage