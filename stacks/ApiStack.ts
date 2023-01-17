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