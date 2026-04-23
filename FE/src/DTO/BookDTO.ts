export interface BookDTO extends BaseBookDTO{
    id: number,
    authorName: string,
}

export interface BaseBookDTO{
    title: string,
    authorId: number
}