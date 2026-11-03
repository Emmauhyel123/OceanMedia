/* Sends the contact form to the database. Nothing else on the site uses JavaScript. */
(function () {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form) return;

  const show = (msg, type) => { status.textContent = msg; status.className = 'mono ' + (type || ''); };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    const c = OCEAN_CONFIG;
    if (c.SUPABASE_URL.includes('YOUR-PROJECT') || c.SUPABASE_ANON_KEY.startsWith('YOUR_')) {
      show('Form not connected yet: add your database keys in js/config.js.', 'err');
      return;
    }

    const body = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      details: form.details.value.trim()
    };
    const btn = form.querySelector('button');
    btn.disabled = true; show('Sending…');

    try {
      const res = await fetch(`${c.SUPABASE_URL}/rest/v1/${c.TABLE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': c.SUPABASE_ANON_KEY,
          'Authorization': 'Bearer ' + c.SUPABASE_ANON_KEY,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      form.reset(); show('✓ Message sent. We will be in touch soon.', 'ok');
    } catch (err) {
      show('Something went wrong. Please try again or email us directly.', 'err');
    } finally { btn.disabled = false; }
  });
})();
