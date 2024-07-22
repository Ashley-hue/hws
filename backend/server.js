const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const mysql = require('mysql2'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const exp = require('constants');
require('dotenv').config(); 

const app = express();
// app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
//   host: process.env.DB_HOST,
//   dialect: 'mysql'
// });

const imagesDir = path.join(__dirname, 'stocks');
const imagesDataPath = path.join(__dirname, 'images.json');
const rodsDataPath = path.join(__dirname, 'rods.json');
const accDataPath = path.join(__dirname, 'accessory.json');

// const User = sequelize.define('User', {
//   firstName: {
//     type: DataTypes.STRING, 
//     allowNull: false
//   },
//   lastName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true
//   },
//   phone: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }, 
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// });

// sequelize.sync();

app.get('/images', (req, res) => {
    fs.readFile(imagesDataPath, 'utf8', (err, data) => {
        if(err) {
            return res.status(500).send('Unable to scan directory');
        }
        const imagesData = JSON.parse(data)
        const images = imagesData.map(image => ({
            filename: image.filename, 
            url: `/images/${image.filename}`,
            name: image.name,
            category: image.category,
            description: image.description,
            details: image.details
        }));
        res.json(images);
    });
});

app.get("/rods", (req, res) => {
  fs.readFile(rodsDataPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Unable to scan directory");
    }
    const rodsData = JSON.parse(data);
    const rods = rodsData.map((rod) => ({
      filename: rod.filename,
      url: `/images/${rod.filename}`,
      name: rod.name,
      category: rod.category,
      description: rod.description,
      details: rod.details
    }));
    res.json(rods);
  });
});

app.get("/accessories", (req, res) => {
  fs.readFile(accDataPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Unable to scan directory");
    }
    const accData = JSON.parse(data);
    const accessories = accData.map((accessory) => ({
      filename: accessory.filename,
      url: `/images/${accessory.filename}`,
      name: accessory.name,
      category: accessory.category,
      description: accessory.description,
      details: accessory.details
    }));
    res.json(accessories);
  });
});

// app.post("/api/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }
//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });
//     res.json({
//       token,
//       user: {
//         id: user.id,
//         email: user.email,
//         firstName: user.firstName,
//         lastName: user.lastName,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Signup route
// app.post("/api/signup", async (req, res) => {
//   const { firstName, lastName, email, phone, password } = req.body;
//   try {
//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const user = await User.create({
//       firstName,
//       lastName,
//       email,
//       phone,
//       password: hashedPassword,
//     });
//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });
//     res.json({
//       token,
//       user: {
//         id: user.id,
//         email: user.email,
//         firstName: user.firstName,
//         lastName: user.lastName,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });



app.use('/images', express.static(imagesDir));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASSWORD,
  },
});

app.post("/send", (req, res) => {
  const { fullName, phoneNumber, email, message } = req.body;

  const mailOptionsToAdmin = {
    from: process.env.ADMIN_EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: "New Contact Form Submission",
    text: `Name: ${fullName}\nPhone: ${phoneNumber}\nEmail: ${email}\nMessage: ${message}`,
  };

  const mailOptionsToCustomer = {
    from: process.env.ADMIN_EMAIL,
    to: email,
    subject: "Thank you for contacting us!",
    text: `Dear ${fullName}, \n\nThank you for reaching out. We have received your message and will get back to you shortly.\n\nBest Regards, \nHardware and Welding Supplies Team`,
  };

  transporter.sendMail(mailOptionsToAdmin, (error, info) => {
    if (error) {
      console.log("Error sending email to admin: ", error);
      return res.status(500).send(error.toString());
    }

    transporter.sendMail(mailOptionsToCustomer, (error, info) => {
      if (error) {
        console.log("Error sending email to customer:", error);
        return res.status(500).send(error.toString());
      }

      res.status(200).send("Message sent successfully");
    });
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});