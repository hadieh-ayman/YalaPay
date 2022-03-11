const customerDb = new Localbase("customerDB");
const invoiceDb = new Localbase("invoiceDB");
const paymentDb = new Localbase("paymentDB");
const chequeDb = new Localbase("chequeDB");
export class Repo {
    // Invoice Operations
    getInvoice(invoiceNo) {
        return invoiceDb.collection("invoices").doc({ invoiceNo: invoiceNo }).get();
    }

    getInvoices() {
        return invoiceDb.collection("invoices").limit(10).get();
    }

    addInvoice(invoice) {
        return invoiceDb.collection("invoices").add(invoice);
    } 

    updateInvoice(updatedInvoice) {
        return invoiceDb.collection("invoices").doc({invoiceNo:updatedInvoice.invoiceNo}).update(updatedInvoice);
    }

    deleteInvoice(invoiceNo) {
        return invoiceDb.collection("invoices").doc({ invoiceNo: invoiceNo }).delete();
    }
}
