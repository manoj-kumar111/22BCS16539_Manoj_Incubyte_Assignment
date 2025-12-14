import { Button } from '@/components/ui/button';
import { ArrowDown, Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-hero py-20 md:py-32">
      {/* Decorative elements */}
      <div className="absolute left-10 top-20 text-6xl opacity-20 animate-float">🍬</div>
      <div className="absolute right-20 top-32 text-5xl opacity-20 animate-float-delayed">🍭</div>
      <div className="absolute bottom-20 left-1/4 text-4xl opacity-20 animate-float">🍫</div>
      <div className="absolute right-10 bottom-32 text-5xl opacity-20 animate-float-delayed">🍪</div>

      <div className="container mx-auto px-4 text-center">
        <div className="mx-auto max-w-3xl">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Welcome to the Sweetest Place Online
          </div>

          {/* Main heading */}
          <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl">
            Indulge in Our
            <span className="relative mx-2 inline-block">
              <span className="relative z-10 text-primary">Delicious</span>
              <svg
                className="absolute -bottom-2 left-0 h-3 w-full text-primary/30"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 8 Q25 0, 50 8 T100 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            Sweet Collection
          </h1>

          {/* Subheading */}
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            Discover a world of handcrafted candies, premium chocolates, and 
            nostalgic treats. From artisan bonbons to classic gummies, we have 
            something for every sweet tooth.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="hero" size="xl" asChild>
              <a href="#sweets">
                Browse Sweets
                <ArrowDown className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#categories">View Categories</a>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-4 md:gap-8">
            <div className="rounded-2xl bg-card/50 p-4 shadow-card backdrop-blur-sm">
              <div className="font-display text-2xl font-bold text-primary md:text-4xl">50+</div>
              <div className="text-sm text-muted-foreground">Unique Sweets</div>
            </div>
            <div className="rounded-2xl bg-card/50 p-4 shadow-card backdrop-blur-sm">
              <div className="font-display text-2xl font-bold text-primary md:text-4xl">100%</div>
              <div className="text-sm text-muted-foreground">Fresh Daily</div>
            </div>
            <div className="rounded-2xl bg-card/50 p-4 shadow-card backdrop-blur-sm">
              <div className="font-display text-2xl font-bold text-primary md:text-4xl">5★</div>
              <div className="text-sm text-muted-foreground">Customer Love</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
