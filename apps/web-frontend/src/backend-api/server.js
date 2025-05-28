const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require('body-parser');

// Middleware
app.use(cors({
  origin: 'http://localhost',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing form data

// Database connection
const dbconnect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hospital_dashboard'
});

dbconnect.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Get Route - Doctors
app.get("/doctors", function(req, res) {
    const sql = "SELECT * FROM doctorslist";
    dbconnect.query(sql, function (error, rows, fields) {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(rows);
    });
});

// POST Route - Create Doctor
app.post("/savedoctor", function (req, res) {
    if (!req.body) {
        return res.status(400).json({ error: "Request body is missing" });
    }
    
    const { 
        name, 
        email, 
        gender, 
        password, 
        phone, 
        specialization, 
        experience, 
        city, 
        profileimage, 
        availability 
    } = req.body;

    if (!name || !email || !gender || !password || !phone || !specialization) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const sql = "INSERT INTO doctorslist (name, email, gender, password, phone, specialization, experience, city, profileimage, availability) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    const values = [
        name, email, gender, password, phone, 
        specialization, experience, city, profileimage, availability
    ];

    dbconnect.query(sql, values, function (error, results) {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ 
            message: "Doctor Record saved Successfully!",
            id: results.insertId 
        });
    });
});

// Update Route - Doctor
app.put("/update", function(req, res) {
    if (!req.body) {
        return res.status(400).json({ error: "Request body is missing" });
    }

    const { 
        id,
        name, 
        email, 
        gender, 
        phone, 
        specialization, 
        experience, 
        city, 
        profileimage, 
        availability 
    } = req.body;

    if (!id) {
        return res.status(400).json({ error: "Doctor ID is required" });
    }

    const sql = "UPDATE doctorslist SET name=?, email=?, gender=?, phone=?, specialization=?, experience=?, city=?, profileimage=?, availability=? WHERE id=?";
    
    const values = [
        name, email, gender, phone, 
        specialization, experience, city, 
        profileimage, availability, id
    ];

    dbconnect.query(sql, values, function(error, results) {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Doctor not found" });
        }
        res.json({ message: "Doctor Updated Successfully" });
    });
});

// Delete Route - Doctor
app.delete("/delete", function (req, res) {
    if (!req.body || !req.body.id) {
        return res.status(400).json({ error: "Doctor ID is required" });
    }

    const id = req.body.id;
    const sql = "DELETE FROM doctorslist WHERE id = ?";
    
    dbconnect.query(sql, [id], function (error, results) {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Doctor not found" });
        }
        res.json({ message: "Doctor Record Deleted Successfully" });
    });
});

// Patients Routes
// GET Route - Get all patients
app.get("/patients", function(req, res) {
    const sql = "SELECT * FROM patientlist";
    dbconnect.query(sql, function (error, rows, fields) {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(rows);
    });
});

app.post("/savepatient", function (req, res) {
  // 1. Validate required fields first
  const requiredFields = ['name', 'gender', 'phone', 'dob', 'doctortoconsult', 'amount', 'termsaccepted'];
  const missingFields = requiredFields.filter(field => !req.body[field]);
  
  if (missingFields.length > 0) {
    return res.status(400).json({
      error: "Missing required fields",
      missingFields
    });
  }

  // 2. Prepare SQL with correct column names
  const sql = `
    INSERT INTO patientlist 
    (name, gender, phone, dob, doctortoconsult, amount, termsaccepted)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
  const values = [
    req.body.name,
    req.body.gender,
    req.body.phone,
    req.body.dob,
    req.body.doctortoconsult,
    req.body.amount,
    req.body.termsaccepted
  ];

  // 3. Execute query with error handling
  dbconnect.query(sql, values, (error, results) => {
    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        error: 'Database operation failed',
        sqlError: error.sqlMessage,  // This will show exact MySQL error
        sqlCode: error.code
      });
    }
    
    res.status(201).json({
      success: true,
      patientId: results.insertId
    });
  });
});

// PUT Route - Update a patient
app.put("/patients/:id", function (req, res) {
    const patientId = req.params.id;
    
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ 
            error: "Request body is missing or empty",
            message: "No data provided for update"
        });
    }

    const allowedFields = ['name', 'gender', 'phone', 'dob', 'password', 'doctortoconsult', 'amount'];
    const updates = {};
    
    for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
            updates[field] = req.body[field];
        }
    }

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ 
            error: "No valid fields provided for update",
            allowedFields
        });
    }

    // Check if patient exists
    dbconnect.query("SELECT id FROM patientlist WHERE id = ?", [patientId], function(checkError, checkResults) {
        if (checkError) {
            console.error('Database error:', checkError);
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (checkResults.length === 0) {
            return res.status(404).json({ 
                error: "Patient not found",
                message: `No patient with ID ${patientId} exists`
            });
        }

        // Build dynamic update query
        const setClause = Object.keys(updates).map(field => `${field} = ?`).join(', ');
        const values = [...Object.values(updates), patientId];
        
        const sql = `UPDATE patientlist SET ${setClause} WHERE id = ?`;
        
        dbconnect.query(sql, values, function(error, results) {
            if (error) {
                console.error('Database error:', error);
                return res.status(500).json({ 
                    error: 'Database operation failed',
                    message: error.message
                });
            }
            res.json({ 
                success: true,
                message: "Patient record updated successfully",
                patientId,
                updatedFields: Object.keys(updates),
                links: {
                    view: `/patients/${patientId}`,
                    list: '/patients'
                }
            });
        });
    });
});

// DELETE Route - Delete a patient
app.delete("/patients/:id", function (req, res) {
    const patientId = req.params.id;

    // Check if patient exists
    dbconnect.query("SELECT id FROM patientlist WHERE id = ?", [patientId], function(checkError, checkResults) {
        if (checkError) {
            console.error('Database error:', checkError);
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (checkResults.length === 0) {
            return res.status(404).json({ 
                error: "Patient not found",
                message: `No patient with ID ${patientId} exists`
            });
        }

        // Delete patient
        dbconnect.query("DELETE FROM patientlist WHERE id = ?", [patientId], function(error, results) {
            if (error) {
                console.error('Database error:', error);
                return res.status(500).json({ 
                    error: 'Database operation failed',
                    message: error.message
                });
            }
            res.json({ 
                success: true,
                message: "Patient record deleted successfully",
                patientId
            });
        });
    });
});

app.listen(8080, function () {
    console.log('Server Started on Port:8080!');
});