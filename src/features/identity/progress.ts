/**
 * Combined profile-completeness score shown on the identity step.
 * Onboarding (name/role/skills/etc.) is already done by this point, so
 * it contributes a flat base; the remaining half is earned by
 * connecting the four platforms below, in equal shares.
 */
const BASE_SCORE = 50;
const PER_CONNECTION_SCORE = 12.5;

export function calculateProfileCompletion(connectedCount: number): number {
  return Math.round(BASE_SCORE + connectedCount * PER_CONNECTION_SCORE);
}
