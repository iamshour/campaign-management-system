#!/bin/bash

set -o pipefail

main() {
  if helm_deployment_exists; then
    deploy_with_helm
  elif kubectl_deployment_exists; then
    deploy_with_kubectl
  else
    printf "%s\n" "No deployment file found" >&2
    return 1
  fi
}

helm_deployment_exists() {
  [[ -f "./deployments/${CI_PROJECT_NAME}/values.yaml" ]]
}

deploy_with_helm() {
  local template_path="./deployments/${CI_PROJECT_NAME}/values.tmpl"
  local values_path="./deployments/${CI_PROJECT_NAME}/values.yaml"

  if ! envsubst < "${template_path}" > "${values_path}"; then
    printf "%s\n" "Failed to generate values.yaml from template" >&2
    return 1
  fi

  if ! helm upgrade -i --dry-run "${CI_PROJECT_NAME}" "./deployments/${CI_PROJECT_NAME}" -f "${values_path}" -n "${NAMESPACE}" || \
     ! helm upgrade -i "${CI_PROJECT_NAME}" "./deployments/${CI_PROJECT_NAME}" -f "${values_path}" -n "${NAMESPACE}" --version "${APP_VERSION}" --wait --timeout 600s; then
    printf "%s\n" "Helm upgrade failed, attempting rollback..." >&2
    rollback_helm_deployment
  else
    printf "%s\n" "Helm upgrade succeeded"
  fi
}

rollback_helm_deployment() {
  local previous_version
  previous_version=$(helm history -n "${NAMESPACE}" "${CI_PROJECT_NAME}" | awk 'END{if(NR>1)print $(NR-1)}')

  if [[ -z "${previous_version}" || "${previous_version}" == "0" ]]; then
    printf "%s\n" "No previous version found for rollback" >&2
    return 1
  else
    if ! helm rollback -n "${NAMESPACE}" "${CI_PROJECT_NAME}" "${previous_version}" --wait --timeout 600s; then
      printf "%s\n" "Helm rollback failed" >&2
      return 1
    else
      printf "%s\n" "Helm rollback to version ${previous_version} succeeded"
    fi
  fi
}

kubectl_deployment_exists() {
  [[ -f "./deployments/deployment.tmpl" ]]
}

deploy_with_kubectl() {
  local template_path="./deployments/deployment.tmpl"
  local deployment_path="./deployments/deployment.yaml"

  if ! envsubst < "${template_path}" > "${deployment_path}"; then
    printf "%s\n" "Failed to generate deployment.yaml from template" >&2
    return 1
  fi

  if ! kubectl apply -f "${deployment_path}"; then
    printf "%s\n" "kubectl apply failed" >&2
    return 1
  fi

  if ! kubectl rollout restart deployment "${CI_PROJECT_NAME}" -n "${NAMESPACE}" || \
     ! kubectl rollout status deployment "${CI_PROJECT_NAME}" -n "${NAMESPACE}" --timeout=300s; then
    printf "%s\n" "Deployment or rollout status check failed, attempting rollback..." >&2
    rollback_kubectl_deployment
  else
    printf "%s\n" "Deployment succeeded"
    annotate_kubectl_deployment
  fi
}

rollback_kubectl_deployment() {
  if ! kubectl rollout undo deployment "${CI_PROJECT_NAME}" -n "${NAMESPACE}"; then
    printf "%s\n" "kubectl rollout undo failed" >&2
    return 1
  else
    printf "%s\n" "kubectl rollout undo succeeded"
  fi
}

annotate_kubectl_deployment() {
  if ! kubectl annotate deployments.apps "${CI_PROJECT_NAME}" -n "${NAMESPACE}" kubernetes.io/change-cause="version ${APP_VERSION}" --overwrite=true; then
    printf "%s\n" "Failed to annotate deployment with version" >&2
    return 1
  fi
}

main "$@"

# if [ -f ./deployments/"$CI_PROJECT_NAME"/values.yaml ]; then
#     envsubst < ./deployments/"$CI_PROJECT_NAME"/values.tmpl > ./deployments/"$CI_PROJECT_NAME"/values.yaml
#     helm upgrade -i --dry-run "$CI_PROJECT_NAME" ./deployments/"$CI_PROJECT_NAME" -f ./deployments/"$CI_PROJECT_NAME"/values.yaml -n "$NAMESPACE" || { echo "helm upgrade --dry-run failed"; exit 1;}
#     echo "dry run checks out, upgrading..."
#     helm upgrade -i "$CI_PROJECT_NAME" ./deployments/"$CI_PROJECT_NAME" -f ./deployments/"$CI_PROJECT_NAME"/values.yaml -n "$NAMESPACE" --version "$APP_VERSION" --wait --timeout 600s
#     helm_upgrade_exit_status=$?
#     export helm_upgrade_exit_status
#     if [ "$helm_upgrade_exit_status" -eq 0 ]; then
#         echo "helm upgrade succeeded"
#         exit 0
#     else
#         echo "helm upgrade failed, exit status: $helm_upgrade_exit_status"
#         echo "Rolling back to the previous version..."
#         previous_version=$(helm history -n "$NAMESPACE" "$CI_PROJECT_NAME" | tail -n 1 | awk '{print $1}' | head -n 1)
#         export previous_versi
#         if [ "$previous_version" -eq 0 ]; then
#             echo "no previous version found"
#             exit 1
#         else
#             echo "rolling back to version $previous_version"
#             helm rollback -n "$NAMESPACE" "$CI_PROJECT_NAME" "$previous_version" --wait --timeout 600s
#             helm_rollback_exit_status=$?
#             export helm_rollback_exit_status
#             if [ "$helm_rollback_exit_status" -eq 0 ]; then
#                 echo "helm rollback succeeded"
#                 exit 1
#             else
#                 echo "helm rollback failed, exit status: $helm_rollback_exit_status"
#                 exit 1
#             fi
#         fi
#     fi
# elif [ -f ./deployments/deployment.tmpl ]; then
#   envsubst < ./deployments/deployment.tmpl > ./deployments/deployment.yaml
#   kubectl apply -f ./deployments/deployment.yaml
#   kubectl rollout restart deployment "${CI_PROJECT_NAME}" -n "$NAMESPACE"
#   if kubectl rollout status deployment "${CI_PROJECT_NAME}" -n "$NAMESPACE" --timeout=300s; then
#     echo "Deployment succeeded"
#     kubectl annotate deployments.apps "${CI_PROJECT_NAME}" -n "$NAMESPACE" kubernetes.io/change-cause="version ${version}" --overwrite=true
#     kubectl rollout history deployment "${CI_PROJECT_NAME}" -n "$NAMESPACE" | tail -n 2 | echo "Deployment revision: $(awk '{print $1}' | head -n 1)"
#   else
#     echo "Deployment failed"
#     kubectl rollout undo deployment "${CI_PROJECT_NAME}" -n "$NAMESPACE"
#     kubectl rollout history deployment "${CI_PROJECT_NAME}" -n "$NAMESPACE" | tail -n 2 | echo "Deployment revision: $(awk '{print $1}' | head -n 1)"
#     exit 1
#   fi
# else
#     echo "no deployment file found"
#     exit 1
# fi