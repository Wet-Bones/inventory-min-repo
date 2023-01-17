import dynamoDb from '../util/dynamodb';
import handler from '../util/handler';

export const main = handler(async () => {
  const params: any = {
    TableName: process.env.TABLE_NAME,
  };

  const result = await dynamoDb.scan(params);

  return result.Items;
});