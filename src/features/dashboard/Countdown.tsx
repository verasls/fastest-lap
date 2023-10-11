function Countdown() {
  const timeRemaining = "00:00";

  return (
    <div className="text-s inline-flex h-8 w-11/12 items-center justify-center rounded-md bg-red-600 px-3 text-neutral-50 shadow">
      {timeRemaining}
    </div>
  );
}

export default Countdown;
