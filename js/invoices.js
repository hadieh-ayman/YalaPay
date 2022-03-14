import { Repo } from "./repository/repo.js";

const repo = new Repo();
let isEdit = false;

window.onload = async () => {
    await repo.addInvoicesByJSON();
    await repo.addCustomersByJSON();
    await showInvoiceData();
    await showCustomerNames();
    window.deleteInvoice = deleteInvoice;
    window.updateInvoice = updateInvoice;
};

const plusBtn = document.querySelector(".plus-btn");
const popupForm = document.querySelector(".popup-form");
const invoiceTable = document.querySelector(".table");
const customerSelect = document.querySelector("#customer-name");

popupForm.addEventListener("submit", addInvoice);

function formToObject(form) {
    const formdata = new FormData(form);
    const data = {};
    for (const [key, value] of formdata) {
        data[key] = value;
    }
    return data;
}

async function showInvoiceData() {
    const invoices = await repo.getInvoices();
    // console.log(invoices);
    const invoiceRows = invoices.map((invoice) => invoiceToRow(invoice)).join(
        " "
    );
    invoiceTable.innerHTML = `
    <tr class="table-headings">
      <th>Invoice No.</th>
      <th>Customer ID</th>
      <th>Customer Name</th>
      <th>Amount</th>
      <th>Invoice Date</th>
      <th>Due Date</th>
      <th>        </th>
    </tr>
    ${invoiceRows}`;
}

function invoiceToRow(invoice) {
    return `
    <tr class="table-row">
        <td>${invoice.invoiceNo}</td>
        <td>${invoice.customerId}</td>
        <td>${invoice.customerName}</td>
        <td>${invoice.amount}</td>
        <td>${invoice.invoiceDate}</td>
        <td>${invoice.dueDate}</td>
        <td class=editing-btns>
            <img class="edit-btn" src="img/pen.svg" onclick="updateInvoice('${invoice.invoiceNo}')"/>
            <img class="delete-btn" src="img/trash.svg" onclick="deleteInvoice('${invoice.invoiceNo}')"/>
        </td>
    </tr>
    `;
}

async function showCustomerNames(){
    const customers = await repo.getCustomers();
    const customerOptions = customers.map((customer) => `<option value="${customer.companyName}">${customer.companyName}</option>`);
    customerSelect.innerHTML = customerOptions.join(' ');
}

async function addInvoice(e) {
    e.preventDefault();
    const invoice = formToObject(e.target);
    //assign the invoice number
    const invoices = await repo.getInvoices();
    invoice.invoiceNo = invoices.length + 1;
    //assign the customer ID
    const customer = await repo.getCustomerByName(invoice.customerName);
    invoice.customerId = customer.customerId;

    await repo.addInvoice(invoice);
    await showInvoiceData();
    popupForm.reset();
}

async function deleteInvoice(invoiceNo) {
    await repo.deleteInvoice(invoiceNo);
    await showInvoiceData();
}

async function updateInvoice(invoiceNo) {
    const Invoice = await repo.getInvoice(invoiceNo);
    document.querySelector("#invoiceNo").value = Invoice.invoiceNo;
    document.querySelector("#customer-id").value = Invoice.customerId;
    document.querySelector("#customer-name").value = Invoice.customerName;
    document.querySelector("#amount").value = Invoice.amount;
    document.querySelector("#invoice-date").value = Invoice.invoiceDate;
    document.querySelector("#due-date").value = Invoice.dueDate;
    // isEdit = true;
    // addBtn.value = "Update";
}
