/**
 * Product branding for this deployment (Token Stats).
 * Keep host/URL in one place so embeds, OAuth CSRF defaults, and metadata stay aligned.
 */

export const SITE_NAME = "Token Stats";
export const SITE_HOST = "token-stats.com";
export const SITE_URL = `https://${SITE_HOST}`;
export const SITE_GITHUB_URL = "https://github.com/Annihilater/token-stats";
export const SITE_TAGLINE =
  "Track, visualize, and compete on AI coding assistant token usage across Claude Code, Cursor, OpenCode, Codex, Gemini, Kimi, and Qwen.";

/** CLI binary / npm package name. */
export const CLI_BIN = "token-stats";
/** Recommended install via npm (default API is token-stats.com). */
export const CLI_INSTALL_CMD = `bunx ${CLI_BIN}@latest`;
export const CLI_LOGIN_CMD = `bunx ${CLI_BIN}@latest login`;
export const CLI_SUBMIT_CMD = `bunx ${CLI_BIN}@latest submit`;
export const CLI_LOGIN_SUBMIT_CMD = `${CLI_LOGIN_CMD} && ${CLI_SUBMIT_CMD}`;
/** Source install fallback when npm binaries are unavailable. */
export const CLI_SOURCE_INSTALL_CMD = `cargo install --git ${SITE_GITHUB_URL} --locked --bin ${CLI_BIN}`;
