import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import RoomList from './pages/roomlist'
import RoomForm from './pages/AddRoom'
import RoomByID from './pages/roomByID'
import Navbar from './components/Navbar';
import UpdateRoom from './pages/EditRoom'
function App() {
  return (
    <div>
          <Navbar />

      {/* <nav style={{ padding: 20 }}>
        <Link to="/roomlist" style={{ marginRight: 10 }}>View Rooms</Link>
        <Link to="/roomform">Add a Room</Link>
      </nav> */}
      <Routes>
        
          <Route path="/roomlist" element={<  RoomList />} />
          <Route path="/roomform" element={< RoomForm />} />
          <Route path="/roombyid/:id" element={<RoomByID />} />UpdateRoom
           <Route path="/uproombyid/:id" element={<UpdateRoom />} />
        <Route path="*" element={<RoomList />} /> {/* default */}
      </Routes>
   </div>
  );
}

export default App;
