package br.com.printers.back.integration;

import br.com.printers.back.entity.Printer;
import br.com.printers.back.repository.PrinterRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Service
public class PrinterSyncService {

    private static final Logger log = LoggerFactory.getLogger(PrinterSyncService.class);
    private static final String API_URL = "https://mt.tracerly.net";

    private final RestTemplate restClient;
    private final PrinterRepository repository;
    private final ObjectMapper objectMapper;

    public PrinterSyncService(PrinterRepository repository) {
        this.repository = repository;
        this.restClient = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    public record SyncStats(int sucessos, int falhas, int total) {}

    public SyncStats syncPrinters() {
        int sucessos = 0;
        int falhas = 0;

        log.info("Iniciando processo de sincronização de printers.");

        try {
            ResponseEntity<String> apiResponse = restClient.getForEntity(API_URL, String.class);

            if (apiResponse.getStatusCode() != HttpStatus.OK) {
                log.error("API externa retornou status não esperado: {}", apiResponse.getStatusCode());
                return new SyncStats(0, 0, 0);
            }

            JsonNode root = objectMapper.readTree(apiResponse.getBody());
            JsonNode dataNode = root.path("data");

            if (dataNode.isMissingNode() || !dataNode.isArray()) {
                log.warn("Formato da resposta da API inesperado. Campo 'data' ausente ou inválido.");
                return new SyncStats(0, 0, 0);
            }

            for (JsonNode printerNode : dataNode) {
                if (processaRegistro(printerNode)) {
                    sucessos++;
                } else {
                    falhas++;
                }
            }

        } catch (Exception e) {
            log.error("Falha crítica na comunicação com a API: {}", e.getMessage(), e);
        }
        
        int total = sucessos + falhas;
        log.info("Sincronização concluída. Sucessos: {}, Falhas: {}, Total de registros: {}", sucessos, falhas, total);
        return new SyncStats(sucessos, falhas, total);
    }
    
    private boolean processaRegistro(JsonNode node) {
        try {
            UUID id = UUID.fromString(node.path("id").asText());
            
            Printer printer = repository.findById(id).orElseGet(() -> {
                Printer p = new Printer();
                p.setId(id);
                return p;
            });

            printer.setName(node.path("name").asText());
            printer.setModel(node.path("model").asText());
            printer.setLocation(node.path("location").asText());
            printer.setStatus(node.path("status").asText());
            printer.setPaperCapacity(node.path("paperCapacity").asInt());
            printer.setCreatedAt(LocalDateTime.parse(node.path("createdAt").asText(), DateTimeFormatter.ISO_DATE_TIME));
            printer.setLastUpdated(LocalDateTime.now());

            repository.save(printer);
            return true;
        } catch (Exception e) {
            String id = node.path("id").asText("ID_INVALIDO");
            log.error("Erro ao processar o printer com id [{}]: {}", id, e.getMessage());
            return false;
        }
    }
}