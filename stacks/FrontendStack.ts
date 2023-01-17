import { ReactStaticSite, use, StackContext } from '@serverless-stack/resources';
import { ApiStack } from "./ApiStack";
import { StorageStack } from "./StorageStack";

export function FrontendStack({ stack, app }: StackContext) {
  const { itemApi, vendorApi } = use(ApiStack);
  const { bucket } = use(StorageStack);

  // Define our React app
  const site = new ReactStaticSite(stack, "ReactSite", {
    path: "frontend",
    // Pass in our environment variables
    environment: {
      REACT_APP_API_URL: itemApi.customDomainUrl && vendorApi.customDomainUrl || itemApi.url && vendorApi.url,
      REACT_APP_REGION: app.region,
      REACT_APP_BUCKET: bucket.bucketName,
    },
  });

  // Show the url in the output
  stack.addOutputs({
    SiteUrl: site.url,
  });
}