export interface BookDTO extends BaseBookDTO{
    id: number,
    authorId: number,
}

export interface BaseBookDTO{
    title: string,
    authorId: number
}