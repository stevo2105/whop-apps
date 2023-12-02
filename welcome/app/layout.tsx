// app/layout.tsx
import { ClientLayout } from "./layout.client";
import { Theme } from "frosted-ui";
import "./globals.css";
import "frosted-ui/styles.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Theme>
          <ClientLayout>{children}</ClientLayout>
        </Theme>
      </body>
    </html>
  );
}
