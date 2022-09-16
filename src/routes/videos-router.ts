import {Request, Response, Router} from "express";
import {videosRepository} from "../repositories/videos-repository";

export const videosRouter = Router({})

videosRouter.get('/videos', (req: Request, res: Response) => {
    const foundRepository = videosRepository.findVideos(req.params.title)
    res.status(200).send(foundRepository)
    })
videosRouter.post('/videos', (req: Request, res: Response) => {
    const title = req.body.title
    const author = req.body.author
    const availableResolutions = req.body.availableResolutions

    const errors: {message: string, field: string}[] = []

    if(!title) {
        errors.push({field: 'title', message: 'title is wrong'})
    }
    if(!author) {
        errors.push({field: 'author', message: 'author is wrong'})
    }
    if(!availableResolutions) {
        errors.push({message: 'availableResolutions is wrong',field: 'availableResolutions'})
    }
    if (errors.length) {
        return res.status(400).send({errorsMessages: errors})
    }


    const newVideos = videosRepository.createVideos
    (req.body.title,
        req.body.author,
        req.body.availableResolutions)
    if (newVideos) {
        res.status(201).send(newVideos)
    }
})
videosRouter.get('/videos/:id', (req:Request, res:Response) => {
    const video = videosRepository.findVideosByID(+req.params.id)
    if(video) {
        res.status(200).send(video)
    }else{
        res.send(404)
    }
})
videosRouter.put('/videos/:id', (req: Request, res:Response) =>{
    const isUpdate = videosRepository.updateVideos(+req.params.id, req.body.title, req.body.author,
        req.body.availableResolutions, req.body.canBeDownloaded, req.body.minAgeRestriction, req.body.publicationDate)
    if (isUpdate!){
        res.send(204)
    } else {
        res.status(404).send(videosRepository.errorsVideos())
    }
})
videosRouter.delete('/videos/:id', (req: Request, res:Response) =>{
    const isDelete = videosRepository.deleteVideos(+req.params.id)
    if (isDelete){
        res.sendStatus(204)
    }else{
        res.sendStatus(404)
    }
})