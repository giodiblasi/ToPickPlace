export interface EventSummaryApiModel{
    id: string,
    description: string
}

export interface EventApiModel{
    id: string,
    description:string,
    attendees: Array<AttendeeApiModel>,
    topics: Array<TopicApiModel>
}

export interface AttendeeApiModel{
    name: string,
    topics: Array<string>
}

export interface TopicApiModel{
    id: string,
    description: string,
    weight: number
}
