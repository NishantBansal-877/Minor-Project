export const extractLabValues = (text: string, tests: any[]) => {
  const extracted: Record<string, string> = {};

  /*
   =========================================
   NORMALIZE OCR TEXT
   =========================================
  */

  const normalizedText = text
    .replace(/\r/g, "\n")
    .replace(/\t/g, " ")
    .replace(/[ ]+/g, " ");

  /*
   =========================================
   LINE BY LINE
   =========================================
  */

  const lines = normalizedText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  tests.forEach((test) => {
    const aliases = [
      test.name,
      test.key,
      test.name?.replace(/\s+/g, ""),
      test.name?.toLowerCase(),
    ].filter(Boolean);

    /*
     =========================================
     SEARCH LINES
     =========================================
    */

    for (const line of lines) {
      for (const alias of aliases) {
        /*
         =========================================
         MATCH TEST NAME
         =========================================
        */

        if (line.toLowerCase().includes(alias.toLowerCase())) {
          /*
           =========================================
           REMOVE TEST NAME
           =========================================
          */

          let cleaned = line.replace(new RegExp(alias, "i"), "");

          cleaned = cleaned.replace(/[:\-]/g, " ").trim();

          /*
           =========================================
           EXTRACT NUMBER FIRST
           =========================================
          */

          const numericMatch = cleaned.match(/([0-9]+(?:\.[0-9]+)?)/);

          if (numericMatch?.[1]) {
            extracted[test.key] = numericMatch[1];

            break;
          }

          /*
           =========================================
           EXTRACT STRING VALUES
           =========================================
          */

          const stringMatch = cleaned.match(
            /\b(positive|negative|reactive|non reactive|non-reactive|present|absent|normal|abnormal|few|many|nil|trace)\b/i,
          );

          if (stringMatch?.[1]) {
            extracted[test.key] = stringMatch[1];

            break;
          }

          /*
           =========================================
           FALLBACK
           =========================================
          */

          const words = cleaned.split(" ").filter(Boolean);

          if (words.length > 0) {
            extracted[test.key] = words.slice(0, 3).join(" ");

            break;
          }
        }
      }
    }
  });

  return extracted;
};
