import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Article {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  authorPhoto?: string;
  authorDescription?: string;
  date: string;
  gradient: string;
}

@Component({
  selector: 'app-articles',
  imports: [RouterLink],
  templateUrl: './articles.html',
  styleUrl: './articles.scss',
})
export class Articles {
  selectedAuthor: string | null = null;
  selectedArticleId: string | null = null;

  articles: Article[] = [
    {
      id: 'tips-combine-ai',
      title: 'Tips to Combine AI with Human Creativity, Judgment, and Collaboration',
      subtitle: 'Practical tips to maximize the synergy between AI and human intelligence for better decisions, creativity, and teamwork.',
      author: 'NPI AI Academy',
      authorPhoto: 'npiaiLogo.png',
      authorDescription: 'NPI AI Academy empowers individuals and teams to work confidently and effectively with Artificial Intelligence. We provide hands-on learning, real-world use cases, and peer-driven knowledge sharing to help people combine AI with human creativity, judgment, and collaboration.',
      date: 'March 17, 2025',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      id: 'curious-about-ai',
      title: 'Curious About AI? Here\'s a Simple Guide to Your Questions',
      subtitle: 'We all have questions about AI — what it is, how it works, and how we can use it. Let\'s answer them step by step, in simple terms.',
      author: 'Mikko Bautista',
      authorPhoto: 'Contributors Image/MikkoBautista.jpg',
      authorDescription: 'Mikko Bautista is part of the NPI AI Academy team, dedicated to helping professionals integrate AI into everyday work. Passionate about empowering people with technology, Mikko focuses on practical applications of AI that enhance productivity, creativity, and collaboration.',
      date: 'March 18, 2025',
      gradient: 'from-sky-500 to-indigo-600',
    },
    {
      id: 'learning-ai-step-by-step',
      title: 'Learning AI Step by Step: No Shortcuts, Just Experience',
      subtitle: 'The most effective way to truly understand AI is slowly, deliberately, and practically — one prompt at a time.',
      author: 'Mikko Bautista',
      authorPhoto: 'Contributors Image/MikkoBautista.jpg',
      authorDescription: 'Mikko Bautista is part of the NPI AI Academy team, dedicated to helping professionals integrate AI into everyday work. Passionate about empowering people with technology, Mikko focuses on practical applications of AI that enhance productivity, creativity, and collaboration.',
      date: 'March 18, 2025',
      gradient: 'from-rose-500 to-pink-600',
    },
    {
      id: 'understanding-ai',
      title: 'Understanding Artificial Intelligence: A Simple Guide for Everyone',
      subtitle: 'A beginner-friendly guide to AI — what it is, how it works, and how it can support your daily work and professional growth.',
      author: 'Mikko Bautista',
      authorPhoto: 'Contributors Image/MikkoBautista.jpg',
      authorDescription: 'Mikko Bautista is part of the NPI AI Academy team, dedicated to helping professionals integrate AI into everyday work. Passionate about empowering people with technology, Mikko focuses on practical applications of AI that enhance productivity, creativity, and collaboration.',
      date: 'March 17, 2025',
      gradient: 'from-primary to-primary-dark',
    },
    {
      id: 'work-smarter',
      title: 'How AI Can Help You Work Smarter, Not Harder',
      subtitle: 'Practical ways AI can simplify tasks, improve efficiency, and help professionals focus on meaningful work.',
      author: 'Mikko Bautista',
      authorPhoto: 'Contributors Image/MikkoBautista.jpg',
      date: 'March 17, 2025',
      gradient: 'from-violet-500 to-violet-700',
    },
    {
      id: 'ai-everyday-work',
      title: 'Artificial Intelligence in Everyday Work',
      subtitle: 'How AI is already transforming daily work — from automating routine tasks to enabling smarter decisions and human growth.',
      author: 'Mikko Bautista',
      authorPhoto: 'Contributors Image/MikkoBautista.jpg',
      date: 'March 17, 2025',
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      id: 'why-learning-ai-matters',
      title: 'Why Learning AI Matters Today',
      subtitle: 'Understanding AI today is not just about keeping up — it\'s about preparing to thrive in a rapidly evolving world.',
      author: 'Mikko Bautista',
      authorPhoto: 'Contributors Image/MikkoBautista.jpg',
      date: 'March 17, 2025',
      gradient: 'from-amber-500 to-orange-600',
    },
  ];

  get groupedArticles(): { author: string; authorPhoto?: string; authorDescription?: string; articles: Article[] }[] {
    const groups = new Map<string, { photo?: string; description?: string; articles: Article[] }>();
    for (const article of this.articles) {
      const entry = groups.get(article.author) ?? { photo: article.authorPhoto, description: article.authorDescription, articles: [] };
      entry.articles.push(article);
      groups.set(article.author, entry);
    }
    return Array.from(groups.entries()).map(([author, { photo, description, articles }]) => ({ author, authorPhoto: photo, authorDescription: description, articles }));
  }

  get selectedAuthorGroup(): { author: string; authorPhoto?: string; articles: Article[] } | null {
    if (!this.selectedAuthor) return null;
    return this.groupedArticles.find(g => g.author === this.selectedAuthor) ?? null;
  }

  get selectedArticle(): Article | null {
    if (!this.selectedArticleId) return null;
    return this.articles.find(a => a.id === this.selectedArticleId) ?? null;
  }

  selectAuthor(author: string): void {
    this.selectedAuthor = author;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  clearAuthor(): void {
    this.selectedAuthor = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  selectArticle(id: string): void {
    this.selectedArticleId = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  clearSelection(): void {
    this.selectedArticleId = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  clearAll(): void {
    this.selectedArticleId = null;
    this.selectedAuthor = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
