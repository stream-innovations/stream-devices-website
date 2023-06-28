import { AstroAWS } from "@astro-aws/constructs";
import * as cdk from "aws-cdk-lib";
import { CfnOutput, Duration } from "aws-cdk-lib";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import {
  CachePolicy,
  CacheQueryStringBehavior,
} from "aws-cdk-lib/aws-cloudfront";
import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb";
import { AccessKey, Effect, User } from "aws-cdk-lib/aws-iam";
import { ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";
// import * as PolicyStatement from "cdk-iam-floyd";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const streamdevicesCert = Certificate.fromCertificateArn(
      this,
      "streamdevicesCert",
      "arn:aws:acm:us-east-1:615256776167:certificate/47567bde-9915-4b69-9274-8b0f271def89"
    );

    const cachePolicy = new CachePolicy(this, "streamdevicesCachePolicy", {
      maxTtl: Duration.days(365),
      minTtl: Duration.seconds(5),
      defaultTtl: Duration.minutes(15),
      // queryStringBehavior: CacheQueryStringBehavior.allowList(),
    });

    const astroAws = new AstroAWS(this, "quotes-app", {
      websiteDir: "../",
      output: "server",
      cdk: {
        cloudfrontDistribution: {
          domainNames: ["streamdevices.shop"],
          certificate: streamdevicesCert,
          defaultBehavior: {
            cachePolicy: cachePolicy,
          },
        },
        lambdaFunction: {
          environment: {
            PUBLIC_BASE_URL: "https://store.streamdevices.shop",
          },
        },
      },
    });

    const streamdevicesHostedZone = HostedZone.fromLookup(
      this,
      "streamdevicesHostedZone",
      {
        domainName: "streamdevices.shop",
      }
    );

    new ARecord(this, "domain-alias", {
      zone: streamdevicesHostedZone,
      recordName: "streamdevices.shop",
      target: RecordTarget.fromAlias(
        new CloudFrontTarget(astroAws.cdk.cloudfrontDistribution)
      ),
    });

    if (!astroAws.cdk.lambdaFunction) {
      throw Error("Unable to get lambda ref");
    }

    new CfnOutput(this, "WebsiteDomain", {
      value: astroAws.cdk.cloudfrontDistribution.distributionDomainName,
    });
  }
}
