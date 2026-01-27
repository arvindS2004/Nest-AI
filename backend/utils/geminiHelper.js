const axios = require('axios');

async function callGeminiAPI(prompt, apiKey) {
  const availableModels = [
    'gemini-1.5-flash-latest',
    'gemini-1.5-flash',
    'gemini-1.5-pro-latest',
    'gemini-1.5-pro',
    'gemini-pro'
  ];

  let lastError = null;

  for (const modelName of availableModels) {
    try {
      console.log(`Trying model: ${modelName}`);
      
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
        {
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.9,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      if (response.data && response.data.candidates && response.data.candidates.length > 0) {
        console.log(`✓ Successfully using model: ${modelName}`);
        return response.data.candidates[0].content.parts[0].text;
      }
    } catch (error) {
      console.log(`✗ Model ${modelName} failed: ${error.response?.data?.error?.message || error.message}`);
      lastError = error;
      continue;
    }
  }

  throw lastError || new Error('All Gemini models failed');
}

module.exports = { callGeminiAPI };