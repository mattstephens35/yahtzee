import { test, expect } from '@playwright/test';
import { getDieById, getDieByIdDots, getDieByIdFloat, getDieByIdInteger, getDieByIdWord, putDieById } from '../resources/die.resources';
import { dieType } from '../enums/dieType';
import { returnStatus } from '../enums/returnStatus';

test.describe('/die endpoints', () => {
  const validDieIds: number[] = [1, 2, 3, 4, 5];

  for (let i = 0; i < validDieIds.length; i++) {
    test(`PUT and GET /die/${validDieIds[i]} by integer @smoke @die`, async ({
      request
    }) => {
      const rndInt = await getRandomDieValue();
      const requestData = {
        'id': validDieIds[i],
        'value': rndInt
      };

      await putDieById(request, requestData);
      const response = (await getDieByIdInteger(request, validDieIds[i])).json();

      expect((await response).status).toBe(returnStatus.SUCCESS.valueOf());
      expect((await response).data.id).toBe(validDieIds[i]);
      expect((await response).data.value).toBe(await getDieFormatByType(requestData.value, dieType.INTEGER));
      expect(await checkDieType((await response).data.value)).toBe(dieType.INTEGER);
    });
  }

  for (let i = 0; i < validDieIds.length; i++) {
    test(`PUT and GET /die/${validDieIds[i]} by float @smoke @die`, async ({
      request
    }) => {
      const rndInt = await getRandomDieValue();
      const requestData = {
        'id': validDieIds[i],
        'value': rndInt
      };

      await putDieById(request, requestData);
      const response = (await getDieByIdFloat(request, validDieIds[i])).json();

      expect((await response).status).toBe(returnStatus.SUCCESS.valueOf());
      expect((await response).data.id).toBe(validDieIds[i]);
      expect((await response).data.value).toBe(await getDieFormatByType(requestData.value, dieType.FLOAT));
      expect(await checkDieType((await response).data.value)).toBe(dieType.FLOAT);
    });
  }

  for (let i = 0; i < validDieIds.length; i++) {
    test(`PUT and GET /die/${validDieIds[i]} by word @smoke @die`, async ({
      request
    }) => {
      const rndInt = await getRandomDieValue();
      const requestData = {
        'id': validDieIds[i],
        'value': rndInt
      };

      await putDieById(request, requestData);
      const response = (await getDieByIdWord(request, validDieIds[i])).json();

      expect((await response).status).toBe(returnStatus.SUCCESS.valueOf());
      expect((await response).data.id).toBe(validDieIds[i]);
      expect((await response).data.value).toBe(await getDieFormatByType(requestData.value, dieType.WORD));
      expect(await checkDieType((await response).data.value)).toBe(dieType.WORD);
    });
  }

  for (let i = 0; i < validDieIds.length; i++) {
    test(`PUT and GET /die/${validDieIds[i]} by dots @smoke @die`, async ({
      request
    }) => {
      const rndInt = await getRandomDieValue();
      const requestData = {
        'id': validDieIds[i],
        'value': rndInt
      };

      await putDieById(request, requestData);
      const response = (await getDieByIdDots(request, validDieIds[i])).json();

      expect((await response).status).toBe(returnStatus.SUCCESS.valueOf());
      expect((await response).data.id).toBe(validDieIds[i]);
      expect((await response).data.value).toBe(await getDieFormatByType(requestData.value, dieType.DOTS));
      expect(await checkDieType((await response).data.value)).toBe(dieType.DOTS);
    });
  }

  const invalidGetIds = [
    { id: 0, failureMessage: 'Die ID must be an integer between 1 and 5' },
    { id: 'A', failureMessage: 'Die ID must be an integer between 1 and 5' },
    { id: -1, failureMessage: 'Die ID must be an integer between 1 and 5' }]

  for (let i = 0; i < invalidGetIds.length; i++) {
    test(`GET /die/${invalidGetIds[i].id} with invalid values @die`, async ({
      request
    }) => {

      const response = (await getDieById(request, invalidGetIds[i].id, dieType.INTEGER, 400)).json();

      expect((await response).status).toBe(returnStatus.FAILED.valueOf());
      expect((await response).data).toBe(invalidGetIds[i].failureMessage);
    });
  }

  const invalidPutIds = [
    { id: 0, failureMessage: 'Die ID must be between 1 and 5' },
    { id: 'A', failureMessage: 'Invalid request body format' },
    { id: -1, failureMessage: 'Die ID must be between 1 and 5' }]

  for (let i = 0; i < invalidPutIds.length; i++) {
    test(`PUT /die with invalid id: ${invalidPutIds[i].id} Bad Request @die`, async ({
      request
    }) => {
      const invalidIds = [
        { id: 0, failureMessage: 'Die ID must be between 1 and 5' },
        { id: 'A', failureMessage: 'Invalid request body format' },
        { id: -1, failureMessage: 'Die ID must be between 1 and 5' }]

      const rndInt = await getRandomDieValue();
      const requestData = {
        'id': invalidIds[i].id,
        'value': rndInt
      };

      const response = (await putDieById(request, requestData, 400)).json();

      expect((await response).status).toBe(returnStatus.FAILED.valueOf());
      expect((await response).data).toBe(invalidPutIds[i].failureMessage);
    });
  }

  const invalidPutValues = [
    { value: 0, failureMessage: 'Die value must be between 1 and 6' },
    { value: 'A', failureMessage: 'Invalid request body format' },
    { value: -1, failureMessage: 'Die value must be between 1 and 6' }]

  for (let i = 0; i < invalidPutIds.length; i++) {
    test(`PUT /die with invalid value: ${invalidPutValues[i].value} Bad Request @die`, async ({
      request
    }) => {
      const rndInt = await getRandomDieValue();
      const requestData = {
        'id': 1,
        'value': invalidPutValues[i].value
      };

      const response = (await putDieById(request, requestData, 400)).json();

      expect((await response).status).toBe(returnStatus.FAILED.valueOf());
      expect((await response).data).toBe(invalidPutValues[i].failureMessage);
    });
  }

  test(`PUT /die with unauthorized credentials @die`, async ({
    request
  }) => {
    const requestData = {
      'id': 1,
      'value': 1
    };
    const failureMessage = 'Incorrect username or password provided'

    const response = (await putDieById(request, requestData, 401, 'blah', 'blah')).json();

    expect((await response).status).toBe(returnStatus.FAILED.valueOf());
    expect((await response).data).toBe(failureMessage);
  });

});

async function checkDieType(input: any) {
  if (Number.isInteger(input)) {
    return dieType.INTEGER;
  }
  else {
    if (input.includes('.')) {
      if (isNaN(+input)) {
        return dieType.DOTS;
      } else return dieType.FLOAT;
    } else return dieType.WORD;
  }
}

async function getRandomDieValue() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getDieFormatByType(dieValue: number, type: dieType) {
  switch (type) {
    case dieType.DOTS: {
      var dots = '.';
      for (let i = 1; i < dieValue; i++) {
        dots = dots + '.';
      }
      return dots
    }
    case dieType.FLOAT: {
      return dieValue + '.0'
    }
    case dieType.INTEGER: {
      return dieValue
    }
    case dieType.WORD: {
      switch (dieValue) {
        case 1: return 'one'
        case 2: return 'two'
        case 3: return 'three'
        case 4: return 'four'
        case 5: return 'five'
        case 6: return 'six'
      }
    }
  }
}
