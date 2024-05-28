const express = require('express');
const app = express();
const {userRouter} = require("./routes/userRoutes")
const {mainRouter} = require("./routes/otherRoutes")
require('dotenv').config();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use('/user',userRouter)
app.use('/',mainRouter)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});