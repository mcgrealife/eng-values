import { Quote } from '@/pages/api/v1/quotes'

const getQuotes = async () => {
  const res = await fetch('/api/quotes')
  return (await res.json()) as Quote[]
}

export const useQuotes = async () => await getQuotes() // simulating pattern when using RTK Query
