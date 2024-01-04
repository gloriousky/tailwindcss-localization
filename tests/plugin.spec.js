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

describe("tailwindcss-languages-config", () => {
  test("When set to an empty array, default variable should be generated", async () => {
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

  test("When set to an empty object, default variable should be generated", async () => {
    config.theme.languages = {};
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

  test("Default variable should be generated without language config", async () => {
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

  test("The tw and en variables should be generated when both languages are set", async () => {
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

  test("The tw and en variables should be generated when both languages are set", async () => {
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

  test("When replacing prefix with object as language settings, taiwan and english variables should be generated", async () => {
    config.theme.languages = { taiwan: "tw", english: "en" };
    const input = `
            .test {
                @apply font-medium taiwan:font-semibold english:font-bold;
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
