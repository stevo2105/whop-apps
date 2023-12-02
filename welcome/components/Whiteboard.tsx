"use client";
import { saveKV } from "@/app/actions/saveKV";
import { sendNotification } from "@/app/actions/sendPushnotification";
import {
  Tldraw,
  createTLStore,
  defaultShapeUtils,
  throttle,
} from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import {
  Button,
  CalloutIcon,
  CalloutRoot,
  CalloutText,
  TextFieldInput,
} from "frosted-ui";
import { revalidatePath } from "next/cache";
import React from "react";
import { useLayoutEffect, useState } from "react";

const PERSISTENCE_KEY = "example-3";

export default function Whiteboard({
  consumer = false,
  config,
  refresh,
  productId,
  experienceId,
}: {
  consumer?: boolean;
  config?: any;
  refresh?: () => void;
  productId?: string;
  experienceId?: string;
}) {
  const [store] = useState(() =>
    createTLStore({ shapeUtils: defaultShapeUtils })
  );
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [loadingState, setLoadingState] = useState<
    | { status: "loading" }
    | { status: "ready" }
    | { status: "error"; error: string }
  >({
    status: "loading",
  });

  useLayoutEffect(() => {
    setLoadingState({ status: "loading" });
    if (config) {
      try {
        store.loadSnapshot(config);
        setLoadingState({ status: "ready" });
      } catch (error: any) {
        setLoadingState({ status: "error", error: error.message }); // Something went wrong
      }
    } else {
      setLoadingState({ status: "ready" }); // Nothing persisted, continue with the empty store
    }

    // Each time the store changes, run the (debounced) persist function
    const cleanupFn = store.listen(
      throttle(() => {
        const snapshot = store.getSnapshot();
        localStorage.setItem(PERSISTENCE_KEY, JSON.stringify(snapshot));
      }, 500)
    );

    return () => {
      cleanupFn();
    };
  }, [config, store]);

  async function save() {
    if (!productId) return;
    try {
      await saveKV(productId, store.getSnapshot());
      alert("saved");
    } catch (e) {
      console.log(store.getSnapshot());
      console.log("saved");
      alert(e);
    }
  }

  async function sendNotificationHandler() {
    if (!experienceId) return;
    sendNotification(notificationMessage, experienceId);
    alert("sent");
  }

  async function reload() {
    if (refresh) refresh();
  }

  if (loadingState.status === "loading") {
    return (
      <div className="tldraw__editor">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (loadingState.status === "error") {
    return (
      <div className="tldraw__editor">
        <h2>Error!</h2>
        <p>{loadingState.error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* <form action={saveKV}>
        <input name="id" value={store.} type="hidden" />
        <button type="submit">Save KV</button>
      </form> */}

      <div className="p-4">
        {!consumer ? (
          <CalloutRoot variant="soft">
            <CalloutIcon>i</CalloutIcon>
            <CalloutText>
              <React.Fragment key=".0">
                You can freely edit this whiteboard. Your customers will be able
                to see it when they want to.
              </React.Fragment>
            </CalloutText>
          </CalloutRoot>
        ) : (
          <CalloutRoot variant="soft">
            <CalloutIcon>i</CalloutIcon>
            <CalloutText>
              <React.Fragment key=".0">
                {`Please use this app on Desktop to have more fun. And don't worry, you can change as much as you want in this little sandbox. It won't actually change anything for other users.`}
              </React.Fragment>
            </CalloutText>
          </CalloutRoot>
        )}
      </div>
      <div className="flex justify-center mb-4">
        {consumer ? (
          <Button onClick={reload} variant="surface" color="crimson">
            Refresh Whiteboard
          </Button>
        ) : (
          <div className="flex justify-center gap-6">
            <Button onClick={save} variant="surface" color="crimson">
              Save Whiteboard
            </Button>
            <TextFieldInput
              onChange={(e) => setNotificationMessage(e.target.value as string)}
              value={notificationMessage}
            />
            <Button
              onClick={sendNotificationHandler}
              variant="surface"
              color="blue"
            >
              Send Push Notification to users
            </Button>
          </div>
        )}
      </div>
      <div style={{ position: "fixed", width: "100%", height: "80%" }}>
        <Tldraw hideUi={consumer} store={store} />
      </div>
    </div>
  );
}
