package br.com.printers.back.scheduler;

import br.com.printers.back.integration.PrinterSyncService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class PrinterSyncScheduler {

    private final PrinterSyncService printerSyncService;

    public PrinterSyncScheduler(PrinterSyncService printerSyncService) {
        this.printerSyncService = printerSyncService;
    }

    @Scheduled(fixedRate = 3600000) 
    public void runScheduledSync() {
        System.out.println("[SCHEDULER] Iniciando sincronização automática...");
        printerSyncService.syncPrinters();
        System.out.println("[SCHEDULER] Sincronização finalizada.");
    }
}
