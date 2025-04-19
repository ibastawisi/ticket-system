const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const ROOT_TENANT = process.env.ROOT_TENANT;

export function tenantPath(path: string, tenant: string) {
  return path;
}
export function tenantUrl(path: string, tenant: string) {
  const tenantBaseUrl = BASE_URL?.includes(`://${tenant}.`)
    ? BASE_URL
    : tenant === ROOT_TENANT
    ? BASE_URL
    : BASE_URL?.replace("://", `://${tenant}.`);
  return new URL(tenantPath(path, tenant), tenantBaseUrl);
}
