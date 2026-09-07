"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  BaseFirestoreDoc,
  getDocById,
  getPublishedDocs,
  subscribeToDoc,
  countCollectionDocs,
  DocumentStatus,
} from "../firebase-service";
import { saveLocalDraft, loadLocalDraft } from "../draft-manager";

export interface UseFirestoreDocOptions<T> {
  mode?: "realtime" | "static";
  fallbackData?: T;
  useCache?: boolean;
  ttlMs?: number;
}

/**
 * Hook to consume a single Firestore document dynamically with caching & real-time toggle
 */
export function useFirestoreDoc<T extends BaseFirestoreDoc>(
  collectionName: string,
  docId: string,
  options: UseFirestoreDocOptions<T> = {}
) {
  const {
    mode = "static",
    fallbackData = null,
    useCache = true,
    ttlMs = 120000,
  } = options;

  const [data, setData] = useState<T | null>(fallbackData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchStatic = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const docData = await getDocById<T>(collectionName, docId, {
        useCache,
        ttlMs,
      });
      if (docData) {
        setData(docData);
        setLastUpdated(docData.updatedAt || docData.createdAt || null);
      } else if (fallbackData) {
        setData(fallbackData);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to fetch document");
      if (fallbackData) setData(fallbackData);
    } finally {
      setLoading(false);
    }
  }, [collectionName, docId, useCache, ttlMs, fallbackData]);

  useEffect(() => {
    if (mode === "realtime") {
      setLoading(true);
      const unsub = subscribeToDoc<T>(
        collectionName,
        docId,
        (docData) => {
          if (docData) {
            setData(docData);
            setLastUpdated(docData.updatedAt || docData.createdAt || null);
          } else if (fallbackData) {
            setData(fallbackData);
          }
          setLoading(false);
        },
        (err) => {
          setError(err.message);
          setLoading(false);
        }
      );

      return () => {
        if (unsub) unsub();
      };
    } else {
      fetchStatic();
    }
  }, [collectionName, docId, mode, fetchStatic, fallbackData]);

  return { data, loading, error, lastUpdated, refetch: fetchStatic };
}

export interface UseFirestoreCollectionOptions<T> {
  category?: string;
  sortBy?: "order" | "createdAt" | "updatedAt";
  sortDirection?: "asc" | "desc";
  limitCount?: number;
  fallbackData?: T[];
  useCache?: boolean;
}

/**
 * Hook to consume a collection of published items with caching & fallback support
 */
export function useFirestoreCollection<T extends BaseFirestoreDoc>(
  collectionName: string,
  options: UseFirestoreCollectionOptions<T> = {}
) {
  const {
    category,
    sortBy = "order",
    sortDirection = "asc",
    limitCount,
    fallbackData = [],
    useCache = true,
  } = options;

  const [data, setData] = useState<T[]>(fallbackData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCollection = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await getPublishedDocs<T>(collectionName, {
        category,
        sortBy,
        sortDirection,
        limitCount,
        useCache,
      });

      if (items.length > 0) {
        setData(items);
      } else if (fallbackData.length > 0) {
        setData(fallbackData);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to load collection");
      if (fallbackData.length > 0) setData(fallbackData);
    } finally {
      setLoading(false);
    }
  }, [collectionName, category, sortBy, sortDirection, limitCount, useCache, fallbackData]);

  useEffect(() => {
    fetchCollection();
  }, [fetchCollection]);

  return { data, loading, error, refetch: fetchCollection };
}

/**
 * Hook for counting documents via Firestore aggregation
 */
export function useFirestoreCount(
  collectionName: string,
  filter?: { status?: DocumentStatus; isDeleted?: boolean }
) {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function getCount() {
      setLoading(true);
      const c = await countCollectionDocs(collectionName, filter);
      if (isMounted) {
        setCount(c);
        setLoading(false);
      }
    }
    getCount();
    return () => {
      isMounted = false;
    };
  }, [collectionName, JSON.stringify(filter || {})]);

  return { count, loading };
}

/**
 * Hook for debounced autosave of form data to localStorage and optional remote save
 */
export function useAutosave<T>(
  draftKey: string,
  currentData: T,
  options?: {
    debounceMs?: number;
    onSaveRemote?: (data: T) => Promise<void>;
  }
) {
  const { debounceMs = 1500, onSaveRemote } = options || {};
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      // 1. Save locally
      saveLocalDraft(draftKey, currentData);
      const now = new Date().toISOString();
      setLastSaved(now);

      // 2. Optionally trigger remote autosave
      if (onSaveRemote) {
        setIsSaving(true);
        try {
          await onSaveRemote(currentData);
        } catch (e) {
          console.warn("Autosave remote failed:", e);
        } finally {
          setIsSaving(false);
        }
      }
    }, debounceMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentData, draftKey, debounceMs, onSaveRemote]);

  return { isSaving, lastSaved };
}
