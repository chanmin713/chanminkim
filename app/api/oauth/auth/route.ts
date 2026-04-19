import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  
  if (!clientId) {
    return new NextResponse('GitHub Client ID is not configured', { status: 500 });
  }

  // Decap CMS requires the 'repo' and 'user' scopes to commit files
  const redirectUri = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,user`;
  
  return NextResponse.redirect(redirectUri);
}
