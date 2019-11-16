export interface EventSummary{
    id: string,
    description: string
}

export interface Event{
    id: string,
    description:string,
}

export interface Attendee{
    name: string
}

export interface Topic{
    id: string,
    description: string,
    weight: number
}
