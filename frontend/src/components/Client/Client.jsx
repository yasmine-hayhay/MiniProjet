// Clients.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './clients.css';

const Clients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/client')
      .then(response => setClients(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/api/v1/client/delete/${id}`)
      .then(() => {
        setClients(clients.filter(client => client._id !== id));
      })
      .catch(error => {
        console.error('Error deleting client:', error);
      });
  };
  return (
    <div>

      <div className='tab-cl'>
        <table className='table'>
          <tr>
            <td colspan="3"><h2 className='h2'>Liste des Clients</h2></td>
            <td><button className='ajt'><Link to="/clients/nouveau" className='link'>Ajouter un Nouveau Client</Link></button></td></tr>
          <tr >
            <th>Nom</th>
            <th>Prenom</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
          {clients.map(client => (
            <tr className='tr'>
              <td>{client.nom}</td>
              <td>{client.prenom}</td>
              <td>{client.email}</td>
              <td>
                <Link to={`/clients/${client._id}/editer`}>
                  <button className='button-3'>Modifier</button>
                </Link>
                <button onClick={() => handleDelete(client._id)} className='button-4'>Supprimer</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Clients;
