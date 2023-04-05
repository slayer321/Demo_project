
echo 'Before addiation ==>'\'"${BUILD_ENV_ARG}"\'

BUILD_ENV_ARG="--build-arg="${BUILD_ENV_ARG}" --build-arg=VERSION="${version}" --build-arg=GIT_BRANCH="${git_branch}" --build-arg=GIT_COMMIT_HASH="${git_commit_hash}""

echo 'After addition ==>'\'$BUILD_ENV_ARG\'

extra_build_args="$(eval echo "$BUILD_ENV_ARG")"

echo 'Print extra_build_args ==>'$extra_build_args



