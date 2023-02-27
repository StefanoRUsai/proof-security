export const sanitizeText = (text: string): string => {
  const regex = /<\/?([a-z][a-z0-9]*)\b[^>]*>|<!--[\s\S]*?-->/gi;
  return text.replace(regex, "");
};

export function sanitizeInput(input: string): string {
  const sanitizedInput = input.replace(/[^\w\s]/gi, "");
  return sanitizedInput.trim();
}
