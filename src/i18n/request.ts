import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'en';
  
  console.log('[i18n/request] Loading locale:', locale);
  console.log('[i18n/request] Cookie value:', cookieStore.get('NEXT_LOCALE')?.value);

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
