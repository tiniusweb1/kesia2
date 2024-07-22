const fs = require('fs')
const path = require('path')

const tsconfigPath = path.resolve(__dirname, 'tsconfig.json')

function validateAndFixTsConfig(tsconfig) {
    // Ensure necessary compiler options are set
    tsconfig.compilerOptions = tsconfig.compilerOptions || {}
    tsconfig.compilerOptions.strict = true
    tsconfig.compilerOptions.module = 'esnext'
    tsconfig.compilerOptions.target = 'es2017'
    tsconfig.compilerOptions.lib = ['dom', 'dom.iterable', 'esnext']
    tsconfig.compilerOptions.moduleResolution = 'node'
    tsconfig.compilerOptions.resolveJsonModule = true
    tsconfig.compilerOptions.isolatedModules = true
    tsconfig.compilerOptions.noEmit = true
    tsconfig.compilerOptions.esModuleInterop = true
    tsconfig.compilerOptions.forceConsistentCasingInFileNames = true

    // Ensure includes and excludes are correctly set
    tsconfig.include = tsconfig.include || [
        'next-env.d.ts',
        '**/*.ts',
        '**/*.tsx',
        'types/**/*.d.ts',
    ]

    tsconfig.exclude = tsconfig.exclude || ['node_modules']

    return tsconfig
}

function main() {
    let tsconfig
    try {
        tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'))
    } catch (error) {
        console.error('Failed to read tsconfig.json:', error)
        return
    }

    tsconfig = validateAndFixTsConfig(tsconfig)

    try {
        fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2))
        console.log('tsconfig.json has been updated.')
    } catch (error) {
        console.error('Failed to write tsconfig.json:', error)
    }
}

main()
