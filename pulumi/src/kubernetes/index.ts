// Explicitely allow running code before importing
/* eslint-disable import/order */
import { registerK8sProvider } from "../.pulumi/k8sProvider"
import { clusterProvider } from "./clusterProvider"

registerK8sProvider(clusterProvider)

export { fullImageName } from "./deployment"

import { namespace } from "./namespace"
export const namespaceName = namespace.metadata.name

export  { domainName } from "./networking"
