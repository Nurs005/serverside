const multer = require('multer');

// Функция, которая настраивает multer для обработки данных формы без файлов
const upload = multer().none();

module.exports = upload;