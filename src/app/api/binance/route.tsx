import { Spot } from "@binance/connector";
import { NextResponse } from "next/server";

export async function GET() {
    const apiKey = process.env.BINANCE_API_KEY;
    const apiSecret = process.env.BINANCE_API_SECRET;
    const client = new Spot(apiKey, apiSecret, { useServerTime: true });

    try {
        const accountInfo = await client.account();
        return NextResponse.json(accountInfo.data);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Binance API error:", error.message);
            return NextResponse.json(
                {
                    error: "Failed to fetch data from Binance API",
                    details: error.message,
                },
                { status: 500 },
            );
        } else {
            console.error("Unexpected error:", error);
            return NextResponse.json(
                {
                    error: "Failed to fetch data from Binance API",
                    details: "An unknown error occurred",
                },
                { status: 500 },
            );
        }
    }
}
