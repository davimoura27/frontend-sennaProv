import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Serviço de autenticação
export const authService = {
    login: (token) => {
        localStorage.setItem('token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    
    logout: () => {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
    },
    
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};

export const loginUser = async (username, password) => {
    try {
        const response = await api.post('/auth/login', { username, password });
        
        if (response.status === 200 && response.data) {
            // Salva apenas o token
            authService.login(response.data.token);
            return {
                username,
                token: response.data.token
            };
        }
        throw new Error('Falha na autenticação');
    } catch (error) {
        console.error('[Login]:', error.message);
        throw error;
    }
};
