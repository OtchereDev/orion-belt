import type { Session } from "react-router";
import { createCookieSessionStorage, redirect } from "react-router";

interface SessionData {
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    user_id: number;
  };
  expiresAt: number;
  organizationId: string;
}

interface SessionFlashData {
  error: string;
  success: string;
}

// Create session storage
const sessionStorage = createCookieSessionStorage<
  SessionData,
  SessionFlashData
>({
  cookie: {
    name: "__session",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET!],
    secure:
      process.env.NODE_ENV === "production" && process.env.USE_HTTPS === "true",
  },
});

export async function getSession(request: Request) {
  return sessionStorage.getSession(request.headers.get("Cookie"));
}

export async function commitSession(session: Session) {
  return sessionStorage.commitSession(session);
}

export async function destroySession(session: Session) {
  return sessionStorage.destroySession(session);
}

// Get user from session
export async function getUser(request: Request) {
  const session = await getSession(request);
  const user = session.get("user");
  const accessToken = session.get("accessToken");
  const expiresAt = session.get("expiresAt");

  if (!user || !accessToken) {
    return null;
  }

  // Check if access token is expired
  if (expiresAt && Date.now() > expiresAt) {
    // Token expired, need to refresh
    return { user, needsRefresh: true };
  }

  return { user, needsRefresh: false };
}

// Get tokens from session
export async function getTokens(request: Request) {
  const session = await getSession(request);
  return {
    accessToken: session.get("accessToken"),
    refreshToken: session.get("refreshToken"),
  };
}

// Save auth data to session
export async function createUserSession({
  request,
  accessToken,
  refreshToken,
  user,
  organizationId,
  redirectTo,
}: {
  request: Request;
  accessToken: string;
  refreshToken: string;
  user: SessionData["user"];
  organizationId?: string | null;
  redirectTo: string;
}) {
  const session = await getSession(request);

  // Set session data
  session.set("accessToken", accessToken);
  session.set("refreshToken", refreshToken);
  session.set("user", user);
  // Access token expires in 15 minutes
  session.set("expiresAt", Date.now() + 15 * 60 * 1000);

  if (organizationId) {
    session.set("organizationId", organizationId);
  }

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

// Update access token in session
export async function updateAccessToken(
  request: Request,
  newAccessToken: string
) {
  const session = await getSession(request);
  session.set("accessToken", newAccessToken);
  session.set("expiresAt", Date.now() + 15 * 60 * 1000);
  return session;
}

// Logout - destroy session
export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
