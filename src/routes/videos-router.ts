import {Request, Response, Router} from "express";
import {videosRepository} from "../repositories/videos-repository";

export const videosRouter = Router({})

videosRouter.get('/videos', (req: Request, res: Response) => {
    const foundRepository = videosRepository.findVideos(req.params.title)
    res.status(200).send(foundRepository)
    })
videosRouter.post('/videos', (req: Request, res: Response) => {
    enum Resolutions {
        P144 = 'P144',
        P240 = 'P240',
        P480 = 'P480',
        P720 = 'P720',
        P1080 = 'P1080',
        P1440 = 'P1440',
        P2160 = 'P2160'
    }

    const arrayResolution = Object.values(Resolutions)

    let availableResolutions: Resolutions[] = req.body.availableResolutions

    const result = availableResolutions.every((element) => arrayResolution.includes(element))
    const title = req.body.title
    const author = req.body.author

    const errors: {message: string, field: string}[] = []

    if(!title || title.length > 40 || typeof title !== "string") {
        errors.push({message: 'title is wrong', field: 'title',})
    }
    if(!author || author.length > 20 || typeof author !== "string") {
        errors.push({message: 'author is wrong', field: 'author'})
    }
    if(!result) {
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
    enum Resolutions {
        P144 = 'P144',
        P240 = 'P240',
        P480 = 'P480',
        P720 = 'P720',
        P1080 = 'P1080',
        P1440 = 'P1440',
        P2160 = 'P2160'
    }

    const arrayResolution = Object.values(Resolutions)

    let availableResolutions: Resolutions[] = req.body.availableResolutions

    const result = availableResolutions.every((element) => arrayResolution.includes(element))
    const title = req.body.title
    const author = req.body.author
    const minAgeRestriction = req.body.minAgeRestriction
    const canBeDownloaded = req.body.canBeDownloaded
    const publicationDate = req.body.publicationDate


    const errors: {message: string, field: string}[] = []

    if(!title || title.length > 40 || typeof title !== "string") {
        errors.push({message: 'title is wrong', field: 'title',})
    }
    if(!author || author.length > 20 || typeof author !== "string") {
        errors.push({message: 'author is wrong', field: 'author'})
    }
    if(!result) {
        errors.push({message: 'availableResolutions is wrong',field: 'availableResolutions'})
    }
    if(minAgeRestriction < 1 || minAgeRestriction > 18){
        errors.push({message: 'minAgeRestriction is wrong',field: 'minAgeRestriction'})
    }
    if(typeof canBeDownloaded !== "boolean") {
        errors.push({message: 'canBeDownloaded is wrong', field: 'canBeDownloaded'})
    }
    if(typeof publicationDate !== "string") {
        errors.push({message: 'publicationDate is wrong', field: 'publicationDate'})
    }
    if (errors.length) {
        return res.status(400).send({errorsMessages: errors})
    }


    const isUpdate = videosRepository.updateVideos(+req.params.id, req.body.title, req.body.author,
        req.body.availableResolutions, req.body.canBeDownloaded, req.body.minAgeRestriction, req.body.publicationDate)
    if (isUpdate!){
        res.send(204)
    } else {
        res.sendStatus(404)
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