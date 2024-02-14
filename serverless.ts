import { AWS } from "@serverless/typescript"
import { config } from "./serverless-config"

const serverlessConfiguration: AWS = {
    useDotenv: true,
    variablesResolutionMode: '20210326',
    service: 'nextjs_app',
    frameworkVersion: '3',
    configValidationMode: 'error',
    plugins: [
        'serverless-prune-plugin',
        'serverless-esbuild',
        'serverless-offline'
    ],
    provider: {
        logs: {
            restApi: true
        },
        stackName: 'nextjs_app',
        name: 'aws',
        region: 'us-east-2',
        deploymentMethod: 'direct',
        lambdaHashingVersion: '20201221',
        logRetentionInDays: 7,
        runtime: 'nodejs18.x',
        endpointType: 'REGIONAL',
        apiGateway: {
            disableDefaultEndpoint: true,
            shouldStartNameWithService: true
        },
        tracing: {
            apiGateway: true,
            lambda: true
        },
        deploymentBucket: ,
        cfnRole: 
    },
    params: config,
    custom: {
        stage: 'dev',
        'serverless-offline': {
            httpPort: 10120,
            lambdaPort: 10121,
            ignoreJWTSignature: true,
            prefix: 'nestjs_app',
            noPrependStageInUrl: true
        },
        esbuild: {
            minify: true,
            bundle: true,
            sourcemap: true,
            package: 'npm',
            target: 'node18',
            watch: {
                pattern: ['src/**/*.ts'],
                ignore: ['.serverless/**/*', '.build', '.esbuild']
            }
        },
        prune: {
            automatic: true,
            number: 5
        }
    },
    package: {
        patterns: ['!buildspec.yaml'],
        individually: true,
        excludeDevDependencies: true
    },
    functions: {
        app: {
            handler: 'src/index.handler',
            name: 'nextjs_app',
            timeout: 30,
            memorySize: 128,
            maximumRetryAttempts: 0,
            role: '',
            events: [
                {
                    http: {
                        method: 'POST',
                        path: '/search',
                        cors: true,
                        authorizer:,
                    }
                }
            ]
        }
    }
}

module.exports = serverlessConfiguration