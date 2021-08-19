import React, { useState, useEffect } from "react";

const initialForm = {
  name: "",
  constellation: "",
  id: null,
};

const CrudForm = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
  const [formData, setForm] = useState(initialForm);

  useEffect(() => {
    if(dataToEdit) setForm(dataToEdit)
    else setForm(initialForm);
  }, [dataToEdit])

  const handleChange = (event) => {
    setForm({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name || !formData.constellation) {
      alert("Datos incompletos");
      return;
    }

    if (formData.id === null) createData(formData);
    else updateData(formData);

    handleReset();
  };
  const handleReset = () => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  return (
    <div>
      <h3>{
        dataToEdit === null ? 'Agregar' : 'Editar'
      }</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
          value={formData.name}
        />
        <input
          type="text"
          name="constellation"
          placeholder="Constelación"
          onChange={handleChange}
          value={formData.constellation}
        />

        <input type="submit" value={ dataToEdit ? "Fin edición" :"Crear"} />
        <input type="reset" value={ dataToEdit ? "Cancelar" :"Limpiar"} onClick={handleReset} />
      </form>
    </div>
  );
};

export default CrudForm;
