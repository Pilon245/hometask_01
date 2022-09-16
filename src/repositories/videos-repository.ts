enum Resolutions {
    P144 = 'P144',
    P240 = 'P240',
    P480 = 'P480',
    P720 = 'P720',
    P1080 = 'P1080',
    P1440 = 'P1440',
    P2160 = 'P2160'
}
type VideDbType = {
    id: number
    title: string | boolean
    author: string | boolean
    canBeDownloaded: boolean,
    minAgeRestriction: number | null
    createdAt: string,
    publicationDate: string,
    availableResolutions: Resolutions[]
}

let videos: VideDbType[] = [
]

const resolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]

export const videosRepository = {
    findVideos(title: string | null | undefined){
        // if (title){
        //     return (204)
        // }else {
        //     return videos
        // }
        return videos
    },
    createVideos(title: string, author: string, availableResolutions: any){
        for (let i= 0; i < availableResolutions.length; i++) {
            let isEqual = resolutions.includes(availableResolutions[i])
            if (isEqual){
                var cont = 1;
            } else {
                var cont = 0;
            }
            cont = cont * cont;
        }
        if (cont! === 1 ) {
            const newVideos = {
                id: +(new Date()),
                title: title,
                author: author,
                canBeDownloaded: false,
                minAgeRestriction: null,
                createdAt: new Date().toISOString(),
                publicationDate: new Date(Date.now() + (3600 * 1000 * 24)).toISOString(),
                availableResolutions: availableResolutions
            }
            videos.push(newVideos)
            return newVideos
        }
    },
    findVideosByID(id: number) {
        let Video = videos.find(p => p.id === id)
        return Video
    },
    // errorsVideos(){
    //         const errors = {
    //             "errorsMessages": [
    //                 {
    //                     "message": "Message with error explanation for certain field",
    //                     "field": "What field/property of input model has error"
    //                 }
    //             ]
    //         }
    //         return errors
    // },
    updateVideos(id: number, title: string, author: string, availableResolutions: any, canBeDownloaded: boolean,
                 minAgeRestriction: number, publicationDate: string){
        let video = videos.find(p => p.id === id)
        if (video) {
            video.title = title
            video.author = author
            video.availableResolutions = availableResolutions
            video.canBeDownloaded = canBeDownloaded
            video.minAgeRestriction = minAgeRestriction
            video.publicationDate = publicationDate
            return true
        }
    },
    deleteVideos(id: number){
        for(let i=0; i < videos.length; i++) {
            if (videos[i].id === id) {
                videos.splice(i,1)
                return true;
            }
        }
    }
}
export const videosAllData = {
    deleteAllVideos () {
        videos = []
        return videos
    }
}


