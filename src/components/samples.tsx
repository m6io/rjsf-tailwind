import { samples } from "@/samples"
import { AppState, useStore } from "@/store"

const selector = (state: AppState) => ({
  label: state.label,
  setLabel: state.setLabel,
})

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ")
}

export default function Samples() {
  const { label, setLabel } = useStore(selector)
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="w-full bg-background focus:border-primary focus:ring-primary"
          defaultValue={Object.keys(samples).find((sample) => sample === label)}
          onChange={(e) => setLabel(e.target.value)}
        >
          {Object.keys(samples).map((sample) => (
            <option className="w-full" key={sample} value={sample}>
              {sample}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:flex sm:flex-wrap">
        <div className="flex flex-wrap gap-2" aria-label="Tabs">
          {Object.keys(samples).map((sample) => (
            <button
              key={sample}
              className={classNames(
                sample === label
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted",
                "rounded-full text-center px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary",
              )}
              onClick={() => setLabel(sample)}
            >
              {sample}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
