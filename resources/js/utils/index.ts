export function createPageUrl(pageName: string) {
  switch(pageName) {
    case "Home": return "/";
    case "Browse": return "/browse";
    case "Sell": return "/sell";
    case "Finance": return "/finance";
    case "About": return "/about";
    case "Contact": return "/contact";
    default: return "/";
  }
}