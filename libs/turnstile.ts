// Simple in-memory token cache
// Key: token, Value: expiry timestamp
const tokenCache = new Map<string, number>();

// Clean expired tokens from cache every minute
setInterval(() => {
  const now = Date.now();
  Array.from(tokenCache.entries()).forEach(([token, expiry]) => {
    if (now > expiry) {
      tokenCache.delete(token);
    }
  });
}, 60 * 1000); // Run every minute

// Validate Turnstile token
export async function validateTurnstileToken(token: string) {
  try {
    // Check if token is in cache and not expired
    const cachedExpiry = tokenCache.get(token);
    if (cachedExpiry && Date.now() < cachedExpiry) {
      console.log("使用缓存令牌验证");
      return true;
    }

    // If not in cache or expired, validate with Cloudflare
    const formData = new FormData();
    formData.append(
      "secret",
      process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY || "",
    );
    formData.append("response", token);

    const result = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      },
    );

    const outcome = await result.json();
    console.log("Turnstile validation result:", outcome);

    if (outcome.success) {
      // Cache the validated token for 5 minutes
      tokenCache.set(token, Date.now() + 5 * 60 * 1000);
    }

    return outcome.success;
  } catch (error) {
    console.error("Turnstile validation error:", error);
    return false;
  }
} 