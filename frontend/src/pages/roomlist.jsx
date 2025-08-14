import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/search';

function RoomList() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roomTypeFilter, setRoomTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/rooms')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  function nav(id) {
    navigate(`/roombyid/${id}`);
  }

  function up(id) {
    navigate(`/uproombyid/${id}`);
  }

  function del(id) {
    axios
      .delete(`http://localhost:5000/rooms/${id}`)
      .then(res => {
        console.log(res.data.message);
        setData(prevData => prevData.filter(item => item.ID !== id));
      })
      .catch(err => {
        if (err.response) {
          console.error('Error:', err.response.data.error);
          alert(`Error: ${err.response.data.error}`);
        } else if (err.request) {
          console.error('No response from server:', err.request);
          alert('No response from server. Try again later.');
        } else {
          console.error('Error', err.message);
          alert('An unexpected error occurred.');
        }
      });
  }

  // ✅ Filtering logic
  const filteredData = data.filter((row) => {
    const matchesSearch = Object.values(row).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    const matchesRoomType = roomTypeFilter
      ? row.RoomType.toLowerCase() === roomTypeFilter.toLowerCase()
      : true;

    const matchesStatus = statusFilter
      ? (statusFilter === "Available" && row.Status === 1) ||
        (statusFilter === "Booked" && row.Status === 0)
      : true;

    return matchesSearch && matchesRoomType && matchesStatus;
  });

  // Pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Rooms List</h1>

      {/* ✅ Search and Filters */}
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        roomTypeFilter={roomTypeFilter}
        setRoomTypeFilter={setRoomTypeFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Room Number</th>
            <th>Room Type</th>
            <th>Facilities</th>
            <th>Price per Night</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((row) => (
            <tr key={row.ID}>
              <td>{row.ID}</td>
              <td>{row.RoomNumber}</td>
              <td>{row.RoomType}</td>
              <td>{row.Facilities}</td>
              <td>{row.PricePN}</td>
              <td>{row.Status ? 'Available' : 'Booked'}</td>
              <td>
                <button
                  onClick={() => nav(row.ID)}
                  className="btn btn-info btn-sm me-2"
                >
                  View
                </button>
                <button
                  onClick={() => up(row.ID)}
                  className="btn btn-warning btn-sm me-2"
                >
                  Update
                </button>
                <button
                  onClick={() => del(row.ID)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index + 1}
              className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
            >
              <button
                onClick={() => paginate(index + 1)}
                className="page-link"
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default RoomList;
