export const imageLoader = ({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality: number
}) =>
  `https://gmb.imgix.net/gmb-eng-values/${src}?w=${width}&q=${quality || 75}`
