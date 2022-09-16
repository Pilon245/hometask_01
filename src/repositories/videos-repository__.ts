const videos = [{id: 1,title: "play", author: "vladBumaga", canBeDownloaded: false,
    minAgeRestriction: null, createdAt: "2022-09-15T19:18:23.607Z", publicationDate: "2022-09-15T19:18:23.607Z",
    availableResolutions: new Set() }]
const resolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]

export const videosRepository_____ = {
    findVideos(title: string | null | undefined){
        if (title){
            return (204)
        }else {
            return videos
        }
    },
    createVideos(title: string, author: string, availableResolutions: any){
        for (let i= 0; i < availableResolutions.length; i++) {
            var setIS = new Set()
            let isEqual = resolutions.includes(availableResolutions[i])
            if (isEqual){
                setIS.add(availableResolutions[i])
                var cont = 1;
            } else {
                var cont = 0;
            }
            cont = cont * cont;
            console.log((setIS))
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
                availableResolutions: setIS!
            }
            videos.push(newVideos)
            return newVideos
        } else {
            return false
        }
    }

}


