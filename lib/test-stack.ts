import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3n from 'aws-cdk-lib/aws-s3-notifications';
import { Construct } from 'constructs';

export class TestStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const testQueue = new sqs.Queue(this, 'test-queue', { queueName: 'test-queue' });
    const testBucket = new s3.Bucket(this, 'test-bucket', { bucketName: 'test-bucket' });

    testBucket.addEventNotification(s3.EventType.OBJECT_CREATED_PUT, new s3n.SqsDestination(testQueue));
    // testBucket.addEventNotification(s3.EventType.OBJECT_CREATED_POST, new s3n.SqsDestination(testQueue));
  }
}
  