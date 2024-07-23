const { exec } = require('child_process')
const util = require('util')
const execPromise = util.promisify(exec)

const getOutdatedDependencies = async () => {
    try {
        const { stdout } = await execPromise('npm outdated --json')
        return JSON.parse(stdout)
    } catch (error) {
        console.error('Error getting outdated packages:', error)
        return {}
    }
}

const getDependencyTree = async (packageName) => {
    try {
        const { stdout } = await execPromise(`npm ls ${packageName} --json`)
        return JSON.parse(stdout)
    } catch (error) {
        console.error(
            `Error getting dependency tree for ${packageName}:`,
            error
        )
        return {}
    }
}

const checkDependencies = async () => {
    const outdatedPackages = await getOutdatedDependencies()

    if (Object.keys(outdatedPackages).length === 0) {
        console.log('All packages are up to date.')
        return
    }

    for (const [pkg, info] of Object.entries(outdatedPackages)) {
        console.log(`\nPackage: ${pkg}`)
        console.log(`Current: ${info.current}`)
        console.log(`Wanted: ${info.wanted}`)
        console.log(`Latest: ${info.latest}`)

        const dependencyTree = await getDependencyTree(pkg)

        const printDependencies = (tree, level = 0) => {
            if (!tree.dependencies) return

            for (const [dep, depInfo] of Object.entries(tree.dependencies)) {
                const indent = '  '.repeat(level)
                console.log(`${indent}- ${dep} (${depInfo.version})`)

                printDependencies(depInfo, level + 1)
            }
        }

        console.log('Dependencies:')
        printDependencies(dependencyTree)
    }
}

checkDependencies()
