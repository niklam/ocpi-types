#!/bin/bash

# Script to create index.ts files for all OCPI modules
# Usage: ./create-index-files.sh

echo "🚀 Creating index.ts files for OCPI modules..."

# Function to create export statement from file path
create_export() {
    local file_path="$1"
    local relative_path="$2"

    # Remove .ts extension and create export statement
    local export_path="${file_path%.ts}"
    echo "export * from './${relative_path}${export_path}';"
}

# Function to create index file for a directory
create_index_file() {
    local dir="$1"
    local index_file="${dir}/index.ts"

    echo "📁 Creating ${index_file}..."

    # Create or overwrite the index file
    cat > "$index_file" << EOF
// Auto-generated index file for ${dir}
// Generated on $(date)

EOF

    # Find all .ts files (excluding .spec.ts and index.ts files)
    local files_found=false

    # Process DTOs
    if [ -d "${dir}/dtos" ]; then
        echo "// DTOs" >> "$index_file"
        find "${dir}/dtos" -name "*.dto.ts" -not -name "*.spec.ts" | sort | while read -r file; do
            local filename=$(basename "$file")
            create_export "$filename" "dtos/" >> "$index_file"
            files_found=true
        done
        echo "" >> "$index_file"
    fi

    # Process Enums
    if [ -d "${dir}/enums" ]; then
        echo "// Enums" >> "$index_file"
        find "${dir}/enums" -name "*.enum.ts" -not -name "*.spec.ts" | sort | while read -r file; do
            local filename=$(basename "$file")
            create_export "$filename" "enums/" >> "$index_file"
            files_found=true
        done
        echo "" >> "$index_file"
    fi

    # Process root level .ts files (excluding index.ts and .spec.ts)
    local root_files=$(find "$dir" -maxdepth 1 -name "*.ts" -not -name "index.ts" -not -name "*.spec.ts" | sort)
    if [ -n "$root_files" ]; then
        echo "// Root exports" >> "$index_file"
        echo "$root_files" | while read -r file; do
            if [ -n "$file" ]; then
                local filename=$(basename "$file")
                create_export "$filename" "" >> "$index_file"
                files_found=true
            fi
        done
    fi

    # If no files found, add a comment
    if [ ! -s "$index_file" ] || [ $(wc -l < "$index_file") -le 3 ]; then
        echo "// No exports found in this module" >> "$index_file"
    fi

    echo "✅ Created ${index_file}"
}

# Create root directories if they don't exist
mkdir -p src/{decorators,dtos,enums}
mkdir -p src/modules/{locations,tariffs,sessions,cdrs,tokens,commands,chargingprofiles,credentials,versions,hubclientinfo}

# Create index files for each module
echo ""
echo "📂 Creating module index files..."

# Decorators module (in root src)
create_index_file "src/decorators"

# Main modules (in src/modules/)
modules=(
    "src/modules/locations"
    "src/modules/tariffs"
    "src/modules/sessions"
    "src/modules/cdrs"
    "src/modules/tokens"
    "src/modules/commands"
    "src/modules/chargingprofiles"
    "src/modules/credentials"
    "src/modules/versions"
    "src/modules/hubclientinfo"
)

for module in "${modules[@]}"; do
    if [ -d "$module" ]; then
        create_index_file "$module"
    else
        echo "⚠️  Directory $module does not exist, skipping..."
    fi
done

# Create main index.ts file
echo ""
echo "📝 Creating main src/index.ts file..."

cat > "src/index.ts" << 'EOF'
// Main index file for OCPI Types 2.2.1
// Auto-generated on $(date)

// Core decorators
export * from './decorators';

// OCPI Modules
export * from './modules/locations';
export * from './modules/tariffs';
export * from './modules/sessions';
export * from './modules/cdrs';
export * from './modules/tokens';
export * from './modules/commands';
export * from './modules/chargingprofiles';
export * from './modules/credentials';
export * from './modules/versions';
export * from './modules/hubclientinfo';

// Common DTOs (root level)
export * from './dtos/display-text.dto';
export * from './dtos/price.dto';

// Common enums (root level)
export * from './enums/role.enum';
EOF

# Replace the date placeholder
sed -i.bak "s/\$(date)/$(date)/" "src/index.ts" && rm "src/index.ts.bak" 2>/dev/null || true

