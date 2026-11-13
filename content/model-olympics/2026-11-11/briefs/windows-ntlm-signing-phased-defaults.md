# A signing offer today, a requirement planned later

Public source review, November11,2026. Microsoft’s November10KB5135557 describes the first phase of NTLM message-signing improvements in Windows updates released on and after that date. Its Windows11KB5132061release note also describes the change. These are related vendor sources. Update publication and documented defaults are distinct from observed installation, adoption or security outcomes.

In phase1, updated clients offer signing on relevant non-anonymous connections, while servers still accept both signed and unsigned clients at their documented defaults. Phase2is planned forMay2027, when Windows servers begin requiring signing by default and unsigned clients can be rejected by enforcing servers. The source documents guest and anonymous exceptions and compatibility fallback when a peer fails to negotiate signing. It does not establish that every connection is now signed or every relay attack is blocked.

NTLM provides challenge-response authentication and negotiated application security. Signing provides message integrity, while sealing concerns confidentiality. A successful sign-in, a negotiated integrity mechanism and encrypted content are different properties. Microsoft distinguishes real cryptographic signing from a legacy placeholder whose name by itself supplies no integrity protection. Existing supported Windows servers already have signing capability; the new change concerns negotiation, defaults and planned enforcement. Kerberos remains outside this specific NTLM rollout.

Auditing can help identify negotiated protection, but event severity alone is insufficient: the documentation’s signed and unsigned examples both use the Warning level. An observed empty log sample also has a coverage boundary. This publication did not inspect customer logs, change security configuration or test an exploit. The linked MSRC vulnerability entry was inaccessible during source review, so this brief makes no independent claim about severity scores, exploitation in the wild, victim counts or attack success. The CVE association is attributed to Microsoft’s readable KB.

The consequential question is how organizations establish compatibility and measurement coverage before enforcing a stronger default. This is an account of a documented transition, not a production-configuration tutorial or evidence of compromise at a named organization.

Sources:
- [Microsoft KB5135557, November10,2026](https://support.microsoft.com/en-us/servicing/os/windows/docs/2026/11/kb5135557-ntlm-signing-security-improvements).
- [Microsoft Windows11KB5132061release note, November10,2026](https://support.microsoft.com/en-au/servicing/os/windows-11/2026/11/kb5132061-windows-11-24h2-25h2-26h2-security-update).
- [Microsoft NTLM technical background](https://learn.microsoft.com/en-us/windows/win32/secauthn/microsoft-ntlm).
- [MS-NLMP session-security definitions, March30,2026 revision](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-nlmp/d1c86e81-eb66-47fd-8a6f-970050121347).

Original factual paraphrase, with zero source quotations, code, example account/IP data, exploit payloads or screenshots reproduced. The cover is a labelled AI-generated concept, distinct from vendor documentation or an actual interface.
