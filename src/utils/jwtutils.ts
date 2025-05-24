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
 // src/utils/jwtUtils.ts

 export const getUserDetailsFromToken = (token: string | null): { name: string; phone: string } => {
  if (!token) return { name: '', phone: '' };

  try {
    const base64Payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(base64Payload));

    console.log('Decoded JWT payload:', decodedPayload); // ✅ Log decoded info

    return {
      name: decodedPayload.sub || '', // ✅ Use sub as the name/email
      phone: '', // Empty since not in token
    };
  } catch (e) {
    console.error('Error decoding token', e);
    return { name: '', phone: '' };
  }
};




