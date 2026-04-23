export interface AuthorDTO extends BaseAuthorDTO{
    id: number,
    booksCount: number,
}

export interface BaseAuthorDTO{
    name: string,
}