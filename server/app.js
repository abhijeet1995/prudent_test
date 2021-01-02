const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser");
const auth = require('./routes/auth')
const product = require('./routes/product')
const morgan = require('morgan')
const db = require('./config/db')
const path = require('path');
require('dotenv').config();


// Connect to database

const app = express();

db()
app.use(morgan('combined'))


var origin = '*'

app.use((req, res, next) => {
	if (req.headers.origin) {
		origin = req.headers.origin
	} else {
		origin = "*"
	}
	next();
})
app.use(cors({ credentials: true, origin: origin }));

//Welcome to trio
app.get('/', function (req, res) {
	res.send("Welcome to trio. A battery management system")
});


// middlewares
app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// routes middleware
app.use("/api", auth);
app.use("/api",product)

// port
const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Server is running on port ${port}`));