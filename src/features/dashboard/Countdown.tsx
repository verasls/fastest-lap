import { useEffect, useState } from "react";
import { getTimeRemainingInSeconds } from "@/lib/helpers";

function Countdown({
  sessionDate,
  sessionTime,
}: {
  sessionDate: string;
  sessionTime: string;
}) {
  const [timeRemaining, setTimeRemaining] = useState<number>(() =>
    getTimeRemainingInSeconds({
      targetDate: sessionDate,
      targetTime: sessionTime,
    })
  );
  const [blink, setBlink] = useState<boolean>(false);

  const hours = String(Math.floor(timeRemaining / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((timeRemaining % 3600) / 60)).padStart(
    2,
    "0"
  );
  const countdownTime = `${hours}h ${minutes}min`;

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeRemaining((time) => {
        if (time <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return time - 1;
      });

      setBlink(true);
      setTimeout(() => setBlink(false), 400);
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  return (
    <div className="inline-flex h-8 w-[13ch] select-none items-center justify-center rounded-md bg-red-600 px-3 text-xs text-neutral-50 shadow">
      {countdownTime === "00:00" ? (
        <span>Ongoing</span>
      ) : (
        <span className={`${blink ? "text-red-600" : ""}`}>
          {countdownTime}
        </span>
      )}
    </div>
  );
}

export default Countdown;
