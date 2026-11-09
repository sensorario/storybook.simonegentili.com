import type { Preview } from "@storybook/react-vite";
import { useEffect } from "react";
import "../src/components/themes.css";
import { LANGUAGE_NAMES, SUPPORTED_LANGUAGES, sgI18n } from "../src/i18n";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        a11y: {
            test: "todo",
        },
    },
    decorators: [
        (Story, context) => {
            useEffect(() => {
                document.body.style.background = "var(--sg-bg)";
                document.body.style.color = "var(--sg-text)";
            }, []);
            useEffect(() => {
                sgI18n.changeLanguage(context.globals.locale || "it");
            }, [context.globals.locale]);
            return <Story />;
        }
    ],
    globalTypes: {
        locale: {
            name: "Locale",
            description: "Language of the sg namespace",
            defaultValue: "it",
            toolbar: {
                icon: "globe",
                items: SUPPORTED_LANGUAGES.map((lang) => ({ value: lang, title: LANGUAGE_NAMES[lang] })),
            },
        },
    },
};

export default preview;
