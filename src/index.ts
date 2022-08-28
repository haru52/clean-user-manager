#!/usr/bin/env node

import DiManager from './di-manager';

async function main() {
  const { consoleUi, userRepository } = new DiManager();
  await consoleUi.handle();

  userRepository.close();
}

main();
