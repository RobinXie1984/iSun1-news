# Factual brief: eviltokens-real-login-trap

Original event/report date: 2026-09-22. Original record checked: 2026-09-23T01:11:09.509426+00:00.

This is the original published episode's factual snapshot, prepared from `content/stories.json` for common use by all models. It is not a September 28 news update. Claim and source IDs below refer to that record.

Microsoft published its technical investigation and disruption announcement on September 22, 2026. It says EvilTokens emerged in February 2026 and links the service to more than 12,000 compromised inboxes across over 10,000 organizations worldwide. These are Microsoft's service-wide figures, not an independent census or a count attributable solely to device-code phishing. [c2–c3; s1–s2]

The investigation describes lures that brought victims to Microsoft's genuine sign-in portal. Approval could authorize an attacker-controlled session without giving the attacker the victim's password. The legitimate device-authorization flow lets someone use a browser to approve access for devices with limited input, such as smart TVs or printers. Its misuse depends on deceiving the user about the request being approved. A genuine domain does not establish that the authorization request is legitimate. Microsoft describes circumvention of traditional MFA protections through authorization and session context; the report does not establish a cryptographic break in MFA, which Microsoft continues to recommend. [c1, c4–c5; s1–s3]

Microsoft reports AI capabilities for tailoring lures to people's roles and analyzing compromised mailboxes for financial conversations and trusted relationships. Criminals could use that information to select impersonation targets. This describes reported capabilities, not proof that AI caused every compromise. The technical report also describes malicious inbox rules that conceal communications; behavior varied between incidents. EvilTokens was offered with customer support and a management interface for a $1,500 initiation fee plus $500 monthly. [c6, c11–c13; s1–s2]

Microsoft says it and partners seized 50 websites and disabled more than 150 supporting domains. This does not establish eradication or complete account recovery. Access could persist after a password reset if associated sessions and tokens remained valid. Microsoft's guidance includes auditing device-code use, blocking it where possible, restricting necessary exceptions, and checking unusual transactions or payment changes through a trusted second channel. Legitimate device-code uses remain. [c7–c10; s1–s2, s4]

## Primary sources

- s1: [Microsoft Threat Intelligence: Unmasking EvilTokens](https://www.microsoft.com/en-us/security/blog/2026/09/22/unmasking-eviltokens-getting-to-the-root-of-device-code-phishing/) — 2026-09-22.
- s2: [Microsoft Digital Crimes Unit: Disrupting EvilTokens](https://blogs.microsoft.com/on-the-issues/2026/09/22/disrupting-eviltokens-the-ai-chatbot-built-for-cybercrime/) — 2026-09-22.
- s3: [Microsoft Learn: OAuth device authorization grant](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-device-code) — date not recorded.
- s4: [Microsoft Learn: Restrict device code authentication flows](https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-block-authentication-flows) — date not recorded.
