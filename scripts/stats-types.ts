/** Partial type of stats chunk */
export type StatsChunk = {
  names: string[];
  files: string[];
  size: number;
  modules: [{
    name: string;
    size: number;
  }];
  origins: [{
    loc: string;
    module: string;
    moduleIdentifier: string;
    moduleName: string;
    request: string;
  }];
}

/**
 * Partial type of stats file
 */
export type StatsFile = {
  hash: string;
  version: string;
  time: number;
  builtAt: number;
  publicPath: string;
  outputPath: string;
  assetsByChunkName: Record<string, string[]>;
  assets: [{
    name: string;
    size: number;
    chunkIdHints: string[];
  }];
  chunks: StatsChunk[];
}
