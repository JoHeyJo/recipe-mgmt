import { jwtDecode } from 'jwt-decode';

export function isTokenValid(token: string | null){
  if(!token) return null;
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp
    const currentTime = Math.floor(Date.now() / 1000)
    return expirationTime < currentTime;
}
