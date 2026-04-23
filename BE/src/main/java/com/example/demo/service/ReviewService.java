package com.example.demo.service;

import com.example.demo.dto.ReviewDTO;
import com.example.demo.entities.Review;
import com.example.demo.repository.BookRepository;
import com.example.demo.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepo;
    private final BookRepository bookRepo;

    public Page<ReviewDTO> getAll(int page, int size) {
        return reviewRepo.findAll(PageRequest.of(page, size)).map(this::toDTO);
    }

    public ReviewDTO getById(Long id) {
        return toDTO(reviewRepo.findById(id).orElseThrow());
    }

    public ReviewDTO create(ReviewDTO dto) {
        Review r = new Review();
        r.setContent(dto.getContent());
        r.setBook(bookRepo.findById(dto.getBookId()).orElseThrow());
        return toDTO(reviewRepo.save(r));
    }

    public ReviewDTO update(Long id, ReviewDTO dto) {
        Review r = reviewRepo.findById(id).orElseThrow();
        r.setContent(dto.getContent());
        r.setBook(bookRepo.findById(dto.getBookId()).orElseThrow());
        return toDTO(reviewRepo.save(r));
    }

    public void delete(Long id) { reviewRepo.deleteById(id); }

    private ReviewDTO toDTO(Review r) {
        ReviewDTO d = new ReviewDTO();
        d.setId(r.getId());
        d.setBookId(r.getBook().getId());
        d.setContent(r.getContent());
        d.setBookTitle(r.getBook().getTitle());
        d.setAuthorName(r.getBook().getAuthor().getName());
        return d;
    }
}
