import Vue from "vue";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

Vue.filter("formatTime", (Milliseconds, format = "HH:MM:SS") => {
  if (!Milliseconds) return "";
  dayjs.extend(duration);
  dayjs.extend(relativeTime);

  if (format === "HH:MM:SS") {
    let time = dayjs.duration(Milliseconds);
    let hours = time.hours().toString();
    let mins = time.minutes().toString();
    let seconds = time.seconds().toString().padStart(2, "0");
    return hours !== "0"
      ? `${hours}:${mins.padStart(2, "0")}:${seconds}`
      : `${mins}:${seconds}`;
  } else if (format === "Human") {
    let time = dayjs(Milliseconds);
    //TODO
    return `${time.year()}年${time.month() + 1}月${time.date()}日`;
  }
});

//格式化
Vue.filter("artists", (artists) => {
  if (!artists) return "";
  return artists.length > 0
    ? artists
        .map((item) => {
          return item.name;
        })
        .join("/")
    : "";
});
