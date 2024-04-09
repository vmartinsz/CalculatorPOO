$(document).ready(function(){
    class Calculadora {
        constructor() {
            this.displayVal = "";
        }

        adicionarNumero(num) {
            this.displayVal += num;
            this.atualizarDisplay();
        }

        adicionarOperador(operator) {
            const lastCharIsOperator = "+-*/".includes(this.displayVal.slice(-1));
            
            if(operator === "C" || operator === "CE") {
                this.displayVal = "";
            } 
            else if(operator === "=") {
                $.post('/validate', { value: this.displayVal }, function(response) {
                    alert(response.message);
                });
            }
            else if(operator === "+/-"){
                this.displayVal = parseFloat(this.displayVal) * -1;
            }
            else if(operator === "<-") {
                this.displayVal = this.displayVal.slice(0, -1);
            }
            else if(!lastCharIsOperator) {
                this.displayVal += operator;
            }

            this.atualizarDisplay();
        }

        atualizarDisplay() {
            $("#display").val(this.displayVal);
        }
    }

    
    const calculadora = new Calculadora();

    
    $(".number").on("click", function(){
        var num = $(this).text();
        calculadora.adicionarNumero(num);
    });

    
    $(".operator").on("click", function(){
        var operator = $(this).text();
        calculadora.adicionarOperador(operator);
    });
});
