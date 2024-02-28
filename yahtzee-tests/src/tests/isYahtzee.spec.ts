import { test, expect } from '@playwright/test';
import { getDieById, getDieByIdDots, getDieByIdFloat, getDieByIdInteger, getDieByIdWord, putDieById } from '../resources/die.resources';
import { dieType } from '../enums/dieType';
import { returnStatus } from '../enums/returnStatus';

test.describe('/isYahtzee endpoints', () => {
  // PUT dice 1-5 to be the same value, GET isYahtzee, expect value to be true 
  // PUT dice 1-5 to differnt values, GET isYahtzee, expect value to be false
  // POST rollDice until all values are the same, expect value to be true
});
