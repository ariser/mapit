import Tile from './Tile';
import Gap from './Gap';
import {ORIENTATION} from './const';

const room_top_left = new Tile({
    image: 'dangers/09',
    gaps: [
        new Gap(7, ORIENTATION.VERTICAL, 5, 1),
        new Gap(4, ORIENTATION.HORIZONTAL, 1, 8)
    ],
    priority: {},
    limit: 1
});

const room_top_right = new Tile({
    image: 'dangers/10',
    gaps: [
        new Gap(7, ORIENTATION.VERTICAL, 0, 1),
        new Gap(2, ORIENTATION.VERTICAL, 5, 5),
        new Gap(4, ORIENTATION.HORIZONTAL, 0, 8)
    ],
    priority: {},
    limit: 1
});

const room_bottom_left = new Tile({
    image: 'dangers/11',
    gaps: [
        new Gap(2, ORIENTATION.VERTICAL, 0, 4),
        new Gap(7, ORIENTATION.VERTICAL, 5, 0),
        new Gap(4, ORIENTATION.HORIZONTAL, 1, 0)
    ],
    priority: {},
    limit: 1
});

const room_bottom_right = new Tile({
    image: 'dangers/12',
    gaps: [
        new Gap(7, ORIENTATION.VERTICAL, 0, 0),
        new Gap(4, ORIENTATION.HORIZONTAL, 0, 0)
    ],
    priority: {},
    limit: 1
});


room_top_left.gaps[0].priority = [room_top_right];
room_top_left.gaps[1].priority = [room_bottom_left];

room_top_right.gaps[0].priority = [room_top_left];
room_top_right.gaps[2].priority = [room_bottom_right];

room_bottom_left.gaps[1].priority = [room_bottom_right];
room_bottom_left.gaps[2].priority = [room_top_left];

room_bottom_right.gaps[0].priority = [room_bottom_left];
room_bottom_right.gaps[1].priority = [room_top_right];


export default [
    new Tile({
        image: 'dangers/01',
        gaps: [
            new Gap(2, ORIENTATION.VERTICAL, 0, 4),
            new Gap(2, ORIENTATION.VERTICAL, 5, 4)
        ]
    }),

    new Tile({
        image: 'dangers/02',
        gaps: [
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 0),
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 8)
        ]
    }),

    new Tile({
        image: 'dangers/03',
        gaps: [
            new Gap(2, ORIENTATION.VERTICAL, 0, 4),
            new Gap(2, ORIENTATION.VERTICAL, 5, 4)
        ]
    }),

    new Tile({
        image: 'dangers/04',
        gaps: [
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 0),
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 8)
        ]
    }),

    new Tile({
        image: 'dangers/05',
        gaps: [
            new Gap(2, ORIENTATION.VERTICAL, 5, 4, {level: 0}),
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 0, {level: 1})
        ],
        isLadder: true
    }),

    new Tile({
        image: 'dangers/06',
        gaps: [
            new Gap(2, ORIENTATION.VERTICAL, 0, 4, {level: 1}),
            new Gap(2, ORIENTATION.HORIZONTAL, 2, 0, {level: 0})
        ],
        isLadder: true
    }),

    new Tile({
        image: 'dangers/07',
        gaps: [
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 0, {level: 1}),
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 8, {level: 0})
        ],
        isLadder: true
    }),

    new Tile({
        image: 'dangers/08',
        gaps: [
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 0, {level: 0}),
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 8, {level: 1})
        ],
        isLadder: true
    }),

    room_top_left,
    room_top_right,
    room_bottom_left,
    room_bottom_right,

    new Tile({
        image: 'dangers/13',
        gaps: [
            new Gap(2, ORIENTATION.VERTICAL, 5, 1),
            new Gap(2, ORIENTATION.VERTICAL, 0, 3),
            new Gap(2, ORIENTATION.VERTICAL, 5, 5),
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 0),
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 8)
        ]
    }),

    new Tile({
        image: 'dangers/14',
        gaps: [
            new Gap(2, ORIENTATION.VERTICAL, 5, 1),
            new Gap(2, ORIENTATION.VERTICAL, 0, 3),
            new Gap(2, ORIENTATION.VERTICAL, 5, 5),
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 0),
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 8)
        ]
    }),

    new Tile({
        image: 'dangers/15',
        gaps: [
            new Gap(2, ORIENTATION.VERTICAL, 0, 4),
            new Gap(2, ORIENTATION.VERTICAL, 5, 4),
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 0),
        ]
    }),

    new Tile({
        image: 'dangers/16',
        gaps: [
            new Gap(2, ORIENTATION.VERTICAL, 0, 4),
            new Gap(2, ORIENTATION.VERTICAL, 5, 4),
        ]
    }),

    new Tile({
        image: 'dangers/17',
        gaps: [
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 0),
            new Gap(2, ORIENTATION.HORIZONTAL, 1, 8)
        ]
    }),

    new Tile({
        image: 'dangers/18',
        gaps: [
            new Gap(2, ORIENTATION.HORIZONTAL, 2, 0),
            new Gap(2, ORIENTATION.HORIZONTAL, 2, 8)
        ]
    })
]