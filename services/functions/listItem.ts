import handler from "../util/handler";
import dynamoDb from "../util/dynamodb";

export const main = handler(async () => {
  const params: any = {
    TableName: process.env.TABLE_NAME,
  };

  const result = await dynamoDb.scan(params);

  return result.Items;
});