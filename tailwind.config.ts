import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: ['class'],
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: {
                    DEFAULT: 'hsl(var(--input))',
                    background: 'hsl(var(--input-background))'
                },
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                },
                pink: 'hsl(var(--pink))',
                'pink-2': 'hsl(var(--pink-2))',
                'pink-light': 'hsl(var(--pink-light))',
                'grey-1': 'hsl(var(--grey-1))',
                'grey-2': 'hsl(var(--grey-2))',
                'grey-3': 'hsl(var(--grey-3))',
                'grey-4': 'hsl(var(--grey-4))',
                'grey-5': 'hsl(var(--grey-5))',
                'grey-6': 'hsl(var(--grey-6))',
                violet: 'hsl(var(--violet))',
                'violet-2': 'hsl(var(--violet-2))',
                'violet-3': 'hsl(var(--violet-3))',
                'black-1': 'hsl(var(--black-1))'
            },
            fontFamily: {
                sans: ['var(--font-geist-sans)'],
                mono: ['var(--font-geist-mono)'],
                clash: ['var(--font-clashdisplay)'],
                roboto: ['var(--font-roboto)']
            },
            keyframes: {
                'accordion-down': {
                    from: {
                        height: '0'
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)'
                    }
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)'
                    },
                    to: {
                        height: '0'
                    }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out'
            }
        }
    },
    plugins: [require('tailwindcss-animate')]
};
export default config;
