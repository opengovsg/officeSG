#
# Builds a Docker image.
#
# Environment variables:
#
#   CONTAINER_REGISTRY - The hostname of your container registry.
#   VERSION - The version number to tag the images with.
#
# Parameters:
#
#   1 - The path to the code for the image and the name of the image.
#
# Usage:
#
#       ./scripts/build-image.sh <image-name>
#
# Example command line usage:
#
#       ./scripts/build-image.sh service
#

set -u # or set -o nounset
: "$1"
: "$CONTAINER_REGISTRY"
: "$VERSION"

export DIR=$1
docker build --build-arg BUILDPLATFORM=linux/amd64,linux/arm64 -t $CONTAINER_REGISTRY/officesg:$DIR-$VERSION --file ./$DIR/Dockerfile-prod  ./$DIR
