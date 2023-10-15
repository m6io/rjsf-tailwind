import * as monaco from "monaco-editor/esm/vs/editor/editor.api"
import { useEffect, useRef } from "react"
import "../userWorker"

type EditorProps = {
  editorId: string
  jsonData: object
}

export default function JsonEditor({ editorId, jsonData }: EditorProps) {
  const jsonSchemaEditorRef = useRef(null)

  const jsonDataString = JSON.stringify(jsonData, null, 2) // Format JSON with indentation

  useEffect(() => {
    if (editorId) {
      // @ts-expect-error - monaco-editor does not accept null refs
      jsonSchemaEditorRef.current = monaco.editor.create(
        // @ts-expect-error - monaco-editor does not accept null refs
        document.getElementById(editorId),
        {
          value: jsonDataString,
          language: "json",
          theme: "vs-dark",
          readOnly: true, // Make the editor read-only
          automaticLayout: true, // Automatically adjust the layout when the size of the editor changes
          wordWrap: true,
        },
      )

      return () => {
        if (jsonSchemaEditorRef.current) {
          // @ts-expect-error - monaco-editor type definitions are incomplete
          jsonSchemaEditorRef.current.dispose()
        }
      }
    }
  }, [editorId, jsonDataString])

  return <div id={editorId} style={{ flex: 1, overflow: "auto" }} />
}
