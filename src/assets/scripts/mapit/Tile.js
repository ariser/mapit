import _ from 'lodash';

class Tile {
    constructor(options) {
        _.assign(this, options);
        this.image = `assets/img/tiles/${options.image}.png`;
    }

    image = null;

    gaps = [];

    priority = {
        top: [],
        right: [],
        bottom: [],
        left: []
    };

    rotation = 0;

    position = {
        x: 0,
        y: 0
    };

    isLadder = false;

    level = 1;

    width = 5;
    height = 8;

    limit = Infinity;

    rotate() {
        this.rotation += 90;
        while (this.rotation >= 360) this.rotation -= 360;
        [this.width, this.height] = [this.height, this.width];
    }
}

export default Tile;