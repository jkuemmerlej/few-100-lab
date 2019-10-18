let percentageInputs: NodeListOf<HTMLInputElement>;
let percentSpan: HTMLSpanElement;

let billAmt: HTMLSpanElement;
let percentAmt: HTMLSpanElement;
let tipAmt: HTMLSpanElement;
let totalAmt: HTMLSpanElement;

let percent: string;
let amount: number;

export function runApp() {
    percentageInputs = document.getElementsByName('percentageOptions') as NodeListOf<HTMLInputElement>;
    percentSpan = document.getElementById('percentToTipSpan') as HTMLSpanElement;
    const amountInput = document.getElementById('AmountInput') as HTMLInputElement;

    billAmt = document.getElementById('billAmt') as HTMLSpanElement;
    percentAmt = document.getElementById('percentAmt') as HTMLSpanElement;
    tipAmt = document.getElementById('tipAmt') as HTMLSpanElement;
    totalAmt = document.getElementById('totalAmt') as HTMLSpanElement;

    percentageInputs.forEach(inpt => {
        if (inpt.checked) {
            inpt.disabled = true;
            percent = inpt.value;
            percentSpan.innerText = percent;
        }
        inpt.addEventListener('click', handlePercentChange);
    });

    amountInput.addEventListener('input', handleAmountInput);
    amount = -1;
}

function handlePercentChange() {
    const clickedPercentage = this as HTMLInputElement;

    percentageInputs.forEach(inpt => {
        if (inpt !== clickedPercentage) {
            inpt.disabled = false;

            const parent = inpt.parentNode as HTMLLabelElement;
            parent.classList.remove('active');
        } else {
            clickedPercentage.disabled = true;
            percent = inpt.value;
            const parentclicked = clickedPercentage.parentNode as HTMLLabelElement;
            parentclicked.classList.add('active');
        }
    });

    percentSpan.innerText = percent;
    populateValues();
}

function handleAmountInput() {
    const input = this as HTMLInputElement;
    amount = parseInt(input.value, null);

    if (amount < 0) {
        input.classList.add('negativeAmount');
    } else {
        input.classList.remove('negativeAmount');
    }

    populateValues();
}

function populateValues() {
    if (amount >= 0) {
        billAmt.innerText = '$' + amount.toString();
        percentAmt.innerText = percent + '%';

        const decimalPercent = parseInt(percent, null) / 100;
        const tip = amount * decimalPercent;
        tipAmt.innerText = '$' + tip.toFixed(2).toString();

        totalAmt.innerText = '$' + (tip + amount).toFixed(2).toString();
    } else {
        clearValues();
    }
}

function clearValues() {
    billAmt.innerText = '';
    percentAmt.innerText = '';
    tipAmt.innerText = '';
    totalAmt.innerText = '';
}
