export interface ReviewDTO extends BaseReviewDT{
    id: number,
    bookTitle:string,
    authorName:string,
}

export interface BaseReviewDT{
    content: string,
    bookId: number,
}