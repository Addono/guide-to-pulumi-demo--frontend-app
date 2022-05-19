import * as k8s from "@pulumi/kubernetes"
import * as pulumi from "@pulumi/pulumi"

import { appName } from "../.imports/config"
import { deployment } from "./deployment"
import { namespace } from "./namespace"

export const service = new k8s.core.v1.Service("app-service", {
  metadata: {
    name: appName,
    namespace: namespace.metadata.name,
  },
  spec: {
    selector: deployment.spec.template.metadata.labels,
    type: 'LoadBalancer',
    ports: [
      {
        protocol: "TCP",
        port: 80,
        targetPort: 3000,
      },
    ],
  },
})

