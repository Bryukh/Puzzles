import React from 'react';
import PuzzleNav from './PuzzleNav'


require("../../styles/puzzle-page.scss");

var PuzzlePage = React.createClass({


    resetPuzzle: function () {
        this.refs.puzzle.reset();
    },


    render: function () {
        let puzzlePath = './puzzles/' + this.props.params.title + ".js";
        let Puzzle = require(puzzlePath);
        return (
            <div>
                <PuzzleNav title={this.props.params.title} onReset={this.resetPuzzle} />
                <Puzzle ref="puzzle" />
            </div>
        );
    }
});


export default PuzzlePage;
