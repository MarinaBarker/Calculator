let a = '';
let b = '';
let sign = '';
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', '*', '/', '%'];

//экран
const result = document.querySelector('.result');

//функция очистки экрана
function clearAll () {
    a = '';
    b = '';
    sign = '';
    finish = false;
    result.textContent = 0;
    result.style.fontSize = '40px';
}
document.querySelector('.ac').onclick = clearAll;


// Функция для удаления последней цифры
function removeLastDigit() {
    if (finish) {
        // Если операция завершена, сбрасываем все значения
        clearAll(); // Сброс состояния завершения
    } else if (b !== '' && sign !== '') {
        // Если есть "b" и знак, удаляем последнюю цифру из "b"
        b = b.slice(0, -1);
    } else if (sign !== '') {
        // Если есть только "a" и знак, удаляем знак и последнюю цифру из "a"
        sign = ''; // Удаляем знак
    } else if (a !== '') {
        // Если есть только "a", удаляем последнюю цифру из "a"
        a = a.slice(0, -1);
    } 
    // Обновляем отображение результата
    result.textContent = a + ' ' + sign + ' ' + b;
}
document.querySelector('.ce').onclick = removeLastDigit;

function updateResult() {
    result.textContent = a + ' ' + sign + ' ' + b;
    adjustFontSize();
}

//Функция для обновления результата вывода
function adjustFontSize() {
    const containerWidth = 310;
    const textWidth = result.scrollWidth;

    if (textWidth > containerWidth) {
        const fontSize = Math.max(12, Math.floor(containerWidth / textWidth * parseInt(window.getComputedStyle(result).fontSize))); // Минимальный размер шрифта 12px
        result.style.fontSize = fontSize + 'px';
    } else {
        result.style.fontSize = '40px'; // Восстановить исходный размер шрифта
    }
}


document.querySelector('.buttons').onclick = (e) => {
    //нажата не кнопка
    if(!e.target.classList.contains('button')) return;
    //нажата кнопка clearAll 'ac'
    if(e.target.classList.contains('ac')) return;
    updateResult();

    if(e.target.classList.contains('ce'));
    updateResult();
    
    //получаем нажатую кнопку
    const key = e.target.textContent;

    // Проверка на ввод знака минус в начале
    if (key === '-' && a === '' && sign === '' && b === '') {
        a = '-';
        result.textContent = a;
        return;
    }

    //если нажата кнопка 0-9 или .
    if (digit.includes(key)) {

        // Ограничение длины ввода до 20 символов
        if ((a + b).length >= 20) return;

        // Проверка на два нуля в начале
        if (key === '0' && (a === '' || a === '0') && sign === '') {
        result.textContent = '0';
        return; // игнорируем ввод
        }

        // Проверка на более одного десятичного разделителя
        if (key === '.') {
            // Если ни a, ни b не заданы, установим 0.
            if (sign === '' && a === '' && b === '') {
                a = '0.';
                result.textContent = a;
                return;
            }
            if (sign === '' && a.includes('.') || b.includes('.')) {
                result.textContent = a;
                return; // игнорируем ввод
            }

            // Если a уже содержит значение, и оно равно 0, просто добавляем .
            if (sign === '' && a === '0') {
                a += '.';
                result.textContent = a;
                return;
            }
            // Если b ещё не задано, и знак задан, добавляем '0.' перед '.'
            if (sign !== '' && b === '') {
                b = '0.';
                result.textContent = a + ' ' + sign + ' ' + b;
                return;
            }

            // Если b уже содержит значение, и оно равно 0, просто добавляем .
            if (sign !== '' && b === '0') {
                b += '.';
                result.textContent = a + ' ' + sign + ' ' + b;
                return;
            }
        }

        if (b === '' && sign === '') {
        a += key;
        result.textContent = a;
        }
        else if (a!== '' && b!== '' && finish) {
            b = key;
            finish = false;
        }
        else {
            b+= key;
        }
        updateResult();
        return;
    }

    //если нажата кнопка + - / *
    if (action.includes(key)) {
        sign = key;
        updateResult();
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
                    result.textContent = 'Error!';
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
        result.textContent = a;
        adjustFontSize();
    }
}
