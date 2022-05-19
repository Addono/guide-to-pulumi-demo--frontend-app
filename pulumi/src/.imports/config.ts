import * as pulumi from "@pulumi/pulumi"
import { z } from "zod"

import * as packageConfig from "../../../app/package.json"

const config = new pulumi.Config()

/*
 * Pulumi configuration
 */
export const commonInfraStackName = config.require("common-infra-stack-name")

/*
 * Configs read from the app package.json
 */
export const appVersion: string = packageConfig.version
const packageAppName: string = packageConfig.name
export const appName = packageAppName.substring(packageAppName.lastIndexOf("/") + 1)

/*
 * Stack config values
 */
export const namespaceNameSuffix = config.require("namespace-suffix")
export const namespaceName = `${appName}--${namespaceNameSuffix}`
export const fullImageNameOverride = config.get("override-container-image-name")
