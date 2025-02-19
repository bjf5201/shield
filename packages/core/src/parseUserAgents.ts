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