const express = require("express")
const connectDB = require("./config/db")
const chats = require("./data/data")
const dotenv = require("dotenv")
const UserRoute = require("./routes/User")
const ChatRoute = require("./routes/Chat")
const {notFound,errorHandler} = require("./middlewares/errorMiddleware")

const app = express();
app.use(express.json());
dotenv.config();
connectDB();

app.get('/',(req,res)=>{
    res.send("API IS RUNNING")
})

app.use("/api/user",UserRoute);
app.use("/api/chat",ChatRoute);

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(PORT,console.log(`Server started on PORT ${PORT}`))