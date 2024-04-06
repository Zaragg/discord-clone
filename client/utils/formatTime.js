export function formatTime(dateString) {
  const currentTime = new Date();
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  var diff = Math.abs(
    Math.round((date.getTime() - currentTime.getTime()) / 1000 / (60 * 60))
  );
  if (diff < 24) {
    return `Today at ${date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}`;
  } else if (diff >= 24 && diff <= 48) {
    return `Yesterday at ${date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}`;
  } else {
    return `${year}/${month}/${day} ${date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}`;
  }
}
