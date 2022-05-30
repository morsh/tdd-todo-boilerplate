import { Chance } from 'chance';

export const chance = new Chance();

export const someStrings = () => chance.n(chance.string, chance.integer({ min: 1, max: 10 }));
