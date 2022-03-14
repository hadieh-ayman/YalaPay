const invoiceDb = new Localbase("invoice.db");
const customerDb = new Localbase("customer.db");
const paymentDb = new Localbase("payment.db");
const chequeDb = new Localbase("cheque.db");

const invoiceCollection = "invoices";
const customerCollection = "customers";

const invoiceUrl = "../YalaPay-data/invoices.json";
const customerUrl = "../YalaPay-data/customers.json"

export class Repo {
    // Invoice Operations
    async addInvoicesByJSON(){
        const response = await fetch(invoiceUrl);
        const data = await response.json();
        for (const invoice of data) {
            const invoiceExists = await invoiceDb.collection(invoiceCollection).doc({ invoiceNo: invoice.invoiceNo }).get();
            if(invoiceExists==undefined) 
                await invoiceDb.collection(invoiceCollection).add(invoice);
        }
    }

    getInvoice(invoiceNo) {
        return invoiceDb.collection(invoiceCollection).doc({ invoiceNo: invoiceNo }).get();
    }

    getInvoices() {
        return invoiceDb.collection(invoiceCollection).get();
    }

    addInvoice(invoice) {
        return invoiceDb.collection(invoiceCollection).add(invoice);
    } 

    updateInvoice(updatedInvoice) {
        return invoiceDb.collection(invoiceCollection).doc({invoiceNo:updatedInvoice.invoiceNo}).update(updatedInvoice);
    }

    deleteInvoice(invoiceNo) {
        return invoiceDb.collection(invoiceCollection).doc({ invoiceNo: invoiceNo }).delete();
    }

    // Customer Operations
    async addCustomersByJSON(){
        const response = await fetch(customerUrl);
        const data = await response.json();
        for (const customer of data) {
            const customerExists = await customerDb.collection(customerCollection).doc({ customerId: customer.customerId }).get();
            if(customerExists==undefined) 
                await customerDb.collection(customerCollection).add(customer);
        }
    }

    getCustomer(customerId) {
        return customerDb.collection(customerCollection).doc({ customerId: customerId }).get();
    }

    getCustomerByName(customerName) {
        return customerDb.collection(customerCollection).doc({ companyName: customerName }).get();
    }

    getCustomers() {
        return customerDb.collection(customerCollection).get();
    }

    addCustomer(customer) {
        return customerDb.collection(customerCollection).add(customer);
    } 

    updateCustomer(updatedCustomer) {
        return customerDb.collection(customerCollection).doc({customerId:updatedCustomer.customerId}).update(updatedCustomer);
    }

    deleteCustomer(customerId) {
        return customerDb.collection(customerCollection).doc({ customerId: customerId }).delete();
    }
}
