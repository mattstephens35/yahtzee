import { APIRequestContext, APIResponse, expect } from "@playwright/test";

const url = '/playerName'

export async function getPlayerName(
  request: APIRequestContext,
) {
  const response: APIResponse = await request.get(url, {
    headers: {
      ContentType: 'application/json; charset=utf-8',
      Accept: 'application/json',
    },
  });
  expect(response.status()).toBe(200);

  return response;
}

export async function putPlayerName(
  request: APIRequestContext,
  expectedStatusCode: number,
  playerName: any,
  username: string,
  password: string,
) {
  const credentialsBase64 = btoa(`${username}:${password}`);

  const response: APIResponse = await request.put(url, {
    headers: {
      Content: 'application/json',
      Accept: '*/*',
      'Authorization': `Basic ${credentialsBase64}`,
    },
    data: playerName
  });
  expect(response.status()).toBe(expectedStatusCode);

  return response;
}
