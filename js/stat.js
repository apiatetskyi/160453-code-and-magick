'use strict';

/**
 * Параметры облака статистики
 * @readonly
 * @enum {number} CloudProps
 */
var CloudProps = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10,
  GAP: 10,
  FONT_GAP: 20
};

/**
 * Стилизация облака
 * @readonly
 * @enum {string} CloudStyles
 */
var CloudStyles = {
  BG_COLOR: 'rgba(255, 255, 255, 1)',
  SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)',
  CURRENT_PLAYER: 'rgba(255, 0, 0, 1)'
};

/**
 * Параметры шрифта
 * @readonly
 * @enum {string} FontStyles
 */
var FontStyles = {
  SIZE: '16',
  FAMILY: 'PT Mono',
  COLOR: 'rgba(0, 0, 0, 1)'
};

/**
 * Параметры колонок
 * @readonly
 * @enum {number} ColumnProps
 */
var ColumnProps = {
  WIDTH: 40,
  HEIGHT: 150,
  GAP: 50,
  COUNT: 4
};

/**
 * Рендерит статистку проеденного уровня
 * @param  {Object} ctx
 * @param  {Array} names Имена игроков
 * @param  {Array} times Результаты игроков
 */
window.renderStatistics = function (ctx, names, times) {
  /**
   * Рендерит облако в указных координатах
   * @param  {number} x
   * @param  {number} y
   * @param  {string} color Цвет заливки
   */
  var renderCloud = function (x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CloudProps.WIDTH, CloudProps.HEIGHT);
  };

  /**
   * Рендерит строку текста
   * @param  {string} text
   * @param  {number} coordinateY
   * @param  {string} align       Выравнивание текста
   */
  var renderText = function (text, coordinateY, align) {
    var textWidth = ctx.measureText(text).width;
    var aligment = {
      left: CloudProps.X + CloudProps.GAP,
      center: CloudProps.X + (CloudProps.WIDTH - textWidth) / 2,
      right: CloudProps.X + CloudProps.WIDTH - CloudProps.GAP - textWidth,
      default: CloudProps.X + CloudProps.GAP
    };
    var coordinateX = aligment[align] || aligment['default'];
    coordinateY = coordinateY + CloudProps.Y;

    ctx.fillText(text, coordinateX, coordinateY);
  };

  /**
   * Возвращает случайное число с точностью precision в диапазоне от start до end
   * @param  {number} precision
   * @param  {number} start
   * @param  {number} end
   * @return {number}
   */
  var getRandom = function (precision, start, end) {
    start = (start) ? start : 0;
    end = (end) ? end : 1;
    return +(Math.random() * (end - start) + start).toFixed(precision);
  };

  /**
   * Возвращает синий цвет с случайной прозрачностью
   * @return {string}
   */
  var getRandomBlue = function () {
    return 'rgba(0, 0, 255,' + getRandom(1, 0.2) + ')';
  };

  /**
   * Рендерит колонку
   * @param  {number} columnIndex
   * @param  {string} name Имя игрока
   * @param  {number} time Результат игрока
   */
  var drawColumn = function (columnIndex, name, time) {
    var columnHeight = (ColumnProps.HEIGHT * time) / maxTime;
    var columnY = CloudProps.HEIGHT + CloudProps.Y - CloudProps.GAP - CloudProps.FONT_GAP - columnHeight;
    var columnX = startXCoordinate + (ColumnProps.WIDTH + ColumnProps.GAP) * columnIndex;

    ctx.fillStyle = (name === 'Вы') ? CloudStyles.CURRENT_PLAYER : getRandomBlue();

    ctx.fillRect(columnX, columnY, ColumnProps.WIDTH, columnHeight);
    ctx.fillStyle = FontStyles.COLOR;
    ctx.fillText(name, columnX, columnY + columnHeight + CloudProps.FONT_GAP);
    ctx.fillText(Math.round(time), columnX, columnY - CloudProps.GAP);
  };

  var maxTime = Math.max.apply(null, times);
  var startXCoordinate = CloudProps.X + (CloudProps.WIDTH - ColumnProps.WIDTH * ColumnProps.COUNT - ColumnProps.GAP * (ColumnProps.COUNT - 1)) / 2;

  renderCloud(CloudProps.X + CloudProps.GAP, CloudProps.Y + CloudProps.GAP, CloudStyles.SHADOW_COLOR);
  renderCloud(CloudProps.X, CloudProps.Y, CloudStyles.BG_COLOR);

  ctx.fillStyle = FontStyles.COLOR;
  ctx.font = FontStyles.SIZE + ' ' + FontStyles.FAMILY;

  renderText('Ура вы победили!', CloudProps.Y + CloudProps.GAP, 'center');
  renderText('Список результатов:', CloudProps.Y + CloudProps.GAP + CloudProps.FONT_GAP, 'center');

  for (var i = 0; i < names.length; i++) {
    drawColumn(i, names[i], times[i]);
  }
};
