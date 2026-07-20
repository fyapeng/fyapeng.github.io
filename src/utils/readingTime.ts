const CJK_CHARACTER = /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g;
const LATIN_WORD = /[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g;

export function estimateReadingMinutes(markdown: string): number {
  const readableText = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[$*_>#|~=-]/g, " ");

  const cjkCharacters = readableText.match(CJK_CHARACTER)?.length ?? 0;
  const latinWords = readableText.replace(CJK_CHARACTER, " ").match(LATIN_WORD)?.length ?? 0;
  const estimatedMinutes = cjkCharacters / 500 + latinWords / 220;

  return Math.max(1, Math.ceil(estimatedMinutes));
}
