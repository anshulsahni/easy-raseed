import React from 'react';
import { render } from 'react-dom';
import Contents from './Contents.jsx'

export default function App() {
  return (
    <>
      <Contents/>
    </>
  )
}

window.mountApp = function mountApp() {
  render(
    <App/>,
    document.getElementById('app'),
  );
}
