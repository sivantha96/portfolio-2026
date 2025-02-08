export function sendEmail(email: string, subject = '', body = '') {
  const mailtoUrl = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;
}

export function makePhoneCall(phoneNumber: string) {
  // Remove any non-numeric characters from the phone number
  const cleanNumber = phoneNumber.replace(/\D/g, '');

  // Create the tel: URI
  const telUrl = `tel:${cleanNumber}`;

  // Open the phone app
  window.location.href = telUrl;
}

export function openWebUrl(url: string, newTab = true) {
  // Check if the URL starts with http:// or https://
  if (!url.match(/^https?:\/\//i)) {
    url = 'https://' + url;
  }

  if (newTab) {
    // Open in new tab
    window.open(url, '_blank');
  } else {
    // Open in same tab
    window.location.href = url;
  }
}
