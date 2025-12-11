import { jwtDecode } from "jwt-decode";
import { AttributeData } from "./types";

/** Checks if token is valid based on expiration */
export function isTokenValid(token: string | null) {
  if (!token) return null;
  const decodedToken = jwtDecode(token);
  const expirationTime = decodedToken.exp;
  const currentTime = Math.floor(Date.now() / 1000);
  return expirationTime >= currentTime;
}

export function scrollToElement(
  ref: React.MutableRefObject<HTMLDivElement | null>,
  offSet: number = 0
) {
  if (!ref) return;
  console.log("REF", ref);
  window.scroll({
    top: ref?.current?.offsetTop - offSet,
    behavior: "smooth",
  });
}

export function scrollIntoViewElement(element) {
  if (element.current) {
    element.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

/** Filters options => all options / matching options / no match = create... */
export function filterOptions(query, options, attribute, stableId): AttributeData[] {
  const q = query.trim().toLowerCase();
  if (options.length === 0) {
    return [
      {
        id: `create-${stableId}`,
        [attribute]: "+ create...",
      } as AttributeData,
    ];
  }

  // Collect matches (keep your original ordering)
  const matches = options.filter((opt) =>
    String(opt[attribute as keyof AttributeData] ?? "")
      .toLowerCase()
      .includes(q)
  );

  if (matches.length === 0) {
    // No matches → only create
    return [
      {
        id: `create-${stableId}`,
        [attribute]: "+ create...",
      } as AttributeData,
    ];
  }

  // Exact (case-insensitive) match present? then no create
  const hasExact = matches.some(
    (opt) =>
      String(opt[attribute as keyof AttributeData] ?? "")
        .trim()
        .toLowerCase() === q
  );
  if (hasExact) return matches;

  // Fuzzy matches exist but no exact → append create at the end
  return [
    ...matches,
    { id: `create-${stableId}`, [attribute]: "+ create..." } as AttributeData,
  ];
}
