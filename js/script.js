// expense list insertio  here 
window.addEventListener('load', function () {
    let stocks = JSON.parse(localStorage.getItem('stocks') || '[]');
    const stockList = document.getElementById('stockList').getElementsByTagName('tbody')[0];

    stocks.forEach((stock, index) => {
        const newRow = stockList.insertRow();
        const cellIndex = newRow.insertCell(0);
        const cellName = newRow.insertCell(1);
        const cellPrice = newRow.insertCell(2);
        const cellCategory = newRow.insertCell(3);
        const cellDate = newRow.insertCell(4);
        const cellDelete = newRow.insertCell(5); // New cell for delete button

        cellIndex.textContent = index + 1;
        cellName.textContent = stock.name;
        cellPrice.textContent = stock.price;
        cellCategory.textContent = stock.category;
        cellDate.textContent = stock.date;

        // Create a delete button with the trash icon
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.addEventListener('click', function () {
            deleteRow(index);
        });
        cellDelete.appendChild(deleteButton);
    });
});

function deleteRow(index) {
    let stocks = JSON.parse(localStorage.getItem('stocks') || '[]');
    stocks.splice(index, 1);
    localStorage.setItem('stocks', JSON.stringify(stocks));
    location.reload(); // Reload the page to reflect the changes
}

document.getElementById('expenseForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const stockName = document.getElementById('expenseName').value;
    const stockPrice = parseFloat(document.getElementById('expenseAmount').value);
    const stockCategory = document.getElementById('expenseCategory').value;
    const stockDate = document.getElementById('expenseDate').value;

    const newStock = {
        name: stockName,
        price: stockPrice,
        category: stockCategory,
        date: stockDate
    };

    let stocks = JSON.parse(localStorage.getItem('stocks') || '[]');
    stocks.push(newStock);
    localStorage.setItem('stocks', JSON.stringify(stocks));

    location.reload(); // Reload the page to reflect the changes
    this.reset();
});

