import React from 'react';
import PuzzleNav from './PuzzleNav'


require("../../styles/puzzle-page.scss");

class PuzzlePage extends React.Component {

    constructor() {
        super();
        this.state = {
            puzzleComponent: null,
            resetFunc: null
        }

    }

    resetPuzzle() {
        if (this.refs.puzzle) {
            this.refs.puzzle.reset();
        }
    }

    componentWillMount() {
        let PuzzleLoad = require("bundle!./puzzles/" + this.props.params.title);
        PuzzleLoad((module) => {
            this.setState({puzzleComponent: module})
        });
    }

    render() {
        let Puzzle = this.state.puzzleComponent;
        return (
            <div>
                <PuzzleNav title={Puzzle ? Puzzle.title : "Loading..."}
                           onReset={this.resetPuzzle.bind(this)}/>
                {Puzzle ? <Puzzle ref="puzzle"/> : ""}
            </div>
        );

    }
}



export default PuzzlePage;
