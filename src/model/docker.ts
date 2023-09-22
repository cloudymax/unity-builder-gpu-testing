import { execWithErrorCheck } from './exec-with-error-check';
import ImageEnvironmentFactory from './image-environment-factory';
import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { ExecOptions } from '@actions/exec';
import { DockerParameters, StringKeyValuePair } from './shared-types';

class Docker {
  static async run(
    image: string,
    parameters: DockerParameters,
    silent: boolean = false,
    overrideCommands: string = '',
    additionalVariables: StringKeyValuePair[] = [],
    // eslint-disable-next-line unicorn/no-useless-undefined
    options: ExecOptions | undefined = undefined,
    entrypointBash: boolean = false,
    errorWhenMissingUnityBuildResults: boolean = true,
  ) {
    let runCommand = '';
    switch (process.platform) {
      case 'linux':
        runCommand = this.getLinuxCommand(image, parameters, overrideCommands, additionalVariables, entrypointBash);
        break;
      case 'win32':
        runCommand = this.getWindowsCommand(image, parameters);
    }
    if (options) {
      options.silent = silent;
      await execWithErrorCheck(runCommand, undefined, options, errorWhenMissingUnityBuildResults);
    } else {
      await execWithErrorCheck(runCommand, undefined, { silent }, errorWhenMissingUnityBuildResults);
    }
  }

  static getLinuxCommand(
    image: string,
    parameters: DockerParameters,
    overrideCommands: string = '',
    additionalVariables: StringKeyValuePair[] = [],
    entrypointBash: boolean = false,
  ): string {
    const { workspace, actionFolder, runnerTempPath, sshAgent, gitPrivateToken, dockerWorkspacePath } = parameters;

    const githubHome = path.join(runnerTempPath, '_github_home');
    if (!existsSync(githubHome)) mkdirSync(githubHome);
    const githubWorkflow = path.join(runnerTempPath, '_github_workflow');
    if (!existsSync(githubWorkflow)) mkdirSync(githubWorkflow);
    const commandPrefix = image === `alpine` ? `/bin/sh` : `/bin/bash`;


export default Docker;
