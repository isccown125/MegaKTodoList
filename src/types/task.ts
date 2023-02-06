export interface TaskEntity {
    id: string,
    title: string,
    isDone: boolean,
    dateAdd: Date,
    dateModify?: Date,
}
export type task = {
    id: string,
    title: string,
    isDone: boolean,
    dateAdd: Date,
    dateModify?: Date,
}