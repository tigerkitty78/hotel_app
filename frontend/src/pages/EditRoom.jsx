import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateRoom() {
  const { id } = useParams(); // ID of the room to update
  const navigate = useNavigate();
  const [room, setRoom] = useState({
    RoomNumber: "",
    RoomType: "",
    Facilities: "",
    PricePN: "",
    Status: 1 // 1 = Available, 0 = Booked
  });

  // Fetch room by ID when component mounts
  useEffect(() => {
    axios.get(`http://localhost:5000/rooms/${id}`)
      .then(res => {
        if (res.data) {
          setRoom(res.data);
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const payload = {
      RoomNumber: parseInt(room.RoomNumber, 10),
      RoomType: room.RoomType,
      Facilities: room.Facilities,
      PricePN: parseFloat(room.PricePN),
      Status: room.Status === "1" || room.Status === 1 ? true : false
    };

    axios.put(`http://localhost:5000/rooms/${id}`, payload)
      .then(res => {
        console.log("Updated:", res.data);
        navigate("/roomlist"); // go back to room list after update
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center">
        <div className="card p-4 shadow" style={{ width: "400px" }}>
          <h3 className="text-center mb-3">Edit Room</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-group mb-3">
              <label>Room Number</label>
              <input
                type="number"
                className="form-control"
                name="RoomNumber"
                value={room.RoomNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label>Room Type</label>
              <select
                className="form-select"
                name="RoomType"
                value={room.RoomType}
                onChange={handleChange}
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
                name="Facilities"
                value={room.Facilities}
                onChange={handleChange}
                placeholder="WiFi, TV, AC..."
              />
            </div>

            <div className="form-group mb-3">
              <label>Price per Night</label>
              <input
                type="number"
                className="form-control"
                name="PricePN"
                value={room.PricePN}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label>Status</label>
              <select
                className="form-select"
                name="Status"
                value={room.Status}
                onChange={handleChange}
              >
                <option value={1}>Available</option>
                <option value={0}>Booked</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Update Room
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateRoom;
