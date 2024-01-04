const postcss = require("postcss");
const tailwindcss = require("tailwindcss");
const cssMatcher = require("jest-matcher-css");

const defaultConfig = require("tailwindcss/defaultConfig");
const plugin = require("../index");

const config = {
  ...defaultConfig,
  plugins: [plugin],
};

expect.extend({
  toMatchCss: cssMatcher,
});

describe("tailwindcss-language-variant", () => {
  test("should generate tw variant with language config set to empty array", async () => {
    config.theme.languages = [];
    const input = `
            .test {
                @apply tw:font-bold;
            }
        `;

    const result = await postcss(tailwindcss(config)).process(input, {
      from: undefined,
    });

    expect(result.css).toMatchCss(`
            [lang="tw"] .test {
                font-weight: 700
            }
        `);
  });

  test("should generate tw variant with language config set to array objects", async () => {
    config.theme.languages = [{ tw: "tw" }, { en: "en" }];
    const input = `
            .test {
                @apply tw:font-bold;
            }
        `;

    const result = await postcss(tailwindcss(config)).process(input, {
      from: undefined,
    });

    expect(result.css).toMatchCss(`
            [lang="tw"] .test {
                font-weight: 700
            }
        `);
  });

  test("should generate tw variant with language config set as string", async () => {
    config.theme.languages = "tw, en";
    const input = `
            .test {
                @apply tw:font-bold;
            }
        `;

    const result = await postcss(tailwindcss(config)).process(input, {
      from: undefined,
    });

    expect(result.css).toMatchCss(`
            [lang="tw"] .test {
                font-weight: 700
            }
        `);
  });

  test("should generate tw variant without language config", async () => {
    const input = `
            .test {
                @apply tw:font-bold;
            }
        `;

    const result = await postcss(tailwindcss(config)).process(input, {
      from: undefined,
    });

    expect(result.css).toMatchCss(`
            [lang="tw"] .test {
                font-weight: 700
            }
        `);
  });

  test("should generate tw and en variant with language config set to both", async () => {
    config.theme.languages = ["tw", "en"];
    const input = `
            .test {
                @apply en:font-bold;
                @apply tw:font-bold;
            }
        `;

    const result = await postcss(tailwindcss(config)).process(input, {
      from: undefined,
    });

    expect(result.css).toMatchCss(`
            [lang="en"] .test {
                font-weight: 700
            }
            [lang="tw"] .test {
                font-weight: 700
            }
        `);
  });

  test("should generate default, tw and en variant with language config set to both", async () => {
    config.theme.languages = ["tw", "en"];
    const input = `
            .test {
                @apply font-medium en:font-bold tw:font-semibold;
            }
        `;

    const result = await postcss(tailwindcss(config)).process(input, {
      from: undefined,
    });

    expect(result.css).toMatchCss(`
            .test {
                font-weight: 500
            }
            [lang="tw"] .test {
              font-weight: 600
            }
            [lang="en"] .test {
                font-weight: 700
            }
        `);
  });
});
