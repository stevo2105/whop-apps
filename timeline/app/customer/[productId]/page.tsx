import { validateToken, WhopAPI, hasAccess } from "@whop-apps/sdk";
import { headers } from "next/headers";
import OpenButton from "@/components/OpenButton";
import ViewTimeline from "@/components/ViewTimeline";

export default async function UserPage({
  params,
}: {
  params: { productId: string };
}) {
  try {
    const { userId } = await validateToken({ headers });

    const access = await hasAccess({ to: params.productId, headers }); // Checking if the user has access to the product

    if (!access) {
      return <p>You do not have access to this product</p>;
    }

    const user = await WhopAPI.me({ headers }).GET("/me", {});

    return (
      <div className="flex justify-center items-center bg-gray-100 min-h-screen">
      <div className="max-w-4xl w-full px-4 py-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">
          Upcoming Developments
        </h1>
        <p className="text-center text-gray-600 mb-6">
         {` Here's a sneak peek into what we're working on. Stay tuned for exciting updates!`}
        </p>
        <div className="pt-5 space-y-2">
        <ViewTimeline/>
        </div>
        </div>
      </div>
    );
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
