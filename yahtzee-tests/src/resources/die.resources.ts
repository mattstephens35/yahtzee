import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { dieType } from "../enums/dieType";

const url = '/die'

export async function getDieByIdInteger(
  request: APIRequestContext,
  dieId: number,
) {

  const response: APIResponse = await request.get(`${url}/${dieId}`, {
    headers: {
      ContentType: 'application/json; charset=utf-8',
      Accept: 'application/json',
    },
  });
  expect(response.status()).toBe(200);

  return response;
}

export async function getDieByIdFloat(
  request: APIRequestContext,
  dieId: number,
) {

  return await getDieById(request, dieId, dieType.FLOAT);
}

export async function getDieByIdWord(
  request: APIRequestContext,
  dieId: number,
) {
  return await getDieById(request, dieId, dieType.WORD);
}

export async function getDieByIdDots(
  request: APIRequestContext,
  dieId: number,
) {
  return await getDieById(request, dieId, dieType.DOTS);
}

export async function getDieById(
  request: APIRequestContext,
  dieId: any,
  dieType: dieType,
  expectedStatusCode: number = 200,
) {

  const response: APIResponse = await request.get(`${url}/${dieId}`, {
    headers: {
      ContentType: 'application/json',
      Accept: dieType.valueOf(),
    },
  });
  expect(response.status()).toBe(expectedStatusCode);

  return response;
}

export async function putDieById(
  request: APIRequestContext,
  dieRequest: any,
  username: string,
  password: string,
  expectedStatusCode: number = 204,
) {
  const credentialsBase64 = btoa(`${username}:${password}`);

  const response: APIResponse = await request.put(url, {
    headers: {
      Content: 'application/json',
      Accept: '*/*',
      'Authorization': `Basic ${credentialsBase64}`,
    },
    data: dieRequest
  });
  expect(response.status()).toBe(expectedStatusCode);

  return response;
}
