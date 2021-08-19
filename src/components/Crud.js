import React, { useState, useEffect } from "react";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";

const initialDB = [
  {
    id: 1,
    name: "Seiya",
    constellation: "Pegaso",
  },
  {
    id: 2,
    name: "Shiryu",
    constellation: "Dragón",
  },
  {
    id: 3,
    name: "Hyoga",
    constellation: "Cisne",
  },
  {
    id: 4,
    name: "Shun",
    constellation: "Andrómeda",
  },
  {
    id: 5,
    name: "Ikki",
    constellation: "Fénix",
  },
];
// const API_URL = 'http://localhost:5000/saints';

const Crud = () => {
  const [dataBase, setDataBase] = useState(initialDB);
  const [dataToEdit, setDataToEdit] = useState(null);
  // const [apiData, setApiData] = useState([])

  // const fetchData = async (url) => {
  //   const fetchedData = await fetch(url);
  //   const data = await fetchedData.json();
  //   setApiData(data);
  // }
  
  // useEffect(() => {
  //   fetchData(API_URL);
  // }, [])

  const createDataRegister = (newRegister) => {
    newRegister.id = Date.now();
    console.log(newRegister)
    setDataBase([
      ...dataBase,
      newRegister,
    ])
  };
  const updateDataRegister = (data) => {
    const newData = dataBase.map( el => el.id === data.id ? data : el );
    setDataBase(newData);
  };
  const deleteDataRegister = (id) => {
    const isDelete = window.confirm(`Are you sure you want to delete this register ${id}?`);
    if (isDelete) {
      let newData = dataBase.filter(el => el.id !== id);
      setDataBase(newData);
    }
  };

  return (
    <div>
      <h1>Crud App</h1>
      <CrudForm
        createData={createDataRegister}
        updateData={updateDataRegister}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
      />
      <CrudTable
        data={dataBase}
        deleteDataRegister={deleteDataRegister}
        setDataToEdit={setDataToEdit}
      />
    </div>
  );
};

export default Crud;
