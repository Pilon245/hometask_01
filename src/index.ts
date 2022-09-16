import express, {NextFunction, Request, Response} from "express"
import bodyParser from 'body-parser'
import {videosRouter} from "./routes/videos-router";

const app = express()
const port = process.env.PORT || 5001

app.use(express.json())

app.use("/api", videosRouter)

//start app
app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
    }
)
