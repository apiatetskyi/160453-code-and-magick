'use strict';

var WIZARD_PARAMS = {
  firstName: [
    'Иван', 'Хуан Себастьян', 'Мария', 'Кристоф',
    'Виктор', 'Юлия', 'Люпита', 'Вашингтон'
  ],

  secondName: [
    'да Марья', 'Верон', 'Мирабелла', 'Вальц',
    'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'
  ],

  coatColor: [
    'rgb(101, 137, 164)', 'rgb(241, 43, 107)',
    'rgb(146, 100, 161)', 'rgb(56, 159, 117)',
    'rgb(215, 210, 55)', 'rgb(0, 0, 0)'
  ],

  eyesColor: ['black', 'red', 'blue', 'yellow', 'green']
};

var WIZARD_NUMBER = 4;

var setup = document.querySelector('.setup');
var temaplate = document.querySelector('#similar-wizard-template').content;
var similarContainer = setup.querySelector('.setup-similar');
var similarList = setup.querySelector('.setup-similar-list');

/**
 * Возвращает случайный элемент массива
 * @param  {Array} array
 * @return {string}
 */
var getRandomArrayElement = function (array) {
  return array[Math.floor(Math.random() * (array.length))];
};

/**
 * @typedef {Object} WizardSetup
 * @property {string} name Имя мага
 * @property {string} coatColor Цвет мантии мага
 * @property {string} eyesColor Цвет глаз мага
 */

/**
 * Генерирует объект с случайными параметрами мага
 * @param  {Object} wizardParams
 * @return {WizardSetup}
 */
var generateWizardSetup = function (wizardParams) {
  var wizardSetup = {
    name: getRandomArrayElement(wizardParams.firstName) + ' '
        + getRandomArrayElement(wizardParams.secondName),
    coatColor: getRandomArrayElement(wizardParams.coatColor),
    eyesColor: getRandomArrayElement(wizardParams.eyesColor)
  };

  return wizardSetup;
};

/**
 * Создает мага на основе шаблона
 * @param  {WizardSetup} wizardSetup
 * @return {Node}
 */
var createWizard = function (wizardSetup) {
  var wizardTemplate = temaplate.querySelector('.setup-similar-item').cloneNode(true);

  wizardTemplate.querySelector('.setup-similar-label').textContent = wizardSetup.name;
  wizardTemplate.querySelector('.wizard-coat').style.fill = wizardSetup.coatColor;
  wizardTemplate.querySelector('.wizard-eyes').style.fill = wizardSetup.eyesColor;

  return wizardTemplate;
};

/**
 * Генерирует массив объектов с параметрами магов
 * @param  {number} wizardNumber
 * @return {Array}
 */
var generateWizardsArray = function (wizardNumber) {
  var result = [];

  for (var i = 0; i < wizardNumber; i++) {
    result.push(generateWizardSetup(WIZARD_PARAMS));
  }

  return result;
};

/**
 * Рендерит магов в указном контейнере
 * @param  {Array} wizardArray Массив с настройками магов
 * @param  {Node} parentNode
 */
var renderSimilarWizards = function (wizardArray, parentNode) {
  var fragment = document.createDocumentFragment();

  wizardArray.forEach(function (wizard) {
    fragment.appendChild(createWizard(wizard));
  });

  parentNode.appendChild(fragment);
};

setup.classList.remove('hidden');
similarContainer.classList.remove('hidden');
renderSimilarWizards(generateWizardsArray(WIZARD_NUMBER), similarList);
