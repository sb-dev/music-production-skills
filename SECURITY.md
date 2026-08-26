# Security Policy

## Reporting a vulnerability

Do not publish secrets, API tokens, private media, or exploit details in a public issue.

Once the public repository is established, use GitHub private vulnerability reporting when available. Until then, contact the project maintainer privately.

## Credential handling

- Never commit `REPLICATE_API_TOKEN` or secondary-provider credentials.
- Keep secrets in the host environment or approved secret store.
- Tests and examples must use synthetic or public-safe fixtures.
- Provider-backed semantic benchmark transcripts must not contain private source material unless the contributor has explicit permission to publish it.

## Subprocess safety

Repository tooling invokes external commands with argument arrays and `shell: false`. Contributions must not reintroduce shell interpolation of untrusted paths or user values.
