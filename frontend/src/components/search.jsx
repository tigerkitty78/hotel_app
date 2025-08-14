// src/components/SearchBar.jsx
// src/components/SearchBar.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function SearchBar({
  searchTerm,
  setSearchTerm,
  roomTypeFilter,
  setRoomTypeFilter,
  statusFilter,
  setStatusFilter
}) {
  return (
    <div className="row mb-3">
      {/* General search */}
      <div className="col-md-4 mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Search rooms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Room type filter */}
      <div className="col-md-4 mb-2">
        <select
          className="form-select"
          value={roomTypeFilter}
          onChange={(e) => setRoomTypeFilter(e.target.value)}
        >
          <option value="">All Room Types</option>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Suite">Suite</option>
        </select>
      </div>

      {/* Status filter */}
      <div className="col-md-4 mb-2">
        <select
          className="form-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Available">Available</option>
          <option value="Booked">Booked</option>
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
