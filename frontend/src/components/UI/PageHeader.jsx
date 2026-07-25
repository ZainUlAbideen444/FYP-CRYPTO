export default function PageHeader({
  title,
  subtitle,
}) {
  return (
    <div className="mb-10">

      <h1 className="text-white text-4xl font-black">
        {title}
      </h1>

      <p className="text-gray-400 mt-2">
        {subtitle}
      </p>

    </div>
  );
}