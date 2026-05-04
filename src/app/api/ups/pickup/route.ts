// app/api/ups/pickup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getUPSToken } from "@/app/api/ups/token/route";

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
    return NextResponse.json({ success: true, data });

  } catch (err: unknown) {
    console.error("UPS pickup error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}