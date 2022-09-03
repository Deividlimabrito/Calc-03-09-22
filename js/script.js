const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
}

    // adicionar dígito à tela da calculadora
    addDigit(digit) {
        // verifique se a operação atual já tem um ponto
        if(digit === "." && this.currentOperationText.innerText.includes(". ")) {
            return;
        }
        this.currentOperation = digit;
        this.updateScreen();
    }

    // Processa todas as operações da calculadora
    processOperation(operation) {   
        // verifica se a operação atual esta vazio e se a operação é diferente de "C" = Limpar
        if(this.currentOperationText.innerText === "" && operation !== "C") {
             // Operação de mudança
            if(this.previousOperationText.innerText !== "") {
                this.changeOperation(operation)
                

            }
            return;
        }

        // Obter valor atual e anterior
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous)
                break;  
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "DEL":
                this.processDelOperator();
                break;  
            case "CE":
                this.processClearCurrentOperation();
                break;
            case "C":
                this.processClearAllOperation();
                break;
            case "=":
                this.processEqualOperator();
                break;
            default:
                return;
    
        }
    }

    // Alterar o valor da tela da calculadora
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
        ) {

        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // Verifique se o valor é zero, se for apenas adicione o valor atual
            if(previous === 0) {
                operationValue = current
            }

            // Adicionar valor atual ao anterior
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";
        }
    }

    // Alterar operação matemática
    changeOperation(operatio) {
        const mathOperations = ["*","/","+","-"]
        if(!mathOperations.includes(operatio)) {
            return
        }
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0,-1) + operatio;
    }

    // Excluir o último dígito
    processDelOperator() {

        this.currentOperationText.innerText = 
        this.currentOperationText.innerText.slice(0, -1); 
    }
    
    // Limpar operação atual 
    processClearCurrentOperation(){
        this.currentOperationText.innerText = "";

    }
    processClearAllOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    // Processar uma operação
    processEqualOperator() {
        const operation = previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation);
    }

}


const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;
        // validação para verificar se o value é numerico ou ".", se for eu imprimo o value, se não eu imprimo "op".
        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});
