import React from 'react';

import Snap from 'snapsvg';
import $ from 'jquery';

import "./styles/15puzzle.scss";

const N = 4;

class PuzzleSVG {
    constructor(containerId, options) {
        this.container = document.getElementById(containerId);
        this.cfg = {
            chipSize: 95,
            outPadding: 10,
            inPadding: 10,
            stroke: 5,
            cornerR: 5,
            stepTime: 200
        };
    }

    prepareSvg() {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.id = "puzzle_svg";
        this.container.appendChild(svg);
    }

    remove() {
        this.container.removeChild(document.getElementById("puzzle_svg"));
    }

    create() {
        this.prepareSvg();

        this.s = Snap("#puzzle_svg");
        this.cfg.size = this.cfg.chipSize * 4 + this.cfg.outPadding * 2 + this.cfg.inPadding * 3;
        this.s.attr({viewBox: `0 0 ${this.cfg.size} ${this.cfg.size}`});

        // Background
        this.s.rect(0, 0, this.cfg.size, this.cfg.size, this.cfg.cornerR).addClass("back");

        // Chips
        this.chips = [];
        this.state = {};
        let randAr = this.randomState();
        for (let i = 0; i < randAr.length; i++) {
            let numb = randAr[i],
                pos = i + 1;
            let chip = this.makeChip(numb, pos);
            if (pos === numb) {
                chip.addClass("correct");
            }
            this.chips[numb] = chip;
            this.state[pos] = numb;
        }
        this.free = 16;
        this.bindEvents();
    }

    randomState() {
        while (true){
            let ar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
            ar.sort(() => Math.random() > 0.5 ? 1 : -1);
            let parity = 0;
            for (let i = 0; i < ar.length; i++) {
                for (let j = i + 1; j < ar.length; j++) {
                    parity += ar[i] > ar[j] ? 1 : 0;
                }
            }
            if (parity % 2 === 0) {
                return ar;
            }
        }
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
                .attr({"fill": "none"})
                .addClass("chip-back"),
            chipEdge = this.s.rect(
                x + this.cfg.stroke,
                y + this.cfg.stroke,
                this.cfg.chipSize - 2 * this.cfg.stroke,
                this.cfg.chipSize  - 2 * this.cfg.stroke,
                this.cfg.cornerR)
                .addClass("chip-edge"),
            chipNumb = this.s.text(
                x + this.cfg.chipSize / 2,
                y + this.cfg.chipSize / 2,
                String(number))
                .addClass("chip-numb"),
            f = this.s.filter(Snap.filter.shadow(0, 0, 8, "#000000")),
            chipGlow = this.s.rect(
                x + this.cfg.stroke,
                y + this.cfg.stroke,
                this.cfg.chipSize - 2 * this.cfg.stroke,
                this.cfg.chipSize  - 2 * this.cfg.stroke,
                this.cfg.cornerR).attr({filter: f}).addClass("chip-glow");

        var chip = this.s.g(chipGlow, chipBack, chipEdge, chipNumb).addClass("chip");

        chip.number = number;
        chip.attr("data-number", number);
        chip.data({x: x, y: y, xShift: 0, yShift: 0});

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
                chip = this.chips[numb];
            chip.addClass("active");
            chip.mousedown((e) => {
                let chipData = chip.data(),
                    x = chipData.x,
                    y = chipData.y,
                    hShift = chipData.xShift + dirShifts[k][0],
                    vShift = chipData.yShift + dirShifts[k][1];
                chip.animate({"transform": `t${hShift},${vShift}`},
                    this.cfg.stepTime,
                    () => {
                        this.bindEvents();
                        chip.data({xShift: hShift, yShift: vShift});
                    }
                );

                chip.data({x: x + hShift, y: y + vShift});
                this.state[this.free] = numb;
                this.state[pos] = 0;
                if (numb == this.free) {
                    chip.addClass("correct");
                }
                else {
                    chip.removeClass("correct");
                }
                this.free = pos;

                for (let c = 1, C = N * N; c < C; c++) {
                    let ch = this.chips[c];
                    ch.unmousedown();
                    ch.removeClass("active");
                }
            })
        }

    }


}


class Puzzle extends React.Component {
    reset() {
        this.svg.remove();
        this.svg.create();

    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-6 col-md-offset-3">
                    <div className="container puzzle-container text-center Puzzle15" id="puzzle"></div>
                </div>
            </div>
        )
    }
    
    componentDidMount() {
        this.svg = new PuzzleSVG("puzzle");
        this.svg.create();
    }
}


export default Puzzle;
