import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function RoomByID() {
  const { id } = useParams();
  const [record, setRecord] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/rooms/${id}`)
      .then(res => setRecord(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!record) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      {/* <h1>{record.name}</h1> */}
      <p>Room Number: {record.RoomNumber}</p>
      <p>Room Type: {record.RoomType}</p>
         <p>Facilities: {record.Facilities}</p>
      <p>Price Per Night: {record.PricePN}</p>
      <p>Status: {record.Status}</p>
    </div>
  );
}

export default RoomByID;
