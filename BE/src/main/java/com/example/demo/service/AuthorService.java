package com.example.demo.service;

import com.example.demo.dto.AuthorDTO;
import com.example.demo.entities.Author;
import com.example.demo.repository.AuthorRepository;
import com.example.demo.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthorService {
    private final AuthorRepository repo;
    private final BookRepository bookRepo;

    public Page<AuthorDTO> getAll(int page, int size) {
        return repo.findAll(PageRequest.of(page, size))
                .map(this::toDTO);
    }

    public AuthorDTO getById(Long id) {
        return toDTO(repo.findById(id).orElseThrow());
    }

    public AuthorDTO create(AuthorDTO dto) {
        Author a = new Author();
        a.setName(dto.getName());
        return toDTO(repo.save(a));
    }

    public AuthorDTO update(Long id, AuthorDTO dto) {
        Author a = repo.findById(id).orElseThrow();
        a.setName(dto.getName());
        return toDTO(repo.save(a));
    }

    public void delete(Long id) { repo.deleteById(id); }

    private AuthorDTO toDTO(Author a) {
        AuthorDTO d = new AuthorDTO();
        d.setId(a.getId());
        d.setName(a.getName());
        d.setBooksCount((int) bookRepo.countByAuthorId(a.getId()));
        return d;
    }

}
