export default function CardWrapper({ children, className }) {
    return (
        <div className="relative w-full h-full rounded-xl">
            <div className="
                absolute -inset-1 z-1
                rounded-xl
                animated-gradient
                bg-gradient-to-r from-pink-300 via-sky-400 to-pink-300
                blur opacity-80
            " />

            <div
                className={`
                    relative z-10 overflow-hidden
                    p-4 rounded-xl
                    bg-[var(--color-card)] text-[var(--color-text)]
                    border border-[var(--color-card-border)]
                    backdrop-blur-3xl
                    ${className}
                `}
            >
                {children}
            </div>
        </div>
    );
}