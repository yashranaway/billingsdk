"use client";

import { useRef } from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "@/contexts/theme-context";
import { themes } from "@/lib/themes";
import { defineMonacoThemes } from "./monaco-themes";

interface MonacoEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  height?: string | number;
  readOnly?: boolean;
  onMount?: (editor: any, monaco: any) => void;
}

export function MonacoEditor({
  value,
  onChange,
  language,
  height = "100%",
  readOnly = false,
  onMount,
}: MonacoEditorProps) {
  const { previewDarkMode, currentTheme } = useTheme();
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // Define custom themes
    defineMonacoThemes(monaco, themes);
    
    // Configure editor options
    editor.updateOptions({
      fontSize: 14,
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace",
      lineHeight: 24,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      wordWrap: "on",
      lineNumbers: "on",
      renderLineHighlight: "line",
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly,
      cursorStyle: "line",
      cursorBlinking: "blink",
      cursorSmoothCaretAnimation: "on",
      smoothScrolling: true,
      contextmenu: true,
      mouseWheelZoom: true,
      bracketPairColorization: { enabled: true },
      guides: {
        bracketPairs: true,
        indentation: true,
      },
      suggest: {
        showKeywords: true,
        showSnippets: true,
        showFunctions: true,
        showConstructors: true,
        showFields: true,
        showVariables: true,
        showClasses: true,
        showStructs: true,
        showInterfaces: true,
        showModules: true,
        showProperties: true,
        showEvents: true,
        showOperators: true,
        showUnits: true,
        showValues: true,
        showConstants: true,
        showEnums: true,
        showEnumMembers: true,
        showColors: true,
        showFiles: true,
        showReferences: true,
        showFolders: true,
        showTypeParameters: true,
        showIssues: true,
        showUsers: true,
        showWords: true,
      },
    });

    // Configure TypeScript/JavaScript settings
    if (language === "typescript" || language === "javascript" || language === "tsx") {
      monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
      monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
      
      monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES2020,
        allowNonTsExtensions: true,
        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        module: monaco.languages.typescript.ModuleKind.CommonJS,
        noEmit: true,
        esModuleInterop: true,
        jsx: monaco.languages.typescript.JsxEmit.React,
        reactNamespace: "React",
        allowJs: true,
        typeRoots: ["node_modules/@types"],
      });

      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false,
      });
    }

    // Call the onMount callback if provided
    if (onMount) {
      onMount(editor, monaco);
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChange(value);
    }
  };

  return (
    <Editor
      height={height}
      language={language}
      value={value}
      onChange={handleEditorChange}
      onMount={handleEditorDidMount}
      theme={previewDarkMode ? `${currentTheme.name}-dark` : `${currentTheme.name}-light`}
      options={{
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly,
        cursorStyle: "line",
        automaticLayout: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 14,
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace",
        lineHeight: 24,
        wordWrap: "on",
        lineNumbers: "on",
        renderLineHighlight: "line",
        cursorBlinking: "blink",
        cursorSmoothCaretAnimation: "on",
        smoothScrolling: true,
        contextmenu: true,
        mouseWheelZoom: true,
        bracketPairColorization: { enabled: true },
        guides: {
          bracketPairs: true,
          indentation: true,
        },
      }}
    />
  );
}
