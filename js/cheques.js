import { Repo } from "./repository/repo.js";

const repo = new Repo();

window.onload = async () => {
    await repo.addChequesByJSON();
    await showChequesData();
    await showCounter();
};

const chequeTable = document.querySelector(".table");
const header = document.querySelector(".header");
const reportForm = document.querySelector(".status-report");

reportForm.addEventListener("submit", chequeReport);

function formToObject(form) {
    const formdata = new FormData(form);
    const data = {};
    for (const [key, value] of formdata) {
        data[key] = value;
    }
    return data;
}

async function showChequesData() {
    const cheques = await repo.getCheques();
    console.log(cheques);
    const chequesRows = cheques.map((cheque) => chequeToRow(cheque)).join(" ");
    chequeTable.innerHTML = `
    <tr class="table-headings">
        <th>Cheque No</th>
        <th>Amount</th>
        <th>Drawer</th>
        <th>Bank Name</th>
        <th>Status</th>
        <th>Received Date</th>
        <th>Due Date</th>
        <th></th>
    </tr>
    ${chequesRows}`;
}

function chequeToRow(cheque) {
    return `
    <tr class="table-row">
        <td>${cheque.chequeNo}</td>
        <td>${cheque.amount}</td>
        <td>${cheque.drawer}</td>
        <td>${cheque.bankName}</td>
        <td>${cheque.status}</td>
        <td>${cheque.receivedDate}</td>
        <td>${cheque.dueDate}</td>
        <td class=editing-btns>
            <img class="view-btn" src="img/view.svg" onclick="viewChequeImage('${cheque.chequeNo}')"/>
        </td>
    </tr>
    `;
}

function showChequesReport(cheques) {
    const chequesRows = cheques.map((cheque) => chequeToRow(cheque)).join(" ");
    chequeTable.innerHTML = `
    <tr class="table-headings">
        <th>Cheque No</th>
        <th>Amount</th>
        <th>Drawer</th>
        <th>Bank Name</th>
        <th>Status</th>
        <th>Received Date</th>
        <th>Due Date</th>
        <th></th>
    </tr>
    ${chequesRows}`;
}

async function chequeReport(e) {
    e.preventDefault();
    const searchInput = formToObject(e.target);
    const toDate = searchInput.toDate;
    const fromDate = searchInput.fromDate;
    const cheques = await repo.getCheques();
    switch (searchInput.status) {
        case "All":{
            const inPeriodCheques = cheques.filter((cheque) => cheque.receivedDate >= fromDate && cheque.dueDate <= toDate);
            showChequesReport(inPeriodCheques);
        }
            break;
        case "Awaiting": {
            const awaitingCheques = cheques.filter((cheque) => cheque.status === "Awaiting");
            const inPeriodCheques = awaitingCheques.filter((cheque) => cheque.receivedDate >= fromDate && cheque.dueDate <= toDate);
            showChequesReport(inPeriodCheques);
            break;
        }
        case "Deposited": {
            const depositedCheques = cheques.filter((cheque) => cheque.status === "Deposited");
            const inPeriodCheques = depositedCheques.filter((cheque) => cheque.receivedDate >= fromDate && cheque.dueDate <= toDate);
            showChequesReport(inPeriodCheques);
            break;
        }
        case "Cashed": {
            const cashedCheques = cheques.filter((cheque) => cheque.status === "Cashed");
            const inPeriodCheques = cashedCheques.filter((cheque) => cheque.receivedDate >= fromDate && cheque.dueDate <= toDate);
            showChequesReport(inPeriodCheques);
            break;
        }
        case "Returned": {
            const returnedCheques = cheques.filter((cheque) => cheque.status === "Returned");
            const inPeriodCheques = returnedCheques.filter((cheque) => cheque.receivedDate >= fromDate && cheque.dueDate <= toDate);
            showChequesReport(inPeriodCheques);
            break;
        }
    }
}

async function showCounter() {
    const cheques = await repo.getCheques();
    const chequesCount = cheques.length;
    let sum = 0;
    for (const cheque of cheques) {
        sum += cheque.amount;
    }
    header.innerHTML = `
    <h1 class="header-title">Cheques</h1>
    <div class="count-card">
        <div class="icon-bg">
            <img src="img/wallet.svg" alt="" />
        </div>
        <p class="counter">
            ${chequesCount} <span class="counter-desc">Total Cheques </span>
        </p>
        <div class="icon-bg">
            <img src="img/money-bill-1-wave.svg" alt="" />
        </div>
        <p class="counter">
            $ ${sum}  <span class="counter-desc">Sum Cheques</span>
        </p>
    </div>
    `;
}
