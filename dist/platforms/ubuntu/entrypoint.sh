#!/usr/bin/env bash

#
# Create directory for license activation
#

ACTIVATE_LICENSE_PATH="$GITHUB_WORKSPACE/_activate-license~"
mkdir -p "$ACTIVATE_LICENSE_PATH"

#
# Run steps
#
source /steps/startx.sh
source /steps/set_gitcredential.sh
source /steps/activate.sh
source /steps/build.sh
source /steps/return_license.sh

#
# Remove license activation directory
#

sleep 5
echo "$ACTIVATE_LICENSE_PATH"
ls "$ACTIVATE_LICENSE_PATH"
sleep 5
rm -r "$ACTIVATE_LICENSE_PATH"

#
# Instructions for debugging
#

sleep 5
if [[ $BUILD_EXIT_CODE -gt 0 ]]; then
echo ""
echo "###########################"
echo "#         Failure         #"
echo "###########################"
echo ""
echo "Please note that the exit code is not very descriptive."
echo "Most likely it will not help you solve the issue."
echo ""
echo "To find the reason for failure: please search for errors in the log above."
echo ""
fi;

#
# Exit with code from the build step.
#

sleep 5
exit $BUILD_EXIT_CODE
