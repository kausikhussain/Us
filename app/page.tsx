import { cookies } from 'next/headers';
import { verifySession, SESSION_COOKIE_NAME } from '@/lib/auth/session';
import { MfaLoginGate } from '@/components/ui/MfaLoginGate';
import { MainStoryApp } from '@/components/MainStoryApp';

export default async function Home() {
  const cookieStore = cookies();
  const token =
    cookieStore.get(SESSION_COOKIE_NAME)?.value ||
    cookieStore.get('kn_session')?.value;

  const verification = await verifySession(token);
  const initialAuthenticated = verification.valid && verification.payload?.aal === 'aal2';

  return (
    <MfaLoginGate initialAuthenticated={initialAuthenticated}>
      <MainStoryApp />
    </MfaLoginGate>
  );
}
