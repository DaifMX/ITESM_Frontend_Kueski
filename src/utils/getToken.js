import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export default function getToken() {
    const token = Cookies.get('tkn');
    if (!token) return null;
    console.log(token);
    try {
        const payload = jwtDecode(token);
        return payload;

    } catch (err) {
        console.error('Invalid JWT in cookie "tkn":', err);
        return null;
    }
};