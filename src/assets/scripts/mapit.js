import React from 'react';
import ReactDOM from 'react-dom';

import {generate, render} from './mapit/main';

class MapIt extends React.Component {
    generate() {
        const tiles = generate();
        console.log(tiles);
        render(this.canvas, tiles);
    }

    render() {
        return <div>
            <canvas ref={el => this.canvas = el}/>
            <button type="button" onClick={() => this.generate()}>Generate</button>
        </div>
    }
}

ReactDOM.render(<MapIt/>, document.getElementById('react-entry'));