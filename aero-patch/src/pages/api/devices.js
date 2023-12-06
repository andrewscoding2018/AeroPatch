// src/pages/api/devices.js
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const params = {
        TableName: "YourDynamoDBTableName",
      };
      const { Items } = await dynamoDb.scan(params).promise();
      res.status(200).json({ devices: Items });
    } catch (error) {
      console.error("DynamoDB error:", error);
      res.status(500).json({ error: "Could not fetch devices" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
