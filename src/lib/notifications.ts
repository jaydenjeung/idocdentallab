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

const ADDITIONAL_TEAM_RECIPIENTS = [
  "taniag@idocdentallab.com",
  "crystald@idocdentallab.com",
];

/** Supply requests also notify these inboxes in addition to getNotificationEmails(). */
export function getSupplyNotificationEmails(): string[] {
  return [...new Set([...getNotificationEmails(), ...ADDITIONAL_TEAM_RECIPIENTS])];
}

/** Pickup requests also notify these inboxes in addition to getNotificationEmails(). */
export function getPickupNotificationEmails(): string[] {
  return [...new Set([...getNotificationEmails(), ...ADDITIONAL_TEAM_RECIPIENTS])];
}
