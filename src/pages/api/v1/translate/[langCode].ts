import { baseQuotes } from '@/lib/quotes'
import { NextRequest, NextResponse } from 'next/server'

export const config = {
  runtime: 'edge',
}

export type Translated = GoogleTranslateResponse['data']['translations']
export default async function handler(req: NextRequest) {
  const langCode = req.nextUrl.searchParams.get('langCode')

  // Google cloud Translate REST API to avoid heavy node client (edge runtime)
  const res = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: baseQuotes.map((q) => q.quote),
        source: 'en',
        target: langCode,
        format: 'text',
      }),
    }
  )
  const translations = (await res.json()) as GoogleTranslateResponse

  // map responses back to Ids, and append base64 for imgix
  const translationsWithIds = translations.data.translations.map((t, idx) => {
    const quote = t.translatedText
    // btoa() isn't reliable for non-english chars; so use TextEncoder first
    // const quoteWithLineBreak = quote.replace('//', '<br>')
    const enconder = new TextEncoder()
    const encodedQuote = enconder.encode(quote)
    const encodedU8Arr = Array.from(encodedQuote)
    const quoteb64 = btoa(String.fromCharCode.apply(null, encodedU8Arr))
    return {
      id: idx,
      quote: baseQuotes[idx].quote, //english quote
      quoteb64, // translated and base64 for imgix
      title: baseQuotes[idx].title,
    }
  })

  return new Response(JSON.stringify(translationsWithIds), {
    headers: {
      'content-type': 'application/json',
      'Cache-Control': 's-maxage=3600', // starting small, 1hr // can cache bust via deploy if needed
    },
    status: 200,
  })
}

export type GoogleTranslateResponse = typeof translateExampleResponse
const translateExampleResponse = {
  data: {
    translations: [
      {
        translatedText: '',
      },
    ],
  },
}

export type ISO639 = (typeof ISOcodesMap)[number]['ISO639']

export const getFlagCode = (langCodeISO639: ISO639) =>
  ISOcodesMap.find((c) => c.ISO639 == langCodeISO639)?.ISO3166.toUpperCase()

