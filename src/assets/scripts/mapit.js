import React from 'react';
import ReactDOM from 'react-dom';

import {generate, render} from './mapit/main';

class MapIt extends React.Component {
    state = {
        maxTiles: 50,
        isGenerated: false
    };

    generate(e) {
        e.preventDefault();
        const tiles = generate(this.state.maxTiles);
        render(this.canvas, tiles);
        this.setState({
            isGenerated: true
        });
    }

    exportMap(e) {
        const data = this.canvas.toDataURL();
        e.target.href = data;
    }

    render() {
        return <div>
            <canvas ref={el => this.canvas = el}/>
            <form onSubmit={(e) => this.generate(e)} className="toolbar">
                <label htmlFor="maxtiles">Max tiles number</label><br/>
                <input type="number" id="maxtiles" value={this.state.maxTiles} onChange={(e) => this.setState({maxTiles: e.target.value})}/>
                <br/><br/>
                <button type="submit">Generate</button>
                {
                    this.state.isGenerated &&
                    <a href="" style={{marginLeft: '15px'}} download="dungeon.jpg" onClick={(e) => this.exportMap(e)}>Export</a>
                }
            </form>
        </div>
    }
}

ReactDOM.render(<MapIt/>, document.getElementById('react-entry'));