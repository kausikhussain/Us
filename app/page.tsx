import { cookies } from 'next/headers';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth';
import { AnniversaryGate } from '@/components/ui/AnniversaryGate';
import { MainStoryApp } from '@/components/MainStoryApp';

export default async function Home() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const initialAuthenticated = await verifySessionToken(sessionToken);

  return (
    <AnniversaryGate initialAuthenticated={initialAuthenticated}>
      <MainStoryApp />
    </AnniversaryGate>
  );
}
