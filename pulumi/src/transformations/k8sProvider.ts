import * as k8s from "@pulumi/kubernetes"
import * as pulumi from "@pulumi/pulumi"

// Add any other resource types as needed
const isK8sResource = function (type: string): boolean {
  return type.startsWith("kubernetes:")
}

/**
 * registerK8sProvider registers a global stack transformation that sets the
 * kubernetes provider based on AKS credentials
 */
export function registerK8sProvider(provider: k8s.Provider): void {
  pulumi.runtime.registerStackTransformation((args) => {
    if (isK8sResource(args.type)) {
      args.opts["provider"] = provider
      return { props: args.props, opts: args.opts }
    }
    return undefined
  })
}
