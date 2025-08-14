import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
function RoomForm({ initialData, onSubmit }) {
    const navigate = useNavigate();
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [facilities, setFacilities] = useState("");
  const [pricePN, setPricePN] = useState("");
  const [status, setStatus] = useState(1);

  // ✅ Only update state if initialData changes from undefined → real object
  useEffect(() => {
    if (initialData) {
      setRoomNumber(initialData.RoomNumber || "");
      setRoomType(initialData.RoomType || "");
      setFacilities(initialData.Facilities || "");
      setPricePN(initialData.PricePN || "");
      setStatus(
        initialData.Status !== undefined ? initialData.Status : 1
      );
    }
  }, [initialData]);

const handleSubmit = (e) => {
  e.preventDefault();
  axios.post('http://localhost:5000/rooms', {
    RoomNumber: parseInt(roomNumber, 10),
    RoomType: roomType,
    Facilities: facilities,
    PricePN: parseFloat(pricePN),
    Status: status === "1" || status === 1 ? true : false
  })
  .then(res => {
    console.log('Added:', res.data);
    navigate('/get'); 
  })
  .catch(err => console.error(err));
};


  return (
      <div className="container mt-5">
      <div className="d-flex justify-content-center">
        <div className="card p-4 shadow" style={{ width: "400px" }}>
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label>Room Number</label>
        <input
          type="text"
          className="form-control"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label>Room Type</label>
        <select
          className="form-select"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          required
        >
          <option value="">Select Type</option>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Suite">Suite</option>
        </select>
      </div>

      <div className="form-group mb-3">
        <label>Facilities</label>
        <input
          type="text"
          className="form-control"
          value={facilities}
          onChange={(e) => setFacilities(e.target.value)}
          placeholder="WiFi, TV, AC..."
        />
      </div>

      <div className="form-group mb-3">
        <label>Price per Night</label>
        <input
          type="number"
          className="form-control"
          value={pricePN}
          onChange={(e) => setPricePN(e.target.value)}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label>Status</label>
        <select
          className="form-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value={1}>Available</option>
          <option value={0}>Booked</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        {initialData?.ID ? "Update Room" : "Add Room"}
      </button>
    </form></div></div></div>
  );
}

export default RoomForm;
