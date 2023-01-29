import sendRequest from './sendGithubRequest';

async function main() {
  sendRequest('/repos/EladHeller/github-actions-workshop/statuses/HEAD/1234567890', 'POST', {
    state: 'success',
    target_url: 'example.com',
    description: 'This is a description',
    context: 'my-context',
  });
}

main();
