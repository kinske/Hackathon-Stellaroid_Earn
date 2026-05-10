import { NextResponse } from "next/server";
import { getHealthReport } from "@/lib/health-report";

export const revalidate = 0;

export async function GET() {
  const report = await getHealthReport();

  return NextResponse.json(report, {
    status: report.status === "down" ? 503 : 200,
  });
}
