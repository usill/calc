var Calc = /** @class */ (function () {
    function Calc() {
        this.xNumber = 0;
        this.yNumber = 0;
        this.thisOperation = "";
        this.botNumberDisplay = "0";
        this.topNumberDisplay = "";
        this.botCalcNumber = document.querySelector('.number');
        this.topCalcNumber = document.querySelector('.topNumber');
        this.symbolPlus = "+";
        this.symbolMinus = "-";
        this.symbolDivision = "÷";
        this.symbolMultiplication = "*";
        this.symbolEquals = "=";
        this.symbolComma = ".";
        this.removeAll = "CE";
        this.removeBot = "C";
        this.removeSymbol = "backspace";
        this.symbolSqrt = "√";
        this.symbolSqr = "x²";
        this.symbolOneDivision = "1/x";
        this.symbolPercent = "%";
        this.symbolPlusMinus = "±";
    }
    Calc.prototype.getButtons = function () {
        return document.querySelectorAll('button');
    };
    Calc.prototype.addDigit = function (a) {
        if (this.botNumberDisplay === "") {
            this.botNumberDisplay = String(a);
        }
        else {
            if (this.botNumberDisplay.length < 16) {
                this.botNumberDisplay += String(a);
            }
        }
        if (!(this.botNumberDisplay.indexOf(this.symbolComma) > -1)) {
            var replacer = Number(this.botNumberDisplay);
            this.botNumberDisplay = String(replacer);
        }
    };
    Calc.prototype.updateState = function () {
        if (this.botCalcNumber !== null) {
            this.botCalcNumber.textContent = this.botNumberDisplay;
        }
        if (this.topCalcNumber !== null) {
            this.topCalcNumber.textContent = this.topNumberDisplay;
        }
    };
    Calc.prototype.setEvents = function () {
        var _this = this;
        var buttons = this.getButtons();
        buttons.forEach(function (item) {
            _this.setEventForNumberButtons(item);
            _this.setEventForOperations(_this.symbolPlus, item);
            _this.setEventForOperations(_this.symbolMinus, item);
            _this.setEventForOperations(_this.symbolMultiplication, item);
            _this.setEventForOperations(_this.symbolDivision, item);
            _this.setEventForEquals(item);
            _this.setEventForComma(item);
            _this.setEventForRemoveAll(item);
            _this.setEventForRemoveBot(item);
            _this.setEventForRemoveSymbol(item);
            _this.setEventForSqrt(item);
            _this.setEventForSqr(item);
            _this.setEventForOneDivision(item);
            _this.setEventForPercent(item);
            _this.setEventForPlusMinus(item);
        });
    };
    Calc.prototype.setEventForOperations = function (operation, item) {
        var _this = this;
        if (item.textContent === operation) {
            item.addEventListener('click', function () {
                if (_this.botNumberDisplay.length > 0) {
                    if (_this.botNumberDisplay[_this.botNumberDisplay.length - 1] === _this.symbolComma) {
                        _this.botNumberDisplay = _this.botNumberDisplay.slice(0, _this.botNumberDisplay.length - 1);
                    }
                    _this.xNumber = Number(_this.botNumberDisplay);
                    _this.topNumberDisplay = _this.botNumberDisplay + " " + operation;
                    _this.botNumberDisplay = '0';
                }
                else {
                    _this.topNumberDisplay = _this.topNumberDisplay.slice(0, _this.topNumberDisplay.length - 1) + operation;
                }
                _this.thisOperation = operation;
                _this.updateState();
            }); // Ошибка при смене знака, число пропадает
        }
    };
    Calc.prototype.setEventForNumberButtons = function (item) {
        var _this = this;
        if (item.classList.contains('white')) {
            item.addEventListener('click', function () {
                _this.addDigit(Number(item.textContent));
                _this.updateState();
            });
        }
    };
    Calc.prototype.setEventForEquals = function (item) {
        var _this = this;
        if (item.textContent === this.symbolEquals) {
            item.addEventListener('click', function () {
                var _a;
                if (((_a = _this.topCalcNumber) === null || _a === void 0 ? void 0 : _a.textContent) !== '') {
                    _this.yNumber = Number(_this.botNumberDisplay);
                    switch (_this.thisOperation) {
                        case "+":
                            _this.botNumberDisplay = String(_this.xNumber + _this.yNumber);
                            break;
                        case "-":
                            _this.botNumberDisplay = String(_this.xNumber - _this.yNumber);
                            break;
                        case "*":
                            _this.botNumberDisplay = String(_this.xNumber * _this.yNumber);
                            break;
                        case "÷":
                            if (_this.yNumber !== 0) {
                                _this.botNumberDisplay = String(_this.xNumber / _this.yNumber);
                            }
                            else {
                                alert("На 0 делить нельзя");
                            }
                            break;
                    }
                }
                _this.topNumberDisplay = '';
                _this.updateState();
            });
        }
    };
    Calc.prototype.setEventForComma = function (item) {
        var _this = this;
        if (item.textContent === this.symbolComma) {
            item.addEventListener('click', function () {
                if (!(_this.botNumberDisplay.indexOf(_this.symbolComma) > -1)) {
                    _this.botNumberDisplay += _this.symbolComma;
                    _this.updateState();
                }
            });
        }
    };
    Calc.prototype.setEventForRemoveAll = function (item) {
        var _this = this;
        if (item.textContent === this.removeAll) {
            item.addEventListener('click', function () {
                _this.topNumberDisplay = '';
                _this.botNumberDisplay = '0';
                _this.updateState();
            });
        }
    };
    Calc.prototype.setEventForRemoveBot = function (item) {
        var _this = this;
        if (item.textContent === this.removeBot) {
            item.addEventListener('click', function () {
                _this.botNumberDisplay = '0';
                _this.updateState();
            });
        }
    };
    Calc.prototype.setEventForRemoveSymbol = function (item) {
        var _this = this;
        if (item.classList.contains(this.removeSymbol)) {
            item.addEventListener('click', function () {
                if (_this.botNumberDisplay.length > 1) {
                    _this.botNumberDisplay = _this.botNumberDisplay.slice(0, _this.botNumberDisplay.length - 1);
                    if (_this.botNumberDisplay.length === 1 && _this.botNumberDisplay.indexOf('-') > -1) {
                        _this.botNumberDisplay = "0";
                    }
                }
                else {
                    _this.botNumberDisplay = "0";
                }
                _this.updateState();
            });
        }
    };
    Calc.prototype.setEventForSqrt = function (item) {
        var _this = this;
        if (item.textContent === this.symbolSqrt) {
            item.addEventListener('click', function () {
                if (Number(_this.botNumberDisplay) >= 0) {
                    _this.botNumberDisplay = String(Math.sqrt(Number(_this.botNumberDisplay)));
                    _this.updateState();
                }
                else {
                    alert("Невозможно найти подкореное выражение отрицательного числа");
                }
            });
        }
    };
    Calc.prototype.setEventForSqr = function (item) {
        var _this = this;
        if (item.textContent === this.symbolSqr) {
            item.addEventListener('click', function () {
                _this.botNumberDisplay = String(Math.pow(Number(_this.botNumberDisplay), 2));
                _this.updateState();
            });
        }
    };
    Calc.prototype.setEventForOneDivision = function (item) {
        var _this = this;
        if (item.textContent === this.symbolOneDivision) {
            item.addEventListener('click', function () {
                if (Number(_this.botNumberDisplay) !== 0) {
                    _this.botNumberDisplay = String(1 / Number(_this.botNumberDisplay));
                    _this.updateState();
                }
                else {
                    alert('На 0 делить нельзя');
                }
            });
        }
    };
    Calc.prototype.setEventForPercent = function (item) {
        var _this = this;
        if (item.textContent === this.symbolPercent) {
            item.addEventListener('click', function () {
                if (_this.topNumberDisplay.length > 0) {
                    _this.botNumberDisplay = String(_this.xNumber / 100 * Number(_this.botNumberDisplay));
                }
                else {
                    _this.botNumberDisplay = String(Number(_this.botNumberDisplay) / 100);
                }
                _this.updateState();
            });
        }
    };
    Calc.prototype.setEventForPlusMinus = function (item) {
        var _this = this;
        if (item.textContent === this.symbolPlusMinus) {
            item.addEventListener('click', function () {
                if (!(_this.botNumberDisplay.indexOf('-') > -1)) {
                    _this.botNumberDisplay = '-' + _this.botNumberDisplay;
                }
                else {
                    _this.botNumberDisplay = _this.botNumberDisplay.replace('-', '');
                }
                _this.updateState();
            });
        }
    };
    return Calc;
}());
var app = new Calc;
app.setEvents();
