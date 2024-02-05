// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import Window = vscode.window
import Range = vscode.Range
import Selection = vscode.Selection
import TextDocument = vscode.TextDocument
import TextEditor = vscode.TextEditor

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "vscode-utils" is now active!')

  const encode = vscode.commands.registerCommand('utils.base64Encode', () => {
    const e = Window.activeTextEditor
    const d = e?.document
    const sel = e?.selections
    base64Encode(e, d, sel)
  })

  const decode = vscode.commands.registerCommand('utils.base64Decode', () => {
    const e = Window.activeTextEditor
    const d = e?.document
    const sel = e?.selections
    base64Decode(e, d, sel)
  })

  const cmdEncodeURIComponent = vscode.commands.registerCommand('utils.encodeURIComponent', () => {
    const e = Window.activeTextEditor
    const d = e?.document
    const sel = e?.selections
    uriEncodeComponent(e, d, sel)
  })

  const cmdDecodeURIComponent = vscode.commands.registerCommand('utils.decodeURIComponent', () => {
    const e = Window.activeTextEditor
    const d = e?.document
    const sel = e?.selections
    uriDecodeComponent(e, d, sel)
  })

  context.subscriptions.push(encode)
  context.subscriptions.push(decode)
  context.subscriptions.push(cmdEncodeURIComponent)
  context.subscriptions.push(cmdDecodeURIComponent)
}

function uriEncodeComponent(e?: TextEditor, d?: TextDocument, sel?: readonly Selection[]) {
  e?.edit(edit => {
    for (const s of sel ?? []) {
      const txt = d?.getText(new Range(s.start, s.end))
      edit.replace(s, encodeURIComponent(txt ?? ''))
    }
  })
}

function uriDecodeComponent(e?: TextEditor, d?: TextDocument, sel?: readonly Selection[]) {
  e?.edit(edit => {
    for (const s of sel ?? []) {
      const txt = d?.getText(new Range(s.start, s.end))
      edit.replace(s, decodeURIComponent(txt ?? ''))
    }
  })
}

function base64Encode(e?: TextEditor, d?: TextDocument, sel?: readonly Selection[]) {
  e?.edit(edit => {
    for (const s of sel ?? []) {
      const txt = d?.getText(new Range(s.start, s.end))
      const b: Buffer = Buffer.from(txt ?? '')
      edit.replace(s, b.toString('base64'))
    }
  })
}

function base64Decode(e?: TextEditor, d?: TextDocument, sel?: readonly Selection[]) {
  e?.edit(edit => {
    for (const s of sel ?? []) {
      const txt = d?.getText(new Range(s.start, s.end))
      const b: Buffer = Buffer.from(txt ?? '', 'base64')
      edit.replace(s, b.toString())
    }
  })
}

// This method is called when your extension is deactivated
export function deactivate() {}
