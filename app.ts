class Calc {
    private xNumber:number = 0;
    private yNumber:number = 0;
    private thisOperation: string = "";
    private botNumberDisplay: string = "0";
    private topNumberDisplay: string = "";
    private botCalcNumber: Element | null = document.querySelector('.number');
    private topCalcNumber: Element | null = document.querySelector('.topNumber');
    private readonly symbolPlus: string = "+";
    private readonly symbolMinus: string = "-";
    private readonly symbolDivision: string = "÷"
    private readonly symbolMultiplication: string = "*";
    private readonly symbolEquals: string = "=";
    private readonly symbolComma: string = ".";
    private readonly removeAll: string = "CE";
    private readonly removeBot: string = "C";
    private readonly removeSymbol: string = "backspace";
    private readonly symbolSqrt: string = "√";
    private readonly symbolSqr: string = "x²";
    private readonly symbolOneDivision: string = "1/x";
    private readonly symbolPercent: string = "%";
    private readonly symbolPlusMinus: string = "±";
    
    public getButtons(): NodeListOf<HTMLButtonElement> {
        return document.querySelectorAll('button');
    }
    
    public addDigit(a:number): void {
        if(this.botNumberDisplay === "") {
            this.botNumberDisplay = String(a);
        }
        else {
            if(this.botNumberDisplay.length < 16) {
                this.botNumberDisplay += String(a);
            }
        }
        if(!(this.botNumberDisplay.indexOf(this.symbolComma) > -1)) {
            let replacer: number = Number(this.botNumberDisplay);
            this.botNumberDisplay = String(replacer);
        }
    }

    public updateState(): void {
        if(this.botCalcNumber !== null) {
            this.botCalcNumber.textContent = this.botNumberDisplay;
        }
        if(this.topCalcNumber !== null) {
            this.topCalcNumber.textContent = this.topNumberDisplay;
        }
    }

    public setEvents(): void {
        let buttons = this.getButtons();
        buttons.forEach((item: HTMLButtonElement) => {
            this.setEventForNumberButtons(item);
            this.setEventForOperations(this.symbolPlus, item);
            this.setEventForOperations(this.symbolMinus, item);
            this.setEventForOperations(this.symbolMultiplication, item);
            this.setEventForOperations(this.symbolDivision, item);
            this.setEventForEquals(item);
            this.setEventForComma(item);
            this.setEventForRemoveAll(item);
            this.setEventForRemoveBot(item);
            this.setEventForRemoveSymbol(item);
            this.setEventForSqrt(item);
            this.setEventForSqr(item);
            this.setEventForOneDivision(item);
            this.setEventForPercent(item);
            this.setEventForPlusMinus(item);
        })
    }
    public setEventForOperations(operation: string, item: HTMLButtonElement): void {
        if(item.textContent === operation) {
            item.addEventListener('click', () => {
                if(this.botNumberDisplay.length > 0) {
                    if(this.botNumberDisplay[this.botNumberDisplay.length - 1] === this.symbolComma){
                        this.botNumberDisplay = this.botNumberDisplay.slice(0, this.botNumberDisplay.length - 1);
                    }
                    this.xNumber = Number(this.botNumberDisplay);
                    this.topNumberDisplay = `${this.botNumberDisplay} ${operation}`;
                    this.botNumberDisplay = '0';
                } else {
                    this.topNumberDisplay = this.topNumberDisplay.slice(0, this.topNumberDisplay.length - 1) + operation;
                }
                this.thisOperation = operation;
                this.updateState();
            }) // Ошибка при смене знака, число пропадает
        }
    }
    public setEventForNumberButtons(item: HTMLButtonElement): void {
        if(item.classList.contains('white')){
            item.addEventListener('click', () => {
                this.addDigit(Number(item.textContent));
                this.updateState();
            })
        }
    }
    public setEventForEquals(item: HTMLButtonElement): void {
        if(item.textContent === this.symbolEquals) {
            item.addEventListener('click', () => {
                if(this.topCalcNumber?.textContent !== ''){
                    this.yNumber = Number(this.botNumberDisplay);
                    switch(this.thisOperation) {
                        case "+":
                            this.botNumberDisplay = String(this.xNumber + this.yNumber);
                            break;
                        case "-":
                            this.botNumberDisplay = String(this.xNumber - this.yNumber);
                            break;
                        case "*":
                            this.botNumberDisplay = String(this.xNumber * this.yNumber);
                            break;
                        case "÷":
                            if(this.yNumber !== 0) {
                                this.botNumberDisplay = String(this.xNumber / this.yNumber);
                            } else {
                                alert("На 0 делить нельзя");
                            }
                            break;
                    }
                }

                this.topNumberDisplay = '';
                this.updateState();
            })
        }
    }
    public setEventForComma(item: HTMLButtonElement): void {
        if(item.textContent === this.symbolComma) {
            item.addEventListener('click', () => {
                if(!(this.botNumberDisplay.indexOf(this.symbolComma) > -1)){
                    this.botNumberDisplay += this.symbolComma;
                    this.updateState();
                }
            })
        }
    }
    public setEventForRemoveAll(item: HTMLButtonElement): void {
        if(item.textContent === this.removeAll) {
            item.addEventListener('click', () => {
                this.topNumberDisplay = '';
                this.botNumberDisplay = '0';
                this.updateState();
            })
        }
    }
    public setEventForRemoveBot(item: HTMLButtonElement): void {
        if(item.textContent === this.removeBot) {
            item.addEventListener('click', () => {
                this.botNumberDisplay = '0';
                this.updateState();
            })
        }
    }
    public setEventForRemoveSymbol(item: HTMLButtonElement): void {
        if(item.classList.contains(this.removeSymbol)) {
            item.addEventListener('click', () => {
                if(this.botNumberDisplay.length > 1) {
                    this.botNumberDisplay = this.botNumberDisplay.slice(0, this.botNumberDisplay.length - 1);
                    if(this.botNumberDisplay.length === 1 && this.botNumberDisplay.indexOf('-') > -1) {
                        this.botNumberDisplay = "0";
                    }
                } 
                else {
                    this.botNumberDisplay = "0";
                }
                this.updateState();
            })
        }
    }
    public setEventForSqrt(item: HTMLButtonElement): void {
        if(item.textContent === this.symbolSqrt) {
            item.addEventListener('click', () => {
                if(Number(this.botNumberDisplay) >= 0) {
                    this.botNumberDisplay = String(Math.sqrt(Number(this.botNumberDisplay)));
                    this.updateState();
                } else {
                    alert("Невозможно найти подкореное выражение отрицательного числа")
                }
            })
        }
    }
    public setEventForSqr(item: HTMLButtonElement): void {
        if(item.textContent === this.symbolSqr) {
            item.addEventListener('click', () => {
                this.botNumberDisplay = String(Math.pow(Number(this.botNumberDisplay), 2));
                this.updateState();
            })
        }
    }
    public setEventForOneDivision(item: HTMLButtonElement): void {
        if(item.textContent === this.symbolOneDivision) {
            item.addEventListener('click', () => {
                if(Number(this.botNumberDisplay) !== 0) {
                    this.botNumberDisplay = String(1 / Number(this.botNumberDisplay));
                    this.updateState();
                } else {
                    alert('На 0 делить нельзя')
                }
                
            })
        }
    }
    public setEventForPercent(item: HTMLButtonElement): void {
        if(item.textContent === this.symbolPercent) {
            item.addEventListener('click', () => {
                if(this.topNumberDisplay.length > 0) {
                    this.botNumberDisplay = String(this.xNumber / 100 * Number(this.botNumberDisplay))
                } else {
                    this.botNumberDisplay = String(Number(this.botNumberDisplay) / 100);
                }
                this.updateState();
            })
        }
    }
    public setEventForPlusMinus(item: HTMLButtonElement): void {
        if(item.textContent === this.symbolPlusMinus) {
            item.addEventListener('click', () => {
                if(!(this.botNumberDisplay.indexOf('-') > -1)) {
                    this.botNumberDisplay = '-' + this.botNumberDisplay;
                } else {
                    this.botNumberDisplay = this.botNumberDisplay.replace('-', '');
                }
                this.updateState();
            })
        }
    }
}

let app = new Calc;
app.setEvents();
