// app/api/ups/pickup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getUPSToken } from "@/app/api/ups/token/upsToken";
import { getPickupNotificationEmails } from "@/lib/notifications";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Pickup request body:", body);

    const {
      contactName,
      practiceName,
      phone,
      address,
      city,
      state,
      zip,
      pickupDate,
      readyTime,
      closeTime,
      packageCount,
      notes,
    } = body;

    if (!contactName || !phone || !address || !city || !state || !zip || !pickupDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const token = await getUPSToken();

    const pickupPayload = {
      PickupCreationRequest: {
        RatePickupIndicator: "N",
        Shipper: {
          Account: {
            AccountNumber: process.env.UPS_ACCOUNT_NUMBER!,
            AccountCountryCode: "US",
          },
        },
        PickupDateInfo: {
          CloseTime: closeTime?.replace(":", "") || "1800",
          ReadyTime: readyTime?.replace(":", "") || "1400",
          PickupDate: pickupDate.replace(/-/g, ""),
        },
        PickupAddress: {
          CompanyName:          practiceName || contactName,
          ContactName:          contactName,
          AddressLine:          address,
          City:                 city,
          StateProvince:        state,
          PostalCode:           zip,
          CountryCode:          "US",
          Phone: {
            Number: phone.replace(/\D/g, ""),
          },
          ResidentialIndicator: "N",
        },
        AlternateAddressIndicator: "N",
        PickupPiece: [
          {
            ServiceCode:            "001",
            Quantity:               String(packageCount || 1),
            DestinationCountryCode: "US",
            ContainerCode:          "01",
          },
        ],
        TotalWeight: {
          Weight:            "10",
          UnitOfMeasurement: "LBS",
        },
        OverweightIndicator: "N",
        PaymentMethod:       "01",
        SpecialInstruction:  notes || "",
        ReferenceNumber:     `IDOC-${Date.now()}`,
      },
    };

    const makeRequest = async (accessToken: string) => {
      return fetch("https://onlinetools.ups.com/api/pickupcreation/v2409/pickup", {
        method: "POST",
        headers: {
          "Content-Type":   "application/json",
          "Authorization":  `Bearer ${accessToken}`,
          "transId":        `IDOC-${Date.now()}`,
          "transactionSrc": "idocdentallab",
        },
        body: JSON.stringify(pickupPayload),
      });
    };

    let res = await makeRequest(token);
    let rawText = await res.text();
    console.log("UPS status:", res.status);
    console.log("UPS body:", rawText);

    // 401 — refresh token and retry once
    if (res.status === 401) {
      const freshToken = await getUPSToken();
      res = await makeRequest(freshToken);
      rawText = await res.text();
      console.log("UPS retry status:", res.status);
      console.log("UPS retry body:", rawText);
    }

    if (!res.ok) {
      return NextResponse.json({ error: rawText }, { status: res.status });
    }

    const data = rawText ? JSON.parse(rawText) : {};
    const prn = data?.PickupCreationResponse?.PRN || "Confirmed";
    const practice = practiceName || contactName;
    const addressLine = `${address}, ${city}, ${state} ${zip}`;

    await resend.emails.send({
      from: "IDOC Portal <noreply@idocdentallab.com>",
      to: getPickupNotificationEmails(),
      subject: `UPS Pickup Scheduled — ${practice}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="margin: 0 0 24px; font-size: 20px;">UPS pickup scheduled</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; color: #666; width: 140px;">Practice</td>
              <td style="padding: 10px 0; font-weight: 600;">${practice}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; color: #666;">Contact</td>
              <td style="padding: 10px 0;">${contactName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; color: #666;">Phone</td>
              <td style="padding: 10px 0;">${phone}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; color: #666;">Address</td>
              <td style="padding: 10px 0;">${addressLine}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; color: #666;">Pickup date</td>
              <td style="padding: 10px 0;">${pickupDate}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; color: #666;">Ready by</td>
              <td style="padding: 10px 0;">${readyTime || "14:00"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; color: #666;">Close time</td>
              <td style="padding: 10px 0;">${closeTime || "18:00"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; color: #666;">Packages</td>
              <td style="padding: 10px 0;">${packageCount || 1}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; color: #666;">UPS PRN</td>
              <td style="padding: 10px 0;">${prn}</td>
            </tr>
            ${notes ? `
            <tr>
              <td style="padding: 10px 0; color: #666; vertical-align: top;">Notes</td>
              <td style="padding: 10px 0;">${notes}</td>
            </tr>` : ""}
          </table>
          <div style="margin-top: 32px; padding: 16px; background: #f9fafb; border-radius: 8px; font-size: 13px; color: #666;">
            Received: ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} (PT)
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });

  } catch (err: unknown) {
    console.error("UPS pickup error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}