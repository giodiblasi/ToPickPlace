export interface EventSummaryApiModel{
    id: string,
    description: string,
    name: string
}
export interface EventMapApiModel{
    width: number,
    heigth:number,
    availableSeats: Array<0|1|-1>
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
    weight: number,
    name: string
}
