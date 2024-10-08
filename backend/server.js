const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const exp = require('constants');
require('dotenv').config(); 

const app = express();
app.use(cors());
app.use(bodyParser.json());


const imagesDir = path.join(__dirname, 'stocks');
const imagesDataPath = path.join(__dirname, 'images.json');
const rodsDataPath = path.join(__dirname, 'rods.json');
const accDataPath = path.join(__dirname, 'accessory.json');

app.get('/images', (req, res) => {
    fs.readFile(imagesDataPath, 'utf8', (err, data) => {
        if(err) {
            return res.status(500).send('Unable to scan directory');
        }
        const imagesData = JSON.parse(data)
        const images = imagesData.map(image => ({
            id: image.id,
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
      id: rod.id,
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
      id: accessory.id,
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

app.post("/send-quote", (req, res) => {
  // if(!req.user) {
  //   return res.status(401).send("Unauthorized");
  // }
  
  const { name, email, phone, productName, message } = req.body;

  const mailOptionsToAdmin = {
    from: process.env.ADMIN_EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: "New Quote Request",
    text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nProduct: ${productName}\nMessage: ${message}`,
  };

  const mailOptionsToCustomer = {
    from: process.env.ADMIN_EMAIL,
    to: email,
    subject: "We've received your quote request",
    text: `Dear ${name},

    Thank you for requesting a quote for ${productName}. 
    We have received your request and will get back to you shortly with more information.

    Best Regards,
    Hardware and Welding Supplies Team`,
  };

  transporter.sendMail(mailOptionsToAdmin, (error, info) => {
    if (error) {
      console.log("Error sending quote request to admin: ", error);
      return res.status(500).send(error.toString());
    }

    transporter.sendMail(mailOptionsToCustomer, (error, info) => {
      if (error) {
        console.log("Error sending confirmation to customer:", error);
        return res.status(500).send(error.toString());
      }

      res.status(200).send("Quote request sent successfully");
    });
  });
});

app.get('/api/products/:productId', (req, res) => {
  const productId = req.params.productId;
  console.log("Requested productId:", productId);

  const imagesData = JSON.parse(fs.readFileSync(imagesDataPath, 'utf8'));
  const rodsData = JSON.parse(fs.readFileSync(rodsDataPath, 'utf8'));
  const accData = JSON.parse(fs.readFileSync(accDataPath, 'utf8'));

  const allProducts = [...imagesData, ...rodsData, ...accData];
  console.log(
    "All products:",
    allProducts.map((p) => p.id)
  );

  const product = allProducts.find(p => p.id === productId);
  console.log("Found product:", product);


  if(product) {
    res.json({
      ...product,
      url: `/images/${product.filename}`
    });
  }
  else {
    res.status(404).send('Product not found');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});