export const removeTagString = (str: string): string => {
  return str.replace(
    /<div[^>]*>|<\/div>|<a[^>]*>|<\/a>|<p[^>]*>|<\/p>|<span[^>]*>|<\/span>|<br\s*\/?>|<img[^>]*>|<ul[^>]*>|<\/ul>|<li[^>]*>|<\/li>|\n/gi,
    "",
  );
};
