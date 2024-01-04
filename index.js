const plugin = require("tailwindcss/plugin");

const isValidLanguageConfig = (config) => {
  return (
    config !== undefined &&
    Array.isArray(config) &&
    config.length > 0 &&
    config.every((lang) => typeof lang === "string")
  );
};

const TailwindLangugeVariantPlugin = plugin(function ({
  addVariant,
  e,
  config,
}) {
  const languages = isValidLanguageConfig(config("theme.languages"))
    ? config("theme.languages")
    : ["tw"];

  languages.forEach((lang) => {
    addVariant(`${lang}`, ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `[lang="${lang}"] .${e(`${lang}${separator}${className}`)}`;
      });
    });
  });
});

module.exports = TailwindLangugeVariantPlugin;
