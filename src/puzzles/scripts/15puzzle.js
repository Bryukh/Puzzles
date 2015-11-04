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
            cornerR: 5
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
        for (let i = 1; i < N * N; i++) {
            this.makeChip(i, i);
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
        //chip.mark = number;
        chip.attr("data-number", number);
    }

}

var p = new Puzzle('puzzle');
p.create();


export default Puzzle;
