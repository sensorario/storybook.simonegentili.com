import type { Preview } from "@storybook/react-vite";
import { useEffect } from "react";

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
                document.body.classList.remove("light", "dark");
                document.body.classList.add(context.globals.theme || "light");
            }, [context.globals.theme]);
            return <Story />;
        }
    ],
    globalTypes: {
        theme: {
            name: "Theme",
            description: "Global theme for components",
            defaultValue: "light",
            toolbar: {
                icon: "mirror",
                items: [
                    { value: "default", title: "default" }
                ],
            },
        },
    },
};

export default preview;
