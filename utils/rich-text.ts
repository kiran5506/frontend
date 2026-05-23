const htmlTagRegex = /<[^>]+>/g;

export const looksLikeHtml = (value: unknown): value is string =>
  typeof value === 'string' && /<\/?[a-z][\s\S]*>/i.test(value);

export const htmlToPlainText = (html: string): string =>
  html
    .replace(htmlTagRegex, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
