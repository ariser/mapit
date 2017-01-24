import Tile from './Tile';
import Gap from './Gap';
import {ORIENTATION} from './const';

export default [
    new Tile({
        image: 'corridors/01',
        gaps: [
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 0),
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 8)
        ]
    }),

    new Tile({
        image: 'corridors/02',
        gaps: [
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 0),
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 8)
        ]
    }),

    new Tile({
        image: 'corridors/03',
        gaps: [
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 0),
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 8)
        ]
    }),

    new Tile({
        image: 'corridors/04',
        gaps: [
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 0),
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 8)
        ]
    }),

    new Tile({
        image: 'corridors/05',
        gaps: [
            new Gap(2, ORIENTATION.VERTICAL, 5, 2),
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 8)
        ]
    }),

    new Tile({
        image: 'corridors/06',
        gaps: [
            new Gap(2, ORIENTATION.VERTICAL, 0, 2),
            new Gap(2, ORIENTATION.HORIZONTAL, 2, 8)
        ]
    }),

    new Tile({
        image: 'corridors/07',
        gaps: [
            new Gap(2, ORIENTATION.VERTICAL, 5, 2),
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 8)
        ]
    }),

    new Tile({
        image: 'corridors/08',
        gaps: [
            new Gap(2, ORIENTATION.VERTICAL, 0, 2),
            new Gap(2, ORIENTATION.HORIZONTAL, 2, 8)
        ]
    }),

    new Tile({
        image: 'corridors/09',
        gaps: [
            new Gap(2, ORIENTATION.VERTICAL, 0, 4),
            new Gap(2, ORIENTATION.VERTICAL, 5, 4),
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 0),
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 8)
        ]
    }),

    new Tile({
        image: 'corridors/10',
        gaps: [
            new Gap(2, ORIENTATION.VERTICAL, 0, 4),
            new Gap(2, ORIENTATION.VERTICAL, 5, 4),
            new Gap(2, ORIENTATION.HORIZONTAL, 2, 0),
            new Gap(2, ORIENTATION.HORIZONTAL, 2, 8)
        ]
    }),

    new Tile({
        image: 'corridors/11',
        gaps: [
            new Gap(2, ORIENTATION.VERTICAL, 0, 4),
            new Gap(2, ORIENTATION.VERTICAL, 5, 4),
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 0),
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 8)
        ]
    }),

    new Tile({
        image: 'corridors/12',
        gaps: [
            new Gap(2, ORIENTATION.VERTICAL, 0, 4),
            new Gap(2, ORIENTATION.VERTICAL, 5, 4),
            new Gap(2, ORIENTATION.HORIZONTAL, 2, 0),
            new Gap(2, ORIENTATION.HORIZONTAL, 2, 8)
        ]
    }),

    new Tile({
        image: 'corridors/13',
        gaps: [
            new Gap(2, ORIENTATION.VERTICAL, 0, 4),
            new Gap(2, ORIENTATION.VERTICAL, 5, 4),
        ]
    }),

    new Tile({
        image: 'corridors/14',
        gaps: [
            new Gap(2, ORIENTATION.VERTICAL, 0, 4),
            new Gap(2, ORIENTATION.VERTICAL, 5, 4),
        ]
    }),

    new Tile({
        image: 'corridors/15',
        gaps: [
            new Gap(2, ORIENTATION.VERTICAL, 0, 4),
            new Gap(2, ORIENTATION.VERTICAL, 5, 4),
        ]
    }),

    new Tile({
        image: 'corridors/16',
        gaps: [
            new Gap(2, ORIENTATION.VERTICAL, 0, 4),
            new Gap(2, ORIENTATION.VERTICAL, 5, 4),
        ]
    }),

    new Tile({
        image: 'corridors/17',
        gaps: [
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 0),
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 8),
            new Gap(3, ORIENTATION.VERTICAL, 5, 2),
        ]
    }),

    new Tile({
        image: 'corridors/18',
        gaps: [
            new Gap(2, ORIENTATION.VERTICAL, 0, 4),
            new Gap(2, ORIENTATION.VERTICAL, 5, 4),
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 0),
        ]
    })
]