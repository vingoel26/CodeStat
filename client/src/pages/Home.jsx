import { Rocket } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(var(--background))] to-[hsl(222,84%,8%)] p-4">
      <Card className="w-full max-w-md text-center backdrop-blur-sm bg-[hsl(var(--card))]/80 border-[hsl(var(--border))]/50">
        <CardHeader>
          <div className="flex items-center justify-center gap-3 mb-2">
            <Rocket className="w-10 h-10 text-[hsl(var(--primary))]" />
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--codeforces))] bg-clip-text text-transparent">
              CodeStat
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-[hsl(var(--muted-foreground))] text-lg">
            Coding Profile Dashboard
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <span className="px-3 py-1 rounded-full bg-[hsl(var(--codeforces))]/20 text-[hsl(var(--codeforces))]">
              Codeforces
            </span>
            <span className="px-3 py-1 rounded-full bg-[hsl(var(--codechef))]/20 text-[hsl(var(--codechef))]">
              CodeChef
            </span>
            <span className="px-3 py-1 rounded-full bg-[hsl(var(--leetcode))]/20 text-[hsl(var(--leetcode))]">
              LeetCode
            </span>
            <span className="px-3 py-1 rounded-full bg-[hsl(var(--atcoder))]/20 text-[hsl(var(--atcoder))]">
              AtCoder
            </span>
          </div>

          <Button className="w-full" size="lg">
            Get Started
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Home;
