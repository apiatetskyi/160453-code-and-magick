'use strict';

/**
 * Параметры облака статистики
 * @readonly
 * @enum {number}
 */
var CloudProps = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10,
  GAP: 10,
  FONT_GAP: 20
};

var CloudStyles = {
  BG_COLOR: 'rgba(255, 255, 255, 1)',
  SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)',
  CURRENT_PLAYER: 'rgba(255, 0, 0, 1)',
  FONT_SIZE: '16',
  FONT_FAMILY: 'PT Mono',
  FONT_COLOR: 'rgba(0, 0, 0, 1)'
};

/**
 * Параметры облака статистики
 * @readonly
 * @enum {number}
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
   * Рендерит строку с возможностью выравнивания
   * @param  {string} text
   * @param  {number} coordinateY Координата по оси Y с учетом CloudProps.Y
   * @param  {string} align
   */
  var renderText = function (text, coordinateY, align) {
    var textWidth = ctx.measureText(text).width;
    var coordinateX = null;
    if (!align || align === 'left') {
      coordinateX = CloudProps.X + CloudProps.GAP;
    } else if (align === 'center') {
      coordinateX = CloudProps.X + (CloudProps.WIDTH - textWidth) / 2;
    } else if (align === 'right') {
      coordinateX = CloudProps.X + CloudProps.WIDTH - CloudProps.GAP - textWidth;
    }
    coordinateY += CloudProps.Y;

    ctx.fillText(text, coordinateX, coordinateY);
  };

  /**
   * Находит максимальное значение в массиве
   * @param  {Array} arr
   * @return {number}
   */
  var getMaxValue = function (arr) {
    return Math.max.apply(null, arr);
  };

  /**
   * Возвращает случайное число с точностью precision в диапазоне от start до end
   * @param  {number} precision
   * @param  {number} start
   * @param  {number} end
   * @return {number}
   */
  var getRandom = function (precision, start, end) {
    start = start || 0;
    end = end || 1;
    return (Math.random() * (end - start) + start).toFixed(precision);
  };

  /**
   * Возвращает цвет в rgba с случайной прозрачностью
   * @param  {number} r
   * @param  {number} g
   * @param  {number} b
   * @return {string}
   */
  var getRandomOpacity = function (r, g, b) {
    return 'rgba(' + r + ',' + g + ',' + b + ',' + getRandom(1, 0.2) + ')';
  };

  /**
   * Рендерит колонку
   * @param  {number} columnIndex
   */
  var drawColumn = function (columnIndex) {
    ctx.fillStyle = (names[columnIndex] === 'Вы') ? CloudStyles.CURRENT_PLAYER : getRandomOpacity(0, 0, 255);
    ctx.fillRect(startXCoordinate + (ColumnProps.WIDTH + ColumnProps.GAP) * columnIndex, startYCoordinates[columnIndex], ColumnProps.WIDTH, columnHeights[columnIndex]);
    ctx.fillStyle = CloudStyles.FONT_COLOR;
    ctx.fillText(names[columnIndex], startXCoordinate + (ColumnProps.WIDTH + ColumnProps.GAP) * columnIndex, CloudProps.Y + CloudProps.HEIGHT - CloudProps.GAP);
    ctx.fillText(Math.round(times[columnIndex]), startXCoordinate + (ColumnProps.WIDTH + ColumnProps.GAP) * columnIndex, startYCoordinates[columnIndex] - CloudProps.GAP);
  };

  var maxTime = getMaxValue(times);
  var startXCoordinate = CloudProps.X + (CloudProps.WIDTH - ColumnProps.WIDTH * ColumnProps.COUNT - ColumnProps.GAP * (ColumnProps.COUNT - 1)) / 2;
  var columnHeights = times.map(function (time) {
    return (ColumnProps.HEIGHT * time) / maxTime;
  });
  var startYCoordinates = columnHeights.map(function (columnHeight) {
    return CloudProps.HEIGHT + CloudProps.Y - CloudProps.GAP - CloudProps.FONT_GAP - columnHeight;
  });

  renderCloud(CloudProps.X + CloudProps.GAP, CloudProps.Y + CloudProps.GAP, CloudStyles.SHADOW_COLOR);
  renderCloud(CloudProps.X, CloudProps.Y, CloudStyles.BG_COLOR);

  ctx.fillStyle = CloudStyles.FONT_COLOR;
  ctx.font = CloudStyles.FONT_SIZE + ' ' + CloudStyles.FONT_FAMILY;

  renderText('Ура вы победили!', 36, 'center');
  renderText('Список результатов:', 54, 'center');

  for (var columnIndex = 0; columnIndex < names.length; columnIndex++) {
    drawColumn(columnIndex);
  }
};
