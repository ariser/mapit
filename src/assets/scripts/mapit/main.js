import _ from 'lodash';

import {SQUARE_SIZE, ALIGN, ORIENTATION} from './const';
import tiles_src from './tiles';

let OPEN = []; // Gaps that are available for connection
let MAP = []; // two-dim array representing map in 1 and 0 for intersection checking
let PLACED_TILES = []; // for further render

function generate() {
    OPEN = [];
    MAP = [];
    PLACED_TILES = [];

    var c = 0;

    const tiles = _.cloneDeep(tiles_src);

    const initial_tile = random_tile(tiles);
    place_tile(initial_tile);

    OPEN.push(...initial_tile.gaps);

    while (OPEN.length && tiles.length && c < 6) {
        const current_gap = OPEN.pop();
        const next = find_tile(current_gap, tiles);
        if (next) {
            place_tile(next.tile);
            OPEN.push(..._.reject(next.tile.gaps, gap => gap == next.gap));
        }
        c++;
    }

    return PLACED_TILES;
}

function find_tile(gap, tiles) {
    const control = _.map(tiles, tile => tile.limit > 0);
    while (_.some(control)) {
        let index;
        do {
            index = _.random(0, tiles.length - 1);
        } while (!control[index]);

        control[index] = false;

        let chosen_tile = _.cloneDeep(tiles[index]);

        let gaps = _.filter(chosen_tile.gaps, tile_gap => tile_gap.size === gap.size && gap.orientation === tile_gap.orientation && gap.align != tile_gap.align);

        if (!gaps.length) {
            continue;
        }

        let chosen_gap = gaps[0];

        chosen_tile.position.x = gap.position.x - chosen_gap.position.x;
        chosen_tile.position.y = gap.position.y - chosen_gap.position.y;

        _.forEach(chosen_tile.gaps, tile_gap => {
            tile_gap.position.x += chosen_tile.position.x;
            tile_gap.position.y += chosen_tile.position.y;
        });

        tiles[index].limit -= 1;

        return {
            tile: chosen_tile,
            gap: chosen_gap
        }
    }
    return null;
}

function place_tile(tile) {
    const {x, y} = tile.position;
    for (let i = x; i < x + tile.width; i++) {
        if (!MAP[i]) MAP[i] = [];
        for (let j = y; j < y + tile.height; j++) {
            MAP[i][j] = 1;
        }
    }
    tile.position.x = x;
    tile.position.y = y;
    PLACED_TILES.push(tile);
}

function random_tile(from_tiles) {
    const index = _.random(0, from_tiles.length - 1);
    return _.cloneDeep(from_tiles[index]);
}

function render(canvas, tiles) {
    const keys = _.map(_.keys(MAP), key => parseInt(key));
    const xMin = _.min(keys);
    const xMax = _.max(keys);
    let yMin = Infinity, yMax = -Infinity;
    for (let i = xMin; i <= xMax; i++) {
        yMin = _.min([yMin, ..._.map(_.keys(MAP[i]), key => parseInt(key))]);
        yMax = _.max([yMax, ..._.map(_.keys(MAP[i]), key => parseInt(key))]);
    }

    const width = (xMax - xMin + 1) * SQUARE_SIZE;
    const height = (yMax - yMin + 1) * SQUARE_SIZE;

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    const ctx = canvas.getContext('2d');

    _.forEach(tiles, tile => {
        const img = new Image();
        img.onload = function () {
            let x = (tile.position.x - xMin) * SQUARE_SIZE;
            let y = (tile.position.y - yMin) * SQUARE_SIZE;
            ctx.drawImage(img, x, y);
        };
        img.src = tile.image;
    });
}

export {generate, render};