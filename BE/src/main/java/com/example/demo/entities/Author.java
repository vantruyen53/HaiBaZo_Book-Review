package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.*;

@Entity @Table(name = "authors")
@Data
@NoArgsConstructor @AllArgsConstructor
public class Author {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
    private List<Book> books;

    public int getBooksCount(){
        return books !=null?books.size():0;
    }
}