export const ISOcodesMap = [
  {
    name: 'Afrikaans',
    ISO639: 'af',
    ISO3166: 'ZA',
  },
  {
    name: 'Albanian',
    ISO639: 'sq',
    ISO3166: 'AL',
  },
  {
    name: 'Amharic',
    ISO639: 'am',
    ISO3166: 'ET',
  },
  {
    name: 'Arabic',
    ISO639: 'ar',
    ISO3166: 'DZ',
  },
  {
    name: 'Armenian',
    ISO639: 'hy',
    ISO3166: 'AM',
  },
  {
    name: 'Assamese',
    ISO639: 'as',
    ISO3166: 'IN',
  },
  {
    name: 'Aymara',
    ISO639: 'ay',
    ISO3166: 'BO',
  },
  {
    name: 'Azerbaijani',
    ISO639: 'az',
    ISO3166: 'AZ',
  },
  {
    name: 'Bambara',
    ISO639: 'bm',
    ISO3166: 'ML',
  },
  {
    name: 'Basque',
    ISO639: 'eu',
    ISO3166: 'ES',
  },
  {
    name: 'Belarusian',
    ISO639: 'be',
    ISO3166: 'BY',
  },
  {
    name: 'Bengali',
    ISO639: 'bn',
    ISO3166: 'BD',
  },
  {
    name: 'Bhojpuri',
    ISO639: 'bho',
    ISO3166: 'IN',
  },
  {
    name: 'Bosnian',
    ISO639: 'bs',
    ISO3166: 'BA',
  },
  {
    name: 'Bulgarian',
    ISO639: 'bg',
    ISO3166: 'BG',
  },
  {
    name: 'Catalan',
    ISO639: 'ca',
    ISO3166: 'AD',
  },
  {
    name: 'Cebuano',
    ISO639: 'ceb',
    ISO3166: 'PH',
  },
  {
    name: 'Chinese (Simplified)',
    ISO639: 'zh-CN',
    ISO3166: 'CN',
  },
  {
    name: 'Chinese (Traditional)',
    ISO639: 'zh-TW',
    ISO3166: 'TW',
  },
  {
    name: 'Corsican',
    ISO639: 'co',
    ISO3166: 'FR',
  },
  {
    name: 'Croatian',
    ISO639: 'hr',
    ISO3166: 'HR',
  },
  {
    name: 'Czech',
    ISO639: 'cs',
    ISO3166: 'CZ',
  },
  {
    name: 'Danish',
    ISO639: 'da',
    ISO3166: 'DK',
  },
  {
    name: 'Dhivehi',
    ISO639: 'dv',
    ISO3166: 'MV',
  },
  {
    name: 'Dogri',
    ISO639: 'doi',
    ISO3166: 'IN',
  },
  {
    name: 'Dutch',
    ISO639: 'nl',
    ISO3166: 'NL',
  },
  {
    name: 'English',
    ISO639: 'en',
    ISO3166: 'US',
  },
  {
    name: 'Esperanto',
    ISO639: 'eo',
    ISO3166: 'IO',
  },
  {
    name: 'Estonian',
    ISO639: 'et',
    ISO3166: 'EE',
  },
  {
    name: 'Ewe',
    ISO639: 'ee',
    ISO3166: 'GH',
  },
  {
    name: 'Filipino (Tagalog)',
    ISO639: 'fil',
    ISO3166: 'PH',
  },
  {
    name: 'Finnish',
    ISO639: 'fi',
    ISO3166: 'FI',
  },
  {
    name: 'French',
    ISO639: 'fr',
    ISO3166: 'FR',
  },
  {
    name: 'Frisian',
    ISO639: 'fy',
    ISO3166: 'NL',
  },
  {
    name: 'Galician',
    ISO639: 'gl',
    ISO3166: 'ES',
  },
  {
    name: 'Georgian',
    ISO639: 'ka',
    ISO3166: 'GE',
  },
  {
    name: 'German',
    ISO639: 'de',
    ISO3166: 'DE',
  },
  {
    name: 'Greek',
    ISO639: 'el',
    ISO3166: 'GR',
  },
  {
    name: 'Guarani',
    ISO639: 'gn',
    ISO3166: 'PY',
  },
  {
    name: 'Gujarati',
    ISO639: 'gu',
    ISO3166: 'IN',
  },
  {
    name: 'Haitian Creole',
    ISO639: 'ht',
    ISO3166: 'HT',
  },
  {
    name: 'Hausa',
    ISO639: 'ha',
    ISO3166: 'NG',
  },
  {
    name: 'Hawaiian',
    ISO639: 'haw',
    ISO3166: 'US',
  },
  {
    name: 'Hebrew',
    ISO639: 'he',
    ISO3166: 'IL',
  },
  {
    name: 'Hindi',
    ISO639: 'hi',
    ISO3166: 'IN',
  },
  {
    name: 'Hmong',
    ISO639: 'hmn',
    ISO3166: 'MN',
  },
  {
    name: 'Hungarian',
    ISO639: 'hu',
    ISO3166: 'HU',
  },
  {
    name: 'Icelandic',
    ISO639: 'is',
    ISO3166: 'IS',
  },
  {
    name: 'Igbo',
    ISO639: 'ig',
    ISO3166: 'NG',
  },
  {
    name: 'Ilocano',
    ISO639: 'ilo',
    ISO3166: 'PH',
  },
  {
    name: 'Indonesian',
    ISO639: 'id',
    ISO3166: 'ID',
  },
  {
    name: 'Irish',
    ISO639: 'ga',
    ISO3166: 'IE',
  },
  {
    name: 'Italian',
    ISO639: 'it',
    ISO3166: 'IT',
  },
  {
    name: 'Japanese',
    ISO639: 'ja',
    ISO3166: 'JP',
  },
  {
    name: 'Javanese',
    ISO639: 'jv',
    ISO3166: 'ID',
  },
  {
    name: 'Kannada',
    ISO639: 'kn',
    ISO3166: 'IN',
  },
  {
    name: 'Kazakh',
    ISO639: 'kk',
    ISO3166: 'KZ',
  },
  {
    name: 'Khmer',
    ISO639: 'km',
    ISO3166: 'KH',
  },
  {
    name: 'Kinyarwanda',
    ISO639: 'rw',
    ISO3166: 'RW',
  },
  {
    name: 'Konkani',
    ISO639: 'gom',
    ISO3166: 'IN',
  },
  {
    name: 'Korean',
    ISO639: 'ko',
    ISO3166: 'KR',
  },
  {
    name: 'Krio',
    ISO639: 'kri',
    ISO3166: 'SL',
  },
  {
    name: 'Kurdish',
    ISO639: 'ku',
    ISO3166: 'IQ',
  },
  {
    name: 'Kurdish (Sorani)',
    ISO639: 'ckb',
    ISO3166: 'IQ',
  },
  {
    name: 'Kyrgyz',
    ISO639: 'ky',
    ISO3166: 'KG',
  },
  {
    name: 'Lao',
    ISO639: 'lo',
    ISO3166: 'LA',
  },
  {
    name: 'Latin',
    ISO639: 'la',
    ISO3166: 'VA',
  },
  {
    name: 'Latvian',
    ISO639: 'lv',
    ISO3166: 'LV',
  },
  {
    name: 'Lingala',
    ISO639: 'ln',
    ISO3166: 'CD',
  },
  {
    name: 'Lithuanian',
    ISO639: 'lt',
    ISO3166: 'LT',
  },
  {
    name: 'Luganda',
    ISO639: 'lg',
    ISO3166: 'UG',
  },
  {
    name: 'Luxembourgish',
    ISO639: 'lb',
    ISO3166: 'LU',
  },
  {
    name: 'Macedonian',
    ISO639: 'mk',
    ISO3166: 'MK',
  },
  {
    name: 'Maithili',
    ISO639: 'mai',
    ISO3166: 'IN',
  },
  {
    name: 'Malagasy',
    ISO639: 'mg',
    ISO3166: 'MG',
  },
  {
    name: 'Malay',
    ISO639: 'ms',
    ISO3166: 'MY',
  },
  {
    name: 'Malayalam',
    ISO639: 'ml',
    ISO3166: 'IN',
  },
  {
    name: 'Maltese',
    ISO639: 'mt',
    ISO3166: 'MT',
  },
  {
    name: 'Manx',
    ISO639: 'gv',
    ISO3166: 'IM',
  },
  {
    name: 'Maori',
    ISO639: 'mi',
    ISO3166: 'NZ',
  },
  {
    name: 'Marathi',
    ISO639: 'mr',
    ISO3166: 'IN',
  },
  {
    name: 'Marshallese',
    ISO639: 'mh',
    ISO3166: 'MH',
  },
  {
    name: 'Mongolian',
    ISO639: 'mn',
    ISO3166: 'MN',
  },
  {
    name: 'Montenegrin',
    ISO639: 'srp',
    ISO3166: 'ME',
  },
  {
    name: 'Nauruan',
    ISO639: 'na',
    ISO3166: 'NR',
  },
  {
    name: 'Nepali',
    ISO639: 'ne',
    ISO3166: 'NP',
  },
  {
    name: 'Northern Sotho',
    ISO639: 'nso',
    ISO3166: 'ZA',
  },
  {
    name: 'Norwegian',
    ISO639: 'no',
    ISO3166: 'NO',
  },
  {
    name: 'Norwegian Bokmål',
    ISO639: 'nb',
    ISO3166: 'NO',
  },
  {
    name: 'Norwegian Nynorsk',
    ISO639: 'nn',
    ISO3166: 'NO',
  },
  {
    name: 'Occitan',
    ISO639: 'oc',
    ISO3166: 'FR',
  },
  {
    name: 'Oriya',
    ISO639: 'or',
    ISO3166: 'IN',
  },
  {
    name: 'Oromo',
    ISO639: 'om',
    ISO3166: 'ET',
  },
  {
    name: 'Pashto',
    ISO639: 'ps',
    ISO3166: 'AF',
  },
  {
    name: 'Persian',
    ISO639: 'fa',
    ISO3166: 'IR',
  },
  {
    name: 'Polish',
    ISO639: 'pl',
    ISO3166: 'PL',
  },
  {
    name: 'Portuguese',
    ISO639: 'pt',
    ISO3166: 'PT',
  },
  {
    name: 'Punjabi',
    ISO639: 'pa',
    ISO3166: 'IN',
  },
  {
    name: 'Quechua',
    ISO639: 'qu',
    ISO3166: 'PE',
  },
  {
    name: 'Romanian',
    ISO639: 'ro',
    ISO3166: 'RO',
  },
  {
    name: 'Russian',
    ISO639: 'ru',
    ISO3166: 'RU',
  },
  {
    name: 'Samoan',
    ISO639: 'sm',
    ISO3166: 'WS',
  },
  {
    name: 'Sango',
    ISO639: 'sg',
    ISO3166: 'CF',
  },
  {
    name: 'Sanskrit',
    ISO639: 'sa',
    ISO3166: 'IN',
  },
  {
    name: 'Scots Gaelic',
    ISO639: 'gd',
    ISO3166: 'GB',
  },
  {
    name: 'Serbian',
    ISO639: 'sr',
    ISO3166: 'RS',
  },
  {
    name: 'Sesotho',
    ISO639: 'st',
    ISO3166: 'LS',
  },
  {
    name: 'Shona',
    ISO639: 'sn',
    ISO3166: 'ZW',
  },
  {
    name: 'Sindhi',
    ISO639: 'sd',
    ISO3166: 'PK',
  },
  {
    name: 'Sinhala',
    ISO639: 'si',
    ISO3166: 'LK',
  },
  {
    name: 'Slovak',
    ISO639: 'sk',
    ISO3166: 'SK',
  },
  {
    name: 'Slovenian',
    ISO639: 'sl',
    ISO3166: 'SI',
  },
  {
    name: 'Somali',
    ISO639: 'so',
    ISO3166: 'SO',
  },
  {
    name: 'Spanish',
    ISO639: 'es',
    ISO3166: 'ES',
  },
  {
    name: 'Sundanese',
    ISO639: 'su',
    ISO3166: 'ID',
  },
  {
    name: 'Swahili',
    ISO639: 'sw',
    ISO3166: 'TZ',
  },
  {
    name: 'Swedish',
    ISO639: 'sv',
    ISO3166: 'SE',
  },
  {
    name: 'Tajik',
    ISO639: 'tg',
    ISO3166: 'TJ',
  },
  {
    name: 'Tamil',
    ISO639: 'ta',
    ISO3166: 'IN',
  },
  {
    name: 'Tatar',
    ISO639: 'tt',
    ISO3166: 'RU',
  },
  {
    name: 'Telugu',
    ISO639: 'te',
    ISO3166: 'IN',
  },
  {
    name: 'Thai',
    ISO639: 'th',
    ISO3166: 'TH',
  },
  {
    name: 'Tigrinya',
    ISO639: 'ti',
    ISO3166: 'ER',
  },
  {
    name: 'Tongan',
    ISO639: 'to',
    ISO3166: 'TO',
  },
  {
    name: 'Tswana',
    ISO639: 'tn',
    ISO3166: 'BW',
  },
  {
    name: 'Turkish',
    ISO639: 'tr',
    ISO3166: 'TR',
  },
  {
    name: 'Turkmen',
    ISO639: 'tk',
    ISO3166: 'TM',
  },
  {
    name: 'Ukrainian',
    ISO639: 'uk',
    ISO3166: 'UA',
  },
  {
    name: 'Urdu',
    ISO639: 'ur',
    ISO3166: 'PK',
  },
  {
    name: 'Uyghur',
    ISO639: 'ug',
    ISO3166: 'CN',
  },
  {
    name: 'Uzbek',
    ISO639: 'uz',
    ISO3166: 'UZ',
  },
  {
    name: 'Venda',
    ISO639: 've',
    ISO3166: 'ZA',
  },
  {
    name: 'Vietnamese',
    ISO639: 'vi',
    ISO3166: 'VN',
  },
  {
    name: 'Welsh',
    ISO639: 'cy',
    ISO3166: 'GB',
  },
  {
    name: 'Wolof',
    ISO639: 'wo',
    ISO3166: 'SN',
  },
  {
    name: 'Xhosa',
    ISO639: 'xh',
    ISO3166: 'ZA',
  },
  {
    name: 'Yiddish',
    ISO639: 'yi',
    ISO3166: 'IL',
  },
  {
    name: 'Yoruba',
    ISO639: 'yo',
    ISO3166: 'NG',
  },
  {
    name: 'Zulu',
    ISO639: 'zu',
    ISO3166: 'ZA',
  },
]

export const langCodes = ISOcodesMap.map((c) => ({
  name: c.name,
  langCode: c.ISO639,
}))
