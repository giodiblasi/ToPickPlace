export interface EventSummaryApiModel{
    id: string,
    description: string
}

export interface EventApiModel{
    id: string,
    description:string,
    attendees: Array<AttendeeApiModel>
}

export interface AttendeeApiModel{
    name: string
}
