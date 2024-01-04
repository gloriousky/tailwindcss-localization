## Tailwind CSS Variant Plugin

This plugin adds a new variant called `{language}` that can be used to style elements based on their language. This can be useful for creating multilingual websites or applications.

## Installation

1. Install the plugin using npm or Yarn:

   ```bash
   # Using npm
   npm install -D @gloriousky/tailwindcss-localization

   # Using Yarn
   yarn add -D @gloriousky/tailwindcss-localization
   ```

2. Add the plugin to your `tailwind.config.js` file. The default language is bn (Chinese traditional). You can add as many language as you like using the `languages` option in theme configuration.

   ```js
   // tailwind.config.js
   module.exports = {
     theme: {
       languages: ["tw", "en"],
     },
     plugins: [require("@gloriousky/tailwindcss-localization")],
   };
   ```

3. The plugin assumes that you have a `lang` attribute in your HTML tag and it is handles by your application or website. You can then use the `{language}` variant in your HTML like this:

   ```html
   <html lang="en">
     <body>
       <h1 class="en:text-lg">Hello, world!</h1>
     </body>
   </html>
   ```

   This will generate in the following CSS:

   ```css
   [lang="en"] .en\:text-lg {
     font-size: 1.125rem;
     line-height: 1.75rem;
   }
   ```

## Feature

If you want a prefix that is different from the attribute value, specify the languages as an object:

```js
// tailwind.config.js
module.exports = {
  theme: {
    languages: {
      taiwan: "tw",
      english: "en",
    },
  },
  plugins: [require("@gloriousky/tailwindcss-localization")],
};
```

```html
<html lang="en">
  <body>
    <h1 class="english:text-lg">Hello, world!</h1>
    <p class="taiwan:text-lg">Hello, world!</p>
  </body>
</html>
```

This will generate in the following CSS:

```css
[lang="en"] .english\:text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
[lang="tw"] .taiwan\:text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
```

## Changelog

- `1.1.0`: Feature - Use different prefixes
- `1.0.0`: Initial release
