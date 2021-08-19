import React, { useState, useEffect } from "react";
import { helpHTTP } from "../helpers/helpHttp";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import Loader from "./Loader";
import Message from "./Message";

const CrudAPI = ({apiUrl}) => {
  const [dataBase, setDataBase] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  const helpHttp = helpHTTP(); 
  useEffect(() => {
    setLoader(true);
    helpHttp.get(apiUrl).then((res) => {
      if (!res.err) {
        setDataBase(res);
        setError(null);
      } else {
        setDataBase(null);
        setError(res);
      }
    });

    setLoader(false);
  }, [apiUrl]);

  const createDataRegister = (newRegister) => {
    const additionalOptions = {
      body: newRegister,
      headers: {"content-type":"application/json"},
    }

    newRegister.id = Date.now();
    helpHttp.post(apiUrl, additionalOptions)
      .then( res => {
        console.log('response',res);

        if (!res.err) setDataBase([ ...dataBase, res])
        else setError(res);
      })

    setDataBase([...dataBase, newRegister]);
  };
  const updateDataRegister = (data) => {
    const newData = dataBase.map((el) => (el.id === data.id ? data : el));
    setDataBase(newData);
  };
  const deleteDataRegister = (id) => {
    const isDelete = window.confirm(
      `Are you sure you want to delete this register ${id}?`
    );
    if (isDelete) {
      let newData = dataBase.filter((el) => el.id !== id);
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
      {loader ? (
        <Loader />
      ) : (
        dataBase && (
          <CrudTable
            data={dataBase}
            deleteDataRegister={deleteDataRegister}
            setDataToEdit={setDataToEdit}
          />
        )
      )}
      {error && (
        <Message
          message={`Error ${error.status} ${error.statusText}`}
          bgColor="#DC3545"
        />
      )}
    </div>
  );
};

export default CrudAPI;
