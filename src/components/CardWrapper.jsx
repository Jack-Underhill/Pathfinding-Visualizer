export default function CardWrapper({ children, className }) {
    return (
        <div
            className={`
                 p-4 rounded-xl 
                bg-white/5 backdrop-blur-3xl
                border border-cyan-400/20
                shadow-[0_0_30px_#00f5ff33] 
                text-white
                ${className}
            `}
        >
            {children}
        </div>
    );
}