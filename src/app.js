import React from 'react';
import {render} from 'react-dom';
import {Router, Route} from 'react-router';
import Main from "./components/Main";
import PuzzlePage from "./components/PuzzlePage/PuzzlePage";

render(
    (
        <Router>
            <Route path="/" component={Main}/>
            <Route path="puzzle/:title" component={PuzzlePage}/>
        </Router>
    ),
    document.getElementById('app')
);
