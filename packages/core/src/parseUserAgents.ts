import * as cheerio from "cheerio";
import fetch from "node-fetch";

/**
 * Parses the HTML content of the Dark Visitor web page to extract the user agent names.
 *
 * @param {string} html - The HTML content of the Dark Visitor web page.
 * @returns {string[]} An array of user agent names extracted from the HTML.
 */

export function parseUserAgents(html: string): string[] {
  const $ = cheerio.load(html);
  const agentNames: string[] = [];

  $(".name.agent-name").each((index, element) => {
    agentNames.push($(element).text().trim());
  });

  return agentNames;
}

/**
 *
 */

export function parseCategories(html: string): string[]{
  const $ = cheerio.load(html);
  const categories: string[] = [];

  $(".tag").each((index, element) => {
    categories.push($(element).text().trim());
  });

  return categories;
}

/**
 *
 */

export async function fetchUserAgents(categoryExcludes: string[]): Promise<string[]> {
  const url = "https://darkvisitors.com/agents";
  const response = await fetch(url);
  const html = await response.text();

  const agents = parseUserAgents(html);
  const categories = parseCategories(html);
  const userAgents: string[] = [];
  const categoryExcludesSet = new Set(categoryExcludes);

  for (let i = 0; i < agents.length; i++) {
    const category = categories[i] ?? "";
    const agent = agents[i] ?? "";

    if (categoryExcludesSet.has(category)) {
      continue;
    }
    userAgents.push(agent);
  }

  return userAgents;
}