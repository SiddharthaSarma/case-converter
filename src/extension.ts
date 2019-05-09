// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const ncp = require('copy-paste');
const changeCase = require('change-case');
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "case-generator" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'extension.caseConverter',
    () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage('Case Converter!');
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      const text = editor.document.getText();
      const cases: any = {
        'upper case': 'upperCase',
        'camel case': 'camelCase'
      };
      const list = Object.keys(cases);
      vscode.window.showInformationMessage(text);
      const quickPick = vscode.window.createQuickPick();
      quickPick.items = list.map((x: any) => ({ label: x, description: x }));
      quickPick.onDidChangeSelection(([item]) => {
        if (item) {
          const val = changeCase[cases[item.label]](text);
          ncp.copy(val, function() {
            vscode.window.showInformationMessage(`text copied: ${val}`);
            // complete...
          });
          quickPick.dispose();
        }
      });
      quickPick.onDidHide(() => quickPick.dispose());
      quickPick.show();
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
