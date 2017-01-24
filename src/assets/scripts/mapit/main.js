import _ from 'lodash';

import {SQUARE_SIZE, ALIGN, ORIENTATION} from './const';
import tiles_src from './tiles';

let OPEN = []; // Gaps that are available for connection
let MAP = []; // two-dim array representing map in 1 and 0 for intersection checking
let PLACED_TILES = []; // for further render

function generate(maxTiles) {
    OPEN = [];
    MAP = [];
    PLACED_TILES = [];

    let tilesUsed = 0;

    const tiles = _.cloneDeep(tiles_src);

    const initial_tile = random_tile(tiles);
    initial_tile.rotate_randomly();
    place_tile(initial_tile);

    OPEN.push(...initial_tile.gaps);

    while (OPEN.length && tiles.length && tilesUsed < maxTiles) {
        let index = _.findIndex(OPEN, gap => gap.priority.length > 0);
        if (index < 0) {
            index = _.random(0, OPEN.length - 1);
        }
        const current_gap = OPEN[index];
        OPEN.splice(index, 1);
        const next = find_tile(current_gap, tiles);
        if (next) {
            place_tile(next.tile);
            OPEN.push(..._.reject(next.tile.gaps, gap => gap == next.gap));
            tilesUsed++;
        }
    }

    return PLACED_TILES;
}

function find_tile(gap, tiles) {
    const control = _.map(tiles, tile => tile.limit > 0);
    let index;
    let usingPriority = false;

    if (gap.priority.length) {
        let i = _.random(0, gap.priority.length - 1);
        index = _.findIndex(tiles, tile => tile.image === gap.priority[i].image);
        usingPriority = true;
    }

    while (_.some(control)) {
        while (!control[index]) {
            index = _.random(0, tiles.length - 1);
            usingPriority = false;
        }

        control[index] = false;

        let chosen_tile = _.cloneDeep(tiles[index]);
        if (usingPriority) {
            var rotations = gap.rotation / 90;
            for (let i = 0; i < rotations; i++) {
                chosen_tile.rotate();
            }
        } else {
            chosen_tile.rotate_randomly();
        }

        for (let i = 0; i < 4; i++) {
            let chosen_gap = _.filter(chosen_tile.gaps, tile_gap => tile_gap.size === gap.size && gap.orientation === tile_gap.orientation && gap.align != tile_gap.align)[0];

            if (!chosen_gap || !can_be_placed(chosen_tile, gap.position.x - chosen_gap.position.x, gap.position.y - chosen_gap.position.y)) {
                chosen_tile.rotate();
                continue;
            }

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

function can_be_placed(tile, x, y) {
    for (let i = x; i < x + tile.width; i++) {
        if (!MAP[i]) MAP[i] = [];
        for (let j = y; j < y + tile.height; j++) {
            if (MAP[i][j] == 1) return false;
        }
    }
    return true;
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

            if (!tile.rotation) {
                ctx.drawImage(img, x, y);
            } else {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(tile.rotation * Math.PI / 180);
                if (tile.rotation === 90) {
                    x = 0;
                    y = -img.height;
                }
                if (tile.rotation === 180) {
                    x = -img.width;
                    y = -img.height;
                }
                if (tile.rotation === 270) {
                    x = -img.width;
                    y = 0;
                }
                ctx.drawImage(img, x, y);
                ctx.restore();
            }
        };
        img.src = tile.image;
    });
}

export {generate, render};