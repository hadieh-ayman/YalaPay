const invoiceDb = new Localbase("invoice.db");
const customerDb = new Localbase("customer.db");
const paymentDb = new Localbase("payment.db");
const chequeDb = new Localbase("cheque.db");
const chequeDepositDb = new Localbase("chequeDeposit.db");

const invoiceCollection = "invoices";
const customerCollection = "customers";
const paymentCollection = "payments";
const chequeCollection = "cheque";
const chequeDepositCollection = "chequeDeposits"

const invoiceUrl = "YalaPay-data/invoices.json";
const customerUrl = "YalaPay-data/customers.json";
const paymentUrl = "YalaPay-data/payments.json";
const chequeUrl = "YalaPay-data/cheques.json";
const chequeDepositUrl = "YalaPay-data/cheque-deposits.json";

export class Repo {
    // Invoice Operations
    async addInvoicesByJSON() {
        const response = await fetch(invoiceUrl);
        const data = await response.json();
        for (const invoice of data) {
            const invoiceExists = await invoiceDb
                .collection(invoiceCollection)
                .doc({ invoiceNo: invoice.invoiceNo })
                .get();
            if (invoiceExists == undefined)
                await invoiceDb.collection(invoiceCollection).add(invoice);
        }
    }

    getInvoice(invoiceNo) {
        return invoiceDb
            .collection(invoiceCollection)
            .doc({ invoiceNo: invoiceNo })
            .get();
    }

    getInvoices() {
        return invoiceDb.collection(invoiceCollection).get();
    }

    addInvoice(invoice) {
        return invoiceDb.collection(invoiceCollection).add(invoice);
    }

    updateInvoice(updatedInvoice) {
        return invoiceDb
            .collection(invoiceCollection)
            .doc({ invoiceNo: updatedInvoice.invoiceNo })
            .update(updatedInvoice);
    }

    deleteInvoice(invoiceNo) {
        return invoiceDb
            .collection(invoiceCollection)
            .doc({ invoiceNo: invoiceNo })
            .delete();
    }

    async getBalance(invoice) {
        const payments = await this.getPaymentsByInvoiceNo(invoice.invoiceNo);
        let balance = invoice.amount;
        for (const payment of payments) {
            balance -= payment.amount;
        }
        return balance;
    }

    // Customer Operations
    async addCustomersByJSON() {
        const response = await fetch(customerUrl);
        const data = await response.json();
        for (const customer of data) {
            const customerExists = await customerDb
                .collection(customerCollection)
                .doc({ customerId: customer.customerId })
                .get();
            if (customerExists == undefined)
                await customerDb.collection(customerCollection).add(customer);
        }
    }

    getCustomer(customerId) {
        return customerDb
            .collection(customerCollection)
            .doc({ customerId: customerId })
            .get();
    }

    getCustomerByName(customerName) {
        return customerDb
            .collection(customerCollection)
            .doc({ companyName: customerName })
            .get();
    }

    getCustomers() {
        return customerDb.collection(customerCollection).get();
    }

    addCustomer(customer) {
        return customerDb.collection(customerCollection).add(customer);
    }

    updateCustomer(updatedCustomer) {
        return customerDb
            .collection(customerCollection)
            .doc({ customerId: updatedCustomer.customerId })
            .update(updatedCustomer);
    }

    deleteCustomer(customerId) {
        return customerDb
            .collection(customerCollection)
            .doc({ customerId: customerId })
            .delete();
    }

    // payments Operations
    async addPaymentsByJSON() {
        const response = await fetch(paymentUrl);
        const data = await response.json();
        for (const payment of data) {
            const paymentExists = await paymentDb
                .collection(paymentCollection)
                .doc({ paymentId: payment.paymentId })
                .get();
            if (paymentExists == undefined)
                await paymentDb.collection(paymentCollection).add(payment);
        }
    }

    getPayment(paymentId) {
        return paymentDb
            .collection(paymentCollection)
            .doc({ paymentId: paymentId })
            .get();
    }

    getPayments() {
        return paymentDb.collection(paymentCollection).get();
    }

    async getPaymentsByInvoiceNo(invoiceNo) {
        const payments = await this.getPayments();
        return payments.filter((payment) => payment.invoiceNo == invoiceNo);
    }

    addPayment(payment) {
        return paymentDb.collection(paymentCollection).add(payment);
    }

    updatePayment(updatePayment) {
        return paymentDb
            .collection(paymentCollection)
            .doc({ paymentId: updatePayment.paymentId })
            .update(updatePayment);
    }

    deletePayment(paymentId) {
        return paymentDb
            .collection(paymentCollection)
            .doc({ paymentId: paymentId })
            .delete();
    }

    //Cheque Operations
    async addChequesByJSON() {
        const response = await fetch(chequeUrl);
        const data = await response.json();
        for (const cheque of data) {
            const chequeExists = await chequeDb
                .collection(chequeCollection)
                .doc({ chequeNo: cheque.chequeNo })
                .get();
            if (chequeExists == undefined)
                await chequeDb.collection(chequeCollection).add(cheque);
        }
    }

    getCheque(chequeNo) {
        return chequeDb
            .collection(chequeCollection)
            .doc({ chequeNo: chequeNo })
            .get();
    }

    getCheques() {
        return chequeDb.collection(chequeCollection).get();
    }

    addCheque(cheque) {
        return chequeDb.collection(chequeCollection).add(cheque);
    }

    updateCheque(updatedCheque, oldChequeNo) {
        return chequeDb
            .collection(chequeCollection)
            .doc({ chequeNo: oldChequeNo })
            .update(updatedCheque);
    }

    deleteCheque(chequeNo) {
        return chequeDb
            .collection(chequeCollection)
            .doc({ chequeNo: chequeNo })
            .delete();
    }

    //cheque deposit operations
    async addDepositsByJSON() {
        const response = await fetch(chequeDepositUrl);
        const data = await response.json();
        for (const chequeDeposit of data) {
            const chequeExists = await chequeDepositDb
                .collection(chequeDepositCollection)
                .doc({ depositId: chequeDeposit.depositId })
                .get();
            if (chequeExists == undefined)
                await chequeDepositDb.collection(chequeDepositCollection).add(chequeDeposit);
        }
    }

    getDeposit(depositId) {
        return chequeDepositDb
            .collection(chequeDepositCollection)
            .doc({ depositId: depositId })
            .get();
    }

    getDeposits() {
        return chequeDepositDb.collection(chequeDepositCollection).get();
    }

    addDeposit(chequeDeposit) {
        return chequeDepositDb.collection(chequeDepositCollection).add(chequeDeposit);
    }

    updateDeposit(updatedChequeDeposit) {
        return chequeDepositDb
            .collection(chequeDepositCollection)
            .doc({ depositId: updatedChequeDeposit.depositId })
            .update(updatedChequeDeposit);
    }

    deleteDeposit(depositId) {
        return chequeDepositDb
            .collection(chequeDepositCollection)
            .doc({ depositId: depositId })
            .delete();
    }

}
