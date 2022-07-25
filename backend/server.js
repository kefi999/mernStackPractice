const express = require("express"); // done
const app = express(); // done
const dotenv = require("dotenv").config(); // done
const colors = require("colors"); //done
const { errorHandler } = require("./middleware/errorMiddleware"); // done
const connectDB = require("./config/db"); //makes sure the mongo database is connected to the app
const port = process.env.PORT || 5000; // done

connectDB();

//these are exectued in order
app.use(express.json()); //done
app.use(express.urlencoded({ extended: false })); //done

app.use(`/api/goals`, require(`./routes/goalRoutes`)); //done
app.use(`/api/users`, require(`./routes/userRoutes`)); //done

app.use(errorHandler); //done

app.listen(port, () => {
  // done
  console.log(`Server started on port ${port}`);
});
