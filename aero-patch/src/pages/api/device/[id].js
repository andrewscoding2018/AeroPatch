// src/pages/api/device/[id].js
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const params = {
        TableName: "YourDynamoDBTableName",
        Key: { deviceId: id },
      };
      const { Item } = await dynamoDb.get(params).promise();
      res.status(200).json({ deviceId: id, status: Item?.status || "Unknown" });
    } catch (error) {
      console.error("DynamoDB error:", error);
      res.status(500).json({ error: "Could not fetch device" });
    }
  } else if (req.method === "POST") {
    try {
      const params = {
        TableName: "YourDynamoDBTableName",
        Key: { deviceId: id },
        UpdateExpression: "set #status = :status",
        ExpressionAttributeNames: { "#status": "status" },
        ExpressionAttributeValues: { ":status": "toggle" }, // Adjust as needed for your logic
        ReturnValues: "UPDATED_NEW",
      };
      await dynamoDb.update(params).promise();
      res.status(200).json({ message: "Device status updated" });
    } catch (error) {
      console.error("DynamoDB error:", error);
      res.status(500).json({ error: "Could not update device" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
