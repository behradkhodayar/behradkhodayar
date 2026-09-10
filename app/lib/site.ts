export const SITE_URL = "https://behrad.khodayar.me";
export const PERSON_NAME = "Behrad Khodayar";
export const PERSON_DESCRIPTION =
  "Software engineer. I used to read source before reading docs, now ask AI to do it for me.";
export const PERSON_IMAGE = "/BehradKhodayar.jpeg";

export const SAME_AS = [
  "https://github.com/behradkhodayar",
  "https://www.linkedin.com/in/behrad-khodayar/",
  "https://stackoverflow.com/users/6532189/behrad-khodayar",
  "https://behradkhodayar.medium.com/",
  "https://www.reddit.com/user/behradkhodayar/",
];

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSON_NAME,
  givenName: "Behrad",
  familyName: "Khodayar",
  description: PERSON_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}${PERSON_IMAGE}`,
  jobTitle: "Software Engineer",
  sameAs: SAME_AS,
};
