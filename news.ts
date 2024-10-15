import { parse } from "https://deno.land/x/xml@6.0.0/mod.ts";

// Function to fetch and parse the atom feed
async function fetchAtomFeed(url: string) {
  const response = await fetch(url);
  const data = await response.text();

  const parsedData = parse(data);

  return parsedData.feed.entry;
}

// Function to filter entries from the last day
function filterEntriesFromLastDay(entries: any[]) {
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  return entries.filter((entry: any) => {
    const entryDate = new Date(entry.updated);

    return entryDate > oneDayAgo;
  });
}

// Main function to fetch, filter, and log the titles
async function main() {
  const url = "https://simonwillison.net/atom/everything/";
  const entries = await fetchAtomFeed(url);

  const recentEntries = filterEntriesFromLastDay(entries);

  console.log("Entries from the last day:");
  for (const entry of recentEntries) {
    console.log(`- ${entry.title}`);
  }
}

// Execute the main function
main();
