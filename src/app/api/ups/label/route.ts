// app/api/ups/label/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getUPSToken } from "@/app/api/ups/token/upsToken";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Label request body:", body);

    const {
      contactName,
      practiceName,
      phone,
      address,
      city,
      state,
      zip,
    } = body;

    if (!contactName || !phone || !address || !city || !state || !zip) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const token = await getUPSToken();

    const shipmentPayload = {
      ShipmentRequest: {
        Request: {
          RequestOption: "nonvalidate",
          TransactionReference: {
            CustomerContext: `IDOC-${Date.now()}`,
          },
        },
        Shipment: {
          Description: "Dental Lab Case",
          Shipper: {
            Name:          practiceName || contactName,
            AttentionName: contactName,
            Phone: {
              Number: phone.replace(/\D/g, ""),
            },
            ShipperNumber: process.env.UPS_ACCOUNT_NUMBER!,
            Address: {
              AddressLine:   [address],
              City:          city,
              StateProvinceCode: state,
              PostalCode:    zip,
              CountryCode:   "US",
            },
          },
          ShipTo: {
            Name:          "IDOC Dental Lab",
            AttentionName: "Receiving",
            Phone: {
              Number: "8773884362",
            },
            Address: {
              AddressLine:       ["1097 N Batavia St"],
              City:              "Orange",
              StateProvinceCode: "CA",
              PostalCode:        "92867",
              CountryCode:       "US",
            },
          },
          ShipFrom: {
            Name:          practiceName || contactName,
            AttentionName: contactName,
            Phone: {
              Number: phone.replace(/\D/g, ""),
            },
            Address: {
              AddressLine:       [address],
              City:              city,
              StateProvinceCode: state,
              PostalCode:        zip,
              CountryCode:       "US",
            },
          },
          PaymentInformation: {
            ShipmentCharge: {
              Type: "01", // Transportation
              BillShipper: {
                AccountNumber: process.env.UPS_ACCOUNT_NUMBER!,
              },
            },
          },
          Service: {
            Code:        "02", // UPS 2nd Day Air
            Description: "UPS 2nd Day Air",
          },
          Package: {
            Description: "Dental Case",
            Packaging: {
              Code:        "02", // Customer Supplied Package
              Description: "Package",
            },
            PackageWeight: {
              UnitOfMeasurement: {
                Code:        "LBS",
                Description: "Pounds",
              },
              Weight: "1",
            },
          },
        },
        LabelSpecification: {
          LabelImageFormat: {
            Code:        "PDF",
            Description: "PDF",
          },
          HTTPUserAgent: "Mozilla/4.5",
        },
      },
    };

    const makeRequest = async (accessToken: string) => {
      return fetch("https://onlinetools.ups.com/api/shipments/v2409/ship", {
        method: "POST",
        headers: {
          "Content-Type":   "application/json",
          "Authorization":  `Bearer ${accessToken}`,
          "transId":        `IDOC-${Date.now()}`,
          "transactionSrc": "idocdentallab",
        },
        body: JSON.stringify(shipmentPayload),
      });
    };

    let res = await makeRequest(token);
    let rawText = await res.text();
    console.log("UPS Shipping status:", res.status);
    console.log("UPS Shipping body:", rawText);

    // 401 — refresh and retry
    if (res.status === 401) {
      const freshToken = await getUPSToken();
      res = await makeRequest(freshToken);
      rawText = await res.text();
    }

    if (!res.ok) {
      return NextResponse.json({ error: rawText }, { status: res.status });
    }

    const data = JSON.parse(rawText);

    // Extract label PDF base64
   const packageResults = data?.ShipmentResponse?.ShipmentResults?.PackageResults;
const labelBase64 = Array.isArray(packageResults)
      ? packageResults[0]?.ShippingLabel?.GraphicImage || null
      : packageResults?.ShippingLabel?.GraphicImage || null;
const trackingNumber =
      data?.ShipmentResponse?.ShipmentResults?.ShipmentIdentificationNumber || null;

    return NextResponse.json({
      success: true,
      trackingNumber,
      labelBase64, // PDF base64 — client converts to downloadable PDF
    });

  } catch (err: unknown) {
    console.error("UPS label error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}