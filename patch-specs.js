const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const targetImports = `import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/shared/material.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';
`;

const targetModuleConfig = `imports: [
        HttpClientTestingModule, 
        RouterTestingModule, 
        ReactiveFormsModule, 
        FormsModule, 
        BrowserAnimationsModule, 
        MaterialModule
      ],
      providers: [DatePipe],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],`;

walkDir('./src/app/features', function(filePath) {
    if (filePath.endsWith('.spec.ts')) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Skip if we already touched it or if it's one of the files we manually wrote perfectly
        if (content.includes('HttpClientTestingModule') || filePath.includes('employee-form.component.spec.ts')) {
            return;
        }

        // Add imports after the last import statement
        const importRegex = /import .* from '.*';\n/g;
        let lastMatch;
        let match;
        while ((match = importRegex.exec(content)) !== null) {
            lastMatch = match;
        }

        if (lastMatch) {
            const insertIndex = lastMatch.index + lastMatch[0].length;
            content = content.slice(0, insertIndex) + targetImports + content.slice(insertIndex);
        }

        // Add modules to configureTestingModule
        content = content.replace(/TestBed\.configureTestingModule\(\{/, `TestBed.configureTestingModule({\n      ${targetModuleConfig}`);

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Patched ${filePath}`);
    }
});
