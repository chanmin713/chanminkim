import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;

  if (!code) {
    return new NextResponse('No code provided', { status: 400 });
  }

  if (!clientId || !clientSecret) {
    return new NextResponse('OAuth credentials not configured', { status: 500 });
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return new NextResponse(`GitHub OAuth Error: ${data.error_description}`, { status: 400 });
    }

    const token = data.access_token;

    // Follows the exact Decap CMS handshake protocol:
    // 1. Popup sends "authorizing:github" to opener
    // 2. Opener echoes it back (handshake confirm)
    // 3. Popup sends "authorization:github:success:{token}" to opener
    const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>OAuth Callback</title></head>
<body>
<script>
(function() {
  var provider = "github";
  var token = "${token}";
  var origin = window.location.origin;

  // Step 1: Send handshake to opener
  window.opener.postMessage("authorizing:" + provider, origin);

  // Step 2: Wait for opener to echo handshake, then send token
  window.addEventListener("message", function(e) {
    if (e.data === "authorizing:" + provider) {
      window.opener.postMessage(
        "authorization:" + provider + ":success:" + JSON.stringify({ token: token, provider: provider }),
        e.origin
      );
    }
  }, false);
})();
</script>
</body>
</html>`;

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Cross-Origin-Opener-Policy': 'unsafe-none',
      },
    });
  } catch (error) {
    return new NextResponse('Authentication failed', { status: 500 });
  }
}
