import { parseUserAgents, parseCategories, fetchUserAgents } from "../src/parseUserAgents.ts";

describe("parseUserAgents", () => {
  it("should extract agent names from HTML", () => {
    const html = `<div class="name agent-name">UserAgent1</div>
                  <div class="name agent-name">UserAgent2</div>`;
    const agents = parseUserAgents(html);
    expect(agents).toEqual(["UserAgent1", "UserAgent2"]);
  });
  it("should handle empty HTML", () => {
    const html = "";
    const agents = parseUserAgents(html);
    expect(agents).toEqual([]);
  });
  it("should handle HTML with no agent names", () => {
    const html = `<div>No agent names here</div>`;
    const agents = parseUserAgents(html);
    expect(agents).toEqual([]);
  });
});

describe("parseCategories", () => {
  it("should extract the User Agent category from the HTML", () => {
    const html = `<div class="tag">Category1</div>`;
    const category = parseCategories(html);
    expect(category).toEqual(["Category1"]);
  });

  it("should handle empty HTML", () => {
    const html = "";
    const category = parseCategories(html);
    expect(category).toEqual([]);
  });

  it("should handle HTML with no category", () => {
    const html = `<div>No category here</div>`;
    const category = parseCategories(html);
    expect(category).toEqual([]);
  });

  it("should handle HTML with multiple categories", () => {
    const html = `<div class="tag">Category1</div>
                  <div class="tag">Category2</div>`;
    const category = parseCategories(html);
    expect(category).toEqual(["Category1", "Category2"]);
  });
});
