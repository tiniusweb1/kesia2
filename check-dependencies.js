const { execSync } = require('child_process')

const getOutdatedPackages = () => {
    try {
        const output = execSync('npm outdated --json', { encoding: 'utf8' })
        return JSON.parse(output)
    } catch (error) {
        // If there are outdated packages, npm outdated returns a non-zero exit code.
        // We need to check if there is valid JSON in the error output.
        if (error.stdout) {
            try {
                return JSON.parse(error.stdout)
            } catch (parseError) {
                console.error(
                    'Error parsing outdated packages JSON:',
                    parseError.message
                )
            }
        }
        console.error('Error getting outdated packages:', error.message)
        return {}
    }
}

const getPackageDependencies = (packageName) => {
    try {
        const output = execSync(`npm info ${packageName} dependencies --json`, {
            encoding: 'utf8',
        })
        return JSON.parse(output)
    } catch (error) {
        console.error(
            `Error getting dependencies for ${packageName}:`,
            error.message
        )
        return {}
    }
}

const checkDependencies = () => {
    const outdatedPackages = getOutdatedPackages()
    if (Object.keys(outdatedPackages).length === 0) {
        console.log('No outdated packages found or error occurred.')
        return
    }

    console.log('Outdated packages and their dependencies:\n')

    Object.keys(outdatedPackages).forEach((pkg) => {
        console.log(`Package: ${pkg}`)
        console.log(`Current: ${outdatedPackages[pkg].current}`)
        console.log(`Wanted: ${outdatedPackages[pkg].wanted}`)
        console.log(`Latest: ${outdatedPackages[pkg].latest}`)
        console.log('Dependencies:')

        const dependencies = getPackageDependencies(pkg)
        if (Object.keys(dependencies).length === 0) {
            console.log('  No dependencies found.')
        } else {
            Object.keys(dependencies).forEach((dep) => {
                console.log(`  ${dep}: ${dependencies[dep]}`)
            })
        }

        console.log('\n')
    })
}

checkDependencies()
