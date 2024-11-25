import React, {Component} from 'react';
import "./style.css"
class Greet extends Component {
    render() {
        return (
            <div className="greet">
                <h1 className="display-3">
                Welcome to Algoverse
                </h1>
                <hr className="dropdown-divider"/>
                <h1 className="display-5">
                    Project No: 99
                </h1>
            </div>
        );
    }
}

export default Greet;