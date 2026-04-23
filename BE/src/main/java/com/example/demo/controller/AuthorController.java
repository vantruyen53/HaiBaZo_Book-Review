package com.example.demo.controller;

import com.example.demo.dto.AuthorDTO;
import com.example.demo.service.AuthorService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/authors")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthorController {
    private final AuthorService service;

    @GetMapping
    public Page<AuthorDTO> getAll(@RequestParam(defaultValue="0") int page,
                                  @RequestParam(defaultValue="5") int size) {

        return service.getAll(page, size);
    }

    @GetMapping("/{id}")
    public AuthorDTO getById(@PathVariable Long id) { return service.getById(id); }

    @PostMapping
    public AuthorDTO create(@RequestBody AuthorDTO dto) { return service.create(dto); }

    @PutMapping("/{id}")
    public AuthorDTO update(@PathVariable Long id, @RequestBody AuthorDTO dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}
