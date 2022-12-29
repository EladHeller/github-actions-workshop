import fs from 'fs';
import * as prettyBytes from 'pretty-bytes';
import { StatsSummary } from './stats-types';
import getSummaryFromArtifacts from './getSummaryFromArtifacts';
import sendRequest from './sendGithubRequest';
import { deleteComment, getPrevIssue, parsePullRequestId } from './share';

const token = process.argv[2];

const COMMENT_START = '### Bundle Size Report';

function getSizeDescription(current: number, base: number, name: string) {
  const prettyCurrent = prettyBytes.default(current);
  if (current === base || base == null) {
    return `🔵 ${name} size: ${prettyCurrent}.`;
  }

  const increased = current > base;

  const difference = Math.abs(current - base);
  const differencePercentage = ((difference / base) * 100).toFixed(2);
  return `${increased ? '🔴' : '🟢'} ${name} size: ${prettyCurrent}, ${increased ? 'increased' : 'decreased'} by ${prettyBytes.default(Math.abs(current - base))} _(${differencePercentage}%)_.`;
}

function getCommentText(summary: StatsSummary, oldSummary?: StatsSummary) {
  if (!oldSummary) {
    return `${COMMENT_START}\n\n${
      Object.entries(summary).map(([key, value]) => `${key} size is **${prettyBytes.default(value)}**`).join('\n')}`;
  }

  return `${COMMENT_START}\n\n${
    Object.entries(summary).map(([key, value]) => getSizeDescription(value, oldSummary[key], key)).join('\n')}`;
}

async function setStatus(summary: StatsSummary, prId: string, oldSummary?: StatsSummary) {
  const body = getCommentText(summary, oldSummary);
  const prevComment = await getPrevIssue(prId, COMMENT_START);
  if (prevComment?.body === body) {
    console.log('Already updated.');
    return;
  }
  if (prevComment) {
    deleteComment(prevComment.id);
  }
  const path = `/repos/${process.env.GITHUB_REPOSITORY}/issues/${prId}/comments`;
  await sendRequest(path, 'POST', { body });
}

async function main() {
  if (token == null) {
    throw new Error('No access token');
  }
  const statsSummary: StatsSummary = JSON.parse(
    await fs.promises.readFile('./stats-summary.json', 'utf-8'),
  );
  const targetBranch = process.env.GITHUB_BASE_REF;
  const prId = parsePullRequestId(process.env.GITHUB_REF ?? '');
  if (!prId || !targetBranch) {
    console.log('No pr');
    return;
  }
  const oldSummary = await getSummaryFromArtifacts(targetBranch);

  await setStatus(statsSummary, prId, oldSummary);
}

main().catch((e) => {
  console.log(e.response?.data || e);
  process.exit(1);
});
