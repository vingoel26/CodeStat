import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Code2 } from 'lucide-react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await login(email, password);
            if (result.success) {
                navigate('/');
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full">
            {/* Left: Login Form */}
            <div className="flex w-full flex-col justify-between p-8 md:w-1/2 lg:p-12 xl:p-24 bg-background">
                <div className="flex items-center gap-2 text-primary font-bold text-xl">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Code2 className="h-5 w-5" />
                    </div>
                    CodeStat
                </div>
                
                <div className="mx-auto w-full max-w-sm space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
                        <p className="text-muted-foreground">
                            Enter your credentials to access your dashboard
                        </p>
                    </div>

                    {error && (
                        <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Password
                                </label>
                                <Link to="#" className="text-sm text-primary hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-11"
                            />
                        </div>
                        <Button type="submit" className="w-full h-11 text-base" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    <div className="text-center text-sm text-muted-foreground">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-primary hover:underline">
                            Sign up
                        </Link>
                    </div>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} CodeStat Inc.
                </div>
            </div>

            {/* Right: Abstract Geometric Art (Mockup Style) */}
            <div className="hidden w-1/2 bg-muted md:block relative overflow-hidden">
                <div className="absolute inset-0 bg-zinc-900">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-blue-600/20"></div>
                    
                    {/* Decorative Elements matching geometric mockup */}
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
                    
                    <div className="absolute bottom-10 left-10 text-white max-w-md">
                        <blockquote className="text-xl font-medium italic border-l-4 border-primary pl-4 mb-2">
                            "The only way to do great work is to love what you do."
                        </blockquote>
                        <cite className="not-italic text-white/60">— Steve Jobs</cite>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
