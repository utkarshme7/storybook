import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import getTsLoaderOptions from './ts_config';
import createForkTsCheckerInstance from './framework-preset-fork-ts-checker-plugin';

// eslint-disable-next-line global-require
jest.mock('fs', () => require('../../../../__mocks__/fs'));
jest.mock('path', () => ({
  resolve: () => 'tsconfig.json',
}));

const setupFiles = files => {
  // eslint-disable-next-line no-underscore-dangle, global-require
  require('fs').__setMockFiles(files);
};

describe('framework-preset-ts-fork-checker-plugin', () => {
  it('should create a ForkTsCheckerWebpackPlugin instance', () => {
    setupFiles({ 'tsconfig.json': '{}' });

    const tsLoaderOptions = getTsLoaderOptions('.foo');
    const instance = createForkTsCheckerInstance(tsLoaderOptions);

    expect(instance).toBeInstanceOf(ForkTsCheckerWebpackPlugin);
    expect(instance.tsconfig).toEqual(tsLoaderOptions.configFile);
  });

  it('should return null when configFile is not defined.', () => {
    const instance = createForkTsCheckerInstance({});
    expect(instance).toEqual(null);
  });
});
