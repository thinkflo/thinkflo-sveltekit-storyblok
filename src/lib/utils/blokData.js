export const hasRichText = (Blurb) => {
  return Boolean(Blurb?.content?.[0]?.content?.length || Blurb?.content?.[0]?.attrs?.body?.length);
}