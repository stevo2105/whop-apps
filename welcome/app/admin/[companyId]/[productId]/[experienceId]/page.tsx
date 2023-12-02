import {
  validateToken,
  WhopAPI,
  hasAccess,
  authorizedUserOn,
} from "@whop-apps/sdk";
import { headers } from "next/headers";
import Whiteboard from "@/components/Whiteboard";
import { kv } from "@vercel/kv";

export default async function AdminPage({
  params,
}: {
  params: { companyId: string; productId: string; experienceId: string };
}) {
  try {
    const { userId } = await validateToken({ headers }); // This will ensure only authenticated users can access this page

    const access = await hasAccess({
      to: authorizedUserOn(params.companyId),
      headers,
    });

    if (!access) {
      return <p>You do not have access to this company</p>;
    }

    const companyInformation = await WhopAPI.app().GET("/app/companies/{id}", {
      params: { path: { id: params.companyId } },
    });

    if (companyInformation.isErr) {
      // Checking if the request was successful
      return (
        <div>
          <p>Could not fetch company information</p>
          <p>Error: {companyInformation.data}</p>
        </div>
      );
    }

    const config = await kv.get<{ id: string; quantity: number }>(
      params.productId
    );

    return (
      <div>
        <Whiteboard
          productId={params.productId}
          config={config}
          experienceId={params.experienceId}
        />
      </div>
    );
  } catch (error) {
    console.log(error);
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
