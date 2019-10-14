export const EVENTS = "Events"
const labels = {
    [EVENTS]: 'Events'
}

export const printLabel = (labelCode: string): string => labels[labelCode] || 'NOT FOUND'; 