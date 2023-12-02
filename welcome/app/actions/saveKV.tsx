"use server";

import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";

export async function saveKV(productId: string, snapshot: any) {
  // ...
  console.log("Saving KV");
  console.log(snapshot);
  await kv.set(productId, snapshot);
  revalidatePath("/admin/[companyId]/[productId]", "page");
}
