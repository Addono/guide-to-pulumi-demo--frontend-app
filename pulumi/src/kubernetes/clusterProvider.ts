import * as azure from "@pulumi/azure-native"
import * as k8s from "@pulumi/kubernetes"

import { kubernetesCluster, kubernetesClusterResourceGroup } from "../.imports/common-infra"

// get cluster credentials
const creds = azure.containerservice.listManagedClusterUserCredentialsOutput({
  resourceGroupName: kubernetesClusterResourceGroup.name,
  resourceName: kubernetesCluster.name,
})

const kubeconfig = creds.apply((creds) => Buffer.from(creds.kubeconfigs[0].value, "base64").toString("ascii"))

export const clusterProvider = new k8s.Provider("aks-provider", {
  kubeconfig,
})
