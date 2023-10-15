import { RJSFSchema } from "@rjsf/utils"
import { JSONSchema7 } from "json-schema"
import { create } from "zustand"
import { samples } from "./samples"

export type AppState = {
  schema: JSONSchema7 | RJSFSchema
  uiSchema: object
  formData: object
  label: string
  setLabel: (label: string) => void
}

export const useStore = create<AppState>((set) => ({
  schema: samples.Simple.schema as JSONSchema7 | RJSFSchema,
  uiSchema: samples.Simple.uiSchema,
  formData: samples.Simple.formData,
  label: "Simple",
  setLabel: (label: string) =>
    set({
      label,
      schema: samples[label].schema,
      uiSchema: samples[label].uiSchema,
      formData: samples[label].formData,
    }),
}))
