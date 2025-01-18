export { default } from "next-auth/middleware";

export const config = {
    matcher: "/((?!api|auth(?!/logout).*|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"
};
