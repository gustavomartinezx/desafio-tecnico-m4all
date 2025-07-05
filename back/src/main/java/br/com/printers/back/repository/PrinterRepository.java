package br.com.printers.back.repository;

import br.com.printers.back.entity.Printer;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PrinterRepository extends JpaRepository<Printer, UUID> {
    org.springframework.data.domain.Page<Printer> findAllByOrderByCreatedAtAsc(org.springframework.data.domain.Pageable pageable);
    org.springframework.data.domain.Page<Printer> findAllByOrderByCreatedAtDesc(org.springframework.data.domain.Pageable pageable);
}
