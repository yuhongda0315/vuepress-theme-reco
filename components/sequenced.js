const Sequenced = (function(){
  var CanvasHelper, DefinationParser, Sequenced;
  Sequenced = (function() {
    var COLOR_LIFELINE, COLOR_MESSAGE, COLOR_OBJECT_BORDER, DEFAULT_CANVAS_WIDTH, DEFAULT_FONT_COLOR, DEFAULT_FONT_FAMILY, DEFAULT_FONT_SIZE, DEFAULT_OBJECT_HEIGHT, DEFAULT_OBJECT_WIDTH, MARGIN, ROW_HEIGHT, canvasElement, columnHeight, columnWidth, ctx, drawActivations, drawMessage, drawMessages, drawObject, drawObjects, fontColor, fontFamily, fontSize, initCanvas, initVariables, objectHeight, objectWidth, renderCanvasElement, sequenceData;
  
    function Sequenced() {}
  
    COLOR_OBJECT_BORDER = '#c0c0c0';
  
    COLOR_LIFELINE = '#80aada';
  
    COLOR_MESSAGE = '#f7ab42';
  
    DEFAULT_CANVAS_WIDTH = 800;
  
    DEFAULT_OBJECT_WIDTH = 120;
  
    DEFAULT_OBJECT_HEIGHT = 40;
  
    DEFAULT_FONT_FAMILY = 'Arial';
  
    DEFAULT_FONT_COLOR = '#000';
  
    DEFAULT_FONT_SIZE = 12;
  
    ROW_HEIGHT = 48;
  
    MARGIN = 10;
  
    Sequenced.COLOR_OBJECT = ['#fdd9b4', '#bae0ec', '#c2e2c7', '#e5cff4', '#c9d1f7', '#f8cdd4'];
  
    ctx = null;
  
    objectWidth = null;
  
    objectHeight = null;
  
    fontFamily = null;
  
    fontColor = null;
  
    fontSize = null;
  
    canvasElement = null;
  
    sequenceData = null;
  
    columnHeight = null;
  
    columnWidth = null;
  
    Sequenced.renderAll = function() {
      var canvasElements, _i, _len, _results;
      initVariables();
      canvasElements = document.getElementsByTagName('canvas');
      _results = [];
      for (_i = 0, _len = canvasElements.length; _i < _len; _i++) {
        canvasElement = canvasElements[_i];
        if (canvasElement.hasAttribute('sequenced')) {
          _results.push(renderCanvasElement(canvasElement));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
  
    Sequenced.render = function(canvasElementId) {
      initVariables();
      canvasElement = document.getElementById(canvasElementId);
      return renderCanvasElement(canvasElement);
    };
  
    Sequenced.setObjectSize = function(width, height) {
      objectWidth = width;
      return objectHeight = height;
    };
  
    Sequenced.setFontFamily = function(value) {
      return fontFamily = value;
    };
  
    Sequenced.setFontColor = function(value) {
      return fontColor = value;
    };
  
    Sequenced.setFontSize = function(value) {
      return fontSize = value;
    };
  
    renderCanvasElement = function(canvasElement) {
      sequenceData = DefinationParser.getSequenceData(canvasElement);
      initCanvas();
      drawObjects();
      return drawMessages();
    };
  
    initCanvas = function() {
      var height, scale, scaleHeight, scaleWidth, width;
      columnHeight = objectHeight + ROW_HEIGHT * (sequenceData.maxRow + 2 / 3 - 1 / 2);
      columnWidth = (DEFAULT_CANVAS_WIDTH - objectWidth - MARGIN * 2) / (sequenceData.objectCount - 1);
      CanvasHelper.defineColumnWidth(columnWidth);
      width = parseInt(canvasElement.width);
      height = (columnHeight + MARGIN * 2) / DEFAULT_CANVAS_WIDTH * width;
      scaleWidth = width * 2;
      scaleHeight = height * 2;
      scale = scaleWidth / DEFAULT_CANVAS_WIDTH;
      canvasElement.style.width = width + 'px';
      canvasElement.style.height = height + 'px';
      canvasElement.width = scaleWidth;
      canvasElement.height = scaleHeight;
      ctx = canvasElement.getContext('2d');
      return ctx.scale(scale, scale);
    };
  
    initVariables = function() {
      if (objectWidth === null) {
        objectWidth = DEFAULT_OBJECT_WIDTH;
      }
      if (objectHeight === null) {
        objectHeight = DEFAULT_OBJECT_HEIGHT;
      }
      if (fontFamily === null) {
        fontFamily = DEFAULT_FONT_FAMILY;
      }
      if (fontColor === null) {
        fontColor = DEFAULT_FONT_COLOR;
      }
      if (fontSize === null) {
        return fontSize = DEFAULT_FONT_SIZE;
      }
    };
  
    drawObjects = function() {
      var index, object, objectKey, x, y, _results;
      index = 0;
      _results = [];
      for (objectKey in sequenceData.objects) {
        x = MARGIN + columnWidth * index++;
        y = MARGIN;
        object = sequenceData.objects[objectKey];
        _results.push(drawObject(x, y, objectWidth, objectHeight, objectKey, object));
      }
      return _results;
    };
  
    drawObject = function(x, y, width, height, objectName, object) {
      var getObjectColor;
      getObjectColor = function(index) {
        var colorIndex;
        colorIndex = index > 5 ? index - 6 : index;
        return Sequenced.COLOR_OBJECT[colorIndex];
      };
      CanvasHelper.drawLifeline(ctx, x + objectWidth / 2, y + objectHeight, ROW_HEIGHT * sequenceData.maxRow, '#fff', COLOR_LIFELINE);
      drawActivations(x, y, object);
      CanvasHelper.drawRoundedRect(ctx, x, y, width, height, getObjectColor(object.id), COLOR_OBJECT_BORDER, 5);
      return CanvasHelper.drawWrapText(ctx, objectName, x + objectWidth / 2, y + objectHeight / 2 + fontSize / 3, objectWidth - 10, 'bold', fontSize, fontColor, fontFamily);
    };
  
    drawActivations = function(x, y, object) {
      var activation, activationHeight, activationY, _i, _len, _ref, _results;
      _ref = object.activations;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        activation = _ref[_i];
        activationY = activation === 1 ? MARGIN + objectHeight : MARGIN + objectHeight + ROW_HEIGHT * (activation - 5 / 6);
        activationHeight = activation === 1 ? ROW_HEIGHT * (1 + 1 / 6) : ROW_HEIGHT;
        _results.push(CanvasHelper.drawActivation(ctx, x + objectWidth / 2, activationY, activationHeight, ROW_HEIGHT * sequenceData.maxRow, '#fff', COLOR_LIFELINE));
      }
      return _results;
    };
  
    drawMessages = function() {
      var message, _i, _len, _ref, _results;
      _ref = sequenceData.messages;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        message = _ref[_i];
        _results.push(drawMessage(message));
      }
      return _results;
    };
  
    drawMessage = function(message) {
      var getColumnPositionX, x, x1, x2, y;
      getColumnPositionX = function(objectIndex) {
        return MARGIN + objectWidth / 2 + (DEFAULT_CANVAS_WIDTH - objectWidth - MARGIN * 2) / (sequenceData.objectCount - 1) * objectIndex;
      };
      y = ROW_HEIGHT * (message.row + 2 / 3);
      switch (message.direction) {
        case 'self':
          x = getColumnPositionX(message.fromObjectIndex);
          return CanvasHelper.drawSelfArrow(ctx, x, y - ROW_HEIGHT * 3 / 8, y + ROW_HEIGHT * 3 / 8, COLOR_MESSAGE, fontSize, fontColor, fontFamily, message.text, message.isDashed);
        case 'right':
          x1 = getColumnPositionX(message.fromObjectIndex);
          x2 = getColumnPositionX(message.toObjectIndex);
          return CanvasHelper.drawRightArrow(ctx, x1, x2, y, COLOR_MESSAGE, fontSize, fontColor, fontFamily, message.text, message.isDashed);
        case 'left':
          x1 = getColumnPositionX(message.toObjectIndex);
          x2 = getColumnPositionX(message.fromObjectIndex);
          return CanvasHelper.drawLeftArrow(ctx, x1, x2, y, COLOR_MESSAGE, fontSize, fontColor, fontFamily, message.text, message.isDashed);
      }
    };
  
    return Sequenced;
  
  })();
  
  CanvasHelper = (function() {
    var ACTIVATION_WIDTH, ARROW_HANDLE_HEIGHT, LIFELINE_WIDTH, colWidth;
  
    function CanvasHelper() {}
  
    LIFELINE_WIDTH = 8;
  
    ACTIVATION_WIDTH = 12;
  
    ARROW_HANDLE_HEIGHT = 8;
  
    colWidth = null;
  
    CanvasHelper.defineColumnWidth = function(columnWidth) {
      return colWidth = columnWidth;
    };
  
    CanvasHelper.drawRect = function(ctx, x, y, width, height, color) {
      ctx.fillStyle = color;
      return ctx.fillRect(x, y, width, height);
    };
  
    CanvasHelper.drawRoundedRect = function(ctx, x, y, width, height, color, borderColor, radius) {
      x += 0.5;
      y += 0.5;
      ctx.beginPath();
      ctx.arc(x + radius, y + radius, radius, Math.PI, 1.5 * Math.PI);
      ctx.lineTo(x + width - 2 * radius, y);
      ctx.arc(x + width - radius, y + radius, radius, 1.5 * Math.PI, 2 * Math.PI);
      ctx.lineTo(x + width, y + height - radius);
      ctx.arc(x + width - radius, y + height - radius, radius, 0, 0.5 * Math.PI);
      ctx.lineTo(x + radius, y + height);
      ctx.arc(x + radius, y + height - radius, radius, 0.5 * Math.PI, Math.PI);
      ctx.lineTo(x, y + radius);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = borderColor;
      return ctx.stroke();
    };
  
    CanvasHelper.drawRightArrow = function(ctx, x1, x2, y, color, fontSize, fontColor, fontFamily, text, isDashed) {
      if (isDashed) {
        ctx.setLineDash([ARROW_HANDLE_HEIGHT, ARROW_HANDLE_HEIGHT]);
      } else {
        ctx.setLineDash([1, 0]);
      }
      x1 = x1 + ACTIVATION_WIDTH - LIFELINE_WIDTH / 2;
      x2 = x2 - ACTIVATION_WIDTH + LIFELINE_WIDTH / 2;
      ctx.beginPath();
      ctx.moveTo(x2 - ARROW_HANDLE_HEIGHT, y);
      ctx.lineTo(x1, y);
      ctx.lineDashOffset = ARROW_HANDLE_HEIGHT / 3;
      ctx.strokeStyle = color;
      ctx.lineWidth = ARROW_HANDLE_HEIGHT;
      ctx.stroke();
      ctx.setLineDash([1, 0]);
      ctx.beginPath();
      ctx.moveTo(x2 - ARROW_HANDLE_HEIGHT, y - ARROW_HANDLE_HEIGHT);
      ctx.lineTo(x2, y);
      ctx.lineTo(x2 - ARROW_HANDLE_HEIGHT, y + ARROW_HANDLE_HEIGHT);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      return this.drawWrapText(ctx, text, (x1 + x2) / 2, y - fontSize, x2 - x1 - fontSize, 'normal', fontSize, fontColor, fontFamily, 'center', true);
    };
  
    CanvasHelper.drawLeftArrow = function(ctx, x1, x2, y, color, fontSize, fontColor, fontFamily, text, isDashed) {
      if (isDashed) {
        ctx.setLineDash([ARROW_HANDLE_HEIGHT, ARROW_HANDLE_HEIGHT]);
      } else {
        ctx.setLineDash([1, 0]);
      }
      x1 = x1 + ACTIVATION_WIDTH - LIFELINE_WIDTH / 2;
      x2 = x2 - ACTIVATION_WIDTH + LIFELINE_WIDTH / 2;
      ctx.beginPath();
      ctx.moveTo(x1 + ARROW_HANDLE_HEIGHT, y);
      ctx.lineTo(x2, y);
      ctx.lineDashOffset = ARROW_HANDLE_HEIGHT / 3;
      ctx.strokeStyle = color;
      ctx.lineWidth = ARROW_HANDLE_HEIGHT;
      ctx.stroke();
      ctx.setLineDash([1, 0]);
      ctx.beginPath();
      ctx.lineTo(x1 + ARROW_HANDLE_HEIGHT, y - ARROW_HANDLE_HEIGHT);
      ctx.lineTo(x1, y);
      ctx.lineTo(x1 + ARROW_HANDLE_HEIGHT, y + ARROW_HANDLE_HEIGHT);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      return this.drawWrapText(ctx, text, (x1 + x2) / 2, y - fontSize, x2 - x1 - fontSize, 'normal', fontSize, fontColor, fontFamily, 'center', true);
    };
  
    CanvasHelper.drawSelfArrow = function(ctx, x, y1, y2, color, fontSize, fontColor, fontFamily, text, isDashed) {
      var radius;
      if (isDashed) {
        ctx.setLineDash([ARROW_HANDLE_HEIGHT, ARROW_HANDLE_HEIGHT]);
      } else {
        ctx.setLineDash([1, 0]);
      }
      x = x + ACTIVATION_WIDTH - LIFELINE_WIDTH / 2;
      y1 = y1 + ARROW_HANDLE_HEIGHT / 2;
      y2 = y2 - ARROW_HANDLE_HEIGHT / 2;
      radius = (y2 - y1) / 2;
      ctx.beginPath();
      ctx.moveTo(x, y1);
      ctx.lineTo(x + ARROW_HANDLE_HEIGHT, y1);
      ctx.arc(x + ARROW_HANDLE_HEIGHT, y1 + radius, radius, 1.5 * Math.PI, 0.5 * Math.PI, false);
      ctx.lineDashOffset = 2;
      ctx.strokeStyle = color;
      ctx.lineWidth = ARROW_HANDLE_HEIGHT;
      ctx.stroke();
      ctx.setLineDash([1, 0]);
      ctx.beginPath();
      ctx.lineTo(x + ARROW_HANDLE_HEIGHT, y2 - ARROW_HANDLE_HEIGHT);
      ctx.lineTo(x, y2);
      ctx.lineTo(x + ARROW_HANDLE_HEIGHT, y2 + ARROW_HANDLE_HEIGHT);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      return this.drawWrapText(ctx, text, x + ARROW_HANDLE_HEIGHT * 2 + radius, (y1 + y2) / 2 + fontSize / 2, colWidth - radius - ARROW_HANDLE_HEIGHT * 2 - fontSize, 'normal', fontSize, fontColor, fontFamily, 'left');
    };
  
    CanvasHelper.drawLifeline = function(ctx, x, y, height, startColor, stopColor) {
      var gradient;
      gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, startColor);
      gradient.addColorStop(1, stopColor);
      ctx.beginPath();
      ctx.moveTo(x, y + height);
      ctx.lineTo(x, y);
      ctx.setLineDash([LIFELINE_WIDTH * 2, LIFELINE_WIDTH]);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = LIFELINE_WIDTH;
      ctx.stroke();
      return ctx.setLineDash([1, 0]);
    };
  
    CanvasHelper.drawActivation = function(ctx, x, y, height, lifeLineHeight, startColor, stopColor) {
      var gradient;
      gradient = ctx.createLinearGradient(0, 0, 0, lifeLineHeight);
      gradient.addColorStop(0, startColor);
      gradient.addColorStop(1, stopColor);
      ctx.beginPath();
      ctx.moveTo(x, y + height);
      ctx.lineTo(x, y);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = ACTIVATION_WIDTH;
      return ctx.stroke();
    };
  
    CanvasHelper.drawWrapText = function(ctx, text, x, y, maxWidth, fontWeight, fontSize, fontColor, fontFamily, textAlign, isDoubleLine) {
      var i, line, lineHeight, splitter, testLine, testWidth, words, yd, _i, _ref;
      ctx.font = "" + fontWeight + " " + fontSize + "px " + fontFamily;
      ctx.textAlign = textAlign ? textAlign : 'center';
      ctx.fillStyle = fontColor;
      x += fontSize * 1 / 3;
      splitter = /\\n/.test(text) ? '\\n' : ' ';
      words = text.split(splitter);
      line = '';
      yd = 0;
      if (isDoubleLine) {
        lineHeight = ARROW_HANDLE_HEIGHT * 2 + fontSize * 2;
      } else {
        lineHeight = fontSize * 1.2;
      }
      for (i = _i = 0, _ref = words.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        testLine = line + words[i] + ' ';
        testWidth = ctx.measureText(testLine).width;
        if (testWidth > maxWidth && i > 0) {
          yd = fontSize / 2;
          if (isDoubleLine) {
            ctx.fillText(line, x, y);
          } else {
            ctx.fillText(line, x, y - yd);
          }
          line = words[i] + ' ';
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      return ctx.fillText(line, x, y - yd);
    };
  
    return CanvasHelper;
  
  })();
  
  DefinationParser = (function() {
    function DefinationParser() {}
  
    DefinationParser.getSequenceData = function(element) {
      var addActivation, direction, fromObjectIndex, getInnerText, innerText, match, messageType, objectFrom, objectIndex, objectTo, preMessage, regex, row, sequenceData, text, toObjectIndex;
      getInnerText = function(element) {
        if (element.childNodes.length === 0) {
          return '';
        } else {
          return element.childNodes[0].nodeValue;
        }
      };
      addActivation = function(objectKey, row) {
        var object;
        object = sequenceData.objects[objectKey];
        if (object.activations.length === 0) {
          return object.activations.push(row);
        } else if (object.activations[object.activations.length - 1] !== row) {
          return object.activations.push(row);
        }
      };
      regex = /(.+\b) *(-->|->) *(.+\b) *: *(.+)\n?/gm;
      sequenceData = {
        objects: {},
        objectCount: 0,
        messages: [],
        maxRow: 0
      };
      innerText = getInnerText(element);
      objectIndex = 0;
      while (match = regex.exec(innerText)) {
        objectFrom = match[1].trim();
        messageType = match[2].trim();
        objectTo = match[3].trim();
        text = match[4].trim();
        if (sequenceData.objects[objectFrom] === void 0) {
          sequenceData.objects[objectFrom] = {
            'id': objectIndex,
            'activations': []
          };
          objectIndex++;
        }
        if (sequenceData.objects[objectTo] === void 0) {
          sequenceData.objects[objectTo] = {
            'id': objectIndex,
            'activations': []
          };
          objectIndex++;
        }
        fromObjectIndex = sequenceData.objects[objectFrom].id;
        toObjectIndex = sequenceData.objects[objectTo].id;
        if (objectFrom === objectTo) {
          direction = 'self';
        } else if (fromObjectIndex > toObjectIndex) {
          direction = 'left';
        } else {
          direction = 'right';
        }
        if (sequenceData.messages.length === 0) {
          row = 1;
        } else {
          preMessage = sequenceData.messages[sequenceData.messages.length - 1];
          if (fromObjectIndex === preMessage.toObjectIndex && direction === preMessage.direction && preMessage.direction === !'self') {
            row = preMessage.row;
          } else {
            row = preMessage.row + 1;
          }
        }
        addActivation(objectFrom, row);
        addActivation(objectTo, row);
        sequenceData.messages.push({
          'text': text,
          'direction': direction,
          'fromObjectIndex': fromObjectIndex,
          'toObjectIndex': toObjectIndex,
          'isDashed': /--/.test(messageType),
          'row': row
        });
        sequenceData.objectCount = objectIndex;
        sequenceData.maxRow = row;
      }
      return sequenceData;
    };
  
    return DefinationParser;
  
  })();
  return Sequenced;
})()
export default {
  Sequenced
}
