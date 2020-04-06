import './App.css';
import './index.css';
import React from 'react';
import {Routes} from "./Routes";
import ReactDOM from 'react-dom';
import {initStores} from "./Stores";
import { AppContainer } from "react-hot-loader";

const stores = initStores();

/**
 * Root Application Render
 */
const render = () =>{
  ReactDOM.render(
    <AppContainer>
      <Routes stores={stores} />
    </AppContainer>,
    document.getElementById("root")
  )
}

render();
