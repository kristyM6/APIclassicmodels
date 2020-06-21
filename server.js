const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var dbConn  = require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/1/musica",
    (req, res) => {
        dbConn.query('SELECT * FROM canciones_mas_escuchadas', function(err,rows) {
            if(err) {
               res.send(err)
            } else {
                res.send(rows)
            }
        })
    });
app.get("/1/usuarios",
    (req, res) => {
        dbConn.query('SELECT * FROM reporte_ingreso_usuarios_view', function(err,rows) {
            if(err) {
                res.send(err)
            } else {
                res.send(rows)
            }
        })
    });
app.get("/1/tarjetas",
    (req, res) => {
        dbConn.query('SELECT * FROM cantidad_tarjetas_registradas', function(err,rows) {
            if(err) {
                res.send(err)
            } else {
                res.send(rows)
            }
        })
    });

app.use((req, res) => {
    res.status(404).send({
        success: false,
        data: {
            message: "Estás intentando hacer algo que no deberías"
        },
    })
});

app.listen(3000, () => {
    console.log("Servidor ejecutándose...");
});
