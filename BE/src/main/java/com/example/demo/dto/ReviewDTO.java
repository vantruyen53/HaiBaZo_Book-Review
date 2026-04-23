package com.example.demo.dto;

import lombok.Data;

@Data
public class ReviewDTO {
    private long id;
    private String content;
    private long bookId;
    private String bookTitle;
    private String authorName;
}
