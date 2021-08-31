import React, { useState, useEffect } from "react";
import CrudForm from "../Form/CrudForm";
import CrudTable from "../Table/CrudTable";

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

const Crud = () => {
  const [dataBase, setDataBase] = useState(initialDB);
  const [dataToEdit, setDataToEdit] = useState(null);

  const createDataRegister = (newRegister) => {
    newRegister.id = Date.now();
    // console.log(newRegister)
    setDataBase([
      ...dataBase,
      newRegister,
    ])
  };
  const updateDataRegister = (newRegister) => {
    const newData = dataBase.map(register => register.id === newRegister.id ? newRegister : register );
    setDataBase(newData);
  };
  const deleteDataRegister = (id) => {
    const isDelete = window.confirm(`Are you sure you want to delete this register ${id}?`);
    if (isDelete) {
      const newData = dataBase.filter(register => register.id !== id);
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
