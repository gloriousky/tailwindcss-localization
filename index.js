const plugin = require("tailwindcss/plugin");

const isValidLanguageConfig = (config) => {
  return (
    config !== undefined &&
    ((Array.isArray(config) && config.length > 0) ||
      (typeof config === "object" &&
        config !== null &&
        Object.keys(config).length > 0))
  );
};

const TailwindLangugeVariantPlugin = plugin(function ({
  addVariant,
  config,
  e,
}) {
  const languages = isValidLanguageConfig(config("theme.languages"))
    ? config("theme.languages")
    : ["tw"];

  let data = [];

  if (Array.isArray(languages)) {
    data = languages.map((lang) => ({ attr: lang, name: lang }));
  } else {
    for (let name in languages) {
      data.push({ attr: languages[name], name });
    }
  }

  if (!data.length) {
    throw new Error("No languages found in theme.");
  }

  data.forEach(({ attr, name: lang }) => {
    addVariant(`${lang}`, ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `[lang="${attr}"] .${e(`${lang}${separator}${className}`)}`;
      });
    });
  });
});

module.exports = TailwindLangugeVariantPlugin;
