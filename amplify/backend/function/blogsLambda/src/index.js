/* Amplify Params - DO NOT EDIT
    ENV
    REGION
    STORAGE_BLOGSDB_ARN
    STORAGE_BLOGSDB_NAME
    STORAGE_BLOGSDB_STREAMARN
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    console.log('no parse:', event.body)
    console.log('parse:', JSON.parse(event.body))
    const blog = JSON.parse(event.body)
    console.log('blog data', blog)

    const params = {
        TableName: 'blogsDB-dev',
        Item: {
            "id": {
                S: blog.id
            },
            "userId": {
                S: blog.userId
            },
            "title": {
                S: blog.title
            },
            "body": {
                S: blog.body
            },
            "image": {
                S: blog.image
            }
        }
    }

    console.log(params)

    try {
        await docClient.put(params).promise()
        const body = {
            message: "Hello from Lambda"
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify(body),
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        };
        return response;
    } catch (err) {
        const body = {
            message: err
        }
        const response = {
            statusCode: 400,
            body: JSON.stringify(body),
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        };
        return response;
    }

    /*const body = {
        message: "Hello from Lambda"
    }
    const response = {
        statusCode: 200,
        body: JSON.stringify(body),
        headers: {
            "Access-Control-Allow-Origin": "*",
        }
    };
    return response;*/
};
