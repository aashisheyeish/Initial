document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');

    calculateBtn.addEventListener('click', calculateLoan);

    function calculateLoan() {
        const loanAmount = parseFloat(document.getElementById('loan-amount').value);
        const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100 / 12;
        const loanTerm = parseFloat(document.getElementById('loan-term').value) * 12;

        if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm)) {
            resultDiv.textContent = 'Please enter valid numbers for all fields.';
            return;
        }

        const x = Math.pow(1 + interestRate, loanTerm);
        const monthlyPayment = (loanAmount * x * interestRate) / (x - 1);

        const totalPayment = monthlyPayment * loanTerm;
        const totalInterest = totalPayment - loanAmount;

        resultDiv.innerHTML = `
            <p>Monthly Payment: $${monthlyPayment.toFixed(2)}</p>
            <p>Total Payment: $${totalPayment.toFixed(2)}</p>
            <p>Total Interest: $${totalInterest.toFixed(2)}</p>
        `;
    }

    // Add input validation and real-time calculation
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.value = input.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
            if (allInputsFilled()) {
                calculateLoan();
            }
        });
    });

    function allInputsFilled() {
        return Array.from(inputs).every(input => input.value !== '');
    }
});