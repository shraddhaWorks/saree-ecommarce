import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";

type AddressBody = {
  name?: string;
  phone?: string;
  line1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  isDefault?: boolean;
};

export async function GET(req: NextRequest) {
  try {
    const { user, profile } = await getUserFromRequest(req);
    if (!user || !profile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // TODO: Implement saved addresses storage
    return NextResponse.json({ addresses: [] }, { status: 200 });
  } catch (err) {
    console.error("GET /api/addresses error", err);
    return NextResponse.json({ error: "Failed to load addresses" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { profile, user } = await getUserFromRequest(req);
    if (!user || !profile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as AddressBody;
    const name = body.name?.trim();
    const phone = body.phone?.trim();
    const line1 = body.line1?.trim();
    const city = body.city?.trim();
    const postalCode = body.postalCode?.trim();
    const state = body.state?.trim();
    const country = body.country?.trim() || "India";
    const isDefault = Boolean(body.isDefault);

    if (!name || !phone || !line1 || !city) {
      return NextResponse.json(
        { error: "Name, phone, address line, and city are required" },
        { status: 400 },
      );
    }

    // TODO: Implement saved addresses storage
    const address = {
      id: "temp-" + Date.now(),
      userId: profile.id,
      name,
      phone,
      line1,
      city,
      state: state || null,
      postalCode: postalCode || null,
      country,
      isDefault,
    };

    return NextResponse.json({ address }, { status: 201 });
  } catch (err) {
    console.error("POST /api/addresses error", err);
    return NextResponse.json({ error: "Failed to save address" }, { status: 500 });
  }
}
