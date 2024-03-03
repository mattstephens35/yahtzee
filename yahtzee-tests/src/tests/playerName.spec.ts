import { expect } from '@playwright/test';
import { test } from "../fixtures/fixtures";
import { getPlayerName, putPlayerName } from '../resources/playerName.resources';
import { v4 as uuidv4 } from 'uuid';
import { returnStatus } from '../enums/returnStatus';

test.describe('/playerName endpoints', () => {
  test('PUT and GET /playerName @smoke @playerName', async ({
    request,
    apiLogin
  }) => {
    const name = `Test Name ${uuidv4()}`;
    const requestData = {
      'name': name,
    };
    await putPlayerName(request, 204, requestData, apiLogin.username, apiLogin.password);

    const getPlayerNameResponse = (await getPlayerName(request)).json();

    expect((await getPlayerNameResponse).status).toBe(returnStatus.SUCCESS.valueOf());
    expect((await getPlayerNameResponse).data).toBe(name);
  });

  test('PUT /playerName with bad request @playerName', async ({
    request,
    apiLogin
  }) => {
    const name = `Test Name ${uuidv4()}`;
   
    const requestData = {
      'invalid': name,
    };

    await putPlayerName(request, 400, requestData, apiLogin.username, apiLogin.password);
  });

  test('PUT /playerName with unauthorized request @playerName', async ({
    request
  }) => {
    const name = `Test Name ${uuidv4()}`;
    const failureMessage = 'Incorrect username or password provided'
   
    const requestData = {
      'name': name,
    };

    const response = (await putPlayerName(request, 401, requestData, 'bad', 'password')).json();

    expect((await response).status).toBe(returnStatus.FAILED.valueOf());
    expect((await response).data).toBe(failureMessage);
  });
});
