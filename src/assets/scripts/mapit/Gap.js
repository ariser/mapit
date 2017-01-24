import {ORIENTATION, ALIGN} from './const';

class Gap {
    constructor(size, orientation, x, y, options) {
        options = options || {};

        this.size = size;
        this.orientation = orientation;
        this.position = {x, y};
        this.level = options.level || this.level;

        if (orientation === ORIENTATION.HORIZONTAL) {
            this.align = y ? ALIGN.END : ALIGN.START;
        } else {
            this.align = x ? ALIGN.END : ALIGN.START;
        }
    }

    size = 0;
    orientation = null;
    align = null;
    position = {
        x: null,
        y: null
    };
    level = 0;
}

export default Gap;