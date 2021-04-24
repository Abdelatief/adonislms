import execa from "execa";


export const SeedFile = async (file: string): Promise<void> => {
    await execa.node(
        "ace",
        ["db:seed", `--files=database/seeders/${file}.ts`],
        {
            stdio: "inherit",
        }
    )
}
