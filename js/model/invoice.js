export class Invoice{
    constructor(invoiceNo, customerId, CustomerName, amount, invoiceDate, dueDate){
        this.invoiceNo = invoiceNo;
        this.customerId = customerId;
        this.CustomerName = CustomerName;
        this.amount = amount;
        this.invoiceDate = invoiceDate;
        this.dueDate = dueDate;
    }
    getInvoiceDate(){
        var mm = this.invoiceDate.getMonth() + 1;
        var dd = this.invoiceDate.getDate();
    
        return [this.invoiceDate.getFullYear(), (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd].join('');
    }
}
