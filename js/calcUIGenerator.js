var createCalculatorUI = function (calcInstance, numbersContainer, operationsContainer) {
    var numbers= calcInstance.getNumbers();
    var operations = calcInstance.getOperations();
    numbers.forEach(function (num) {
        var number = document.createElement('div');
        number.innerHTML = num;
        number.className = 'number';
        if (num == "0") {
            number.style.width = '110px';
        }
        number.onclick = function () {
            calcInstance.appendNumberToDisplay(num);
        };
        numbersContainer.appendChild(number);
    });
    operations.forEach(function (op) {
        var operation = document.createElement('div');
        operation.innerHTML = op;
        operation.className = 'number';
        if (op == '=') {
            operation.onclick = function () {
                calcInstance.evaluate();
            };
        }
        else if (op == 'C') {
            operation.onclick = function () {
                calcInstance.clear();
            };
        }
        else {
            operation.onclick = function () {
                calcInstance.appendOperationToDisplay(op);
            };
        }
        operationsContainer.appendChild(operation);
    });
};
