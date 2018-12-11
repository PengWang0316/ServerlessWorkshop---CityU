'use strict';

const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const resultNumber = process.env.RESULT_NUMBER || 8;

const fetchBookTitles = number => dynamodb.scan({
  TableName: process.env.books_table,
  Limit: number,
  ProjectionExpression: 'image',
}).promise();

module.exports.handler = async (event, context, callback) => callback(null, {
  statusCode: 200,
  body: JSON.stringify(await fetchBookTitles(resultNumber)),
});
