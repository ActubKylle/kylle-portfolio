// Centered, padded content shell. `narrow` constrains to a comfortable reading
// measure for prose-heavy sections.
export default function Container({ narrow = false, className = '', children }) {
  const max = narrow ? 'max-w-3xl' : 'max-w-5xl';
  return (
    <div className={`mx-auto w-full ${max} px-6 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
