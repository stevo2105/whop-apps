import { validateToken, WhopAPI, hasAccess } from "@whop-apps/sdk";
import { headers } from "next/headers";
import Whiteboard from "@/components/Whiteboard";
import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";

export default async function UserPage({
  params,
}: {
  params: { productId: string };
}) {
  async function refresh() {
    "use server";
    revalidatePath("/customer/[productId]", "page");
  }
  try {
    const { userId } = await validateToken({ headers });

    const access = await hasAccess({ to: params.productId, headers }); // Checking if the user has access to the product

    if (!access) {
      return <p>You do not have access to this product</p>;
    }

    const user = await WhopAPI.me({ headers }).GET("/me", {});

    const config = await kv.get<{ id: string; quantity: number }>(
      params.productId
    );
    console.log(config);

    return <Whiteboard consumer={true} config={config} refresh={refresh} />;
  } catch (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <p>
          If you are the developer, make sure you are developing in the iFrame.
          For more details, head {""}
          <a
            className="underline text-blue-500"
            href="https://apps.whop.com/apps/environment"
            target="_blank"
          >
            here
          </a>
        </p>
      </div>
    );
  }
}
