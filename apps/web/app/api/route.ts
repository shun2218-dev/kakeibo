import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get("name");
    if (!name) {
      return Response.json(
        { message: "Name query parameter is required" },
        { status: 400 },
      );
    }
    const apiUrl = new URL(process.env.API_URL!);
    apiUrl.searchParams.set("name", name);
    const res = await fetch(apiUrl);
    const data = await res.json();
    if (!res.ok) {
      return Response.json(
        { message: "Error fetching data from API" },
        { status: res.status },
      );
    }

    return Response.json(data, { status: 200 });
  } catch (e: unknown) {
    console.error("Error fetching data:", e);
    return Response.json({ message: "Error fetching data" }, { status: 500 });
  }
}
