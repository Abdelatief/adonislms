import "reflect-metadata"
import execa from "execa"
import { join } from "path"
import getPort from "get-port"
import { configure } from "japa"
import sourceMapSupport from "source-map-support"
import { CustomSeeder } from "./commands/utils/CustomSeeder";

process.env.NODE_ENV = "testing"
process.env.ADONIS_ACE_CWD = join(__dirname)
sourceMapSupport.install({ handleUncaughtExceptions: false })

async function runMigrations() {
    await execa.node("ace", ["migration:run"], {
        stdio: "inherit",
    })
}

async function runSeedWithFile(seederFile: string) {
    await execa.node(
        "ace",
        ["db:seed", `--files=database/seeders/${seederFile}.ts`],
        {
            stdio: "inherit",
        }
    )
}

async function rollbackMigrations() {
    await execa.node("ace", ["migration:rollback", "--batch", "0"], {
        stdio: "inherit",
    })
}

async function runSpecificSeeding() {
    await execa.node(
        "ace",
        ["db:seed", "--files=database/seeders/SubjectSeeder.ts"],
        {
            stdio: "inherit",
        }
    )

    await execa.node(
        "ace",
        ["db:seed", "--files=database/seeders/InstructorSeeder.ts"],
        {
            stdio: "inherit",
        }
    )

    // change it with a for loop
    await CustomSeeder()
}

async function runSeeding() {
    await execa.node("ace", ["customseed"], { stdio: "inherit" })

    await execa.node("ace", ["db:seed"], {
        stdio: "inherit",
    })
}

async function startHttpServer() {
    const { Ignitor } = await import("@adonisjs/core/build/src/Ignitor")
    process.env.PORT = String(await getPort())
    await new Ignitor(__dirname).httpServer().start()
}

/**
 * Configure test runner
 */
configure({
    files: ["test/**/*.spec.ts"],
    before: [runMigrations, runSeeding, startHttpServer],
    after: [rollbackMigrations],
})
