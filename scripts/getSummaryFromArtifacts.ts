import yauzl from 'yauzl';
import fs from 'fs';
import sendRequest from './sendGithubRequest';
import { StatsSummary } from './stats-types';

export default async function getSummaryFromArtifacts(
  branch: string,
): Promise<StatsSummary | undefined> {
  try {
    const workflowRes = await sendRequest(`/repos/${process.env.GITHUB_REPOSITORY}/actions/workflows`, 'GET');
    const workflow = workflowRes.workflows.find(({ path }: any) => path === '.github/workflows/bundle-size.yml');
    console.log({ workflow });
    const runsRes = await sendRequest(
      `/repos/${process.env.GITHUB_REPOSITORY}/actions/workflows/${
        workflow.id
      }/runs?branch=${branch}&status=completed&conclusion=failure&per_page=1`,
      'GET',
    );
    const run = runsRes.workflow_runs[0];

    const artifactsRes = await sendRequest(
      `/repos/${process.env.GITHUB_REPOSITORY}/actions/runs/${run.id}/artifacts`,
      'GET',
    );
    const artifact = artifactsRes.artifacts[0];
    console.log(artifact);
    const downloadRes: ArrayBuffer = await sendRequest(
      `/repos/${process.env.GITHUB_REPOSITORY}/actions/artifacts/${artifact.id}/zip`,
      'GET',
    );

    const targetZipPath = 'summary.zip';
    fs.writeFileSync(targetZipPath, Buffer.from(downloadRes));

    const summary: StatsSummary = await new Promise((resolve) => {
      yauzl.open(targetZipPath, { lazyEntries: true }, (err, zipfile) => {
        if (err) { throw err; }
        zipfile.readEntry();
        zipfile.on('entry', (entry) => {
          let body = '';
          zipfile.openReadStream(entry, (streamError, readStream) => {
            if (streamError) { throw streamError; }
            readStream.on('end', () => {
              console.log('read end - ', body);
              zipfile.readEntry();
              resolve(JSON.parse(body));
            });
            readStream.on('data', (chunk) => {
              body += chunk.toString();
            });
          });
        });
      });
    });
    return summary;
  } catch (e) {
    console.log('Failed to get summary of target branch', e);
    return undefined;
  }
}
