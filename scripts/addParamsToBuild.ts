import sendRequest from './sendGithubRequest';

const token = process.argv[2];
async function main() {
  if (token == null) {
    throw new Error('No access token');
  }
  const user = await sendRequest('/user', 'GET');
  process.stdout.write(user.avatar_url);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
