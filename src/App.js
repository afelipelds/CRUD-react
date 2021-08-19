import React from 'react';
import './App.css';
import Crud from './components/Crud';
import CrudAPI from './components/CrudApi';

const URL_SAINTS = "http://localhost:5000/saints";

function App() {
  return (
    <div className="App">
      <CrudAPI apiUrl={URL_SAINTS} />
      <hr />
      <hr />
      <Crud />
    </div>
  );
}

export default App;
