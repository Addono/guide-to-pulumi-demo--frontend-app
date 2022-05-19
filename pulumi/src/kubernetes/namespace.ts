import * as k8s from "@pulumi/kubernetes"

import { namespaceName } from "../.imports/config"

// Create a new namespace to put all resources in
export const namespace = new k8s.core.v1.Namespace("app-namespace", {
  metadata: {
    name: namespaceName,
  },
})
