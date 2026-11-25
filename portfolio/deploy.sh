#!/usr/bin/env bash
# Refuse de livrer une image dont la signature Cosign n'a pas été produite par le pipeline.
set -euo pipefail
IMAGE="${1:?usage: deploy.sh <image:tag|image@digest>}"
REPO="${GITHUB_REPOSITORY:-Narjess805/devsecops-portfolio}"
IDENTITY="${COSIGN_IDENTITY_REGEXP:-^https://github.com/${REPO}/\.github/workflows/ci\.yml@refs/heads/main$}"
ISSUER="https://token.actions.githubusercontent.com"

echo "Vérification de la signature de ${IMAGE}..."
if ! OUT=$(cosign verify "$IMAGE" \
      --certificate-identity-regexp "$IDENTITY" \
      --certificate-oidc-issuer "$ISSUER" 2>&1); then
  echo "ERREUR : ${IMAGE} n'a pas de signature valide produite par le pipeline. Déploiement bloqué."
  echo "--- détail cosign ---"
  echo "$OUT" | tail -5
  exit 1
fi
echo "Image signée par le pipeline. Déploiement autorisé."
