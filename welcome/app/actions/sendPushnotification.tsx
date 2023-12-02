"use server";

import { WhopAPI } from "@whop-apps/sdk";

export async function sendNotification(
  notificationMessage: string,
  experienceId: string
) {
  // ...
  await WhopAPI.app().POST("/app/notifications", {
    body: {
      topic_identifier: "dispatch",
      notification_data: {
        all: {
          subject: "Ping 😈",
          content: notificationMessage,
        },
      },
      targets: [
        {
          experiences: [experienceId],
        },
      ],
    },
  });
}
