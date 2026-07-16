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

/** Local binary / clap name after install. */
export const CLI_BIN = "token-stats";
/**
 * npm package to install via bunx/npx.
 * Unscoped `token-stats` is blocked by npm (too similar to existing `tokenstats`).
 */
export const CLI_NPM_PACKAGE = "@token-stats/cli";
/** Recommended install via npm (default API is token-stats.com). */
export const CLI_INSTALL_CMD = `bunx ${CLI_NPM_PACKAGE}@latest`;
export const CLI_LOGIN_CMD = `bunx ${CLI_NPM_PACKAGE}@latest login`;
export const CLI_SUBMIT_CMD = `bunx ${CLI_NPM_PACKAGE}@latest submit`;
export const CLI_LOGIN_SUBMIT_CMD = `${CLI_LOGIN_CMD} && ${CLI_SUBMIT_CMD}`;
/** Source install fallback when npm binaries are unavailable. */
export const CLI_SOURCE_INSTALL_CMD = `cargo install --git ${SITE_GITHUB_URL} --locked --bin ${CLI_BIN}`;
