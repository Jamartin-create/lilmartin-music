import Vue from "vue";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

Vue.filter("formatTime", (Milliseconds, format = "HH:MM:SS") => {
  if (!Milliseconds) return "";
  dayjs.extend(duration);
  dayjs.extend(relativeTime);

  let time = dayjs.duration(Milliseconds);
  let hours = time.hours().toString();
  let mins = time.minutes().toString();
  let seconds = time.seconds().toString().padStart(2, "0");

  if (format === "HH:MM:SS") {
    return hours !== "0"
      ? `${hours}:${mins.padStart(2, "0")}:${seconds}`
      : `${mins}:${seconds}`;
  } else if (format === "Human") {
    //TODO
  }
});
