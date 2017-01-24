import _ from 'lodash';

import {ORIENTATION, ALIGN} from './const';

class Tile {
    constructor(options) {
        _.assign(this, options);
        this.image = `assets/img/tiles/${options.image}.png`;
    }

    image = null;

    gaps = [];

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
        _.forEach(this.gaps, gap => {
            let newX, newY, newAlign, newOrientation;
            if (gap.orientation == ORIENTATION.VERTICAL) {
                newOrientation = ORIENTATION.HORIZONTAL;
                newAlign = gap.align;
                if (gap.align == ALIGN.START) {
                    newX = this.height - gap.size - gap.position.y;
                    newY = 0;
                } else {
                    newX = this.height - gap.size - gap.position.y;
                    newY = this.width;
                }
            } else {
                newOrientation = ORIENTATION.VERTICAL;
                if (gap.align == ALIGN.START) {
                    newAlign = ALIGN.END;
                    newX = this.height;
                    newY = gap.position.x;
                } else {
                    newAlign = ALIGN.START;
                    newX = 0;
                    newY = gap.position.x;
                }
            }
            gap.orientation = newOrientation;
            gap.align = newAlign;
            gap.position.x = newX;
            gap.position.y = newY;
            gap.rotation = this.rotation;
        });
        [this.width, this.height] = [this.height, this.width];
    }

    rotate_randomly() {
        const i = _.random(0, 3);
        for (let j = 0; j < i; j++) {
            this.rotate();
        }
    }
}

export default Tile;