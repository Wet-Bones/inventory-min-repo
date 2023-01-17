import { Api, use, StackContext } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack }: StackContext) {
  const { itemTable, vendorTable } = use(StorageStack);

  // Create the API
  const itemApi = new Api(stack, "ItemApi", {
    defaults: {
      authorizer: "iam",
      function: {
        permissions: [itemTable],
        environment: {
          TABLE_NAME: itemTable.tableName,
        },
      },
    },
    routes: {
      "POST /items": "functions/createItem.main",
      "GET /items/{id}": "functions/getItem.main",
      "PUT /items/{id}": "functions/updateItem.main",
      "DELETE /items/{id}": "functions/deleteItem.main",
      "GET /items": "functions/listItem.main",
    },
  });

  const vendorApi = new Api(stack, "VendorApi", {
    defaults: {
      authorizer: "iam",
      function: {
        permissions: [vendorTable],
        environment: {
          TABLE_NAME: vendorTable.tableName,
        },
      },
    },
    routes: {
      "POST /vendors": "functions/createVendor.main",
      "GET /vendors/{id}": "functions/getVendor.main",
      "PUT /vendors/{id}": "functions/updateVendor.main",
      "DELETE /vendors/{id}": "functions/deleteVendor.main",
      "GET /vendors": "functions/listVendor.main",
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ItemApiEndpoint: itemApi.url, 
  });

  stack.addOutputs({
    VendorApiEndpoint: vendorApi.url,
  });

  // Return the API resource
  return {
    itemApi,
    vendorApi
  };
}