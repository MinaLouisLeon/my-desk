import React from 'react'
import { Browser } from '@capacitor/browser';
const DesktopBrowserPage = () => {
    const handleOpenBrowser = async () => {
      await Browser.open({ url: 'http://capacitorjs.com/' })
    }
  return (
    <>
      <button onClick={() => handleOpenBrowser()}>Open browser</button>
    </>
  )
}

export default DesktopBrowserPage