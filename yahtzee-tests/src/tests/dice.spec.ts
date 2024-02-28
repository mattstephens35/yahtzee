import { test, expect } from '@playwright/test';
import { getDieById, getDieByIdDots, getDieByIdFloat, getDieByIdInteger, getDieByIdWord, putDieById } from '../resources/die.resources';
import { dieType } from '../enums/dieType';
import { returnStatus } from '../enums/returnStatus';

test.describe('/dice endpoints', () => {
  // PUT value for all dice 1-5, GET dice, 200 status, confirm value matches for each Dice based on ID 
});
