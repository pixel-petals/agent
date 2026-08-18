#!/usr/bin/env node
const { syncMarketplace } = require("./marketplace");
const { syncPlugins } = require("./plugins");

// npm sets npm_new_version during the version lifecycle
const version = process.env.npm_new_version;
if (!version) {
  console.error("sync-version must be run via npm version");
  process.exit(1);
}

syncMarketplace(version);
syncPlugins(version);
