package com.example.demo.dto;

import lombok.Data;

@Data
public class BookDTO {
    private long id;
    private String title;
    private long authorId;
    private String authorName;

}
