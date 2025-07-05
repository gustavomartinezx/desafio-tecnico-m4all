package br.com.printers.back.service;

import br.com.printers.back.entity.Printer;
import br.com.printers.back.repository.PrinterRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PrinterService {

    private final PrinterRepository printerRepository;

    public PrinterService(PrinterRepository printerRepository) {
        this.printerRepository = printerRepository;
    }

    public Page<Printer> findAll(Pageable pageable) {
        return printerRepository.findAllByOrderByCreatedAtDesc(pageable);
    }

    public List<Printer> findAll() {
        return printerRepository.findAll();
    }

    public Optional<Printer> findById(UUID id) {
        return printerRepository.findById(id);
    }

    public Printer save(Printer printer) {
        return printerRepository.save(printer);
    }

    public void delete(UUID id) {
        printerRepository.deleteById(id);
    }

    public Printer setPaperCapacity(UUID id, Integer paperCapacity) {
        Optional<Printer> optionalPrinter = printerRepository.findById(id);
        if (optionalPrinter.isEmpty()) {
            throw new RuntimeException("Impressora não encontrada" + id);
        }
        Printer printer = optionalPrinter.get();
        printer.setPaperCapacity(paperCapacity);
        return printerRepository.save(printer);
    }

    public Printer setCreatedAt(UUID id, LocalDateTime createdAt) {
        Optional<Printer> optionalPrinter = printerRepository.findById(id);
        if (optionalPrinter.isEmpty()) {
            throw new RuntimeException("Impressora não encontrada" + id);
        }
        Printer printer = optionalPrinter.get();
        printer.setCreatedAt(createdAt);
        return printerRepository.save(printer);
    }
}
