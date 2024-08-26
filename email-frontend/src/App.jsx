// src/App.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    nombre: '',
    mail: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/send-email', formData);

      if (response.status === 200) {
        alert('Mensaje enviado con éxito');
        setFormData({ nombre: '', mail: '', mensaje: '' });
      } else {
        alert('Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar el mensaje');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <input
        type="email"
        name="mail"
        value={formData.mail}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <textarea
        name="mensaje"
        value={formData.mensaje}
        onChange={handleChange}
        placeholder="Mensaje"
        required
      />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default App;
