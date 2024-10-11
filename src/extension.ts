import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

  let disposable = vscode.commands.registerCommand('extension.searchPyQGIS', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showInformationMessage('No active editor found.');
      return;
    }

    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);

    if (!selectedText) {
      vscode.window.showWarningMessage('Please select a term to search in the PyQGIS documentation.');
      return;
    }

    const queryUrl = `https://qgis.org/pyqgis/master/search.html?q=${encodeURIComponent(selectedText)}&check_keywords=yes&area=default`;

    vscode.env.openExternal(vscode.Uri.parse(queryUrl));
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
