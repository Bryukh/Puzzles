webpackJsonp([2],{

/***/ 226:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	__webpack_require__(227);

	var Rect = (function (_React$Component) {
	    _inherits(Rect, _React$Component);

	    function Rect() {
	        _classCallCheck(this, Rect);

	        _get(Object.getPrototypeOf(Rect.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(Rect, [{
	        key: "render",
	        value: function render() {
	            return _react2["default"].createElement("rect", _extends({}, this.props, {
	                className: "cell " + (this.props.isPainted ? "painted" : ""),
	                onMouseEnter: this.props.mouseIn,
	                onMouseOut: this.props.mouseOut,
	                onMouseDown: this.props.mouseDown,
	                onTouchStart: this.props.touchDown,
	                onTouchEnd: this.props.mouseUp,
	                onTouchMove: this.props.touchMove,
	                onMouseUp: this.props.mouseUp }));
	        }
	    }]);

	    return Rect;
	})(_react2["default"].Component);

	var Puzzle = (function (_React$Component2) {
	    _inherits(Puzzle, _React$Component2);

	    function Puzzle() {
	        _classCallCheck(this, Puzzle);

	        _get(Object.getPrototypeOf(Puzzle.prototype), "constructor", this).call(this);
	        this.mouseDown = false;
	        this.state = {
	            field: {},
	            initField: {},
	            isWin: false,
	            SIZE: 5,
	            PAINTED: 2,
	            baseSize: 100
	        };
	    }

	    _createClass(Puzzle, [{
	        key: "componentWillMount",
	        value: function componentWillMount() {
	            var N = this.state.SIZE;
	            var field = {};
	            for (var i = 0; i < N; i++) {
	                for (var j = 0; j < N; j++) {
	                    field[i + "-" + j] = 0;
	                }
	            }

	            for (var i = 0; i < this.state.PAINTED; i++) {
	                var row = Math.floor(Math.random() * N);
	                var col = Math.floor(Math.random() * N);
	                field[row + "-" + col] = 1;
	            }
	            this.setState({ initField: field });
	            this.clear(field);
	        }
	    }, {
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            this.svg = document.getElementById("puzzleSvg");
	        }
	    }, {
	        key: "reset",
	        value: function reset() {
	            this.clear();
	            this.mouseDown = false;
	            this.setState({ isWin: false });
	        }
	    }, {
	        key: "clear",
	        value: function clear(initField) {
	            initField = initField || this.state.initField;
	            var field = this.state.field;
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = Object.keys(initField)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var k = _step.value;

	                    field[k] = initField[k];
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator["return"]) {
	                        _iterator["return"]();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            this.setState({ field: field });
	        }
	    }, {
	        key: "handleCursorIn",
	        value: function handleCursorIn(coor, e) {
	            if (this.mouseDown) {
	                var currentField = this.state.field;
	                if (currentField[coor]) {
	                    this.gameOver();
	                } else {
	                    currentField[coor] = 1;
	                    this.setState({ field: currentField });
	                    this.checkWin();
	                }
	            }
	        }
	    }, {
	        key: "handleCursorOut",
	        value: function handleCursorOut(coor, e) {}
	    }, {
	        key: "handleTouchDown",
	        value: function handleTouchDown(coor, e) {
	            this.currentCoor = coor;
	            this.handleMouseDown(coor, e);
	        }
	    }, {
	        key: "handleTouchMove",
	        value: function handleTouchMove(initCoor, e) {
	            e.preventDefault();
	            var svgRect = this.svg.getBoundingClientRect();
	            var base = svgRect.width / this.state.SIZE;
	            var col = Math.floor((e.touches[0].pageX - svgRect.left) / base);
	            var row = Math.floor((e.touches[0].pageY - svgRect.top) / base);
	            var coor = row + "-" + col;

	            if (this.currentCoor !== coor) {
	                this.handleCursorIn(coor, e);
	                this.currentCoor = coor;
	            }
	        }
	    }, {
	        key: "handleCursorOutSVG",
	        value: function handleCursorOutSVG(e) {
	            this.gameOver();
	        }
	    }, {
	        key: "handleMouseDown",
	        value: function handleMouseDown(coor, e) {
	            this.mouseDown = true;
	            var currentField = this.state.field;
	            currentField[coor] = 1;
	            this.setState({ field: currentField });
	        }
	    }, {
	        key: "handleMouseUp",
	        value: function handleMouseUp(e) {
	            e.preventDefault();
	            this.gameOver();
	        }
	    }, {
	        key: "checkWin",
	        value: function checkWin() {
	            var result = true;
	            var field = this.state.field;
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = Object.keys(field)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var k = _step2.value;

	                    result = result && field[k];
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
	                        _iterator2["return"]();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }

	            if (result) {
	                console.log("WIN");
	                this.setState({ isWin: true });
	            }
	        }
	    }, {
	        key: "gameOver",
	        value: function gameOver() {
	            this.mouseDown = false;
	            if (this.state.isWin) {
	                return;
	            }
	            this.clear();
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _this = this;

	            var base = this.state.baseSize;
	            var rects = Object.keys(this.state.field).map(function (coor) {
	                var _coor$split$map = coor.split("-").map(function (x) {
	                    return Number(x);
	                });

	                var _coor$split$map2 = _slicedToArray(_coor$split$map, 2);

	                var row = _coor$split$map2[0];
	                var col = _coor$split$map2[1];

	                return _react2["default"].createElement(Rect, { x: col * base,
	                    y: row * base,
	                    key: coor,
	                    isPainted: _this.state.field[coor],
	                    mouseIn: _this.handleCursorIn.bind(_this, coor),
	                    mouseOut: _this.handleCursorOut.bind(_this, coor),
	                    mouseDown: _this.handleMouseDown.bind(_this, coor),
	                    touchDown: _this.handleTouchDown.bind(_this, coor),
	                    touchMove: _this.handleTouchMove.bind(_this, coor),
	                    mouseUp: _this.handleMouseUp.bind(_this) });
	            });
	            var viewBox = base * this.state.SIZE;
	            return _react2["default"].createElement(
	                "div",
	                { className: "row" },
	                _react2["default"].createElement(
	                    "div",
	                    { className: "col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4" },
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "container puzzle-container text-center painter-puzzle", id: "puzzle" },
	                        _react2["default"].createElement(
	                            "svg",
	                            { id: "puzzleSvg", viewBox: "0 0 " + viewBox + " " + viewBox, onMouseLeave: this.handleCursorOutSVG.bind(this) },
	                            rects
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return Puzzle;
	})(_react2["default"].Component);

	Puzzle.title = "Painter";

	exports["default"] = Puzzle;
	module.exports = exports["default"];

/***/ },

/***/ 227:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(228);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(214)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./painter.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./painter.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 228:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(213)();
	// imports


	// module
	exports.push([module.id, "/* Coolors Exported Palette - coolors.co/eaeaea-6bb2a0-a5ffd6-ffa69e-ff6868 */\n.painter-puzzle svg {\n  padding: 5px;\n  pointer-events: all; }\n\n.painter-puzzle rect.cell {\n  fill: #C3DDEB;\n  stroke: #036DA6;\n  stroke-width: 5px;\n  width: 100px;\n  height: 100px;\n  cursor: pointer; }\n\n.painter-puzzle rect.cell.painted {\n  fill: #55A8D4;\n  transition-property: fill;\n  transition-duration: 500ms; }\n\n.painter-puzzle rect.frame {\n  fill: none;\n  stroke-width: 5px;\n  stroke: #01486F; }\n", ""]);

	// exports


/***/ }

});