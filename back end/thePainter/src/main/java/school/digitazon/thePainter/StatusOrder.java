package school.digitazon.thePainter;

// con l'idea di poter modificare la stringa visualizzata od implemetare successive automazioni
// dichiaro un enum richiamato nella classe CustomerController per gestire lo status order
public enum StatusOrder {
    NEW, CANCELED, PAYMENTFAILED,  INPROGRESS, DELIVERED, CLOSED
}
