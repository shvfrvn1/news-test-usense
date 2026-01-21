const BASE_URL = 'https://content.guardianapis.com'
const API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY

interface RequestOptions {
  path: string
  params?: Record<string, string | number | undefined>
}

export const request = async <T>({
  path,
  params = {},
}: RequestOptions): Promise<T> => {
  const url = new URL(`${BASE_URL}${path}`)

  url.searchParams.set('api-key', API_KEY)

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value))
    }
  })

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  return response.json() as Promise<T>
}
