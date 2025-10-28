import errorHandler from "../utils/errorHandle"
import client from "../api/client.api";

export const checkServerConnect = async() =>{
    try {
        const res = await client.get('/api/v1/auth/health', { timeout: 3000 })        
        return res.message === 'ok';
    } catch (error) {
        errorHandler(error);
        return false;
    }
}