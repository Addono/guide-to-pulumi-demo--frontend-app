// Explicitely allow running code before importing
/* eslint-disable import/order */
import { registerK8sProvider } from "../transformations/k8sProvider"
import { clusterProvider } from "./clusterProvider"

registerK8sProvider(clusterProvider)

export { fullImageName } from "./deployment"

import { namespace } from "./namespace"
export const namespaceName = namespace.metadata.name

import { service } from "./networking"
export const hostname = service.status.loadBalancer.ingress

import "./networking"
