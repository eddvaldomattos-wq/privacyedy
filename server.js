const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const axios = require('axios');
const { getToken } = require('./authService');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Servir arquivos estáticos do diretório public
app.use(express.static(path.join(__dirname, 'public')));

// Proxy para API SyncPay (contorna CORS)
app.use('/api/syncpay', createProxyMiddleware({
    target: 'https://api.syncpayments.com.br',
    changeOrigin: true,
    pathRewrite: {
        '^/api/syncpay': ''
    },
    onProxyReq: (proxyReq, req, res) => {
        console.log(`[PROXY] ${req.method} ${req.path} -> ${proxyReq.path}`);
        console.log(`[PROXY] URL completa: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`);
    },
    onProxyRes: (proxyRes, req, res) => {
        console.log(`[PROXY] Resposta: ${proxyRes.statusCode} - ${req.path}`);
        if (proxyRes.statusCode !== 200) {
            console.log(`[PROXY] Headers da resposta:`, proxyRes.headers);
        }
    },
    onError: (err, req, res) => {
        console.error('[PROXY] Erro:', err.message);
        res.status(500).json({ error: 'Erro no proxy para SyncPay', details: err.message });
    },
    logLevel: 'debug'
}));

// Rota protegida de exemplo - consulta de saldo
app.get('/balance', async (req, res) => {
    try {
        const token = await getToken();
        const response = await axios.get('https://api.syncpayments.com.br/api/partner/v1/balance', {
            headers: { Authorization: `Bearer ${token}` }
        });
        res.json(response.data);
    } catch (err) {
        console.error('[Balance] Erro ao obter saldo:', err.response?.data || err.message);
        res.status(500).json({
            message: 'Não foi possível obter o saldo',
            details: err.response?.data || err.message
        });
    }
});

// Rota de teste para verificar se o servidor está funcionando
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        message: 'Servidor funcionando corretamente'
    });
});

// Rota de teste para verificar o proxy
app.get('/api/test-syncpay', (req, res) => {
    res.json({
        message: 'Teste do proxy SyncPay',
        proxy_url: '/api/syncpay',
        target_url: 'https://api.syncpayments.com.br/api/v1',
        timestamp: new Date().toISOString()
    });
});

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📱 Acesse: http://localhost:${PORT}`);
    console.log(`🌐 Acesse externamente: http://0.0.0.0:${PORT}`);
    console.log(`🔧 Proxy SyncPay: http://localhost:${PORT}/api/syncpay`);
    console.log(`🧪 Teste do proxy: http://localhost:${PORT}/api/test-syncpay`);
});
