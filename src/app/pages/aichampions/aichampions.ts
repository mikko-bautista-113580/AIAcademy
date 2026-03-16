import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Champion {
  id: string;
  name: string;
  role: string;
  photo: string;
  quote: string;
  gradient: string;
}

@Component({
  selector: 'app-aichampions',
  imports: [RouterLink],
  templateUrl: './aichampions.html',
  styleUrl: './aichampions.scss',
})
export class AIChampions {
  champions: Champion[] = [
    {
      id: 'mikko-bautista',
      name: 'Mikko Bautista',
      role: 'Software Engineer II',
      photo: 'Contributors Image/MikkoBautista.jpg',
      quote: 'I enjoy experimenting with AI tools and workflows to find practical ways to simplify development tasks, improve productivity, and support my team in adopting new technologies. By testing different AI models and integrating them into our engineering processes, I\'m continuously learning how AI can transform both our daily work and how we solve problems.',
      gradient: 'from-primary to-primary-dark',
    },
    {
      id: 'junie-perez',
      name: 'Junie Perez',
      role: 'Senior Software Engineer',
      photo: 'Contributors Image/JuniePerez.jpg',
      quote: 'I believe the best engineering happens when human expertise meets AI capability. My goal is to lead by example — building smarter, shipping faster, and showing what\'s possible when you fully embrace AI in software development. If it can be done better with AI, I\'ll find the way.',
      gradient: 'from-violet-500 to-violet-700',
    },
    {
      id: 'joi-cacanindin',
      name: 'Joi Bambino Cacanindin',
      role: 'Senior Software Engineer',
      photo: 'AIChampions/JoiBambinoCacanindin.jpg',
      quote: 'I am a developer who sees AI as a learning accelerator and force multiplier. I am driven by growth — exploring new problems, building tools, and sharing solutions. It lets me move faster through the exploration phase while staying sharp on the implementation, so I can tackle challenges efficiently and turn them into reusable tools for my team. AI helps on amplifying my ability to learn, build and scale.',
      gradient: 'from-emerald-500 to-emerald-700',
    },
    {
      id: 'anjo-tadena',
      name: 'Anjo Tadena',
      role: 'Senior Software Engineer',
      photo: 'AIChampions/AnjoTadena.jpg',
      quote: 'AI has become my 24/7 pair programmer. It helps me explore ideas, enhance and validate code, and continuously learn while implementing scalable solutions. By combining AI tools with my experience, I can experiment, solve problems, and deliver value to the team—without compromising my daily tasks—while also helping teammates resolve challenges more efficiently.',
      gradient: 'from-amber-500 to-orange-600',
    },
  ];
}
