import sha256 from 'js-sha256';

export function getSecretRoomId(userId, targetUserId) {
  // Sort user IDs to ensure consistency
  return sha256([userId, targetUserId].sort().join('$'));
}
