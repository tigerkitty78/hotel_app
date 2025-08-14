
# Hotel Room Management App

This is a **Hotel Room Management** web application built with:

- **Frontend:** React.js + Bootstrap
- **Backend:** Express.js + MySQL
- **Database:** MySQL

Features:

- Add, Update, View, and Delete Rooms
- Search, Filter by Room Type and Availability Status
- Reusable Room Form for Add/Edit
- Pagination in Room List
- Responsive UI with Bootstrap

---

## Folder Structure

```

project-root/
│
├─ backend/
│   ├─ index.js          # Express server entry
│   ├─ routes/           # API routes
│   ├─ controllers/      # Controllers for API endpoints
│   └─ db.js             # MySQL database connection
│
├─ frontend/
│   ├─ package.json
│   ├─ src/
│   │   ├─ components/   # Reusable components (RoomForm, Navbar, etc.)
│   │   ├─ pages/        # Pages (RoomList, UpdateRoom, RoomByID, etc.)
│   │   └─ App.jsx       # Main React app with routing
│   └─ public/
│       └─ index.html
└─ README.md
|
|_mysql(exported sql file)
|_ss(screenshots of working app)

````

---

## Prerequisites

- Node.js (v16+)
- npm
- MySQL Server

---

## Backend Setup

1. Navigate to backend folder:

```bash
cd backend
````

2. Install dependencies:

```bash
npm install
```

3. Configure **MySQL** connection in `db.js`:

```js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'new_password',
  database: 'todb'
});


(i didnt commit the .env file so type above credentials manually to connect to db.)
module.exports = connection;
```

4. Run the server:

```bash
node index.js
```

The backend server will start at: `http://localhost:5000`

---

## Frontend Setup

1. Navigate to frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the React app:

```bash
npm start
```

The frontend will open at: `http://localhost:3000`

> ⚠️ Make sure backend is running first.

---

## API Endpoints

* `GET /rooms` → Get all rooms
* `GET /rooms/:id` → Get a single room by ID
* `POST /rooms` → Add a new room
* `PUT /rooms/:id` → Update room by ID
* `DELETE /rooms/:id` → Delete room by ID

---

## Usage

1. Open the frontend (`http://localhost:3000`).
2. Use the **navbar** to:

   * View all rooms
   * Add a new room
3. In the **Room List**:

   * Click **View** to see room details
   * Click **Update** to edit a room
   * Click **Delete** to remove a room

---

## MySQL Database

You need to create a MySQL database named `todb` and a table `rooms`. Example:

```sql
CREATE DATABASE todb;

USE todb;

CREATE TABLE rooms (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    RoomNumber INT NOT NULL,
    RoomType VARCHAR(50) NOT NULL,
    Facilities VARCHAR(255),
    PricePN DECIMAL(10,2) NOT NULL,
    Status BOOLEAN DEFAULT 1
);
```

 `.sql` file also provided.

---

## Notes

* The `RoomForm` component is **reusable** for Add and Update operations.
* Filtering and pagination are handled in the frontend.
* Status field: `1 = Available`, `0 = Booked`.

```

---


