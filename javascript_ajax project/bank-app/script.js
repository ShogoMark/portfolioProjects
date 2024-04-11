
'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);


/////////////////////////////////////////////////
// Functions
function createUsers(accs) {
    accs.forEach(accs => {
        accs.username = accs.owner
        .toLowerCase()
        .split(' ')
        .map(name => name[0])
        .join('')})
}

createUsers(accounts);

function displayMovements(movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
           <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__value">${mov}$</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html)
  });
};

function displayBalance(movements) {
  const movs = movements.reduce((value, acc) => acc + value, 0)
  labelBalance.textContent = `${movs}$`;  
}

function incomeSummary(acc) {
  const income = acc.movements.filter(move => move > 0)
  .reduce((value, acc) => acc + value, 0)
  labelSumIn.textContent = `${income}$`

  const out = acc.movements.filter(out => out < 0)
  .reduce((value, acc) => acc + value, 0)
  labelSumOut.textContent = `${out}$`

  const interest = Math.trunc(acc.movements
  .filter(move => move > 0)
  .map(dep => (dep * acc.interestRate) / 100)
  .reduce((value, acc) => acc + value, 0))
  labelSumInterest.textContent = `${interest}$`
}

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  displayBalance(acc.movements)
  incomeSummary(acc)
}

// Event Handlers

let currentAccount;

btnLogin.addEventListener('click', function(e) {
    e.preventDefault();

    currentAccount = accounts.find(acc => inputLoginUsername.value == acc.username)

    if(currentAccount?.pin === Number(inputLoginPin.value)) {
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`

        containerApp.style.opacity = 100;

        // clear the input values
        inputLoginPin.value = ''
        inputLoginUsername.value = ''

        updateUI(currentAccount)
    }
})

btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  
  const amount = Number(inputTransferAmount.value);
  const balance = currentAccount.movements.reduce((value, acc) => acc + value, 0)
  const receiver = accounts.find(acc => acc.username === inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = '';

  if(receiver?.username !== currentAccount.username && amount > 0 && balance >= amount) {
    
    // initiate the transfer
    currentAccount.movements.push(-amount);
    receiver.movements.push(amount)

    updateUI(currentAccount)
  }
})


btnLoan.addEventListener('click', function(e) {
  e.preventDefault();

  const loanAmount = Number(inputLoanAmount.value);

  inputLoanAmount.value = '';
  
  const dep = currentAccount.movements.some(movs => movs > 10 * loanAmount / 100)
  if (dep) {
    currentAccount.movements.push(loanAmount)

    updateUI(currentAccount)
  }
})

