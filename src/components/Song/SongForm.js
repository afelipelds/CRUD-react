import React, { useState, useEffect } from "react";

const initialForm = {
  artist: "",
  song: "",
};

const SongForm = ({ handleSearch }) => {
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.artist || !formData.artist) {
      alert("You must type in an artist and song name.");
      return;
    }
    
    handleSearch(formData);
    setFormData(initialForm);
  };


  return (
    <form onSubmit={handleSubmit}>
      <h2 className="">Song Form</h2>
      <input
        type="text"
        name="artist"
        placeholder="Nombre del artista"
        onChange={handleChange}
        value={formData.artist}
      />
      <input
        type="text"
        name="song"
        placeholder="Nombre de canción"
        onChange={handleChange}
        value={formData.song}
      />
      <input type="submit" value="Enviar" />
    </form>
  );
};

export default SongForm;