echo "✅ Created src/index.ts"

# Create a package.json template for exports
echo ""
echo "📦 Creating package.json exports template..."

cat > "package-exports-template.json" << 'EOF'
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.js"
    },
    "./decorators": {
      "types": "./dist/decorators/index.d.ts",
      "import": "./dist/decorators/index.js",
      "require": "./dist/decorators/index.js"
    },
    "./locations": {
      "types": "./dist/modules/locations/index.d.ts",
      "import": "./dist/modules/locations/index.js",
      "require": "./dist/modules/locations/index.js"
    },
    "./tariffs": {
      "types": "./dist/modules/tariffs/index.d.ts",
      "import": "./dist/modules/tariffs/index.js",
      "require": "./dist/modules/tariffs/index.js"
    },
    "./sessions": {
      "types": "./dist/modules/sessions/index.d.ts",
      "import": "./dist/modules/sessions/index.js",
      "require": "./dist/modules/sessions/index.js"
    },
    "./cdrs": {
      "types": "./dist/modules/cdrs/index.d.ts",
      "import": "./dist/modules/cdrs/index.js",
      "require": "./dist/modules/cdrs/index.js"
    },
    "./tokens": {
      "types": "./dist/modules/tokens/index.d.ts",
      "import": "./dist/modules/tokens/index.js",
      "require": "./dist/modules/tokens/index.js"
    },
    "./commands": {
      "types": "./dist/modules/commands/index.d.ts",
      "import": "./dist/modules/commands/index.js",
      "require": "./dist/modules/commands/index.js"
    },
    "./charging-profiles": {
      "types": "./dist/modules/chargingprofiles/index.d.ts",
      "import": "./dist/modules/chargingprofiles/index.js",
      "require": "./dist/modules/chargingprofiles/index.js"
    },
    "./credentials": {
      "types": "./dist/modules/credentials/index.d.ts",
      "import": "./dist/modules/credentials/index.js",
      "require": "./dist/modules/credentials/index.js"
    },
    "./versions": {
      "types": "./dist/modules/versions/index.d.ts",
      "import": "./dist/modules/versions/index.js",
      "require": "./dist/modules/versions/index.js"
    },
    "./hubclientinfo": {
      "types": "./dist/modules/hubclientinfo/index.d.ts",
      "import": "./dist/modules/hubclientinfo/index.js",
      "require": "./dist/modules/hubclientinfo/index.js"
    }
  }
}
EOF

echo "✅ Created package-exports-template.json"

echo ""
echo "🎉 All index files created successfully!"
echo ""
echo "📋 Summary:"
echo "   ✅ Module index files created"
echo "   ✅ Main src/index.ts created"
echo "   ✅ Package.json exports template created"
echo ""
echo "📝 Next steps:"
echo "   1. Review the generated index.ts files"
echo "   2. Add the exports from package-exports-template.json to your package.json"
echo "   3. Run 'npm run build' to generate the dist folder"
echo "   4. Test imports: import { SomeType } from 'your-package/module'"
echo ""
echo "💡 Pro tip: Re-run this script whenever you add new files!"
EOF

# Alternative Node.js version for more complex logic
cat > "create-index-files.js" << 'EOF'
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
        `// Auto-generated index file for ${moduleName}`,
        `// Generated on ${new Date().toISOString()}`,
        ''
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
        fs.mkdirSync(dir, { recursive: true });
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

const mainIndexContent = `// Main index file for OCPI Types 2.2.1
// Auto-generated on ${new Date().toISOString()}

// Core decorators
export * from './decorators';

// OCPI Modules
export * from './modules/locations';
export * from './modules/tariffs';
export * from './modules/sessions';
export * from './modules/cdrs';
export * from './modules/tokens';
export * from './modules/commands';
export * from './modules/chargingprofiles';
export * from './modules/credentials';
export * from './modules/versions';
export * from './modules/hubclientinfo';

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
EOF

# Make both scripts executable
chmod +x create-index-files.sh
chmod +x create-index-files.js

echo "✅ Created two versions of the script:"
echo "   📄 create-index-files.sh (Bash version)"
echo "   📄 create-index-files.js (Node.js version - more robust)"
echo ""
echo "🚀 Usage:"
echo "   ./create-index-files.sh"
echo "   # OR"
echo "   node create-index-files.js"