const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: [2, 'Минимум 2 символа'],
      maxlength: [30, 'Максимум 30 символов'],
    },
    about: {
      type: String,
      default: 'Исследователь',
      minlength: [2, 'Минимум 2 символа'],
      maxlength: [30, 'Максимум 30 символов'],
    },
    avatar: {
      type: String,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
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
    email: {
      type: String,
      required: [true, 'Обязательное поле'],
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Введен некорректный email',
      },
    },
    password: {
      type: String,
      required: [true, 'Обязательное поле'],
      select: false,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
