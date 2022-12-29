import sendRequest from './sendGithubRequest';

export function parsePullRequestId(githubRef: string): string | undefined {
  const result = /refs\/pull\/(\d+)\/merge/g.exec(githubRef);
  if (!result) {
    return undefined;
  }
  const [, pullRequestId] = result;
  return pullRequestId;
}

export function deleteComment(commentId: number) {
  const path = `/repos/${process.env.GITHUB_REPOSITORY}/issues/comments/${commentId}`;
  return sendRequest(path, 'DELETE');
}

export async function getPrevIssue(prId: string, commentStart: string) {
  const res = await sendRequest(
    `/repos/${process.env.GITHUB_REPOSITORY}/issues/${prId}/comments`,
    'GET',
  );

  return res.find(({ body }: any) => body?.startsWith(commentStart));
}
