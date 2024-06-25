const express = require('express');
const app = express();
const cors = require("cors");
const productRoutes = require("./route/productRoutes");
const orderRoutes = require("./route/orderRoutes");
const orderItemRoutes = require("./route/orderItemRoutes");
const port = 3000;

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello World!!');
});

app.use("/products", productRoutes);

app.use("/orders", orderRoutes);

app.use("/orderItems", orderItemRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
