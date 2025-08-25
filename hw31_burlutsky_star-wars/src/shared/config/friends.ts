import type { Friend } from '@shared/types/sw';

export const friends: Friend[] = [
    {name: 'Luke Skywalker', img: 'luke.jpg', id: "luke", apiId: "peoples/1"},
    {name: 'R2-D2', img: 'r2d2.jpg', id: "r2_d2", apiId: "peoples/3"},
    {name: 'C3-PO', img: 'c3po.jpg', id: "c3_po", apiId: "peoples/2"},
    {name: 'Ewok', img: 'ewok.jpg', id: "ewok", apiId: "peoples/1"},
    {name: 'Chewbacca', img: 'chewbacca.jpg', id: "chewbacca", apiId: "peoples/13"},
    {name: 'Han Solo', img: 'hansolo.jpg', id: "solo", apiId: "peoples/14"},
    {name: 'Lea', img: 'lea.jpg', id: "lea", apiId: "peoples/5"},
    {name: 'Falcon Millenium', img: 'falconmillenium.jpg', id: "falcon", apiId: "transports/10"},
    {name: 'Obi Van Kenobi', img: 'obivan.jpg', id: "obi_van", apiId: "peoples/10"},
    {name: 'Master Yoda', img: 'yoda.jpg', id: "yoda", apiId: "peoples/0"},
];