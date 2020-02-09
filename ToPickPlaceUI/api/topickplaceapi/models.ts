export interface EventSummaryApiModel{
    id: string,
    description: string,
    name: string
}

export interface EventApiModel{
    id: string,
    description:string,
    name: string
    attendees: Array<AttendeeApiModel>,
    topics: Array<TopicApiModel>
}

export interface AttendeeApiModel{
    id: string,
    name: string,
    surname:string,
    topics: Array<string>,
    bio?:string
}

export interface TopicApiModel{
    id: string,
    description: string,
    weight: number
}
