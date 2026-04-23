package com.example.demo.service;

import com.example.demo.dto.BookDTO;
import com.example.demo.entities.Book;
import com.example.demo.repository.AuthorRepository;
import com.example.demo.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepo;
    private final AuthorRepository authorRepo;

    public Page<BookDTO> getAll(int page, int size) {
        return bookRepo.findAll(PageRequest.of(page, size)).map(this::toDTO);
    }

    public BookDTO getById(Long id) {
        return toDTO(bookRepo.findById(id).orElseThrow());
    }

    public BookDTO create(BookDTO dto) {
        Book b = new Book();
        b.setTitle(dto.getTitle());
        b.setAuthor(authorRepo.findById(dto.getAuthorId()).orElseThrow());
        return toDTO(bookRepo.save(b));
    }

    public BookDTO update(Long id, BookDTO dto) {
        Book b = bookRepo.findById(id).orElseThrow();
        b.setTitle(dto.getTitle());
        b.setAuthor(authorRepo.findById(dto.getAuthorId()).orElseThrow());
        return toDTO(bookRepo.save(b));
    }

    public void delete(Long id) { bookRepo.deleteById(id); }

    private BookDTO toDTO(Book b) {
        BookDTO d = new BookDTO();
        d.setId(b.getId()); d.setTitle(b.getTitle());
        d.setAuthorId(b.getAuthor().getId());
        d.setAuthorName(b.getAuthor().getName());
        return d;
    }
}
