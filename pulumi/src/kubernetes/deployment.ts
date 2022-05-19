import * as k8s from "@pulumi/kubernetes"

import { appName, fullImageNameOverride } from "../.imports/config"
import { namespace } from "./namespace"

export const fullImageName = fullImageNameOverride || require("../docker/build").fullImageUniqueName

const appLabels = { app: appName }
export const deployment = new k8s.apps.v1.Deployment("app-deployment", {
  metadata: {
    name: appName,
    namespace: namespace.metadata.name,
  },
  spec: {
    selector: { matchLabels: appLabels },
    template: {
      metadata: { labels: appLabels },
      spec: {
        containers: [
          {
            name: appName,
            image: fullImageName,
            ports: [
              {
                containerPort: 3000,
              },
            ],
            resources: {
              requests: {
                memory: "64Mi",
                cpu: "128m",
              },
              limits: {
                memory: "512Mi",
                cpu: "500m",
              },
            },
          },
        ],
      },
    },
  },
})
