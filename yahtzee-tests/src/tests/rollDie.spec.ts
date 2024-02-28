import { test, expect } from '@playwright/test';
import { getDieById, getDieByIdDots, getDieByIdFloat, getDieByIdInteger, getDieByIdWord, putDieById } from '../resources/die.resources';
import { dieType } from '../enums/dieType';
import { returnStatus } from '../enums/returnStatus';

test.describe('/rollDie endpoints', () => {
  // POST rollDie by ID, 200 status, get the roll by ID and look through to make sure it evenetually changes (random) 
  // POST rollDie with invalid ID, 400 status

});
