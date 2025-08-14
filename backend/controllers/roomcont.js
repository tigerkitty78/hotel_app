const db = require('../config/db');

// GET all rooms
exports.getRooms = (req, res) => {
  db.query('SELECT * FROM rooms', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// GET room by ID
exports.getRoomByID = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM rooms WHERE ID = ?';
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Room not found' });
    res.json(results[0]);
  });
};

// ADD new room
exports.addRoom = (req, res) => {
  const { RoomNumber, RoomType, Facilities, PricePN, Status } = req.body;
  const sql = 'INSERT INTO rooms (RoomNumber, RoomType, Facilities, PricePN, Status) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [RoomNumber, RoomType, Facilities, PricePN, Status], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, RoomNumber, RoomType, Facilities, PricePN, Status });
  });
};

// UPDATE room
exports.updateRoom = (req, res) => {
  const { RoomNumber, RoomType, Facilities, PricePN, Status } = req.body;
  const { id } = req.params;
  const sql = 'UPDATE rooms SET RoomNumber = ?, RoomType = ?, Facilities = ?, PricePN = ?, Status = ? WHERE ID = ?';
  db.query(sql, [RoomNumber, RoomType, Facilities, PricePN, Status, id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database update failed' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Room not found' });
    res.json({ message: 'Room updated successfully' });
  });
};

// DELETE room
exports.deleteRoom = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM rooms WHERE ID = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database deletion failed' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Room not found' });
    res.json({ message: 'Room deleted successfully' });
  });
};
