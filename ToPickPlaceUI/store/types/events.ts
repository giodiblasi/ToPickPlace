export interface EventSummary{
    id: string,
    description: string
}

export interface Event{
    id: string,
    description:string,
    attendees: Array<Attendee>
}

export interface Attendee{
    name: string
}
