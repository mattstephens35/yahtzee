import { test, expect } from '@playwright/test';
import { getDieById, getDieByIdDots, getDieByIdFloat, getDieByIdInteger, getDieByIdWord, putDieById } from '../resources/die.resources';
import { dieType } from '../enums/dieType';
import { returnStatus } from '../enums/returnStatus';

test.describe('/rollDice endpoints', () => {
  // POST rollDice, 200 status, check value on dice 1-5 for valid values
});
