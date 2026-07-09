import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url || !url.startsWith("https://cdn.sanity.io/")) {
    return new NextResponse("Invalid URL", { status: 400 });
  }

  const response = await fetch(url);
  if (!response.ok) {
    return new NextResponse("Failed to fetch SVG", { status: response.status });
  }

  const svg = await response.text();
  return new NextResponse(svg, {
    headers: { "Content-Type": "image/svg+xml" },
  });
}
