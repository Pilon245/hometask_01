import express, {NextFunction, Request, Response} from "express"
import bodyParser from 'body-parser'
import {videosRouter} from "./routes/videos-router";
import {videosAllData} from "./repositories/videos-repository";

const app = express()
const port = process.env.PORT || 5001

app.use(express.json())

app.use("/api", videosRouter)
app.delete('/api/testing/all-data',(req: Request, res: Response) =>{
    res.status(204).send(videosAllData.deleteAllVideos())
})

//start app
app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
    }
)
