#!/bin/bash

git_rev=$(git rev-parse --short HEAD)
git_origin=$(git remote -v | grep '^origin.*\(push\)' | awk '{ print $2 }')

clean_source=_clean_source
gh_pages_dir=_github_pages
source_branch=source
output_branch=master

for path in $clean_source $gh_pages_dir; do
  if [[ -d $path ]]; then
    rm -r --interactive=never $path
  fi &&
  git clone . $path || exit $?
done

pushd $clean_source &&
  git checkout -f $source_branch &&
  bundle exec jekyll build &&
  popd || exit $?

pushd $gh_pages_dir &&
  git checkout -f $output_branch &&
  rm -rf blog &&
  mkdir blog &&
  cp -r ../$clean_source/_site/* blog &&
  cp ../$clean_source/_index.html index.html &&
  mv blog/{feed.xml,robots.txt} . &&
  git add -A . &&
  git commit -m "build from $git_rev" &&
  git remote add github $git_origin
  git push $git_origin $output_branch:gh-pages &&
  git push &&
  popd &&
  git push
