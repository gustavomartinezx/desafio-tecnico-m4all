package br.com.printers.back.dto;

public class PrinterStatusDTO {
    private String status;
    private int paperLevel;

    public PrinterStatusDTO() {}

    public PrinterStatusDTO(String status, int paperLevel) {
        this.status = status;
        this.paperLevel = paperLevel;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getPaperLevel() {
        return paperLevel;
    }

    public void setPaperLevel(int paperLevel) {
        this.paperLevel = paperLevel;
    }
}
