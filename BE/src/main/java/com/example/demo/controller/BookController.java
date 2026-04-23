package com.example.demo.controller;


import com.example.demo.dto.BookDTO;
import com.example.demo.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BookController {
    private final BookService service;

    @GetMapping
    public Page<BookDTO> getAll(@RequestParam(defaultValue="0") int page,
                                @RequestParam(defaultValue="5") int size) {
        return service.getAll(page, size);
    }

    @GetMapping("/{id}")
    public BookDTO getById(@PathVariable Long id) { return service.getById(id); }

    @PostMapping
    public BookDTO create(@RequestBody BookDTO dto) { return service.create(dto); }

    @PutMapping("/{id}")
    public BookDTO update(@PathVariable Long id, @RequestBody BookDTO dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}
