import React from 'react';
import './App.css';
import Crud from './components/CRUD/Crud';
import CrudAPI from './components/CRUD/CrudApi';
import SongSearch from './components/Song/SongSearch';

const URL_SAINTS = "http://localhost:5000/saints";

function App() {
  return (
    <div className="App">
      {/* <CrudAPI apiUrl={URL_SAINTS} /> */}
      <hr />
      <SongSearch />
      <hr />
      {/* <Crud /> */}
    </div>
  );
}

export default App;
