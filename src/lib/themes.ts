export interface Theme {
  name: string;
  label: string;
  cssVars: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
}

export const themes: Theme[] = [
  {
    name: "default",
    label: "Default",
    cssVars: {
      light: {
        "--background": "oklch(1 0 0)",
        "--foreground": "oklch(0.145 0 0)",
        "--card": "oklch(1 0 0)",
        "--card-foreground": "oklch(0.145 0 0)",
        "--popover": "oklch(1 0 0)",
        "--popover-foreground": "oklch(0.145 0 0)",
        "--primary": "oklch(0.205 0 0)",
        "--primary-foreground": "oklch(0.985 0 0)",
        "--secondary": "oklch(0.97 0 0)",
        "--secondary-foreground": "oklch(0.205 0 0)",
        "--muted": "oklch(0.97 0 0)",
        "--muted-foreground": "oklch(0.556 0 0)",
        "--accent": "oklch(0.97 0 0)",
        "--accent-foreground": "oklch(0.205 0 0)",
        "--destructive": "oklch(0.577 0.245 27.325)",
        "--border": "oklch(0.922 0 0)",
        "--input": "oklch(0.922 0 0)",
        "--ring": "oklch(0.708 0 0)",
        "--radius": "0.625rem"
      },
      dark: {
        "--background": "oklch(0.145 0 0)",
        "--foreground": "oklch(0.985 0 0)",
        "--card": "oklch(0.205 0 0)",
        "--card-foreground": "oklch(0.985 0 0)",
        "--popover": "oklch(0.205 0 0)",
        "--popover-foreground": "oklch(0.985 0 0)",
        "--primary": "oklch(0.922 0 0)",
        "--primary-foreground": "oklch(0.205 0 0)",
        "--secondary": "oklch(0.269 0 0)",
        "--secondary-foreground": "oklch(0.985 0 0)",
        "--muted": "oklch(0.269 0 0)",
        "--muted-foreground": "oklch(0.708 0 0)",
        "--accent": "oklch(0.269 0 0)",
        "--accent-foreground": "oklch(0.985 0 0)",
        "--destructive": "oklch(0.704 0.191 22.216)",
        "--border": "oklch(1 0 0 / 10%)",
        "--input": "oklch(1 0 0 / 15%)",
        "--ring": "oklch(0.556 0 0)"
      }
    }
  },
  {
    name: "blue",
    label: "Blue",
    cssVars: {
      light: {
        "--background": "oklch(1 0 0)",
        "--foreground": "oklch(0.145 0 0)",
        "--card": "oklch(1 0 0)",
        "--card-foreground": "oklch(0.145 0 0)",
        "--popover": "oklch(1 0 0)",
        "--popover-foreground": "oklch(0.145 0 0)",
        "--primary": "oklch(0.6 0.25 253)",
        "--primary-foreground": "oklch(0.985 0 0)",
        "--secondary": "oklch(0.97 0.01 253)",
        "--secondary-foreground": "oklch(0.205 0 0)",
        "--muted": "oklch(0.97 0.01 253)",
        "--muted-foreground": "oklch(0.556 0.01 253)",
        "--accent": "oklch(0.94 0.05 253)",
        "--accent-foreground": "oklch(0.205 0 0)",
        "--destructive": "oklch(0.577 0.245 27.325)",
        "--border": "oklch(0.922 0.01 253)",
        "--input": "oklch(0.922 0.01 253)",
        "--ring": "oklch(0.6 0.25 253)",
        "--radius": "0.625rem"
      },
      dark: {
        "--background": "oklch(0.145 0.01 253)",
        "--foreground": "oklch(0.985 0 0)",
        "--card": "oklch(0.205 0.01 253)",
        "--card-foreground": "oklch(0.985 0 0)",
        "--popover": "oklch(0.205 0.01 253)",
        "--popover-foreground": "oklch(0.985 0 0)",
        "--primary": "oklch(0.7 0.2 253)",
        "--primary-foreground": "oklch(0.145 0.01 253)",
        "--secondary": "oklch(0.269 0.01 253)",
        "--secondary-foreground": "oklch(0.985 0 0)",
        "--muted": "oklch(0.269 0.01 253)",
        "--muted-foreground": "oklch(0.708 0.01 253)",
        "--accent": "oklch(0.35 0.05 253)",
        "--accent-foreground": "oklch(0.985 0 0)",
        "--destructive": "oklch(0.704 0.191 22.216)",
        "--border": "oklch(1 0 0 / 10%)",
        "--input": "oklch(1 0 0 / 15%)",
        "--ring": "oklch(0.7 0.2 253)"
      }
    }
  },
  {
    name: "green",
    label: "Green",
    cssVars: {
      light: {
        "--background": "oklch(1 0 0)",
        "--foreground": "oklch(0.145 0 0)",
        "--card": "oklch(1 0 0)",
        "--card-foreground": "oklch(0.145 0 0)",
        "--popover": "oklch(1 0 0)",
        "--popover-foreground": "oklch(0.145 0 0)",
        "--primary": "oklch(0.5 0.2 142)",
        "--primary-foreground": "oklch(0.985 0 0)",
        "--secondary": "oklch(0.97 0.01 142)",
        "--secondary-foreground": "oklch(0.205 0 0)",
        "--muted": "oklch(0.97 0.01 142)",
        "--muted-foreground": "oklch(0.556 0.01 142)",
        "--accent": "oklch(0.94 0.05 142)",
        "--accent-foreground": "oklch(0.205 0 0)",
        "--destructive": "oklch(0.577 0.245 27.325)",
        "--border": "oklch(0.922 0.01 142)",
        "--input": "oklch(0.922 0.01 142)",
        "--ring": "oklch(0.5 0.2 142)",
        "--radius": "0.625rem"
      },
      dark: {
        "--background": "oklch(0.145 0.01 142)",
        "--foreground": "oklch(0.985 0 0)",
        "--card": "oklch(0.205 0.01 142)",
        "--card-foreground": "oklch(0.985 0 0)",
        "--popover": "oklch(0.205 0.01 142)",
        "--popover-foreground": "oklch(0.985 0 0)",
        "--primary": "oklch(0.65 0.15 142)",
        "--primary-foreground": "oklch(0.145 0.01 142)",
        "--secondary": "oklch(0.269 0.01 142)",
        "--secondary-foreground": "oklch(0.985 0 0)",
        "--muted": "oklch(0.269 0.01 142)",
        "--muted-foreground": "oklch(0.708 0.01 142)",
        "--accent": "oklch(0.35 0.05 142)",
        "--accent-foreground": "oklch(0.985 0 0)",
        "--destructive": "oklch(0.704 0.191 22.216)",
        "--border": "oklch(1 0 0 / 10%)",
        "--input": "oklch(1 0 0 / 15%)",
        "--ring": "oklch(0.65 0.15 142)"
      }
    }
  },
  {
    name: "orange",
    label: "Orange",
    cssVars: {
      light: {
        "--background": "oklch(1 0 0)",
        "--foreground": "oklch(0.145 0 0)",
        "--card": "oklch(1 0 0)",
        "--card-foreground": "oklch(0.145 0 0)",
        "--popover": "oklch(1 0 0)",
        "--popover-foreground": "oklch(0.145 0 0)",
        "--primary": "oklch(0.6 0.2 42)",
        "--primary-foreground": "oklch(0.985 0 0)",
        "--secondary": "oklch(0.97 0.01 42)",
        "--secondary-foreground": "oklch(0.205 0 0)",
        "--muted": "oklch(0.97 0.01 42)",
        "--muted-foreground": "oklch(0.556 0.01 42)",
        "--accent": "oklch(0.94 0.05 42)",
        "--accent-foreground": "oklch(0.205 0 0)",
        "--destructive": "oklch(0.577 0.245 27.325)",
        "--border": "oklch(0.922 0.01 42)",
        "--input": "oklch(0.922 0.01 42)",
        "--ring": "oklch(0.6 0.2 42)",
        "--radius": "0.625rem"
      },
      dark: {
        "--background": "oklch(0.145 0.01 42)",
        "--foreground": "oklch(0.985 0 0)",
        "--card": "oklch(0.205 0.01 42)",
        "--card-foreground": "oklch(0.985 0 0)",
        "--popover": "oklch(0.205 0.01 42)",
        "--popover-foreground": "oklch(0.985 0 0)",
        "--primary": "oklch(0.7 0.15 42)",
        "--primary-foreground": "oklch(0.145 0.01 42)",
        "--secondary": "oklch(0.269 0.01 42)",
        "--secondary-foreground": "oklch(0.985 0 0)",
        "--muted": "oklch(0.269 0.01 42)",
        "--muted-foreground": "oklch(0.708 0.01 42)",
        "--accent": "oklch(0.35 0.05 42)",
        "--accent-foreground": "oklch(0.985 0 0)",
        "--destructive": "oklch(0.704 0.191 22.216)",
        "--border": "oklch(1 0 0 / 10%)",
        "--input": "oklch(1 0 0 / 15%)",
        "--ring": "oklch(0.7 0.15 42)"
      }
    }
  },
  {
    name: "red",
    label: "Red",
    cssVars: {
      light: {
        "--background": "oklch(1 0 0)",
        "--foreground": "oklch(0.145 0 0)",
        "--card": "oklch(1 0 0)",
        "--card-foreground": "oklch(0.145 0 0)",
        "--popover": "oklch(1 0 0)",
        "--popover-foreground": "oklch(0.145 0 0)",
        "--primary": "oklch(0.55 0.25 12)",
        "--primary-foreground": "oklch(0.985 0 0)",
        "--secondary": "oklch(0.97 0.01 12)",
        "--secondary-foreground": "oklch(0.205 0 0)",
        "--muted": "oklch(0.97 0.01 12)",
        "--muted-foreground": "oklch(0.556 0.01 12)",
        "--accent": "oklch(0.94 0.05 12)",
        "--accent-foreground": "oklch(0.205 0 0)",
        "--destructive": "oklch(0.577 0.245 27.325)",
        "--border": "oklch(0.922 0.01 12)",
        "--input": "oklch(0.922 0.01 12)",
        "--ring": "oklch(0.55 0.25 12)",
        "--radius": "0.625rem"
      },
      dark: {
        "--background": "oklch(0.145 0.01 12)",
        "--foreground": "oklch(0.985 0 0)",
        "--card": "oklch(0.205 0.01 12)",
        "--card-foreground": "oklch(0.985 0 0)",
        "--popover": "oklch(0.205 0.01 12)",
        "--popover-foreground": "oklch(0.985 0 0)",
        "--primary": "oklch(0.7 0.2 12)",
        "--primary-foreground": "oklch(0.145 0.01 12)",
        "--secondary": "oklch(0.269 0.01 12)",
        "--secondary-foreground": "oklch(0.985 0 0)",
        "--muted": "oklch(0.269 0.01 12)",
        "--muted-foreground": "oklch(0.708 0.01 12)",
        "--accent": "oklch(0.35 0.05 12)",
        "--accent-foreground": "oklch(0.985 0 0)",
        "--destructive": "oklch(0.704 0.191 22.216)",
        "--border": "oklch(1 0 0 / 10%)",
        "--input": "oklch(1 0 0 / 15%)",
        "--ring": "oklch(0.7 0.2 12)"
      }
    }
  }
];

export function applyScopedTheme(element: HTMLElement, theme: Theme, isDark: boolean) {
  const vars = isDark ? theme.cssVars.dark : theme.cssVars.light;
  
  Object.entries(vars).forEach(([key, value]) => {
    element.style.setProperty(key, value);
  });
}

export function getThemeStyles(theme: Theme, isDark: boolean): React.CSSProperties {
  const vars = isDark ? theme.cssVars.dark : theme.cssVars.light;
  
  const styles: Record<string, string> = {};
  Object.entries(vars).forEach(([key, value]) => {
    styles[key] = value;
  });
  
  return styles as React.CSSProperties;
}
