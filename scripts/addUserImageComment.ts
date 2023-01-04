import sendRequest from './sendGithubRequest';
import { deleteComment, getPrevIssue, parsePullRequestId } from './share';

const COMMENT_START = 'Don\'t break my repo!';

const token = process.argv[2];
async function main() {
  if (token == null) {
    throw new Error('No access token');
  }
  const user = await sendRequest('/user', 'GET');
  const prId = parsePullRequestId(process.env.GITHUB_REF ?? '');
  if (prId == null) {
    throw new Error('No PR id');
  }
  const body = `${COMMENT_START}\n\n![${user.login}](${user.avatar_url})`;
  const prevComment = await getPrevIssue(prId, COMMENT_START);
  if (prevComment?.body === body) {
    console.log('Already updated.');
    return;
  }
  if (prevComment) {
    deleteComment(prevComment.id);
  }

  const issueCommentPath = `/repos/${process.env.GITHUB_REPOSITORY}/issues/${prId}/comments`;
  const issueComment = {
    body,
  };
  await sendRequest(issueCommentPath, 'POST', issueComment);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
