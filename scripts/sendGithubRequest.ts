const token = process.argv[2];
export default async function sendRequest(
  path: string,
  method: string,
  body?: unknown,
) {
  const headers = {
    Authorization: `token ${token}`,
    Accept: 'application/vnd.github.v3+json',
  };
  console.log(path, method);

  const res = await fetch(`https://api.github.com${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  if (res.headers.get('content-type')?.includes('application/json')) {
    return res.json();
  } if (res.headers.get('content-type')?.includes('application/zip')) {
    return res.arrayBuffer();
  }
  return res;
}
