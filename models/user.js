const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Обязательнрое поле'],
    minlength: [2, 'Минимум 2 символа'],
    maxlength: [30, 'Максимум 30 символов'],
  },
  about: {
    type: String,
    required: [true, 'Обязательнрое поле'],
    minlength: [2, 'Минимум 2 символа'],
    maxlength: [30, 'Максимум 30 символов'],
  },
  avatar: {
    type: String,
    required: [true, 'Обязательнрое поле'],
    validate: {
      validator(url) {
        const urlPattern = new RegExp(
          '^(https?:\\/\\/)?'
            + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'
            + '((\\d{1,3}\\.){3}\\d{1,3}))'
            + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'
            + '(\\?[;&a-z\\d%_.~+=-]*)?'
            + '(\\#[-a-z\\d_]*)?$',
          'i',
        );
        return urlPattern.test(url);
      },
      message: 'Введите правильный адрес ссылки',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
