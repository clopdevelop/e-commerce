export { auth as middleware } from "./app/auth"

export const config = {
  matcher: ['/dashboard/:path*',"/((?!api|_next/static|_next/image|favicon.ico).*)"],

};

