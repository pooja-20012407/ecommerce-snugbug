// src/utils/jwtUtils.ts
export function getUserRoleFromToken(token: string | null): string | null {
    if (!token) return null;
  
    try {
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = atob(payloadBase64);
      const payload = JSON.parse(decodedPayload);
      return payload.user_type || null;
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }
  