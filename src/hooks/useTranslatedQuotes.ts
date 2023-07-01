// get selected language from redux store

import { Quote } from '@/lib/quotes'
import { baseUrl } from '../../sitemap'
import { useSelector } from 'react-redux'
import { selectLanguage } from '@/lib/redux/store'
import { useEffect, useState } from 'react'

export const useTranslatedQuotes = (quotes: Quote[]) => {
  const [data, setData] = useState(quotes)
  const { langCode } = useSelector(selectLanguage)

  useEffect(() => {
    if (langCode == 'en') return
    fetch(`${baseUrl}/api/v1/translate/${langCode}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res)
      })
  }, [langCode])

  if (langCode == 'en') return quotes

  return data
}
