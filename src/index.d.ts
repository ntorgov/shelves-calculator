declare let ThreeBSP: any;
/**
 * Интерфейс для массива ящиков
 * @name BoxObjectInterface
 * @type {Object}
 * @property {string} id Идентификатор
 * @property {string} title Название
 * @property {number} price Цена
 * @property {number} width Ширина
 * @property {number} height Высота
 * @property {number} deep Глубина
 * @property {number} sort Сортировка
 * @property {string} image Путь к картинке
 * @property {string} url Ссылка на страницу в магазине
 * @property {string} color Цвет
 * @property {string} series Серия ящика
 */
interface BoxObjectInterface {

	/**
	 * Идентификатор
	 * @type {string}
	 */
	id: string;

	/**
	 * Название
	 * @type {string}
	 */
	title: string;

	/**
	 * Цена
	 * @type {number}
	 */
	price: number;

	/**
	 * Ширина
	 * @type {number}
	 */
	width: number;

	/**
	 * Высота
	 * @type {number}
	 */
	height: number;

	/**
	 * Глубина
	 * @type {number}
	 */
	deep: number;

	/**
	 * Сортировка
	 * @type {number}
	 */
	sort: number;

	/**
	 * Путь к картинке
	 * @type {string}
	 */
	image: string;

	/**
	 * Ссылка на страницу в магазине
	 * @type {string}
	 */
	url: string;

	/**
	 * Цвет
	 * @type {string}
	 */
	color: BoxColor;

	/**
	 * Серия ящика
	 * @type {string}
	 */
	series: BoxSeries;
}

/**
 * Интерфейс для глубины
 * @name DeepObjectInterface
 * @type {Object}
 * @property {number} value Значение
 * @property {number} title Название
 * @property {number} price Цена
 */
interface DeepObjectInterface {

	/**
	 * Значение
	 * @type {number}
	 */
	value: number;

	/**
	 * Название
	 * @type {number}
	 */
	title: number;

	/**
	 * Цена
	 * @type {number}
	 */
	price: number;
}

/**
 * Интерфейс для массива ширин стеллажей
 * @name ShelveWidthInterface
 * @type {Object}
 * @property {number} value Значение
 * @property {number} title Название
 * @property {DeepObjectInterface[]} deeps Массив глубин
 */
interface ShelveWidthInterface {

	/**
	 * Значение
	 * @type {number}
	 */
	value: number;

	/**
	 * Название
	 * @type {number}
	 */
	title: number;

	/**
	 * Массив объектов
	 * @type {DeepObjectInterface}
	 */
	deeps: DeepObjectInterface[];
}

/**
 * Интерфейс количества полок.
 * Исключительно для проверки типов
 * @name ShelvesQuantityInterface
 * @type Object
 * @property {number} min Минимальное количество полок
 * @property {number} max Максимальное количество полок
 */
interface ShelvesQuantityInterface {

	/**
	 * Минимальное количество полок
	 * @type {number}
	 */
	min: number;

	/**
	 * Максимальное количество полок
	 * @type {number}
	 */
	max: number;
}

/**
 * Интерфейс для массива высот стеллажей
 * @name ShelveHeightInterface
 * @type {Object}
 * @property {number} value Значение
 * @property {number} title Значение
 * @property {boolean} selected Значение
 * @property {number} price Значение
 */
interface ShelveHeightInterface {

	/**
	 * Значение
	 * @type {number}
	 */
	value: number;

	/**
	 * Название
	 * @type {number}
	 */
	title: number;

	/**
	 * Индикатор выбора
	 * @type {boolean}
	 */
	selected: boolean;

	/**
	 * Цена
	 * @type {number}
	 */
	price: number;

	/**
	 * Количество полок
	 * @type {ShelvesQuantityInterface}
	 */
	shelves: ShelvesQuantityInterface;
}
