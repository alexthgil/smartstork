import React, { useState } from 'react';
import './styles/App.css';
import GWNavBar from './components/navbar/GWNavBar';
import { HashRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { GlobalContext } from './GlobalContext'
import AppModel from './Model/AppModel';

const App = () => {

  const appModel = new AppModel();
  const [model, setModel] = useState<AppModel>(appModel);

  return (

    <GlobalContext.Provider value={{ model, setModel }}>
      <HashRouter>
        <GWNavBar />
        <AppRouter />
      </HashRouter>
    </GlobalContext.Provider>
  );
}

export default App;
