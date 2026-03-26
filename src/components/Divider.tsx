export default function Divider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`mx-auto h-px w-[60px] bg-accent opacity-60 ${className}`}
    />
  );
}
