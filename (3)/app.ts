import * as express from "express";
import * as bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded( { extended: false}));

let products = [];
let balance = 0;
let orders = [];


function isNumeric(s : string) {
    return !isNaN(parseFloat(s)) && isFinite(+s);
}

function formatDate() {
    let date = new Date();
    let dd = date.getDate();
    if (+dd < 10) dd = '0' + dd;

    let mm = date.getMonth() + 1;
    if (+mm < 10) mm = '0' + mm;

    let yy = date.getFullYear();

    let hh = date.getHours();
    let mi = date.getMinutes();

    if (+hh < 10) hh = '0' + hh;
    if (+mi < 10) mi = '0' + mi;
    return yy + '.' + mm + '.' + dd + ' ' + hh + ':' + mi;
}

app.post("/product", (req, res) => {
    let key = Object.keys(req.body);
    if (key.length != 3 || key.indexOf("name") == -1 || key.indexOf("price") == -1 || key.indexOf("manufacturer") == -1) {
        console.log(key);
        return res.status(400).send({
            message: "Invalid keys in body"
        });
    } else if ( !isNumeric(req.body.price) ) {
        return res.status(400).send({
            message: "'price' has an invalid value"
        });
    } else {
        for (let i = 0; i < products.length; ++i)
            if (products[i]["name"] == req.body.name && products[i]["price"] == req.body.price &&
                products[i]["manufacturer"] == req.body.manufacturer)
                return res.status(400).send({
                    "message": "This item is already in store"
                });
        req.body.price = +req.body.price;
        req.body["number_sales"] = 0;
        products.push(req.body);
        return res.status(200).send({
            "name": req.body.name,
            "price" : req.body.price,
            "manufacturer" : req.body.manufacturer
        });
    }
});

app.get("/product", (req, res) => {
    let key = Object.keys(req.query);
    if (key.length != 1 || key.indexOf("name") == -1) {
        console.log(key);
        return res.status(400).send({
            message: "Invalid column",
        });
    }
    for (let i = 0; i < products.length; ++i)
        if (products[i]["name"] == req.query.name) {
            return res.status(200).send({
                "price": products[i]["price"],
                "manufacturer": products[i]["manufacturer"],
                "number_sales": products[i]["number_sales"]
            });
        }
    return res.status(400).send({
        message: "No such product in store",
    });
});

app.delete("/product", (req, res) => {
    let key = Object.keys(req.body);
    if (key.length != 1 || key.indexOf("name") == -1) {
        console.log(key);
        return res.status(400).send({
            message: "Invalid column",
        });
    }
    let isRemoved = false;
    for (let i = 0; i < products.length; ++i) {
        if (products[i]["name"] == req.body.name) {
            isRemoved = true;
            products.splice(i, 1);
        }
    }
    if (isRemoved)
        res.status(200).send();
    else res.status(400).send({
        "message": "No such item is store"
    });
});

app.post("/order", (req, res) => {
    let key = Object.keys(req.body);
    if (key.length != 1 || key.indexOf("name") == -1) {
        console.log(key);
        return res.status(400).send({
            message: "Invalid column",
        });
    }
    for (let i = 0; i < products.length; ++i)
        if (products[i]["name"] == req.body.name) {
            orders.push({
                "name": products[i]["name"],
                "date": formatDate(),
                "price": products[i]["price"]
            });
            products[i]["number_sales"]++;
            balance += products[i]["price"];
            return res.status(200).send();
        }
    return res.status(400).send({
        message: "No such product in store"
    });
});

app.get("/order", (req, res) => {
    if (orders.length == 0)
        res.status(400).send({
            message: "No such product in store"
        });
    res.status(200).send(orders);
});

app.get("/balance", (req, res) => {
    res.status(200).send({
        "balance": balance
    });
});

app.get("/goods", (req, res) => {
    let goods = [];
    for (let i = 0; i < products.length; ++i)
        goods.push(products[i]["name"]);
    if (goods.length == 0)
        res.status(400).send({
            "message": "List of goods is empty"
        });
    res.status(200).send(goods);
});

app.listen(3000, () => console.log("started"));