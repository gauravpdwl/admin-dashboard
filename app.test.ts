import sum from './example.ts';
import {expect, it} from 'vitest';

it.skip("Add 1 + 2 to equal 3", ()=>{
    expect(sum(1,2)).toBe(3);
})