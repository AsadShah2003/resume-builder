export const SanitizeInput = (input: string): string => {
  // Check for common SQL injection patterns
  const sqlInjectionPatterns = [
    /SELECT.*FROM/i,
    /INSERT.*INTO/i,
    /UPDATE.*SET/i,
    /DELETE.*FROM/i,
    /DROP.*TABLE/i,
    /ALTER.*TABLE/i,
    /UNION.*SELECT/i,
    /EXEC/i,
    /EXECUTE/i,
    /CREATE.*TABLE/i,
    /DECLARE/i,
    /TRUNCATE.*TABLE/i,
    /MERGE/i,
  ];

  // Check for the specific dangerous pattern
  const dangerousPattern = /('.*'|".*"|or 1=1|or '1'='1|or "1"="1)/i;

  // Check if the input matches any of the patterns
  for (const pattern of sqlInjectionPatterns) {
    if (pattern.test(input) || dangerousPattern.test(input)) {
      return ""; // Unsafe input, return empty string
    }
  }
  return input;
};
