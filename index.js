let a = '';
let b = '';
let sign = '';
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', '*', '/', '%'];

//экран
const out = document.querySelector('.result');

//функция очистки экрана
function clearAll () {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = 0;
}
document.querySelector('.ac').onclick = clearAll;

// Функция для удаления последней цифры  ?
function removeLastDigit() {
    if (b) {
        b = b.slice(0, -1);
        out.textContent = a + ' ' + sign + ' ' + b;
    } else if (sign) {
        sign = '';
    } else {
        a = a.slice(0, -1);
    }
    out.textContent = a + ' ' + sign + ' ' + b;
}
document.querySelector('.ce').onclick = removeLastDigit;

document.querySelector('.buttons').onclick = (e) => {
    //нажата не кнопка
    if(!e.target.classList.contains('button')) return;
    //нажата кнопка clearAll 'ac'
    if(e.target.classList.contains('ac')) return;

    out.textContent = '';
    //получаем нажатую кнопку
    const key = e.target.textContent;

    // Проверка на ввод знака минус в начале
    if (key === '-' && a === '' && sign === '' && b === '') {
        a = '-';
        out.textContent = a;
        return;
    }

    //если нажата кнопка 0-9 или .
    if (digit.includes(key)) {

        // Проверка на два нуля в начале
        if (key === '0' && (a === '' || a === '0') && sign === '') {
        out.textContent = '0';
        return; // игнорируем ввод
        }

        // Проверка на более одного десятичного разделителя
        if (key === '.') {
            // Если ни a, ни b не заданы, установим 0.
            if (sign === '' && a === '' && b === '') {
                a = '0.';
                out.textContent = a;
                return;
            }
            if (sign === '' && a.includes('.') || b.includes('.')) {
                return; // игнорируем ввод
            }

            // Если a уже содержит значение, и оно равно 0, просто добавляем .
            if (sign === '' && a === '0') {
                a += '.';
                out.textContent = a;
                return;
            }
            // Если b ещё не задано, и знак задан, добавляем '0.' перед '.'
            if (sign !== '' && b === '') {
                b = '0.';
                out.textContent = a + ' ' + sign + ' ' + b;
                return;
            }

            // Если b уже содержит значение, и оно равно 0, просто добавляем .
            if (sign !== '' && b === '0') {
                b += '.';
                out.textContent = a + ' ' + sign + ' ' + b;
                return;
            }
        }

        if (b === '' && sign === '') {
        a += key;
        out.textContent = a;
        }
        else if (a!== '' && b!== '' && finish) {
            b = key;
            finish = false;
        }
        else {
            b+= key;
        }
        console.log(a, b, sign);
        out.textContent =  a + sign + b;
        return;
    }

    //если нажата кнопка + - / *
    if (action.includes(key)) {
        sign = key;
        out.textContent = a + ' ' + sign + ' ';
        return;
    }

    //если нажата кнопка =
    if(key === '=') {
        if (b === '') b = a;
        switch (sign) {
            case '+':
                a = (+a) + (+b);
                break;
            case '-':
                a = a - b;
                break;
            case '*':
                a = a * b;
                break;
            case '/':
                if (b === '0') {
                    out.textContent = 'Error!';
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }
                a = a / b;
                break;
            case '%':
                a = (+a) / 100;
                break;
        }
        finish = true;
        out.textContent = a;
    }
}
