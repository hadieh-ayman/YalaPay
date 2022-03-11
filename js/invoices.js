import { Repo } from "./repository/repo.js";

const repo = new Repo();
let isEdit = false;

window.onload = async () => {
    await showInvoiceData();
    window.deleteInvoice = deleteInvoice;
    window.updateInvoice = updateInvoice;
};

const addBtn = document.querySelector(".plus-btn");
const form = document.querySelector(".popup-form");
const invoiceTable = document.querySelector(".table");

form.addEventListener("submit", addInvoice);

function formToObject(dataForm) {
    const formdata = new FormData(dataForm);
    const data = {};
    for (const [key, value] of formdata) {
        data[key] = value;
    }
    return data;
}

async function showInvoiceData() {
    const Invoices = await repo.getInvoices();
    console.log(Invoices);
    const InvoiceRows = Invoices.map((Invoice) => InvoiceToRow(Invoice)).join(" ");
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
    ${InvoiceRows}`;
}

function InvoiceToRow(invoice) {
    return `
    <tr class="table-row">
        <td>${invoice.invoiceNo}</td>
        <td>${invoice.customerId}</td>
        <td>${invoice.customerName}</td>
        <td>${invoice.amount}</td>
        <td>${invoice.invoiceDate}</td>
        <td>${invoice.dueDate}</td>
        <td>
            <img class="edit-btn" src="img/pen.svg" onclick="updateInvoice('${invoice.invoiceNo}')"/>
            <img class="delete-btn" src="img/trash.svg" onclick="deleteInvoice('${invoice.invoiceNo}')"/>
        </td>
    </tr>
    `;
}

async function addInvoice(e) {
    e.preventDefault();
    const invoice = formToObject(e.target);
    if (isEdit) {
        await repo.updateInvoice(invoice);
        isEdit = false;
        addBtn.value = "Update";
    } else {
        invoice.invoiceNo = Date.now().toString();
        await repo.addInvoice(invoice);
    }
    await showInvoiceData();
    form.reset();
    document.querySelector("#invoiceNo").value = "";
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
    isEdit = true;
    addBtn.value = "Update";
}
