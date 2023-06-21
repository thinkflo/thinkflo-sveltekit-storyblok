export const buildSrcSet = (
  image, //Storyblok image URL
  ratios = [{'mobile':0, 'desktop':0}], //Optional object must include mobile and desktop keys
  //accepted values '16:9' as string, or 0 which means no calculated ratio 
  breakpoints = [320, 360, 480, 560, 640, 768, 800, 880, 920, 960, 1024, 1280, 1440, 1600],
  focus = undefined,
  quality = 80,
  fitIn = false
) => {
  const aspect = (breakpoint, ratios) => {
      const ratio = ratios[breakpoint > 768 ? 'desktop' : 'mobile']?.split(':');
      return ratio === 0 || !ratio?.length ? 0 : Math.round(breakpoint * (parseFloat(ratio[1]) / parseFloat(ratio[0])));
  }
  if(image) {
      return breakpoints.reverse().map(breakpoint => `${image}/m/${fitIn ? "/fit-in/" : ""}${breakpoint}x${aspect(breakpoint, ratios)}${focus?`/filters:focal(${focus})`:'/smart' + `/filters:quality(${quality})${fitIn ? ":fill(transparent)" : ""}`} ${breakpoint}w`).join(',')
  }
}
