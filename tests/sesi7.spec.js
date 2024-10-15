const { test, expect } = require("@playwright/test");
const { Ajv } = require("ajv");

const ajv = new Ajv();

function manggilAjv(responseJson){
    const valid = ajv.validate(require("./../json-schema/add-object.schema.json"), responseJson);

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
       expect(responseJson.data.first_name).toEqual("Janet");

    manggilAjv(responseJson);
});

test('POST Request', async ({request}) => {
    const reqHeaders = {
        Accept: "application/json"
    }

    const body = {
            "name": "Apple MacBook Pro 200",
            "data": {
               "year": 2019,
               "price": 1849.99,
               "CPU model": "Intel Core i9",
               "Hard disk size": "1 TB"
            }
    }

    const response = await request.post("https://api.restful-api.dev/objects", {
        headers: reqHeaders,
        data: body,
    })

    expect(response.status()).toEqual(200);
    expect(response.ok()).toBeTruthy();

    const responseJson = await response.json();
    expect(responseJson.name).toEqual("Apple MacBook Pro 200");

    manggilAjv(responseJson);
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
    expect(responseJson.name).toEqual("morpheus");

    manggilAjv(responseJson);
});
