export interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  images: string[];
  codeSnippet?: string;
}

export interface Skill {
  id: number;
  name: string;
  icon: string;
}

export interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
}
