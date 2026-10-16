export const runtime = "nodejs";

export function GET() {
  return Response.json({
    success: true,
    status: "ok",
    service: "web-api",
  });
}
