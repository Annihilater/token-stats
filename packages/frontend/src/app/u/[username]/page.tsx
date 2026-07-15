import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import type { ProfileDevice } from '@/components/profile';
import { SITE_NAME, SITE_URL } from '@/lib/brand';
import { loadPublicProfileDevicesForPage } from '@/lib/publicProfileDevices';
import { loadPublicProfileForPage } from '@/lib/publicProfileData';
import ProfilePageClient, { type ProfileData } from './ProfilePageClient';

export const revalidate = 60;

const PROFILE_PERIODS = ["all", "week", "month"] as const;
type ProfilePeriod = (typeof PROFILE_PERIODS)[number];

function parseProfilePeriod(value: string | string[] | undefined): ProfilePeriod {
  const period = Array.isArray(value) ? value[0] : value;
  return PROFILE_PERIODS.includes(period as ProfilePeriod)
    ? (period as ProfilePeriod)
    : "all";
}

async function getProfileData(
  username: string,
  period: ProfilePeriod,
): Promise<ProfileData | null> {
  // Calling the shared server handler keeps Vercel Deployment Protection out
  // of the render path. A server-side HTTP self-fetch is anonymous and is
  // redirected to Vercel's HTML login page on protected preview deployments.
  const result = await loadPublicProfileForPage(username, period);

  if (result.kind === "redirect") {
    if (result.location) {
      const canonicalUsername = decodeURIComponent(
        new URL(result.location).pathname.split("/").at(-1) ?? "",
      );
      if (canonicalUsername && canonicalUsername !== username) {
        return getProfileData(canonicalUsername, period);
      }
    }
  }

  if (result.kind !== "data") {
    return null;
  }

  return result.data as ProfileData;
}

// Devices are an enrichment on top of the core profile: if this fetch fails
// we still render the profile, just without the Devices section.
async function getProfileDevices(username: string) {
  try {
    return (await loadPublicProfileDevicesForPage(username)) as ProfileDevice[];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `@${username} - Token Usage | ${SITE_NAME}`,
    description: `View ${username}'s AI token usage statistics and cost breakdown on ${SITE_NAME}`,
    openGraph: {
      title: `@${username}'s Token Usage | ${SITE_NAME}`,
      description: `AI token usage statistics for ${username} on ${SITE_NAME}`,
      type: 'profile',
      url: `${SITE_URL}/u/${username}`,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${username}'s Token Usage on ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `@${username}'s Token Usage | ${SITE_NAME}`,
      images: [`${SITE_URL}/og-image.png`],
    },
  };
}

export default async function ProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ username: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { username } = await params;
  const resolvedSearchParams = await searchParams;
  const period = parseProfilePeriod(resolvedSearchParams.period);
  const [data, devices] = await Promise.all([
    getProfileData(username, period),
    getProfileDevices(username),
  ]);

  if (!data) {
    notFound();
  }

  if (data.user?.username && data.user.username !== username) {
    permanentRedirect(`/u/${data.user.username}${period === "all" ? "" : `?period=${period}`}`);
  }

  return <ProfilePageClient initialData={data} initialDevices={devices} username={username} />;
}
