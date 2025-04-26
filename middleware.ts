import { chain } from "@/middlewares/chain";
import withI18nMiddleware from "@/middlewares/middleware-lang";

export default chain([withI18nMiddleware]);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|sitemap-*.xml|server-sitemap.xml|ads.txt|sw.js|monetag.js|yandex_*.html|images|.*\\..*).*)",
    "/api/admin/:path*",
  ],
};
