import { watch } from "fs"
import { join } from "path"
import { refreshTemplateWorkerCommand } from "@kksh/api/dev"
import { $ } from "bun"

async function build() {
	await $`bun build --minify --target=browser --outdir=./dist ./src/index.ts`
	await refreshTemplateWorkerCommand()
}

const srcDir = join(import.meta.dir, "src")

await build()

if (Bun.argv.includes("dev")) {
	console.log(`Watching ${srcDir} for changes...`)
	watch(srcDir, { recursive: true }, async (event, filename) => {
		await build()
	})
}
