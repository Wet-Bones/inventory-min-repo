import { Bucket, StackContext, Table } from "@serverless-stack/resources";

export function StorageStack({ stack }: StackContext) {

const bucket = new Bucket(stack, "Uploads", {
  cors: [
    {
      maxAge: "1 day",
      allowedOrigins: ["*"],
      allowedHeaders: ["*"],
      allowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
    },
  ],
});

  const itemTable = new Table(stack, "Item", {
    fields: {
      itemId: "string",
      info: "string",
      stock: "string",
      location: "string",
      created: "number",
      createdBy: "string",
      lastUpdate: "number",
      lastUpdateBy: "string"
    },
    primaryIndex: { partitionKey: "itemId"},
  });

  const vendorTable = new Table(stack, "Vendor", {
    fields: {
      vendorId: "string",
      name: "string",
      contact: "string",
      created: "number",
      createdBy: "string",
      lastUpdate: "number",
      lastUpdateBy: "string"
    },
    primaryIndex: { partitionKey: "vendorId"},
  });

  return {
    itemTable,
    vendorTable,
    bucket,
  };
}
