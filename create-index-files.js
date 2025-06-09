#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Creating index.ts files for OCPI modules...');

// Function to get all TypeScript files in a directory (excluding spec files)
function getTypeScriptFiles(dir, subdir = '') {
    const fullPath = path.join(dir, subdir);
    if (!fs.existsSync(fullPath)) return [];

    return fs.readdirSync(fullPath)
        .filter(file => file.endsWith('.ts') && !file.endsWith('.spec.ts') && file !== 'index.ts')
        .map(file => ({
            name: file,
            path: subdir ? `${subdir}/${file}` : file,
            exportPath: subdir ? `${subdir}/${file.replace('.ts', '')}` : file.replace('.ts', '')
        }));
}

// Function to create index file content
function createIndexContent(moduleName, files) {
    const lines = [
        'import \'reflect-metadata\';',
        '',
    ];

    // Group files by type
    const dtos = files.filter(f => f.path.includes('dtos/'));
    const enums = files.filter(f => f.path.includes('enums/'));
    const root = files.filter(f => !f.path.includes('/'));

    if (dtos.length > 0) {
        lines.push('// DTOs');
        dtos.forEach(file => {
            lines.push(`export * from './${file.exportPath}';`);
        });
        lines.push('');
    }

    if (enums.length > 0) {
        lines.push('// Enums');
        enums.forEach(file => {
            lines.push(`export * from './${file.exportPath}';`);
        });
        lines.push('');
    }

    if (root.length > 0) {
        lines.push('// Root exports');
        root.forEach(file => {
            lines.push(`export * from './${file.exportPath}';`);
        });
        lines.push('');
    }

    if (lines.length <= 3) {
        lines.push('// No exports found in this module');
    }

    return lines.join('\n');
}

// Create directories if they don't exist
const modules = [
    'src/decorators',
    'src/modules/locations',
    'src/modules/tariffs',
    'src/modules/sessions',
    'src/modules/cdrs',
    'src/modules/tokens',
    'src/modules/commands',
    'src/modules/chargingprofiles',
    'src/modules/credentials',
    'src/modules/versions',
    'src/modules/hubclientinfo',
    'src/dtos',
    'src/enums'
];

modules.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
        console.log(`📁 Created directory: ${dir}`);
    }
});

// Process each module
modules.forEach(moduleDir => {
    if (fs.existsSync(moduleDir)) {
        const moduleName = path.basename(moduleDir);
        console.log(`📂 Processing ${moduleName}...`);

        // Get all TypeScript files
        const files = [
            ...getTypeScriptFiles(moduleDir),
            ...getTypeScriptFiles(moduleDir, 'dtos'),
            ...getTypeScriptFiles(moduleDir, 'enums')
        ];

        // Create index file
        const indexPath = path.join(moduleDir, 'index.ts');
        const content = createIndexContent(moduleName, files);

        fs.writeFileSync(indexPath, content);
        console.log(`✅ Created ${indexPath}`);
    }
});

// Create main index.ts
console.log('\n📝 Creating main src/index.ts file...');

const mainIndexContent = `import 'reflect-metadata';

// Common DTOs (root level)
export * from './dtos/display-text.dto';
export * from './dtos/price.dto';

// Common enums (root level)
export * from './enums/role.enum';
`;

fs.writeFileSync('src/index.ts', mainIndexContent);
console.log('✅ Created src/index.ts');

// Create package.json exports template
const exportsTemplate = {
    exports: {
        ".": {
            types: "./dist/index.d.ts",
            import: "./dist/index.js",
            require: "./dist/index.js"
        }
    }
};

// Add module exports
modules.filter(m => m !== 'src/dtos' && m !== 'src/enums' && m !== 'src/decorators').forEach(moduleDir => {
    const moduleName = path.basename(moduleDir);
    const exportKey = moduleName === 'chargingprofiles' ? './charging-profiles' : `./${moduleName}`;

    exportsTemplate.exports[exportKey] = {
        types: `./dist/modules/${moduleName}/index.d.ts`,
        import: `./dist/modules/${moduleName}/index.js`,
        require: `./dist/modules/${moduleName}/index.js`
    };
});

fs.writeFileSync('package-exports-template.json', JSON.stringify(exportsTemplate, null, 2));
console.log('✅ Created package-exports-template.json');

console.log('\n🎉 All index files created successfully!');
console.log('\n📋 Summary:');
console.log('   ✅ Module index files created');
console.log('   ✅ Main src/index.ts created');
console.log('   ✅ Package.json exports template created');
console.log('\n📝 Next steps:');
console.log('   1. Review the generated index.ts files');
console.log('   2. Add the exports from package-exports-template.json to your package.json');
console.log('   3. Run "npm run build" to generate the dist folder');
console.log('   4. Test imports: import { SomeType } from "your-package/module"');
console.log('\n💡 Pro tip: Re-run this script whenever you add new files!');
