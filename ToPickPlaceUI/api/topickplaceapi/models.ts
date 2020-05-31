export interface EventSummaryApiModel{
    id: string,
    description: string,
    name: string
}
export interface EventMapApiModel{
    width: number,
    heigth:number,
    availableSeats: Array<0|1>
}
export interface EventApiModel{
    id: string,
    description:string,
    name: string
    attendees: Array<AttendeeApiModel>,
    topics: Array<TopicApiModel>,
    eventMap?: EventMapApiModel
}

export interface AttendeeApiModel{
    id?: string,
    name: string,
    surname:string,
    topics: Array<string>,
    bio?:string
}

export interface TopicApiModel{
    id?: string,
    description: string,
    weigth: number,
    name: string
}


export interface SolutionRequest {
    map: {
        rows: number,
        cols: number,
        map: Array<0|1>
    },
    attendees: Array<{
        id: string,
        topicIds: Array<string>
    }>,
    topics:Array<{
        id: string,
        weigth: number
    }>
}

export interface Solution{
    solution: Array<string>,
    score: number
}