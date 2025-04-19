import { NextRequest } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export function tenantPath(path: string, tenant: string) {
  return path;
}
export function tenantUrl(path: string, tenant: string) {
  const tenantBaseUrl = BASE_URL?.includes(`://${tenant}.`)
    ? BASE_URL
    : BASE_URL?.replace("://", `://${tenant}.`);
  return new URL(tenantPath(path, tenant), tenantBaseUrl);
}

export function getHostnameAndPort(request: Request) {
  const hostnameWithPort = request.headers.get("host");
  const [realHostname, port] = hostnameWithPort!.split(":");

  let hostname;
  if (process.env.OVERRIDE_TENANT_DOMAIN) {
    hostname = process.env.OVERRIDE_TENANT_DOMAIN;
  } else {
    hostname = realHostname;
  }

  return [hostname, port];
}

export function buildUrl(
  applicationPath: string,
  tenant: string,
  request: NextRequest
) {
  const [hostname, port] = getHostnameAndPort(request);

  const portSuffix = port && port != "443" ? `:${port}` : "";
  const { protocol } = request.nextUrl;
  const tenantUrl = `${protocol}//${hostname}${portSuffix}/`;

  return new URL(tenantPath(applicationPath, tenant), tenantUrl);
}
