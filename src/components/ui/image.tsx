export function Image({ src, alt, className = "", ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src={src}
            alt={alt}
            className={`max-w-full h-auto ${className}`}
            {...props}
        />
    );
}
