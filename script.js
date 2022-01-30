const displayTotal = document.querySelector('.display-text');
const startBtn = document.querySelector('.start-btn');
const form = document.querySelector('.start-form');
const expenseBtn = document.querySelector('.expense-btn');
const formDisbled = document.querySelector('fieldset');
const expenseForm = document.querySelector('.expense-form');
const transactions = document.querySelector('.transactions');
let transactionName = '';
let total = 0;



// Purpose: Get inital desposit, removes inital input for better UI experience
// creates new expense element by calling addNewExpense.
form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('.error').style = 'display: none';
    total = parseFloat(form.total.value);
    form.style = 'display:none;';
    displayTotal.innerHTML = total;
    document.querySelector('#expense-section').style =  'opacity: 1';
    expenseForm.style = 'display: block';
    formDisbled.disabled = false;  
    addNewExpense('Initial Deposit', total, 'deposit', 'First Deposit Made');
});
// Purpose: store returned data from getformDateand, diplay calcuted total
// create new expense display
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const {expense, action, transactionName, description} = getFormData();
    displayTotal.innerHTML = calculateDeposite(action, expense);
    addNewExpense(transactionName,expense, action,description);
    expenseForm.reset();
});



//Purpose: Error handling function to alert user that inital amount 
//must be added to start. 
expenseForm.addEventListener('click', () => {
    let currentFormStyle = window.getComputedStyle(form).display;
    if(currentFormStyle === 'block'){
        document.querySelector('.error').innerHTML = "Enter an inital amout first.";
    } 
});



// Purpose: Calcutes the running balance. Based on the action (add or subtract) paction argument provided 
// calcutes result.
// paramaters: action = add or subtract, amount = user's expense amount 
const calculateDeposite = (action, amount) =>{

    if(action === 'withdrawl') {
    amount = -amount;
    console.log(amount);
    };
    total = total + amount
    return total.toFixed(2);
};

// Purpose: get and return all form date when user submit new expense
const getFormData = () => {
    expense = parseFloat(expenseForm.expense.value);
    action = expenseForm.action.value;
    transactionName = expenseForm.name.value;
    description = expenseForm.description.value;
    return {expense, action, transactionName, description}
};

// Purpose: All Element to reflect past expenses are created and appended to transaction div
// Parameters:Name of the expense, total amount of the expense, deposit or widthdrawl, Description of the transaction
// new html elements created, text of elements added, and appended to parent  

const addNewExpense = (expenseName, expenseAmount, expenseAction, expenseDescription) => {
    const transactionItem = document.createElement('div');  
    transactionItem.classList.add('expense-container'); 
    transactions.insertBefore(transactionItem, transactions.firstChild);
    
    const dateTitle = document.createElement('div'); 
    dateTitle.classList.add('date-title-section');
    transactionItem.appendChild(dateTitle);

    const actionDate =  document.createElement('p'); 
    actionDate.innerHTML = new Date().toLocaleString('UTC', {month: 'long', day: 'numeric', year: 'numeric'});
    dateTitle.appendChild(actionDate);

    const title = document.createElement('h1');
    title.innerHTML = expenseName;
    dateTitle.appendChild(title);
    
    const amountText = document.createElement('p');
    if(expenseAction === 'deposit') {  // used to distinguish be whether a deposite of withdrawl was made
        amountText.classList.add('green-deposit');
        amountText.innerHTML = "+ " + expenseAmount;
    }else{
        amountText.classList.add('red-withdraw');
        amountText.innerHTML = "- " + expenseAmount;
    };

    transactionItem.appendChild(amountText);

    const descriptionText = document.createElement('p');
    if(expenseDescription){
    descriptionText.innerHTML = `Memo: ${expenseDescription}`;
    transactionItem.appendChild(descriptionText);
    }
};