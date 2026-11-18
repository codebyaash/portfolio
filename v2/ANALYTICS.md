# Google Analytics 4

The portfolio uses Google Analytics 4 with measurement ID `G-14ZYLEJ9HC`. The integration lives in `analytics.js` and is included on the portfolio and all project case-study pages.

## Privacy and consent

- Google Analytics is not downloaded until the visitor selects **Allow analytics**.
- Declining keeps analytics storage denied and sends no custom events.
- Visitors can change their choice through **Analytics preferences** in every page footer.
- Advertising storage, advertising user data, personalization, and Google Signals remain disabled.
- Analytics is disabled on `localhost`, `127.0.0.1`, `file://`, and when Do Not Track is enabled.
- Consent is saved locally under `portfolio-analytics-consent`.
- No GA secret or API key is needed in this public repository.

The implementation does not send form input, email addresses, phone numbers, credential IDs, query strings, clipboard contents, or keystrokes. Reassess the consent copy and legal requirements if the site audience, data collection, or operating jurisdictions change.

## Events

GA4 records the automatic `page_view` event after consent, plus these portfolio-specific events:

| Event | Meaning |
| --- | --- |
| `project_filter` | A visitor filters the project grid |
| `resume_download` | The résumé download is selected |
| `credential_view` | A certification credential is opened |
| `case_study_open` | A detailed project page is opened |
| `repository_visit` | A GitHub repository link is selected |
| `live_demo_visit` | The DeployForge live demo is opened |
| `contact_click` | An email contact link is selected |
| `social_visit` | A LinkedIn link is selected |

Event parameters are limited to short interface labels such as project name, filter name, page context, credential name, link label, or social network.

## GA4 setup and verification

1. In Google Analytics, confirm the web data stream for the published portfolio uses `G-14ZYLEJ9HC`.
2. Deploy the site to GitHub Pages. Analytics intentionally stays inactive in local previews.
3. Open the deployed site in a private browser window, select **Allow analytics**, and navigate through the project and contact links.
4. In GA4, open **Reports → Realtime** to confirm the visit and events. Initial standard reports can take up to 24 hours to populate.
5. In **Admin → Events**, mark meaningful recruiter actions such as `resume_download`, `contact_click`, `live_demo_visit`, and `credential_view` as key events if desired.

## Debugging custom events

Custom events are sent directly by `analytics.js`; they do not need to be created manually in GA4 first. To verify them from one browser without enabling debug mode for every visitor:

1. Open `https://codebyaash.github.io/portfolio/?ga_debug=1` in a private window.
2. Select **Allow analytics** in the consent banner.
3. In GA4, open **Admin → Data display → DebugView**.
4. Trigger project filters, case-study links, credential links, the résumé download, and contact links.
5. Confirm the named events appear in the DebugView seconds or minutes stream.

The `ga_debug` query parameter is used only to attach GA4's `debug_mode` flag. Collection still requires explicit analytics consent.

If the measurement ID ever changes, update only the `MEASUREMENT_ID` constant near the top of `analytics.js`.
