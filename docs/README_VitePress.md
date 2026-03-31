README.md

To bring the VitePress project from GitHub to your laptop and run it locally, follow these instructions:

1. **Verify required tools**

   Before downloading the project, make sure the following tools are installed:

   - Node.js
   - Git
   - A code editor like Visual Studio Code

   Checking the installation using:

   ```bash
   node -v
   npm -v
   git --version
   ```


2. **Navigate to your desired folder**
   
   Go to the folder where you want to download the project.

   Example:

   ```bash
   cd Documents\Generators\VitePress
   ```

3. **Clone the repository**

   ```bash
   git clone https://github.com/emilarim/VitePressTesting.git
   ```

4. **Verify the download**

   Check that the folder has been created in the selected directory.

   ```bash
   cd Documents\Generators\VitePress\VitePressTesting
   ```

5. **Install dependencies**
   
   Since the `node_modules` folder is not uploaded to GitHub (*It contains installed dependencies, not source code*). It is necessary to recreate it locally.
   
   Run the following command to install all dependencies defined in `package.json` and `package-lock.json`:

   ```bash
   npm install
   ```

6. **Run the local development server**

   ```bash
   npm run docs:dev
   ```
7. **Open the application in browser**

   Open a browser and navigate to: `http://localhost:5173/` 

   This will start the VitePress development server and display the documentation site.
