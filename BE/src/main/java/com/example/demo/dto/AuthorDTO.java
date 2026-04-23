package com.example.demo.dto;

import lombok.Data;

@Data
public class AuthorDTO {
    private long id;
    private String name;
    private int booksCount;
}
