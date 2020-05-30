export const EVENTS = "Events"
export const APP_TITLE= "App_Title"
export const SAVE_MAP= "Save_Map"
export const GET_SOLUTION= "Get_Solution"
const labels:{[index:string]: string}= {
    [EVENTS]: 'Events',
    [APP_TITLE]: 'ToPickPlace',
    [SAVE_MAP]: 'Save Map',
    [GET_SOLUTION]: 'Get Solution'
}

export const printLabel = (labelCode: string): string => labels[labelCode] || 'NOT FOUND'; 