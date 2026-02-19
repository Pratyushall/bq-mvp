import { DEFAULTS, CMS } from "./cms-defaults";

function mergeWithDefaults(remote: Partial<CMS> | null): CMS {
  if (!remote) return DEFAULTS as CMS;
  const d = DEFAULTS as CMS;
  const r = remote as any;
  return {
    site: {
      ...d.site,
      ...r.site,
      brand: { ...d.site.brand, ...r.site?.brand },
      theme: { ...d.site.theme, ...r.site?.theme },
      socials: { ...d.site.socials, ...r.site?.socials },
      nav: Array.isArray(r.site?.nav) ? r.site.nav : d.site.nav,
    },
    home: {
      ...d.home,
      ...r.home,
      hero: { ...d.home.hero, ...r.home?.hero },
      vision: { ...d.home.vision, ...r.home?.vision },
      projects: Array.isArray(r.home?.projects)
        ? r.home.projects
        : d.home.projects,
      services: Array.isArray(r.home?.services)
        ? r.home.services
        : d.home.services,
    },
    work: {
      ...d.work,
      ...r.work,
      projects: Array.isArray(r.work?.projects)
        ? r.work.projects
        : d.work.projects,
    },
    about: {
      ...d.about,
      ...r.about,
      hero: { ...d.about.hero, ...r.about?.hero },
      story: {
        ...d.about.story,
        ...r.about?.story,
        paragraphs: Array.isArray(r.about?.story?.paragraphs)
          ? r.about.story.paragraphs
          : d.about.story.paragraphs,
      },
      team: Array.isArray(r.about?.team) ? r.about.team : d.about.team,
    },
    hyderabadNights: {
      ...d.hyderabadNights,
      ...r.hyderabadNights,
      scenes: Array.isArray(r.hyderabadNights?.scenes)
        ? r.hyderabadNights.scenes
        : d.hyderabadNights.scenes,
    },
    contact: {
      ...d.contact,
      ...r.contact,
      hero: { ...d.contact.hero, ...r.contact?.hero },
      phones: Array.isArray(r.contact?.phones)
        ? r.contact.phones
        : d.contact.phones,
      emails: Array.isArray(r.contact?.emails)
        ? r.contact.emails
        : d.contact.emails,
    },
    footer: { ...d.footer, ...r.footer },
  };
}

export async function getServerConfig(): Promise<CMS> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/cms`, {
    cache: "no-store",
  });
  const remote = await res.json().catch(() => null);
  return mergeWithDefaults(remote);
}
