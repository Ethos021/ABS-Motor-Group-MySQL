export function createPageUrl(pageName: string) {
  switch(pageName.toLocaleLowerCase()) {
    case "home": return "/";
    case "browse": return "/browse";
    case "sell": return "/sell";
    case "finance": return "/finance";
    case "about": return "/about";
    case "contact": return "/contact";
    default: return "/";
  }
}