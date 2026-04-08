/**
 * Submits form data to the Google Apps Script web app endpoint.
 * The script saves to Google Sheets and sends an email notification.
 * 
 * HOW TO SET UP:
 * 1. Go to https://script.google.com and create a new project.
 * 2. Paste the Apps Script code from the setup guide (google_apps_script_setup.md).
 * 3. Deploy as a Web App (Execute as: Me, Who has access: Anyone).
 * 4. Copy the deployment URL and paste it as REACT_APP_GAS_ENDPOINT in your .env file.
 */

const GAS_ENDPOINT = process.env.REACT_APP_GAS_ENDPOINT;

/**
 * @param {'contact' | 'modal'} source  - Where the form was submitted from
 * @param {{ name, email, phone, subject, message }} data - Form fields
 * @returns {Promise<void>}  Throws on network/script error
 */
export async function submitForm(source, data) {
    if (!GAS_ENDPOINT) {
        const errorMsg = 'REACT_APP_GAS_ENDPOINT is not set in .env. Form submission is disabled.';
        console.error(errorMsg);
        throw new Error(errorMsg);
    }

    const payload = {
        source,
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        subject: data.subject || '',
        message: data.message || '',
        timestamp: new Date().toISOString(),
    };

    try {
        // Apps Script Web Apps require a no-redirect fetch with text/plain to avoid CORS preflight issues.
        const res = await fetch(GAS_ENDPOINT, {
            method: 'POST',
            // Note: Using 'text/plain' content-type avoids CORS preflight for Apps Script.
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            throw new Error(`Server responded with status ${res.status}`);
        }

        const json = await res.json();
        if (json.status !== 'ok') {
            throw new Error(json.message || 'Submission failed');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        throw error;
    }
}
