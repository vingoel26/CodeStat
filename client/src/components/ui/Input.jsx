import { cn } from '../../utils/cn';

function Input({ className, type = 'text', ...props }) {
    return (
        <input
            type={type}
            className={cn(
                'flex h-10 w-full rounded-md border border-[hsl(var(--input))] bg-transparent px-3 py-2 text-sm',
                'placeholder:text-[hsl(var(--muted-foreground))]',
                'focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-offset-2 focus:ring-offset-[hsl(var(--background))]',
                'disabled:cursor-not-allowed disabled:opacity-50',
                className
            )}
            {...props}
        />
    );
}

function Label({ className, children, ...props }) {
    return (
        <label
            className={cn(
                'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                className
            )}
            {...props}
        >
            {children}
        </label>
    );
}

export { Input, Label };
