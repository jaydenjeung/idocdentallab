/** Team inboxes that receive automated alerts (leads, scan uploads, etc.). */
export function getNotificationEmails(): string[] {
  return (
    process.env.NOTIFICATION_EMAILS ||
    "info@idocdentallab.com,haesung@idocdentallab.com"
  )
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}
