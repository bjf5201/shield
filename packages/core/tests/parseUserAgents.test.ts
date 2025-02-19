import { parseUserAgents } from "../src/parseUserAgents.ts";


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