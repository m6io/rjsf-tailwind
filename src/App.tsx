import TailwindForm from "@/components/rjsf"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import validator from "@rjsf/validator-ajv8"
import { useRoutes } from "react-router-dom"
import JsonEditor from "./components/json-editor"
import Samples from "./components/samples"
import { TailwindIndicator } from "./components/tailwind-indicator"
import { AppState, useStore } from "./store"

const selector = (state: AppState) => ({
  schema: state.schema,
  uiSchema: state.uiSchema,
  formData: state.formData,
})

const ResponsiveContainer = ({ heading, children }: any) => {
  return (
    <div className="flex items-center justify-center [&>div]:w-full">
      <div className="overflow-hidden bg-background sm:rounded-t-lg">
        <div className="border bg-background px-4 py-5 sm:rounded-t-lg sm:px-6">
          <h3 className="text-base font-semibold leading-6 ">{heading}</h3>
        </div>
        <>{children}</>
      </div>
    </div>
  )
}

const routes = [{ path: "/", element: <Home /> }]

function Home() {
  const { schema, uiSchema, formData } = useStore(selector)

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          react-jsonschema-form components <br className="hidden sm:inline" />
          built with Tailwind CSS.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Accessible and customizable @rjsf components that you can copy and
          paste into your apps. Free. Open Source. Built with Tailwind CSS.
        </p>
      </div>
      <div className="grid w-full gap-6">
        <Samples />
        <div className="overflow-hidden  border bg-background shadow">
          <div className="items-start justify-center gap-6 p-8 md:grid md:grid-cols-2">
            <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
              <ResponsiveContainer heading="JSON Schema">
                <div className="flex h-[calc(100vh/2)] flex-col">
                  <JsonEditor
                    editorId="jsonSchemaEditorContainer"
                    jsonData={schema}
                  />
                </div>
              </ResponsiveContainer>
              <div>
                <div className="grid grid-cols-1 items-start justify-center gap-6 md:grid md:grid-cols-2">
                  <ResponsiveContainer heading="UI Schema">
                    <div className="flex h-[calc(100vh/3)] flex-col">
                      <JsonEditor
                        editorId="uiSchemaEditorContainer"
                        jsonData={uiSchema}
                      />
                    </div>
                  </ResponsiveContainer>
                  <ResponsiveContainer heading="Form Data">
                    <div className="flex h-[calc(100vh/3)] flex-col">
                      <JsonEditor
                        editorId="formDataEditorContainer"
                        jsonData={formData}
                      />
                    </div>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
              <ResponsiveContainer heading="Tailwind Form">
                <div className="flex flex-col">
                  <div
                    className="border"
                    style={{
                      padding: 20,
                    }}
                  >
                    <TailwindForm
                      noHtml5Validate
                      schema={schema}
                      uiSchema={uiSchema}
                      formData={formData}
                      validator={validator}
                    />
                  </div>
                </div>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function App() {
  const children = useRoutes(routes)

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
      </div>
      <TailwindIndicator />
    </ThemeProvider>
  )
}

export default App
