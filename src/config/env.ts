const API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY

function getApiKey(): string {
  const key = typeof API_KEY === 'string' ? API_KEY.trim() : ''
  if (!key) {
    throw new Error(
      'VITE_GUARDIAN_API_KEY is missing. Add it to your .env file (see .env.example).'
    )
  }
  return key
}

export { getApiKey }
