#!/usr/bin/env bash

# just to ensure we are in the root of the git repo to avoid any confusion
pushd $(git rev-parse --show-toplevel)

git config diff.lockb.textconv bun --replace-all
git config diff.lockb.binary true --replace-all

popd
