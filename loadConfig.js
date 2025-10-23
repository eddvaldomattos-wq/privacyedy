require('dotenv').config();

function getConfig() {
  return {
    gateway: process.env.GATEWAY || 'pushinpay',
    environment: process.env.ENVIRONMENT || 'production',
    generateQRCodeOnMobile: process.env.GENERATE_QR_CODE_ON_MOBILE === 'true',
    
    syncpay: {
      clientId: process.env.SYNCPAY_CLIENT_ID || '',
      clientSecret: process.env.SYNCPAY_CLIENT_SECRET || ''
    },
    
    pushinpay: {
      token: process.env.PUSHINPAY_TOKEN || ''
    },
    
    webhook: {
      baseUrl: process.env.WEBHOOK_BASE_URL || 'https://privacy-sync.vercel.app',
      secret: process.env.WEBHOOK_SECRET || ''
    },
    
    model: {
      name: process.env.MODEL_NAME || 'Aylla Victoria',
      handle: process.env.MODEL_HANDLE ? (process.env.MODEL_HANDLE.startsWith('@') ? process.env.MODEL_HANDLE : `@${process.env.MODEL_HANDLE}`) : '@ayllavictoriarx',
      bio: process.env.MODEL_BIO || 'Eu sou a rosinha mais irresistível que você vai conhecer...🔥aqui eu vou te mostrar meu lado malvadinho!😈gemendo, dando o c🤭de frente, de costas, de todo jeitinho... vc vai ter direito a um vídeo gemendo seu nome e meu WhatsApp pessoal, então vem logo matar essa curiosidade.'
    },
    
    plans: {
      monthly: {
        buttonId: process.env.PLAN_MONTHLY_BUTTON_ID || 'btn-1-mes',
        label: process.env.PLAN_MONTHLY_LABEL || '1 mês',
        priceLabel: process.env.PLAN_MONTHLY_PRICE_LABEL || 'R$ 19,90',
        price: parseFloat(process.env.PLAN_MONTHLY_PRICE) || 19.90,
        description: process.env.PLAN_MONTHLY_DESCRIPTION || 'Assinatura mensal'
      },
      quarterly: {
        buttonId: process.env.PLAN_QUARTERLY_BUTTON_ID || 'btn-3-meses',
        label: process.env.PLAN_QUARTERLY_LABEL || '3 meses (33% off)',
        priceLabel: process.env.PLAN_QUARTERLY_PRICE_LABEL || 'R$ 29,90',
        price: parseFloat(process.env.PLAN_QUARTERLY_PRICE) || 29.90,
        description: process.env.PLAN_QUARTERLY_DESCRIPTION || 'Assinatura trimestral'
      },
      semestrial: {
        buttonId: process.env.PLAN_SEMESTRIAL_BUTTON_ID || 'btn-6-meses',
        label: process.env.PLAN_SEMESTRIAL_LABEL || '6 meses (50% off)',
        priceLabel: process.env.PLAN_SEMESTRIAL_PRICE_LABEL || 'R$ 39,90',
        price: parseFloat(process.env.PLAN_SEMESTRIAL_PRICE) || 39.90,
        description: process.env.PLAN_SEMESTRIAL_DESCRIPTION || 'Assinatura semestral'
      }
    },
    
    redirectUrl: process.env.REDIRECT_URL || 'https://ayllaxxr.com/Aylla/obrigado2.html'
  };
}

function saveConfig(newConfig) {
  console.log('⚠️ Configuração salva em variáveis de ambiente (.env)');
  console.log('Para alterar configurações, edite o arquivo .env');
}

module.exports = { getConfig, saveConfig };
