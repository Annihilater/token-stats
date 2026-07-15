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

/** CLI binary name (cargo [[bin]] / clap name). Not the upstream npm `tokscale` package. */
export const CLI_BIN = "token-stats";
/** Recommended install (from this repo; default API is token-stats.com). */
export const CLI_INSTALL_CMD = `cargo install --git ${SITE_GITHUB_URL} --locked --bin ${CLI_BIN}`;
export const CLI_LOGIN_CMD = `${CLI_BIN} login`;
export const CLI_SUBMIT_CMD = `${CLI_BIN} submit`;
export const CLI_LOGIN_SUBMIT_CMD = `${CLI_BIN} login && ${CLI_BIN} submit`;
