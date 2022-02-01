const MORSE_TABLE = {
	'.-': 'a',
	'-...': 'b',
	'-.-.': 'c',
	'-..': 'd',
	'.': 'e',
	'..-.': 'f',
	'--.': 'g',
	'....': 'h',
	'..': 'i',
	'.---': 'j',
	'-.-': 'k',
	'.-..': 'l',
	'--': 'm',
	'-.': 'n',
	'---': 'o',
	'.--.': 'p',
	'--.-': 'q',
	'.-.': 'r',
	'...': 's',
	'-': 't',
	'..-': 'u',
	'...-': 'v',
	'.--': 'w',
	'-..-': 'x',
	'-.--': 'y',
	'--..': 'z',
	'.----': '1',
	'..---': '2',
	'...--': '3',
	'....-': '4',
	'.....': '5',
	'-....': '6',
	'--...': '7',
	'---..': '8',
	'----.': '9',
	'-----': '0',
};

function decode(expr) {
	let arr = expr.split('')
	let sup1 = []
	let sup2 = []

	// разбиваем массив на группы по 2 элемента (соединяем каждые два символа строки в одну из двух символов)
	for (let i = 0; i < expr.length / 2; i++) {
		sup1.push(arr.splice(0, 2).join(''))
	}

	// делим массив на группы по 5 элементов (соединяем каждые 5 строк по 2 элемента в каждой в отдельный массив)
	while (sup1.length > 0) {
		sup2.push(sup1.splice(0, 5))
	}
	let sup3 = []

	// убираем из массивов парные нули
	sup2.forEach(target => {
		sup3.push(target.filter(item => item !== '00'))
	})

	// заменяем '10' на '.'  '11' на '-'  '**' на 'пробел'
	sup3.forEach(item => {
		for (let i = 0; i < item.length; i++) {
			if (item[i] === '10') { item[i] = '.' }
			if (item[i] === '11') { item[i] = '-' }
			if (item[i] === '**') { item[i] = ' ' }
		}
	})

	sup3.forEach((item, index) => sup3[index] = item.join(''))

	// объединяем пробелы в один
	sup3.forEach((item, index) => {
		if (item.includes(' ')) { sup3[index] = ' ' }
	})

	// перебираем массив и сравнивем с MORSE_TABLE, если в MORSE_TABLE содержиться свойство с ключем совпадающим с элементом нашего массива, 
	// то заменяем этот элемент на значение соответствующего ключа MORSE_TABLE
	sup3.forEach((item, index) => {
		if (MORSE_TABLE[item]) { sup3[index] = MORSE_TABLE[item] }
	})

	return sup3.join('')
}

module.exports = {
	decode
}