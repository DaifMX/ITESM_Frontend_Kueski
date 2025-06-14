import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export default function getToken (type) {
    const token = Cookies.get(type);
    if (!token) return null;
    try {
        const payload = jwtDecode(token);
        return payload;

    } catch (err) {
        console.error('Invalid JWT in cookie "tkn":', err);
        return null;
    }
};