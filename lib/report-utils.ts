// ======================================================
// FILE: /src/lib/report-utils.ts
// ======================================================

export function buildReportRows({
  tests,
  values,
  gender,
}: {
  tests: any[];
  values: Record<string, any>;
  gender?: string;
}) {
  return tests.map((test) => {
    const value = values[test.key];

    return {
      key: test.key,

      name: test.name,

      value: value ?? "-",

      unit: test.unit || "-",

      reference: formatReferenceRange(test.referenceRange, gender),

      status: calculateStatus({
        value,
        referenceRange: test.referenceRange,
        gender,
      }),
    };
  });
}
export function formatReferenceRange(range: any, gender?: string) {
  if (!range) {
    return "-";
  }

  // ==========================================
  // STRING RANGE
  // ==========================================

  if (typeof range === "string") {
    return range;
  }

  // ==========================================
  // GENDER RANGE
  // ==========================================

  if (range.male || range.female) {
    const male = range.male ? `${range.male.min} - ${range.male.max} (M)` : "";

    const female = range.female
      ? `${range.female.min} - ${range.female.max} (F)`
      : "";

    return [male, female].filter(Boolean).join(" / ");
  }

  // ==========================================
  // NORMAL RANGE
  // ==========================================

  if (typeof range.min !== "undefined" && typeof range.max !== "undefined") {
    return `${range.min} - ${range.max}`;
  }

  return "-";
}

export function calculateStatus({
  value,
  referenceRange,
  gender,
}: {
  value: any;
  referenceRange: any;
  gender?: string;
}) {
  if (value === null || value === undefined || value === "") {
    return "normal";
  }

  const numericValue = Number(value);

  if (isNaN(numericValue)) {
    return "normal";
  }

  if (!referenceRange) {
    return "normal";
  }

  // ==========================================
  // GENDER RANGE
  // ==========================================

  if (referenceRange.male || referenceRange.female) {
    const normalizedGender =
      gender?.toLowerCase() === "female" ? "female" : "male";

    const range = referenceRange[normalizedGender];

    if (!range) {
      return "normal";
    }

    if (numericValue < range.min) {
      return "low";
    }

    if (numericValue > range.max) {
      return "high";
    }

    return "normal";
  }

  // ==========================================
  // NORMAL RANGE
  // ==========================================

  if (
    typeof referenceRange.min !== "undefined" &&
    typeof referenceRange.max !== "undefined"
  ) {
    if (numericValue < referenceRange.min) {
      return "low";
    }

    if (numericValue > referenceRange.max) {
      return "high";
    }
  }

  return "normal";
}
