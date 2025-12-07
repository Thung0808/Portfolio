export type Language = 'vi' | 'en';

export interface PostContent {
  title: string;
  excerpt: string;
  content: string; // Markdown/HTML compatible string
  date: string;
  readTime: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  image: string;
  codeSnippet?: string; // Language agnostic code
  codeLanguage?: string;
  vi: PostContent;
  en: PostContent;
  tags: string[];
}

export interface Certificate {
  id: number;
  title: {
    vi: string;
    en: string;
  };
  issuer: string;
  date: string;
  image: string;
  url?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon?: string;
}

export interface ProfileData {
  name: string;
  role: {
    vi: string;
    en: string;
  };
  bio: {
    vi: string;
    en: string;
  };
  avatar: string;
  socials: {
    platform: string;
    url: string;
    icon: string;
  }[];
}

export interface AppState {
  language: Language;
  toggleLanguage: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}