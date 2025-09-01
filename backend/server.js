// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const loggerMiddleware = require('./loggerMiddleware');
// const shorturlRoutes = require('./routes/shorturlRoutes');

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());
// app.use(loggerMiddleware);
// app.use('/', shorturlRoutes);

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



const express = require("express");
const cors = require("cors");
const loggerMiddleware = require("../Logging_Middlewares/loggerMiddleware"); // <-- import middleware
const shortenerRoutes = require("./routes/shortener");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Use logging middleware
app.use(loggerMiddleware);

// Add routes
app.use("/api", shortenerRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
