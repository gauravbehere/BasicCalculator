/**
 * Lib util for calculator
 * @author Gaurav Behere
 * @class Calculator
 */

function Calculator() {
    this.currentInput = "";
    this.result = "";
    this.resultArea = null;

    //Number set
    this.numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "."];

    //Operations set
    this.operations = ["C", "+", "-", "*", "/", "1/x", "&#8730;", "="];

    //calculating: Flag to determine if the expression is yet to be evaluated.
    var calculating = false;

    //decimalInput: Flag to determine if in the current entry a decimal is already entered.
    var decimalInput = false;

    //lastInputType: Tells what type of entry was the last input. Values: Operation/Number
    var lastInputType = null;

    var zeroEntered = false;
    /**
     * Handles clear event on the calculator instance and resets the flags
     *@method clear
     */
    this.clear = function () {
        this.currentInput = "";
        this.resultArea.innerHTML = "";
        decimalInput = false;
        calculating = false;
        lastInputType = null;
    };

    /**
     * Set the UI element in which the output is to be displayed in UI
     * @param resArea
     */
    this.setResultArea = function (resArea) {
        this.resultArea = resArea;
    };

    /**
     * Appends a numeric data entry to the current input string
     * Rejects the initial zero entry
     * If calculating flag is On, invokes clear and adds the number to display
     * Rejects multiples decimals in an entry
     * @method appendNumberToDisplay
     * @param num
     */
    this.appendNumberToDisplay = function (num) {
        if ((this.currentInput == "" || zeroEntered == true) && num == '0') {
            return;
        }
        if (zeroEntered == true && num != '0') {
            this.currentInput = this.currentInput.toString().substr(0, this.currentInput.length-1);
            zeroEntered = false;
        }
        if (lastInputType == "Operation" && num == '0') {
            zeroEntered = true;
        }
        if (calculating == false) {
            this.clear();
            if (num == 0) {
                return;
            }
            calculating = true;
        }
        if (num == '.' && decimalInput == true) {
            return;
        }
        else if (num == '.' && decimalInput == false) {
            decimalInput = true;
        }
        this.currentInput += num;
        this.resultArea.innerHTML = this.currentInput;
        lastInputType = "Number";
    };

    /**
     * Appends the passed operation to the display
     * Rejects consecutive operations (ensures operand around operation)
     * Directly handles square root and 1/x operations
     * @method appendOperationToDisplay
     * @param opr
     */
    this.appendOperationToDisplay = function (opr) {
        var currentValue = null;
        if (this.currentInput == "" && opr != '-') {
            return;
        }
        if (lastInputType == "Operation") {
            return;
        }
        if (opr == "&#8730;") {
            currentValue = eval(this.currentInput);
            if (currentValue <= 0) {
                return;
            }
            this.result = Math.sqrt(currentValue);
            this.resultArea.innerHTML = this.result;
            this.currentInput = this.result;
            calculating = false;
            return;
        }
        if (opr == "1/x") {
            currentValue = eval(this.currentInput);
            if (currentValue == 0) {
                return;
            }
            this.result = 1.0 / parseFloat(currentValue);
            this.resultArea.innerHTML = this.result;
            this.currentInput = this.result;
            calculating = false;
            return;
        }
        this.currentInput += opr;
        this.resultArea.innerHTML = this.currentInput;
        decimalInput = false;
        zeroEntered = false;
        calculating = true;
        lastInputType = "Operation";
    };

    /**
     * Returns the operations set to the UI to create buttons
     * @method getOperations
     * @returns {Array}
     */
    this.getOperations = function () {
        return this.operations;
    };

    /**
     * Returns the number set to the UI to create buttons
     * @method getNumbers
     * @returns {Array}
     */
    this.getNumbers = function () {
        return this.numbers;
    };

    /**
     * Evaluates the current input string and sets the result back to result area
     * @method evaluate
     */
    this.evaluate = function () {
        if (lastInputType == "Number") {
            this.result = eval(this.currentInput);
            this.resultArea.innerHTML = this.result;
            this.currentInput = this.result;
            calculating = false;
        }
    };
}


/**
 * String Helper
 * @param index
 * @param char
 * @returns {string}
 */

String.prototype.replaceAt = function (index, char) {
    var a = this.split("");
    a[index] = char;
    return a.join("");
}
