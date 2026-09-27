import { getStore } from "@netlify/blobs";

const STORE_NAME = "aim-training-leaderboard";
const TOP_LIMIT = 10;
const DIFFICULTIES = new Set(["easy", "medium", "hard"]);

function json(data, status = 200) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function parseMode(durationValue, difficultyValue) {
  const duration = Number(durationValue);
  const difficulty = String(difficultyValue || "").toLowerCase();
  if (!Number.isInteger(duration) || duration < 10 || duration > 1800 || duration % 10 !== 0 || !DIFFICULTIES.has(difficulty)) {
    return null;
  }
  return { duration, difficulty, key: difficulty + "-" + duration };
}

function publicEntries(rows) {
  return rows.map(({ nickname, score, createdAt }) => ({ nickname, score, createdAt }));
}

function normalizeNickname(value) {
  if (typeof value !== "string") return null;
  const nickname = value.normalize("NFKC").trim().replace(/\s+/g, " ");
  if (nickname.length < 2 || nickname.length > 20 || !/^[\p{L}\p{N} ._-]+$/u.test(nickname)) return null;
  return nickname;
}

export default async function leaderboard(request) {
  if (request.method !== "GET" && request.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    const url = new URL(request.url);
    const bodyText = request.method === "POST" ? await request.text() : "";
    if (bodyText.length > 1024) return json({ error: "Request too large" }, 413);

    let body = {};
    if (request.method === "POST") {
      const origin = request.headers.get("origin");
      if (origin && origin !== url.origin) return json({ error: "Forbidden" }, 403);
      try {
        body = JSON.parse(bodyText);
      } catch {
        return json({ error: "Invalid JSON" }, 400);
      }
    }

    const mode = parseMode(
      request.method === "GET" ? url.searchParams.get("duration") : body.duration,
      request.method === "GET" ? url.searchParams.get("difficulty") : body.difficulty,
    );
    if (!mode) return json({ error: "Invalid mode" }, 400);

    const store = getStore({ name: STORE_NAME, consistency: "strong" });
    if (request.method === "GET") {
      const rows = (await store.get(mode.key, { type: "json" })) || [];
      return json({ entries: publicEntries(Array.isArray(rows) ? rows : []) });
    }

    const nickname = normalizeNickname(body.nickname);
    const score = Number(body.score);
    if (!nickname || !Number.isInteger(score) || Math.abs(score) > mode.duration * 500) {
      return json({ error: "Invalid result" }, 400);
    }

    const entry = {
      id: crypto.randomUUID(),
      nickname,
      score,
      createdAt: new Date().toISOString(),
    };

    for (let attempt = 0; attempt < 8; attempt += 1) {
      const current = await store.getWithMetadata(mode.key, { type: "json" });
      const rows = Array.isArray(current?.data) ? current.data : [];
      const previous = rows.find((row) => row.nickname.toLowerCase() === nickname.toLowerCase());
      if (previous && previous.score >= score) {
        return json({ saved: false, reason: "not_best", entries: publicEntries(rows) });
      }

      const next = rows
        .filter((row) => row.nickname.toLowerCase() !== nickname.toLowerCase())
        .concat(entry)
        .sort((a, b) => b.score - a.score || a.createdAt.localeCompare(b.createdAt))
        .slice(0, TOP_LIMIT);
      const rank = next.findIndex((row) => row.id === entry.id) + 1;
      if (!rank) {
        return json({ saved: false, reason: "not_top_ten", entries: publicEntries(rows) });
      }

      const options = current ? { onlyIfMatch: current.etag } : { onlyIfNew: true };
      const { modified } = await store.setJSON(mode.key, next, options);
      if (modified) {
        return json({ saved: true, rank, entries: publicEntries(next) });
      }
    }
    return json({ error: "Please try again" }, 409);
  } catch (error) {
    console.error("Leaderboard error", error);
    return json({ error: "Leaderboard unavailable" }, 500);
  }
}

export const config = { path: "/api/leaderboard" };
