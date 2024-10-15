const { test, expect } = require("@playwright/test");
const { Ajv } = require("ajv");

const ajv = new Ajv();

function manggilAjv(schemaFile, responseJson){
    const valid = ajv.validate(require(schemaFile), responseJson);

    if (!valid) {
    console.error("AJV Validation Errors:", ajv.errorsText());
    }

    expect(valid).toBe(true);
}

test('GET Request', async ({request}) => {
       const response = await request.get("https://reqres.in/api/users/2")
       console.log(await response.json());

       expect(response.status()).toEqual(200);
       expect(response.ok()).toBeTruthy();

       const responseJson = await response.json();
       const schemaFile = "./../json-schema/GET.schema.json";
       expect(responseJson.data.first_name).toEqual("Janet");

    manggilAjv(schemaFile, responseJson);
});

test('POST Request', async ({request}) => {
    const reqHeaders = {
        Accept: "application/json"
    }

    const body = {
        "email": "eve.holt@reqres.in",
        "password": "pistol"
    }

    const response = await request.post("https://reqres.in/api/register", {
        headers: reqHeaders,
        data: body,
    })

    expect(response.status()).toEqual(200);
    expect(response.ok()).toBeTruthy();

    const responseJson = await response.json();
    const schemaFile = "./../json-schema/POST.schema.json";
    expect(responseJson.id).toEqual(4);

    manggilAjv(schemaFile, responseJson);
});

test('DELETE Request', async ({request}) => {
    const response = await request.delete("https://reqres.in/api/users/2")
    console.log(response.status());

    expect(response.status()).toEqual(204);
    expect(response.ok()).toBeTruthy();
  
});

test('PUT Request', async ({request}) => {
    const reqHeaders = {
        Accept: "application/json"
    }

    const body = {
    "name": "morpheus",
    "job": "zion resident"
    }
    const response = await request.put("https://reqres.in/api/users/2", {
        headers: reqHeaders,
        data: body,
    })
    console.log(await response.json());

    expect(response.status()).toEqual(200);
    expect(response.ok()).toBeTruthy();

    const responseJson = await response.json();
    const schemaFile = "./../json-schema/PUT.schema.json";
    expect(responseJson.name).toEqual("morpheus");

    manggilAjv(schemaFile, responseJson);
});
