"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { VisualEditing } from "next-sanity/visual-editing";

const VisualEditingClient = () => {
  const router = useRouter();

  // next-sanity's default refresh handler ignores "mutation" events (content
  // edits in the Studio), only refreshing on "manual" refreshes. Refresh on
  // both so edits show up live in the preview.
  const refresh = useCallback(() => {
    router.refresh();
    return new Promise<void>((resolve) => setTimeout(resolve, 1000));
  }, [router]);

  return <VisualEditing zIndex={1000} refresh={refresh} />;
};

export default VisualEditingClient;
