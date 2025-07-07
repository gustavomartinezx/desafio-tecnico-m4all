    package br.com.printers.back.entity;

    import org.junit.jupiter.api.Test;
    import java.time.LocalDateTime;
    import java.util.UUID;

    import static org.junit.jupiter.api.Assertions.*;

    class PrinterTest {
        @Test
        void testSetAndGetName() {
            Printer printer = new Printer();
            printer.setName("HP LaserJet");
            assertEquals("HP LaserJet", printer.getName());
        }

        @Test
        void testSetAndGetModel() {
            Printer printer = new Printer();
            printer.setModel("M404dn");
            assertEquals("M404dn", printer.getModel());
        }

        @Test
        void testSetAndGetPaperCapacity() {
            Printer printer = new Printer();
            printer.setPaperCapacity(250);
            assertEquals(250, printer.getPaperCapacity());
        }

        @Test
        void testSetAndGetStatus() {
            Printer printer = new Printer();
            printer.setStatus("ONLINE");
            assertEquals("ONLINE", printer.getStatus());
        }

        @Test
        void testPrePersistSetsIdAndCreatedAt() {
            Printer printer = new Printer();
            assertNull(printer.getId());
            assertNull(printer.getCreatedAt());
            printer.prePersist();
            assertNotNull(printer.getId());
            assertNotNull(printer.getCreatedAt());
        }

        @Test
        void testSetAndGetLocation() {
            Printer printer = new Printer();
            printer.setLocation("Sala 101");
            assertEquals("Sala 101", printer.getLocation());
        }

        @Test
        void testSetAndGetId() {
            Printer printer = new Printer();
            UUID uuid = UUID.randomUUID();
            printer.setId(uuid);
            assertEquals(uuid, printer.getId());
        }

        @Test
        void testSetAndGetCreatedAt() {
            Printer printer = new Printer();
            LocalDateTime now = LocalDateTime.now();
            printer.setCreatedAt(now);
            assertEquals(now, printer.getCreatedAt());
        }

        @Test
        void testSetAndGetMultipleFields() {
            Printer printer = new Printer();
            UUID uuid = UUID.randomUUID();
            LocalDateTime now = LocalDateTime.now();
            printer.setId(uuid);
            printer.setName("Canon");
            printer.setModel("LBP6030");
            printer.setLocation("Sala 202");
            printer.setStatus("OFFLINE");
            printer.setPaperCapacity(100);
            printer.setCreatedAt(now);
            printer.setLastUpdated(now);

            assertEquals(uuid, printer.getId());
            assertEquals("Canon", printer.getName());
            assertEquals("LBP6030", printer.getModel());
            assertEquals("Sala 202", printer.getLocation());
            assertEquals("OFFLINE", printer.getStatus());
            assertEquals(100, printer.getPaperCapacity());
            assertEquals(now, printer.getCreatedAt());
            assertEquals(now, printer.getLastUpdated());
        }

        @Test
        void testPaperCapacityNull() {
            Printer printer = new Printer();
            printer.setPaperCapacity(null);
            assertNull(printer.getPaperCapacity());
        }

        @Test
        void testStatusNull() {
            Printer printer = new Printer();
            printer.setStatus(null);
            assertNull(printer.getStatus());
        }

        @Test
        void testSetAndGetLastUpdated() {
            Printer printer = new Printer();
            LocalDateTime now = LocalDateTime.now();
            printer.setLastUpdated(now);
            assertEquals(now, printer.getLastUpdated());
        }
    }
