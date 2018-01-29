'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var COL_WIDTH = 40;
var COL_HEIGHT = 150;
var COL_GAP = 50;
var COL_COLOR = 'rgba(255, 0, 0, 1)';

/**
 * Рендерит облако в указных координатах
 * @param  {object} ctx
 * @param  {number} x
 * @param  {number} y
 * @param  {string} color Цвет заливки
 */
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

/**
 * Рендерит строку по центру облака
 * @param  {object} ctx
 * @param  {string} text
 * @param  {number} coordinateY Координата по оси Y с учетом CLOUD_Y
 */
var renderCenteredText = function (ctx, text, coordinateY) {
  var textWidth = ctx.measureText(text).width;
  var coordinateX = CLOUD_X + (CLOUD_WIDTH - textWidth) / 2;
  coordinateY += CLOUD_Y;

  ctx.fillText(text, coordinateX, coordinateY);
};

/**
 * Находит максимальное значение
 * @param  {array} times
 * @return {number}
 */
var getMaxValue = function (times) {
  return times.reduce(function (prev, current) {
    return Math.max(prev, current);
  }, 0);
};

/**
 * Рендерит статистку проеденного уровня
 * @param  {object} ctx
 * @param  {array} names Имена игроков
 * @param  {array} times Результаты игроков
 */
window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, .7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgba(255, 255, 255, 1)');
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.font = '16px PT Mono';
  renderCenteredText(ctx, 'Ура вы победили!', 36);
  renderCenteredText(ctx, 'Список результатов:', 54);

  var maxTime = getMaxValue(times);
  var firstColX = CLOUD_X + (CLOUD_WIDTH - COL_WIDTH * names.length - COL_GAP * (names.length - 1)) / 2;
  var colHeights = times.map(function (time) {
    return (COL_HEIGHT * time) / maxTime;
  });
  var colYs = colHeights.map(function (col) {
    return CLOUD_HEIGHT + CLOUD_Y - GAP - FONT_GAP - col;
  });

  for (var i = 0; i < names.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = COL_COLOR;
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255,' + (Math.random() + 0.1).toFixed(1) + ')';
    }
    ctx.fillRect(firstColX + (COL_WIDTH + COL_GAP) * i, colYs[i], COL_WIDTH, colHeights[i]);
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillText(names[i], firstColX + (COL_WIDTH + COL_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - GAP);
    ctx.fillText(Math.round(times[i]), firstColX + (COL_WIDTH + COL_GAP) * i, colYs[i] - GAP);
  }
};
