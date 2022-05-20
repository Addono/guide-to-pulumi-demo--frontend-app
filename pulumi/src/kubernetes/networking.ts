import * as k8s from "@pulumi/kubernetes"
import * as pulumi from "@pulumi/pulumi"

import { dnsZone } from "../.imports/common-infra"
import { appName } from "../.imports/config"
import { deployment } from "./deployment"
import { namespace } from "./namespace"

/**
 * Build the domain name based on the stack name
 */
export const domainName = pulumi.interpolate`${pulumi.getStack()}.frontend.${dnsZone.name}`

export const service = new k8s.core.v1.Service("app-service", {
  metadata: {
    name: appName,
    namespace: namespace.metadata.name,
  },
  spec: {
    selector: deployment.spec.template.metadata.labels,
    ports: [
      {
        protocol: "TCP",
        port: 80,
        targetPort: 3000,
      },
    ],
  },
})

export const ingress = new k8s.networking.v1.Ingress(
  "app-ingress",
  {
    metadata: {
      name: `${appName}--${pulumi.getStack()}--ingress`,
      namespace: namespace.metadata.name,
    },
    spec: {
      ingressClassName: 'nginx',
      rules: [
        {
          host: domainName,
          http: {
            paths: [
              {
                path: "/",
                pathType: "Prefix",
                backend: {
                  service: {
                    name: service.metadata.name,
                    port: {
                      number: 80,
                    },
                  },
                },
              },
            ],
          },
        },
      ],
    },
  },
  {
    deleteBeforeReplace: true,
  }
)
