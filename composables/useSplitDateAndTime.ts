export const useSplitDateAndTime = (dateRef: Ref<Date>) => {
  const dateString = computed({
    get() {
      const d = dateRef.value;
      const year = d.getFullYear().toString().padStart(2, "0");
      // Btw I want to know on what mushrooms was somebody who thought it was a great idea to index
      // everything from 1, but then suddenly months are indexed from zero
      const month = (d.getMonth() + 1).toString().padStart(2, "0");
      // And what the f**k is this? Why does getDay() suddenly return day of week?
      const day = d.getDate().toString().padStart(2, "0");
      return year + "-" + month + "-" + day;
    },
    set(date: string) {
      dateRef.value = new Date(date + " " + timeString.value);
    },
  });
  const timeString = computed({
    get() {
      const d = dateRef.value;
      const hours = d.getHours().toString().padStart(2, "0");
      const minutes = d.getMinutes().toString().padStart(2, "0");
      return hours + ":" + minutes;
    },
    set(time: string) {
      dateRef.value.setHours(parseInt(time.split(":")[0]));
      dateRef.value.setMinutes(parseInt(time.split(":")[1]));
      dateRef.value = dateRef.value; // <- dirty fix to propagate reactive changes beyond this computed, fix later
    },
  });
  return {
    dateString,
    timeString,
  };
};
