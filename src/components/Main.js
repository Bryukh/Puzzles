import React from 'react';

import Footer from './Footer';
import Header from './Header';

import puzzles from 'json!./puzzle-info.json';

import "../styles/main.scss";

var Main = React.createClass({
    render: function () {
        let blocks = puzzles.map((info, index) => {
            console.log(info);
            let imageURL = (info.imageURL && info.imageURL.length) ? info.imageURL : "default.png";
            return (
                <a href={`#/puzzle/${info.slug}`} key={index}>
                    <div className="col-xs-6 col-sm-4 col-md-3 text-center">
                        <div className="image-description">
                            <img src={`/images/${imageURL}`} alt={info.title}/>
                        </div>
                        <h1>{info.title}</h1>
                    </div>

                </a>
            )
        });
        return (
            <div>
                <Header />

                <div className="container">
                    {blocks}
                </div>
                <Footer />
            </div>
        );
    }
});


export default Main;
