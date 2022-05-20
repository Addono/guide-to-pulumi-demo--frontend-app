import * as pulumi from "@pulumi/pulumi"
import * as azure from "@pulumi/azure-native"

import { commonInfraStackName } from "./config"

// Retrieve a reference to this stack
const stack = new pulumi.StackReference(`AdriaanKnapenEficode/guide-to-pulumi--common-infra/${commonInfraStackName}`)

/**
 * Import the AKS cluster
 */
const kubernetesClusterOutput = stack.getOutput("kubernetesCluster")
export const kubernetesCluster = azure.containerservice.getManagedClusterOutput({
  resourceGroupName: kubernetesClusterOutput.apply((output) => output.resourceGroupName),
  resourceName: kubernetesClusterOutput.apply((output) => output.resourceName),
})

export const kubernetesClusterResourceGroup = azure.resources.getResourceGroupOutput({
  resourceGroupName: kubernetesClusterOutput.apply((output) => output.resourceGroupName),
})

/**
 * Import the ACR container registry
 */
const AcrOutput = stack.getOutput("containerRegistry")
export const containerRegistry = azure.containerregistry.getRegistryOutput({
  resourceGroupName: AcrOutput.apply((output) => output.resourceGroupName),
  registryName: AcrOutput.apply((output) => output.registryName),
})

export const containerRegistryResourceGroup = azure.resources.getResourceGroupOutput({
  resourceGroupName: AcrOutput.apply((output) => output.resourceGroupName),
})

/**
 * DNS
 */
const DnsOutput = stack.getOutput("dnsZone")
export const dnsResourceGroup = azure.resources.getResourceGroupOutput({
  resourceGroupName: DnsOutput.apply((o) => o.resourceGroupName),
})
export const dnsZone = azure.network.getZoneOutput({
  resourceGroupName: dnsResourceGroup.name,
  zoneName: DnsOutput.apply((output) => output.zoneName),
})
