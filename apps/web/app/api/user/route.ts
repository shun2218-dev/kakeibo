import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log(
      "process.env.API_URL! + request.nextUrl.pathname",
      process.env.API_URL! + request.nextUrl.pathname.replace("/api", ""),
    );
    const res = await fetch(
      process.env.API_URL! + request.nextUrl.pathname.replace("/api", ""),
    );
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

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const res = await fetch(
      process.env.API_URL! + request.nextUrl.pathname.replace("/api", ""),
      {
        method: "POST",
        body: formData,
      },
    );
    const data = await res.json();
    if (!res.ok) {
      return Response.json(
        { message: "Error fetching data from API" },
        { status: res.status },
      );
    }

    return Response.json(data, { status: res.status });
  } catch (e: unknown) {
    console.error("Error fetching data:", e);
    console.log("error", e)
    return Response.json({ message: "Error fetching data" }, { status: 500 });
  }
}
