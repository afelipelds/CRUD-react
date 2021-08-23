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
    newRegister.id = Date.now();
    let additionalOptions = {
      body: newRegister,
      headers: {"content-type":"application/json"},
    }

    helpHttp.post(apiUrl, additionalOptions)
      .then( res => {
        if (!res.err) setDataBase([ ...dataBase, res])
        else setError(res);
      })
  };

  const updateDataRegister = (data) => {
    let endpoint = `${apiUrl}/${data.id}`;
    let additionalOptions = {
      body: data,
      headers: {"content-type":"application/json"},
    }
    helpHttp.put(endpoint, additionalOptions)
      .then( res => {
        if (!res.err) {
          const newData = dataBase.map((el) => (el.id === data.id ? data : el));
          setDataBase(newData);
        }
        else setError(res);
      })
  };

  const deleteDataRegister = (id) => {
    const isDelete = window.confirm(
      `Are you sure you want to delete this register ${id}?`
    );
    
    if (isDelete) {
      let endpoint = `${apiUrl}/${id}`;
      let additionalOptions = {
        headers: {"content-type":"application/json"},
      }
      
      helpHttp.del(endpoint, additionalOptions)
        .then( res => {
          if (!res.err) {
            let newData = dataBase.filter((el) => el.id !== id);
            setDataBase(newData);
          }
          else setError(res);
        })
    }
    else return;
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
