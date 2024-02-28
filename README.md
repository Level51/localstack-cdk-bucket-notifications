# Localstack CDK bucket notifications

Demo/reproduction repository for testing AWS S3 bucket notifications updates with CDK and localstack.

## Setup

- clone the repo
- set your `LOCALSTACK_AUTH_TOKEN` in the .env file
- run `docker compose up`
- install dependencies using `npm install`
- set up the stack by running `npm run cdk:bootstrap` and `npm run cdk:deploy`
- check the bucket notification configuration using `npm run check`, the result should look like this

```json
{
  "QueueConfigurations": [
    {
      "Id": "9eb83c23",
      "QueueArn": "arn:aws:sqs:eu-central-1:000000000000:test-queue",
      "Events": ["s3:ObjectCreated:Put"]
    }
  ]
}
```

## Failing update case

- try to also listen to the `s3:ObjectCreated:Post` event by removing the comment on line 15 in the `lib/test-stack.ts` file
- running `npm run cdk:diff` shows that the change was recognized
- run `npm run cdk:deploy` again (should execute without any error)

### Result

The bucket configuration is still the same as before (run `npm run check` again to check it), the `s3:ObjectCreated:Post` event was NOT added as expected. Running `npm run cdk:diff` still shows the change as if it had not been deployed.
The localstack logs shows some warnings looking like this:

```
Unable to update resource type "AWS::S3::Bucket", id "testbucketE6E05ABE"
Unable to update resource type "AWS::SQS::QueuePolicy", id "testqueuePolicyB9530952"
Unable to update resource type "AWS::CloudFormation::CustomResource", id "testbucketNotifications794B1DC4"
```
