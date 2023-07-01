import { baseUrl } from '../../sitemap'

// https://developer.chrome.com/docs/lighthouse/accessibility/

const titles = {
  home: 'GetMyBoat Engineering Values, by Michael McGreal',
  about: 'Tech used to build this app, mimics GetMyBoat',
}
export const openGraphAndMeta = (page: 'home' | 'about') => (
  <>
    <title>{titles[page]}</title>
    <meta name='description' content={titles[page]} />
    <meta property='og:image' content={`${baseUrl}/api/v1/og`} />
    <meta property='twitter:image' content={`${baseUrl}/api/v1/og`} />
    <meta name='twitter:card' content='summary_large_image' />
    <meta name='twitter:site' content='@mcgrealife' />
    <meta name='twitter:title' content={titles[page]} />
    <meta name='twitter:description' content={titles[page]} />
    <meta property='og:url' content={baseUrl}></meta>
    <meta property='og:title' content={titles[page]} />
    <meta property='og:description' content={titles[page]} />
    <meta property='twitter:image' content={`${baseUrl}/api/og`} />
  </>
)
