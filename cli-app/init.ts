#!/usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import { select } from '@inquirer/prompts';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { PROJECT_NAME } from '@/metadata';

// Welcome banner
console.log(
  chalk.cyan(
    figlet.textSync('Welcome', {
      font: 'Standard',
      horizontalLayout: 'controlled smushing',
      verticalLayout: 'fitted',
    })
  )
);

console.log(chalk.green(`Welcome to ${PROJECT_NAME}`));
console.log(chalk.yellow('-----------------------------------------------'));

async function main() {
  // Package manager selection
  console.log(chalk.blue('Setting up your project...'));
  
  const packageManager = await select({
    message: 'Select your package manager:',
    choices: [
      { name: 'npm', value: 'npm' },
      { name: 'yarn', value: 'yarn' },
      { name: 'pnpm', value: 'pnpm' },
      { name: 'bun', value: 'bun' },
    ],
  });

  // Install packages
  console.log(chalk.blue(`Installing packages using ${packageManager}...`));
  
  try {
    let installCommand;
    
    switch (packageManager) {
      case 'npm':
        installCommand = 'npm install --force';
        break;
      case 'yarn':
        installCommand = 'yarn install';
        break;
      case 'pnpm':
        installCommand = 'pnpm install';
        break;
      case 'bun':
        installCommand = 'bun add .';
        break;
    }
    
    if (installCommand) {
      execSync(installCommand, { stdio: 'inherit' });
    } else {
      throw new Error('No valid package manager selected.');
    }
    console.log(chalk.green('✅ Package installation complete!'));
    
    console.log(chalk.blue(`\nTo start your development server, run:`));
    console.log(chalk.green(`${packageManager} run dev`));
    
    // Create .env.example if it doesn't exist
    const envExamplePath = path.join(process.cwd(), '.env.example');
    if (!fs.existsSync(envExamplePath)) {
      fs.writeFileSync(envExamplePath, 'API_KEY=your_api_key_here\nDBURL=your_db_url_here\n');
      console.log(chalk.green('\n✅ Created .env.example file'));
    }
    
    // Print steps
    console.log(chalk.yellow('\nNext steps:'));
    console.log(chalk.white('1. Set environment variables and rename .env.example to .env'));
    console.log(chalk.white(`2. Initialize the CDN using the command: ${packageManager} init cdn`));
    
  } catch (error) {
    console.error(chalk.red('❌ Error during installation:'), error);
    process.exit(1);
  }
}

main().catch(err => {
  console.error(chalk.red('❌ An unexpected error occurred:'), err);
  process.exit(1);
});