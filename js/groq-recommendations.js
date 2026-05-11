// js/groq-recommendations.js
// Calls your Supabase Edge Function securely. No Groq keys in the frontend!

const EDGE_FUNCTION_URL = 'https://klvqcyklmdcnlursflqv.supabase.co/functions/v1/get-recommendations';

async function getGroqRecommendations(scores, businessInfo = {}, language = 'en') {
  try {
    const res = await fetch(EDGE_FUNCTION_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ 
        action: 'groq', // This tells the Edge Function to use the Groq API
        scores, 
        businessInfo 
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Edge Function returned ${res.status}`);
    }

    const data = await res.json();
    if (!data.recommendations || !Array.isArray(data.recommendations)) {
      throw new Error('Invalid response from Edge Function');
    }

    return data.recommendations.map(r => ({
      icon:     r.icon     || '💡',
      priority: r.priority || 'MEDIUM',
      title:    language === 'sw' ? (r.titleSw || r.titleEn) : (r.titleEn || r.title),
      desc:     language === 'sw' ? (r.descSw  || r.descEn)  : (r.descEn  || r.desc),
      titleEn:  r.titleEn || r.title || '',
      titleSw:  r.titleSw || r.title || '',
      descEn:   r.descEn  || r.desc  || '',
      descSw:   r.descSw  || r.desc  || '',
    }));

  } catch (err) {
    console.warn('AI recommendations unavailable, using rule-based fallback:', err.message);
    return generateRecommendations(scores, language);
  }
}

const getGroqRecommendationsBilingual = (scores, businessInfo) =>
  getGroqRecommendations(scores, businessInfo, 'en');