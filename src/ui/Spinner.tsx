export default function Spinner() {
  return (
    <div className="mx-auto my-12 flex h-16 w-16 animate-spin items-center  justify-center rounded-full bg-gradient-to-tr from-red-200 to-red-600">
      <div className="h-12 w-12 rounded-full bg-neutral-50"></div>
    </div>
  );
}
