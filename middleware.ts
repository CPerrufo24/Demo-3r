export const config = {
  matcher: '/((?!_vercel).*)',
};

export default function middleware(request: Request) {
  const auth = request.headers.get('authorization');

  if (auth?.startsWith('Basic ')) {
    const [user, pwd] = atob(auth.slice(6)).split(':');
    if (user === process.env.DEMO_USER && pwd === process.env.DEMO_PASSWORD) {
      return;
    }
  }

  return new Response('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="EstatePro Demo - 3R Connect"' },
  });
}
