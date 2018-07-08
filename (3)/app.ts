import * as express from "express";
import * as bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded( { extended: false}));

type roflan = {
    name            : string;
    price           : number;
    manufacturer    : string;
    number_sales    : number;
}

type asket = {
    name    : string;
    date    : string;
    price   : number;
}
let products    : roflan[] = [];
let balance     : number = 0;
let orders      : asket[] = [];


function isNumeric(s : string) {
    return !isNaN(parseFloat(s)) && isFinite(+s);
}

function formatDate() {
    let date = new Date();
    let dd = String(date.getDate());
    if (+dd < 10) dd = '0' + dd;

    let mm = String(date.getMonth() + 1);
    if (+mm < 10) mm = '0' + mm;

    let yy = date.getFullYear();

    let hh = String(date.getHours());
    let mi = String(date.getMinutes());

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
    } else if ( !isNumeric(req.body.price) || +req.body.price < 0) {
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
        return res.status(200).send();
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
    let key = Object.keys(req.query);
    if (key.length != 1 || key.indexOf("name") == -1) {
        console.log(key);
        return res.status(400).send({
            message: "Invalid column",
        });
    }
    let isRemoved = false;
    for (let i = 0; i < products.length; ++i) {
        if (products[i]["name"] == req.query.name) {
            isRemoved = true;
            products.splice(i, 1);
        }
    }
    if (isRemoved)
        return res.status(200).send();
    else return res.status(400).send({
        "message": "No such item is store"
    });
});

app.post("/order", (req, res) => {
    let key = Object.keys(req.query);
    if (key.length != 1 || key.indexOf("name") == -1) {
        console.log(key);
        return res.status(400).send({
            message: "Invalid column",
        });
    }
    for (let i = 0; i < products.length; ++i)
        if (products[i]["name"] == req.query.name) {
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
        return res.status(400).send({
            message: "No such product in store"
        });
    return res.status(200).send(orders);
});

app.get("/balance", (req, res) => {
    return res.status(200).send({
        "balance": balance
    });
});

app.get("/goods", (req, res) => {
    let goods = [];
    for (let i = 0; i < products.length; ++i)
        goods.push(products[i]["name"]);
    if (goods.length == 0)
        return res.status(400).send({
            "message": "List of goods is empty"
        });
    return res.status(200).send(goods);
});

app.listen(3000, () => console.log("started"));