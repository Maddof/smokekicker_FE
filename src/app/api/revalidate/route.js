import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  console.info("[revalidate] Incoming request");

  const secret = request.headers.get("x-revalidate-secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    console.warn("[revalidate] Unauthorized request: invalid secret");
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch (error) {
    console.error("[revalidate] Invalid JSON payload", error);
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const { paths = [], tags = [] } = payload ?? {};
  console.info(
    `[revalidate] Payload received (paths: ${paths.length}, tags: ${tags.length})`,
  );

  // 1. PATH-BASED REVALIDATION
  for (const path of paths) {
    console.info(`[revalidate] Revalidating path: ${path}`);
    revalidatePath(path);
  }

  // 2. TAG-BASED REVALIDATION
  for (const tag of tags) {
    console.info(`[revalidate] Revalidating tag: ${tag}`);
    revalidateTag(tag, "max");
  }

  console.info("[revalidate] Revalidation request completed");

  return NextResponse.json({ ok: true, revalidated: { paths, tags } });
}
