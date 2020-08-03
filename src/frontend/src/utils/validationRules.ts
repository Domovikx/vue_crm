const validationRules = {
  validMustBeFilled: (v: string) => !!v || 'Это поле нужно заполнить',

  validOnlyLetters: (v: string) =>
    /^[a-zа-яё]+$/iu.test(v) ||
    !v ||
    'В поле должны быть только буквы и одно слово',

  validOnlyNumbers: (v: string) =>
    /^\d+(?:[\.,]\d+)?$/.test(v) ||
    !v ||
    'Это поле должно содержать только числа',
};

export default validationRules;
