/**
 * Careers API layer. The page only talks to these functions, so connecting a
 * backend later means changing this file alone.
 */
import { positions as samplePositions, type Position } from '@/data/careers';

export interface Application {
  positionId: string; // '' for a general application
  name: string;
  email: string;
  phone?: string;
  portfolio?: string;
  message: string;
  resume?: File | null;
}

/** TODO(backend): replace with `GET /api/careers/positions`. */
export async function getPositions(): Promise<Position[]> {
  return samplePositions;
}

/**
 * TODO(backend): send as multipart/form-data to `POST /api/careers/applications`.
 * For now it only simulates a successful submission.
 */
export async function submitApplication(app: Application): Promise<{ ok: true }> {
  await new Promise((r) => setTimeout(r, 700));
  if (import.meta.env.DEV) console.info('[careers] application (not sent yet — no backend):', { ...app, resume: app.resume?.name });
  return { ok: true };
}
