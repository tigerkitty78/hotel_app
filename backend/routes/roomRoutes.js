const express = require('express');
const router = express.Router();
const {getRooms,getRoomByID,addRoom,updateRoom ,deleteRoom} = require('../controllers/roomcont');

router.get('/rooms', getRooms);
router.post('/rooms', addRoom);
router.put('/rooms/:id', updateRoom);
router.get('/rooms/:id',getRoomByID);
router.delete('/rooms/:id', deleteRoom);
module.exports = router;
