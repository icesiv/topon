import { NextRequest, NextResponse } from "next/server";
import { collection, query, where, getDocs, writeBatch, doc } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";

export async function POST(req: NextRequest) {
  // Verify authorization header or cron secret
  const authHeader = req.headers.get("authorization");
  const cronSecret = req.headers.get("x-cron-secret");
  const expectedSecret = process.env.CRON_SECRET || process.env.ADMIN_SECRET_KEY;

  if (expectedSecret && cronSecret !== expectedSecret && authHeader !== `Bearer ${expectedSecret}`) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  if (!isFirebaseConfigured() || !db) {
    return NextResponse.json(
      { error: "Firebase is not configured in environment" },
      { status: 503 }
    );
  }

  try {
    const { retentionDays = 30, collections = ["media", "products", "services", "settings"] } =
      await req.json().catch(() => ({}));

    const cutoffDate = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000).toISOString();
    let totalPurged = 0;
    const purgeSummary: Record<string, number> = {};

    for (const colName of collections) {
      const colRef = collection(db, colName);
      const q = query(
        colRef,
        where("isDeleted", "==", true),
        where("deletedAt", "<=", cutoffDate)
      );

      const snap = await getDocs(q);
      if (snap.docs.length > 0) {
        const batch = writeBatch(db!);
        snap.docs.forEach((d) => {
          batch.delete(doc(db!, colName, d.id));
        });
        await batch.commit();
        purgeSummary[colName] = snap.docs.length;
        totalPurged += snap.docs.length;
      } else {
        purgeSummary[colName] = 0;
      }
    }

    return NextResponse.json({
      success: true,
      cutoffDate,
      totalPurged,
      details: purgeSummary,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("Purge error:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to purge deleted records" },
      { status: 500 }
    );
  }
}
