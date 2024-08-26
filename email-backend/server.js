// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuración del transporte de Nodemailer
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Ruta para enviar correos electrónicos
app.post("/api/send-email", async (req, res) => {
    const { nombre, mail, mensaje } = req.body;

    const mailOptions = {
        from: mail,
        to: process.env.EMAIL_USER,
        subject: `Nuevo mensaje de ${nombre}`,
        text: mensaje,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Correo enviado" });
    } catch (error) {
        console.error("Error al enviar correo:", error);
        res.status(500).json({ error: "Error al enviar el correo" });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
