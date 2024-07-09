// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const axios = require('axios');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	vscode.window.showInformationMessage('Congratulations, move-assistant is now active!');
	console.log('Here we just activated it!');
	let active_terminal = 0;

	let init = vscode.commands.registerCommand('move-assistant.initialise', async function () {
		let args = "";
			if(vscode.window.activeTerminal === undefined){

				const first_prompt = await vscode.window.showInputBox({
					prompt: 'Enter your project\'s name (Separate with underscore _ )',
				});
				args = first_prompt;

				const i = vscode.window.createTerminal('inkly')
					i.show(false);
					i.sendText(`movement aptos move init --name ${args}`, true);
			}else{
				vscode.window.activeTerminal.show();
				const terminal = vscode.window.activeTerminal;
				terminal.sendText(`movement aptos move init --name ${args}`, true);
			}
		
		vscode.window.onDidChangeActiveTerminal(e => {

			console.log(`Active terminal changed, name=${e ? e.name : 'undefined'}`);
		});
		active_terminal += 1;
	})

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('move-assistant.helloWorld', function () {
		// The code you place here will be executed every time your command is executed
		if(vscode.window.activeTerminal === undefined){
			
			const i = vscode.window.createTerminal('inkly')
				i.show(false); // bash <(curl -s http://mywebsite.example/myscript.txt)
				i.sendText(`bash <(curl https://raw.githubusercontent.com/movemntdev/M1/main/scripts/install.sh)`, true);
		}else{
			vscode.window.activeTerminal.show();
			const terminal = vscode.window.activeTerminal;
			terminal.sendText(`bash <(curl https://raw.githubusercontent.com/movemntdev/M1/main/scripts/install.sh)`, true);
		}
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from move-assistant!');
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(init);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
