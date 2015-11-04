import Snap from 'snapsvg';
import $ from 'jquery';

import "./../styles/_common.scss";
import "./../styles/15puzzle.scss";

const N = 4;

class Puzzle {
    constructor(containerId, options) {
        this.container = document.getElementById(containerId);
        this.cfg = {
            chipSize: 100,
            outPadding: 10,
            inPadding: 5,
            cornerR: 5,
            stepTime: 500
        };
    }

    prepareSvg() {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.id = "puzzle_svg";
        this.container.appendChild(svg);
    }

    create() {
        this.prepareSvg();

        this.s = Snap("#puzzle_svg");
        this.cfg.size = this.cfg.chipSize * 4 + this.cfg.outPadding * 2 + this.cfg.inPadding * 3;
        this.container.style.height = (this.cfg.size + 2 * this.cfg.outPadding) + "px";
        this.s.attr({width: this.cfg.size + "px", height: this.cfg.size + "px"});

        // Background
        this.s.rect(0, 0, this.cfg.size, this.cfg.size, this.cfg.cornerR).addClass("back");

        // Chips
        this.chips = [];
        this.state = {};
        for (let i = 1; i < N * N; i++) {
            this.chips[i] = this.makeChip(i, i);
            this.state[i] = i;
        }
        this.free = 16;
        this.bindEvents();
    }

    makeChip(number, position) {
        let col = (position - 1) % 4,
            row = Math.floor((position - 1) / 4),
            x = this.cfg.outPadding + col * (this.cfg.inPadding + this.cfg.chipSize),
            y = this.cfg.outPadding + row * (this.cfg.inPadding + this.cfg.chipSize),
            chipBack = this.s.rect(
                x,
                y,
                this.cfg.chipSize,
                this.cfg.chipSize,
                this.cfg.cornerR * 2)
                .addClass("chip-back"),
            chipEdge = this.s.rect(
                x + this.cfg.inPadding,
                y +  + this.cfg.inPadding,
                this.cfg.chipSize - 2 * this.cfg.inPadding,
                this.cfg.chipSize  - 2 * this.cfg.inPadding,
                this.cfg.cornerR)
                .addClass("chip-edge"),
            chipNumb = this.s.text(
                x + this.cfg.chipSize / 2,
                y + this.cfg.chipSize / 2,
                String(number))
                .addClass("chip-numb");

        var chip = this.s.g(chipBack, chipEdge, chipNumb).addClass("chip");
        if (number === position) {
            chip.addClass("correct");
        }
        chip.number = number;
        chip.attr("data-number", number);
        chip.data({x: x, y: y});

        return chip;
    }

    bindEvents() {
        var nears = {
            up: this.free > 4 ? this.free - 4 : null,
            down: this.free < 13 ? this.free + 4 : null,
            right: this.free % 4 !== 0 ? this.free + 1 : null,
            left: this.free % 4 !== 1 ? this.free - 1 : null
        };
        let shift = this.cfg.chipSize + this.cfg.inPadding,
            dirShifts = {
                up: [0, shift],
                down: [0, -shift],
                left: [shift, 0],
                right: [-shift, 0]
            };
        for (let k in nears) {
            if (!nears.hasOwnProperty(k) || !nears[k]) {continue}
            let pos = nears[k],
                numb = this.state[pos],
                chip = this.chips[numb],
                obj = this;
            chip.addClass("active");
            chip.click(function (e) {
                let x = chip.data().x,
                    y = chip.data().y,
                    vShift = dirShifts[k][1],
                    hShift = dirShifts[k][0];
                chip.animate({"transform": `t${hShift},${vShift}`}, 
                    obj.cfg.stepTime,
                    function () {
                        this.bindEvents();
                    }.bind(obj)
                );
                chip.data({x: x + hShift, y: y + vShift});
                obj.state[obj.free] = numb;
                obj.state[pos] = 0;
                obj.free = pos;
                for (let c = 1, C = N * N; c < C; c++) {
                    let ch = obj.chips[c];
                    ch.unclick();
                    ch.removeClass("active");
                }
            })
        }
        
    }


}

var p = new Puzzle('puzzle');
p.create();


export default Puzzle;
