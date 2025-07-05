package br.com.printers.back.controller;

import br.com.printers.back.dto.PrinterStatusDTO;
import br.com.printers.back.integration.PrinterSyncService;
import br.com.printers.back.entity.Printer;
import br.com.printers.back.service.PrinterService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;

import java.time.LocalDateTime;
import java.util.Random;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class PrinterController {

    private final PrinterService printerService;
    private final PrinterSyncService printerSyncService;

    public PrinterController(PrinterService printerService, PrinterSyncService printerSyncService) {
        this.printerService = printerService;
        this.printerSyncService = printerSyncService;
    }

    @GetMapping("/printers")
    public ResponseEntity<Page<Printer>> getAll(Pageable pageable) {
        return ResponseEntity.ok(printerService.findAll(pageable));
    }

    @GetMapping("/printers/{id}")
    public ResponseEntity<Printer> getById(@PathVariable UUID id) {
        return printerService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/printers")
    public ResponseEntity<Printer> create(@Valid @RequestBody Printer printer) {
        return ResponseEntity.ok(printerService.save(printer));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/printers/{id}")
    public ResponseEntity<Printer> update(@PathVariable UUID id, @Valid @RequestBody Printer updated) {
        return printerService.findById(id)
                .map(existing -> {
                    existing.setName(updated.getName());
                    existing.setModel(updated.getModel());
                    existing.setLocation(updated.getLocation());
                    existing.setStatus(updated.getStatus());
                    existing.setPaperCapacity(updated.getPaperCapacity());
                    existing.setLastUpdated(LocalDateTime.now());
                    return ResponseEntity.ok(printerService.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/printers/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        printerService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/printers/{id}/status")
    public ResponseEntity<PrinterStatusDTO> getStatus(@PathVariable UUID id) {
        String[] statuses = {"ONLINE", "OFFLINE"};
        Random random = new Random();

        String status = statuses[random.nextInt(statuses.length)];
        int paperLevel = random.nextInt(101);

        PrinterStatusDTO dto = new PrinterStatusDTO(status, paperLevel);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/sync/statistics")
    public ResponseEntity<PrinterSyncService.SyncStats> syncPrinters() {
        return ResponseEntity.ok(printerSyncService.syncPrinters());
    }
}
