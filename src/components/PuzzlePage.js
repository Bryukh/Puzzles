import React from 'react';

var PuzzlePage = React.createClass({
    render: function () {
        let puzzlePath = './puzzles/' + this.props.params.title + ".js";
        let Puzzle = require(puzzlePath);
        return (
            <div className="container">
                <Puzzle />
            </div>
        );
    }
});


export default PuzzlePage;
