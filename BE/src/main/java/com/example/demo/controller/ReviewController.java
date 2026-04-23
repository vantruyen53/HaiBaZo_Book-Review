package com.example.demo.controller;

import com.example.demo.dto.ReviewDTO;
import com.example.demo.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ReviewController {
    private final ReviewService service;

    @GetMapping
    public Page<ReviewDTO> getAll(@RequestParam(defaultValue="0") int page,
                                  @RequestParam(defaultValue="5") int size) {

        return service.getAll(page, size);
    }

    @GetMapping("/{id}")
    public ReviewDTO getById(@PathVariable Long id) { return service.getById(id); }

    @PostMapping
    public ReviewDTO create(@RequestBody ReviewDTO dto) { return service.create(dto); }

    @PutMapping("/{id}")
    public ReviewDTO update(@PathVariable Long id, @RequestBody ReviewDTO dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}
